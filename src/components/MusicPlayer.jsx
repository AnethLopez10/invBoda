import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';
import { useHasScrolled } from '../hooks/useHasScrolled';
import { useMusic } from '../context/MusicContext';

const MusicPlayer = () => {
  const hasScrolled = useHasScrolled(120);
  const { isPlaying, hasAudio, togglePlay } = useMusic();

  if (!hasAudio) return null;

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: hasScrolled ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: hasScrolled ? 'auto' : 'none' }}
    >
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          isPlaying ? 'bg-olivo text-ostion' : 'bg-marfil/95 text-olivo border border-olivo/20'
        }`}
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? <Music size={18} /> : <VolumeX size={18} />}
      </motion.button>
    </motion.div>
  );
};

export default MusicPlayer;
