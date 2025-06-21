import type { AuthResponse, LoginCredentials } from '@constants';
import { apiClient } from './ApiConfiguration/httpClient';
import { LOGIN_ENDPOINTS } from '../types/endpoints';

export const useAuthLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const encryptedPayload = await apiClient.encryptData(credentials);
    return await apiClient.post<AuthResponse>(LOGIN_ENDPOINTS.POST_LOGIN.path, { data: encryptedPayload });
};

export const useLogout = async (_id: number): Promise<boolean> => {
  // await apiClient.post<void>(`/auth/logout/${id}`);
  return true;
};