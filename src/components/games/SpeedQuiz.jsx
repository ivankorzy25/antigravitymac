import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { triggerSuccess } from '../../utils/celebration';

const SpeedQuiz = ({ content, onComplete, onCorrectAnswer }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isActive, setIsActive] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null); // null, index
    const [isCorrect, setIsCorrect] = useState(null); // null, true, false

    useEffect(() => {
        if (!isActive || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsActive(false);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    const handleTimeUp = () => {
        setIsActive(false);
        setIsCorrect(false);
        setTimeout(nextQuestion, 2000);
    };

    const handleOptionClick = (option, index) => {
        if (!isActive) return;

        setIsActive(false);
        setSelectedOption(index);

        const correct = option === content[currentIndex].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(s => s + 10 + timeLeft); // Bonus for speed
            triggerSuccess();
            // Llamar a onCorrectAnswer cuando se responde correctamente
            if (onCorrectAnswer) {
                onCorrectAnswer();
            }
        }

        setTimeout(handleNext, 1500); // Changed to handleNext
    };

    const handleNext = () => {
        if (currentIndex < content.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setTimeLeft(15); // Cambiado a 15 segundos
            setIsActive(true);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            onComplete(score);
        }
    };

    const currentQuestion = content[currentIndex];

    return (
        <div className="space-y-3 md:space-y-6">
            {/* Instrucciones */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl md:rounded-2xl p-2 md:p-4">
                <h3 className="font-bold text-purple-900 mb-1 md:mb-2 flex items-center gap-2 text-xs md:text-base">
                    <span className="text-lg md:text-2xl">⚡</span>
                    Cómo jugar - Quiz Rápido
                </h3>
                <ul className="text-[10px] md:text-sm text-purple-800 space-y-0.5 md:space-y-1">
                    <li>• Lee la palabra en inglés</li>
                    <li>• Selecciona la traducción correcta en español</li>
                    <li>• ¡Tienes 15 segundos por pregunta!</li>
                    <li>• Responde todas las preguntas para completar el nivel</li>
                </ul>
            </div>

            {/* Juego */}
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-3 md:gap-8">
                {/* Cronómetro Circular */}
                <div className="relative flex items-center justify-center">
                    <svg className="transform -rotate-90 w-20 h-20 md:w-[120px] md:h-[120px]" viewBox="0 0 120 120">
                        {/* Círculo de fondo */}
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            stroke="#e2e8f0"
                            strokeWidth="8"
                            fill="none"
                        />
                        {/* Círculo de progreso */}
                        <motion.circle
                            cx="60"
                            cy="60"
                            r="54"
                            stroke={timeLeft < 5 ? "#ef4444" : "#6366f1"}
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "339.292", strokeDashoffset: 0 }}
                            animate={{
                                strokeDashoffset: 339.292 * (1 - timeLeft / 15)
                            }}
                            transition={{ duration: 0.5, ease: "linear" }}
                            style={{
                                strokeDasharray: "339.292"
                            }}
                        />
                    </svg>
                    {/* Tiempo en el centro */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Clock size={16} className={`md:w-6 md:h-6 ${timeLeft < 5 ? "text-red-500" : "text-indigo-500"}`} />
                        <span className={`text-xl md:text-3xl font-bold ${timeLeft < 5 ? "text-red-500" : "text-indigo-600"}`}>
                            {timeLeft}
                        </span>
                        <span className="text-[10px] md:text-xs text-slate-400">seg</span>
                    </div>
                </div>

                <div className="text-center space-y-2 md:space-y-4 mb-2 md:mb-4">
                    <h2 className="text-lg md:text-3xl font-bold text-slate-800">{currentQuestion.question}</h2>
                </div>

                <div className="grid grid-cols-1 gap-2 md:gap-4 w-full">
                    {currentQuestion.options.map((option, index) => {
                        let stateClass = "bg-white border-slate-200 hover:border-primary-300";
                        if (selectedOption !== null) {
                            if (option === currentQuestion.answer) {
                                stateClass = "bg-green-100 border-green-500 text-green-700";
                            } else if (index === selectedOption) {
                                stateClass = "bg-red-100 border-red-500 text-red-700";
                            } else {
                                stateClass = "bg-slate-50 border-slate-100 opacity-50";
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option, index)}
                                disabled={!isActive}
                                className={`
                    p-3 md:p-6 rounded-xl md:rounded-2xl border-2 text-sm md:text-xl font-bold transition-all duration-200
                    ${stateClass}
                  `}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {selectedOption !== null && option === currentQuestion.answer && <CheckCircle size={16} className="md:w-6 md:h-6" />}
                                    {selectedOption === index && option !== currentQuestion.answer && <XCircle size={16} className="md:w-6 md:h-6" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="text-slate-400 text-xs md:text-sm font-medium">
                    Pregunta {currentIndex + 1} de {content.length}
                </div>
            </div>
        </div>
    );
};

export default SpeedQuiz;
