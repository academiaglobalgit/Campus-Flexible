import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0C4D88',
      300: '#005A9B',
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
  // typography: {
  //   fontFamily: 'Roboto, Arial, sans-serif',
  //   h1: {
  //     fontFamily: 'Gotham',
  //     fontWeight: 700,
  //     fontSize: '64px',
  //     lineHeight: '76px',
  //   },
  //   h2: {
  //     fontFamily: 'Gotham',
  //     fontWeight: 600,
  //     fontSize: '36px',
  //     lineHeight: '44px',
  //   },
  //   h3: {
  //     fontFamily: 'Gotham',
  //     fontWeight: 600,
  //     fontSize: '28px',
  //     lineHeight: '36px',
  //   },
  //   h4: {
  //     fontFamily: 'Gotham',
  //     fontWeight: 600,
  //     fontSize: '20px',
  //     lineHeight: '28px',
  //   },
  //   h5: {
  //     fontFamily: 'Gotham',
  //     fontWeight: 700,
  //     fontSize: '20px',
  //     lineHeight: '28px'
  //   },
  //   body1: {
  //     fontWeight: 400,
  //     fontSize: '14px',
  //     lineHeight: '18px',
  //   },
  //   body2: {
  //     fontWeight: 400,
  //     fontSize: '16px',
  //     lineHeight: '24px',
  //   },
  //   body3: {
  //     fontWeight: 400,
  //     fontSize: '18px',
  //     lineHeight: '24px'
  //   },
  //   subtitle1: {
  //     fontWeight: 500,
  //     fontSize: '16px',
  //     lineHeight: '24px',
  //   },
  // },
  typography: {
  htmlFontSize: 16,
  fontFamily: 'Roboto, Arial, sans-serif',
  h1: {
    fontFamily: 'Gotham',
    fontWeight: 700,
    fontSize: '4rem',        // 64px
    lineHeight: 1.1875,      // 76/64
    '@media (max-width:1536px)': {
      fontSize: '3.5rem',    // 56px
      lineHeight: 1.214,
    },
    '@media (max-width:1366px)': {
      fontSize: '3rem',      // 48px
      lineHeight: 1.25,
    },
    '@media (max-width:1200px)': {
      fontSize: '2.75rem',   // 44px
      lineHeight: 1.273,
    },
    '@media (max-width:900px)': {
      fontSize: '2.5rem',    // 40px
      lineHeight: 1.3,
    },
    '@media (max-width:600px)': {
      fontSize: '2rem',      // 32px
      lineHeight: 1.25,
    },
  },
  h2: {
    fontFamily: 'Gotham',
    fontWeight: 600,
    fontSize: '2.25rem',     // 36px
    lineHeight: 1.222,       // 44/36
    '@media (max-width:1536px)': {
      fontSize: '2.125rem',  // 34px
      lineHeight: 1.235,
    },
    '@media (max-width:1366px)': {
      fontSize: '1.875rem',  // 30px
      lineHeight: 1.267,
    },
    '@media (max-width:1200px)': {
      fontSize: '1.75rem',   // 28px
      lineHeight: 1.286,
    },
    '@media (max-width:900px)': {
      fontSize: '1.5rem',    // 24px
      lineHeight: 1.333,
    },
    '@media (max-width:600px)': {
      fontSize: '1.375rem',  // 22px
      lineHeight: 1.364,
    },
  },
  h3: {
    fontFamily: 'Gotham',
    fontWeight: 600,
    fontSize: '1.75rem',     // 28px
    lineHeight: 1.286,       // 36/28
    '@media (max-width:1536px)': {
      fontSize: '1.625rem',  // 26px
      lineHeight: 1.308,
    },
    '@media (max-width:1366px)': {
      fontSize: '1.5rem',    // 24px
      lineHeight: 1.333,
    },
    '@media (max-width:1200px)': {
      fontSize: '1.375rem',  // 22px
      lineHeight: 1.364,
    },
    '@media (max-width:900px)': {
      fontSize: '1.25rem',   // 20px
      lineHeight: 1.4,
    },
    '@media (max-width:600px)': {
      fontSize: '1.125rem',  // 18px
      lineHeight: 1.444,
    },
  },
  h4: {
    fontFamily: 'Gotham',
    fontWeight: 600,
    fontSize: '1.25rem',     // 20px
    lineHeight: 1.4,         // 28/20
    '@media (max-width:1366px)': {
      fontSize: '1.125rem',  // 18px
      lineHeight: 1.444,
    },
    '@media (max-width:1200px)': {
      fontSize: '1.0625rem', // 17px
      lineHeight: 1.471,
    },
    '@media (max-width:900px)': {
      fontSize: '1rem',      // 16px
      lineHeight: 1.5,
    },
    '@media (max-width:600px)': {
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.533,
    },
  },
  h5: {
    fontFamily: 'Gotham',
    fontWeight: 700,
    fontSize: '1.25rem',     // 20px
    lineHeight: 1.4,         // 28/20
    '@media (max-width:1366px)': {
      fontSize: '1.125rem',  // 18px
      lineHeight: 1.444,
    },
    '@media (max-width:1200px)': {
      fontSize: '1.0625rem', // 17px
      lineHeight: 1.471,
    },
    '@media (max-width:900px)': {
      fontSize: '1rem',      // 16px
      lineHeight: 1.5,
    },
    '@media (max-width:600px)': {
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.533,
    },
  },
  body1: {
    fontWeight: 400,
    fontSize: '0.875rem',    // 14px
    lineHeight: 1.429,       // Ajustado para mejor legibilidad
    '@media (max-width:1366px)': {
      fontSize: '0.8125rem', // 13px
      lineHeight: 1.462,
    },
    '@media (max-width:1200px)': {
      fontSize: '0.8125rem', // 13px
      lineHeight: 1.462,
    },
    '@media (max-width:900px)': {
      fontSize: '0.875rem',  // 14px
      lineHeight: 1.5,
    },
    '@media (max-width:600px)': {
      fontSize: '0.875rem',  // 14px (mantener legibilidad)
      lineHeight: 1.5,
    },
  },
  body2: {
    fontWeight: 400,
    fontSize: '1rem',        // 16px
    lineHeight: 1.5,         // 24/16
    '@media (max-width:1366px)': {
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.533,
    },
    '@media (max-width:1200px)': {
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.533,
    },
    '@media (max-width:900px)': {
      fontSize: '0.875rem',  // 14px
      lineHeight: 1.571,
    },
    '@media (max-width:600px)': {
      fontSize: '0.875rem',  // 14px
      lineHeight: 1.571,
    },
  },
  body3: {
    fontWeight: 400,
    fontSize: '1.125rem',    // 18px
    lineHeight: 1.333,       // 24/18
    '@media (max-width:1366px)': {
      fontSize: '1.0625rem', // 17px
      lineHeight: 1.412,
    },
    '@media (max-width:1200px)': {
      fontSize: '1rem',      // 16px
      lineHeight: 1.5,
    },
    '@media (max-width:900px)': {
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.533,
    },
    '@media (max-width:600px)': {
      fontSize: '0.875rem',  // 14px
      lineHeight: 1.571,
    },
  } as any, // Para evitar el error de TypeScript con body3
  subtitle1: {
    fontWeight: 500,
    fontSize: '1rem',        // 16px
    lineHeight: 1.5,         // 24/16
    '@media (max-width:1366px)': {
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.533,
    },
    '@media (max-width:1200px)': {
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.533,
    },
    '@media (max-width:900px)': {
      fontSize: '0.875rem',  // 14px
      lineHeight: 1.571,
    },
    '@media (max-width:600px)': {
      fontSize: '0.875rem',  // 14px
      lineHeight: 1.571,
    },
  },
},
//   typography: {
//   htmlFontSize: 16,
//   fontFamily: 'Roboto, Arial, sans-serif',
//   h1: {
//     fontFamily: 'Gotham',
//     fontWeight: 700,
//     fontSize: '4rem',        // 64px
//     lineHeight: 1.1875,      // 76/64
//     '@media (max-width:1536px)': {
//       fontSize: '3.5rem',    // 56px
//       lineHeight: 1.214,
//     },
//     '@media (max-width:1200px)': {
//       fontSize: '3rem',      // 48px
//       lineHeight: 1.25,
//     },
//     '@media (max-width:900px)': {
//       fontSize: '2.5rem',    // 40px
//       lineHeight: 1.3,
//     },
//     '@media (max-width:600px)': {
//       fontSize: '2rem',      // 32px
//       lineHeight: 1.25,
//     },
//   },
//   h2: {
//     fontFamily: 'Gotham',
//     fontWeight: 600,
//     fontSize: '2.25rem',     // 36px
//     lineHeight: 1.222,       // 44/36
//     '@media (max-width:1536px)': {
//       fontSize: '2rem',      // 32px
//       lineHeight: 1.25,
//     },
//     '@media (max-width:1366px)': {
//       fontSize: '1.75rem',   // 28px
//       lineHeight: 1.286,
//     },
//     '@media (max-width:1200px)': {
//       fontSize: '1.75rem',   // 28px
//       lineHeight: 1.286,
//     },
//     '@media (max-width:900px)': {
//       fontSize: '1.5rem',    // 24px
//       lineHeight: 1.333,
//     },
//     '@media (max-width:600px)': {
//       fontSize: '1.375rem',  // 22px
//       lineHeight: 1.364,
//     },
//   },
//   h3: {
//     fontFamily: 'Gotham',
//     fontWeight: 600,
//     fontSize: '1.75rem',     // 28px
//     lineHeight: 1.286,       // 36/28
//     '@media (max-width:1536px)': {
//       fontSize: '1.625rem',  // 26px
//       lineHeight: 1.308,
//     },
//     '@media (max-width:1200px)': {
//       fontSize: '1.5rem',    // 24px
//       lineHeight: 1.333,
//     },
//     '@media (max-width:900px)': {
//       fontSize: '1.375rem',  // 22px
//       lineHeight: 1.364,
//     },
//     '@media (max-width:600px)': {
//       fontSize: '1.25rem',   // 20px
//       lineHeight: 1.4,
//     },
//   },
//   h4: {
//     fontFamily: 'Gotham',
//     fontWeight: 600,
//     fontSize: '1.25rem',     // 20px
//     lineHeight: 1.4,         // 28/20
//     '@media (max-width:1200px)': {
//       fontSize: '1.125rem',  // 18px
//       lineHeight: 1.444,
//     },
//     '@media (max-width:900px)': {
//       fontSize: '1.0625rem', // 17px
//       lineHeight: 1.471,
//     },
//     '@media (max-width:600px)': {
//       fontSize: '1rem',      // 16px
//       lineHeight: 1.5,
//     },
//   },
//   h5: {
//     fontFamily: 'Gotham',
//     fontWeight: 700,
//     fontSize: '1.25rem',     // 20px
//     lineHeight: 1.4,         // 28/20
//     '@media (max-width:1200px)': {
//       fontSize: '1.125rem',  // 18px
//       lineHeight: 1.444,
//     },
//     '@media (max-width:900px)': {
//       fontSize: '1.0625rem', // 17px
//       lineHeight: 1.471,
//     },
//     '@media (max-width:600px)': {
//       fontSize: '1rem',      // 16px
//       lineHeight: 1.5,
//     },
//   },
//   body1: {
//     fontWeight: 400,
//     fontSize: '0.875rem',    // 14px
//     lineHeight: 1.429,       // ~20/14 (ajustado para mejor legibilidad)
//     '@media (max-width:1200px)': {
//       fontSize: '0.8125rem', // 13px
//       lineHeight: 1.462,
//     },
//     '@media (max-width:600px)': {
//       fontSize: '0.875rem',  // 14px (mantener legible en mobile)
//       lineHeight: 1.5,
//     },
//   },
//   body2: {
//     fontWeight: 400,
//     fontSize: '1rem',        // 16px
//     lineHeight: 1.5,         // 24/16
//     '@media (max-width:1200px)': {
//       fontSize: '0.9375rem', // 15px
//       lineHeight: 1.533,
//     },
//     '@media (max-width:600px)': {
//       fontSize: '0.875rem',  // 14px
//       lineHeight: 1.571,
//     },
//   },
//   body3: {
//     fontWeight: 400,
//     fontSize: '1.125rem',
//     lineHeight: 1.333,
//     '@media (max-width:1200px)': {
//       fontSize: '1.0625rem',
//       lineHeight: 1.412,
//     },
//     '@media (max-width:900px)': {
//       fontSize: '1rem',
//       lineHeight: 1.5,
//     },
//     '@media (max-width:600px)': {
//       fontSize: '0.9375rem',
//       lineHeight: 1.533,
//     },
//   } as any,
//   subtitle1: {
//     fontWeight: 500,
//     fontSize: '1rem',        // 16px
//     lineHeight: 1.5,         // 24/16
//     '@media (max-width:1200px)': {
//       fontSize: '0.9375rem', // 15px
//       lineHeight: 1.533,
//     },
//     '@media (max-width:600px)': {
//       fontSize: '0.875rem',  // 14px
//       lineHeight: 1.571,
//     },
//   },
// },
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
          marginBottom: theme.spacing(2),
          '&:before': {
            display: 'none',
          },
          boxShadow: 'none',
          '&.Mui-expanded': {
            margin: theme.spacing(2, 0),
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(0,0,0,0.06)',
            opacity: 1,
            boxShadow: 'none',
          },
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 1,
          },
        },
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
          '& .MuiInputBase-input': {
            height: '40px',
            // padding: '0 14px',
            boxSizing: 'border-box',
            borderRadius: '4px',
          },
          '& .MuiOutlinedInput-root': {
            // Estilos específicos para el outlined variant
            borderRadius: '4px',
          },
          '& .MuiInputLabel-root': {
            // Estilos para el label
            transform: 'translate(14px, 10px) scale(1)',
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