import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RotateCcw, ArrowRight } from 'lucide-react';

import { triggerSuccess } from '../../utils/celebration';

const SentenceBuilder = ({ content, onComplete, onCorrectAnswer }) => {
    // ... (resto del código permanece igual)
    const checkAnswer = () => {
        const formedSentence = selectedWords.map(w => w.text).join(' ');
        const targetSentence = currentSentence.sentence.join(' ');

        if (formedSentence === targetSentence) {
            setIsCorrect(true);
            triggerSuccess();
            // Notificar al nivel que se acertó
            if (onCorrectAnswer) onCorrectAnswer();
        } else {
            setIsCorrect(false);
        }
    };
    // ... resto del archivo sin cambios

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSentence, setCurrentSentence] = useState(null);
    const [availableWords, setAvailableWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null); // null, true, false

    useEffect(() => {
        if (currentIndex < content.length) {
            const item = content[currentIndex];
            setCurrentSentence(item);
            // Shuffle words
            const words = item.sentence.map((word, idx) => ({ id: idx, text: word }));
            setAvailableWords(words.sort(() => Math.random() - 0.5));
            setSelectedWords([]);
            setIsCorrect(null);
        } else {
            // All done
            onComplete(100);
        }
    }, [currentIndex, content, onComplete]);

    const handleWordClick = (word) => {
        if (isCorrect !== null) return;
        setAvailableWords(prev => prev.filter(w => w.id !== word.id));
        setSelectedWords(prev => [...prev, word]);
    };

    const handleSelectedWordClick = (word) => {
        if (isCorrect !== null) return;
        setSelectedWords(prev => prev.filter(w => w.id !== word.id));
        setAvailableWords(prev => [...prev, word]);
    };



    const nextSentence = () => {
        setCurrentIndex(prev => prev + 1);
    };

    const resetCurrent = () => {
        const item = content[currentIndex];
        const words = item.sentence.map((word, idx) => ({ id: idx, text: word }));
        setAvailableWords(words.sort(() => Math.random() - 0.5));
        setSelectedWords([]);
        setIsCorrect(null);
    };

    if (!currentSentence) return null;

    return (
        <div className="space-y-6">
            {/* Instrucciones */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🔤</span>
                    Cómo jugar - Constructor de Oraciones
                </h3>
                <ul className="text-sm text-green-800 space-y-1">
                    <li>• Lee la oración en español</li>
                    <li>• Selecciona las palabras en el orden correcto para formar la traducción en inglés</li>
                    <li>• Haz clic en las palabras seleccionadas para quitarlas si te equivocas</li>
                    <li>• ¡Completa todas las oraciones para terminar el nivel!</li>
                </ul>
            </div>

            {/* Juego */}
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-8">
                <div className="text-center space-y-2">
                    <h2 className="text-xl text-slate-500">Traduce esta oración:</h2>
                    <p className="text-2xl md:text-3xl font-bold text-slate-800">{currentSentence.translation}</p>
                </div>

                {/* Answer Area */}
                <div className="w-full min-h-[80px] bg-slate-100 rounded-2xl p-4 flex flex-wrap gap-2 items-center justify-center border-2 border-slate-200 border-dashed">
                    <AnimatePresence>
                        {selectedWords.map((word) => (
                            <motion.button
                                key={word.id}
                                layoutId={word.id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={() => handleSelectedWordClick(word)}
                                className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 font-bold text-slate-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                            >
                                {word.text}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                    {selectedWords.length === 0 && (
                        <span className="text-slate-400 italic">Selecciona las palabras abajo...</span>
                    )}
                </div>

                {/* Word Bank */}
                <div className="flex flex-wrap gap-3 justify-center">
                    {availableWords.map((word) => (
                        <motion.button
                            key={word.id}
                            layoutId={word.id}
                            onClick={() => handleWordClick(word)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-primary-500 text-white rounded-xl font-bold shadow-md hover:bg-primary-600 transition-colors"
                        >
                            {word.text}
                        </motion.button>
                    ))}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                    {isCorrect !== null && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {isCorrect ? <Check size={24} /> : <X size={24} />}
                            {isCorrect ? '¡Correcto!' : 'Inténtalo de nuevo'}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex gap-4">
                    {isCorrect === null && (
                        <button
                            onClick={checkAnswer}
                            disabled={selectedWords.length === 0}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Comprobar
                        </button>
                    )}
                    {isCorrect === false && (
                        <button
                            onClick={resetCurrent}
                            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors flex items-center gap-2"
                        >
                            <RotateCcw size={20} />
                            Reiniciar
                        </button>
                    )}
                    {isCorrect && currentIndex < content.length - 1 && (
                        <button
                            onClick={nextSentence}
                            className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                            Siguiente
                            <ArrowRight size={20} />
                        </button>
                    )}
                    {isCorrect && currentIndex === content.length - 1 && (
                        <button
                            onClick={nextSentence} // This will trigger onComplete
                            className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                            Terminar
                            <ArrowRight size={20} />
                        </button>
                    )}
                </div>

                <div className="text-slate-400 text-sm font-medium">
                    Oración {currentIndex + 1} de {content.length}
                </div>
            </div>
        </div>
    );
};

export default SentenceBuilder;
