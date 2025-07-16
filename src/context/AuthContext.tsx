import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthLogin as loginApi, useLogout as logoutApi, useGetPerfilUsuario } from '../services/AuthService';
import type { User } from '@constants';
import { checkAuthStatus, cleanStorage, setAuthModel, getAuthModel, setToken } from '../hooks/useLocalStorage';

interface AuthContextType {
  user: User | null;
  isLoading?: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isInitializing: boolean;
  clearError: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isTokenExpired: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const { refetch } = useGetPerfilUsuario({ enabled: false });

    const queryClient = useQueryClient();
    
    // Verificar autenticación al montar el componente
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authStatus = await checkAuthStatus();
                if(!authStatus.isAuth) {
                    setIsAuthenticated(false);
                }else if (authStatus.tokenExpired) {
                    setIsTokenExpired(true);
                }

                if (authStatus.isAuth) {
                    const userData = await getAuthModel();
                    setUser(userData);
                }
                setIsAuthenticated(authStatus.isAuth);
            } catch (error) {
                console.error("Error checking auth:", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
                setIsInitializing(false);
            }
        };

        checkAuth();
    }, []);

    const loginMutation = useMutation({
        mutationFn: loginApi,
        onError: (err: any) => {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    });

    const logoutMutation = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            cleanStorage();
            setUser(null);
            setIsAuthenticated(false);
            setIsTokenExpired(false);
            queryClient.clear();
        }
    });

    const handleLogin = async(email: string, password: string) => {
        try {
            initValues();

            const username = email;
            const response = await loginMutation.mutateAsync({ password, username });
            
            queryClient.invalidateQueries({ queryKey: ['currentUser']});

            if (response?.token) {
                setToken(response?.token);
                setIsAuthenticated(true);

                const perfil = await refetch();
                
                setIsLoading(false);

                if (perfil.data) {
                    const auth = {
                            name: `${perfil.data.data.nombre} ${perfil.data.data.apellido_paterno} ${perfil.data.data.apellido_materno}`,
                            email: perfil.data.data.correo,
                            photo: perfil.data.data.foto_perfil_url,
                            city: `${perfil.data.data.nombre_ciudad}`
                        };
                    setUser(auth);
                    setAuthModel(auth);
                } else {
                    setUser(null);
                }

                return { success: true, data: null };
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

    const handleLogout = async () => {
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
    }

    const value = {
        user,
        isLoading,
        isAuthenticated,
        error,
        isInitializing,
        login: handleLogin,
        logout: handleLogout,
        clearError,
        isTokenExpired
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};