import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { getRandomPenaltyQuestion } from '../data/penaltyQuestions';

const GlobalTimer = ({ duration = 180, onTimeUp, isPaused = false, resetTrigger = 0 }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [showPenalty, setShowPenalty] = useState(false);
    const [penaltyQuestion, setPenaltyQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    // Reiniciar el tiempo cuando cambia resetTrigger
    useEffect(() => {
        if (resetTrigger > 0) {
            setTimeLeft(duration);
        }
    }, [resetTrigger, duration]);

    useEffect(() => {
        if (isPaused || showPenalty) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isPaused, showPenalty]);

    const handleTimeUp = () => {
        const question = getRandomPenaltyQuestion();
        setPenaltyQuestion(question);
        setShowPenalty(true);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        const correct = answer === penaltyQuestion.answer;
        setIsCorrect(correct);

        if (correct) {
            setTimeout(() => {
                setShowPenalty(false);
                setTimeLeft(duration); // Reiniciar el tiempo
            }, 1500);
        }
    };

    const percentage = (timeLeft / duration) * 100;

    return (
        <>
            {/* Cronómetro fijo en la parte superior */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border-2 border-slate-200">
                <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center">
                        <svg className="transform -rotate-90" width="60" height="60">
                            <circle
                                cx="30"
                                cy="30"
                                r="26"
                                stroke="#e2e8f0"
                                strokeWidth="4"
                                fill="none"
                            />
                            <motion.circle
                                cx="30"
                                cy="30"
                                r="26"
                                stroke={timeLeft < 10 ? "#ef4444" : timeLeft < 20 ? "#f59e0b" : "#22c55e"}
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                                style={{
                                    strokeDasharray: "163.36",
                                    strokeDashoffset: 163.36 * (1 - percentage / 100)
                                }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Clock size={20} className={timeLeft < 10 ? "text-red-500" : timeLeft < 20 ? "text-amber-500" : "text-green-500"} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">Tiempo restante</span>
                        <span className={`text-3xl font-bold ${timeLeft < 10 ? "text-red-500 animate-pulse" : timeLeft < 20 ? "text-amber-500" : "text-green-600"}`}>
                            {timeLeft}s
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal de Penalización */}
            <AnimatePresence>
                {showPenalty && penaltyQuestion && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        >
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                    <AlertCircle size={32} className="text-red-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Tiempo agotado!</h2>
                                <p className="text-slate-600">Responde correctamente para continuar jugando</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">{penaltyQuestion.question}</h3>
                                <div className="space-y-3">
                                    {penaltyQuestion.options.map((option, index) => {
                                        let stateClass = "bg-white border-gray-300 rounded-lg shadow-sm hover:border-indigo-500";
                                        if (selectedAnswer !== null) {
                                            if (option === penaltyQuestion.answer) {
                                                stateClass = "bg-green-100 border-green-500 text-green-700";
                                            } else if (option === selectedAnswer) {
                                                stateClass = "bg-red-100 border-red-500 text-red-700";
                                            } else {
                                                stateClass = "bg-slate-50 border-slate-100 opacity-50";
                                            }
                                        }

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswerClick(option)}
                                                disabled={selectedAnswer !== null}
                                                className={`w-full p-4 rounded-lg border-2 font-bold transition-all text-lg ${stateClass} shadow`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{option}</span>
                                                    {selectedAnswer !== null && option === penaltyQuestion.answer && <CheckCircle size={20} />}
                                                    {selectedAnswer === option && option !== penaltyQuestion.answer && <XCircle size={20} />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {isCorrect === false && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                                    <p className="text-red-700 font-medium">❌ Incorrecto. Intenta de nuevo.</p>
                                </div>
                            )}

                            {isCorrect === true && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                                    <p className="text-green-700 font-medium">✅ ¡Correcto! Continuando...</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GlobalTimer;
