import { useQuery } from '@tanstack/react-query';
import { apiClient } from './ApiConfiguration/httpClient';
import { CURSOS_ACTIVOS_ENDPOINTS } from "../types/endpoints";
import type { Contenido, CursosActivosResponse, CursosContenidoResponse } from '@constants';
import React from 'react';

export const useGetCursos = () => {
    return useQuery<CursosActivosResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS.key],
        queryFn: () => apiClient.get<CursosActivosResponse>(CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS.path),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
};

export const useGetCursosContenidoById = (id: number) => {
    const query = useQuery<CursosContenidoResponse, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.key],
        queryFn: () => apiClient.get<CursosContenidoResponse>(`${CURSOS_ACTIVOS_ENDPOINTS.GET_CURSOS_CONTENIDO_BY_ID.path}?id_curso=${id}&id_tipo_recurso=3`),
    });

    const mapData = (data: Contenido[]) => {
        const agrupadoPorUnidad = data.reduce<Record<string, Contenido[]>>((acc, contenido) => {
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
