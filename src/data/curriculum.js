// Helper to generate lessons
const generateLessons = (startId, count, type, topicBase) => {
    return Array.from({ length: count }, (_, i) => {
        const num = i + 1;
        // Alternate types for variety
        const currentType = type === 'mixed'
            ? (num % 3 === 0 ? 'speed_quiz' : num % 2 === 0 ? 'sentence_builder' : 'memory')
            : type;

        return {
            id: `${startId}_${num}`,
            title: `${topicBase} #${num}`,
            type: currentType,
            description: `Práctica de ${topicBase} nivel ${num}`,
            content: generateContent(currentType, num)
        };
    });
};

// Vocabulario real para los diferentes niveles - EXPANDIDO
const vocabularyBank = {
    basic: [
        { en: "Table", es: "Mesa" }, { en: "Chair", es: "Silla" }, { en: "Book", es: "Libro" },
        { en: "Pen", es: "Bolígrafo" }, { en: "Door", es: "Puerta" }, { en: "Window", es: "Ventana" },
        { en: "House", es: "Casa" }, { en: "Car", es: "Auto" }, { en: "Tree", es: "Árbol" },
        { en: "Flower", es: "Flor" }, { en: "Sun", es: "Sol" }, { en: "Moon", es: "Luna" },
        { en: "Water", es: "Agua" }, { en: "Food", es: "Comida" }, { en: "Shoes", es: "Zapatos" },
        { en: "Shirt", es: "Camisa" }, { en: "Phone", es: "Teléfono" }, { en: "Computer", es: "Computadora" },
        { en: "School", es: "Escuela" }, { en: "Friend", es: "Amigo" }, { en: "Family", es: "Familia" },
        { en: "Dog", es: "Perro" }, { en: "Cat", es: "Gato" }, { en: "Bird", es: "Pájaro" },
        { en: "Fish", es: "Pez" }, { en: "Horse", es: "Caballo" }, { en: "Cow", es: "Vaca" },
        { en: "Pig", es: "Cerdo" }, { en: "Chicken", es: "Pollo" }, { en: "Rabbit", es: "Conejo" },
        { en: "Mouse", es: "Ratón" }, { en: "Elephant", es: "Elefante" }, { en: "Lion", es: "León" },
        { en: "Tiger", es: "Tigre" }, { en: "Bear", es: "Oso" }, { en: "Monkey", es: "Mono" },
        { en: "Snake", es: "Serpiente" }, { en: "Frog", es: "Rana" }, { en: "Butterfly", es: "Mariposa" },
        { en: "Bee", es: "Abeja" }, { en: "Ant", es: "Hormiga" }, { en: "Spider", es: "Araña" },
        { en: "Apple", es: "Manzana" }, { en: "Banana", es: "Banana" }, { en: "Orange", es: "Naranja" },
        { en: "Grape", es: "Uva" }, { en: "Strawberry", es: "Fresa" }, { en: "Watermelon", es: "Sandía" },
        { en: "Carrot", es: "Zanahoria" }, { en: "Tomato", es: "Tomate" }, { en: "Potato", es: "Papa" },
        { en: "Onion", es: "Cebolla" }, { en: "Lettuce", es: "Lechuga" }, { en: "Bread", es: "Pan" },
        { en: "Milk", es: "Leche" }, { en: "Cheese", es: "Queso" }, { en: "Egg", es: "Huevo" },
        { en: "Meat", es: "Carne" }, { en: "Rice", es: "Arroz" }, { en: "Pasta", es: "Pasta" },
        { en: "Pizza", es: "Pizza" }, { en: "Cake", es: "Pastel" }, { en: "Cookie", es: "Galleta" },
        { en: "Ice cream", es: "Helado" }, { en: "Chocolate", es: "Chocolate" }, { en: "Candy", es: "Dulce" }
    ],
    actions: [
        { en: "Run", es: "Correr" }, { en: "Jump", es: "Saltar" }, { en: "Walk", es: "Caminar" },
        { en: "Eat", es: "Comer" }, { en: "Drink", es: "Beber" }, { en: "Sleep", es: "Dormir" },
        { en: "Read", es: "Leer" }, { en: "Write", es: "Escribir" }, { en: "Play", es: "Jugar" },
        { en: "Sing", es: "Cantar" }, { en: "Dance", es: "Bailar" }, { en: "Cook", es: "Cocinar" },
        { en: "Study", es: "Estudiar" }, { en: "Work", es: "Trabajar" }, { en: "Talk", es: "Hablar" },
        { en: "Listen", es: "Escuchar" }, { en: "Watch", es: "Mirar" }, { en: "Think", es: "Pensar" },
        { en: "Laugh", es: "Reír" }, { en: "Cry", es: "Llorar" }, { en: "Smile", es: "Sonreír" },
        { en: "Draw", es: "Dibujar" }, { en: "Paint", es: "Pintar" }, { en: "Build", es: "Construir" },
        { en: "Clean", es: "Limpiar" }, { en: "Wash", es: "Lavar" }, { en: "Drive", es: "Conducir" },
        { en: "Fly", es: "Volar" }, { en: "Swim", es: "Nadar" }, { en: "Climb", es: "Escalar" }
    ],
    adjectives: [
        { en: "Big", es: "Grande" }, { en: "Small", es: "Pequeño" }, { en: "Happy", es: "Feliz" },
        { en: "Sad", es: "Triste" }, { en: "Fast", es: "Rápido" }, { en: "Slow", es: "Lento" },
        { en: "Hot", es: "Caliente" }, { en: "Cold", es: "Frío" }, { en: "Good", es: "Bueno" },
        { en: "Bad", es: "Malo" }, { en: "New", es: "Nuevo" }, { en: "Old", es: "Viejo" },
        { en: "Young", es: "Joven" }, { en: "Beautiful", es: "Hermoso" }, { en: "Ugly", es: "Feo" },
        { en: "Strong", es: "Fuerte" }, { en: "Weak", es: "Débil" }, { en: "Tall", es: "Alto" },
        { en: "Short", es: "Bajo" }, { en: "Long", es: "Largo" }, { en: "Wide", es: "Ancho" },
        { en: "Narrow", es: "Estrecho" }, { en: "Heavy", es: "Pesado" }, { en: "Light", es: "Ligero" },
        { en: "Hard", es: "Duro" }, { en: "Soft", es: "Suave" }, { en: "Clean", es: "Limpio" },
        { en: "Dirty", es: "Sucio" }, { en: "Wet", es: "Mojado" }, { en: "Dry", es: "Seco" }
    ],
    colors: [
        { en: "Red", es: "Rojo" }, { en: "Blue", es: "Azul" }, { en: "Green", es: "Verde" },
        { en: "Yellow", es: "Amarillo" }, { en: "Orange", es: "Naranja" }, { en: "Purple", es: "Morado" },
        { en: "Pink", es: "Rosa" }, { en: "Brown", es: "Marrón" }, { en: "Black", es: "Negro" },
        { en: "White", es: "Blanco" }, { en: "Gray", es: "Gris" }, { en: "Gold", es: "Dorado" }
    ],
    numbers: [
        { en: "One", es: "Uno" }, { en: "Two", es: "Dos" }, { en: "Three", es: "Tres" },
        { en: "Four", es: "Cuatro" }, { en: "Five", es: "Cinco" }, { en: "Six", es: "Seis" },
        { en: "Seven", es: "Siete" }, { en: "Eight", es: "Ocho" }, { en: "Nine", es: "Nueve" },
        { en: "Ten", es: "Diez" }, { en: "Twenty", es: "Veinte" }, { en: "Hundred", es: "Cien" }
    ]
};

// Función para mezclar array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const generateContent = (type, seed) => {
    // Combinar todos los vocabularios y mezclar
    const allWords = shuffleArray([
        ...vocabularyBank.basic,
        ...vocabularyBank.colors,
        ...vocabularyBank.numbers,
        ...vocabularyBank.adjectives
    ]);

    if (type === 'memory') {
        // Usar seed para seleccionar diferentes grupos de palabras sin repetir
        const startIndex = (seed * 7) % allWords.length; // Multiplicar por número primo para mejor distribución
        const selectedWords = [];
        for (let i = 0; i < 4; i++) {
            const word = allWords[(startIndex + i * 13) % allWords.length]; // Saltos de 13 para evitar patrones
            selectedWords.push({ id: i + 1, front: word.en, back: word.es });
        }
        return selectedWords;
    } else if (type === 'speed_quiz') {
        const startIndex = (seed * 11) % allWords.length;
        const questions = [];
        for (let i = 0; i < 2; i++) {
            const offset = i * 17;
            const correctWord = allWords[(startIndex + offset) % allWords.length];
            const wrong1 = allWords[(startIndex + offset + 5) % allWords.length];
            const wrong2 = allWords[(startIndex + offset + 10) % allWords.length];
            questions.push({
                question: correctWord.en,
                options: shuffleArray([correctWord.es, wrong1.es, wrong2.es]),
                answer: correctWord.es
            });
        }
        return questions;
    } else {
        // Sentence builder con acciones variadas
        const actions = shuffleArray(vocabularyBank.actions);
        const startIndex = (seed * 3) % actions.length;
        const sentences = [];
        const subjects = [
            { en: ["I", "like", "to"], es: "Me gusta" },
            { en: ["We", "can"], es: "Podemos" },
            { en: ["They", "want", "to"], es: "Ellos quieren" },
            { en: ["She", "loves", "to"], es: "A ella le encanta" },
            { en: ["He", "needs", "to"], es: "Él necesita" }
        ];

        for (let i = 0; i < 2; i++) {
            const action = actions[(startIndex + i * 7) % actions.length];
            const subject = subjects[(seed + i) % subjects.length];
            sentences.push({
                sentence: [...subject.en, action.en.toLowerCase()],
                translation: `${subject.es} ${action.es.toLowerCase()}`
            });
        }
        return sentences;
    }
};

export const CURRICULUM = {
    en: {
        id: "en",
        name: "Inglés",
        flag: "🇬🇧",
        grades: [
            {
                id: "grade_1",
                name: "1er Grado",
                description: "Fundamentos (100 Niveles)",
                units: [
                    { id: "u1", name: "Básicos", lessons: generateLessons("g1_u1", 25, "memory", "Vocabulario") },
                    { id: "u2", name: "Frases", lessons: generateLessons("g1_u2", 25, "sentence_builder", "Oraciones") },
                    { id: "u3", name: "Quiz Mix", lessons: generateLessons("g1_u3", 25, "speed_quiz", "Preguntas") },
                    { id: "u4", name: "Repaso Final", lessons: generateLessons("g1_u4", 25, "mixed", "Examen") }
                ]
            },
            {
                id: "grade_2",
                name: "2do Grado",
                description: "Intermedio (100 Niveles)",
                units: [
                    { id: "g2_u1", name: "Gramática I", lessons: generateLessons("g2_u1", 30, "sentence_builder", "Gramática") },
                    { id: "g2_u2", name: "Vocabulario II", lessons: generateLessons("g2_u2", 30, "memory", "Palabras") },
                    { id: "g2_u3", name: "Conversación", lessons: generateLessons("g2_u3", 40, "mixed", "Práctica") }
                ]
            },
            {
                id: "grade_3",
                name: "3er Grado",
                description: "Avanzado (100 Niveles)",
                units: [
                    { id: "g3_u1", name: "Tiempos Verbales", lessons: generateLessons("g3_u1", 50, "sentence_builder", "Verbos") },
                    { id: "g3_u2", name: "Fluidez", lessons: generateLessons("g3_u2", 50, "mixed", "Fluidez") }
                ]
            }
        ]
    },
    fr: {
        id: "fr",
        name: "Francés",
        flag: "🇫🇷",
        grades: [
            {
                id: "fr_grade_1",
                name: "Débutant",
                description: "Bases (100 Niveaux)",
                units: [
                    { id: "fr_g1_u1", name: "Vocabulaire", lessons: generateLessons("fr_g1_u1", 50, "memory", "Mots") },
                    { id: "fr_g1_u2", name: "Phrases", lessons: generateLessons("fr_g1_u2", 50, "sentence_builder", "Phrases") }
                ]
            },
            {
                id: "fr_grade_2",
                name: "Intermédiaire",
                description: "Intermedio (100 Niveaux)",
                units: [
                    { id: "fr_g2_u1", name: "Grammaire", lessons: generateLessons("fr_g2_u1", 100, "mixed", "Grammaire") }
                ]
            }
        ]
    }
};
