import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthLogin as loginApi, useLogout as logoutApi, useAuthNewPassword, useGetPerfilUsuario } from '../services/AuthService';
import type { User } from '@constants';
import { checkAuthStatus, cleanStorage, setAuthModel, getAuthModel, setToken } from '../hooks/useLocalStorage';
import { encryptData } from '../utils/crypto';
import type { ConfigPlataforma } from '../types/ConfigPlataforma.interface';
import { loadConfig } from '../config/configStorage';

interface AuthContextType {
  user: User | null;
  isLoading?: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isInitializing: boolean;
  isTokenExpired: boolean;
  isLogout: boolean;
  aceptoTerminos: boolean;
  configPlataforma: ConfigPlataforma | null;
  clearError: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; cambiarPassword?: boolean; aceptoTerminos?: boolean }>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  newPassword: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  setAceptoTerminos?: (acepto: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [aceptoTerminos, setAceptoTerminos] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLogout, setIsLogout] = useState(false);
    const [_nombrePrograma, setNombrePrograma] = useState("");
    const [configPlataforma, setConfigPlataforma] = useState<ConfigPlataforma | null>(null);

    const { refetch } = useGetPerfilUsuario("Login", { enabled: false });

    const queryClient = useQueryClient();
    
    useEffect(() => {
        loadConfig().then((cfg) => {
          setConfigPlataforma(cfg.data || null);
        });
    }, []);

    // Verificar autenticación al montar el componente
    useEffect(() => {
        const checkAuth = async () => {
            setIsInitializing(true);

            try {
                const { isAuth, tokenExpired } = await checkAuthStatus();
                setIsAuthenticated(isAuth);
                setIsTokenExpired(tokenExpired);
                if (isAuth && !tokenExpired) {
                    const userData = await getAuthModel();
                    setUser(userData);
                    setAceptoTerminos(userData?.aceptoTerminos);
                    setNombrePrograma(userData.nombrePrograma);
                }
            } catch (error) {
                console.error("Error checking auth:", error);
            }
            setIsLoading(false);
            setIsInitializing(false);
        };

        checkAuth();
    }, []);

    const loginMutation = useMutation({
        mutationFn: loginApi,
        onError: (err: any) => {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    });

    const newPasswordMutation = useMutation({
        mutationFn: useAuthNewPassword,
        onError: (err: any) => {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    });

    const logoutMutation = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            cleanStorage();
            setUser(null);
            setIsLogout(true);
            setIsAuthenticated(false);
            setIsTokenExpired(false);
            setAceptoTerminos(true);
            queryClient.clear();
        }
    });

    const handleLogin = async(email: string, password: string) => {
        try {
            initValues();

            const username = email;
            const response = await loginMutation.mutateAsync({ password, username });
            
            queryClient.invalidateQueries({ queryKey: ['currentUser']});

            if(response?.session) {
                localStorage.setItem("session", response.session);
                return { success: false, data: null, cambiarPassword: true };
            }

            if (response?.token) {
                const aceptoTerminosValue = response?.acepto_terminos
                setToken(response?.token);
                setAceptoTerminos(aceptoTerminosValue);
                setNombrePrograma(response?.programa);           
                
                await procesarPerfil(response?.acepto_terminos, response?.programa);

                setIsAuthenticated(true);                
                setIsLoading(false);
                
                return { success: true, data: null, cambiarPassword: false, aceptoTerminos: aceptoTerminosValue };
            } else {
                setIsLoading(false);
                const errorMessage = response?.message || 'Autenticación fallida';
                setError(errorMessage);
                return { success: false, message: errorMessage, cambiarPassword: false };
            }
        } catch (error: any) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Error al conectar con el servidor';
            setError(errorMessage);
            return { success: false, message: errorMessage, cambiarPassword: false };
        }
    }

    const handleNewPassword = async(email: string, password: string) => {
        try {
            initValues();

            const username = email;
            const token = localStorage.getItem("session") || "";
            const response = await newPasswordMutation.mutateAsync({ newPassword: password, username, token });
            
            localStorage.removeItem("session");

            queryClient.invalidateQueries({ queryKey: ['currentUser']});

            if (response?.token) {
                const aceptoTerminosValue = response?.acepto_terminos ?? false;
                setToken(response?.token);
                setAceptoTerminos(aceptoTerminosValue);     
                setNombrePrograma(response?.programa);           
                
                await procesarPerfil(response?.acepto_terminos, response?.programa);
                
                setIsAuthenticated(true);
                setIsLoading(false);
                
                return { success: true, data: null, aceptoTerminos: false };
            } else {
                setIsLoading(false);
                const errorMessage = response?.message || 'Autenticación fallida';
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error: any) {
            setIsLoading(false);
            const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Error al conectar con el servidor';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    }

    const procesarPerfil = async(pAceptoTerminos: boolean | undefined, programa: string | undefined) => {
        const perfil = await refetch();

        if (perfil.data) {
            const datos = perfil.data.data;
            
            const aceptoTerminosValue = pAceptoTerminos;

            const auth = {
                name: `${datos.nombre} ${datos.apellido_paterno} ${datos.apellido_materno}`,
                email: datos.correo,
                photo: datos.foto_perfil_url,
                city: datos.nombre_ciudad,
                phone: datos.telefonos?.find((item) => item.tipo === "Celular")?.numero ?? "0000000000",
                perfil: datos,
                aceptoTerminos: aceptoTerminosValue,
                nombrePrograma: programa,
            };

            setUser(auth);

            setAceptoTerminos(aceptoTerminosValue ?? false);

            const encry = await encryptData(auth);
            setAuthModel(encry);
        } else {
            setUser(null);
        }
    };

    const handleAceptoTerminos = async (acepto: boolean) => {
        setAceptoTerminos(acepto);
        if (user) {
            const updatedUser = { ...user, aceptoTerminos: acepto };
            setUser(updatedUser);
            const encry = await encryptData(updatedUser);
            setAuthModel(encry);
        }
    }

    const handleLogout = async () => {
        setIsLogout(true);
        setIsAuthenticated(false);
        setIsTokenExpired(false);
        await logoutMutation.mutate();
    };
    
    const clearError = () => {
        setError(null);
    };

    const initValues = () => {
        setUser(null);
        setIsLoading(true);
        setIsAuthenticated(false);
        setError(null);
        setIsTokenExpired(false);   
        setIsLogout(false);
        setAceptoTerminos(true);
    }

    const value = {
        user,
        isLoading,
        isAuthenticated,
        error,
        isInitializing,
        isTokenExpired,
        isLogout,
        aceptoTerminos,
        configPlataforma,
        login: handleLogin,
        logout: handleLogout,
        clearError,
        setUser,
        newPassword: handleNewPassword,
        setAceptoTerminos: handleAceptoTerminos,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};