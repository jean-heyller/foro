# 🔒 Configuración de Reglas de Firestore - El Foro 514

## ⚠️ Error: "Missing or insufficient permissions"

Este error ocurre porque las reglas de Firestore están bloqueando el acceso. Sigue estos pasos para solucionarlo:

## 🚀 Solución Rápida (Para Desarrollo)

### 1. Ir a Firebase Console

```
1. Ve a: https://console.firebase.google.com
2. Selecciona tu proyecto
3. Ve a "Build" > "Firestore Database"
4. Haz clic en la pestaña "Rules"
```

### 2. Aplicar Reglas Temporales de Desarrollo

Reemplaza las reglas existentes con estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ⚠️ REGLAS TEMPORALES PARA DESARROLLO - CAMBIAR EN PRODUCCIÓN
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. Publicar las Reglas

```
1. Haz clic en "Publish" o "Publicar"
2. Confirma los cambios
3. Espera 1-2 minutos para que se apliquen
```

## 🔒 Reglas de Producción (Seguras)

Una vez que todo funcione, cambia a estas reglas más seguras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 📰 Posts - Lectura pública, escritura restringida
    match /posts/{postId} {
      allow read: if resource.data.isPublished == true;
      allow write: if false; // Solo admin puede escribir
    }

    // 🏛️ Comunidades - Lectura pública
    match /communities/{communityId} {
      allow read: if resource.data.isActive == true;
      allow write: if false; // Solo admin puede escribir
    }

    // ✍️ Periodistas - Lectura pública
    match /journalists/{journalistId} {
      allow read: if resource.data.isActive == true;
      allow write: if false; // Solo admin puede escribir
    }

    // 💬 Comentarios - Lectura pública, escritura para usuarios registrados
    match /posts/{postId}/comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
                             request.auth.uid == resource.data.authorId;
    }

    // 👥 Usuarios - Solo propietario puede leer/escribir
    match /users/{userId} {
      allow read, write: if request.auth != null &&
                            request.auth.uid == userId;
    }

    // 🗳️ Votos - Solo propietario puede leer/escribir
    match /votes/{voteId} {
      allow read, write: if request.auth != null &&
                            request.auth.uid == resource.data.userId;
    }

    // 🔔 Notificaciones - Solo propietario puede leer
    match /users/{userId}/notifications/{notificationId} {
      allow read: if request.auth != null &&
                     request.auth.uid == userId;
      allow write: if false; // Solo el sistema puede escribir
    }

    // 📈 Analytics - Solo lectura admin
    match /analytics/{document} {
      allow read: if false; // Solo admin puede leer
      allow write: if false; // Solo el sistema puede escribir
    }
  }
}
```

## 🛠️ Verificación de Problemas

### Problema 1: Variables de Entorno

Verifica tu archivo `.env`:

```bash
# Debe tener valores reales, no los de ejemplo
VITE_FIREBASE_API_KEY=tu-api-key-real
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id-real
# ... etc
```

### Problema 2: Modo Demo Activado

Si ves en la consola: "Firebase en modo demo", significa que las variables de entorno no están configuradas correctamente.

### Problema 3: Proyecto Inexistente

Verifica que el `projectId` en tu `.env` coincida exactamente con el ID en Firebase Console.

## 🧪 Probar la Configuración

### 1. Reiniciar la Aplicación

```bash
npm run dev
```

### 2. Verificar en Consola del Navegador

Deberías ver:

```
✅ Firebase inicializado correctamente
✅ Posts cargados: [array de posts]
```

En lugar de:

```
❌ Error getting posts: FirebaseError: Missing or insufficient permissions
```

### 3. Verificar Indicador Visual

En la esquina superior derecha de la app:

- 🟢 **Firebase Conectado** = Todo funciona
- 🟡 **Modo Demo** = Hay un problema de configuración

## 📞 Comandos de Depuración

```bash
# Verificar variables de entorno
echo $VITE_FIREBASE_PROJECT_ID

# Reiniciar servidor de desarrollo
npm run dev

# Verificar configuración de Firebase
node -e "
require('dotenv').config();
console.log('Project ID:', process.env.VITE_FIREBASE_PROJECT_ID);
console.log('API Key:', process.env.VITE_FIREBASE_API_KEY ? 'Configurada' : 'Faltante');
"
```

## 🎯 Pasos Específicos para tu Error

1. **Inmediatamente**: Aplica las reglas temporales de desarrollo
2. **Verifica**: Que tu `.env` tenga valores reales de Firebase
3. **Reinicia**: La aplicación con `npm run dev`
4. **Confirma**: Que veas "Firebase inicializado correctamente" en la consola
5. **Más tarde**: Cambia a las reglas de producción seguras

¡Esto debería resolver el error de permisos inmediatamente!
