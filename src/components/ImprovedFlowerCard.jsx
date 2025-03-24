// src/components/ImprovedFlowerCard.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  styled,
  Badge
} from '@mui/material';
import {
  WaterDrop as WaterIcon,
  Spa as SpaIcon,
  LocalFlorist as FlowerIcon,
  EmojiNature as GrowthIcon
} from '@mui/icons-material';
import OpacityIcon from '@mui/icons-material/Opacity';
import FertilizerIcon from '@mui/icons-material/Grass'; // Importamos el icono para fertilizante
import { 
  WATER_COST, 
  FERTILIZER_COST,
  getGrowthStageName
} from '../utils/plantUtils';
import { useNavigate } from 'react-router-dom';
import '../styles/GardenAnimations.css';

// Componentes estilizados para un aspecto pixel art mejorado
const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  position: 'relative',
  border: '4px solid #0f0f0f',
  borderRadius: 0,
  boxShadow: '6px 6px 0 #0f0f0f',
  transition: 'transform 0.3s, box-shadow 0.3s',
  overflow: 'visible',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '6px 14px 0 #0f0f0f',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '10px',
    height: '10px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    border: '2px solid #0f0f0f',
    zIndex: 1
  }
}));

// Imagen de la planta con animación suave
const FlowerImage = styled('img')(({ scale = 1 }) => ({
  width: '90px',
  height: '90px',
  margin: '0 auto',
  display: 'block',
  imageRendering: 'pixelated',
  objectFit: 'contain',
  transform: `scale(${scale})`,
  transition: 'transform 0.3s',
  animation: 'plant-sway 3s infinite alternate ease-in-out',
  '@keyframes plant-sway': {
    '0%': { transform: `scale(${scale}) rotate(-2deg)` },
    '100%': { transform: `scale(${scale}) rotate(2deg)` }
  }
}));

// Contenedor para la planta con tierra
const PlantContainer = styled(Box)({
  position: 'relative',
  marginBottom: '8px',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -5,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '70%',
    height: '10px',
    backgroundColor: '#6e4e37',
    borderRadius: '50%',
    filter: 'blur(2px)',
    opacity: 0.6,
    zIndex: 0
  }
});

// Barra de agua con estilo pixel art
const WaterBar = styled(Box)(({ value }) => ({
  height: '10px',
  width: '100%',
  backgroundColor: '#1e3222',
  border: '2px solid #0f0f0f',
  position: 'relative',
  marginBottom: '4px',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${value}%`,
    height: '100%',
    backgroundColor: '#8ecde6',
    backgroundImage: 'linear-gradient(90deg, #8ecde6 0%, #8ecde6 50%, #9fddee 50%, #9fddee 100%)',
    backgroundSize: '4px 4px',
  }
}));

// Barra de salud con estilo pixel art
const HealthBar = styled(Box)(({ value }) => ({
  height: '10px',
  width: '100%',
  backgroundColor: '#1e3222',
  border: '2px solid #0f0f0f',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${value}%`,
    height: '100%',
    backgroundColor: '#78c272',
    backgroundImage: 'linear-gradient(90deg, #78c272 0%, #78c272 50%, #8cd386 50%, #8cd386 100%)',
    backgroundSize: '4px 4px',
  }
}));

// Badge estilo pixel art
const PixelBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '0.5rem',
    padding: '0 4px',
    minWidth: '16px',
    height: '16px',
    borderRadius: 0,
    border: '1px solid #0f0f0f',
  }
}));

// Botón de acción con estilo pixel art
const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: '36px',
  height: '36px',
  border: '2px solid #0f0f0f',
  borderRadius: 0,
  boxShadow: '2px 2px 0 #0f0f0f',
  padding: '0',
  transition: 'transform 0.1s, box-shadow 0.1s',
  '&:active': {
    transform: 'translate(2px, 2px)',
    boxShadow: 'none',
  }
}));

// Etiqueta de crecimiento
const GrowthTag = styled(Box)(({ theme, stage }) => {
  // Colores según etapa
  const colors = {
    0: { bg: '#78c272', text: '#0f0f0f' },   // Semilla - verde claro
    1: { bg: '#ffdb70', text: '#0f0f0f' },   // Brote - amarillo
    2: { bg: '#e36956', text: '#fff' },      // Capullo - coral
    3: { bg: '#ff9b89', text: '#0f0f0f' }    // Flor - rosa
  };
  
  return {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors[stage].bg,
    color: colors[stage].text,
    borderRadius: 0,
    border: '2px solid #0f0f0f',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '0.5rem',
    padding: '2px 4px',
    zIndex: 10,
    boxShadow: '1px 1px 0 #0f0f0f'
  };
});

// Efectos de agua
const WaterEffect = ({ active }) => {
  if (!active) return null;
  
  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {[...Array(5)].map((_, i) => (
        <Box 
          key={i}
          className="water-drop"
          sx={{ 
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        />
      ))}
    </Box>
  );
};

// Componente principal ImprovedFlowerCard
const ImprovedFlowerCard = ({ 
  flower, 
  onWater, 
  onFertilize, 
  coins 
}) => {
  const navigate = useNavigate();
  const [showWaterEffect, setShowWaterEffect] = React.useState(false);
  
  // Renderizar imagen según etapa de crecimiento
  const renderFlowerImage = () => {
    // Escala basada en el crecimiento
    const scale = flower.growthStage === 0 ? 0.5 :
                 flower.growthStage === 1 ? 0.7 :
                 flower.growthStage === 2 ? 0.9 : 1.1;
    
    // Opacidad basada en la salud
    const opacity = flower.health < 30 ? 0.5 : 1;
    
    return (
      <PlantContainer>
        <FlowerImage 
          src={flower.image} 
          alt={flower.name}
          scale={scale}
          style={{ opacity }}
        />
        {flower.water <= 30 && (
          <Box sx={{ 
            position: 'absolute', 
            bottom: 10, 
            right: 10,
            color: '#ff6b6b',
            animation: 'blink 1.5s infinite'
          }}>
            <OpacityIcon sx={{ fontSize: 20 }} />
          </Box>
        )}
        <WaterEffect active={showWaterEffect} />
      </PlantContainer>
    );
  };

  // Manejar clic en la tarjeta para ver los detalles
  const handleCardClick = () => {
    navigate(`/plant/${flower.id}`);
  };

  // Manejar acción de regar
  const handleWater = (e) => {
    e.stopPropagation();
    onWater(flower.id);
    
    // Mostrar efecto de agua
    setShowWaterEffect(true);
    setTimeout(() => setShowWaterEffect(false), 2000);
  };

  // Manejar acción de fertilizar
  const handleFertilize = (e) => {
    e.stopPropagation();
    onFertilize(flower.id);
  };

  return (
    <StyledCard onClick={handleCardClick} className="garden-card">
      {/* Etiqueta de etapa de crecimiento */}
      <GrowthTag stage={flower.growthStage}>
        {getGrowthStageName(flower.growthStage)}
      </GrowthTag>
      
      <CardContent sx={{ p: 2 }}>
        {/* Imagen de la planta */}
        {renderFlowerImage()}
        
        {/* Nombre de la planta */}
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontSize: '0.8rem',
            fontFamily: '"Press Start 2P", cursive',
            mb: 1.5
          }}
        >
          {flower.name}
        </Typography>
        
        {/* Barras de recursos */}
        <Box sx={{ mb: 1.5 }}>
          {/* Barra de agua */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <WaterIcon sx={{ fontSize: 14, mr: 0.5, color: '#8ecde6' }} />
            <WaterBar value={flower.water} className="resource-meter" />
          </Box>
          
          {/* Barra de salud */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SpaIcon sx={{ fontSize: 14, mr: 0.5, color: '#78c272' }} />
            <HealthBar value={flower.health} className="resource-meter" />
          </Box>
        </Box>
        
        {/* Indicador de progreso */}
        <Box 
          sx={{ 
            mb: 1.5, 
            p: 0.75,
            border: '2px solid #0f0f0f',
            backgroundColor: flower.growthStage === 3 ? 'rgba(255, 219, 112, 0.3)' : 'rgba(120, 194, 114, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className={flower.growthStage === 3 ? 'pixel-glow' : ''}
        >
          <GrowthIcon sx={{ fontSize: 14, mr: 0.5 }} />
          <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
            {Math.round(flower.growthProgress)}% crecimiento
          </Typography>
        </Box>
        
        {/* Botones de acción */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <ActionButton 
            color="info"
            onClick={handleWater}
            disabled={coins < WATER_COST}
            title={`Regar (${WATER_COST} monedas)`}
            className="pixel-button"
          >
            <WaterIcon />
          </ActionButton>
          
          <ActionButton 
            color="success"
            onClick={handleFertilize}
            disabled={coins < FERTILIZER_COST}
            title={`Fertilizar (${FERTILIZER_COST} monedas)`}
            className="pixel-button"
          >
            <FertilizerIcon />
          </ActionButton>
          
          {flower.growthStage === 3 && (
            <ActionButton 
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/plant/${flower.id}`);
              }}
              title="¡Lista para vender!"
              className="pixel-button"
              sx={{
                animation: 'coin-shine 2s infinite',
                overflow: 'hidden'
              }}
            >
              <FlowerIcon />
            </ActionButton>
          )}
        </Box>
        
        {/* Indicador para plantas maduras */}
        {flower.growthStage === 3 && (
          <Box sx={{ 
            mt: 1, 
            p: 0.5, 
            backgroundColor: 'rgba(255, 219, 112, 0.2)', 
            border: '1px dashed #ffdb70',
            textAlign: 'center'
          }}>
            <Typography variant="caption" sx={{ fontSize: '0.5rem', color: '#ffdb70' }}>
              ¡Lista para vender!
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ImprovedFlowerCard;