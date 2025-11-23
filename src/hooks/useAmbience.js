import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export const useAmbience = (audioSrc, options = {}) => {
    const soundRef = useRef(null);
    const isInitializedRef = useRef(false);

    useEffect(() => {
        // Evitar inicializar dos veces en strict mode
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        soundRef.current = new Howl({
            src: [audioSrc],
            loop: true,
            volume: options.volume ?? 0.3,
            html5: true, // Usar HTML5 Audio para mejor compatibilidad
            onload: () => {
                console.log('✅ Audio cargado correctamente');
            },
            onplay: () => {
                console.log('▶️ Audio reproduciendo');
            },
            onpause: () => {
                console.log('⏸️ Audio pausado');
            },
            onfail: (id, error) => {
                console.error('❌ Error al cargar audio:', error);
            },
            onloaderror: (id, error) => {
                console.error('❌ Error de carga:', error);
            },
            onplayerror: (id, error) => {
                console.error('❌ Error de reproducción:', error);
                // Intentar desbloquear en el próximo click
                soundRef.current?.once('unlock', () => {
                    console.log('🔓 Audio desbloqueado, reintentando...');
                    soundRef.current?.play();
                });
            }
        });

        return () => {
            soundRef.current?.unload();
        };
    }, [audioSrc, options.volume]);

    const play = () => {
        if (soundRef.current) {
            const id = soundRef.current.play();
            console.log('🎵 Intentando reproducir, ID:', id);
            return id;
        }
    };

    const pause = () => soundRef.current?.pause();
    const stop = () => soundRef.current?.stop();
    const setVolume = (vol) => soundRef.current?.volume(vol);
    const isPlaying = () => soundRef.current?.playing() || false;

    return { play, pause, stop, setVolume, isPlaying };
};
