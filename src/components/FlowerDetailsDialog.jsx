// src/components/FlowerDetailsDialog.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Grid,
  Divider,
  styled
} from '@mui/material';
import {
  WaterDrop as WaterIcon,
  ShoppingBasket as BasketIcon,
  Spa as SpaIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { 
  getGrowthStageDescription, 
  getGrowthStageName,
  calculateSellingPrice,
  calculateTimeToNextStage,
  WATER_COST,
  FERTILIZER_COST
} from '../utils/plantUtils';
import YardIcon from '@mui/icons-material/Yard';

// Medidor de recursos de la planta
const ResourceMeter = styled(Box)(({ theme, value, color }) => ({
  width: '100%',
  height: '8px',
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

// Componente de progreso de crecimiento estilizado
const GrowthProgress = styled(Box)(({ theme, value }) => ({
  height: '10px',
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

const FlowerImage = styled('img')({
  width: '100px',
  height: '100px',
  margin: '0 auto',
  display: 'block',
  imageRendering: 'pixelated',
  objectFit: 'contain'
});

const FlowerDetailsDialog = ({
  open,
  onClose,
  flower,
  onWater,
  onFertilize,
  onSell,
  coins
}) => {
  if (!flower) return null;
  
  // Renderizar imagen según etapa de crecimiento
  const renderFlowerImage = () => {
    const scale = flower.growthStage === 0 ? 0.4 :
                 flower.growthStage === 1 ? 0.6 :
                 flower.growthStage === 2 ? 0.8 : 1;
    
    const opacity = flower.health < 30 ? 0.5 : 1;
    
    return (
      <FlowerImage 
        src={flower.image} 
        alt={flower.name}
        style={{ 
          transform: `scale(${scale})`,
          opacity,
          transition: 'transform 0.3s, opacity 0.3s'
        }}
      />
    );
  };
  
  // Calcular el precio de venta
  const sellingPrice = calculateSellingPrice(flower);
  
  // Calcular tiempo restante para la siguiente etapa
  const hoursRemaining = calculateTimeToNextStage(flower);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 0,
          border: '3px solid #0f0f0f',
          maxWidth: 320
        }
      }}
    >
      <DialogTitle sx={{ 
        fontFamily: '"Press Start 2P", cursive', 
        fontSize: '1rem',
        textAlign: 'center',
        pb: 1
      }}>
        {flower.name}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {renderFlowerImage()}
          
          <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontSize: '0.8rem', mb: 1 }}>
              Estado: <span style={{ color: flower.growthStage === 3 ? '#e36956' : '#78c272' }}>
                {getGrowthStageName(flower.growthStage)}
              </span>
            </Typography>
            
            <Typography variant="body2" sx={{ fontSize: '0.7rem', mb: 2 }}>
              {getGrowthStageDescription(flower.growthStage, flower.name)}
            </Typography>
            
            {/* Tiempo restante para la siguiente etapa */}
            {flower.growthStage < 3 && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2, 
                p: 1, 
                border: '1px dashed #8ecde6',
                backgroundColor: 'rgba(142, 205, 230, 0.1)'
              }}>
                <TimeIcon sx={{ mr: 1, color: '#8ecde6' }} />
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                  {hoursRemaining > 0 
                    ? `Aprox. ${hoursRemaining} horas para siguiente etapa`
                    : 'Pasando a la siguiente etapa pronto'
                  }
                </Typography>
              </Box>
            )}
            
            <Divider sx={{ mb: 2 }} />
            
            {/* Detalles de crecimiento */}
            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
              Crecimiento: {Math.round(flower.growthProgress)}%
            </Typography>
            <GrowthProgress value={flower.growthProgress} />
            
            <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                  Agua: {Math.round(flower.water)}%
                </Typography>
                <ResourceMeter value={flower.water} color="#8ecde6" />
                {flower.water <= 30 && (
                  <Typography variant="caption" sx={{ color: '#ff6b6b', fontSize: '0.6rem', display: 'block', mt: 0.5 }}>
                    ¡Necesita agua!
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                  Salud: {Math.round(flower.health)}%
                </Typography>
                <ResourceMeter value={flower.health} color="#78c272" />
                {flower.health <= 50 && (
                  <Typography variant="caption" sx={{ color: '#ff6b6b', fontSize: '0.6rem', display: 'block', mt: 0.5 }}>
                    ¡Necesita nutrientes!
                  </Typography>
                )}
              </Grid>
            </Grid>
            
            <Divider sx={{ mb: 2 }} />
            
            {/* Valor de venta */}
            <Typography variant="subtitle1" sx={{ fontSize: '0.8rem', mb: 1 }}>
              Valor estimado de venta:
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#f9f5e3',
              color: '#0f0f0f',
              p: 1.5,
              border: '2px solid #0f0f0f',
              mb: 2
            }}>
              <SpaIcon sx={{ color: '#ffdb70', mr: 1 }} />
              <Typography variant="h4" sx={{ fontFamily: '"Press Start 2P", cursive', fontSize: '1.2rem' }}>
                {sellingPrice}
              </Typography>
            </Box>
            
            {/* Información sobre precio optimo */}
            {flower.growthStage < 3 && (
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', fontSize: '0.6rem', color: '#ffdb70' }}>
                Precio máximo al alcanzar la floración: {flower.sellingPrice} monedas
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button 
          variant="contained" 
          color="info"
          onClick={() => {
            onWater();
            onClose();
          }}
          disabled={coins < WATER_COST}
          sx={{ flex: 1, mr: 1 }}
        >
          <WaterIcon sx={{ mr: 1 }} /> Regar
        </Button>
        <Button 
          variant="contained"
          color="success"
          onClick={() => {
            onFertilize();
            onClose();
          }}
          disabled={coins < FERTILIZER_COST}
          sx={{ flex: 1, mx: 1 }}
        >
          <YardIcon sx={{ mr: 1 }} /> Fertilizar
        </Button>
        <Button 
          variant="contained"
          color="secondary"
          onClick={() => {
            onSell();
            onClose();
          }}
          sx={{ flex: 1, ml: 1 }}
        >
          <BasketIcon sx={{ mr: 1 }} /> Vender
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FlowerDetailsDialog;