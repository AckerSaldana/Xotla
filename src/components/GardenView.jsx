// src/components/GardenView.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Paper,
  Divider,
  Button,
  styled,
  Fade,
  Card,
  useTheme
} from '@mui/material';
import { 
  LocalFlorist as FloristIcon,
  WaterDrop as WaterIcon,
  Spa as SpaIcon,
  EmojiNature as NatureIcon,
  Terrain as TerrainIcon,
  Add as AddIcon
} from '@mui/icons-material';
import ImprovedFlowerCard from './ImprovedFlowerCard';

import EcoIcon from '@material-ui/icons/Eco';

// Estilos para el jardín
const GardenContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b5e41\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  backgroundAttachment: 'fixed',
  position: 'relative',
  borderRadius: 0,
  border: '3px solid #0f0f0f',
  boxShadow: '6px 6px 0 #0f0f0f',
}));

// Título decorativo con elementos de jardín
const GardenTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  position: 'relative',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    height: '2px',
    width: '60px',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, #0f0f0f 4px, #0f0f0f 8px)',
  },
  '&::before': {
    left: '20%',
  },
  '&::after': {
    right: '20%',
  }
}));

// Decoraciones florales
const FlowerDecoration = styled(Box)(({ theme, top, left, size = 16, color = '#ffafd0', delay = 0 }) => ({
  position: 'absolute',
  top,
  left,
  width: size,
  height: size,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: color,
    borderRadius: '50%',
    boxShadow: `0 0 0 2px #0f0f0f`,
    animation: `flower-bloom 4s ${delay}s infinite alternate ease-in-out`
  },
  '@keyframes flower-bloom': {
    '0%': { transform: 'scale(0.8)' },
    '100%': { transform: 'scale(1.1)' }
  }
}));

// Elemento para parcelitas de tierra
const SoilPatch = styled(Box)(({ theme, used = false }) => ({
  backgroundColor: used ? '#6e4e37' : '#957b63',
  border: '3px solid #0f0f0f',
  borderRadius: 0,
  boxShadow: '3px 3px 0 #0f0f0f',
  position: 'relative',
  padding: theme.spacing(2),
  height: '100%',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'visible',
  transition: 'transform 0.2s',
  cursor: used ? 'default' : 'pointer',
  '&:hover': {
    transform: used ? 'none' : 'translateY(-5px)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'radial-gradient(#0f0f0f33 1px, transparent 1px)',
    backgroundSize: '8px 8px',
    pointerEvents: 'none'
  }
}));

// Botón de comprar planta con estilo pixel art
const BuyButton = styled(Button)(({ theme }) => ({
  border: '3px solid #0f0f0f',
  borderRadius: 0,
  boxShadow: '3px 3px 0 #0f0f0f',
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.7rem',
  padding: '0.5rem 1rem',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
  position: 'relative',
  transition: 'transform 0.1s, box-shadow 0.1s',
  '&:active': {
    transform: 'translate(3px, 3px)',
    boxShadow: 'none',
  }
}));

// Elemento de estadísticas con estilo pixel art
const StatBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '3px solid #0f0f0f',
  borderRadius: 0,
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.main
  }
}));

// Componente principal del Jardín
const GardenView = ({ 
  inventory, 
  coins, 
  onWater, 
  onFertilize, 
  onOpenCatalog,
  maxPlots = 9 // Número máximo de parcelas de jardín disponibles
}) => {
  const theme = useTheme();
  const [gardenStats, setGardenStats] = useState({
    totalPlants: 0,
    maturePlants: 0,
    needsWater: 0,
    lowHealth: 0
  });
  
  // Calcular estadísticas del jardín
  useEffect(() => {
    if (inventory) {
      setGardenStats({
        totalPlants: inventory.length,
        maturePlants: inventory.filter(p => p.growthStage === 3).length,
        needsWater: inventory.filter(p => p.water <= 30).length,
        lowHealth: inventory.filter(p => p.health <= 50).length
      });
    }
  }, [inventory]);
  
  // Generar decoraciones aleatorias de flores
  const generateFlowerDecorations = (count = 10) => {
    const flowers = [];
    const colors = ['#ffafd0', '#78c272', '#ffdb70', '#8ecde6', '#c896db'];
    
    for (let i = 0; i < count; i++) {
      flowers.push({
        id: `flower-${i}`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2
      });
    }
    
    return flowers;
  };
  
  // Flores decorativas
  const flowerDecorations = generateFlowerDecorations(15);
  
  // Calcular parcelas vacías
  const emptyPlots = Math.max(0, maxPlots - inventory.length);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Estadísticas del jardín */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatBox>
            <EcoIcon />
            <Box>
              <Typography variant="body2" color="textSecondary">
                Total de Plantas
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '1.2rem' }}>
                {gardenStats.totalPlants} / {maxPlots}
              </Typography>
            </Box>
          </StatBox>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatBox>
            <NatureIcon />
            <Box>
              <Typography variant="body2" color="textSecondary">
                Plantas Maduras
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '1.2rem' }}>
                {gardenStats.maturePlants}
              </Typography>
            </Box>
          </StatBox>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatBox>
            <WaterIcon />
            <Box>
              <Typography variant="body2" color="textSecondary">
                Necesitan Agua
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '1.2rem', color: gardenStats.needsWater > 0 ? '#ff6b6b' : 'inherit' }}>
                {gardenStats.needsWater}
              </Typography>
            </Box>
          </StatBox>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatBox>
            <SpaIcon />
            <Box>
              <Typography variant="body2" color="textSecondary">
                Salud Baja
              </Typography>
              <Typography variant="h4" sx={{ fontSize: '1.2rem', color: gardenStats.lowHealth > 0 ? '#ff6b6b' : 'inherit' }}>
                {gardenStats.lowHealth}
              </Typography>
            </Box>
          </StatBox>
        </Grid>
      </Grid>
      
      <GardenTitle variant="h2" gutterBottom>
        <FloristIcon sx={{ mr: 1.5, color: theme.palette.secondary.main }} />
        Tu Jardín
      </GardenTitle>
      
      <GardenContainer>
        {/* Decoraciones de flores */}
        {flowerDecorations.map((flower) => (
          <FlowerDecoration 
            key={flower.id}
            top={flower.top}
            left={flower.left}
            size={flower.size}
            color={flower.color}
            delay={flower.delay}
          />
        ))}
        
        {/* Jardín con parcelas */}
        <Grid container spacing={3}>
          {/* Mostrar plantas existentes */}
          {inventory && inventory.map((plant) => (
            <Fade key={plant.id} in={true} timeout={500}>
              <Grid item xs={12} sm={6} md={4}>
                <ImprovedFlowerCard 
                  flower={plant}
                  onWater={onWater}
                  onFertilize={onFertilize}
                  coins={coins}
                />
              </Grid>
            </Fade>
          ))}
          
          {/* Mostrar parcelas vacías */}
          {Array.from({ length: emptyPlots }).map((_, index) => (
            <Fade key={`empty-${index}`} in={true} timeout={500}>
              <Grid item xs={12} sm={6} md={4}>
                <SoilPatch onClick={onOpenCatalog}>
                  <TerrainIcon sx={{ fontSize: 40, color: '#957b63', mb: 2 }} />
                  <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
                    Parcela Vacía
                  </Typography>
                  <BuyButton
                    startIcon={<AddIcon />}
                    onClick={onOpenCatalog}
                  >
                    Plantar
                  </BuyButton>
                </SoilPatch>
              </Grid>
            </Fade>
          ))}
        </Grid>
      </GardenContainer>
    </Container>
  );
};

export default GardenView;