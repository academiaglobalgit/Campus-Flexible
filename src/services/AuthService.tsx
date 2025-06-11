import type { AuthResponse, LoginCredentials } from '@constants';
import { apiClient } from './ApiConfiguration/httpClient';

export const useAuthLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    credentials = {...credentials, username: credentials.email.toLowerCase() };
    return await apiClient.post<AuthResponse>('/auth/login', credentials);
};

export const useLogout = async (_id: number): Promise<boolean> => {
  // await apiClient.post<void>(`/auth/logout/${id}`);
  return true;
};