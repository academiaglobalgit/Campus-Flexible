import { useQuery } from "@tanstack/react-query";
import { NOTIFICATIONS_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { NotificacionesResponse } from "@constants";

export const useGetNotificaciones = () => {
    return useQuery<NotificacionesResponse, Error>({
        queryKey: [NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS.key],
        queryFn: async () => await apiClient.get<NotificacionesResponse>(NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS.path),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}

export const MarkReadNotification = async(id_notificacion: number) => {
    const payload = {id_notificacion};
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post(NOTIFICATIONS_ENDPOINTS.POST_NOTIFICATIONS.path, { data: encryptedPayload });
}