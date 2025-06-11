import { jwtDecode } from 'jwt-decode';

const TOKEN_STORAGE_KEY = import.meta.env.VITE_APP_AUTH_TOKEN;
const AUTH_MODEL_STORAGE_KEY = import.meta.env.VITE_APP_AUTH;

export const checkAuthStatus = async (): Promise<boolean> => {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        if (!decoded?.exp) return false;
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

export const getToken = (): string => {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
};

const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getAuthModel = (): any => {
    const authModel = JSON.parse(
        localStorage.getItem(AUTH_MODEL_STORAGE_KEY) || '{}'
    );
    return authModel;
}

export const setAuthModel = (auth: any): void => {
    localStorage.setItem(AUTH_MODEL_STORAGE_KEY, JSON.stringify(auth));
    setToken(auth.token);
}

export const cleanStorage = (): void => {
    // Remove Authorization token used in Interceptor
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    // Remove Authentication model
    localStorage.removeItem(AUTH_MODEL_STORAGE_KEY);
}
