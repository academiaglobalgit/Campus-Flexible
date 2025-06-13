import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthLogin as loginApi, useLogout as logoutApi } from '../services/AuthService';
import type { User } from '@constants';
import { checkAuthStatus, cleanStorage, getAuthModel, setAuthModel } from '../hooks/useLocalStorage';

interface AuthContextType {
  user: User | null;
  isLoading?: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isInitializing: boolean;
  clearError: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);

    const queryClient = useQueryClient();
    
    // Verificar autenticación al montar el componente
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authStatus = await checkAuthStatus();
                if (authStatus) {
                    const userData = await getAuthModel();
                    setUser(userData);
                }
                setIsAuthenticated(authStatus);
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
            queryClient.clear();
        }
    });

    const handleLogin = async(email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await loginMutation.mutateAsync({ email, password });
            
            queryClient.invalidateQueries({ queryKey: ['currentUser']});

            setIsLoading(false);

            if (response?.data?.token) {
                setUser(response.data);
                setAuthModel(response.data);
                setIsAuthenticated(true);
                return { success: true, data: response.data };
            } else {
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
        await logoutMutation.mutate(user!.id);
    };
    
    const clearError = () => {
        setError(null);
    };

    const value = {
        user,
        isLoading,
        isAuthenticated,
        error,
        isInitializing,
        login: handleLogin,
        logout: handleLogout,
        clearError
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