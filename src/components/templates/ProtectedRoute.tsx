import React from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { AppRoutingPaths } from '@constants';
import { apiClient } from '../../services/ApiConfiguration/httpClient';
import { LoadingCircular } from '../molecules/LoadingCircular/LoadingCircular';
import { getTerminoCondiciones } from '../../hooks/useLocalStorage';

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isInitializing, isTokenExpired, isLogout, aceptoTerminos } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const aceptoTerminosLocal = getTerminoCondiciones()


    const handleUnauthorized = React.useCallback(() => {
        navigate(AppRoutingPaths.SESSION_EXPIRED, { state: { from: location }, replace: true });
    }, [navigate, location]);

    React.useEffect(() => {
        const unsubscribe = apiClient.subscribeUnauthorized(handleUnauthorized);
        return () => {
            unsubscribe();
        };
    }, [handleUnauthorized]);

    const removeAvatarScript = () => {
        const scriptName = 'script[data-name="did-agent"]';
        const existingScript = document.querySelector<HTMLScriptElement>(scriptName);
        const target = document.querySelector<HTMLDivElement>('.didagent_target');
        if (target) {
            target.remove(); 
        }
        if (existingScript) {
            document.head.removeChild(existingScript);
        }
    }

    if (isInitializing) {
        return <LoadingCircular Text="" />;
    }

    if (isLogout) {
        removeAvatarScript();
        return (
            <Navigate
                to={"/"}
                state={{ from: location }}
                replace
            />
        );
    }

    if (!isAuthenticated && !isTokenExpired) {
        removeAvatarScript();
        return (
            <Navigate
                to={"/"}
                state={{ from: location }}
                replace
            />
        );
    }

    if (isTokenExpired) {
        removeAvatarScript();
        return (
            <Navigate
                to={AppRoutingPaths.SESSION_EXPIRED}
                state={{ from: location }}
                replace
            />
        );
    }

    if (!aceptoTerminos && aceptoTerminosLocal === '') {
        return <Navigate to={AppRoutingPaths.TERMINOS_CONDICIONES} state={{ from: location }} replace />;
    }

    return <Outlet />;
}