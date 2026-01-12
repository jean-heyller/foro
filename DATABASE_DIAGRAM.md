# 📊 Diagrama de Estructura de Base de Datos - El Foro 514

## 🗺️ Mapa Visual de Colecciones

```mermaid
graph TB
    subgraph "👥 Usuarios"
        U[users]
        UN[notifications<br/>sub-colección]
        U --> UN
    end

    subgraph "🏛️ Comunidades"
        C[communities]
    end

    subgraph "📰 Contenido"
        P[posts]
        PC[comments<br/>sub-colección]
        P --> PC
    end

    subgraph "✍️ Autores"
        J[journalists]
    end

    subgraph "🗳️ Interacciones"
        V[votes]
    end

    subgraph "📈 Métricas"
        A[analytics]
    end

    %% Relaciones
    U -.-> C
    U -.-> V
    U -.-> PC
    J -.-> P
    C -.-> P
    P -.-> V

    classDef primary fill:#3B82F6,stroke:#1E40AF,stroke-width:2px,color:#fff
    classDef secondary fill:#10B981,stroke:#047857,stroke-width:2px,color:#fff
    classDef accent fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff

    class U,C,P primary
    class J,V secondary
    class A,UN,PC accent
```

## 🔄 Flujo de Datos Principal

```mermaid
sequenceDiagram
    participant User as Usuario Anónimo
    participant UI as Interfaz
    participant FB as Firebase
    participant J as Periodista

    Note over User,J: Flujo de Lectura
    User->>UI: Abre El Foro 514
    UI->>FB: Obtener comunidades
    FB-->>UI: Lista de comunidades
    UI->>FB: Obtener posts recientes
    FB-->>UI: Posts publicados
    UI-->>User: Muestra feed personalizado

    Note over User,J: Flujo de Interacción
    User->>UI: Vota en post
    UI->>FB: Registrar voto
    FB->>FB: Actualizar contador
    FB-->>UI: Confirmación
    UI-->>User: Feedback visual

    Note over User,J: Flujo de Publicación
    J->>FB: Crear nuevo post
    FB->>FB: Validar permisos
    FB->>FB: Guardar en colección posts
    FB->>FB: Notificar seguidores
    FB-->>UI: Post disponible
    UI-->>User: Nuevo contenido visible
```

## 📋 Esquema de Datos Detallado

### 1. **Colección `users`**

```json
{
  "userId": {
    "username": "string (generado)",
    "avatarColor": "string (hex color)",
    "isAnonymous": "boolean (siempre true)",
    "followedCommunities": ["array de IDs"],
    "joinDate": "timestamp",
    "preferences": {
      "theme": "light|dark",
      "notifications": "boolean"
    },
    "stats": {
      "totalVotes": "number",
      "totalComments": "number"
    }
  }
}
```

### 2. **Colección `communities`**

```json
{
  "communityId": {
    "name": "string",
    "description": "string",
    "members": "number",
    "followers": ["array de userIds"],
    "moderators": ["array de userIds"],
    "isActive": "boolean",
    "icon": "string (emoji)",
    "color": "string (hex)",
    "rules": ["array de strings"],
    "stats": {
      "totalPosts": "number",
      "totalComments": "number"
    }
  }
}
```

### 3. **Colección `posts`**

```json
{
  "postId": {
    "title": "string",
    "content": "string (HTML permitido)",
    "author": "string",
    "authorRole": "string",
    "authorId": "string (ref a journalists)",
    "communityId": "string (ref a communities)",
    "createdAt": "timestamp",
    "publishedAt": "timestamp",
    "votes": "number",
    "upvotes": ["array de userIds"],
    "downvotes": ["array de userIds"],
    "tags": ["array de strings"],
    "isPublished": "boolean",
    "engagement": {
      "views": "number",
      "shares": "number",
      "commentsCount": "number"
    }
  }
}
```

### 4. **Sub-colección `posts/{postId}/comments`**

```json
{
  "commentId": {
    "content": "string",
    "authorId": "string (ref a users)",
    "createdAt": "timestamp",
    "votes": "number",
    "parentId": "string|null",
    "level": "number (0-2)",
    "replies": ["array de commentIds"]
  }
}
```

## 🔍 Consultas Principales

### **Feed Principal**

```javascript
// Obtener posts recientes de comunidades seguidas
db.collection("posts")
  .where("communityId", "in", followedCommunities)
  .where("isPublished", "==", true)
  .orderBy("createdAt", "desc")
  .limit(10);
```

### **Posts Más Votados**

```javascript
// Top posts por votos
db.collection("posts")
  .where("isPublished", "==", true)
  .orderBy("votes", "desc")
  .limit(5);
```

### **Búsqueda de Posts**

```javascript
// Búsqueda por tags (requiere índice)
db.collection("posts")
  .where("tags", "array-contains-any", searchTerms)
  .where("isPublished", "==", true)
  .orderBy("createdAt", "desc");
```

### **Comentarios de Post**

```javascript
// Comentarios principales (nivel 0)
db.collection("posts")
  .doc(postId)
  .collection("comments")
  .where("level", "==", 0)
  .orderBy("createdAt", "desc");
```

## 🎯 Optimizaciones de Rendimiento

### **Índices Compuestos Requeridos:**

1. `posts`: `[communityId, isPublished, createdAt]`
2. `posts`: `[tags, isPublished, votes]`
3. `comments`: `[postId, level, createdAt]`
4. `votes`: `[targetId, targetType, userId]`

### **Estrategias de Cache:**

- **Posts recientes**: Cache en memoria por 5 minutos
- **Comunidades**: Cache en localStorage por 1 hora
- **Contadores**: Actualización en lotes cada 30 segundos
- **Comentarios**: Paginación con cursor-based pagination

### **Límites de Documento:**

- **Posts**: Máximo 1MB (contenido + metadata)
- **Comentarios**: Máximo 100 por batch
- **Usuarios**: Máximo 1000 comunidades seguidas
- **Analytics**: Agregación diaria en documentos separados

## 🔐 Seguridad y Validación

### **Reglas de Validación:**

```javascript
// Validar estructura de post
function validatePost(post) {
  return post.title.length <= 200 &&
         post.content.length <= 10000 &&
         post.tags.length <= 10 &&
         isValidCommunityId(post.communityId);
}

// Validar permisos de escritura
function canWritePost(userId) {
  return exists(/databases/$(database)/documents/journalists/$(userId)) &&
         get(/databases/$(database)/documents/journalists/$(userId)).data.canPublish == true;
}
```

### **Rate Limiting:**

- **Votos**: Máximo 100 por usuario por hora
- **Comentarios**: Máximo 50 por usuario por día
- **Búsquedas**: Máximo 200 por usuario por hora

Esta estructura está diseñada para soportar:

- ✅ **Miles de usuarios simultáneos**
- ✅ **Cientos de posts diarios**
- ✅ **Miles de comentarios por día**
- ✅ **Búsquedas en tiempo real**
- ✅ **Analytics detallados**
- ✅ **Escalabilidad horizontal**
