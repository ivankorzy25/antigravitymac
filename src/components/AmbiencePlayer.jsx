import { useState, useEffect } from 'react';
import { useAmbience } from '../hooks/useAmbience';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const AmbiencePlayer = ({ audioSrc, defaultVolume = 0.3 }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolumeState] = useState(defaultVolume);
    const { play, pause, setVolume, isPlaying: checkIsPlaying } = useAmbience(audioSrc, { volume: defaultVolume });

    useEffect(() => {
        console.log('🎼 AmbiencePlayer montado con audio:', audioSrc);
    }, [audioSrc]);

    // Verificar estado real cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            const playing = checkIsPlaying();
            if (playing !== isPlaying) {
                console.log('🔄 Estado actualizado:', playing);
                setIsPlaying(playing);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [checkIsPlaying, isPlaying]);

    const handlePlayPause = () => {
        console.log('🎯 Botón clickeado, isPlaying:', isPlaying);
        if (isPlaying) {
            console.log('⏸️ Pausando audio...');
            pause();
            setIsPlaying(false);
        } else {
            console.log('▶️ Reproduciendo audio...');
            play();
            // Verificar después de un momento si realmente está reproduciendo
            setTimeout(() => {
                const actuallyPlaying = checkIsPlaying();
                console.log('✓ Estado real después de play:', actuallyPlaying);
                setIsPlaying(actuallyPlaying);
            }, 100);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        console.log('🔊 Cambiando volumen a:', newVolume);
        setVolumeState(newVolume);
        setVolume(newVolume);
    };

    return (
        <div className="fixed bottom-6 right-6 bg-slate-900/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-[1000] border border-slate-700">
            <button
                onClick={handlePlayPause}
                className={`px-4 py-2 rounded-xl text-white font-bold text-sm transition-colors flex items-center gap-2 ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
            >
                {isPlaying ? (
                    <>
                        <Pause size={16} />
                        Pausar
                    </>
                ) : (
                    <>
                        <Play size={16} />
                        Reproducir
                    </>
                )}
            </button>

            <div className="flex items-center gap-3">
                {isPlaying ? <Volume2 size={16} className="text-green-400 animate-pulse" /> : <VolumeX size={16} className="text-slate-400" />}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-28 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="text-white text-xs font-medium min-w-[35px]">
                    {Math.round(volume * 100)}%
                </span>
            </div>
        </div>
    );
};
