import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SatinBackground from './ui/SatinBackground';
import WaxSeal from './ui/WaxSeal';
import { eventConfig } from '../data/eventConfig';
import { useMusic } from '../context/MusicContext';

const STORAGE_KEY = 'invboda-envelope-opened-v2';

const EnvelopeIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('idle');
  const [visible, setVisible] = useState(true);
  const { playMusic } = useMusic();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setVisible(false);
      onComplete();
    }
  }, [onComplete]);

  const finishIntro = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
    onComplete();
  };

  const handleOpen = () => {
    if (phase !== 'idle') return;
    playMusic();

    const preload = (src) => {
      const img = new Image();
      img.src = src;
    };
    preload(eventConfig.heroPhoto);
    preload(eventConfig.photos.banner1);

    setPhase('opening');
    setTimeout(() => setPhase('card'), 700);
    setTimeout(() => setPhase('exit'), 2200);
    setTimeout(finishIntro, 3400);
  };

  if (!visible) return null;

  const { couple } = eventConfig;
  const isOpening = phase !== 'idle';
  const showCard = phase === 'card' || phase === 'exit';

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center min-h-[100dvh]"
      role="dialog"
      aria-label="Abrir invitación"
    >
      <SatinBackground className="absolute inset-0" />

      <div
        className="relative z-10 flex flex-col items-center justify-center w-full px-5 py-8 min-h-[100dvh]"
        style={{ perspective: 900 }}
      >
        <div className="relative w-full max-w-[320px] overflow-visible pb-16">
          {/* Carta — hermana del sobre, emerge hacia arriba */}
          <motion.div
            className="absolute left-3 right-3 bg-marfil rounded-sm shadow-xl p-5 text-center pointer-events-none"
            style={{ top: 80, zIndex: showCard ? 50 : 5 }}
            initial={{ y: 0, opacity: 0 }}
            animate={
              showCard
                ? { y: -130, opacity: 1, scale: 1 }
                : { y: 0, opacity: 0, scale: 0.96 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-vibes text-3xl text-olivo mb-1">Nos casamos</p>
            <p className="font-cormorant text-xs text-olivo-oscuro uppercase tracking-[0.2em]">
              {eventConfig.dateShort}
            </p>
          </motion.div>

          {/* Cuerpo del sobre */}
          <motion.div
            className="relative bg-olivo-oscuro rounded-sm shadow-2xl h-[240px]"
            animate={phase === 'exit' ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ zIndex: 10 }}
          >
            {/* Nombres en el cuerpo (no en la solapa) */}
            <p className="absolute bottom-8 left-0 right-0 text-center font-cormorant text-ostion/90 text-base tracking-wide px-4 z-10">
              {couple.shortBride} & {couple.shortGroom}
            </p>

            {/* Solapa */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                height: 140,
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                background: 'linear-gradient(180deg, #6B7B3C 0%, #4A5530 100%)',
                zIndex: 30,
              }}
              animate={{ rotateX: isOpening ? -175 : 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Sello */}
            <AnimatePresence>
              {phase === 'idle' && (
                <motion.button
                  type="button"
                  onClick={handleOpen}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50"
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.35 }}
                  aria-label="Abrir invitación"
                >
                  <WaxSeal size={60} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {phase === 'idle' && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={handleOpen}
            className="mt-8 min-h-[48px] px-10 py-3 rounded-full border-2 border-ostion/70
              text-ostion font-cormorant text-lg tracking-wide active:bg-ostion/15"
          >
            Abrir invitación
          </motion.button>
        )}

        {phase === 'idle' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 font-cormorant text-ostion/60 text-sm"
          >
            Toca el sello o el botón
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default EnvelopeIntro;
