import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import MemoryMatch from '../components/games/MemoryMatch';
import DialogueTranslate from '../components/games/DialogueTranslate';
import SentenceBuilder from '../components/games/SentenceBuilder';
import SpeedQuiz from '../components/games/SpeedQuiz';
import GlobalTimer from '../components/GlobalTimer';

const LessonPage = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const { currentGrade, completeLesson } = useLanguage();
    const [lesson, setLesson] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [nextLesson, setNextLesson] = useState(null);
    // Eliminado correctAnswersCount y handleCorrectAnswer
    // Removed correctAnswersCount and handleCorrectAnswer


    useEffect(() => {
        if (currentGrade) {
            let foundLesson = null;
            let foundNext = null;
            let foundCurrent = false;

            for (const unit of currentGrade.units) {
                for (let i = 0; i < unit.lessons.length; i++) {
                    const l = unit.lessons[i];
                    if (foundCurrent && !foundNext) {
                        foundNext = l;
                        break;
                    }
                    if (l.id === lessonId) {
                        foundLesson = l;
                        foundCurrent = true;
                        if (i < unit.lessons.length - 1) {
                            foundNext = unit.lessons[i + 1];
                            break;
                        }
                    }
                }
                if (foundNext) break;
            }

            setLesson(foundLesson);
            setNextLesson(foundNext);
        }
    }, [currentGrade, lessonId]);

    const handleComplete = (score) => {
        completeLesson(lessonId, score);
        setShowSuccess(true);
    };

    // Función handleCorrectAnswer eliminada, el cronómetro se reinicia al cambiar lessonId

    if (!lesson) return <div className="p-8 text-center">Cargando lección...</div>;

    const GameComponent = {
        memory: MemoryMatch,
        sentence_builder: SentenceBuilder,
        speed_quiz: SpeedQuiz,
        dialogue_translate: DialogueTranslate
    }[lesson.type];

    if (!GameComponent) {
        return <div className="p-8 text-center text-red-500">Tipo de juego no reconocido: {lesson.type}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto relative">
            {/* Cronómetro Global */}
            <GlobalTimer duration={30} isPaused={showSuccess} resetTrigger={lessonId} />

            {showSuccess && (
                <div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
                    style={{ zIndex: 9999 }}
                >
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                        <div className="mb-6">
                            <CheckCircle size={80} className="mx-auto text-green-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-green-600 mb-4">¡Nivel Completado!</h2>
                        <p className="text-slate-600 mb-8">¡Excelente trabajo! Has dominado esta lección.</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    console.log('Continuar clicked');
                                    if (nextLesson) {
                                        window.location.href = `/lesson/${nextLesson.id}`;
                                    } else {
                                        window.location.href = '/dashboard';
                                    }
                                }}
                                className="w-full px-6 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                            >
                                {nextLesson ? 'Siguiente Nivel' : 'Finalizar'}
                                <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => {
                                    console.log('Volver clicked');
                                    window.location.href = '/dashboard';
                                }}
                                className="w-full px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
                            >
                                Volver al Menú
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <header className="mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2 rounded-full hover:bg-white/50 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="text-center flex-1">
                    <h1 className="text-2xl font-bold text-slate-900">{lesson.title}</h1>
                    <p className="text-slate-500">{lesson.description}</p>
                </div>
                <div className="w-10"></div>
            </header>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <GameComponent content={lesson.content} onComplete={handleComplete} />
            </div>
        </div>
    );
};

export default LessonPage;

