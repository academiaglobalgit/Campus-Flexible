import React from 'react';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import Logo from '../../../assets/logo_ag.svg';
import { useNavigate } from 'react-router-dom';
import { cleanStorage } from '../../../hooks/useLocalStorage';
import { useAuth } from '../../../hooks';
import { removeAvatarScript } from '../../../utils/Helpers';
import { Typography } from '../../atoms/Typography/Typography';
import theme from '../../../themes/theme';

const SessionExpired: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleRedirectToLogin = () => {
        logout();
        cleanStorage();
        navigate("/");
    };

    removeAvatarScript()
    return (

        <Grid size={{ md: 8 }} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '100vh',
            padding: isMobile ? '0 20px' : '0 100px'
        }}>
            <Box
                component="img"
                src={Logo}
                alt="AG College Logo"
                sx={{
                    width: '100%',
                    height: '170px'
                }}
            />
            <Typography variant="h1" component="h1" sxProps={{ color: theme.palette.text.secondary }}>
                Sesión Finalizada
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleRedirectToLogin}
                style={{ marginTop: '1rem', padding: '22px' }}
            >
                Iniciar Sesión Nuevamente
            </Button>
        </Grid>

    );
};

export default SessionExpired;
