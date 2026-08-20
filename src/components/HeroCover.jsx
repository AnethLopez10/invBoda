import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { OptimizedImage } from './OptimizedImage';

const HeroCover = () => {
  const { dateShort, heroPhoto } = eventConfig;

  return (
    <section className="relative w-full min-h-[85dvh] max-h-[700px] overflow-hidden">
      <OptimizedImage
        src={heroPhoto}
        alt=""
        priority
        className="absolute inset-0 w-full h-full object-cover vintage-photo-filter"
        style={{ objectPosition: 'center 40%' }}
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

        <div className="h-4" />
      </div>
    </section>
  );
};

export default HeroCover;
