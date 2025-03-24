// src/components/GardenAmbiance.jsx
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

// Componente para añadir elementos ambientales que dan vida al jardín
const GardenAmbiance = () => {
  const [butterflies, setButterflies] = useState([]);
  const [leaves, setLeaves] = useState([]);
  
  // Generar mariposas aleatorias
  useEffect(() => {
    const colors = ['#ffa5c3', '#7cc5e6', '#ffd966', '#c387d1'];
    const generateButterflies = () => {
      const newButterflies = [];
      for (let i = 0; i < 4; i++) {
        newButterflies.push({
          id: `butterfly-${i}`,
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 60 + 10}%`,
          delay: Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setButterflies(newButterflies);
    };
    
    generateButterflies();
    
    // Regenerar mariposas cada 20 segundos
    const interval = setInterval(() => {
      generateButterflies();
    }, 20000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Generar hojas flotantes
  useEffect(() => {
    const generateLeaves = () => {
      const newLeaves = [];
      for (let i = 0; i < 6; i++) {
        newLeaves.push({
          id: `leaf-${i}`,
          left: `${Math.random() * 90 + 5}%`,
          top: `${Math.random() * 70 + 15}%`,
          rotate: Math.random() * 360,
          delay: Math.random() * 4,
          duration: Math.random() * 10 + 15,
          size: Math.random() * 5 + 8
        });
      }
      setLeaves(newLeaves);
    };
    
    generateLeaves();
  }, []);
  
  return (
    <>
      {/* Sol decorativo */}
      <Box
        sx={{
          position: 'absolute',
          top: '30px',
          right: '40px',
          width: '50px',
          height: '50px',
          backgroundColor: '#ffd966',
          borderRadius: '50%',
          border: '3px solid #0a0c0b',
          boxShadow: '0 0 20px rgba(255, 217, 102, 0.7)',
          animation: 'sun-pulse 4s infinite',
          zIndex: 1
        }}
      />
      
      {/* Nubes decorativas */}
      <Box
        sx={{
          position: 'absolute',
          top: '50px',
          left: '10%',
          width: '70px',
          height: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '30px',
          animation: 'cloud-drift 60s linear infinite',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-15px',
            left: '15px',
            width: '30px',
            height: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-10px',
            right: '15px',
            width: '25px',
            height: '25px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%'
          },
          zIndex: 0
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '80px',
          left: '60%',
          width: '90px',
          height: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '40px',
          animation: 'cloud-drift 80s linear infinite 20s',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-20px',
            left: '20px',
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-15px',
            right: '25px',
            width: '35px',
            height: '35px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%'
          },
          zIndex: 0
        }}
      />
      
      {/* Mariposas animadas */}
      {butterflies.map((butterfly) => (
        <Box
          key={butterfly.id}
          sx={{
            position: 'absolute',
            left: butterfly.left,
            top: butterfly.top,
            zIndex: 10,
            animation: `butterfly-flutter 5s infinite ${butterfly.delay}s`,
            pointerEvents: 'none'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '12px',
              height: '10px',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                width: '8px',
                height: '10px',
                backgroundColor: butterfly.color,
                border: '1px solid #0a0c0b',
                borderRadius: '50% 50% 0 50%'
              },
              '&::before': {
                left: '-4px',
                transformOrigin: 'right center',
                animation: 'wing-flap 0.3s infinite alternate'
              },
              '&::after': {
                right: '-4px',
                transform: 'scaleX(-1)',
                transformOrigin: 'left center',
                animation: 'wing-flap 0.3s infinite alternate reverse'
              }
            }}
          />
        </Box>
      ))}
      
      {/* Hojas flotantes */}
      {leaves.map((leaf) => (
        <Box
          key={leaf.id}
          sx={{
            position: 'absolute',
            left: leaf.left,
            top: leaf.top,
            width: `${leaf.size}px`,
            height: `${leaf.size * 0.8}px`,
            backgroundColor: '#4c9f47',
            borderRadius: '50% 50% 0 50%',
            transform: `rotate(${leaf.rotate}deg)`,
            animation: `leaf-float ${leaf.duration}s ease-in-out infinite ${leaf.delay}s`,
            opacity: 0.7,
            border: '1px solid #3a7a32',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />
      ))}
      
      {/* Flores decorativas en el pie de página */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '5%',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '12px',
            height: '12px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#ffa5c3',
              borderRadius: '50%',
              border: '1px solid #0a0c0b'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '40%',
              height: '40%',
              backgroundColor: '#ffd966',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            left: '15px',
            width: '8px',
            height: '12px',
            backgroundColor: '#4c9f47',
            borderRadius: '50% 50% 0 50%',
            transform: 'rotate(30deg)',
            border: '1px solid #3a7a32'
          }}
        />
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          right: '5%',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '12px',
            height: '12px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#7cc5e6',
              borderRadius: '50%',
              border: '1px solid #0a0c0b'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '40%',
              height: '40%',
              backgroundColor: '#ffd966',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            right: '15px',
            width: '8px',
            height: '12px',
            backgroundColor: '#4c9f47',
            borderRadius: '50% 50% 0 50%',
            transform: 'rotate(-30deg)',
            border: '1px solid #3a7a32'
          }}
        />
      </Box>
    </>
  );
};

export default GardenAmbiance;