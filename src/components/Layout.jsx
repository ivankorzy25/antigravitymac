import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Trophy, Settings, Home } from 'lucide-react';

const Layout = ({ children }) => {
    const { currentCurriculum, currentGrade } = useLanguage();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-3 md:px-4 h-12 md:h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-1.5 md:gap-2 group">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-600 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
                            <BookOpen size={16} className="md:w-6 md:h-6" />
                        </div>
                        <span className="font-display font-bold text-base md:text-xl text-slate-800">
                            Lingua<span className="text-primary-600">Quest</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 md:gap-4">
                        {currentCurriculum && (
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-medium text-slate-600">
                                <span className="text-lg">{currentCurriculum.flag}</span>
                                <span>{currentCurriculum.name}</span>
                                <span className="text-slate-300">|</span>
                                <span className="text-primary-600">{currentGrade?.name}</span>
                            </div>
                        )}

                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-secondary-500 to-primary-500 p-0.5">
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                <span className="font-bold text-xs md:text-base text-slate-700">IK</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-5xl mx-auto w-full px-3 md:px-4 py-3 md:py-8">
                {children}
            </main>

            {/* Bottom Navigation (Mobile) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
                <div className="flex justify-around p-2">
                    <NavLink to="/" icon={<Home size={20} />} label="Inicio" active={isActive('/')} />
                    <NavLink to="/dashboard" icon={<BookOpen size={20} />} label="Aprender" active={isActive('/dashboard')} />
                    <NavLink to="/profile" icon={<Trophy size={20} />} label="Logros" active={isActive('/profile')} />
                </div>
            </nav>
        </div>
    );
};

const NavLink = ({ to, icon, label, active }) => (
    <Link to={to} className={`flex flex-col items-center gap-0.5 py-1 ${active ? 'text-primary-600' : 'text-slate-400'}`}>
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
    </Link>
);

export default Layout;
