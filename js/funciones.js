// ===============================
// CONFIGURACIÓN FIREBASE CASO 2
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAjsWFlifV6vrqfgPaiVvwnV6YeICRBWu4",
  authDomain: "gestion-eventos-caso2.firebaseapp.com",
  projectId: "gestion-eventos-caso2",
  storageBucket: "gestion-eventos-caso2.appspot.com",
  messagingSenderId: "133499209288",
  appId: "1:133499209288:web:d1fdf1b96f2b9c3d07ba7d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ===============================
// FUNCIONES DE EVENTOS
// ===============================
export async function guardarEvento(datos) {
  return await addDoc(collection(db, "eventos_caso2"), {
    ...datos,
    creado: new Date()
  });
}

export async function listarEventos() {
  const snapshot = await getDocs(collection(db, "eventos_caso2"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function eliminarEvento(id) {
  await deleteDoc(doc(db, "eventos_caso2", id));
}

export async function actualizarEvento(id, cambios) {
  await updateDoc(doc(db, "eventos_caso2", id), cambios);
}

// ===============================
// FUNCIONES DE UBICACIONES
// ===============================
export async function guardarUbicacion(datos) {
  return await addDoc(collection(db, "ubicaciones_caso2"), {
    ...datos,
    creado: new Date()
  });
}

export async function listarUbicaciones() {
  const snapshot = await getDocs(collection(db, "ubicaciones_caso2"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function eliminarUbicacion(id) {
  await deleteDoc(doc(db, "ubicaciones_caso2", id));
}

// ===============================
// FUNCIONES DE CONTACTOS
// ===============================
export async function guardarContacto(datos, archivoFoto) {
  let fotoURL = "";
  if (archivoFoto) {
    const storageRef = ref(storage, `contactos_caso2/${Date.now()}_${archivoFoto.name}`);
    await uploadBytes(storageRef, archivoFoto);
    fotoURL = await getDownloadURL(storageRef);
  }

  return await addDoc(collection(db, "contactos_caso2"), {
    ...datos,
    foto: fotoURL,
    creado: new Date()
  });
}

export async function listarContactos() {
  const snapshot = await getDocs(collection(db, "contactos_caso2"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function eliminarContacto(id) {
  await deleteDoc(doc(db, "contactos_caso2", id));
}