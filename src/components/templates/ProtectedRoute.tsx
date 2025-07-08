import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { AppRoutingPaths } from '@constants';
import { useNotification } from '../../providers/NotificationProvider';

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isInitializing, isTokenExpired } = useAuth();
    const location = useLocation();
    const { showNotification } = useNotification();

    if (isInitializing) {
        return ''; // show un spinner mientras verifica
    }

    if (!isAuthenticated) {
        return <Navigate to={AppRoutingPaths.LOGIN} state={{ from: location }} replace />;
    }

    if (isTokenExpired) {
        showNotification('Tu sesión ha expirado, por favor inicia sesión nuevamente.', 'error');
        return <Navigate to={AppRoutingPaths.LOGIN} state={{ from: location }} replace />;
    }

    return <Outlet />;
}