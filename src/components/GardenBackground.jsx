// src/components/GardenBackground.jsx
import React from 'react';
import { Box, styled } from '@mui/material';

// Fondo principal de jardín con textura y capas decorativas
const GardenBackgroundContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -100,
  backgroundImage: `
    linear-gradient(to bottom, rgba(26, 55, 31, 0.9), rgba(18, 38, 22, 0.95)),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z' fill='%23395c36' fill-opacity='0.2'/%3E%3C/svg%3E")
  `,
  backgroundColor: '#1e3222',
  overflow: 'hidden'
});

// Decoraciones de hojas que aparecen por todo el jardín
const GardenDecorations = () => {
  const decorations = [];
  
  // Generar posiciones aleatorias para plantas decorativas
  for (let i = 0; i < 20; i++) {
    const type = Math.floor(Math.random() * 3); // 0: hoja, 1: flor pequeña, 2: helecho
    const size = 30 + Math.floor(Math.random() * 40);
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const rotation = Math.random() * 360;
    const opacity = 0.1 + Math.random() * 0.15;
    
    let decoration;
    if (type === 0) {
      // Hoja
      decoration = (
        <Box
          key={`leaf-${i}`}
          sx={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size * 0.6}px`,
            backgroundColor: '#4c9f47',
            borderRadius: '50% 50% 0 50%',
            transform: `rotate(${rotation}deg)`,
            opacity: opacity,
            zIndex: -50
          }}
        />
      );
    } else if (type === 1) {
      // Flor pequeña
      const colors = ['#ffafd0', '#ffd966', '#7cc5e6', '#c896db'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      decoration = (
        <Box
          key={`flower-${i}`}
          sx={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: `${size * 0.6}px`,
            height: `${size * 0.6}px`,
            backgroundColor: color,
            borderRadius: '50%',
            transform: `rotate(${rotation}deg)`,
            opacity: opacity,
            zIndex: -50,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '30%',
              height: '30%',
              backgroundColor: '#ffd966',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        />
      );
    } else {
      // Helecho
      decoration = (
        <Box
          key={`fern-${i}`}
          sx={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size * 0.8}px`,
            backgroundImage: `
              radial-gradient(
                circle at 0% 50%,
                transparent 9px,
                #396339 10px,
                transparent 11px
              ),
              radial-gradient(
                circle at 100% 50%,
                transparent 9px,
                #396339 10px,
                transparent 11px
              )
            `,
            backgroundSize: '10px 20px',
            transform: `rotate(${rotation}deg)`,
            opacity: opacity,
            zIndex: -50
          }}
        />
      );
    }
    
    decorations.push(decoration);
  }
  
  return decorations;
};

// Vignette para dar profundidad
const VignetteOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  boxShadow: 'inset 0 0 150px rgba(0,0,0,0.7)',
  pointerEvents: 'none',
  zIndex: -40
});

// Capa de luz ambiental
const AmbientLight = styled(Box)({
  position: 'absolute',
  top: '10%',
  left: '30%',
  width: '40%',
  height: '30%',
  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
  opacity: 0.4,
  zIndex: -45
});

// Componente principal
const GardenBackground = () => {
  return (
    <GardenBackgroundContainer>
      <GardenDecorations />
      <AmbientLight />
      <VignetteOverlay />
    </GardenBackgroundContainer>
  );
};

export default GardenBackground;