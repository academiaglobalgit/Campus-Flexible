import { useQuery } from "@tanstack/react-query";
import { SALA_CONVERSACION } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { SalaConversaCionResponse }  from '../types/salaConversacion';

export const useGetSalaConversacion = (id_tipo_sala: number) => {
    return useQuery<SalaConversaCionResponse, Error>({
        queryKey: [SALA_CONVERSACION.GET_MENSAJES.key],
        queryFn: async () => await apiClient.get<SalaConversaCionResponse>(`${SALA_CONVERSACION.GET_MENSAJES.path}?id_tipo_sala=${id_tipo_sala}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}