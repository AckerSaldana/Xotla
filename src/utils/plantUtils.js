// src/utils/plantUtils.js

// Constantes para el sistema de cuidado
export const WATER_DECREASE_RATE = 5; // % por hora
export const HEALTH_DECREASE_RATE = 3; // % por hora sin agua
export const WATER_COST = 5; // Costo de regar una planta
export const FERTILIZER_COST = 15; // Costo de fertilizar una planta
export const HEALTH_INCREASE_FERTILIZER = 20; // Aumento de salud al fertilizar
export const XP_PER_CARE_ACTION = 5; // XP ganada por acción de cuidado
export const XP_PER_GROWTH_LEVEL = 10; // XP ganada cuando la planta sube de nivel
export const XP_FOR_NEXT_LEVEL = 100; // XP necesaria para subir de nivel

// Función para calcular el estado actual de las plantas
export const calculatePlantStatus = (plant, lastCaredTimes) => {
  const now = new Date();
  
  // Convertir plantedAt de string a Date si es necesario
  const plantedAt = typeof plant.plantedAt === 'string' 
    ? new Date(plant.plantedAt) 
    : plant.plantedAt;
  
  // Calcular tiempo transcurrido desde la última vez que se regó
  const lastWatered = lastCaredTimes[`water-${plant.id}`] 
    ? new Date(lastCaredTimes[`water-${plant.id}`]) 
    : plantedAt;
  
  // Calcular horas transcurridas
  const hoursSinceLastWatered = Math.max(0, (now - lastWatered) / (1000 * 60 * 60));
  
  // Calcular agua restante
  let water = Math.max(0, 100 - (hoursSinceLastWatered * WATER_DECREASE_RATE));
  
  // Calcular salud de la planta
  let health = plant.health || 100;
  if (water <= 0) {
    // La planta pierde salud si no tiene agua
    const hoursWithoutWater = hoursSinceLastWatered - (100 / WATER_DECREASE_RATE);
    health = Math.max(0, health - (hoursWithoutWater * HEALTH_DECREASE_RATE));
  }
  
  // Calcular progreso de crecimiento
  let growthProgress = plant.growthProgress || 0;
  let growthStage = plant.growthStage || 0;
  
  // Solo crece si tiene agua y salud
  if (water > 0 && health > 0) {
    // Determinar el tiempo que la planta ha estado creciendo saludablemente
    const healthyGrowthHours = Math.min(hoursSinceLastWatered, 100 / WATER_DECREASE_RATE);
    
    // Calcular progreso basado en el tiempo de crecimiento saludable
    // Multiplicamos por el factor de salud (health/100)
    const growthRate = 100 / (plant.growTime * (health / 100));
    const newProgress = growthProgress + (healthyGrowthHours * growthRate);
    
    growthProgress = Math.min(100, newProgress);
    
    // Determinar etapa de crecimiento (0-3)
    growthStage = growthProgress >= 100 ? 3 : 
                 growthProgress >= 66 ? 2 : 
                 growthProgress >= 33 ? 1 : 0;
  }
  
  return {
    ...plant,
    water,
    health,
    growthProgress,
    growthStage
  };
};

// Función para calcular el precio de venta de una planta según su estado
export const calculateSellingPrice = (flower) => {
  const basePrice = flower.sellingPrice;
  const growthMultiplier = flower.growthStage === 3 ? 1 : 
                         flower.growthStage === 2 ? 0.75 : 
                         flower.growthStage === 1 ? 0.5 : 0.25;
  const healthMultiplier = flower.health / 100;
  
  return Math.round(basePrice * growthMultiplier * healthMultiplier);
};

// Función para obtener la descripción del estado de crecimiento
export const getGrowthStageDescription = (stage, flowerName) => {
  switch(stage) {
    case 0:
      return `Semilla de ${flowerName} recién plantada. Necesita cuidados regulares.`;
    case 1:
      return `Pequeño brote de ${flowerName}. Está creciendo bien.`;
    case 2:
      return `${flowerName} en desarrollo. Ya se pueden ver los primeros capullos.`;
    case 3:
      return `¡${flowerName} en plena floración! Está lista para venderse al mejor precio.`;
    default:
      return `${flowerName} en crecimiento.`;
  }
};

// Función para obtener nombre del estado de crecimiento
export const getGrowthStageName = (stage) => {
  switch(stage) {
    case 0:
      return 'Semilla';
    case 1:
      return 'Brote';
    case 2:
      return 'Capullo';
    case 3:
      return 'Flor madura';
    default:
      return 'En crecimiento';
  }
};

// Función para calcular tiempo restante hasta la siguiente etapa
export const calculateTimeToNextStage = (flower) => {
  if (flower.growthStage >= 3) return 0; // Ya está en la etapa final
  
  // Calcular progreso actual en la etapa
  const currentStageProgress = flower.growthStage === 0 ? flower.growthProgress :
                              flower.growthStage === 1 ? flower.growthProgress - 33 :
                              flower.growthStage === 2 ? flower.growthProgress - 66 : 0;
  
  // Calcular progreso restante para la siguiente etapa
  const remainingProgress = flower.growthStage === 0 ? 33 - currentStageProgress :
                           flower.growthStage === 1 ? 33 - currentStageProgress :
                           flower.growthStage === 2 ? 34 - currentStageProgress : 0;
  
  // Calcular tiempo total necesario (horas)
  const totalGrowthTime = flower.growTime;
  
  // Calcular tiempo restante (horas) basado en el progreso restante
  const remainingTime = (remainingProgress / 100) * totalGrowthTime;
  
  return Math.round(remainingTime);
};

// Función para crear una nueva planta
export const createNewPlant = (flower) => {
  return {
    ...flower,
    id: `${flower.id}-${Date.now()}`,
    plantedAt: new Date().toISOString(),
    lastWatered: new Date().toISOString(),
    lastFertilized: new Date().toISOString(),
    growthStage: 0,
    growthProgress: 0,
    water: 100,
    health: 100
  };
};