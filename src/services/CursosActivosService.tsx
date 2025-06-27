import { useQuery } from '@tanstack/react-query';
import { apiClient } from './ApiConfiguration/httpClient';
import { CURSOS_ACTIVOS_ENDPOINTS } from "../types/endpoints";

export const useGetCursos = () => {
    return useQuery<any, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS.key],
        queryFn: () => apiClient.get(CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS.path),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
};

export const useGetCursosById = (id: number) => {
    return useQuery<any, Error>({
        queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS_BY_ID.key],
        queryFn: () => apiClient.get(`${CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS_BY_ID.path}?id_materia=${id}`),
    });
};
