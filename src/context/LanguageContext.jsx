import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRICULUM } from '../data/curriculum';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    // Estado inicial: intentar leer de localStorage o usar valores por defecto
    const [currentLanguageId, setCurrentLanguageId] = useState(() =>
        localStorage.getItem('lingua_lang') || 'en'
    );

    const [currentGradeId, setCurrentGradeId] = useState(() =>
        localStorage.getItem('lingua_grade') || 'grade_1'
    );

    // Progreso: { [lessonId]: { score: number, completed: boolean } }
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('lingua_progress');
        return saved ? JSON.parse(saved) : {};
    });

    const [achievements, setAchievements] = useState(() => {
        const saved = localStorage.getItem('lingua_achievements');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('lingua_lang', currentLanguageId);
    }, [currentLanguageId]);

    useEffect(() => {
        localStorage.setItem('lingua_grade', currentGradeId);
    }, [currentGradeId]);

    useEffect(() => {
        localStorage.setItem('lingua_progress', JSON.stringify(progress));
    }, [progress]);

    useEffect(() => {
        localStorage.setItem('lingua_achievements', JSON.stringify(achievements));
    }, [achievements]);

    const setLanguage = (langId) => {
        if (CURRICULUM[langId]) {
            setCurrentLanguageId(langId);
            // Resetear grado al cambiar idioma si el grado actual no existe (opcional, por ahora mantenemos simple)
        }
    };

    const setGrade = (gradeId) => {
        setCurrentGradeId(gradeId);
    };

    const completeLesson = (lessonId, score) => {
        setProgress(prev => ({
            ...prev,
            [lessonId]: {
                score,
                completed: true,
                timestamp: Date.now()
            }
        }));
    };

    const unlockAchievement = (id, title) => {
        if (!achievements.find(a => a.id === id)) {
            setAchievements(prev => [...prev, { id, title, date: Date.now() }]);
            return true; // New unlock
        }
        return false;
    };

    const currentCurriculum = CURRICULUM[currentLanguageId];
    const currentGrade = currentCurriculum?.grades.find(g => g.id === currentGradeId);

    const value = {
        currentLanguageId,
        currentGradeId,
        currentCurriculum,
        currentGrade,
        progress,
        setLanguage,
        setGrade,
        completeLesson,
        achievements,
        unlockAchievement,
        availableLanguages: Object.values(CURRICULUM).map(l => ({ id: l.id, name: l.name, flag: l.flag }))
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
