import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { OptimizedImage } from './OptimizedImage';

const HeroCover = () => {
  const { dateShort, heroPhoto } = eventConfig;

  return (
    <section className="relative w-full min-h-[88dvh] max-h-[760px] overflow-hidden">
      <OptimizedImage
        src={heroPhoto}
        alt=""
        priority
        className="absolute inset-0 w-full h-full object-cover vintage-photo-filter"
        style={{ objectPosition: 'center 40%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/30" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[88dvh] max-h-[760px] py-10 px-4">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-cormorant text-sm md:text-base text-white/85 tracking-[0.35em] uppercase mb-6"
        >
          {dateShort}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 1 }}
          className="flex items-center justify-center w-full"
        >
          <span className="monogram-overlay text-[5rem] md:text-[7rem] leading-none flex items-center gap-1">
            <span>M</span>
            <span className="text-[3rem] md:text-[4rem] opacity-80">&</span>
            <span>O</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCover;
