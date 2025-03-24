// src/App.jsx modificado
import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, styled } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Chip,
  Avatar,
  CircularProgress,
  LinearProgress,
  Snackbar,
  Alert,
  Grid,
  Button
} from '@mui/material';
import {
  Spa as SpaIcon,
  WaterDrop as WaterIcon,
  ExitToApp as LogoutIcon,
  LocalFlorist as FlowerIcon,
  Terrain as TerrainIcon,
  Yard as YardIcon
} from '@mui/icons-material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Importar componentes
import Login from './pages/Login';
import PlantPage from './pages/PlantPage';
import FlowerCatalog from './components/FlowerCatalog';
import xotlaTheme from './theme/XotlaTheme';

// Importar nuevos componentes
import GardenBackground from './components/GardenBackground';
import GardenPlot from './components/GardenPlot';
import './styles/GardenStyles.css';

// Importaciones de utilidades
import { 
  calculatePlantStatus, 
  WATER_COST, 
  FERTILIZER_COST,
  HEALTH_INCREASE_FERTILIZER,
  XP_PER_CARE_ACTION,
  XP_PER_GROWTH_LEVEL,
  XP_FOR_NEXT_LEVEL,
  createNewPlant
} from './utils/plantUtils';

// Servicios Firebase
import { 
  saveUserProgress, 
  loadUserData as loadUserDataFromFirebase, 
  initializeNewUser, 
  updateLastLogin,
  logTransaction,
  logCareAction
} from './services/firebaseServices';

// Importamos el logo de Xotla
import XotlaLogo from './assets/xotla-logo.svg';

// Importa las imágenes de las flores
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

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingData, setSavingData] = useState(false);
  const [coins, setCoins] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'info' });
  const [lastCaredTime, setLastCaredTime] = useState({});
  const [userLevel, setUserLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  
  // Datos de flores disponibles con las rutas a las imágenes
  const availableFlowers = [
    { id: 1, name: 'Alhelí', price: 80, growTime: 12, sellingPrice: 160, color: '#db92e2', image: AlheliImg },
    { id: 2, name: 'Nube', price: 60, growTime: 8, sellingPrice: 120, color: '#f1f1f1', image: BreathflowersImg },
    { id: 3, name: 'Clavel', price: 90, growTime: 16, sellingPrice: 180, color: '#f77d93', image: CarnationflowersImg },
    { id: 4, name: 'Cempasúchil', price: 110, growTime: 16, sellingPrice: 220, color: '#f89b00', image: CempasuchilImg },
    { id: 5, name: 'Dalia', price: 95, growTime: 12, sellingPrice: 190, color: '#e87094', image: DaliasImg },
    { id: 6, name: 'Delphinium', price: 120, growTime: 20, sellingPrice: 240, color: '#7a9ef5', image: DelphiniumImg },
    { id: 7, name: 'Gerbera', price: 85, growTime: 12, sellingPrice: 170, color: '#ff7855', image: GerberaImg },
    { id: 8, name: 'Hortensia', price: 140, growTime: 20, sellingPrice: 280, color: '#9fbfff', image: HydrangeasImg },
    { id: 9, name: 'Lirio', price: 130, growTime: 16, sellingPrice: 260, color: '#fff3cf', image: LilliesImg },
    { id: 10, name: 'Loto', price: 160, growTime: 24, sellingPrice: 320, color: '#fbbbd6', image: LotusImg },
    { id: 11, name: 'Narciso', price: 100, growTime: 12, sellingPrice: 200, color: '#fff27a', image: NarcissusImg },
    { id: 12, name: 'Orquídea', price: 150, growTime: 24, sellingPrice: 350, color: '#c896db', image: OrchidsImg },
    { id: 13, name: 'Peonía', price: 125, growTime: 20, sellingPrice: 250, color: '#ff9b89', image: PeoniasImg },
    { id: 14, name: 'Amapola', price: 90, growTime: 12, sellingPrice: 180, color: '#ff6b6b', image: PoppyImg },
    { id: 15, name: 'Rosa', price: 50, growTime: 8, sellingPrice: 100, color: '#ffafd0', image: RosesImg },
    { id: 16, name: 'Tulipán', price: 75, growTime: 12, sellingPrice: 150, color: '#e36956', image: TulipsImg },
  ];
  
  // Flor inicial para nuevos usuarios (la rosa es la más barata)
  const initialFlower = availableFlowers.find(flower => flower.id === 15);

  // Obtener información de la planta por ID
  const getFlowerById = (id) => {
    return availableFlowers.find(flower => flower.id === parseInt(id));
  };

  // Guardar datos del usuario en Firestore
  const saveUserData = async () => {
    if (!user || !user.id) return;
    
    setSavingData(true);
    
    try {
      await saveUserProgress(user.id, {
        coins,
        inventory,
        userLevel,
        experience,
        lastCaredTime
      });
      
      console.log('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar datos:', error);
      setNotification({
        open: true,
        message: 'Error al guardar tu progreso',
        type: 'error'
      });
    } finally {
      setSavingData(false);
    }
  };

  // Cargar datos del usuario desde Firestore
  const loadUserData = async (userId) => {
    try {
      const result = await loadUserDataFromFirebase(userId);
      
      if (result.success) {
        if (result.isNewUser) {
          // Usuario nuevo: inicializar con planta inicial
          const newUserResult = await initializeNewUser(userId, initialFlower);
          
          if (newUserResult.success) {
            setCoins(newUserResult.data.coins);
            setInventory(newUserResult.data.inventory);
            setUserLevel(newUserResult.data.userLevel);
            setExperience(newUserResult.data.experience);
            setLastCaredTime(newUserResult.data.lastCaredTime);
            
            setNotification({
              open: true,
              message: '¡Bienvenido a Xotla! Has recibido una Rosa para comenzar tu jardín.',
              type: 'success'
            });
          }
        } else {
          // Usuario existente: cargar datos
          const userData = result.data;
          
          setCoins(userData.coins || 0);
          setInventory(userData.inventory || []);
          setUserLevel(userData.userLevel || 1);
          setExperience(userData.experience || 0);
          setLastCaredTime(userData.lastCaredTime || {});
          
          // Actualizar el estado de las plantas según el tiempo transcurrido
          if (userData.inventory && userData.inventory.length > 0) {
            updatePlantsStatus(userData.inventory, userData.lastCaredTime || {});
          }
          
          // Actualizar último login
          await updateLastLogin(userId);
        }
      } else {
        throw new Error('Error al cargar datos de usuario');
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setNotification({
        open: true,
        message: 'Error al cargar tus datos',
        type: 'error'
      });
    }
  };

  // Actualiza el estado de las plantas según el tiempo transcurrido
  const updatePlantsStatus = (plants, lastCaredTimes) => {
    const updatedPlants = plants.map(plant => calculatePlantStatus(plant, lastCaredTimes));
    setInventory(updatedPlants);
  };

  // Escucha cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Definimos el usuario
        const userData = {
          email: currentUser.email,
          id: currentUser.uid,
          displayName: currentUser.displayName || currentUser.email.split('@')[0]
        };
        setUser(userData);
        
        // Cargamos los datos del usuario
        loadUserData(userData.id);
      } else {
        setUser(null);
        // Reiniciar estados
        setCoins(0);
        setInventory([]);
        setLastCaredTime({});
        setUserLevel(1);
        setExperience(0);
      }
      setLoading(false);
    });

    // Limpia el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Actualizar estado de plantas periódicamente
  useEffect(() => {
    if (!user) return;

    // Actualiza cada minuto
    const interval = setInterval(() => {
      updatePlantsStatus(inventory, lastCaredTime);
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, [user, inventory, lastCaredTime]);

  // Guardar cuando cambian datos importantes
  useEffect(() => {
    if (user && !loading && inventory.length > 0) {
      // Debounce para no guardar constantemente
      const saveTimeout = setTimeout(() => {
        saveUserData();
      }, 5000); // Guardar después de 5 segundos de inactividad
      
      return () => clearTimeout(saveTimeout);
    }
  }, [user, coins, inventory, userLevel, experience]);

  // Ganar experiencia y subir de nivel
  const gainExperience = async (xp) => {
    let newExperience = experience + xp;
    let newLevel = userLevel;
    
    // Verificar si sube de nivel
    if (newExperience >= XP_FOR_NEXT_LEVEL * userLevel) {
      newLevel = userLevel + 1;
      
      // Recompensa por subir de nivel
      const levelUpReward = 100;
      setCoins(prevCoins => prevCoins + levelUpReward);
      
      setNotification({
        open: true,
        message: `¡Has subido a nivel ${newLevel}! Has ganado ${levelUpReward} monedas como recompensa.`,
        type: 'success'
      });
    }
    
    setExperience(newExperience);
    setUserLevel(newLevel);
  };

  const handleLogin = (userData) => {
    console.log('Usuario ha iniciado sesión:', userData);
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      // Guardar datos antes de cerrar sesión
      await saveUserData();
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleBuyFlower = async (flower) => {
    if (coins >= flower.price) {
      // Restar monedas
      setCoins(prev => prev - flower.price);
      
      // Crear nueva planta
      const newFlower = createNewPlant(flower);
      
      // Añadir a inventario
      setInventory(prev => [...prev, newFlower]);
      
      // Registrar transacción
      if (user && user.id) {
        await logTransaction(user.id, {
          type: 'purchase',
          flowerId: flower.id,
          flowerName: flower.name,
          price: flower.price,
          plantId: newFlower.id
        });
      }
      
      // Notificar al usuario
      setNotification({
        open: true,
        message: `¡Has comprado ${flower.name}! Recuerda regarla regularmente.`,
        type: 'success'
      });
      
      // Cerrar catálogo
      setCatalogOpen(false);
      
      // Guardar datos
      saveUserData();
    } else {
      setNotification({
        open: true,
        message: `No tienes suficientes monedas para comprar ${flower.name}.`,
        type: 'warning'
      });
    }
  };

  const handleSellFlower = async (flowerId) => {
    const flowerToSell = inventory.find(f => f.id === flowerId);
    if (flowerToSell) {
      // Calculamos el precio de venta según el estado de la planta
      const basePrice = flowerToSell.sellingPrice;
      const growthMultiplier = flowerToSell.growthStage === 3 ? 1 : 
                              flowerToSell.growthStage === 2 ? 0.75 : 
                              flowerToSell.growthStage === 1 ? 0.5 : 0.25;
      const healthMultiplier = flowerToSell.health / 100;
      const finalPrice = Math.round(basePrice * growthMultiplier * healthMultiplier);
      
      // Añadir monedas
      setCoins(prev => prev + finalPrice);
      
      // Eliminar del inventario
      setInventory(prev => prev.filter(f => f.id !== flowerId));
      
      // Registrar transacción
      if (user && user.id) {
        await logTransaction(user.id, {
          type: 'sale',
          flowerId: flowerToSell.id.split('-')[0],
          flowerName: flowerToSell.name,
          price: finalPrice,
          plantId: flowerToSell.id,
          growthStage: flowerToSell.growthStage,
          health: flowerToSell.health
        });
      }
      
      // Ganar experiencia por vender
      gainExperience(Math.round(finalPrice / 10));
      
      // Notificar al usuario
      setNotification({
        open: true,
        message: `Has vendido ${flowerToSell.name} por ${finalPrice} monedas.`,
        type: 'success'
      });
      
      // Guardar datos
      saveUserData();
    }
  };

  const handleWaterPlant = async (flowerId) => {
    if (coins < WATER_COST) {
      setNotification({
        open: true,
        message: `No tienes suficientes monedas para regar la planta.`,
        type: 'warning'
      });
      return;
    }
    
    // Restar costo
    setCoins(prev => prev - WATER_COST);
    
    // Actualizar inventario
    const now = new Date().toISOString();
    setInventory(prev => prev.map(flower => {
      if (flower.id === flowerId) {
        return { 
          ...flower, 
          water: 100,  // Restauramos el agua al 100%
          lastWatered: now
        };
      }
      return flower;
    }));
    
    // Actualizar tiempo de cuidado
    setLastCaredTime(prev => ({
      ...prev,
      [`water-${flowerId}`]: now
    }));
    
    // Registrar acción de cuidado
    if (user && user.id) {
      await logCareAction(user.id, {
        type: 'water',
        plantId: flowerId,
        cost: WATER_COST
      });
    }
    
    // Ganar experiencia
    gainExperience(XP_PER_CARE_ACTION);
    
    // Notificar
    setNotification({
      open: true,
      message: `Has regado tu planta. ¡Ahora está feliz!`,
      type: 'success'
    });
  };

  const handleFertilizePlant = async (flowerId) => {
    if (coins < FERTILIZER_COST) {
      setNotification({
        open: true,
        message: `No tienes suficientes monedas para fertilizar la planta.`,
        type: 'warning'
      });
      return;
    }
    
    // Restar costo
    setCoins(prev => prev - FERTILIZER_COST);
    
    // Actualizar inventario
    const now = new Date().toISOString();
    setInventory(prev => prev.map(flower => {
      if (flower.id === flowerId) {
        return { 
          ...flower, 
          health: Math.min(100, flower.health + HEALTH_INCREASE_FERTILIZER),  // Aumentar salud
          lastFertilized: now
        };
      }
      return flower;
    }));
    
    // Actualizar tiempo de cuidado
    setLastCaredTime(prev => ({
      ...prev,
      [`fertilize-${flowerId}`]: now
    }));
    
    // Registrar acción de cuidado
    if (user && user.id) {
      await logCareAction(user.id, {
        type: 'fertilize',
        plantId: flowerId,
        cost: FERTILIZER_COST
      });
    }
    
    // Ganar experiencia
    gainExperience(XP_PER_CARE_ACTION * 2);
    
    // Notificar
    setNotification({
      open: true,
      message: `Has fertilizado tu planta. ¡Su salud ha mejorado!`,
      type: 'success'
    });
  };

  // Abrir el catálogo
  const handleOpenCatalog = () => {
    setCatalogOpen(true);
  };

  return (
    <ThemeProvider theme={xotlaTheme}>
      <CssBaseline />
      <Router>
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
          <>
            {/* Añadir el fondo de jardín */}
            <GardenBackground />
            
            <Box className="garden-container garden-border">
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
                    label={`Nv.${userLevel}`}
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

              {/* Indicador de guardado */}
              {savingData && (
                <Box sx={{ width: '100%', mb: 2 }}>
                  <LinearProgress color="secondary" />
                  <Typography variant="caption" align="center" display="block">
                    Guardando progreso...
                  </Typography>
                </Box>
              )}
              
              {/* Añadir decoraciones */}
              <div className="decorative-sun"></div>
              <div className="decorative-cloud cloud-1"></div>
              <div className="decorative-cloud cloud-2"></div>
              
              {/* Añadir algunas mariposas */}
              <div className="butterfly" style={{ top: '120px', left: '15%' }}>
                <div className="butterfly-wings" style={{ backgroundColor: '#ffa5c3' }}></div>
              </div>
              <div className="butterfly" style={{ top: '250px', right: '20%' }}>
                <div className="butterfly-wings" style={{ backgroundColor: '#7cc5e6' }}></div>
              </div>
              
              {/* Añadir hojas flotantes */}
              <div className="floating-leaf" style={{ top: '180px', left: '30%', transform: 'rotate(30deg)' }}></div>
              <div className="floating-leaf" style={{ top: '300px', left: '70%', transform: 'rotate(-20deg)' }}></div>
              <div className="floating-leaf" style={{ top: '400px', left: '20%', transform: 'rotate(60deg)' }}></div>
              
              {/* Rutas de la aplicación */}
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
                      <Box className="info-panel">
                        {/* Panel de estadísticas */}
                        <Grid container spacing={2} justifyContent="space-around">
                          <Grid item>
                            <Box className="resource-indicator">
                              <div className="resource-indicator-icon">
                                <FlowerIcon sx={{ fontSize: 16, color: '#ffa5c3' }} />
                              </div>
                              <Typography variant="h6" className="resource-indicator-label">
                                {inventory.length}/9
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontSize: '0.6rem', color: '#ccc', textAlign: 'center' }}>
                              Total de Plantas
                            </Typography>
                          </Grid>
                          
                          <Grid item>
                            <Box className="resource-indicator">
                              <div className="resource-indicator-icon">
                                <FlowerIcon sx={{ fontSize: 16, color: '#ffdb70' }} />
                              </div>
                              <Typography variant="h6" className="resource-indicator-label">
                                {inventory.filter(p => p.growthStage === 3).length}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontSize: '0.6rem', color: '#ccc', textAlign: 'center' }}>
                              Plantas Maduras
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Box className="resource-indicator">
                              <div className="resource-indicator-icon">
                                <WaterIcon sx={{ fontSize: 16, color: '#8ecde6' }} />
                              </div>
                              <Typography variant="h6" className="resource-indicator-label" sx={{ 
                                color: inventory.filter(p => p.water <= 30).length > 0 ? '#ff6b6b' : '#f8f5e4'
                              }}>
                                {inventory.filter(p => p.water <= 30).length}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontSize: '0.6rem', color: '#ccc', textAlign: 'center' }}>
                              Necesitan Agua
                            </Typography>
                          </Grid>
                          
                          <Grid item>
                            <Box className="resource-indicator">
                              <div className="resource-indicator-icon">
                                <SpaIcon sx={{ fontSize: 16, color: '#78c272' }} />
                              </div>
                              <Typography variant="h6" className="resource-indicator-label" sx={{ 
                                color: inventory.filter(p => p.health <= 50).length > 0 ? '#ff6b6b' : '#f8f5e4'
                              }}>
                                {inventory.filter(p => p.health <= 50).length}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontSize: '0.6rem', color: '#ccc', textAlign: 'center' }}>
                              Salud Baja
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      <Typography 
                        variant="h4" 
                        component="h2" 
                        className="garden-title"
                      >
                        Tu Jardín
                      </Typography>

                      <Box className="wooden-frame" sx={{ mb: 4, p: 3 }}>
                        {/* Cuadrícula del jardín */}
                        <div className="garden-grid">
                          {/* Mostrar plantas existentes */}
                          {inventory.map((plant) => (
                            <GardenPlot 
                              key={plant.id}
                              isEmpty={false}
                              plantName={plant.name}
                              plantImage={plant.image}
                              onClick={() => navigate(`/plant/${plant.id}`)}
                            >
                              {/* Barras de recursos */}
                              <Box sx={{ width: '100%', mb: 1.5 }}>
                                <Box className="resource-indicator">
                                  <WaterIcon sx={{ fontSize: 14, color: '#8ecde6' }} />
                                  <Typography variant="caption" sx={{ 
                                    fontSize: '0.6rem', 
                                    fontFamily: '"Press Start 2P", cursive',
                                    ml: 0.5
                                  }}>
                                    Agua: {Math.round(plant.water)}%
                                  </Typography>
                                </Box>
                                <div className="progress-bar">
                                  <div 
                                    className="progress-bar-fill progress-bar-water" 
                                    style={{ width: `${plant.water}%` }}
                                  ></div>
                                </div>
                                
                                <Box className="resource-indicator" sx={{ mt: 1 }}>
                                  <SpaIcon sx={{ 
                                    fontSize: 14, 
                                    color: plant.health <= 30 ? '#ff6b6b' : '#78c272'
                                  }} />
                                  <Typography variant="caption" sx={{ 
                                    fontSize: '0.6rem', 
                                    fontFamily: '"Press Start 2P", cursive',
                                    ml: 0.5
                                  }}>
                                    Salud: {Math.round(plant.health)}%
                                  </Typography>
                                </Box>
                                <div className="progress-bar">
                                  <div 
                                    className="progress-bar-fill progress-bar-health" 
                                    style={{ 
                                      width: `${plant.health}%`,
                                      backgroundColor: plant.health <= 30 ? '#ff6b6b' : '#78c272'
                                    }}
                                  ></div>
                                </div>
                              </Box>
                              
                              {/* Botones de acción */}
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <Button 
                                    className="nature-button water-button"
                                    fullWidth
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleWaterPlant(plant.id);
                                    }}
                                    disabled={coins < WATER_COST}
                                  >
                                    <WaterIcon sx={{ fontSize: '0.9rem' }} />
                                  </Button>
                                </Grid>
                                <Grid item xs={6}>
                                  <Button 
                                    className="nature-button"
                                    fullWidth
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleFertilizePlant(plant.id);
                                    }}
                                    disabled={coins < FERTILIZER_COST}
                                  >
                                    <YardIcon sx={{ fontSize: '0.9rem' }} />
                                  </Button>
                                </Grid>
                              </Grid>
                            </GardenPlot>
                          ))}
                          
                          {/* Mostrar parcelas vacías */}
                          {Array.from({ length: Math.max(0, 9 - inventory.length) }).map((_, index) => (
                            <GardenPlot
                              key={`empty-${index}`}
                              isEmpty={true}
                              onClick={handleOpenCatalog}
                            />
                          ))}
                        </div>
                      </Box>
                    </Container>
                  } 
                />
                <Route 
                  path="/plant/:plantId" 
                  element={
                    <PlantPage 
                      inventory={inventory}
                      coins={coins}
                      onWater={handleWaterPlant}
                      onFertilize={handleFertilizePlant}
                      onSell={handleSellFlower}
                      onUpdateInventory={setInventory}
                    />
                  } 
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              
              {/* Catálogo de flores */}
              <FlowerCatalog 
                open={catalogOpen}
                onClose={() => setCatalogOpen(false)}
                flowers={availableFlowers}
                coins={coins}
                onBuy={handleBuyFlower}
              />
              
              {/* Snackbar para notificaciones */}
              <Snackbar 
                open={notification.open} 
                autoHideDuration={6000} 
                onClose={() => setNotification({ ...notification, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert 
                  onClose={() => setNotification({ ...notification, open: false })} 
                  severity={notification.type}
                  sx={{ 
                    borderRadius: 0, 
                    border: '2px solid #0f0f0f',
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '0.7rem'
                  }}
                >
                  {notification.message}
                </Alert>
              </Snackbar>
              
              {/* Footer mejorado */}
              <Box 
                component="footer" 
                className="garden-footer"
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  🌸 Xotla - Tu jardín azteca de pixel art 🌸
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;