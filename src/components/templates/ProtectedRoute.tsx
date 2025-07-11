import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { AppRoutingPaths } from '@constants';
import { apiClient } from '../../services/ApiConfiguration/httpClient';
import { LoadingCircular } from '../molecules/LoadingCircular/LoadingCircular';

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isInitializing, isTokenExpired, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    React.useEffect(() => {
        const unsubscribe = apiClient.subscribeUnauthorized(() => {
            console.log("Unauthorized access detected, redirecting to login.");
            logout();
            return <Navigate to={AppRoutingPaths.LOGIN} state={{ from: location }} replace />;
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);


    if (isInitializing) {
        return <LoadingCircular Text='' />; // show un spinner mientras verifica
    }

    if (!isAuthenticated || isTokenExpired) {
        console.log(isAuthenticated, isTokenExpired);
        return <Navigate to={AppRoutingPaths.LOGIN} state={{ from: location }} replace />;
    }

    return <Outlet />;
}