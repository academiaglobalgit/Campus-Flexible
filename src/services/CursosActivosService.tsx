import { useQuery } from '@tanstack/react-query';
import { apiClient } from './ApiConfiguration/httpClient';
import { CURSOS_ACTIVOS_ENDPOINTS } from "../types/endpoints";
import type { CursosActivosResponse, CursosTabs, CursosTabsResponse } from '@constants';
import React from 'react';

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
    { id_tipo_recurso: 1, tipo: "Tutorias" },
    { id_tipo_recurso: 1, tipo: "Evaluaciones" },
    { id_tipo_recurso: 1, tipo: "ListaPendientes" },    
];

export const useGetCursosTabs = (id: number, tab: string) => {
    const idRecurso = TabsCursos.find((item) => item.tipo === tab)?.id_tipo_recurso;

    const query = useQuery<CursosTabsResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key],
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

export const useUpdateActividad = async (id_recurso: number, contenido: string): Promise<any> => {
    const payload = {id_recurso, contenido};
    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<any>(CURSOS_ACTIVOS_ENDPOINTS.POST_ACTIVIDADES.path, { data: encryptedPayload });
};