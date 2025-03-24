// src/components/Login.jsx
import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Divider, 
  Alert,
  Container,
  styled
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';

// Componentes estilizados para el estilo pixel art floral
const FlowerIcon = styled(Typography)({
  position: 'absolute',
  fontSize: '1rem',
  color: '#ffafd0',
});

const PixelButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  position: 'relative',
  '&::before, &::after': {
    content: '"✿"',
    position: 'absolute',
    fontSize: '0.7rem',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&::before': {
    left: theme.spacing(1),
  },
  '&::after': {
    right: theme.spacing(1),
  },
}));

const LoginContainer = styled(Box)({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '80px',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%2378c272\' d=\'M12,4 L12,8 M10,6 L14,6 M8,10 L8,16 M6,10 C6,8.89543 6.89543,8 8,8 C9.10457,8 10,8.89543 10,10 M6,14 C6,15.1046 6.89543,16 8,16 C9.10457,16 10,15.1046 10,14 M16,10 L16,16 M14,10 C14,8.89543 14.8954,8 16,8 C17.1046,8 18,8.89543 18,10 M14,14 C14,15.1046 14.8954,16 16,16 C17.1046,16 18,15.1046 18,14\'%3E%3C/path%3E%3C/svg%3E")',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'center bottom',
    pointerEvents: 'none',
  },
});

const LoginCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  maxWidth: 400,
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(4),
  zIndex: 1,
}));

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      let userCredential;
      
      if (isSignUp) {
        // Crear usuario nuevo
        userCredential = await createUserWithEmailAndPassword(
          auth, 
          email, 
          password
        );
      } else {
        // Iniciar sesión con usuario existente
        userCredential = await signInWithEmailAndPassword(
          auth, 
          email, 
          password
        );
      }
      
      // Firebase devuelve el usuario autenticado
      const user = userCredential.user;
      onLogin({ 
        email: user.email, 
        id: user.uid, 
        displayName: user.displayName 
      });
    } catch (err) {
      let errorMessage = 'Error al iniciar sesión';
      
      // Personalizar mensajes de error comunes
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Email o contraseña incorrectos';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email ya está registrado';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      onLogin({ 
        email: user.email, 
        id: user.uid, 
        displayName: user.displayName 
      });
    } catch (err) {
      setError('Error al iniciar sesión con Google');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
      <Container maxWidth="xs">
        <LoginCard elevation={3}>
          <FlowerIcon sx={{ top: -20, left: 60 }}>✿</FlowerIcon>
          <FlowerIcon sx={{ top: -20, right: 60 }}>✿</FlowerIcon>
          
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            {isSignUp ? 'Registrarse' : 'Iniciar Sesión'}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2, animation: 'blink 2s infinite' }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              InputProps={{
                style: { fontFamily: "'Press Start 2P', cursive", fontSize: '0.7rem' }
              }}
            />
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              InputProps={{
                style: { fontFamily: "'Press Start 2P', cursive", fontSize: '0.7rem' }
              }}
            />
            
            <PixelButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading 
                ? 'Cargando...' 
                : isSignUp 
                  ? 'Crear Cuenta' 
                  : 'Entrar'
              }
            </PixelButton>
            
            <Divider sx={{ 
              my: 2, 
              '&::before, &::after': { 
                borderColor: 'divider' 
              },
              color: 'text.secondary',
              fontSize: '0.7rem',
              fontFamily: '"Press Start 2P", cursive',
            }}>
              o
            </Divider>
            
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={loading}
              sx={{ mt: 1, mb: 2 }}
            >
              Continuar con Google
            </Button>
            
            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="text.secondary" 
                sx={{ 
                  fontSize: '0.6rem', 
                  fontFamily: '"Press Start 2P", cursive'
                }}
              >
                {isSignUp 
                  ? '¿Ya tienes cuenta?' 
                  : '¿No tienes cuenta?'} 
                <Button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  color="secondary"
                  size="small"
                  disabled={loading}
                  sx={{ 
                    ml: 1, 
                    fontSize: '0.6rem', 
                    fontFamily: '"Press Start 2P", cursive',
                    boxShadow: 'none',
                    border: 'none',
                    '&:active': {
                      transform: 'none',
                      boxShadow: 'none',
                    }
                  }}
                >
                  {isSignUp ? 'Inicia sesión' : 'Regístrate'}
                </Button>
              </Typography>
            </Box>
          </Box>
        </LoginCard>
      </Container>
    </LoginContainer>
  );
}

export default Login;