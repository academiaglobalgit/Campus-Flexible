import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0C4D88',
      "300": '#005A9B'
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: "#E02B1D"
    },
    warning: {
      main: "#D9A514"
    },
    success: {
      main: "#D9A514"
    },
    grey: {
      50: '#E6EFFC',      
      100: '#7B8186',
      200: '#758FA8',
      500: '#231F20',
    },
    text: {
      primary: '#231F20',
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '64px',
      lineHeight: '76px',
    },
    h2: {
      fontWeight: 600,
      fontSize: '36px',
      lineHeight: '44px',
    },
    h3: {
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: '36px',
    },
    h4: {
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '28px',
    },
    body1: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '18px',
    },
    body2: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: '4px',
          marginBottom: theme.spacing(3),
          '&:before': {
            display: 'none',
          },
          boxShadow: 'none',
          '&.Mui-expanded': {
            margin: theme.spacing(3, 0),
          },
          '&.Mui-disabled': {
            borderColor: theme.palette.action.disabled,
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        // Estas serán las props por defecto para todos los TextField
        variant: 'outlined',
        fullWidth: true,
        size: 'medium',
        autoComplete: 'new-password',
      },
      styleOverrides: {
        root: ({theme}) => ({
          // Estilos globales para TextField
          marginBottom: '1rem',
          '& .MuiOutlinedInput-root': {
            // Estilos específicos para el outlined variant
            borderRadius: '4px',
          },
          '& .MuiInputLabel-root': {
            // Estilos para el label
            transform: 'translate(14px, 14px) scale(1)',
            '&.Mui-focused': {
              transform: 'translate(14px, -9px) scale(0.75)',
            },
            '&.MuiFormLabel-filled': {
              transform: 'translate(14px, -9px) scale(0.75)',
            },
          },
          '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: theme.palette.primary.light,
          },
          '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: theme.palette.text.secondary,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '14px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({theme}) => ({
          marginTop: '16px',
          marginBottom: '16px',
          '&::before, &::after': {
            borderColor: theme.palette.primary.main,
          }
        })
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;