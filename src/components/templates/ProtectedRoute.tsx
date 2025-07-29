import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { AppRoutingPaths } from '@constants';
import { apiClient } from '../../services/ApiConfiguration/httpClient';
import { LoadingCircular } from '../molecules/LoadingCircular/LoadingCircular';

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isInitializing, isTokenExpired } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    React.useEffect(() => {
        const unsubscribe = apiClient.subscribeUnauthorized(() => {
            return <Navigate to={AppRoutingPaths.SESSION_EXPIRED} state={{ from: location }} replace />;
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);


    if (isInitializing) {
        return <LoadingCircular Text='' />; // show un spinner mientras verifica
    }

    if (!isAuthenticated || isTokenExpired) {
        return <Navigate to={AppRoutingPaths.SESSION_EXPIRED} state={{ from: location }} replace />;
    }

    return <Outlet />;
}