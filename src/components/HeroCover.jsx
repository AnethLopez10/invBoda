import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import { useMusic } from '../context/MusicContext';

const HeroCover = () => {
  const { dateShort, heroPhoto } = eventConfig;
  const { isPlaying, hasAudio, togglePlay } = useMusic();

  return (
    <section className="relative w-full min-h-[85dvh] max-h-[700px] overflow-hidden">
      <img
        src={heroPhoto}
        alt=""
        className="absolute inset-0 w-full h-full object-cover vintage-photo-filter"
        style={{ objectPosition: 'center 40%' }}
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-between h-full min-h-[85dvh] max-h-[700px] py-8 px-4">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-cormorant text-lg md:text-xl text-white/95 tracking-[0.25em] uppercase mt-4"
        >
          {dateShort}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex-1 flex items-center justify-center"
        >
          <span className="monogram-overlay text-[5rem] md:text-[7rem] leading-none flex items-center gap-1">
            <span>M</span>
            <span className="text-[3rem] md:text-[4rem] opacity-80">&</span>
            <span>O</span>
          </span>
        </motion.div>

        {hasAudio && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-olivo text-ostion shadow-xl
              flex items-center justify-center -mb-7 z-20 border-4 border-ostion"
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          >
            {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default HeroCover;
