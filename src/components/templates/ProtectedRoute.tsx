import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { AppRoutingPaths } from '@constants';

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isInitializing } = useAuth();
    const location = useLocation();
return <Outlet />;
    if (isInitializing) {
        return ''; // show un spinner mientras verifica
    }

    if (!isAuthenticated) {
        return <Navigate to={AppRoutingPaths.LOGIN} state={{ from: location }} replace />;
    }

    return <Outlet />;
}