# El Foro 514 - Plataforma de Discusión Informativa

Una plataforma de foro moderna construida con React, TypeScript, Vite y Firebase, siguiendo las especificaciones de diseño para un foro informativo y periodístico.

## 🏛️ Características Principales

### ✅ **Diseño Según Especificaciones**

- **Logo**: "El foro – 514" en azul, fuente Inter, esquina superior izquierda
- **Colores**: Esquema azul y blanco profesional
- **Barra lateral izquierda**: Comunidades seguidas, populares y posts más votados
- **Buscador**: Centrado en la parte superior para encontrar temas
- **Iconos de funcionalidad**: Chat, notificaciones y perfil en la esquina superior derecha
- **Privacidad**: Usuarios anónimos con nombres y avatares aleatorios

### 🔧 **Funcionalidades Implementadas**

- **Sistema de votación**: Upvote/downvote en publicaciones
- **Búsqueda en tiempo real**: Filtrado instantáneo de contenido
- **Gestión de comunidades**: Seguir/dejar de seguir comunidades
- **Usuarios anónimos**: Generación automática para proteger privacidad
- **Integración Firebase**: Base de datos en tiempo real con fallback
- **Responsive**: Diseño completamente adaptable

### 📰 **Concepto del Foro**

- **Solo lectura para usuarios**: Los usuarios votan y comentan, no crean posts
- **Contenido por especialistas**: Publicaciones realizadas por periodistas y analistas
- **Enfoque informativo**: Análisis político, económico, deportivo y cultural
- **Discusión constructiva**: Ambiente controlado para debate civilizado

## 🚀 Instalación y Configuración

### Instalación Rápida

```bash
# Clonar el repositorio
git clone [tu-repo-url]
cd foro-514-design-overview

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Configuración Firebase (Opcional)

La aplicación funciona perfectamente sin Firebase usando datos de demostración. Para conectar con Firebase real:

1. **Lee la guía completa**: `FIREBASE_SETUP.md`
2. **Copia las variables de entorno**: `cp .env.example .env`
3. **Configura tu proyecto Firebase** y actualiza las variables

## 🎨 Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS + Radix UI
- **Backend**: Firebase Firestore
- **Icons**: Lucide React
- **Deploy**: GitHub Pages

## 📱 Uso de la Aplicación

### **Para Lectores (Usuarios Finales)**

1. **Exploración**: Navega por las comunidades en la barra lateral
2. **Lectura**: Lee análisis de periodistas especialistas
3. **Votación**: Vota positivo/negativo en publicaciones que te parezcan relevantes
4. **Búsqueda**: Busca temas específicos usando el buscador superior
5. **Seguimiento**: Sigue comunidades de tu interés para personalizar tu feed

### **Para Administradores/Editores**

1. **Gestión de contenido**: Agregar posts desde Firebase Console
2. **Moderación**: Gestionar comunidades y supervisar discusiones
3. **Analytics**: Monitorear engagement y métricas de la plataforma

## 🔧 Desarrollo y Personalización

### Estructura del Proyecto

```
src/
├── components/          # Componentes React
├── context/            # Context API para estado global
├── data/               # Datos mock y fallbacks
├── hooks/              # Custom hooks
├── services/           # Servicios Firebase
├── types/              # Definiciones TypeScript
└── config/             # Configuración Firebase
```

### Comandos Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run deploy       # Deploy a GitHub Pages
```

## 🌐 Despliegue en GitHub Pages

### Configuración Automática

El proyecto incluye GitHub Actions para despliegue automático:

1. **Actualizar configuración**: Cambia la URL base en `vite.config.ts`
2. **Push a main**: El despliegue es automático
3. **Configurar GitHub Pages**: Settings > Pages > GitHub Actions

### URL del Sitio

Tu sitio estará disponible en: `https://tu-usuario.github.io/nombre-repo/`

## 🔒 Consideraciones de Privacidad

- **Usuarios anónimos**: No se requiere registro personal
- **Datos mínimos**: Solo se almacenan preferencias básicas
- **Transparencia**: Código abierto y auditable

## 📊 Escalabilidad y Performance

- **Paginación**: Carga progresiva de contenido
- **Cache inteligente**: Optimización de consultas Firebase
- **Fallback robusto**: Funciona sin conexión a internet
- **Optimización móvil**: Diseño responsive completo

## 🆘 Soporte y Resolución de Problemas

### Problemas Comunes

1. **Error Firebase**: Verifica configuración en `.env`
2. **Build fallos**: Ejecuta `npm install` nuevamente
3. **Deploy issues**: Confirma la URL base en `vite.config.ts`

### Logs y Debug

- Abre Developer Tools para ver logs detallados
- El indicador de conexión muestra el estado de Firebase
- Modo demo funciona completamente offline

## 🤝 Contribución

El proyecto está diseñado para ser:

- **Mantenible**: Código limpio y documentado
- **Extensible**: Arquitectura modular
- **Configurable**: Fácil personalización de temas y funciones

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para más detalles.

---

**El Foro 514** - Información confiable, discusión constructiva 🏛️

Para configuración detallada de Firebase, consulta: [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)
