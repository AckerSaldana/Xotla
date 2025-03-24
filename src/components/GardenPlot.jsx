// src/components/GardenPlot.jsx
import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { Add as AddIcon, LocalFlorist as FlowerIcon } from '@mui/icons-material';

// Marco de madera con hojas para las parcelas
const WoodenFrame = styled(Box)(({ theme, isEmpty }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  background: isEmpty ? 
    // Parcela de tierra vacía con textura
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath fill='%23735f4d' fill-opacity='0.4' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'%3E%3C/path%3E%3C/svg%3E"),
     linear-gradient(rgba(94, 75, 45, 0.9), rgba(94, 75, 45, 0.8))` : 
    // Parcela ocupada con fondo más claro
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath fill='%23735f4d' fill-opacity='0.2' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'%3E%3C/path%3E%3C/svg%3E"),
     linear-gradient(rgba(120, 100, 70, 0.6), rgba(120, 100, 70, 0.5))`,
  backgroundColor: isEmpty ? '#735f4d' : '#9c8b75',
  borderRadius: '4px',
  border: '4px solid #5e4e37',
  boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 0 10px rgba(0,0,0,0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  overflow: 'hidden',
  zIndex: 1,
  
  // Marco de madera
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '0px',
    border: '8px solid #4d3a23',
    boxSizing: 'border-box',
    backgroundImage: `
      linear-gradient(45deg, #4d3a23 25%, #6a4f30 25%, #6a4f30 50%, #4d3a23 50%, #4d3a23 75%, #6a4f30 75%, #6a4f30 100%)
    `,
    backgroundSize: '8px 8px',
    boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.1)',
    opacity: 0.85,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 85%, 8px 85%, 8px 15%, 0% 15%)',
    zIndex: -1
  },
  
  // Marco de madera inferior derecha
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '0px',
    border: '8px solid #4d3a23',
    boxSizing: 'border-box',
    backgroundImage: `
      linear-gradient(45deg, #4d3a23 25%, #6a4f30 25%, #6a4f30 50%, #4d3a23 50%, #4d3a23 75%, #6a4f30 75%, #6a4f30 100%)
    `,
    backgroundSize: '8px 8px',
    boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.1)',
    opacity: 0.85,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 15%, calc(100% - 8px) 15%, calc(100% - 8px) 85%, 100% 85%, 100% 100%, 0% 100%)',
    zIndex: -1
  },
}));

// Decoración de hojas para las esquinas
const LeafDecoration = styled(Box)(({ corner }) => {
  // Posiciones y rotaciones para cada esquina
  const positions = {
    topLeft: { top: '-5px', left: '-5px', transform: 'rotate(-45deg)' },
    topRight: { top: '-5px', right: '-5px', transform: 'rotate(45deg)' },
    bottomLeft: { bottom: '-5px', left: '-5px', transform: 'rotate(-135deg)' },
    bottomRight: { bottom: '-5px', right: '-5px', transform: 'rotate(135deg)' }
  };
  
  const pos = positions[corner];
  
  return {
    position: 'absolute',
    ...pos,
    width: '20px',
    height: '20px',
    backgroundColor: '#4c9f47',
    borderRadius: '50% 50% 0 50%',
    opacity: 0.8,
    zIndex: 2
  };
});

// Botón de plantar mejorado
const PlantButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4c9f47',
  color: 'white',
  border: '2px solid #3a7a32',
  borderRadius: '4px',
  padding: '6px 12px',
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.7rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  '&:hover': {
    backgroundColor: '#5db358',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'all 0.3s',
  },
  '&:hover::after': {
    left: '100%',
  }
}));

// Marco de imagen con estilo de madera para la planta
const PlantImageFrame = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '90%',
  maxWidth: '120px',
  height: '120px',
  margin: '5px auto 15px auto',
  padding: '6px',
  backgroundColor: '#735f4d',
  borderRadius: '6px',
  border: '4px solid #4d3a23',
  boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 0 5px rgba(0,0,0,0.3)',
  overflow: 'hidden',
  
  // Textura de madera
  backgroundImage: `
    repeating-linear-gradient(
      90deg,
      #4d3a23,
      #4d3a23 2px,
      #735f4d 2px,
      #735f4d 10px
    )
  `,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: '2px',
    pointerEvents: 'none'
  }
}));

// Contenedor para la imagen de la planta
const PlantImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255,0.9)',
  borderRadius: '2px',
  overflow: 'hidden'
}));

// Componente principal para una parcela
const GardenPlot = ({ 
  isEmpty = true, 
  plantName = "", 
  plantImage = "", 
  onClick,
  children
}) => {
  return (
    <WoodenFrame isEmpty={isEmpty}>
      {/* Decoraciones de hojas en las esquinas */}
      <LeafDecoration corner="topLeft" />
      <LeafDecoration corner="topRight" />
      <LeafDecoration corner="bottomLeft" />
      <LeafDecoration corner="bottomRight" />
      
      {isEmpty ? (
        // Parcela vacía
        <>
          <Box sx={{ 
            height: '120px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            opacity: 0.6
          }}>
            <Typography variant="body2" sx={{ 
              color: '#f8f5e4', 
              textAlign: 'center',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.6rem',
              mb: 1,
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}>
              Parcela Vacía
            </Typography>
          </Box>
          
          <PlantButton 
            startIcon={<AddIcon />}
            onClick={onClick}
          >
            Plantar
          </PlantButton>
        </>
      ) : (
        // Parcela con planta
        <>
          {/* Marcos de madera para la planta */}
          <PlantImageFrame>
            <PlantImageContainer>
              <img 
                src={plantImage} 
                alt={plantName} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </PlantImageContainer>
          </PlantImageFrame>
          
          {/* Etiqueta con el nombre */}
          <Box sx={{ 
            backgroundColor: 'rgba(255,255,255,0.8)', 
            borderRadius: '10px',
            border: '1px solid #3a7a32',
            px: 1.5, 
            py: 0.5,
            mb: 1,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            <Typography variant="body2" sx={{ 
              color: '#0a0c0b', 
              textAlign: 'center',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.7rem'
            }}>
              {plantName}
            </Typography>
          </Box>
          
          {/* Contenido adicional para la planta (barras de progreso, botones, etc) */}
          {children}
        </>
      )}
    </WoodenFrame>
  );
};

export default GardenPlot;