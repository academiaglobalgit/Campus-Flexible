import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { apiClient } from './ApiConfiguration/httpClient';
import { CURSOS_ACTIVOS_ENDPOINTS } from "../types/endpoints";
import type { Actividad, CursosActividadesResponse, CursosActivosResponse, CursosTabs, CursosTabsResponse, CursosTutoriasResponse, ActividadEntregadaResponse } from '@constants';
import React from 'react';
import type { ManualesActividad } from '../types/Cursos.interface';

export const useGetCursos = () => {
    return useQuery<CursosActivosResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS.key],
        queryFn: () => apiClient.get<CursosActivosResponse>(CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS.path),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
};

export const TabsCursos = [
    { id_tipo_recurso: 3, tipo: "Contenido" },
    { id_tipo_recurso: 1, tipo: "Actividades" },
    { id_tipo_recurso: 5, tipo: "Foros" },
    { id_tipo_recurso: 6, tipo: "Tutorias" },
    { id_tipo_recurso: 2, tipo: "Evaluaciones" },
    { id_tipo_recurso: 1, tipo: "ListaPendientes" },    
];

export const useGetCursosTabs = (id: number, tab: string) => {
    const idRecurso = TabsCursos.find((item) => item.tipo === tab)?.id_tipo_recurso;

    const query = useQuery<CursosTabsResponse, Error>({
        queryKey: [tab],
        queryFn: () => apiClient.get<CursosTabsResponse>(`${CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.path}?id_curso=${id}&id_tipo_recurso=${idRecurso}`),
    });

    const mapData = (data: CursosTabs[]) => {
        const agrupadoPorUnidad = data.reduce<Record<string, CursosTabs[]>>((acc, contenido) => {
            if (!acc[contenido.unidad]) {
                acc[contenido.unidad] = [];
            }
            acc[contenido.unidad].push(contenido);
            return acc;
            }, {});
        
        return agrupadoPorUnidad;
    }

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }
};

export type ActividadesCacheData = {
  agrupadoPorUnidad: Record<string, Actividad[]>;
  manuales: ManualesActividad[];
};

export const useGetActividades = (id: number, tab: string): UseQueryResult<CursosActividadesResponse> & { dataMapped?: ActividadesCacheData;} => {
    const idRecurso = TabsCursos.find((item) => item.tipo === tab)?.id_tipo_recurso;

    const query = useQuery<CursosActividadesResponse, Error>({
        queryKey: [tab],
        queryFn: () =>
        apiClient.get<CursosActividadesResponse>(
            `${CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.path}?id_curso=${id}&id_tipo_recurso=${idRecurso}`
        ),
    });

    const dataMapped = React.useMemo<ActividadesCacheData | undefined>(() => {
        if (!query.data) return undefined;

        const actividades = query.data.data.actividades ?? [];
        const manuales = query.data.data.manuales_actividades ?? [];

        const agrupadoPorUnidad = actividades.reduce<Record<string, Actividad[]>>((acc, contenido) => {
        if (!acc[contenido.unidad]) acc[contenido.unidad] = [];
        acc[contenido.unidad].push(contenido);
        return acc;
        }, {});

        return {
        agrupadoPorUnidad,
        manuales,
        };
    }, [query.data]);

    return {
        ...query,
        dataMapped,
    };
};

export const updateActividad = async (data: { id_recurso: number, contenido: string, archivos: File[], archivos_eliminar: any[] }): Promise<ActividadEntregadaResponse> => {
  const payload = { id_recurso: data.id_recurso, contenido: data.contenido, archivos_eliminar: data.archivos_eliminar };
  console.log(payload);
  const encryptedPayload = await apiClient.encryptData(payload);

  const formData = new FormData();
  formData.append("data", encryptedPayload);

  data.archivos.forEach((archivo) => {
    formData.append("archivos", archivo);
  });

  return await apiClient.post<ActividadEntregadaResponse>(
    CURSOS_ACTIVOS_ENDPOINTS.POST_ACTIVIDADES.path,
    formData
  );
};

export const useGetTutorias = (id: number, tab: string) => {
    const idRecurso = TabsCursos.find((item) => item.tipo === tab)?.id_tipo_recurso;

    return useQuery<CursosTutoriasResponse, Error>({
        queryKey: [tab],
        queryFn: () => apiClient.get<CursosTutoriasResponse>(`${CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.path}?id_curso=${id}&id_tipo_recurso=${idRecurso}`),
    });
}