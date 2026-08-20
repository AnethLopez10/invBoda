import { createContext, useContext, useState, useRef, useCallback } from 'react';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);
  const audioRef = useRef(null);

  const playMusic = useCallback(() => {
    if (!hasAudio || !audioRef.current || isPlaying) return;

    audioRef.current.volume = 0;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        const fadeIn = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.3) {
            audioRef.current.volume = Math.min(0.3, audioRef.current.volume + 0.05);
          } else {
            clearInterval(fadeIn);
          }
        }, 200);
      })
      .catch(() => setIsPlaying(false));
  }, [hasAudio, isPlaying]);

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
      playMusic();
    }
  }, [hasAudio, isPlaying, playMusic]);

  const handleAudioError = () => {
    setHasAudio(false);
    setIsPlaying(false);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, hasAudio, togglePlay, playMusic }}>
      <audio ref={audioRef} src="/musica.mp3" loop preload="auto" onError={handleAudioError} />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}
