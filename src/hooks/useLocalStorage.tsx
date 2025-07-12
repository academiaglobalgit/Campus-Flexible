import type { User } from '@constants';
import { jwtDecode } from 'jwt-decode';

const TOKEN_STORAGE_KEY = import.meta.env.VITE_APP_AUTH_TOKEN;
const AUTH_MODEL_STORAGE_KEY = import.meta.env.VITE_APP_AUTH;

export const checkAuthStatus = async (): Promise<{ isAuth: boolean; tokenExpired: boolean }> => {
  const token = getToken();
  if (!token) return { isAuth: false, tokenExpired: false };

  try {
    const decoded: { exp?: number } = jwtDecode(token);

    if (!decoded?.exp) {
      console.warn('Token does not have an expiration time');
      return { isAuth: true, tokenExpired: true };
    }
    
    const expired = Date.now() >= decoded.exp * 1000;

    return { isAuth: true, tokenExpired: expired };
  } catch (error) {
    console.error('Error decoding token', error);
    return { isAuth: true, tokenExpired: false };
  }
};

export const getToken = (): string => {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
};

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getAuthModel = (): User => {
    const authModel = JSON.parse(
        localStorage.getItem(AUTH_MODEL_STORAGE_KEY) || '{}'
    );
    return authModel;
}

export const setAuthModel = (auth: User): void => {
    localStorage.setItem(AUTH_MODEL_STORAGE_KEY, JSON.stringify(auth));
    // setToken(auth.token);
}

export const cleanStorage = (): void => {
    // Remove Authorization token used in Interceptor
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    // Remove Authentication model
    localStorage.removeItem(AUTH_MODEL_STORAGE_KEY);
}
