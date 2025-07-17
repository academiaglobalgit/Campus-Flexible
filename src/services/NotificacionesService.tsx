import { useQuery } from "@tanstack/react-query";
import { NOTIFICATIONS_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { NotificacionesResponse } from '../types/notificaciones';


export const useGetNotificaciones = () => {

    const url = `${NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS.path}`;

    return useQuery<NotificacionesResponse, Error>({
        queryKey: [NOTIFICATIONS_ENDPOINTS.GET_NOTIFICATIONS.key],
        queryFn: async () => await apiClient.get<NotificacionesResponse>(url),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });

}

