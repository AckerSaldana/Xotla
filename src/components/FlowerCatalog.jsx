// src/components/FlowerCatalog.jsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Tabs, 
  Tab, 
  Chip,
  styled,
  Badge,
  Divider,
  InputBase,
  Paper
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

// Componentes estilizados con temática de jardín pixel art
const CatalogDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 0,
    border: '4px solid #0f0f0f',
    backgroundColor: theme.palette.background.default,
    maxWidth: '900px',
    width: '100%',
    margin: theme.spacing(2),
    overflow: 'hidden',
    boxShadow: '8px 8px 0 #0f0f0f',
  }
}));

const CatalogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '3px solid #0f0f0f',
  padding: theme.spacing(1.5, 2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: 20,
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: `10px solid ${theme.palette.primary.main}`
  }
}));

const TabStyled = styled(Tab)(({ theme }) => ({
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.6rem',
  borderBottom: '2px solid transparent',
  borderRadius: 0,
  margin: theme.spacing(0, 1),
  '&.Mui-selected': {
    borderBottomColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main
  }
}));

const FlowerCardContainer = styled(Card)(({ theme }) => ({
  border: '3px solid #0f0f0f',
  borderRadius: 0,
  overflow: 'visible',
  position: 'relative',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  boxShadow: '4px 4px 0 #0f0f0f',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  height: '100%'
}));

const FlowerImage = styled('img')({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  display: 'block',
  imageRendering: 'pixelated',
  objectFit: 'contain'
});

const FlowerBadge = styled(Chip)(({ theme, category }) => {
  // Diferentes colores según categoría
  const colors = {
    rare: { bg: '#c896db', text: '#0f0f0f' },
    common: { bg: '#78c272', text: '#0f0f0f' },
    fast: { bg: '#8ecde6', text: '#0f0f0f' },
    reward: { bg: '#ffdb70', text: '#0f0f0f' }
  };
  
  const style = colors[category] || colors.common;
  
  return {
    backgroundColor: style.bg,
    color: style.text,
    border: '2px solid #0f0f0f',
    borderRadius: 0,
    fontSize: '0.6rem',
    height: '20px',
    position: 'absolute',
    top: -10,
    right: -10,
    fontFamily: '"Press Start 2P", cursive',
    boxShadow: '2px 2px 0 #0f0f0f',
    zIndex: 1
  };
});

const PriceTag = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f9f5e3',
  color: '#0f0f0f',
  border: '2px solid #0f0f0f',
  padding: theme.spacing(0.5, 1),
  marginTop: theme.spacing(1),
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.7rem',
  '& .MuiSvgIcon-root': {
    color: '#ffdb70',
    marginRight: theme.spacing(0.5)
  }
}));

const SearchBar = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: '2px solid #0f0f0f',
  borderRadius: 0,
  padding: theme.spacing(0.5, 1),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper
}));

const StatIndicator = styled(Box)(({ theme, value, max, icon: Icon, color }) => {
  // Calcular el nivel de valor (0-5)
  const level = Math.max(0, Math.min(5, Math.ceil((value / max) * 5)));
  
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    '& .stat-icon': {
      color: color,
      fontSize: '0.9rem'
    },
    '& .stat-dots': {
      display: 'flex',
      gap: '2px'
    },
    '& .dot': {
      width: '4px',
      height: '8px',
      backgroundColor: '#1e3222',
      '&.active': {
        backgroundColor: color
      }
    }
  };
});

// Función para determinar la categoría de una flor
const getFlowerCategory = (flower) => {
  if (flower.price >= 140) return 'rare';
  if (flower.growTime <= 8) return 'fast';
  if (flower.price <= 60) return 'common';
  return 'common';
};

// Componente principal de Catálogo de Flores
const FlowerCatalog = ({ 
  open, 
  onClose, 
  flowers, 
  coins, 
  onBuy 
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Categorías para las pestañas
  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'common', label: 'Comunes' },
    { id: 'fast', label: 'Rápidas' },
    { id: 'rare', label: 'Raras' }
  ];
  
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
    if (activeTab > 0) {
      const categoryId = categories[activeTab].id;
      filtered = filtered.filter(flower => getFlowerCategory(flower) === categoryId);
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
  
  // Cambiar pestaña activa
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Cambiar criterio de ordenamiento
  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      // Si ya estamos ordenando por este criterio, cambiamos la dirección
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es un nuevo criterio, establecemos el criterio y dirección predeterminada
      setSortBy(criteria);
      setSortDirection('asc');
    }
  };
  
  // Renderizar indicador de estadísticas
  const renderStatIndicator = ({ value, maxValue, icon: Icon, color }) => (
    <StatIndicator value={value} max={maxValue} color={color}>
      <Icon className="stat-icon" />
      <Box className="stat-dots">
        {[...Array(5)].map((_, i) => (
          <Box 
            key={i} 
            className={`dot ${i < Math.ceil((value / maxValue) * 5) ? 'active' : ''}`}
            sx={{ 
              backgroundColor: i < Math.ceil((value / maxValue) * 5) ? color : '#1e3222'
            }}
          />
        ))}
      </Box>
    </StatIndicator>
  );
  
  // Obtener flores filtradas
  const filteredFlowers = getFilteredFlowers();

  return (
    <CatalogDialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <CatalogTitle>
        <Box display="flex" alignItems="center">
          <FloristIcon sx={{ mr: 1.5 }} />
          <Typography variant="h3" component="span">
            Catálogo de Flores
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{ borderRadius: 0, border: '2px solid #0f0f0f' }}
        >
          <CloseIcon />
        </IconButton>
      </CatalogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        {/* Monedas disponibles */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            mb: 2
          }}
        >
          <Chip
            icon={<SpaIcon />}
            label={`${coins} monedas disponibles`}
            color="warning"
            variant="filled"
            sx={{ 
              borderRadius: 0, 
              border: '2px solid #0f0f0f',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.7rem'
            }}
          />
        </Box>
        
        {/* Barra de búsqueda y filtros */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SearchBar>
                <SearchIcon sx={{ p: 0.5 }} />
                <InputBase
                  placeholder="Buscar flores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  sx={{ ml: 1, fontSize: '0.8rem' }}
                />
              </SearchBar>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'flex-start', md: 'flex-end' } 
                }}
              >
                <Chip
                  icon={<FilterIcon />}
                  label="Ordenar por:"
                  sx={{ 
                    backgroundColor: '#1e3222', 
                    color: '#fff',
                    borderRadius: 0,
                    border: '2px solid #0f0f0f'
                  }}
                />
                <Chip
                  label="Precio"
                  onClick={() => handleSortChange('price')}
                  deleteIcon={sortBy === 'price' ? 
                    (sortDirection === 'asc' ? <SortAscIcon /> : <SortDescIcon />) : 
                    undefined
                  }
                  onDelete={sortBy === 'price' ? () => {} : undefined}
                  variant={sortBy === 'price' ? 'filled' : 'outlined'}
                  color="primary"
                  sx={{ borderRadius: 0, border: '2px solid #0f0f0f' }}
                />
                <Chip
                  label="Tiempo"
                  onClick={() => handleSortChange('growTime')}
                  deleteIcon={sortBy === 'growTime' ? 
                    (sortDirection === 'asc' ? <SortAscIcon /> : <SortDescIcon />) : 
                    undefined
                  }
                  onDelete={sortBy === 'growTime' ? () => {} : undefined}
                  variant={sortBy === 'growTime' ? 'filled' : 'outlined'}
                  color="primary"
                  sx={{ borderRadius: 0, border: '2px solid #0f0f0f' }}
                />
                <Chip
                  label="Ganancia"
                  onClick={() => handleSortChange('sellingPrice')}
                  deleteIcon={sortBy === 'sellingPrice' ? 
                    (sortDirection === 'asc' ? <SortAscIcon /> : <SortDescIcon />) : 
                    undefined
                  }
                  onDelete={sortBy === 'sellingPrice' ? () => {} : undefined}
                  variant={sortBy === 'sellingPrice' ? 'filled' : 'outlined'}
                  color="primary"
                  sx={{ borderRadius: 0, border: '2px solid #0f0f0f' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        {/* Pestañas de categorías */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ '& .MuiTabs-indicator': { height: 3 } }}
          >
            {categories.map((category, index) => (
              <TabStyled 
                key={category.id} 
                label={category.label} 
                icon={index === 0 ? <NatureIcon /> : null} 
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>
        
        {/* Cuadrícula de flores */}
        <Grid container spacing={3}>
          {filteredFlowers.length > 0 ? (
            filteredFlowers.map((flower) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={flower.id}>
                <FlowerCardContainer>
                  {/* Insignia de categoría */}
                  <FlowerBadge 
                    label={getFlowerCategory(flower) === 'rare' ? 'Rara' : 
                           getFlowerCategory(flower) === 'fast' ? 'Rápida' : 'Común'}
                    category={getFlowerCategory(flower)}
                  />
                  
                  <CardContent sx={{ p: 2 }}>
                    {/* Imagen de la flor */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 2 
                    }}>
                      <FlowerImage 
                        src={flower.image} 
                        alt={flower.name}
                      />
                    </Box>
                    
                    {/* Nombre y detalles */}
                    <Typography 
                      variant="h4" 
                      component="h3" 
                      align="center" 
                      gutterBottom
                      sx={{ 
                        fontSize: '0.9rem',
                        fontFamily: '"Press Start 2P", cursive',
                        mb: 2
                      }}
                    >
                      {flower.name}
                    </Typography>
                    
                    {/* Estadísticas de la flor */}
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          {renderStatIndicator({
                            value: flower.growTime,
                            maxValue: 24,
                            icon: TimeIcon,
                            color: '#8ecde6'
                          })}
                          <Typography 
                            variant="caption" 
                            display="block"
                            sx={{ fontSize: '0.6rem', mt: 0.5 }}
                          >
                            {flower.growTime}h
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {renderStatIndicator({
                            value: flower.sellingPrice,
                            maxValue: 350,
                            icon: BasketIcon,
                            color: '#ffdb70'
                          })}
                          <Typography 
                            variant="caption" 
                            display="block"
                            sx={{ fontSize: '0.6rem', mt: 0.5 }}
                          >
                            {flower.sellingPrice}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    {/* Precio de compra y botón */}
                    <PriceTag>
                      <SpaIcon />
                      {flower.price}
                    </PriceTag>
                    
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => onBuy(flower)}
                      disabled={coins < flower.price}
                      sx={{ 
                        mt: 2, 
                        borderRadius: 0,
                        border: '2px solid #0f0f0f',
                        fontFamily: '"Press Start 2P", cursive',
                        fontSize: '0.7rem',
                        boxShadow: '3px 3px 0 #0f0f0f',
                        '&:active': {
                          boxShadow: 'none',
                          transform: 'translate(3px, 3px)'
                        }
                      }}
                    >
                      {coins < flower.price ? 'Monedas insuficientes' : 'Comprar'}
                    </Button>
                  </CardContent>
                </FlowerCardContainer>
              </Grid>
            ))
          ) : (
            // Mensaje si no hay flores que mostrar
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  py: 4
                }}
              >
                <NatureIcon sx={{ fontSize: 48, color: '#78c272', mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 1 }}>
                  No se encontraron flores
                </Typography>
                <Typography variant="body1">
                  Prueba con otros filtros o términos de búsqueda.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </CatalogDialog>
  );
};

export default FlowerCatalog;