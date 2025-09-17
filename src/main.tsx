import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { AppRouting as router } from './AppRouting';
import { QueryProvider } from './providers/QueryProvider';
import './index.scss';

import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './providers/NotificationProvider';
import { getThemeByPlataforma } from './themes';

import { loadAppConfig } from './config/configLoader';
import LogoAG from './assets/logo_ag.svg';

import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Fade from '@mui/material/Fade';
import CssBaseline from '@mui/material/CssBaseline';

function AppLoader() {
  const themeMui = useTheme();
  const isMobile = useMediaQuery(themeMui.breakpoints.down('sm'));
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const baseTheme = getThemeByPlataforma();

  useEffect(() => {
    loadAppConfig().then((cfg) => {
      setConfig(cfg);
      setLoading(false);
    });
  }, []);

  // fusionar theme base con el color dinámico de la API
  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          primary: {
            ...baseTheme.palette.primary,
            main: config?.data.color_primary || baseTheme.palette.primary.main,
          },
        },
      }),
    [config, baseTheme]
  );

  if (loading) {
    return <Box 
              sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F9' }}
            >
              <Box sx={{ width: !isMobile ? '20%' : '50%', textAlign: 'center' }}>
                <Box
                    component="img"
                    src={LogoAG}
                    sx={{ mb: 1 }}
                    width='100%'
                />
                  <LinearProgress/>
              </Box>
            </Box>;
  }

  return (
    <Fade in={!loading} timeout={1000}>
      <Box sx={{ height: '100%' }}>
        <QueryProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <NotificationProvider>
                <RouterProvider router={router} />
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </Box>
    </Fade>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppLoader />
  </StrictMode>
);


