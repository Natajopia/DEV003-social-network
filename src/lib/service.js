import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  addDoc, collection, serverTimestamp, query, getDocs, onSnapshot, deleteDoc, doc, orderBy,
} from 'firebase/firestore';
import { auth, db } from './config.js';

// ---- Función para registrarse ----------
// auth es la configuración del Firebase, también le paso email y password que autenticaré
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// -------- Función para mostrar el display name---------------
export const showName = (name) => updateProfile(auth.currentUser, {
  displayName: name,
});

export const sendEmail = () => sendEmailVerification(auth.currentUser);
// export const emailVerification = () => isSignInWithEmailLink(auth, window.location.href);

// ------------ Función para iniciar sesión ------------
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Iniciar sesión con google
export const provider = new GoogleAuthProvider();
export const authGoogle = () => signInWithPopup(auth, provider);

// ------ Función para obtener usuario con sesión activa ------------
export const authUser = onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log('Usuario logueado', uid);
  } else {
    console.log('No hay usuario logueado');
    // onNavigate('/');
  }
});

// --------- Función para cerrar sesión ---------------
export const logout = () => signOut(auth);

// -------------- Funcion para crear post --------------------
export const createPost = (comment) => addDoc(collection(db, 'posts'), {
  name: auth.currentUser.displayName,
  comment,
  timestamp: serverTimestamp(),
  uid: auth.currentUser.uid,
});

// ------ Función para mostrar los post en la consola----------
export const querySnapshot = () => getDocs(collection(db, 'posts'));

// -----------Función para imprimir los post-----------
const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

export const print = (comment) => onSnapshot(q, comment);

// ---------- Función para eliminar post-----------
export const deletePost = (id) => {
  deleteDoc(doc(db, 'posts', id));
};

// ------------Función para obtener el usuario---------
export const getCurrentUser = () => auth.currentUser;
