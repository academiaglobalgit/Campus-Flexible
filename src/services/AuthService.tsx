import type { AuthResponse, LoginCredentials } from '@constants';
import { apiClient } from './ApiConfiguration/httpClient';
import { LOGIN_ENDPOINTS } from '../types/endpoints';

export const useAuthLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const encryptedPayload = await apiClient.encryptData(credentials);
    return await apiClient.post<AuthResponse>(LOGIN_ENDPOINTS.POST_LOGIN.path, { data: encryptedPayload });
};

export const useLogout = async (): Promise<void> => {
  return await apiClient.post<void>(LOGIN_ENDPOINTS.POST_LOGOUT.path);
};