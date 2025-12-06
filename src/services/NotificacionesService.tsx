import { useQuery } from "@tanstack/react-query";
import { NOTIFICATIONS_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { NotificacionesResponse } from "@constants";
import type { NotificacionesReadAllResponse } from "../types/Notificaciones.interface";
const BASE = import.meta.env.VITE_APP_API_BASE_URL;

export const useGetNotificacionesTopBar = () => {
    return useQuery<NotificacionesResponse, Error>({
        queryKey: [NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS_TOP_BAR.key],
        queryFn: async () =>
            await apiClient
                .withBaseUrl(BASE)
                .get<NotificacionesResponse>(NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS.path),
        refetchInterval: 1000 * 60 * 3, // 3 minutos
        refetchIntervalInBackground: true,
        staleTime: 0,
    });
}

export const useGetNotificaciones = () => {
    return useQuery<NotificacionesResponse, Error>({
        queryKey: [NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS.key],
        queryFn: async () =>
            await apiClient
                .withBaseUrl(BASE)
                .get<NotificacionesResponse>(NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS.path),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}

export const MarkReadNotification = async (id_notificacion: number) => {
    const payload = { id_notificacion };
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient
        .withBaseUrl(BASE)
        .post(NOTIFICATIONS_ENDPOINTS.POST_NOTIFICATIONS.path, { data: encryptedPayload });
}

export const ReadAllNotificaciones = async () => {
    return await apiClient
        .withBaseUrl(BASE)
        .post<NotificacionesReadAllResponse>(
        NOTIFICATIONS_ENDPOINTS.POST_READ_ALL_NOTIFICATIONS.path
    );
}