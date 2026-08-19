import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);
  const audioRef = useRef(null);

  const togglePlay = useCallback(() => {
    if (!hasAudio || !audioRef.current) return;

    if (isPlaying) {
      const fadeOut = setInterval(() => {
        if (audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          audioRef.current.pause();
          audioRef.current.volume = 0.3;
          clearInterval(fadeOut);
          setIsPlaying(false);
        }
      }, 100);
    } else {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          const fadeIn = setInterval(() => {
            if (audioRef.current.volume < 0.3) {
              audioRef.current.volume += 0.05;
            } else {
              clearInterval(fadeIn);
            }
          }, 200);
        })
        .catch(() => {});
    }
  }, [hasAudio, isPlaying]);

  const handleAudioError = () => {
    setHasAudio(false);
    setIsPlaying(false);
  };

  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.3;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    };
    attemptAutoplay();
  }, []);

  return (
    <MusicContext.Provider value={{ isPlaying, hasAudio, togglePlay }}>
      <audio ref={audioRef} src="/musica.mp3" loop onError={handleAudioError} />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}
