import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { AppRouting as router } from './AppRouting';
import { QueryProvider } from './providers/QueryProvider';
import './index.scss';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './providers/NotificationProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
  </StrictMode>,
)
