import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { apiClient } from './ApiConfiguration/httpClient';
import { CURSOS_ACTIVOS_ENDPOINTS } from "../types/endpoints";
import type { Actividad, CursosActividadesResponse, CursosActivosResponse, CursosTabs, CursosTabsResponse, CursosTutoriasResponse, ActividadEntregadaResponse, ListaPendientes } from '@constants';
import React from 'react';
import type { CursosForosResponse, CursosListaPendientesResponse } from '../types/Cursos.interface';
import type { EncuestasResponse } from '../types/Encuestas.interface';

const BASE_URL_ACTIVIDADES = 'https://mofjs2cyn5xz6snfoccjdemodu0buajp.lambda-url.us-east-2.on.aws/api/v1/alumnos';

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
];

export const useGetCursosTabs = (id: number, tab: string) => {
    const idRecurso = TabsCursos.find((item) => item.tipo === tab)?.id_tipo_recurso;

    const query = useQuery<CursosTabsResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, tab, id],
        queryFn: () => apiClient.get<CursosTabsResponse>(`${CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.path}?id_curso=${id}&id_tipo_recurso=${idRecurso}`),
    });

    const mapData = (data: CursosTabs[]) => {
        const agrupadoPorUnidad = data.reduce<Record<string, CursosTabs[]>>((acc, contenido) => {
            if (!acc[contenido.titulo_elemento]) {
                acc[contenido.titulo_elemento] = [];
            }
            acc[contenido.titulo_elemento].push(contenido);
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

export const useGetContenidoTabs = (id: number, tab: string) => {
    const idRecurso = TabsCursos.find((item) => item.tipo === tab)?.id_tipo_recurso;

    return useQuery<CursosTabsResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, tab, id],
        queryFn: () => apiClient.get<CursosTabsResponse>(`${CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.path}?id_curso=${id}&id_tipo_recurso=${idRecurso}`),
    });
};

export type ActividadesCacheData = {
    agrupadoPorUnidad: Record<string, Actividad[]>;
};

export const useGetActividades = (id: number, tab: string): UseQueryResult<CursosActividadesResponse> & { dataMapped?: ActividadesCacheData; } => {
    const idRecurso = TabsCursos.find((item) => item.tipo === tab)?.id_tipo_recurso;

    const query = useQuery<CursosActividadesResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, tab, id],
        queryFn: () =>
            apiClient.get<CursosActividadesResponse>(
                `${CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.path}?id_curso=${id}&id_tipo_recurso=${idRecurso}`
            ),
    });

    const dataMapped = React.useMemo<ActividadesCacheData | undefined>(() => {
        if (!query.data) return undefined;

        const actividades = query.data.data.actividades ?? [];
        // const manuales = query.data.data.manual ?? [];

        const agrupadoPorUnidad = actividades.reduce<Record<string, Actividad[]>>((acc, contenido) => {
            if (!acc[contenido.titulo_elemento]) acc[contenido.titulo_elemento] = [];
            acc[contenido.titulo_elemento].push(contenido);
            return acc;
        }, {});

        return {
            agrupadoPorUnidad,
        };

    }, [query.data]);

    return {
        ...query,
        dataMapped,
    };
};


export const updateActividad = async (data: { id_recurso: number; contenido: string; archivos: File[]; archivos_eliminar: any[]; id_entrega: number | null;}): Promise<ActividadEntregadaResponse> => {

    const payload = {
        id_recurso: data.id_recurso,
        contenido: data.contenido,
        archivos_eliminar: data.archivos_eliminar,
        id_entrega: data.id_entrega,
    };

    const encryptedPayload = await apiClient.encryptData(payload);

    const formData = new FormData();
    formData.append('data', encryptedPayload);
    data.archivos.forEach((archivo) => formData.append('archivos', archivo));

    const client = apiClient.withBaseUrl(BASE_URL_ACTIVIDADES);

    return await client.post<ActividadEntregadaResponse>(
        CURSOS_ACTIVOS_ENDPOINTS.POST_ACTIVIDADES.path,
        formData
    );
};


export const useGetTutorias = (id: number, tab: string) => {
    const idRecurso = TabsCursos.find((item) => item.tipo === tab)?.id_tipo_recurso;

    return useQuery<CursosTutoriasResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, tab, id],
        queryFn: () => apiClient.get<CursosTutoriasResponse>(`${CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.path}?id_curso=${id}&id_tipo_recurso=${idRecurso}`),
    });
}

export const useGetListaPendientes = (id: number) => {
    const query = useQuery<CursosListaPendientesResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_LISTA_PROGRESO.key],
        queryFn: () => apiClient.get<CursosListaPendientesResponse>(`${CURSOS_ACTIVOS_ENDPOINTS.GET_LISTA_PROGRESO.path}?id_curso=${id}`),
    });

    const mapData = (data: ListaPendientes[]) => {
        const agrupado = data.reduce<Record<string, ListaPendientes[]>>((acc, item) => {
            if (!acc[item.tipo_recurso]) {
                acc[item.tipo_recurso] = [];
            }

            acc[item.tipo_recurso].push(item);
            return acc;
        }, {});

        // Ordenar cada grupo por 'orden'
        Object.keys(agrupado).forEach((tipo) => {
            agrupado[tipo].sort((a, b) => a.orden - b.orden);
        });

        return agrupado;
    };

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }
}

export const useGetForosManuales = (id: number, tab: string) => {
    const idRecurso = TabsCursos.find((item) => item.tipo === tab)?.id_tipo_recurso;

    return useQuery<CursosForosResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key, tab, id],
        queryFn: () =>
            apiClient.get<CursosForosResponse>(
                `${CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.path}?id_curso=${id}&id_tipo_recurso=${idRecurso}`
            ),
    });
};

export const useGetEncuestas = (options?: { enabled?: boolean }) => {
    const query = useQuery<EncuestasResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_ENCUESTAS_ASIGNACIONES.key],
        queryFn: async () => await apiClient.get<EncuestasResponse>(`${CURSOS_ACTIVOS_ENDPOINTS.GET_ENCUESTAS_ASIGNACIONES.path}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
        ...options
    });

    return query
};


type SaveEncuestaPayload = {
    respuestas: any;
    id_asignacion: number;
};

export const SaveEncuesta = async (payload: SaveEncuestaPayload): Promise<EncuestasResponse> => {
    const { id_asignacion, respuestas } = payload;

    const encryptedPayload = await apiClient.encryptData({ respuestas });

    return await apiClient.post<EncuestasResponse>(
        `${CURSOS_ACTIVOS_ENDPOINTS.SET_ENCUESTAS_ASIGNACIONES.path}/${id_asignacion}/respuestas`,
        { data: encryptedPayload }
    );
};

export const updateVideoVisto = async (): Promise<EncuestasResponse> => {
    return await apiClient.post<EncuestasResponse>(
        `${CURSOS_ACTIVOS_ENDPOINTS.POST_VIDEO_VISTO.path}`,
    );
};