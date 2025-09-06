import type { AuthResponse, LoginCredentials, PerfilResponse } from '@constants';
import { apiClient } from './ApiConfiguration/httpClient';
import { LOGIN_ENDPOINTS, PERFIL_ENDPOINTS } from '../types/endpoints';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

export const useAuthLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const encryptedPayload = await apiClient.encryptData(credentials);
    return await apiClient.post<AuthResponse>(LOGIN_ENDPOINTS.POST_LOGIN.path, { data: encryptedPayload });
};

export const useLogout = async (): Promise<void> => {
  return await apiClient.post<void>(LOGIN_ENDPOINTS.POST_LOGOUT.path);
};

export const useAuthNewPassword = async (payload: { username: string; newPassword: string; token: string }): Promise<AuthResponse> => {
    const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    const { token, ...dataToEncrypt } = payload;

    const encryptedPayload = await apiClient.encryptData(dataToEncrypt);

    const response = await axios.post<AuthResponse>(
        `${BASE_URL}${LOGIN_ENDPOINTS.POST_NEW_PASSWORD.path}`,
        { data: encryptedPayload },
        {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // se usa el token manualmente
        },
        }
    );

    return response.data;
};

export const useGetPerfilUsuario = (key: string, options?: { enabled?: boolean }) => {
    return useQuery<PerfilResponse, Error>({
        queryKey: [PERFIL_ENDPOINTS.GET_PERFIL.key, key],
        queryFn: async () => await apiClient.get<PerfilResponse>(`${PERFIL_ENDPOINTS.GET_PERFIL.path}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
        ...options,
    });
};