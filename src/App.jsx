import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';
import { AmbiencePlayer } from './components/AmbiencePlayer';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/antigravitymac">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
            {/* Redirect unknown routes to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>

        {/* Reproductor de música ambiente */}
        <AmbiencePlayer
          audioSrc="/antigravitymac/sounds/ambiencia-tranquila.mp3"
          defaultVolume={0.2}
        />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
