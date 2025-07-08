import { useQuery } from "@tanstack/react-query";
import type { BibliotecaResponse, BibliotecaVideotecaResponse } from "../types/BibliotecaVideoteca.interface";
import { BIBLIOTECA_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";

export const useGetBiblioteca = () => {
     return useQuery<BibliotecaResponse, Error>({
         queryKey: [BIBLIOTECA_ENDPOINTS.GET_BIBLIOTECA.key],
         queryFn: async () => await apiClient.get<BibliotecaResponse>(`${BIBLIOTECA_ENDPOINTS.GET_BIBLIOTECA.path}?id_modulo_campus=5`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
     });
}

export const useGetBibliotecaById = (id: number | undefined, options?: { enabled?: boolean }) => {
  return useQuery<BibliotecaVideotecaResponse, Error>({
    queryKey: [BIBLIOTECA_ENDPOINTS.GET_BIBLIOTECA_BY_ID.key, id],
    enabled: options?.enabled ?? !!id,
    queryFn: async () =>
      await apiClient.get<BibliotecaVideotecaResponse>(
        `${BIBLIOTECA_ENDPOINTS.GET_BIBLIOTECA_BY_ID.path}?id_modulo_padre=${id}`
      ),
    staleTime: 1000 * 60 * 5,
  });
};