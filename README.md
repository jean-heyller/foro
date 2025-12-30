# Foro 514 Design Overview

  This is a code bundle for Foro 514 Design Overview. The original project is available at https://www.figma.com/design/mghT9b0sPW6bOV5GyjJx49/Foro-514-Design-Overview.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Despliegue en GitHub Pages

  ### Configuración Inicial

  1. **Sube tu código a GitHub:**
     ```bash
     git add .
     git commit -m "Configuración para GitHub Pages"
     git push origin main
     ```

  2. **Configura GitHub Pages en tu repositorio:**
     - Ve a Settings > Pages en tu repositorio de GitHub
     - En "Build and deployment", selecciona "GitHub Actions" como source

  3. **Actualiza la configuración base:**
     - En `vite.config.ts`, actualiza la propiedad `base` con el nombre exacto de tu repositorio:
     ```typescript
     base: process.env.NODE_ENV === 'production' ? '/nombre-de-tu-repo/' : '/',
     ```

  ### Despliegue Automático

  El proyecto se desplegará automáticamente cada vez que hagas push a la rama `main`. El workflow de GitHub Actions se encargará de:
  - Instalar las dependencias
  - Compilar el proyecto
  - Desplegar a GitHub Pages

  ### Despliegue Manual (alternativo)

  También puedes desplegar manualmente usando:
  ```bash
  npm run deploy
  ```

  Tu sitio estará disponible en: `https://tu-usuario.github.io/nombre-de-tu-repo/`
