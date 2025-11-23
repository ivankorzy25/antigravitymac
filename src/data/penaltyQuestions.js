// Banco de preguntas de penalización (frases básicas en inglés)
export const penaltyQuestions = [
    {
        question: "¿Cómo se dice 'Hola' en inglés?",
        options: ["Hello", "Goodbye", "Thanks"],
        answer: "Hello"
    },
    {
        question: "¿Cómo se dice 'Gracias' en inglés?",
        options: ["Please", "Sorry", "Thank you"],
        answer: "Thank you"
    },
    {
        question: "¿Cómo se dice 'Adiós' en inglés?",
        options: ["Hello", "Goodbye", "Welcome"],
        answer: "Goodbye"
    },
    {
        question: "¿Cómo se dice 'Por favor' en inglés?",
        options: ["Please", "Sorry", "Excuse me"],
        answer: "Please"
    },
    {
        question: "¿Cómo se dice 'Lo siento' en inglés?",
        options: ["Sorry", "Thank you", "Please"],
        answer: "Sorry"
    },
    {
        question: "¿Cómo se dice 'Sí' en inglés?",
        options: ["Yes", "No", "Maybe"],
        answer: "Yes"
    },
    {
        question: "¿Cómo se dice 'No' en inglés?",
        options: ["Yes", "No", "Never"],
        answer: "No"
    },
    {
        question: "¿Cómo se dice 'Buenos días' en inglés?",
        options: ["Good morning", "Good night", "Good afternoon"],
        answer: "Good morning"
    },
    {
        question: "¿Cómo se dice 'Buenas noches' en inglés?",
        options: ["Good morning", "Good night", "Good evening"],
        answer: "Good night"
    },
    {
        question: "¿Cómo se dice 'Agua' en inglés?",
        options: ["Water", "Milk", "Juice"],
        answer: "Water"
    }
];

export const getRandomPenaltyQuestion = () => {
    const randomIndex = Math.floor(Math.random() * penaltyQuestions.length);
    return penaltyQuestions[randomIndex];
};
