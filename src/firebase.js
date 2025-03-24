// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Tu configuración de Firebase - reemplaza con tus propios datos de proyecto
const firebaseConfig = {
    apiKey: "AIzaSyD0ZUSBNjsx_xAx9HI9Zc8ztxcGNfbzt3w",
    authDomain: "xotla-e9ba8.firebaseapp.com",
    projectId: "xotla-e9ba8",
    storageBucket: "xotla-e9ba8.firebasestorage.app",
    messagingSenderId: "945648045627",
    appId: "1:945648045627:web:bdc83bafb847c9488d561e",
    measurementId: "G-NEVRV210NF"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que necesitarás
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;