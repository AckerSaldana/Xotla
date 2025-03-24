// src/App.jsx
import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, styled } from '@mui/material';
import { 
  Box, 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  Button, 
  Card, 
  CardContent,
  Grid,
  Avatar,
  IconButton,
  Chip,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Spa as SpaIcon,
  LocalFlorist as FloristIcon,
  ExitToApp as LogoutIcon,
  ShoppingBasket as BasketIcon
} from '@mui/icons-material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Login from './pages/Login';
import xotlaTheme from './theme/XotlaTheme';
import EcoIcon from '@material-ui/icons/Eco';

// Importamos el logo de Xotla (asegúrate de tener este archivo)
import XotlaLogo from './assets/xotla-logo.svg';

// Importa las imágenes de las flores (asegúrate de tener estos archivos)
import AlheliImg from './assets/flowers/alheli.webp';
import BreathflowersImg from './assets/flowers/breathflowers.webp';
import CarnationflowersImg from './assets/flowers/carnationflowers.webp';
import CempasuchilImg from './assets/flowers/Cempasuchil.webp';
import DaliasImg from './assets/flowers/dalias.webp';
import DelphiniumImg from './assets/flowers/Delphinium.webp';
import GerberaImg from './assets/flowers/Gerbera.webp';
import HydrangeasImg from './assets/flowers/Hydrangeas.webp';
import LilliesImg from './assets/flowers/Lillies.webp';
import LotusImg from './assets/flowers/Lotus.webp';
import NarcissusImg from './assets/flowers/narcissus.webp';
import OrchidsImg from './assets/flowers/Orchids.webp';
import PeoniasImg from './assets/flowers/Peonias.webp';
import PoppyImg from './assets/flowers/poppy.webp';
import RosesImg from './assets/flowers/Roses.webp';
import TulipsImg from './assets/flowers/tulips.webp';


// Componentes estilizados para efectos pixel art
const PixelBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23dda77b\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  position: 'relative',
  paddingBottom: theme.spacing(4),
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50px',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'16\' viewBox=\'0 0 32 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,0 L32,0 L32,4 C24,4 24,12 16,12 C8,12 8,4 0,4 L0,0 Z\' fill=\'%236e4e37\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'center bottom',
    pointerEvents: 'none',
  },
}));

const PixelAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  borderBottom: '3px solid #0f0f0f',
  backgroundImage: 'linear-gradient(to right, #3b5e41, #4a7050, #3b5e41)',
  position: 'relative',
  '&::before, &::after': {
    content: '"✿"',
    position: 'absolute',
    fontSize: '1rem',
    color: theme.palette.secondary.main,
    top: -10,
  },
  '&::before': {
    left: 15,
  },
  '&::after': {
    right: 15,
  },
}));

const PixelLogo = styled('img')({
  height: '50px',
  imageRendering: 'pixelated',
});

const CoinChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
  border: '2px solid #0f0f0f',
  borderRadius: 0,
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.7rem',
  height: '32px',
}));

const FlowerCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  position: 'relative',
  border: '3px solid #0f0f0f',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 10px, transparent 10px, transparent 20px)',
    pointerEvents: 'none',
  },
}));

const FlowerImage = styled('img')({
  width: '70px',
  height: '70px',
  margin: '0 auto',
  display: 'block',
  imageRendering: 'pixelated', // Mantiene el estilo pixel art
  objectFit: 'contain'
});

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  backgroundImage: 'linear-gradient(to bottom, #3b5e41, #1e3222)',
  position: 'relative',
}));

const PixelLoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  animation: 'blink 1.5s infinite',
  '@keyframes blink': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.7 },
  }
}));

const FlowerGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
}));

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState(0);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [inventory, setInventory] = useState([]);
  
  // Datos de flores disponibles con las rutas a las imágenes
  const availableFlowers = [
    { id: 1, name: 'Alhelí', price: 80, growTime: 3, sellingPrice: 160, color: '#db92e2', image: AlheliImg },
    { id: 2, name: 'Nube', price: 60, growTime: 2, sellingPrice: 120, color: '#f1f1f1', image: BreathflowersImg },
    { id: 3, name: 'Clavel', price: 90, growTime: 4, sellingPrice: 180, color: '#f77d93', image: CarnationflowersImg },
    { id: 4, name: 'Cempasúchil', price: 110, growTime: 4, sellingPrice: 220, color: '#f89b00', image: CempasuchilImg },
    { id: 5, name: 'Dalia', price: 95, growTime: 3, sellingPrice: 190, color: '#e87094', image: DaliasImg },
    { id: 6, name: 'Delphinium', price: 120, growTime: 5, sellingPrice: 240, color: '#7a9ef5', image: DelphiniumImg },
    { id: 7, name: 'Gerbera', price: 85, growTime: 3, sellingPrice: 170, color: '#ff7855', image: GerberaImg },
    { id: 8, name: 'Hortensia', price: 140, growTime: 5, sellingPrice: 280, color: '#9fbfff', image: HydrangeasImg },
    { id: 9, name: 'Lirio', price: 130, growTime: 4, sellingPrice: 260, color: '#fff3cf', image: LilliesImg },
    { id: 10, name: 'Loto', price: 160, growTime: 6, sellingPrice: 320, color: '#fbbbd6', image: LotusImg },
    { id: 11, name: 'Narciso', price: 100, growTime: 3, sellingPrice: 200, color: '#fff27a', image: NarcissusImg },
    { id: 12, name: 'Orquídea', price: 150, growTime: 6, sellingPrice: 350, color: '#c896db', image: OrchidsImg },
    { id: 13, name: 'Peonía', price: 125, growTime: 5, sellingPrice: 250, color: '#ff9b89', image: PeoniasImg },
    { id: 14, name: 'Amapola', price: 90, growTime: 3, sellingPrice: 180, color: '#ff6b6b', image: PoppyImg },
    { id: 15, name: 'Rosa', price: 50, growTime: 2, sellingPrice: 100, color: '#ffafd0', image: RosesImg },
    { id: 16, name: 'Tulipán', price: 75, growTime: 3, sellingPrice: 150, color: '#e36956', image: TulipsImg },
  ];
  

  // Escucha cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          email: currentUser.email,
          id: currentUser.uid,
          displayName: currentUser.displayName || currentUser.email.split('@')[0]
        });
        // Inicializar con valores simulados
        setCoins(100);
        // Aquí se cargarían datos del usuario desde Firestore
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Limpia el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const handleLogin = (userData) => {
    console.log('Usuario ha iniciado sesión:', userData);
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleBuyFlower = (flower) => {
    if (coins >= flower.price) {
      setCoins(prev => prev - flower.price);
      setInventory(prev => [...prev, { 
        ...flower, 
        id: `${flower.id}-${Date.now()}`, 
        plantedAt: new Date(), 
        growthStage: 0 
      }]);
    }
  };

  const handleSellFlower = (flowerId) => {
    const flowerToSell = inventory.find(f => f.id === flowerId);
    if (flowerToSell) {
      setCoins(prev => prev + flowerToSell.sellingPrice);
      setInventory(prev => prev.filter(f => f.id !== flowerId));
    }
  };

  return (
    <ThemeProvider theme={xotlaTheme}>
      <CssBaseline />
      {loading ? (
        <LoadingContainer>
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: 'secondary.main',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'square', // Cuadrado para efecto pixel
              }
            }}
          />
          <PixelLoadingText variant="h3">
            Plantando semillas...
          </PixelLoadingText>
        </LoadingContainer>
      ) : !user ? (
        <PixelBackground>
          <Container maxWidth="sm" sx={{ pt: 4, pb: 4 }}>
            <Box display="flex" justifyContent="center" mb={4}>
              <PixelLogo src={XotlaLogo} alt="Xotla Logo" />
            </Box>
            <Login onLogin={handleLogin} />
          </Container>
        </PixelBackground>
      ) : (
        <PixelBackground>
          <PixelAppBar position="sticky">
            <Toolbar>
              <PixelLogo src={XotlaLogo} alt="Xotla Logo" sx={{ mr: 2 }} />
              <Typography variant="h3" sx={{ flexGrow: 1 }}>
                Xotla
              </Typography>
              <CoinChip
                icon={<SpaIcon />}
                label={coins}
                sx={{ mr: 2 }}
              />
              <Chip
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.dark' }}>
                    {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                  </Avatar>
                }
                label={user.displayName || user.email}
                variant="outlined"
                sx={{ 
                  mr: 2, 
                  border: '2px solid #0f0f0f',
                  borderRadius: 0,
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.7rem',
                }}
              />
              <IconButton color="secondary" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </PixelAppBar>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <Grid container spacing={3}>
              {/* Sección principal del juego */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h2" gutterBottom>
                      ¡Bienvenido a tu Jardín en Xotla!
                    </Typography>
                    <Typography>
                      Cultiva hermosas flores en tu jardín azteca. Compra semillas, cuida tus plantas y véndelas para obtener ganancias.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Catálogo de flores disponibles */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <FloristIcon sx={{ mr: 1 }} /> Catálogo de Flores
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Grid container spacing={2}>
                      {availableFlowers.map((flower) => (
                        <FlowerGridItem item xs={6} sm={4} key={flower.id}>
                          <FlowerCard>
                            <CardContent>
                              {/* Usamos la imagen de la flor */}
                              <FlowerImage 
                                src={flower.image} 
                                alt={flower.name}
                              />
                              <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: '0.8rem' }}>
                                {flower.name}
                              </Typography>
                              <Typography variant="body2" align="center" gutterBottom sx={{ fontSize: '0.6rem' }}>
                                Precio: {flower.price} <SpaIcon sx={{ fontSize: 12 }} />
                              </Typography>
                              <Button 
                                variant="contained" 
                                fullWidth 
                                size="small"
                                color="primary"
                                onClick={() => handleBuyFlower(flower)}
                                disabled={coins < flower.price}
                                sx={{ mt: 1, fontSize: '0.6rem' }}
                              >
                                Comprar
                              </Button>
                            </CardContent>
                          </FlowerCard>
                        </FlowerGridItem>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Inventario de flores */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <EcoIcon sx={{ mr: 1 }} /> Tu Jardín
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    {inventory.length === 0 ? (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography>
                          Tu jardín está vacío. ¡Compra flores para comenzar!
                        </Typography>
                      </Box>
                    ) : (
                      <Grid container spacing={2}>
                        {inventory.map((flower) => (
                          <FlowerGridItem item xs={6} sm={4} key={flower.id}>
                            <FlowerCard>
                              <CardContent>
                                {/* Usamos la imagen de la flor */}
                                <FlowerImage 
                                  src={flower.image} 
                                  alt={flower.name}
                                />
                                <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: '0.8rem' }}>
                                  {flower.name}
                                </Typography>
                                <Typography variant="body2" align="center" gutterBottom sx={{ fontSize: '0.6rem' }}>
                                  Valor: {flower.sellingPrice} <SpaIcon sx={{ fontSize: 12 }} />
                                </Typography>
                                <Button 
                                  variant="contained" 
                                  fullWidth
                                  size="small"
                                  color="secondary"
                                  onClick={() => handleSellFlower(flower.id)}
                                  sx={{ mt: 1, fontSize: '0.6rem' }}
                                >
                                  Vender
                                </Button>
                              </CardContent>
                            </FlowerCard>
                          </FlowerGridItem>
                        ))}
                      </Grid>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
          
          {/* Footer */}
          <Box 
            component="footer" 
            sx={{ 
              p: 2, 
              mt: 'auto', 
              backgroundColor: 'background.paper',
              borderTop: '3px solid #0f0f0f',
              textAlign: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              🌸 Xotla - Tu jardín azteca de pixel art 🌸
            </Typography>
          </Box>
        </PixelBackground>
      )}
    </ThemeProvider>
  );
}

export default App;