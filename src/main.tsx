import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { AppRouting as router } from './AppRouting';
import { QueryProvider } from './providers/QueryProvider';
import './index.scss';
import { Box, CssBaseline, Fade, LinearProgress, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './providers/NotificationProvider';
import { getPlataformaFromSubdomain } from './config/plataformaConfig';
import { getThemeByPlataforma } from './themes';

import { loadAppConfig } from './config/configLoader';
import LogoAG from './assets/logo_ag.svg';

const plataforma = getPlataformaFromSubdomain();
const theme = getThemeByPlataforma(plataforma);

import { useEffect, useState } from 'react';

function AppLoader() {
  const themeMui = useTheme();
  const isMobile = useMediaQuery(themeMui.breakpoints.down('sm'));
  // const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppConfig().then(() => {
      // setConfig(cfg);
      setLoading(false);
      // setTimeout(() => setLoading(false), 300);
    });
  }, []);

  if (loading) {
    return <Box 
            sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F9' }}>
      <Box sx={{ width: !isMobile ? '15%' : '50%', textAlign: 'center' }}>
        <Box
            component="img"
            src={LogoAG}
            sx={{ mb: 1 }}
        />
        <LinearProgress />
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


