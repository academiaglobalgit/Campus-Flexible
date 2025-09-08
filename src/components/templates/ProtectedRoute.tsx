import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { AppRoutingPaths } from '@constants';
import { apiClient } from '../../services/ApiConfiguration/httpClient';
import { LoadingCircular } from '../molecules/LoadingCircular/LoadingCircular';

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isInitializing, isTokenExpired, isLogout, aceptoTerminos } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleUnauthorized = React.useCallback(() => {
        navigate(AppRoutingPaths.SESSION_EXPIRED, { state: { from: location }, replace: true });
    }, [navigate, location]);

    React.useEffect(() => {
        const unsubscribe = apiClient.subscribeUnauthorized(handleUnauthorized);
        return () => {
            unsubscribe();
        };
    }, [handleUnauthorized]);
    

    if (isInitializing) {
        return <LoadingCircular Text="" />;
    }

    if (isLogout) {
        return (
            <Navigate
                to={"/"}
                state={{ from: location }}
                replace
            />
        );
    }
    
    if (!isAuthenticated && !isTokenExpired) {
        return (
            <Navigate
                to={"/"}
                state={{ from: location }}
                replace
            />
        );
    }
    
    if (isTokenExpired) {
        return (
            <Navigate
                to={AppRoutingPaths.SESSION_EXPIRED}
                state={{ from: location }}
                replace
            />
        );
    }
    
    console.log(aceptoTerminos);

    if(!aceptoTerminos) {
        return <Navigate to={AppRoutingPaths.TERMINOS_CONDICIONES} state={{ from: location }} replace />;
    }

    return <Outlet />;
}