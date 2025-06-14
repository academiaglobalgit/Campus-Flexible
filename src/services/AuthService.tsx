import type { AuthResponse, LoginCredentials } from '@constants';
import { apiClient } from './ApiConfiguration/httpClient';
import { LOGIN_ENDPOINTS } from '../types/endpoints';

export const useAuthLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return await apiClient.post<AuthResponse>(LOGIN_ENDPOINTS.POST_LOGIN.path, credentials);
};

export const useLogout = async (_id: number): Promise<boolean> => {
  // await apiClient.post<void>(`/auth/logout/${id}`);
  return true;
};