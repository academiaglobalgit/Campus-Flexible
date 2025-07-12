import type { AuthResponse, LoginCredentials, PerfilResponse } from '@constants';
import { apiClient } from './ApiConfiguration/httpClient';
import { LOGIN_ENDPOINTS, PERFIL_ENDPOINTS } from '../types/endpoints';
import { useQuery } from '@tanstack/react-query';

export const useAuthLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const encryptedPayload = await apiClient.encryptData(credentials);
    return await apiClient.post<AuthResponse>(LOGIN_ENDPOINTS.POST_LOGIN.path, { data: encryptedPayload });
};

export const useLogout = async (): Promise<void> => {
  return await apiClient.post<void>(LOGIN_ENDPOINTS.POST_LOGOUT.path);
};

export const useGetPerfilUsuario = (options?: { enabled?: boolean }) => {
    return useQuery<PerfilResponse, Error>({
        queryKey: [PERFIL_ENDPOINTS.GET_PERFIL.key],
        queryFn: async () => await apiClient.get<PerfilResponse>(`${PERFIL_ENDPOINTS.GET_PERFIL.path}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
        ...options,
    });
};