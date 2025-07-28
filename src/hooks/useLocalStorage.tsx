import { jwtDecode } from 'jwt-decode';
import { decryptData } from '../utils/crypto';

const TOKEN_STORAGE_KEY = import.meta.env.VITE_APP_AUTH_TOKEN;
const AUTH_MODEL_STORAGE_KEY = import.meta.env.VITE_APP_AUTH;
const FORO_KEY = import.meta.env.VITE_APP_FORO;
const TAB_SELECTED_KEY = import.meta.env.VITE_APP_TAB_SELECTED;

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

export const getAuthModel = async() => {
    const encry = localStorage.getItem(AUTH_MODEL_STORAGE_KEY) || "";
    const authModel = await decryptData(encry);
    return authModel; 
}

export const setAuthModel = (auth: string): void => {
    localStorage.setItem(AUTH_MODEL_STORAGE_KEY, auth);
}

export const cleanStorage = (): void => {
    // Remove Authorization token used in Interceptor
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    // Remove Authentication model
    localStorage.removeItem(AUTH_MODEL_STORAGE_KEY);
}

export const setForoSelected = (foro: string) => {
  localStorage.setItem(FORO_KEY, foro);
}

export const getForoSelected = (): string => {
  return localStorage.getItem(FORO_KEY) || '';
}

export const setTabSelected = (tab: { tab: string, index: number }) => {
  const tabs: { tab: string; index: number }[] = JSON.parse(localStorage.getItem(TAB_SELECTED_KEY) || '[]');

  const existingIndex = tabs.findIndex((item: any) => item.tab === tab.tab);

  if (existingIndex >= 0) {
    tabs[existingIndex].index = tab.index;
  } else {
    tabs.push(tab);
  }

  localStorage.setItem(TAB_SELECTED_KEY, JSON.stringify(tabs));
};

export const getTabSelected = (tab: string) => {
  const tabs: { tab: string; index: number }[] = JSON.parse(localStorage.getItem(TAB_SELECTED_KEY) || '[]');

  return tabs.find((item) => item.tab === tab)?.index || 0;
}