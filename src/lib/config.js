// importando funciones que se requieren desde el SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = {
  apiKey: 'AIzaSyDSpTNF9bJ3MBbm8bRuPXFWVoAMcPozXoQ',
  authDomain: 'city-fest-d33a5.firebaseapp.com',
  projectId: 'city-fest-d33a5',
  storageBucket: 'city-fest-d33a5.appspot.com',
  messagingSenderId: '1081840489322',
  appId: '1:1081840489322:web:3e0a02253e7fb90988cb13',
  measurementId: 'G-0HVB9SB3WQ',
};

// Inicializando Firebase
export const app = initializeApp(firebaseApp);

// la app tiene ahora activada la autenticación
export const auth = getAuth(app);

// Inicializando Firestore
export const db = getFirestore(app);
