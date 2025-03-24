// src/components/FlowerCard.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  styled 
} from '@mui/material';
import {
  WaterDrop as WaterIcon,
  Spa as SpaIcon,
  LocalFlorist as FlowerIcon
} from '@mui/icons-material';
import OpacityIcon from '@mui/icons-material/Opacity';
import YardIcon from '@mui/icons-material/Yard';
import { 
  WATER_COST, 
  FERTILIZER_COST, 
  calculateSellingPrice,
  getGrowthStageName
} from '../utils/plantUtils';

// Componentes estilizados mejorados
const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  position: 'relative',
  border: '3px solid #0a0c0b',
  borderRadius: '8px',
  boxShadow: '4px 4px 0 #0a0c0b',
  transition: 'transform 0.2s, box-shadow 0.2s',
  overflow: 'visible',
  height: '100%',
  backgroundColor: '#304a2e',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '4px 9px 0 #0a0c0b',
  },
}));

// Contenedor para la planta con tierra
const PlantContainer = styled(Box)({
  position: 'relative',
  marginBottom: '12px',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#9c8b75', // Color tierra más natural
  borderRadius: '0 0 40% 40% / 20%',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'%3E%3Cpath fill='%238c6840' fill-opacity='0.2' d='M0 0h2v2H0V0zm2 2h2v2H2V2zm2 2h2v2H4V4z'%3E%3C/path%3E%3C/svg%3E")`,
  padding: '8px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '70%',
    height: '8px',
    backgroundColor: '#0a0c0b',
    borderRadius: '50%',
    filter: 'blur(3px)',
    opacity: 0.3,
    zIndex: 0
  }
});

// Imagen de la planta mejorada
const FlowerImage = styled('img')({
  maxWidth: '80px',
  maxHeight: '80px',
  margin: '0 auto',
  display: 'block',
  imageRendering: 'pixelated',
  objectFit: 'contain',
});

// Barra de agua mejorada
const WaterBar = styled(Box)(({ value }) => ({
  height: '8px',
  width: '100%',
  backgroundColor: '#1e3222',
  border: '2px solid #0a0c0b',
  borderRadius: '4px',
  position: 'relative',
  marginBottom: '6px',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${value}%`,
    height: '100%',
    backgroundColor: '#8ecde6',
    transition: 'width 0.5s'
  }
}));

// Barra de salud mejorada
const HealthBar = styled(Box)(({ value }) => ({
  height: '8px',
  width: '100%',
  backgroundColor: '#1e3222',
  border: '2px solid #0a0c0b',
  borderRadius: '4px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${value}%`,
    height: '100%',
    backgroundColor: value <= 30 ? '#d14b45' : '#78c272',
    transition: 'width 0.5s, background-color 0.5s'
  }
}));

// Etiqueta de etapa de crecimiento
const GrowthTag = styled(Box)(({ theme, stage }) => {
  // Colores según etapa
  const colors = {
    0: { bg: '#4c9f47', text: '#0a0c0b' },   // Semilla - verde
    1: { bg: '#7cc5e6', text: '#0a0c0b' },   // Brote - azul claro
    2: { bg: '#d14b45', text: '#f8f5e4' },   // Capullo - coral
    3: { bg: '#ffd966', text: '#0a0c0b' }    // Flor - amarillo
  };
  
  return {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors[stage].bg,
    color: colors[stage].text,
    borderRadius: '4px',
    border: '2px solid #0a0c0b',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '0.6rem',
    padding: '3px 6px',
    zIndex: 10,
    boxShadow: '2px 2px 0 #0a0c0b'
  };
});

// Botón de acción
const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  height: '36px',
  border: '2px solid #0a0c0b',
  borderRadius: '4px',
  boxShadow: '2px 2px 0 #0a0c0b',
  padding: '0',
  transition: 'transform 0.1s, box-shadow 0.1s',
  '&:active': {
    transform: 'translate(2px, 2px)',
    boxShadow: 'none',
  }
}));

// Componente principal FlowerCard
const FlowerCard = ({ 
  flower, 
  onClick, 
  onWater, 
  onFertilize, 
  coins 
}) => {
  // Renderizar imagen según etapa de crecimiento
  const renderFlowerImage = () => {
    // Escala basada en el crecimiento
    const scale = flower.growthStage === 0 ? 0.5 :
                flower.growthStage === 1 ? 0.7 :
                flower.growthStage === 2 ? 0.9 : 1.1;
    
    // Determinar si está marchitándose
    const isWithering = flower.health < 30;
    
    return (
      <PlantContainer>
        <FlowerImage 
          src={flower.image} 
          alt={flower.name}
          style={{ 
            transform: `scale(${scale})`,
            opacity: isWithering ? 0.6 : 1,
            filter: isWithering ? 'grayscale(30%)' : 'none',
            transition: 'transform 0.3s, opacity 0.3s',
            maxWidth: '80px',
            maxHeight: '80px'
          }}
        />
        {flower.water <= 30 && (
          <Box sx={{ 
            position: 'absolute', 
            bottom: 10, 
            right: 10,
            color: '#d14b45',
            animation: 'blink 1.5s infinite'
          }}>
            <OpacityIcon sx={{ fontSize: 20 }} />
          </Box>
        )}
      </PlantContainer>
    );
  };

  return (
    <StyledCard onClick={onClick}>
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
            mb: 1.5,
            color: '#f8f5e4',
            textShadow: '1px 1px 0 #0a0c0b'
          }}
        >
          {flower.name}
        </Typography>
        
        {/* Barras de recursos */}
        <Box sx={{ mb: 1.5 }}>
          {/* Barra de agua */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <WaterIcon sx={{ fontSize: 14, mr: 0.5, color: '#8ecde6' }} />
            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#f8f5e4' }}>
              Agua: {Math.round(flower.water)}%
            </Typography>
          </Box>
          <WaterBar value={flower.water} />
          
          {/* Barra de salud */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <SpaIcon sx={{ fontSize: 14, mr: 0.5, color: flower.health <= 30 ? '#d14b45' : '#78c272' }} />
            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#f8f5e4' }}>
              Salud: {Math.round(flower.health)}%
            </Typography>
          </Box>
          <HealthBar value={flower.health} />
        </Box>
        
        {/* Indicador de progreso */}
        <Box 
          sx={{ 
            mb: 1.5, 
            p: 0.75,
            border: '2px solid #0a0c0b',
            backgroundColor: flower.growthStage === 3 ? 'rgba(255, 217, 102, 0.2)' : 'rgba(76, 159, 71, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" sx={{ 
            fontSize: '0.6rem', 
            color: flower.growthStage === 3 ? '#ffd966' : '#f8f5e4'
          }}>
            {Math.round(flower.growthProgress)}% crecimiento
          </Typography>
        </Box>
        
        {/* Botones de acción */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <ActionButton 
            color="info"
            onClick={(e) => {
              e.stopPropagation();
              onWater(flower.id);
            }}
            disabled={coins < WATER_COST}
            sx={{
              backgroundColor: '#8ecde6',
              width: '48%',
              '&:hover': {
                backgroundColor: '#a6d9f2'
              }
            }}
          >
            <WaterIcon />
          </ActionButton>
          
          <ActionButton 
            color="success"
            onClick={(e) => {
              e.stopPropagation();
              onFertilize(flower.id);
            }}
            disabled={coins < FERTILIZER_COST}
            sx={{
              backgroundColor: '#78c272',
              width: '48%',
              '&:hover': {
                backgroundColor: '#7bba74'
              }
            }}
          >
            <YardIcon />
          </ActionButton>
        </Box>
        
        {/* Indicador para plantas maduras */}
        {flower.growthStage === 3 && (
          <Box sx={{ 
            mt: 1, 
            p: 0.5, 
            backgroundColor: 'rgba(255, 217, 102, 0.2)', 
            border: '1px dashed #ffd966',
            textAlign: 'center'
          }}>
            <Typography variant="caption" sx={{ fontSize: '0.5rem', color: '#ffd966' }}>
              ¡Lista para vender! {calculateSellingPrice(flower)} monedas
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default FlowerCard;