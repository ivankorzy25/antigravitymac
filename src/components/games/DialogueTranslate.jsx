import React, { useState } from 'react';
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';

/**
 * DialogueTranslate – Juego de interacción de personajes donde el jugador debe traducir
 * cada línea de diálogo al idioma objetivo.
 *
 * Props:
 *   content: { dialogues: Array<{ speaker: string, text: string, translation: string }> }
 *   onComplete: (score: number) => void
 */
const DialogueTranslate = ({ content, onComplete }) => {
    const dialogues = content.dialogues || [];
    const [index, setIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);

    if (!dialogues.length) {
        return <div className="p-8 text-center text-slate-500">No hay diálogos para traducir.</div>;
    }

    const current = dialogues[index];

    const handleSubmit = () => {
        const trimmed = userAnswer.trim().toLowerCase();
        const correct = current.translation.trim().toLowerCase();
        const correctFlag = trimmed === correct;
        setIsCorrect(correctFlag);
        if (correctFlag) setScore(prev => prev + 1);
        // Avanzar después de breve delay
        setTimeout(() => {
            setIsCorrect(null);
            setUserAnswer('');
            if (index + 1 < dialogues.length) {
                setIndex(prev => prev + 1);
            } else {
                // Juego terminado
                onComplete(score + (correctFlag ? 1 : 0));
            }
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
                <MessageSquare size={24} className="text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-900">Interacción</h2>
            </div>

            <div className="mb-4 p-4 bg-slate-100 rounded-lg">
                <p className="text-xl font-medium text-slate-800">
                    <span className="font-semibold text-indigo-600">{current.speaker}:</span> {current.text}
                </p>
            </div>

            <input
                type="text"
                placeholder="Escribe la traducción..."
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                disabled={isCorrect !== null}
            />

            <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim() || isCorrect !== null}
                className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
                Verificar
            </button>

            {isCorrect !== null && (
                <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} flex items-center`}
                >
                    {isCorrect ? (
                        <CheckCircle size={20} className="text-green-700 mr-2" />
                    ) : (
                        <XCircle size={20} className="text-red-700 mr-2" />
                    )}
                    <span className="font-medium">
                        {isCorrect ? '¡Correcto!' : `Incorrecto. La respuesta era: "${current.translation}"`}
                    </span>
                </div>
            )}
        </div>
    );
};

export default DialogueTranslate;
