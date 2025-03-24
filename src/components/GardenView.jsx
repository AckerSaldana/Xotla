// src/components/GardenView.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button,
  Container
} from '@mui/material';
import {
  WaterDrop as WaterIcon,
  Spa as SpaIcon,
  LocalFlorist as FlowerIcon,
  Add as AddIcon,
  EmojiNature as NatureIcon,
  Terrain as TerrainIcon
} from '@mui/icons-material';
import ImprovedFlowerCard from './ImprovedFlowerCard';

const GardenView = ({ 
  inventory, 
  coins, 
  onWater, 
  onFertilize, 
  onOpenCatalog,
  maxPlots = 9 
}) => {
  // Calcular estadísticas
  const totalPlants = inventory.length;
  const emptyPlots = Math.max(0, maxPlots - totalPlants);
  const maturePlants = inventory.filter(p => p.growthStage === 3).length;
  const needsWaterPlants = inventory.filter(p => p.water <= 30).length;
  const lowHealthPlants = inventory.filter(p => p.health <= 50).length;
  
  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
      {/* Panel de estadísticas */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        mb: 3,
        p: 1.5,
        backgroundColor: '#304a2e',
        border: '3px solid #0a0c0b',
        borderRadius: '8px'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: '1rem', color: '#f8f5e4' }}>
            {totalPlants}/{maxPlots}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.7rem', color: '#ccc' }}>
            Total de Plantas
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: '1rem', color: '#f8f5e4' }}>
            {maturePlants}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.7rem', color: '#ccc' }}>
            Plantas Maduras
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1rem', 
              color: needsWaterPlants > 0 ? '#ff6b6b' : '#f8f5e4'
            }}
          >
            {needsWaterPlants}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.7rem', color: '#ccc' }}>
            Necesitan Agua
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1rem', 
              color: lowHealthPlants > 0 ? '#ff6b6b' : '#f8f5e4'
            }}
          >
            {lowHealthPlants}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.7rem', color: '#ccc' }}>
            Salud Baja
          </Typography>
        </Box>
      </Box>
      
      {/* Título del jardín */}
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          textAlign: 'center', 
          mb: 3, 
          fontSize: '1.2rem',
          color: '#f8f5e4',
          textShadow: '2px 2px 0 #0a0c0b'
        }}
      >
        Tu Jardín
      </Typography>
      
      {/* Área principal del jardín */}
      <Box sx={{ 
        backgroundColor: '#304a2e',
        border: '3px solid #0a0c0b',
        borderRadius: '8px',
        p: 3,
        boxShadow: '6px 6px 0 #0a0c0b'
      }}>
        {/* Cuadrícula del jardín */}
        <Grid container spacing={2}>
          {/* Mostrar plantas existentes */}
          {inventory.map((plant) => (
            <Grid item xs={12} sm={6} md={4} key={plant.id}>
              <ImprovedFlowerCard 
                flower={plant}
                onWater={onWater}
                onFertilize={onFertilize}
                coins={coins}
              />
            </Grid>
          ))}
          
          {/* Mostrar parcelas vacías */}
          {Array.from({ length: emptyPlots }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={`empty-${index}`}>
              <Box
                sx={{
                  backgroundColor: '#9c8b75',
                  border: '3px solid #6e654c',
                  borderRadius: '8px',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '200px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
                onClick={onOpenCatalog}
              >
                <TerrainIcon sx={{ fontSize: 40, color: '#6e654c', mb: 2 }} />
                <Typography sx={{ color: '#f8f5e4', mb: 2, fontSize: '0.8rem' }}>
                  Parcela Vacía
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={onOpenCatalog}
                  sx={{
                    backgroundColor: '#4c9f47',
                    color: 'white',
                    border: '2px solid #0a0c0b',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: '#5db358'
                    }
                  }}
                >
                  Plantar
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default GardenView;