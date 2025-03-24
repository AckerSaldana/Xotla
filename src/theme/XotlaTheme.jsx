// src/theme/XotlaTheme.jsx (actualizado)
import { createTheme } from '@mui/material/styles';
import '@fontsource/press-start-2p';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Paleta de colores pixel art floral mejorada para Xotla
const xotlaTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4c9f47', // Verde más vibrante
      light: '#7bba74',
      dark: '#3a7a32',
      contrastText: '#f8f5e4',
    },
    secondary: {
      main: '#ffa5c3', // Rosa floral
      light: '#ffd0e1',
      dark: '#d14b45', // Coral para acentos
      contrastText: '#0a0c0b',
    },
    background: {
      default: '#182418', // Verde oscuro mejorado
      paper: '#304a2e', // Verde medio armonioso
    },
    text: {
      primary: '#f8f5e4', // Blanco vintage
      secondary: '#ffd966', // Amarillo dorado
    },
    error: {
      main: '#d14b45', // Coral mejorado
    },
    warning: {
      main: '#ffd966', // Amarillo dorado
    },
    info: {
      main: '#7cc5e6', // Azul agua
    },
    success: {
      main: '#4c9f47', // Verde vibrante
    },
    divider: '#5e3c28', // Marrón tierra para divisores
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '1.8rem',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    h2: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '1.4rem',
      marginBottom: '0.8rem',
      textAlign: 'center',
    },
    h3: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '1.1rem',
      marginBottom: '0.6rem',
      textAlign: 'center',
    },
    h4: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '0.9rem',
      textAlign: 'center',
    },
    button: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '0.7rem',
      textTransform: 'none',
      letterSpacing: '0.5px',
    },
    body1: {
      fontSize: '0.8rem',
      textAlign: 'center',
    },
    body2: {
      fontSize: '0.7rem',
      textAlign: 'center',
    },
    caption: {
      fontSize: '0.6rem',
      fontFamily: '"Press Start 2P", cursive',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sin bordes redondeados para estilo pixel
          boxShadow: '3px 3px 0px #0a0c0b', // Sombra estilo pixel mejorada
          border: '2px solid #0a0c0b',
          padding: '0.5rem 1rem',
          position: 'relative',
          transition: 'transform 0.1s, box-shadow 0.1s',
          '&:active': {
            transform: 'translate(3px, 3px)',
            boxShadow: 'none',
          },
          textTransform: 'none',
          height: 'auto',
          lineHeight: 1.2,
          fontFamily: '"Press Start 2P", cursive',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            marginTop: 0,
            marginBottom: 0,
          }
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: '#4c9f47',
            '&:hover': {
              backgroundColor: '#7bba74',
            }
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: '#ffa5c3',
            color: '#0a0c0b',
            '&:hover': {
              backgroundColor: '#ffd0e1',
            }
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sin bordes redondeados
          border: '3px solid #0a0c0b',
          boxShadow: '6px 6px 0px #0a0c0b',
          // Textura sutil para los fondos
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h4v4H0V0zm4 4h4v4H4V4zm4-4h4v4H8V0zm4 0h4v4h-4V0zm0 4h4v4h-4V4zm-8 8h4v4H4v-4zm8 0h4v4h-4v-4z' fill='%23236431' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '1rem',
          '&:last-child': {
            paddingBottom: '1rem',
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            border: '2px solid #0a0c0b',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
              borderWidth: 0,
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '0.7rem',
          },
          '& .MuiInputBase-input': {
            padding: '0.7rem',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '0.7rem',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '2px solid #0a0c0b',
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '0.6rem',
          height: 'auto',
          padding: '0.3rem 0',
        },
        label: {
          padding: '0 0.5rem',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // Asegurar que los iconos se alineen bien
          verticalAlign: 'middle',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          border: '4px solid #0a0c0b',
          boxShadow: '8px 8px 0 #0a0c0b',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '1rem',
          textAlign: 'center',
          padding: '1rem',
          borderBottom: '2px solid #0a0c0b',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '1.5rem',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '1rem',
          borderTop: '2px solid #0a0c0b',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: 8,
          backgroundColor: '#182418',
          border: '1px solid #0a0c0b',
        },
        bar: {
          borderRadius: 0,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'square', // Más cuadrado para efecto pixel
          },
        },
      },
    },
  },
});

export default xotlaTheme;