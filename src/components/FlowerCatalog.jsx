// src/components/FlowerCatalog.jsx - Rediseñado para una apariencia de jardín natural
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  IconButton, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  Chip,
  InputBase,
  styled,
  alpha,
  Fade,
  Zoom
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  LocalFlorist as FloristIcon, 
  Spa as SpaIcon,
  AccessTime as TimeIcon,
  ShoppingBasket as BasketIcon,
  EmojiNature as NatureIcon,
  FilterList as FilterIcon,
  ArrowDownward as SortDescIcon,
  ArrowUpward as SortAscIcon
} from '@mui/icons-material';
import EcoIcon from '@material-ui/icons/Eco';

// Contenedor principal del catálogo con fondo de jardín
const GardenDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    border: '4px solid #0f0f0f',
    backgroundColor: '#1e3222',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23396339' fill-opacity='0.2'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/svg%3E")`,
    maxWidth: '950px',
    width: '100%',
    margin: theme.spacing(2),
    overflow: 'hidden',
    boxShadow: '8px 8px 0 #0f0f0f',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '70px',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'16\' viewBox=\'0 0 32 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,0 L32,0 L32,4 C24,4 24,12 16,12 C8,12 8,4 0,4 L0,0 Z\' fill=\'%236e4e37\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'center bottom',
      pointerEvents: 'none',
      zIndex: 1
    }
  }
}));

// Encabezado estilizado con decoraciones naturales
const GardenHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#304a2e',
  backgroundImage: 'linear-gradient(to right, #304a2e, #3b5e41, #304a2e)',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  borderBottom: '3px solid #0f0f0f',
  position: 'relative',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    bottom: -15,
    width: 30,
    height: 30,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    zIndex: 10
  },
  '&::before': {
    left: 20,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E%3Ccircle cx='15' cy='15' r='8' fill='%23ffafd0' stroke='%230a0c0b' stroke-width='2'/%3E%3Ccircle cx='15' cy='15' r='3' fill='%23ffd966'/%3E%3C/svg%3E")`
  },
  '&::after': {
    right: 20,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E%3Ccircle cx='15' cy='15' r='8' fill='%237cc5e6' stroke='%230a0c0b' stroke-width='2'/%3E%3Ccircle cx='15' cy='15' r='3' fill='%23ffd966'/%3E%3C/svg%3E")`
  }
}));

// Tarjeta de flor más orgánica y natural
const FlowerCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#304a2e',
  border: '3px solid #0a0c0b',
  borderRadius: '16px',
  position: 'relative',
  transition: 'transform 0.3s, box-shadow 0.3s',
  overflow: 'visible',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '5px 5px 0 #0a0c0b',
  '&:hover': {
    transform: 'translateY(-8px) rotate(1deg)',
    boxShadow: '8px 12px 0 #0a0c0b',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -5,
    left: '15%',
    width: '70%',
    height: '10px',
    backgroundColor: '#5e3c28',
    borderRadius: '50% 50% 0 0',
    zIndex: -1
  }
}));

// Contenedor para la tierra de la planta
const SoilPot = styled(Box)(({ theme }) => ({
  backgroundColor: '#5e3c28',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'%3E%3Cpath fill='%238c6840' fill-opacity='0.2' d='M0 0h2v2H0V0zm2 2h2v2H2V2zm2 2h2v2H4V4z'%3E%3C/path%3E%3C/svg%3E")`,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0 0 12px 12px',
  position: 'relative',
  marginTop: 'auto',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '8px',
    backgroundColor: 'rgba(10, 12, 11, 0.3)',
    borderRadius: '50%',
    filter: 'blur(3px)'
  }
}));

// Imagen de flor con animación
const FlowerImage = styled('img')({
  width: '90px',
  height: '90px',
  objectFit: 'contain',
  imageRendering: 'pixelated',
  transition: 'transform 0.3s',
  transform: 'scale(1.1)',
  filter: 'drop-shadow(0 5px 3px rgba(0,0,0,0.2))',
  animation: 'flower-sway 3s infinite alternate ease-in-out',
  '@keyframes flower-sway': {
    '0%': { transform: 'scale(1.1) rotate(-3deg)' },
    '100%': { transform: 'scale(1.1) rotate(3deg)' }
  }
});

// Barra de búsqueda más orgánica
const GardenSearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: alpha('#304a2e', 0.7),
  borderRadius: '20px',
  border: '2px solid #6e4e37',
  padding: theme.spacing(0.5, 2),
  boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
  }
}));

// Etiqueta de categoría más floral
const FlowerTag = styled(Chip)(({ theme, category }) => {
  const colors = {
    rare: { bg: '#c896db', border: '#a76dbd' },
    common: { bg: '#78c272', border: '#4c9f47' },
    fast: { bg: '#8ecde6', border: '#619dc1' },
    reward: { bg: '#ffdb70', border: '#e3b34a' }
  };
  
  const style = colors[category] || colors.common;
  
  return {
    backgroundColor: style.bg,
    color: '#0f0f0f',
    border: `2px solid ${style.border}`,
    borderRadius: '12px',
    fontSize: '0.6rem',
    height: '24px',
    position: 'absolute',
    top: -10,
    right: -10,
    fontFamily: '"Press Start 2P", cursive',
    boxShadow: '2px 2px 0 #0a0c0b',
    zIndex: 5,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -5,
      left: '30%',
      width: '40%',
      height: '3px',
      backgroundColor: style.border,
      borderRadius: '0 0 3px 3px'
    }
  };
});

// Botón estilizado como una maceta
const PlantButton = styled(Button)(({ theme, disabled }) => ({
  backgroundColor: disabled ? '#7a9775' : '#4c9f47',
  color: '#f8f5e4',
  borderRadius: '0 0 12px 12px',
  border: '2px solid #0a0c0b',
  borderTop: 'none',
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.7rem',
  padding: theme.spacing(1, 2),
  boxShadow: disabled ? 'none' : '0 4px 0 #0a0c0b',
  transition: 'transform 0.1s, box-shadow 0.1s, background-color 0.3s',
  '&:hover': {
    backgroundColor: disabled ? '#7a9775' : '#5db358',
  },
  '&:active': {
    transform: disabled ? 'none' : 'translateY(4px)',
    boxShadow: 'none'
  },
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
  }
}));

// Decoración de mariposa animada
const Butterfly = styled(Box)(({ left, top, color, delay }) => ({
  position: 'absolute',
  left: left,
  top: top,
  zIndex: 2,
  animation: `butterfly-flutter 8s infinite ${delay}s`,
  '@keyframes butterfly-flutter': {
    '0%': { transform: 'translateY(0) translateX(0) rotate(-5deg)' },
    '25%': { transform: 'translateY(-15px) translateX(10px) rotate(10deg)' },
    '50%': { transform: 'translateY(-5px) translateX(20px) rotate(-5deg)' },
    '75%': { transform: 'translateY(-20px) translateX(10px) rotate(10deg)' },
    '100%': { transform: 'translateY(0) translateX(0) rotate(-5deg)' }
  }
}));

// Componente para las alas de mariposa
const ButterflyWings = styled(Box)(({ color }) => ({
  position: 'relative',
  width: '12px',
  height: '10px',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '8px',
    height: '10px',
    backgroundColor: color,
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
  },
  '@keyframes wing-flap': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(30deg)' }
  }
}));

// Hojas flotantes para decoración
const FloatingLeaf = styled(Box)(({ left, top, rotate, delay, size }) => ({
  position: 'absolute',
  left: left,
  top: top,
  width: `${size}px`,
  height: `${size * 0.8}px`,
  backgroundColor: '#4c9f47',
  borderRadius: '50% 50% 0 50%',
  transform: `rotate(${rotate}deg)`,
  animation: `leaf-float ${15 + Math.random() * 5}s ease-in-out infinite ${delay}s`,
  opacity: 0.7,
  border: '1px solid #3a7a32',
  zIndex: 0,
  pointerEvents: 'none',
  '@keyframes leaf-float': {
    '0%': { transform: `rotate(${rotate}deg) translateX(0) translateY(0)` },
    '25%': { transform: `rotate(${rotate + 10}deg) translateX(20px) translateY(-10px)` },
    '50%': { transform: `rotate(${rotate}deg) translateX(40px) translateY(-5px)` },
    '75%': { transform: `rotate(${rotate - 10}deg) translateX(20px) translateY(-15px)` },
    '100%': { transform: `rotate(${rotate}deg) translateX(0) translateY(0)` }
  }
}));

// Componente de indicador de estadísticas con iconos florales
const StatIndicator = ({ icon: Icon, value, maxValue, color, label }) => {
  const level = Math.ceil((value / maxValue) * 5);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 0.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <Icon sx={{ color, fontSize: '0.9rem', mr: 0.5 }} />
        <Typography variant="caption" sx={{ color, fontFamily: '"Press Start 2P", cursive', fontSize: '0.6rem' }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '3px' }}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: '6px',
              height: '10px',
              borderRadius: '3px',
              backgroundColor: i < level ? color : alpha(color, 0.2),
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// Función para determinar la categoría de una flor
const getFlowerCategory = (flower) => {
  if (flower.price >= 140) return 'rare';
  if (flower.growTime <= 8) return 'fast';
  if (flower.price <= 60) return 'common';
  return 'common';
};

// Componente principal FlowerCatalog
const FlowerCatalog = ({ open, onClose, flowers, coins, onBuy }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');
  const [butterflies, setButterflies] = useState([]);
  const [leaves, setLeaves] = useState([]);
  
  // Generar elementos decorativos al montar
  useEffect(() => {
    if (open) {
      // Generar mariposas
      const colors = ['#ffa5c3', '#7cc5e6', '#ffd966', '#c387d1'];
      const newButterflies = [];
      for (let i = 0; i < 5; i++) {
        newButterflies.push({
          id: `butterfly-${i}`,
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 40}%`,
          delay: Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setButterflies(newButterflies);
      
      // Generar hojas
      const newLeaves = [];
      for (let i = 0; i < 8; i++) {
        newLeaves.push({
          id: `leaf-${i}`,
          left: `${Math.random() * 90}%`,
          top: `${15 + Math.random() * 70}%`,
          rotate: Math.random() * 360,
          delay: Math.random() * 4,
          size: Math.random() * 5 + 8
        });
      }
      setLeaves(newLeaves);
    }
  }, [open]);
  
  // Filtrar y ordenar flores
  const getFilteredFlowers = () => {
    let filtered = [...flowers];
    
    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(flower => 
        flower.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por categoría seleccionada
    if (activeFilter !== 'all') {
      filtered = filtered.filter(flower => getFlowerCategory(flower) === activeFilter);
    }
    
    // Ordenar los resultados
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch(sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'growTime':
          comparison = a.growTime - b.growTime;
          break;
        case 'sellingPrice':
          comparison = a.sellingPrice - b.sellingPrice;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        default:
          comparison = a.price - b.price;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return filtered;
  };
  
  // Manejador de cambio de filtro
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  // Manejador de cambio de ordenamiento
  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortDirection('asc');
    }
  };
  
  // Obtener flores filtradas
  const filteredFlowers = getFilteredFlowers();

  return (
    <GardenDialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={400}
    >
      {/* Elementos decorativos */}
      {butterflies.map((butterfly) => (
        <Butterfly 
          key={butterfly.id} 
          left={butterfly.left} 
          top={butterfly.top} 
          delay={butterfly.delay} 
          color={butterfly.color}
        >
          <ButterflyWings color={butterfly.color} />
        </Butterfly>
      ))}
      
      {leaves.map((leaf) => (
        <FloatingLeaf
          key={leaf.id}
          left={leaf.left}
          top={leaf.top}
          rotate={leaf.rotate}
          delay={leaf.delay}
          size={leaf.size}
        />
      ))}
      
      {/* Encabezado */}
      <GardenHeader>
        <Box display="flex" alignItems="center">
          <FloristIcon sx={{ fontSize: 28, mr: 2 }} />
          <Typography variant="h3" component="h2" sx={{ 
            fontFamily: '"Press Start 2P", cursive', 
            fontSize: { xs: '0.9rem', md: '1.2rem' },
            textShadow: '2px 2px 0 #0a0c0b'
          }}>
            Catálogo de Flores
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{ 
            borderRadius: '50%', 
            border: '2px solid #0a0c0b',
            width: 40,
            height: 40
          }}
        >
          <CloseIcon />
        </IconButton>
      </GardenHeader>
      
      <DialogContent sx={{ p: 3, position: 'relative', overflowX: 'hidden' }}>
        {/* Monedas disponibles */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            mb: 3
          }}
        >
          <Chip
            icon={<SpaIcon sx={{ color: '#ffd966' }} />}
            label={`${coins} monedas disponibles`}
            sx={{ 
              backgroundColor: '#304a2e',
              color: '#f8f5e4',
              borderRadius: '16px', 
              border: '2px solid #ffd966',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.7rem',
              boxShadow: '2px 2px 0 #0a0c0b'
            }}
          />
        </Box>
        
        {/* Barra de búsqueda */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <GardenSearchBar>
                <SearchIcon sx={{ color: '#f8f5e4', mr: 1 }} />
                <InputBase
                  placeholder="Buscar flores por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  sx={{ 
                    color: '#f8f5e4',
                    fontSize: '0.8rem',
                    fontFamily: '"Press Start 2P", cursive',
                    '& input': {
                      padding: '8px 0'
                    }
                  }}
                />
              </GardenSearchBar>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                <Grid item>
                  <Chip
                    icon={<SortAscIcon />}
                    label={sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    sx={{ 
                      borderRadius: '20px',
                      backgroundColor: '#304a2e',
                      color: '#f8f5e4',
                      border: '2px solid #0a0c0b',
                      '&:hover': {
                        backgroundColor: '#3b5e41'
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <Chip
                    icon={<FilterIcon />}
                    label={sortBy === 'price' ? 'Precio' : 
                           sortBy === 'growTime' ? 'Tiempo' : 
                           sortBy === 'sellingPrice' ? 'Ganancia' : 'Nombre'}
                    onClick={() => {
                      const options = ['price', 'growTime', 'sellingPrice', 'name'];
                      const currentIndex = options.indexOf(sortBy);
                      const nextIndex = (currentIndex + 1) % options.length;
                      setSortBy(options[nextIndex]);
                    }}
                    sx={{ 
                      borderRadius: '20px',
                      backgroundColor: '#304a2e',
                      color: '#f8f5e4',
                      border: '2px solid #0a0c0b',
                      '&:hover': {
                        backgroundColor: '#3b5e41'
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        
        {/* Filtros de categoría */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Chip
            icon={<NatureIcon />}
            label="Todas"
            onClick={() => handleFilterChange('all')}
            sx={{ 
              backgroundColor: activeFilter === 'all' ? '#4c9f47' : 'transparent',
              color: '#f8f5e4',
              border: '2px solid #4c9f47',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: alpha('#4c9f47', 0.2)
              }
            }}
          />
          <Chip
            icon={<SpaIcon />}
            label="Comunes"
            onClick={() => handleFilterChange('common')}
            sx={{ 
              backgroundColor: activeFilter === 'common' ? '#78c272' : 'transparent',
              color: '#f8f5e4',
              border: '2px solid #78c272',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: alpha('#78c272', 0.2)
              }
            }}
          />
          <Chip
            icon={<TimeIcon />}
            label="Rápidas"
            onClick={() => handleFilterChange('fast')}
            sx={{ 
              backgroundColor: activeFilter === 'fast' ? '#8ecde6' : 'transparent',
              color: '#f8f5e4',
              border: '2px solid #8ecde6',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: alpha('#8ecde6', 0.2)
              }
            }}
          />
          <Chip
            icon={<FloristIcon />}
            label="Raras"
            onClick={() => handleFilterChange('rare')}
            sx={{ 
              backgroundColor: activeFilter === 'rare' ? '#c896db' : 'transparent',
              color: '#f8f5e4',
              border: '2px solid #c896db',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: alpha('#c896db', 0.2)
              }
            }}
          />
        </Box>
        
        {/* Cuadrícula de flores */}
        {filteredFlowers.length > 0 ? (
          <Grid container spacing={3} sx={{ position: 'relative', zIndex: 5 }}>
            {filteredFlowers.map((flower, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={flower.id}>
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <FlowerCard>
                    {/* Etiqueta de categoría */}
                    <FlowerTag 
                      label={getFlowerCategory(flower) === 'rare' ? 'Rara' : 
                             getFlowerCategory(flower) === 'fast' ? 'Rápida' : 'Común'}
                      category={getFlowerCategory(flower)}
                    />
                    
                    {/* Contenido de la tarjeta */}
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      {/* Nombre de la flor */}
                      <Typography 
                        variant="h4" 
                        component="h3" 
                        align="center"
                        sx={{ 
                          fontSize: '0.9rem',
                          fontFamily: '"Press Start 2P", cursive',
                          mb: 2,
                          color: flower.color || '#ffafd0',
                          textShadow: '1px 1px 0 #0a0c0b'
                        }}
                      >
                        {flower.name}
                      </Typography>
                      
                      {/* Imagen de la flor */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 2,
                        flex: 1,
                        position: 'relative'
                      }}>
                        <FlowerImage 
                          src={flower.image} 
                          alt={flower.name}
                        />
                        
                        {/* Pequeñas partículas brillantes alrededor de flores raras */}
                        {getFlowerCategory(flower) === 'rare' && (
                          <>
                            {[...Array(4)].map((_, i) => (
                              <Box
                                key={`sparkle-${i}`}
                                sx={{
                                  position: 'absolute',
                                  width: '4px',
                                  height: '4px',
                                  backgroundColor: '#ffd966',
                                  borderRadius: '50%',
                                  top: `${20 + Math.random() * 60}%`,
                                  left: `${20 + Math.random() * 60}%`,
                                  animation: `sparkle ${1 + Math.random()}s infinite ${Math.random() * 1}s`,
                                  '@keyframes sparkle': {
                                    '0%, 100%': { transform: 'scale(0)', opacity: 0 },
                                    '50%': { transform: 'scale(1)', opacity: 1 }
                                  }
                                }}
                              />
                            ))}
                          </>
                        )}
                      </Box>
                      
                      {/* Estadísticas de la flor */}
                      <Box sx={{ 
                        backgroundColor: alpha('#304a2e', 0.5), 
                        borderRadius: '8px', 
                        p: 1.5, 
                        mb: 2,
                        border: '1px dashed #4c9f47'
                      }}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <StatIndicator
                              icon={TimeIcon}
                              value={flower.growTime}
                              maxValue={24}
                              color="#8ecde6"
                              label={`${flower.growTime}h`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <StatIndicator
                              icon={BasketIcon}
                              value={flower.sellingPrice}
                              maxValue={350}
                              color="#ffd966"
                              label={`${flower.sellingPrice}`}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      
                      {/* Precio y botón */}
                      <Box sx={{ 
                        mt: 'auto', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center' 
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1.5,
                          position: 'relative',
                          backgroundColor: '#f9f5e3',
                          color: '#0f0f0f',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          border: '2px solid #0a0c0b',
                        }}>
                          <SpaIcon sx={{ color: '#ffd966', mr: 1 }} />
                          <Typography sx={{ 
                            fontFamily: '"Press Start 2P", cursive', 
                            fontSize: '0.9rem'
                          }}>
                            {flower.price}
                          </Typography>
                        </Box>
                        
                        <SoilPot>
                          <PlantButton
                            fullWidth
                            onClick={() => onBuy(flower)}
                            disabled={coins < flower.price}
                            disableRipple
                            sx={{ borderRadius: '8px', p: '8px 16px' }}
                          >
                            {coins < flower.price ? 'No hay monedas' : 'Plantar'}
                            <EcoIcon sx={{ ml: 1, fontSize: '0.9rem' }} />
                          </PlantButton>
                        </SoilPot>
                      </Box>
                    </Box>
                    </FlowerCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        ) : (
          // Mensaje si no hay flores que mostrar con estilo de jardín vacío
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              py: 5,
              position: 'relative'
            }}
          >
            <Box sx={{ 
              width: '120px', 
              height: '80px', 
              backgroundColor: '#5e3c28',
              borderRadius: '0 0 60px 60px',
              border: '3px solid #0a0c0b',
              position: 'relative',
              mb: 3,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'%3E%3Cpath fill='%238c6840' fill-opacity='0.2' d='M0 0h2v2H0V0zm2 2h2v2H2V2zm2 2h2v2H4V4z'%3E%3C/path%3E%3C/svg%3E")`,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '12px',
                backgroundColor: 'rgba(10, 12, 11, 0.3)',
                borderRadius: '50%',
                filter: 'blur(4px)'
              }
            }}>
              <Box sx={{ 
                position: 'absolute',
                top: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px',
                opacity: 0.3
              }}>
                <NatureIcon sx={{ fontSize: 40, color: '#78c272' }} />
              </Box>
            </Box>
            
            <Typography variant="h3" sx={{ 
              mb: 1,
              color: '#f8f5e4',
              textShadow: '2px 2px 0 #0a0c0b'
            }}>
              No se encontraron flores
            </Typography>
            
            <Typography variant="body1" sx={{ color: '#f8f5e4' }}>
              Prueba con diferentes filtros o términos de búsqueda
            </Typography>
            
            {/* Mariposa solitaria volando */}
            <Box
              sx={{
                position: 'absolute',
                top: '30%',
                right: '20%',
                animation: 'lonely-butterfly 15s infinite linear',
                '@keyframes lonely-butterfly': {
                  '0%': { transform: 'translateX(0) translateY(0) rotate(10deg)' },
                  '25%': { transform: 'translateX(-100px) translateY(-30px) rotate(-10deg)' },
                  '50%': { transform: 'translateX(-200px) translateY(0) rotate(10deg)' },
                  '75%': { transform: 'translateX(-100px) translateY(30px) rotate(-10deg)' },
                  '100%': { transform: 'translateX(0) translateY(0) rotate(10deg)' }
                }
              }}
            >
              <ButterflyWings color="#ffa5c3" />
            </Box>
          </Box>
        )}
      </DialogContent>
      
      {/* Sol decorativo */}
      <Box
        sx={{
          position: 'absolute',
          top: '30px',
          right: '60px',
          width: '40px',
          height: '40px',
          backgroundColor: '#ffd966',
          borderRadius: '50%',
          border: '3px solid #0a0c0b',
          boxShadow: '0 0 15px rgba(255, 217, 102, 0.7)',
          animation: 'sun-pulse 4s infinite',
          '@keyframes sun-pulse': {
            '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 15px rgba(255, 217, 102, 0.7)' },
            '50%': { transform: 'scale(1.1)', boxShadow: '0 0 25px rgba(255, 217, 102, 0.9)' }
          },
          zIndex: 0
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
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '30px',
          animation: 'cloud-drift 80s linear infinite',
          '@keyframes cloud-drift': {
            '0%': { transform: 'translateX(-100px)' },
            '100%': { transform: 'translateX(1000px)' }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-15px',
            left: '15px',
            width: '30px',
            height: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-10px',
            right: '15px',
            width: '25px',
            height: '25px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%'
          },
          zIndex: 0
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '80px',
          left: '40%',
          width: '90px',
          height: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '40px',
          animation: 'cloud-drift 100s linear infinite 30s',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-20px',
            left: '20px',
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-15px',
            right: '25px',
            width: '35px',
            height: '35px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%'
          },
          zIndex: 0
        }}
      />
    </GardenDialog>
  );
};

export default FlowerCatalog;