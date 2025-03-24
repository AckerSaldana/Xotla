// src/theme/XotlaTheme.jsx
import { createTheme } from '@mui/material/styles';
import '@fontsource/press-start-2p';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Paleta de colores pixel art floral para Xotla
const xotlaTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#78c272', // Verde principal
      light: '#a3e99c',
      dark: '#4e9c4a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffafd0', // Rosa floral
      light: '#ffdfe7',
      dark: '#e36956', // Coral para acentos
      contrastText: '#000',
    },
    background: {
      default: '#1e3222', // Verde oscuro
      paper: '#3b5e41', // Verde medio para tarjetas
    },
    text: {
      primary: '#f9f5e3', // Blanco vintage
      secondary: '#cfc66b', // Amarillo suave
    },
    error: {
      main: '#e36956', // Coral
    },
    warning: {
      main: '#ffdb70', // Amarillo
    },
    info: {
      main: '#8ecde6', // Azul claro
    },
    success: {
      main: '#78c272', // Verde
    },
    divider: '#6e4e37', // Marrón para divisores (como tierra)
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    h2: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    h3: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '1.2rem',
      marginBottom: '0.8rem',
    },
    h4: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '1rem',
    },
    button: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '0.8rem',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sin bordes redondeados para estilo pixel
          boxShadow: '3px 3px 0px #0f0f0f', // Sombra estilo pixel
          border: '2px solid #0f0f0f',
          padding: '0.5rem 1rem',
          position: 'relative',
          transition: 'transform 0.1s, box-shadow 0.1s',
          '&:active': {
            transform: 'translate(3px, 3px)',
            boxShadow: 'none',
          },
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sin bordes redondeados
          border: '3px solid #0f0f0f',
          boxShadow: '6px 6px 0px #0f0f0f',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h4v4H0V0zm4 4h4v4H4V4zm4-4h4v4H8V0zm4 0h4v4h-4V0zm0 4h4v4h-4V4zm-8 8h4v4H4v-4zm8 0h4v4h-4v-4z\' fill=\'%232b4b2f\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '1rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            border: '2px solid #0f0f0f',
            '& fieldset': {
              borderColor: 'transparent',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '0.7rem',
        },
      },
    },
  },
});

export default xotlaTheme;