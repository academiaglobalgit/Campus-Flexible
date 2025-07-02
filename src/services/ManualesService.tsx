import { useQuery } from "@tanstack/react-query";
import type { ManualesResponse } from "../types/manuales.interface";
import { MANUALES_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";

export const useGetManuales = (id_manual: number, id_plan_estudios: number) => {
    return useQuery<ManualesResponse, Error>({
        queryKey: [MANUALES_ENDPOINTS.GET_MANUALES.key, id_manual],
        queryFn: async () => await apiClient.get<ManualesResponse>(`${MANUALES_ENDPOINTS.GET_MANUALES.path}?tipo=${id_manual}&id_plan_estudio=${id_plan_estudios}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}