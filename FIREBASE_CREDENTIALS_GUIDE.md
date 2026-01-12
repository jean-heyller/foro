# 🔥 Guía Completa: Configurar Firebase y Obtener Credenciales

## 📋 Paso 1: Crear Proyecto en Firebase

### 1.1 Ir a Firebase Console

- Ve a: https://console.firebase.google.com
- Haz clic en **"Agregar proyecto"** o **"Create a project"**

### 1.2 Configurar el Proyecto

```
1. Nombre del proyecto: "El Foro 514" (o el que prefieras)
2. ID del proyecto: se genera automáticamente (ej: el-foro-514-abc123)
3. Ubicación: Selecciona tu región preferida
4. Acepta los términos y crea el proyecto
```

## 🔧 Paso 2: Configurar Firestore Database

### 2.1 Crear Base de Datos

```
1. En Firebase Console, ve a "Build" > "Firestore Database"
2. Haz clic en "Create database"
3. Selecciona "Start in test mode" (por ahora)
4. Selecciona ubicación: "us-central1" (o tu región preferida)
5. Haz clic en "Done"
```

### 2.2 Configurar Reglas de Seguridad (Temporal)

```javascript
// Reglas temporales para desarrollo (CAMBIAR EN PRODUCCIÓN)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ⚠️ Solo para desarrollo
    }
  }
}
```

## 📱 Paso 3: Registrar App Web

### 3.1 Agregar App Web

```
1. En Firebase Console, ve a "Project Overview"
2. Haz clic en el ícono "</>" (Web)
3. Nombre de la app: "El Foro 514 Web"
4. NO marques "Firebase Hosting" (por ahora)
5. Haz clic en "Register app"
```

### 3.2 Obtener Credenciales

Después de registrar, Firebase te mostrará un código similar a este:

```javascript
// Tu configuración de Firebase (ejemplo)
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "el-foro-514-abc123.firebaseapp.com",
  projectId: "el-foro-514-abc123",
  storageBucket: "el-foro-514-abc123.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789",
  measurementId: "G-XXXXXXXXXX",
};
```

## ⚙️ Paso 4: Configurar Variables de Entorno

### 4.1 Copia el archivo .env.example

```bash
cp .env.example .env
```

### 4.2 Edita tu archivo .env

Reemplaza con TUS valores reales:

```env
# Firebase Configuration - REEMPLAZA CON TUS VALORES
VITE_FIREBASE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=el-foro-514-abc123.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=el-foro-514-abc123
VITE_FIREBASE_STORAGE_BUCKET=el-foro-514-abc123.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456ghi789
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

NODE_ENV=development
```

## 🚀 Paso 5: Ejecutar Script de Inicialización

### 5.1 Instalar Dependencias

```bash
npm install
```

### 5.2 Ejecutar Script de Configuración

```bash
npm run setup-firestore
```

Este script creará automáticamente:

- ✅ 3 Comunidades (Política, Economía, Deportes)
- ✅ 2 Periodistas de ejemplo
- ✅ 2 Posts de ejemplo
- ✅ Estructura base de colecciones

### 5.3 Verificar en Firebase Console

```
1. Ve a Firebase Console
2. Selecciona tu proyecto
3. Ve a "Firestore Database"
4. Deberías ver las colecciones creadas con datos
```

## 📊 Paso 6: Verificar la Configuración

### 6.1 Ejecutar la Aplicación

```bash
npm run dev
```

### 6.2 Abrir en Navegador

- Ve a: http://localhost:5173
- Deberías ver el foro funcionando con datos reales de Firebase

### 6.3 Indicador de Estado

En la esquina superior derecha verás:

- 🟢 **Firebase Conectado** = Todo funciona correctamente
- 🟡 **Modo Demo** = Usando datos mock (revisa tu configuración)

## 🔒 Paso 7: Configurar Seguridad (Producción)

### 7.1 Reglas de Firestore Seguras

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lectura pública para posts y comunidades
    match /posts/{postId} {
      allow read: if resource.data.isPublished == true;
      allow write: if false; // Solo admin puede escribir
    }

    match /communities/{communityId} {
      allow read: if resource.data.isActive == true;
      allow write: if false; // Solo admin puede escribir
    }

    match /journalists/{journalistId} {
      allow read: if true;
      allow write: if false; // Solo admin puede escribir
    }

    // Otras colecciones - solo lectura
    match /{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## 🆘 Solución de Problemas

### Error: "Permission Denied"

```bash
# Solución:
1. Ve a Firestore > Rules
2. Cambia temporalmente a "test mode"
3. O ajusta las reglas según necesites
```

### Error: "Project Not Found"

```bash
# Solución:
1. Verifica el VITE_FIREBASE_PROJECT_ID en .env
2. Asegúrate de que coincida con Firebase Console
```

### Error: "API Key Invalid"

```bash
# Solución:
1. Verifica VITE_FIREBASE_API_KEY en .env
2. Regenera la API key en Firebase Console si es necesario
```

### Datos No Aparecen

```bash
# Solución:
1. Verifica que el script setup-firestore se ejecutó sin errores
2. Revisa Firebase Console para confirmar que los datos existen
3. Verifica las reglas de Firestore
```

## 📞 Comandos Útiles

```bash
# Reinstalar dependencias
npm ci

# Ver logs detallados
npm run setup-firestore --verbose

# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json && npm install

# Verificar configuración
node -e "console.log(process.env.VITE_FIREBASE_PROJECT_ID)"
```

## ✨ ¡Listo!

Después de seguir estos pasos tendrás:

- 🔥 Firebase configurado y funcionando
- 📊 Base de datos con datos de ejemplo
- 🚀 Aplicación conectada y funcionando
- 📱 Interfaz moderna y responsive
- 🔒 Configuración de seguridad básica

**¡Tu foro "El Foro 514" estará completamente operativo!**
