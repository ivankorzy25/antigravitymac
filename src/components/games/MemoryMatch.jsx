import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';


const MemoryMatch = ({ content, onComplete, onCorrectAnswer }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);

    useEffect(() => {
        const gameCards = [];
        content.forEach((item) => {
            gameCards.push({ id: `${item.id} -front`, contentId: item.id, text: item.front });
            gameCards.push({ id: `${item.id} -back`, contentId: item.id, text: item.back });
        });
        setCards(gameCards.sort(() => Math.random() - 0.5));
    }, [content]);

    useEffect(() => {
        if (matched.length === content.length && matched.length > 0) {
            setTimeout(() => onComplete(100), 500);
        }
    }, [matched, content.length, onComplete]);

    const handleClick = (cardId) => {
        if (flipped.length === 2 || flipped.includes(cardId) || matched.includes(cards.find(c => c.id === cardId).contentId)) {
            return;
        }

        const newFlipped = [...flipped, cardId];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            const firstCard = cards.find(c => c.id === first);
            const secondCard = cards.find(c => c.id === second);

            if (firstCard.contentId === secondCard.contentId) {
                setMatched([...matched, firstCard.contentId]);
                setFlipped([]);
                // Llamar a onCorrectAnswer cuando se encuentra un par
                if (onCorrectAnswer) {
                    onCorrectAnswer();
                }
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Instrucciones */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Cómo jugar - Memoria
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Haz clic en las tarjetas para revelar las palabras</li>
                    <li>• Encuentra los pares que coinciden (palabra en inglés con su traducción)</li>
                    <li>• Memoriza la ubicación de cada palabra</li>
                    <li>• ¡Encuentra todos los pares para completar el nivel!</li>
                </ul>
            </div>

            {/* Grid de tarjetas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {cards.map((card) => {
                    const isSelected = flipped.includes(card.id);
                    const isMatched = matched.includes(card.contentId);

                    return (
                        <motion.div
                            key={card.id}
                            className={`
                            aspect-[3/4] cursor-pointer rounded-2xl flex items-center justify-center p-4 text-center relative
                            transition-all duration-200
                            ${isMatched
                                    ? 'bg-green-50 border-4 border-green-400 shadow-lg'
                                    : isSelected
                                        ? 'bg-yellow-50 border-4 border-yellow-400 shadow-lg'
                                        : 'bg-white border-4 border-slate-300 shadow-md hover:shadow-xl hover:border-slate-400'
                                }
                        `}
                            onClick={() => handleClick(card.id)}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={`
                            font-bold text-lg md:text-xl select-none
                            ${isMatched ? 'text-green-700' : isSelected ? 'text-yellow-700' : 'text-slate-800'}
                        `}>
                                {card.text}
                            </span>
                            {isMatched && (
                                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                    <Check size={20} className="text-white" />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default MemoryMatch;
