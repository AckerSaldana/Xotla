// src/services/firebaseServices.js
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Servicio para guardar el progreso del usuario
export const saveUserProgress = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.error('Error al guardar progreso:', error);
    return { success: false, error };
  }
};

// Servicio para cargar los datos del usuario
export const loadUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return { 
        success: true, 
        data: userDoc.data(),
        isNewUser: false 
      };
    } else {
      return { 
        success: true, 
        data: null,
        isNewUser: true 
      };
    }
  } catch (error) {
    console.error('Error al cargar datos del usuario:', error);
    return { success: false, error };
  }
};

// Servicio para registrar una transacción (compra/venta)
export const logTransaction = async (userId, transactionData) => {
  try {
    const transactionsRef = collection(db, 'users', userId, 'transactions');
    await addDoc(transactionsRef, {
      ...transactionData,
      timestamp: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error al registrar transacción:', error);
    return { success: false, error };
  }
};

// Servicio para registrar una acción de cuidado
export const logCareAction = async (userId, careData) => {
  try {
    const careRef = collection(db, 'users', userId, 'care_actions');
    await addDoc(careRef, {
      ...careData,
      timestamp: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error al registrar acción de cuidado:', error);
    return { success: false, error };
  }
};

// Servicio para actualizar el nivel del usuario
export const updateUserLevel = async (userId, level, experience) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      userLevel: level,
      experience: experience,
      levelUpDate: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar nivel:', error);
    return { success: false, error };
  }
};

// Función para inicializar un nuevo usuario con valores predeterminados
export const initializeNewUser = async (userId, initialFlower) => {
  try {
    const initialData = {
      coins: 50,
      inventory: [{
        ...initialFlower,
        id: `${initialFlower.id}-${Date.now()}`,
        plantedAt: new Date().toISOString(),
        lastWatered: new Date().toISOString(),
        lastFertilized: new Date().toISOString(),
        growthStage: 0,
        growthProgress: 0,
        water: 100,
        health: 100
      }],
      userLevel: 1,
      experience: 0,
      lastCaredTime: {},
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    };
    
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, initialData);
    
    return { success: true, data: initialData };
  } catch (error) {
    console.error('Error al inicializar nuevo usuario:', error);
    return { success: false, error };
  }
};

// Función para actualizar el tiempo de login
export const updateLastLogin = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      lastLogin: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar último login:', error);
    return { success: false, error };
  }
};