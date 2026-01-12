# 🏛️ El Foro 514 - Setup con Firebase

## 📋 Guía de Configuración Firebase

### 1. **Crear Proyecto Firebase**

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombra tu proyecto (ej: "foro-514")
4. Configura Google Analytics (opcional)
5. Crea el proyecto

### 2. **Configurar Firestore Database**

1. En la consola de Firebase, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" por ahora
4. Elige una ubicación (preferiblemente cerca de tus usuarios)

### 3. **Configurar Authentication (Opcional)**

1. Ve a "Authentication" > "Sign-in method"
2. Habilita "Anónimo" para usuarios sin registro

### 4. **Obtener Configuración del Proyecto**

1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. En la sección "Tus apps", selecciona "Web" (</>)
3. Registra tu app con un nombre
4. Copia la configuración (`firebaseConfig`)

### 5. **Configurar Variables de Entorno**

1. Copia `.env.example` a `.env`:

   ```bash
   cp .env.example .env
   ```

2. Reemplaza los valores en `.env` con tu configuración:
   ```env
   VITE_FIREBASE_API_KEY=tu-api-key-real
   VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
   VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=tu-app-id-real
   ```

### 6. **Configurar Reglas de Firestore**

Ve a Firestore > Rules y configura las reglas básicas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura a todos
    match /{document=**} {
      allow read: if true;
    }

    // Solo usuarios autenticados pueden escribir
    match /posts/{postId} {
      allow write: if request.auth != null;
    }

    match /communities/{communityId} {
      allow write: if request.auth != null;
    }

    match /users/{userId} {
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 7. **Estructura de Datos Inicial**

El sistema creará automáticamente las colecciones, pero puedes agregar datos iniciales:

#### Colección `communities`:

```json
{
  "politics": {
    "name": "Política Nacional",
    "description": "Análisis político del país",
    "members": 15420,
    "followers": [],
    "moderators": ["admin"],
    "createdAt": "2026-01-01T00:00:00Z",
    "isActive": true
  }
}
```

#### Colección `posts`:

```json
{
  "post_1": {
    "title": "Título del post",
    "content": "Contenido del post...",
    "author": "Nombre del Autor",
    "authorRole": "Periodista",
    "authorId": "user_123",
    "community": "Política Nacional",
    "communityId": "politics",
    "createdAt": "2026-01-11T10:00:00Z",
    "updatedAt": "2026-01-11T10:00:00Z",
    "votes": 0,
    "upvotes": [],
    "downvotes": [],
    "comments": [],
    "isPublished": true,
    "tags": ["política", "análisis"]
  }
}
```

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Instalar Firebase (ya incluido en package.json)
npm install firebase
```

### Desarrollo

```bash
# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

### Despliegue

```bash
# Desplegar a GitHub Pages
npm run deploy
```

## 🎨 Características Implementadas

### ✅ **Diseño según Especificaciones**

- **Logo**: "El foro – 514" en azul, fuente Inter, esquina superior izquierda
- **Colores**: Esquema azul y blanco como especificado
- **Barra lateral**: Comunidades seguidas, populares y posts más votados
- **Buscador**: Centrado en la parte superior
- **Perfil anónimo**: Usuarios con nombres y avatares aleatorios

### ✅ **Funcionalidades**

- **Sistema de votación**: Upvote/downvote en posts
- **Búsqueda**: Filtrado en tiempo real
- **Comunidades**: Seguir/dejar de seguir
- **Usuarios anónimos**: Generación automática para privacidad
- **Responsive**: Diseño adaptable

### ✅ **Integración Firebase**

- **Firestore**: Base de datos en tiempo real
- **Fallback**: Datos mock cuando Firebase no está configurado
- **Optimización**: Paginación y caché

## 📱 Uso de la Aplicación

### **Para Lectores (Usuarios)**

1. **Navegación**: Explora comunidades en la barra lateral
2. **Lectura**: Lee posts de periodistas especialistas
3. **Votación**: Vota positivo/negativo en publicaciones
4. **Búsqueda**: Busca temas de interés
5. **Seguimiento**: Sigue comunidades de tu interés

### **Para Administradores**

1. **Agregar Posts**: Crear contenido desde Firebase Console
2. **Moderar**: Gestionar comunidades y contenido
3. **Analytics**: Monitorear engagement y métricas

## 🔧 Personalización

### Cambiar Colores

Edita `src/styles/globals.css` o las clases de Tailwind.

### Agregar Comunidades

1. Vía Firebase Console en la colección `communities`
2. O usando la función `CommunityService.createCommunity()`

### Modificar Algoritmos

- **Votación**: `src/services/firebaseService.ts` → `PostService.votePost()`
- **Búsqueda**: `src/context/AppContext.tsx` → `searchPosts()`

## 🚨 Notas Importantes

1. **Modo Demo**: Si no configuras Firebase, la app funciona con datos mock
2. **Privacidad**: Los usuarios son anónimos por defecto
3. **Escalabilidad**: Configurado para manejar miles de usuarios
4. **SEO**: Optimizado para búsquedas y accesibilidad

## 📞 Soporte

Si tienes problemas:

1. Verifica que Firebase esté configurado correctamente
2. Revisa la consola del navegador para errores
3. Confirma que las reglas de Firestore permiten las operaciones

---

**El Foro 514** - Información confiable, discusión constructiva. 🏛️
