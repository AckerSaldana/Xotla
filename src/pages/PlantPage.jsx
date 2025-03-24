// src/pages/PlantPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  Container,
  IconButton,
  Grid,
  Divider,
  styled,
  Paper
} from '@mui/material';
import {
  WaterDrop as WaterIcon,
  ShoppingBasket as BasketIcon,
  Spa as SpaIcon,
  AccessTime as TimeIcon,
  ArrowBack as ArrowBackIcon,
  Info as InfoIcon,
  EmojiNature as FlowerIcon,
  LocalFlorist as SeedIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  getGrowthStageDescription, 
  getGrowthStageName,
  calculateSellingPrice,
  calculateTimeToNextStage,
  WATER_COST,
  FERTILIZER_COST
} from '../utils/plantUtils';
import YardIcon from '@mui/icons-material/Yard';

// Estilos para componentes pixel art
const PlantPageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23dda77b\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  position: 'relative',
  paddingBottom: theme.spacing(4),
  paddingTop: theme.spacing(2),
}));

const PlantCard = styled(Card)(({ theme }) => ({
  border: '4px solid #0f0f0f',
  borderRadius: 0,
  boxShadow: '8px 8px 0 #0f0f0f',
  position: 'relative',
  overflow: 'visible',
  marginBottom: theme.spacing(3),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '16px',
    height: '16px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    border: '2px solid #0f0f0f',
    zIndex: 1
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
    width: '12px',
    height: '12px',
    backgroundColor: theme.palette.primary.main,
    border: '2px solid #0f0f0f',
    zIndex: 0
  }
}));

const ResourceLabel = styled(Typography)({
  fontSize: '0.7rem',
  fontFamily: '"Press Start 2P", cursive',
  display: 'block',
  marginBottom: 4,
  textTransform: 'uppercase'
});

// Barra de agua con estilo de gotas pixel art
const WaterMeter = styled(Box)(({ value, theme }) => ({
  height: '20px',
  width: '100%',
  border: '3px solid #0f0f0f',
  position: 'relative',
  backgroundColor: '#1e3222',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${value}%`,
    height: '100%',
    backgroundColor: '#8ecde6',
    backgroundImage: 'linear-gradient(to right, #8ecde6, #abdff0)',
    backgroundSize: '8px 8px',
    transition: 'width 0.5s ease-in-out'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(circle, #ffffff33 1px, transparent 1px)',
    backgroundSize: '8px 8px',
    opacity: 0.5,
    pointerEvents: 'none'
  }
}));

// Barra de salud con estilo de suelo pixel art
const HealthMeter = styled(Box)(({ value, theme }) => ({
  height: '20px',
  width: '100%',
  border: '3px solid #0f0f0f',
  position: 'relative',
  backgroundColor: '#1e3222',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${value}%`,
    height: '100%',
    backgroundColor: '#78c272',
    backgroundImage: 'linear-gradient(to right, #78c272, #90d78a)',
    backgroundSize: '8px 8px',
    transition: 'width 0.5s ease-in-out'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(circle, #ffffff33 1px, transparent 1px)',
    backgroundSize: '8px 8px',
    opacity: 0.5,
    pointerEvents: 'none'
  }
}));

// Barra de crecimiento con estilo flores pixel art
const GrowthMeter = styled(Box)(({ value, theme }) => ({
  height: '24px',
  width: '100%',
  border: '3px solid #0f0f0f',
  position: 'relative',
  backgroundColor: '#1e3222',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${value}%`,
    height: '100%',
    backgroundColor: value < 33 ? '#78c272' : value < 66 ? '#ffdb70' : '#e36956',
    backgroundImage: value < 33 ? 
      'linear-gradient(to right, #78c272, #90d78a)' : 
      value < 66 ? 
      'linear-gradient(to right, #ffdb70, #ffe690)' : 
      'linear-gradient(to right, #e36956, #f58879)',
    backgroundSize: '8px 8px',
    transition: 'width 0.5s ease-in-out'
  }
}));

// Marcadores para etapas de crecimiento
const GrowthStageMarker = styled(Box)(({ active, theme }) => ({
  width: '16px',
  height: '16px',
  backgroundColor: active ? theme.palette.secondary.main : '#1e3222',
  border: '2px solid #0f0f0f',
  position: 'relative',
  '&::after': {
    content: active ? '"✓"' : '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '10px',
    color: '#fff',
    fontWeight: 'bold'
  }
}));

// Imagen grande de la planta con animación
const PlantImage = styled('img')(({ scale = 1, health = 100 }) => ({
  width: '180px',
  height: '180px',
  margin: '0 auto',
  display: 'block',
  imageRendering: 'pixelated',
  objectFit: 'contain',
  transform: `scale(${scale})`,
  opacity: health < 30 ? 0.5 : 1,
  transition: 'transform 0.3s, opacity 0.3s',
  animation: 'plant-sway 3s infinite alternate ease-in-out'
}));

// Botón de acción estilo pixel art
const ActionButton = styled(Button)(({ theme }) => ({
  border: '3px solid #0f0f0f',
  borderRadius: 0,
  boxShadow: '3px 3px 0 #0f0f0f',
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.7rem',
  padding: '0.5rem 1rem',
  position: 'relative',
  transition: 'transform 0.1s, box-shadow 0.1s',
  '&:active': {
    transform: 'translate(3px, 3px)',
    boxShadow: 'none',
  }
}));

// Decoración de tierra para el fondo
const SoilDecoration = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '30px',
  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'16\' viewBox=\'0 0 32 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,0 L32,0 L32,4 C24,4 24,12 16,12 C8,12 8,4 0,4 L0,0 Z\' fill=\'%236e4e37\'/%3E%3C/svg%3E")',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'center bottom',
  zIndex: 0
});

// Panel de información con borde decorativo
const InfoPanel = styled(Paper)(({ theme }) => ({
  border: '3px solid #0f0f0f',
  borderRadius: 0,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    border: '1px dashed #78c272',
    pointerEvents: 'none',
    zIndex: 0
  }
}));

const PlantPage = ({ 
  inventory, 
  coins, 
  onWater, 
  onFertilize, 
  onSell,
  onUpdateInventory 
}) => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);

  // Cargar datos de la planta
  useEffect(() => {
    if (inventory && plantId) {
      const selectedPlant = inventory.find(p => p.id === plantId);
      if (selectedPlant) {
        setPlant(selectedPlant);
      } else {
        // Planta no encontrada, volver a inicio
        navigate('/');
      }
    }
  }, [plantId, inventory, navigate]);

  if (!plant) {
    return (
      <PlantPageContainer>
        <Container maxWidth="md">
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh" flexDirection="column">
            <Typography variant="h3" gutterBottom>
              Cargando planta...
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
            >
              Volver al Jardín
            </Button>
          </Box>
        </Container>
      </PlantPageContainer>
    );
  }

  // Calcular escala según estado de crecimiento
  const scale = plant.growthStage === 0 ? 0.5 :
              plant.growthStage === 1 ? 0.7 :
              plant.growthStage === 2 ? 0.9 : 1.1;
  
  // Calcular tiempo restante para la siguiente etapa
  const hoursRemaining = calculateTimeToNextStage(plant);
  
  // Precio de venta actual
  const sellingPrice = calculateSellingPrice(plant);

  // Manejar acción de regar
  const handleWater = () => {
    onWater(plant.id);
  };

  // Manejar acción de fertilizar
  const handleFertilize = () => {
    onFertilize(plant.id);
  };

  // Manejar acción de vender
  const handleSell = () => {
    onSell(plant.id);
    navigate('/');
  };

  return (
    <PlantPageContainer>
      {/* Decoraciones de fondo */}
      <SoilDecoration />
      
      <Container maxWidth="md">
        {/* Encabezado con botón de regreso */}
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton 
            color="secondary" 
            onClick={() => navigate('/')}
            sx={{ 
              border: '2px solid #0f0f0f', 
              borderRadius: 0,
              mr: 2
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h2" component="h1">
            {plant.name}
          </Typography>
        </Box>
        
        {/* Tarjeta principal de la planta */}
        <PlantCard>
          <Box p={3}>
            {/* Imagen grande de la planta */}
            <Box 
              sx={{ 
                py: 2, 
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '20px',
                  backgroundColor: '#6e4e37',
                  borderRadius: '50%',
                  opacity: 0.5,
                  filter: 'blur(4px)'
                }
              }}
            >
              <PlantImage 
                src={plant.image} 
                alt={plant.name} 
                scale={scale}
                health={plant.health}
              />
            </Box>
            
            {/* Etapa de crecimiento */}
            <Box 
              sx={{ 
                p: 2, 
                backgroundColor: '#1e3222', 
                border: '3px solid #0f0f0f',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h3" component="div" sx={{ color: '#ffdb70', mb: 1 }}>
                {getGrowthStageName(plant.growthStage)}
              </Typography>
              
              <Typography variant="body1" sx={{ textAlign: 'center', px: 2 }}>
                {getGrowthStageDescription(plant.growthStage, plant.name)}
              </Typography>
            </Box>
            
            {/* Estado de crecimiento con marcadores */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="div" gutterBottom>
                Progreso de Crecimiento
              </Typography>
              
              {/* Barra de progreso con marcadores de etapas */}
              <Box sx={{ position: 'relative', mt: 3, mb: 2 }}>
                <GrowthMeter value={plant.growthProgress} />
                
                {/* Marcadores de las etapas */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 1,
                  position: 'relative',
                  mx: 1
                }}>
                  <Box sx={{ 
                    position: 'absolute', 
                    top: -32, 
                    left: 0, 
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between' 
                  }}>
                    <GrowthStageMarker active={plant.growthStage >= 0} />
                    <GrowthStageMarker active={plant.growthStage >= 1} />
                    <GrowthStageMarker active={plant.growthStage >= 2} />
                    <GrowthStageMarker active={plant.growthStage >= 3} />
                  </Box>
                  
                  <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>0%</Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>33%</Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>66%</Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>100%</Typography>
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ fontSize: '0.8rem', textAlign: 'center' }}>
                Progreso actual: {Math.round(plant.growthProgress)}%
              </Typography>
              
              {/* Tiempo restante para la siguiente etapa */}
              {plant.growthStage < 3 && (
                <Box 
                  sx={{ 
                    mt: 2, 
                    p: 1.5,
                    backgroundColor: 'rgba(142, 205, 230, 0.1)',
                    border: '1px dashed #8ecde6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <TimeIcon sx={{ mr: 1, color: '#8ecde6' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    {hoursRemaining > 0 
                      ? `Aprox. ${hoursRemaining} horas para siguiente etapa`
                      : 'Pasando a la siguiente etapa pronto'
                    }
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            {/* Recursos de la planta */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <ResourceLabel>
                  <WaterIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                  Nivel de Agua: {Math.round(plant.water)}%
                </ResourceLabel>
                <WaterMeter value={plant.water} />
                {plant.water <= 30 && (
                  <Typography variant="caption" sx={{ color: '#ff6b6b', display: 'block', mt: 1 }}>
                    ¡Tu planta necesita agua urgentemente!
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <ResourceLabel>
                  <YardIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                  Salud de la Planta: {Math.round(plant.health)}%
                </ResourceLabel>
                <HealthMeter value={plant.health} />
                {plant.health <= 50 && (
                  <Typography variant="caption" sx={{ color: '#ff6b6b', display: 'block', mt: 1 }}>
                    ¡Tu planta necesita nutrientes para mejorar su salud!
                  </Typography>
                )}
              </Grid>
            </Grid>
            
            {/* Información de valor */}
            <InfoPanel sx={{ mb: 3 }}>
              <Typography variant="h3" gutterBottom>
                Valor de Mercado
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#f9f5e3',
                color: '#0f0f0f',
                p: 2,
                border: '3px solid #0f0f0f',
                mb: 2
              }}>
                <SpaIcon sx={{ color: '#ffdb70', mr: 1, fontSize: 32 }} />
                <Typography variant="h2" sx={{ 
                  fontFamily: '"Press Start 2P", cursive', 
                  fontSize: '1.8rem',
                  color: '#0f0f0f'
                }}>
                  {sellingPrice}
                </Typography>
              </Box>
              
              {plant.growthStage < 3 && (
                <Typography variant="body2" sx={{ textAlign: 'center', color: '#ffdb70' }}>
                  Precio máximo al alcanzar la floración: {plant.sellingPrice} monedas
                </Typography>
              )}
            </InfoPanel>
            
            {/* Botones de acción */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ActionButton 
                  fullWidth
                  variant="contained" 
                  color="info"
                  onClick={handleWater}
                  disabled={coins < WATER_COST}
                  startIcon={<WaterIcon />}
                >
                  Regar ({WATER_COST})
                </ActionButton>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <ActionButton 
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleFertilize}
                  disabled={coins < FERTILIZER_COST}
                  startIcon={<YardIcon />}
                >
                  Fertilizar ({FERTILIZER_COST})
                </ActionButton>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <ActionButton 
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleSell}
                  startIcon={<BasketIcon />}
                >
                  Vender ({sellingPrice})
                </ActionButton>
              </Grid>
            </Grid>
          </Box>
        </PlantCard>
        
        {/* Información adicional */}
        <InfoPanel>
          <Typography variant="h3" gutterBottom>
            <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Consejos de Cuidado
          </Typography>
          
          <Typography variant="body1" paragraph>
            Las flores necesitan agua regularmente. Si el nivel de agua baja demasiado, la salud de tu planta comenzará a disminuir, lo que ralentizará su crecimiento.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Utiliza fertilizante cuando la salud de tu planta esté baja para revivirla. Las plantas con buena salud crecen más rápido y valen más al venderlas.
          </Typography>
          
          <Typography variant="body1">
            El valor de venta es mayor cuando la planta alcanza su etapa de floración completa (100% de crecimiento) y mantiene una salud perfecta.
          </Typography>
        </InfoPanel>
      </Container>
    </PlantPageContainer>
  );
};

export default PlantPage;