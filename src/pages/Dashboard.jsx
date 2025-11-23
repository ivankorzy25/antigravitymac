import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Lock, Play, CheckCircle, Save } from 'lucide-react';

const Dashboard = () => {
    const { currentCurriculum, currentGrade, progress } = useLanguage();
    const navigate = useNavigate();

    if (!currentCurriculum || !currentGrade) {
        return <div className="p-8 text-center">Cargando...</div>;
    }

    return (
        <div className="space-y-8">
            <header className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">
                        {currentGrade.name}
                    </h1>
                    <p className="text-slate-500">{currentGrade.description}</p>
                </div>
                <div className="text-right hidden md:block">
                    <div className="flex items-center gap-2 text-green-600 mb-1 justify-end">
                        <Save size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Progreso Guardado</span>
                    </div>
                    <div className="text-sm text-slate-400 uppercase font-bold tracking-wider">Progreso Total</div>
                    <div className="text-2xl font-bold text-primary-600">
                        {Math.round((currentGrade.units.reduce((acc, unit) =>
                            acc + unit.lessons.filter(l => progress[l.id]?.completed).length, 0) /
                            currentGrade.units.reduce((acc, unit) => acc + unit.lessons.length, 0)) * 100) || 0}%
                    </div>
                </div>
            </header>

            <div className="space-y-12">
                {currentGrade.units.map((unit, unitIndex) => (
                    <div key={unit.id} className="relative">
                        {/* Unit Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-400 shadow-sm">
                                {unitIndex + 1}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">{unit.name}</h2>
                        </div>

                        {/* Lessons Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4 md:pl-16">
                            {unit.lessons.map((lesson, lessonIndex) => {
                                const isCompleted = progress[lesson.id]?.completed;
                                const isLocked = unitIndex > 0 && !isCompleted; // Simple logic for now

                                return (
                                    <motion.div
                                        key={lesson.id}
                                        whileHover={!isLocked ? { y: -5 } : {}}
                                        className={`
                      group relative bg-white rounded-3xl p-6 border-2 transition-all duration-200
                      ${isCompleted
                                                ? 'border-green-500 shadow-green-100'
                                                : isLocked
                                                    ? 'border-slate-100 bg-slate-50 opacity-70'
                                                    : 'border-slate-100 hover:border-primary-300 hover:shadow-xl'
                                            }
                    `}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-primary-50 text-primary-600'}
                      `}>
                                                {isCompleted ? <CheckCircle size={20} /> : <Star size={20} />}
                                            </div>
                                            {isLocked && <Lock size={20} className="text-slate-300" />}
                                        </div>

                                        <h3 className="font-bold text-lg text-slate-800 mb-2">{lesson.title}</h3>
                                        <p className="text-sm text-slate-500 mb-6">{lesson.description}</p>

                                        <button
                                            disabled={isLocked}
                                            onClick={() => navigate(`/lesson/${lesson.id}`)}
                                            className={`
                        w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors
                        ${isLocked
                                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                    : 'bg-slate-900 text-white hover:bg-primary-600'
                                                }
                      `}
                                        >
                                            {isCompleted ? 'Repasar' : 'Jugar'}
                                            {!isLocked && <Play size={16} />}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
