# 🗄️ Estructura de Base de Datos Firestore - El Foro 514

## 📊 Colecciones Principales

### 1. **`users` - Usuarios Anónimos**

```javascript
// Documento: users/{userId}
{
  "id": "user_12345",
  "username": "CuriosoLector2024",
  "avatarColor": "#3B82F6",
  "isAnonymous": true,
  "email": null, // Los usuarios son anónimos
  "followedCommunities": [
    "politics",
    "economy",
    "sports"
  ],
  "joinDate": "2026-01-11T10:00:00Z",
  "lastActive": "2026-01-11T15:30:00Z",
  "preferences": {
    "theme": "light",
    "notifications": true,
    "language": "es"
  },
  "stats": {
    "totalVotes": 45,
    "totalComments": 12,
    "reputation": 67
  }
}
```

### 2. **`communities` - Comunidades Temáticas**

```javascript
// Documento: communities/{communityId}
{
  "id": "politics",
  "name": "Política Nacional",
  "description": "Análisis político y gubernamental del país",
  "category": "news",
  "members": 15420,
  "followers": ["user_123", "user_456", "user_789"],
  "moderators": ["admin_001"],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2026-01-11T10:00:00Z",
  "isActive": true,
  "settings": {
    "allowComments": true,
    "requireApproval": false,
    "isPublic": true
  },
  "rules": [
    "Mantener respeto en las discusiones",
    "No publicar información falsa",
    "Citar fuentes cuando sea posible"
  ],
  "icon": "🏛️",
  "color": "#2563EB",
  "stats": {
    "totalPosts": 234,
    "totalComments": 1567,
    "averageVotes": 45.2
  }
}
```

### 3. **`posts` - Publicaciones de Periodistas**

```javascript
// Documento: posts/{postId}
{
  "id": "post_67890",
  "title": "Análisis: Nuevas reformas legislativas en debate",
  "content": "El Congreso ha iniciado el debate sobre un paquete de reformas...",
  "summary": "Resumen de 150 caracteres para preview...",
  "author": "María González",
  "authorRole": "Periodista Política",
  "authorId": "journalist_001",
  "authorVerified": true,
  "community": "Política Nacional",
  "communityId": "politics",
  "createdAt": "2026-01-11T08:00:00Z",
  "updatedAt": "2026-01-11T08:30:00Z",
  "publishedAt": "2026-01-11T09:00:00Z",
  "isPublished": true,
  "isDraft": false,
  "votes": 847,
  "upvotes": ["user_123", "user_456", "user_789"],
  "downvotes": ["user_321", "user_654"],
  "tags": ["política", "reformas", "congreso", "legislación"],
  "media": {
    "images": ["url1", "url2"],
    "videos": [],
    "documents": ["pdf_url"]
  },
  "seo": {
    "metaTitle": "Nuevas reformas legislativas: análisis completo",
    "metaDescription": "Análisis detallado de las reformas...",
    "slug": "nuevas-reformas-legislativas-debate"
  },
  "engagement": {
    "views": 5430,
    "shares": 89,
    "bookmarks": 156,
    "commentsCount": 78
  },
  "source": {
    "originalUrl": "https://example.com/noticia",
    "publication": "El Periódico Nacional"
  }
}
```

### 4. **`comments` - Comentarios en Posts**

```javascript
// Sub-colección: posts/{postId}/comments/{commentId}
{
  "id": "comment_111",
  "postId": "post_67890",
  "content": "Excelente análisis. Me parece que el punto sobre transparencia es clave.",
  "author": "AnalíticoUsuario456",
  "authorId": "user_456",
  "createdAt": "2026-01-11T10:15:00Z",
  "updatedAt": "2026-01-11T10:15:00Z",
  "votes": 12,
  "upvotes": ["user_123", "user_789"],
  "downvotes": ["user_321"],
  "parentId": null, // null si es comentario principal
  "replies": ["comment_112", "comment_113"], // IDs de respuestas
  "isEdited": false,
  "isModerated": false,
  "isReported": false,
  "mentions": ["user_123"], // usuarios mencionados
  "level": 0 // 0 = principal, 1 = respuesta, 2 = respuesta a respuesta
}

// Respuesta a comentario:
{
  "id": "comment_112",
  "postId": "post_67890",
  "content": "Estoy de acuerdo contigo @AnalíticoUsuario456",
  "parentId": "comment_111", // ID del comentario padre
  "level": 1,
  // ... resto de campos similares
}
```

### 5. **`notifications` - Notificaciones de Usuario**

```javascript
// Sub-colección: users/{userId}/notifications/{notificationId}
{
  "id": "notif_001",
  "userId": "user_456",
  "type": "comment_reply", // comment_reply, vote, mention, community_update
  "title": "Respuesta a tu comentario",
  "message": "CuriosoLector789 respondió a tu comentario en 'Nuevas reformas legislativas'",
  "isRead": false,
  "createdAt": "2026-01-11T11:00:00Z",
  "readAt": null,
  "actionUrl": "/post/post_67890#comment_113",
  "relatedId": "comment_113", // ID del objeto relacionado
  "priority": "normal", // low, normal, high
  "category": "engagement"
}
```

### 6. **`journalists` - Periodistas Autorizados**

```javascript
// Documento: journalists/{journalistId}
{
  "id": "journalist_001",
  "name": "María González",
  "email": "maria.gonzalez@example.com",
  "role": "Periodista Política",
  "specializations": ["política", "gobierno", "análisis"],
  "bio": "Periodista con 15 años de experiencia en cobertura política",
  "avatar": "https://example.com/avatar.jpg",
  "isVerified": true,
  "isActive": true,
  "joinDate": "2024-01-01T00:00:00Z",
  "credentials": {
    "university": "Universidad de Periodismo",
    "certifications": ["Diploma en Periodismo Político"],
    "experience": 15
  },
  "social": {
    "twitter": "@mariagonzalez",
    "linkedin": "maria-gonzalez"
  },
  "permissions": {
    "canPublish": true,
    "canModerate": false,
    "communities": ["politics", "economy"]
  },
  "stats": {
    "totalPosts": 45,
    "totalViews": 150000,
    "averageVotes": 67.5,
    "followerCount": 2340
  }
}
```

### 7. **`votes` - Registro de Votaciones**

```javascript
// Documento: votes/{voteId}
{
  "id": "vote_001",
  "userId": "user_456",
  "targetType": "post", // post, comment
  "targetId": "post_67890",
  "voteType": "up", // up, down
  "createdAt": "2026-01-11T10:30:00Z",
  "previousVote": null, // up, down, null (para tracking de cambios)
  "ipHash": "hash_of_ip", // para prevenir manipulación
  "userAgent": "browser_info"
}
```

### 8. **`analytics` - Métricas y Estadísticas**

```javascript
// Documento: analytics/{date}
{
  "date": "2026-01-11",
  "dailyStats": {
    "totalViews": 25430,
    "uniqueUsers": 3240,
    "newUsers": 156,
    "totalVotes": 890,
    "totalComments": 234,
    "avgTimeOnSite": 420 // segundos
  },
  "postStats": {
    "mostViewed": "post_67890",
    "mostVoted": "post_12345",
    "mostCommented": "post_54321"
  },
  "communityStats": {
    "politics": {
      "views": 8500,
      "engagement": 67.5
    },
    "economy": {
      "views": 6200,
      "engagement": 45.2
    }
  }
}
```

## 🔄 Relaciones Entre Colecciones

### **Estructura Jerárquica:**

```
Root/
├── users/
│   └── {userId}/
│       └── notifications/ (sub-colección)
│           └── {notificationId}
├── communities/
│   └── {communityId}
├── posts/
│   └── {postId}/
│       └── comments/ (sub-colección)
│           └── {commentId}
├── journalists/
│   └── {journalistId}
├── votes/
│   └── {voteId}
└── analytics/
    └── {date}
```

### **Referencias y Joins:**

```javascript
// Ejemplo de consulta compleja
// Obtener posts de comunidades seguidas por el usuario
const userDoc = await db.collection("users").doc(userId).get();
const followedCommunities = userDoc.data().followedCommunities;

const posts = await db
  .collection("posts")
  .where("communityId", "in", followedCommunities)
  .where("isPublished", "==", true)
  .orderBy("createdAt", "desc")
  .limit(10)
  .get();
```

## 🔒 Reglas de Seguridad Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Lectura pública para posts y comunidades
    match /posts/{postId} {
      allow read: if resource.data.isPublished == true;
      allow write: if request.auth != null &&
                      get(/databases/$(database)/documents/journalists/$(request.auth.uid)).data.canPublish == true;
    }

    match /communities/{communityId} {
      allow read: if resource.data.isActive == true;
      allow write: if request.auth != null &&
                      request.auth.uid in resource.data.moderators;
    }

    // Usuarios solo pueden editar su propia información
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Comentarios
    match /posts/{postId}/comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
                               request.auth.uid == resource.data.authorId;
    }

    // Votos
    match /votes/{voteId} {
      allow read, write: if request.auth != null &&
                            request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📈 Índices Requeridos

```javascript
// Índices compuestos necesarios para consultas eficientes
{
  "posts": [
    ["communityId", "isPublished", "createdAt"],
    ["authorId", "createdAt"],
    ["tags", "votes"],
    ["isPublished", "votes"]
  ],
  "comments": [
    ["postId", "createdAt"],
    ["authorId", "createdAt"],
    ["parentId", "createdAt"]
  ],
  "votes": [
    ["targetId", "targetType", "createdAt"],
    ["userId", "createdAt"]
  ]
}
```

Esta estructura está optimizada para:

- **Performance**: Consultas rápidas con índices apropiados
- **Escalabilidad**: Puede manejar miles de usuarios simultáneos
- **Flexibilidad**: Fácil agregar nuevas funciones
- **Seguridad**: Reglas robustas de acceso
- **Analytics**: Tracking completo de métricas
