import { useQuery } from "@tanstack/react-query";
import { SALA_CONVERSACION } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { SalaConversaCionResponse, SalaConversacionEliminarMensaje, SalaConversacionEnviarMensaje } from '../types/salaConversacion';

export const useGetSalaConversacion = (id_tipo_sala: number) => {
    return useQuery<SalaConversaCionResponse, Error>({
        queryKey: [SALA_CONVERSACION.GET_MENSAJES.key],
        queryFn: async () => await apiClient.get<SalaConversaCionResponse>(`${SALA_CONVERSACION.GET_MENSAJES.path}?id_tipo_sala=${id_tipo_sala}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}

export const useSetMensaje = async (payload: SalaConversacionEnviarMensaje) => {
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post(SALA_CONVERSACION.SET_MENSAJES.path, { data: encryptedPayload });
}

export const useDeleteMensaje = async (payload: SalaConversacionEliminarMensaje) => {
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post(SALA_CONVERSACION.DELETE_MENSAJES.path, { data: encryptedPayload });
};
