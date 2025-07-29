import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { AppRoutingPaths } from '@constants';
import { cleanStorage } from '../../../hooks/useLocalStorage';
import { useAuth } from '../../../hooks';

const SessionExpired: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleRedirectToLogin = () => {
        // Puedes limpiar storage aquí si es necesario
        logout();
        cleanStorage();
        navigate(AppRoutingPaths.LOGIN);
    };

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                textAlign: 'center',
                padding: '2rem',
            }}
        >
            <LogoutIcon style={{ fontSize: 80, color: '#f44336' }} />
            <h1>Sesión Finalizada</h1>
            <p>Tu sesión ha expirado.</p>
            <Button
                variant="contained"
                color="primary"
                onClick={handleRedirectToLogin}
                style={{ marginTop: '1rem' }}
            >
                Iniciar Sesión Nuevamente
            </Button>
        </div>
    );
};

export default SessionExpired;
