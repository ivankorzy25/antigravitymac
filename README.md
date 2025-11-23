# 🌍 LinguaQuest

**Aplicación interactiva de aprendizaje de idiomas con juegos educativos**

[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue)](https://ivankorzy25.github.io/antigravitymac/)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

## 🚀 Demo en Vivo

Accede a la aplicación en: **[https://ivankorzy25.github.io/antigravitymac/](https://ivankorzy25.github.io/antigravitymac/)**

## 📱 Características

- ✅ **Diseño 100% Responsive** - Optimizado especialmente para uso móvil
- 🎮 **Juegos Interactivos** - Aprende jugando con minijuegos educativos
- 🌐 **Múltiples Idiomas** - Inglés, Francés, Alemán, Japonés, Italiano y más
- 📊 **Sistema de Progreso** - Seguimiento automático de tu avance
- 🎵 **Música Ambiente** - Experiencia inmersiva de aprendizaje
- 🎨 **Interfaz Moderna** - Diseño atractivo con Tailwind CSS y Framer Motion
- 📱 **Navegación Móvil** - Barra de navegación inferior para fácil acceso en celulares

## 🎯 Juegos Disponibles

1. **Speed Quiz** - Responde preguntas rápidas contra el reloj
2. **Memory Match** - Empareja palabras con sus traducciones
3. **Sentence Builder** - Construye oraciones correctas
4. **Dialogue Translate** - Traduce diálogos conversacionales

## 🛠️ Tecnologías

- **React 19.2** - Framework de UI
- **Vite 7.2** - Build tool ultra rápido
- **Tailwind CSS 3.4** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **React Router DOM** - Navegación SPA
- **Lucide React** - Iconos modernos
- **Howler.js** - Reproducción de audio
- **Canvas Confetti** - Efectos de celebración

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/ivankorzy25/antigravitymac.git

# Entrar al directorio
cd antigravitymac

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📂 Estructura del Proyecto

```
antigravitymac/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── games/       # Componentes de juegos
│   │   ├── ui/          # Componentes de UI
│   │   └── Layout.jsx   # Layout principal
│   ├── context/         # Context API (LanguageContext)
│   ├── data/           # Datos del currículo
│   ├── pages/          # Páginas principales
│   ├── hooks/          # Custom hooks
│   └── utils/          # Utilidades
├── public/             # Assets estáticos
└── dist/              # Build de producción
```

## 🎨 Diseño Responsive

La aplicación está completamente optimizada para dispositivos móviles:

- **Grid responsive** con breakpoints: `sm:`, `md:`, `lg:`
- **Navegación adaptativa** - Bottom bar en móvil, top bar en desktop
- **Tipografía escalable** - Se ajusta según el tamaño de pantalla
- **Touch-friendly** - Botones y áreas táctiles optimizadas
- **Viewport configurado** - Meta viewport para correcta visualización

## 📱 Optimización Móvil

Características específicas para celulares:

- Navegación inferior fija (bottom navigation bar)
- Tamaños de fuente optimizados para lectura en pantallas pequeñas
- Grids de 1 columna en móvil, 2-3 en tablet/desktop
- Botones grandes y fáciles de tocar
- Animaciones suaves y performantes

## 🚀 Despliegue

El proyecto está configurado para GitHub Pages:

1. Build automático con base path: `/antigravitymac/`
2. Deploy en rama `gh-pages`
3. HTTPS habilitado automáticamente
4. Actualización en tiempo real al hacer push

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**Ivan Korzyniewski**
- GitHub: [@ivankorzy25](https://github.com/ivankorzy25)

---

🤖 **Desarrollado con [Claude Code](https://claude.com/claude-code)**
