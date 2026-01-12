import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project-id",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
};

// Verificar si estamos en modo demo (sin configuración real de Firebase)
export const isFirebaseConfigured = () => {
  return (
    firebaseConfig.apiKey !== "demo-api-key" &&
    firebaseConfig.projectId !== "demo-project-id"
  );
};

// Inicializar Firebase solo si está configurado
let app: any = null;
let db: any = null;
let auth: any = null;
let storage: any = null;

if (isFirebaseConfigured()) {
  console.log("Configuración de Firebase:", firebaseConfig);
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    console.log("Firebase inicializado correctamente");
  } catch (error) {
    console.warn("Error inicializando Firebase:", error);
  }
} else {
  console.log("Firebase en modo demo - usando datos mock");
}

export { db, auth, storage };
export default app;
