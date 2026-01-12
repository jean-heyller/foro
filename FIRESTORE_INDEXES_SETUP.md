# 📊 Configuración de Índices de Firestore - El Foro 514

## 🎯 Crear Índices Manualmente

### 1. **Ir a Índices de Firestore:**

```
1. Ve a: https://console.firebase.google.com
2. Selecciona proyecto: foro-b0985
3. Ve a "Build" > "Firestore Database"
4. Haz clic en la pestaña "Indexes"
```

### 2. **Crear Índices Compuestos:**

#### **Índice 1: Posts Publicados (REQUERIDO AHORA)**

```
Colección: posts
Campos:
  - isPublished: Ascending
  - createdAt: Descending
```

#### **Índice 2: Posts por Comunidad**

```
Colección: posts
Campos:
  - communityId: Ascending
  - isPublished: Ascending
  - createdAt: Descending
```

#### **Índice 3: Posts por Autor**

```
Colección: posts
Campos:
  - authorId: Ascending
  - createdAt: Descending
```

#### **Índice 4: Posts por Votos**

```
Colección: posts
Campos:
  - isPublished: Ascending
  - votes: Descending
```

#### **Índice 5: Comentarios por Post**

```
Colección: comments (sub-colección de posts)
Campos:
  - postId: Ascending
  - createdAt: Descending
```

### 3. **Pasos para Crear Cada Índice:**

```
1. Haz clic en "Create Index" o "Crear índice"
2. Selecciona la colección correcta
3. Agrega los campos en el orden especificado
4. Selecciona Ascending/Descending según se indica
5. Haz clic en "Create" o "Crear"
6. Espera 2-5 minutos por cada índice
```

## 🚀 Solución Rápida con Archivo de Índices

Alternativamente, puedes usar Firebase CLI para crear todos los índices automáticamente:
