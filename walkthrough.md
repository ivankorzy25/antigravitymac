# Walkthrough: LinguaQuest - Plataforma de Aprendizaje Gamificada

He completado el desarrollo de la versión inicial de **LinguaQuest**. La aplicación ahora soporta múltiples idiomas y niveles, con tres tipos de juegos interactivos.

## Características Implementadas

### 1. Sistema de Aprendizaje
- **Multi-idioma**: Soporte inicial para Inglés y Francés.
- **Niveles (Grados)**: Estructura jerárquica (Grado -> Unidad -> Lección).
- **Progreso**: Guardado automático en el navegador (LocalStorage).

### 2. Juegos Interactivos
- **Memory Match**: Encuentra los pares (ej. "I" - "Yo").
- **Speed Quiz**: Preguntas contra reloj para probar reflejos.
- **Sentence Builder**: Ordena las palabras para formar oraciones correctas.

### 3. Diseño Premium
- Interfaz moderna con animaciones fluidas (Framer Motion).
- Sistema de colores vibrante y tipografía legible (Inter + Outfit).
- Feedback visual (confeti, sonidos visuales).

## Cómo Probar

1. **Asegúrate de que el servidor esté corriendo**:
   ```bash
   npm run dev
   ```
2. **Navega a la Home**:
   - Selecciona un idioma (ej. Inglés 🇬🇧).
   - Selecciona un nivel (ej. 1er Grado).
   - Haz clic en "Comenzar Aventura".
3. **En el Dashboard**:
   - Verás las unidades disponibles.
   - Haz clic en "Jugar" en la primera lección ("Pronombres Personales").
4. **Juega**:
   - Completa el juego de memoria.
   - Al finalizar, verás una animación de celebración y volverás al Dashboard.
   - La lección aparecerá marcada como completada (verde).
   - La siguiente lección se desbloqueará (si hubiera lógica de bloqueo estricta, por ahora es visual).

## Próximos Pasos Sugeridos
- Agregar más contenido al `curriculum.js`.
- Implementar autenticación de usuarios real.
- Agregar sonidos reales (efectos de audio).
