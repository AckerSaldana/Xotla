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
  OpacityIcon
} from '@mui/icons-material';
import { 
  WATER_COST, 
  FERTILIZER_COST, 
  calculateSellingPrice
} from '../utils/plantUtils';
import YardIcon from '@mui/icons-material/Yard';

// Componentes estilizados
const StyledCard = styled(Card)(({ theme }) => ({
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
  imageRendering: 'pixelated',
  objectFit: 'contain'
});

// Componente de progreso de crecimiento estilizado
const GrowthProgress = styled(Box)(({ theme, value }) => ({
  height: '8px',
  borderRadius: 0,
  border: '1px solid #0f0f0f',
  backgroundColor: '#1e3222',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    height: '100%',
    width: `${value}%`,
    backgroundColor: value < 33 ? '#78c272' : value < 66 ? '#ffdb70' : '#e36956',
  },
  marginTop: '5px',
}));

// Medidor de recursos de la planta
const ResourceMeter = styled(Box)(({ theme, value, color }) => ({
  width: '100%',
  height: '6px',
  backgroundColor: '#1e3222',
  border: '1px solid #0f0f0f',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    height: '100%',
    width: `${value}%`,
    backgroundColor: color,
  },
}));

const FlowerCard = ({ 
  flower, 
  onClick, 
  onWater, 
  onFertilize, 
  coins 
}) => {
  // Renderizar imagen según etapa de crecimiento
  const renderFlowerImage = () => {
    // Aquí podríamos tener diferentes imágenes para cada etapa
    // Por simplicidad usamos la misma con diferentes tamaños
    const scale = flower.growthStage === 0 ? 0.4 :
                flower.growthStage === 1 ? 0.6 :
                flower.growthStage === 2 ? 0.8 : 1;
    
    const opacity = flower.health < 30 ? 0.5 : 1;
    
    return (
      <Box sx={{ position: 'relative' }}>
        <FlowerImage 
          src={flower.image} 
          alt={flower.name}
          sx={{ 
            transform: `scale(${scale})`,
            opacity,
            transition: 'transform 0.3s, opacity 0.3s'
          }}
        />
        {flower.water <= 30 && (
          <Box sx={{ 
            position: 'absolute', 
            bottom: 0, 
            right: 0,
            color: '#ff6b6b',
            animation: 'blink 1.5s infinite'
          }}>
            <OpacityIcon sx={{ fontSize: 16 }} />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <StyledCard onClick={onClick}>
      <CardContent>
        {/* Renderizamos la flor según su etapa de crecimiento */}
        {renderFlowerImage()}
        
        <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: '0.8rem' }}>
          {flower.name}
        </Typography>
        
        {/* Barra de progreso de crecimiento */}
        <Box sx={{ mt: 1, mb: 1 }}>
          <Typography variant="caption" sx={{ fontSize: '0.5rem', display: 'block', textAlign: 'center' }}>
            Crecimiento: {Math.round(flower.growthProgress)}%
          </Typography>
          <GrowthProgress value={flower.growthProgress} />
        </Box>
        
        {/* Medidores de recursos */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
          <Box sx={{ width: '48%' }}>
            <Typography variant="caption" sx={{ fontSize: '0.5rem', display: 'block', textAlign: 'center' }}>
              Agua
            </Typography>
            <ResourceMeter value={flower.water} color="#8ecde6" />
          </Box>
          <Box sx={{ width: '48%' }}>
            <Typography variant="caption" sx={{ fontSize: '0.5rem', display: 'block', textAlign: 'center' }}>
              Salud
            </Typography>
            <ResourceMeter value={flower.health} color="#78c272" />
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Button 
            variant="contained" 
            size="small"
            color="info"
            onClick={(e) => {
              e.stopPropagation();
              onWater();
            }}
            disabled={coins < WATER_COST}
            sx={{ fontSize: '0.5rem', px: 1 }}
          >
            <WaterIcon sx={{ fontSize: 16, mr: 0.5 }} /> {WATER_COST}
          </Button>
          <Button 
            variant="contained" 
            size="small"
            color="success"
            onClick={(e) => {
              e.stopPropagation();
              onFertilize();
            }}
            disabled={coins < FERTILIZER_COST}
            sx={{ fontSize: '0.5rem', px: 1 }}
          >
            <YardIcon sx={{ fontSize: 16, mr: 0.5 }} /> {FERTILIZER_COST}
          </Button>
        </Box>

        {/* Indicador de precio de venta si está lista */}
        {flower.growthStage >= 3 && (
          <Box sx={{ 
            mt: 1, 
            p: 0.5, 
            backgroundColor: 'rgba(255, 219, 112, 0.2)', 
            border: '1px dashed #ffdb70',
            textAlign: 'center'
          }}>
            <Typography variant="caption" sx={{ fontSize: '0.5rem', color: '#ffdb70' }}>
              ¡Lista para vender! {calculateSellingPrice(flower)} monedas
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default FlowerCard;