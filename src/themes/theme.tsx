import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0C4D88',
      300: '#005A9B',
      400: '#0F2848',
      light: '#005A9BCC'
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
      main: "#1F7B5C"
    },
    disabled: {
      main: "#7B8186"
    },
    grey: {
      50: '#E6EFFC',
      100: '#7B8186',
      200: '#758FA8',
      300: '#AAB1B6',
      500: '#231F20',
      600: '#5B6172'
    },
    text: {
      primary: '#231F20',
    },
    white: {
      main: '#ffffff',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontFamily: 'Gotham',
      fontWeight: 700,
      fontSize: '64px',
      lineHeight: '76px',
    },
    h2: {
      fontFamily: 'Gotham',
      fontWeight: 600,
      fontSize: '36px',
      lineHeight: '44px',
    },
    h3: {
      fontFamily: 'Gotham',
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: '36px',
    },
    h4: {
      fontFamily: 'Gotham',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '28px',
    },
    h5: {
      fontFamily: 'Gotham',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '28px'
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
    body3: {
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '24px'
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          height: '40px'
        },
        containedWarning: {
          color: '#fff'
        }
      },
    },
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
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-around',
        },
        flexContainer: {
          justifyContent: 'space-around',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({theme}) => ({
          textTransform: 'none',
          minWidth: 0,
          flex: 1,
          color: '#C0C0C0',
          '&.Mui-selected': {
            color: theme.palette.primary.main, 
          },
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px'
        }),
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;