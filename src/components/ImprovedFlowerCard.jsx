// src/components/ImprovedFlowerCard.jsx
import React, { useState } from 'react';
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
import FertilizerIcon from '@mui/icons-material/Grass'; // Usamos Grass como icono de fertilizante
import { 
  WATER_COST, 
  FERTILIZER_COST,
  getGrowthStageName
} from '../utils/plantUtils';
import { useNavigate } from 'react-router-dom';
import '../styles/GardenAnimations.css';

// Componentes estilizados mejorados
const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  position: 'relative',
  border: '4px solid #0a0c0b',
  borderRadius: 0,
  boxShadow: '6px 6px 0 #0a0c0b',
  transition: 'transform 0.3s, box-shadow 0.3s',
  overflow: 'visible',
  height: '100%',
  backgroundColor: '#304a2e',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '6px 14px 0 #0a0c0b',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '12px',
    height: '12px',
    backgroundColor: '#ffa5c3',
    borderRadius: '50%',
    border: '2px solid #0a0c0b',
    zIndex: 1
  }
}));

// Imagen de planta mejorada con animación
const FlowerImage = styled('img')(({ scale = 1, withering = false }) => ({
  width: '90px',
  height: '90px',
  margin: '0 auto',
  display: 'block',
  imageRendering: 'pixelated',
  objectFit: 'contain',
  transform: `scale(${scale})`,
  opacity: withering ? 0.6 : 1,
  filter: withering ? 'grayscale(30%)' : 'none',
  transformOrigin: 'bottom center',
}));

// Contenedor para la planta con tierra
const PlantContainer = styled(Box)({
  position: 'relative',
  marginBottom: '12px',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#5e3c28', // Color de tierra
  borderRadius: '0 0 40% 40% / 20%',
  // Textura de tierra
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'%3E%3Cpath fill='%238c6840' fill-opacity='0.2' d='M0 0h2v2H0V0zm2 2h2v2H2V2zm2 2h2v2H4V4z'%3E%3C/path%3E%3C/svg%3E")`,
  padding: '8px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '70%',
    height: '10px',
    backgroundColor: '#0a0c0b',
    borderRadius: '50%',
    filter: 'blur(4px)',
    opacity: 0.3,
    zIndex: 0
  }
});

// Barra de agua mejorada
const WaterBar = styled(Box)(({ value }) => ({
  height: '10px',
  width: '100%',
  backgroundColor: '#182418',
  border: '2px solid #0a0c0b',
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
    backgroundColor: '#7cc5e6',
    backgroundImage: value <= 30 ?
      'linear-gradient(90deg, #7cc5e6, #7cc5e6 50%, #619dc1 50%, #619dc1 100%)' :
      'linear-gradient(90deg, #7cc5e6, #a6d9f2)',
    backgroundSize: '4px 4px',
    transition: 'width 0.5s'
  }
}));

// Barra de salud mejorada
const HealthBar = styled(Box)(({ value }) => ({
  height: '10px',
  width: '100%',
  backgroundColor: '#182418',
  border: '2px solid #0a0c0b',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${value}%`,
    height: '100%',
    backgroundColor: value <= 30 ? '#d14b45' : '#4c9f47',
    backgroundImage: value <= 30 ?
      'linear-gradient(90deg, #d14b45, #ff8c7a)' :
      'linear-gradient(90deg, #4c9f47, #7bba74)',
    backgroundSize: '4px 4px',
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
    borderRadius: 0,
    border: '2px solid #0a0c0b',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '0.6rem',
    padding: '3px 6px',
    zIndex: 10,
    boxShadow: '2px 2px 0 #0a0c0b'
  };
});

// Botón de acción mejorado
const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: '36px',
  height: '36px',
  border: '2px solid #0a0c0b',
  borderRadius: 0,
  boxShadow: '3px 3px 0 #0a0c0b',
  padding: '0',
  transition: 'transform 0.1s, box-shadow 0.1s',
  '&:active': {
    transform: 'translate(3px, 3px)',
    boxShadow: 'none',
  }
}));

// Componente principal ImprovedFlowerCard
const ImprovedFlowerCard = ({ 
  flower, 
  onWater, 
  onFertilize, 
  coins 
}) => {
  const navigate = useNavigate();
  const [showWaterEffect, setShowWaterEffect] = useState(false);
  const [showFertilizeEffect, setShowFertilizeEffect] = useState(false);
  
  // Renderizar imagen según etapa de crecimiento
  const renderFlowerImage = () => {
    // Escala basada en el crecimiento
    const scale = flower.growthStage === 0 ? 0.5 :
                 flower.growthStage === 1 ? 0.7 :
                 flower.growthStage === 2 ? 0.9 : 1.1;
    
    // Determinar si está marchitándose
    const isWithering = flower.health < 30;
    
    return (
      <PlantContainer className={showWaterEffect ? "water-effect" : showFertilizeEffect ? "fertilize-effect" : ""}>
        <FlowerImage 
          src={flower.image} 
          alt={flower.name}
          scale={scale}
          withering={isWithering}
          className="plant-sway"
        />
        {flower.water <= 30 && (
          <Box sx={{ 
            position: 'absolute', 
            bottom: 10, 
            right: 10,
            color: '#d14b45'
          }}
          className="blinking">
            <OpacityIcon sx={{ fontSize: 20 }} />
          </Box>
        )}
        
        {/* Efectos de agua */}
        {showWaterEffect && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <Box 
                key={`water-${i}`}
                className="water-drop"
                sx={{ 
                  left: `${10 + (i * 10)}%`,
                  top: '-20%',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </>
        )}
        
        {/* Partículas de fertilizante */}
        {showFertilizeEffect && (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <Box 
                key={`fertilize-${i}`}
                className="fertilize-particle"
                sx={{ 
                  backgroundColor: i % 2 === 0 ? '#4c9f47' : '#7bba74',
                  left: `${10 + (i * 8)}%`,
                  bottom: '10%',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </>
        )}
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
    
    // Mostrar efecto de fertilizar
    setShowFertilizeEffect(true);
    setTimeout(() => setShowFertilizeEffect(false), 2000);
  };

  return (
    <StyledCard onClick={handleCardClick} className="garden-card fade-in-up">
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
        <Box sx={{ mb: 1.5, width: '100%' }}>
          {/* Barra de agua */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <WaterIcon sx={{ fontSize: 14, mr: 0.5, color: '#7cc5e6' }} />
            <WaterBar value={flower.water} className="resource-meter" />
          </Box>
          
          {/* Barra de salud */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SpaIcon sx={{ fontSize: 14, mr: 0.5, color: flower.health <= 30 ? '#d14b45' : '#4c9f47' }} />
            <HealthBar value={flower.health} className="resource-meter" />
          </Box>
        </Box>
        
        {/* Indicador de progreso mejorado */}
        <Box 
          sx={{ 
            mb: 1.5, 
            p: 0.75,
            border: '2px solid #0a0c0b',
            backgroundColor: flower.growthStage === 3 ? 'rgba(255, 217, 102, 0.2)' : 'rgba(76, 159, 71, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%'
          }}
          className={flower.growthStage === 3 ? 'pulse-glow' : ''}
        >
          <GrowthIcon sx={{ fontSize: 14, mr: 0.5, color: flower.growthStage === 3 ? '#ffd966' : '#4c9f47' }} />
          <Typography variant="caption" sx={{ 
            fontSize: '0.6rem', 
            color: flower.growthStage === 3 ? '#ffd966' : '#f8f5e4'
          }}>
            {Math.round(flower.growthProgress)}% crecimiento
          </Typography>
          
          {/* Marcadores de etapas */}
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '3px',
            backgroundColor: 'transparent' 
          }}>
            <Box sx={{ 
              position: 'absolute', 
              left: '33%', 
              height: '3px', 
              width: '1px', 
              backgroundColor: '#f8f5e4',
              opacity: 0.5 
            }} />
            <Box sx={{ 
              position: 'absolute', 
              left: '66%', 
              height: '3px', 
              width: '1px', 
              backgroundColor: '#f8f5e4',
              opacity: 0.5 
            }} />
          </Box>
        </Box>
        
        {/* Botones de acción mejorados */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <ActionButton 
            color="info"
            onClick={handleWater}
            disabled={coins < WATER_COST}
            title={`Regar (${WATER_COST} monedas)`}
            className="pixel-button"
            sx={{
              backgroundColor: '#7cc5e6',
              '&:hover': {
                backgroundColor: '#a6d9f2'
              }
            }}
          >
            <WaterIcon />
          </ActionButton>
          
          <ActionButton 
            color="success"
            onClick={handleFertilize}
            disabled={coins < FERTILIZER_COST}
            title={`Fertilizar (${FERTILIZER_COST} monedas)`}
            className="pixel-button"
            sx={{
              backgroundColor: '#4c9f47',
              '&:hover': {
                backgroundColor: '#7bba74'
              }
            }}
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
                backgroundColor: '#ffd966',
                overflow: 'hidden',
                '&:hover': {
                  backgroundColor: '#ffe490'
                },
                position: 'relative'
              }}
            >
              <FlowerIcon />
              <Box className="shine-effect" />
            </ActionButton>
          )}
        </Box>
        
        {/* Indicador mejorado para plantas maduras */}
        {flower.growthStage === 3 && (
          <Box sx={{ 
            mt: 1, 
            p: 0.5, 
            backgroundColor: 'rgba(255, 217, 102, 0.2)', 
            border: '1px dashed #ffd966',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            width: '100%'
          }}>
            <Typography variant="caption" sx={{ fontSize: '0.5rem', color: '#ffd966' }}>
              ¡Lista para vender!
            </Typography>
            
            {/* Efecto de brillo */}
            <Box sx={{ 
              position: 'absolute',
              top: 0,
              left: -100,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shine 2s infinite',
            }} />
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ImprovedFlowerCard;