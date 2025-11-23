import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Globe, GraduationCap, ArrowRight } from 'lucide-react';

const Home = () => {
    const {
        availableLanguages,
        currentLanguageId,
        setLanguage,
        currentCurriculum,
        currentGradeId,
        setGrade
    } = useLanguage();

    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 md:gap-8 py-3 md:py-8">
            {/* Hero Section */}
            <section className="text-center space-y-2 md:space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-6xl font-display font-bold text-slate-900"
                >
                    Aprende un idioma <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                        jugando y divirtiéndote
                    </span>
                </motion.h1>
                <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto">
                    Selecciona tu idioma y nivel para comenzar.
                </p>
            </section>

            {/* Language Selector */}
            <section className="space-y-3 md:space-y-6">
                <div className="flex items-center gap-2 text-slate-400 font-medium uppercase tracking-wider text-xs md:text-sm">
                    <Globe size={16} className="md:w-[18px] md:h-[18px]" />
                    <h2>Elige un idioma</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    {availableLanguages.map((lang) => (
                        <button
                            key={lang.id}
                            onClick={() => setLanguage(lang.id)}
                            className={`
                relative p-3 md:p-6 rounded-2xl md:rounded-3xl border-2 text-left transition-all duration-200 group
                ${currentLanguageId === lang.id
                                    ? 'border-primary-500 bg-primary-50 ring-2 md:ring-4 ring-primary-100'
                                    : 'border-slate-100 bg-white hover:border-primary-200 hover:shadow-lg'
                                }
              `}
                        >
                            <span className="text-2xl md:text-4xl mb-2 md:mb-4 block">{lang.flag}</span>
                            <h3 className="text-sm md:text-xl font-bold text-slate-800">{lang.name}</h3>
                            {currentLanguageId === lang.id && (
                                <div className="absolute top-3 md:top-6 right-3 md:right-6 w-2 md:w-3 h-2 md:h-3 bg-primary-500 rounded-full animate-pulse" />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grade Selector */}
            {currentCurriculum && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3 md:space-y-6"
                >
                    <div className="flex items-center gap-2 text-slate-400 font-medium uppercase tracking-wider text-xs md:text-sm">
                        <GraduationCap size={16} className="md:w-[18px] md:h-[18px]" />
                        <h2>Elige tu nivel</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                        {currentCurriculum.grades.map((grade) => (
                            <button
                                key={grade.id}
                                onClick={() => setGrade(grade.id)}
                                className={`
                  p-3 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-200 flex items-center justify-between
                  ${currentGradeId === grade.id
                                        ? 'border-secondary-500 bg-secondary-50 text-secondary-900'
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-secondary-300'
                                    }
                `}
                            >
                                <div className="text-left">
                                    <div className="font-bold text-sm md:text-lg">{grade.name}</div>
                                    <div className="text-xs md:text-sm opacity-80">{grade.description}</div>
                                </div>
                                {currentGradeId === grade.id && <div className="text-secondary-600 text-lg md:text-xl">●</div>}
                            </button>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* CTA */}
            <div className="flex justify-center pt-3 md:pt-8 pb-20 md:pb-4">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="btn-primary flex items-center gap-2 md:gap-3 text-base md:text-xl px-8 md:px-12 py-3 md:py-4"
                >
                    Comenzar Aventura
                    <ArrowRight size={20} className="md:w-6 md:h-6" />
                </button>
            </div>
        </div>
    );
};

export default Home;
