import React from 'react';
import { motion } from 'framer-motion';

const CelebrationDog = () => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 mb-[-10px]"
        >
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <motion.ellipse
                    cx="110" cy="140" rx="50" ry="60"
                    fill="#22c55e"
                    animate={{ scaleY: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />

                {/* Belly spots */}
                <ellipse cx="110" cy="150" rx="30" ry="35" fill="#86efac" opacity="0.6" />

                {/* Head */}
                <motion.circle
                    cx="110" cy="80" r="40"
                    fill="#22c55e"
                    animate={{ rotate: [0, 3, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                />

                {/* Eyes */}
                <circle cx="95" cy="75" r="6" fill="#000" />
                <circle cx="125" cy="75" r="6" fill="#000" />
                <circle cx="97" cy="73" r="2" fill="#fff" />
                <circle cx="127" cy="73" r="2" fill="#fff" />

                {/* Snout */}
                <ellipse cx="110" cy="90" rx="12" ry="8" fill="#86efac" />

                {/* Nostrils */}
                <circle cx="105" cy="90" r="2" fill="#000" />
                <circle cx="115" cy="90" r="2" fill="#000" />

                {/* Happy mouth */}
                <motion.path
                    d="M 95 95 Q 110 105 125 95"
                    stroke="#000"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Spikes on back */}
                <motion.g
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                >
                    <path d="M 80 120 L 75 100 L 85 110 Z" fill="#16a34a" />
                </motion.g>
                <motion.g
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                >
                    <path d="M 95 115 L 90 95 L 100 105 Z" fill="#16a34a" />
                </motion.g>
                <motion.g
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                >
                    <path d="M 110 113 L 105 93 L 115 103 Z" fill="#16a34a" />
                </motion.g>
                <motion.g
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
                >
                    <path d="M 125 115 L 120 95 L 130 105 Z" fill="#16a34a" />
                </motion.g>
                <motion.g
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.8 }}
                >
                    <path d="M 140 120 L 135 100 L 145 110 Z" fill="#16a34a" />
                </motion.g>

                {/* Arms */}
                <motion.ellipse
                    cx="70" cy="140" rx="15" ry="25"
                    fill="#22c55e"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ originX: 0.5, originY: 0 }}
                />
                <motion.ellipse
                    cx="150" cy="140" rx="15" ry="25"
                    fill="#22c55e"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ originX: 0.5, originY: 0 }}
                />

                {/* Legs */}
                <ellipse cx="90" cy="190" rx="12" ry="20" fill="#22c55e" />
                <ellipse cx="130" cy="190" rx="12" ry="20" fill="#22c55e" />

                {/* Feet */}
                <ellipse cx="90" cy="205" rx="15" ry="8" fill="#16a34a" />
                <ellipse cx="130" cy="205" rx="15" ry="8" fill="#16a34a" />

                {/* Tail */}
                <motion.path
                    d="M 150 160 Q 170 150 175 170"
                    stroke="#22c55e"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{ originX: 0, originY: 0 }}
                />
            </svg>
            <div className="text-center font-bold text-green-600 bg-white/90 px-4 py-1 rounded-full shadow-sm border border-green-200 mt-2 mb-4">
                ¡Buen trabajo! ¡ROAR! 🦖
            </div>
        </motion.div>
    );
};

export default CelebrationDog;
