import { useQuery } from "@tanstack/react-query";
import { MAS_INFORMACION_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { ServiciosEscolaresResponse } from "@constants";

export const useGetServiciosEscolares = () => {
    return useQuery<ServiciosEscolaresResponse, Error>({
         queryKey: [MAS_INFORMACION_ENDPOINTS.GET_SERVICIOS_ESCOLARES.key],
         queryFn: async () => await apiClient.get<ServiciosEscolaresResponse>(`${MAS_INFORMACION_ENDPOINTS.GET_SERVICIOS_ESCOLARES.path}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
     });
}