import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SatinBackground from './ui/SatinBackground';
import WaxSeal from './ui/WaxSeal';
import { eventConfig } from '../data/eventConfig';

const STORAGE_KEY = 'invboda-envelope-opened-v2';

const EnvelopeIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('idle');
  const [visible, setVisible] = useState(true);

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
    setPhase('opening');
    setTimeout(() => setPhase('card'), 700);
    setTimeout(() => setPhase('exit'), 2000);
    setTimeout(finishIntro, 3200);
  };

  if (!visible) return null;

  const { couple } = eventConfig;
  const isOpening = phase === 'opening' || phase === 'card' || phase === 'exit';

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
        <motion.div
          className="relative w-full max-w-[320px]"
          animate={phase === 'exit' ? { opacity: 0, y: -50, scale: 0.92 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Cuerpo del sobre */}
          <div className="relative bg-olivo-oscuro rounded-sm shadow-2xl h-[220px] flex items-end justify-center pb-6">
            {/* Solapa */}
            <motion.div
              className="absolute top-0 left-0 right-0 z-30 origin-top"
              style={{
                height: 130,
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                background: 'linear-gradient(180deg, #6B7B3C 0%, #4A5530 100%)',
                transformStyle: 'preserve-3d',
              }}
              animate={{ rotateX: isOpening ? -175 : 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="absolute top-10 left-0 right-0 text-center font-cormorant text-ostion text-base tracking-wide px-4">
                {couple.shortBride} & {couple.shortGroom}
              </p>
            </motion.div>

            {/* Interior del sobre visible al abrir */}
            <div className="absolute inset-x-4 bottom-4 top-16 bg-olivo/40 rounded-sm" />

            {/* Sello */}
            <AnimatePresence>
              {phase === 'idle' && (
                <motion.button
                  type="button"
                  onClick={handleOpen}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40"
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.35 }}
                  aria-label="Abrir invitación"
                >
                  <WaxSeal size={60} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Carta que sale */}
            <motion.div
              className="absolute left-4 right-4 bg-marfil rounded-sm shadow-xl p-5 text-center z-20"
              style={{ top: 70 }}
              initial={{ y: 0, opacity: 0 }}
              animate={
                phase === 'card' || phase === 'exit'
                  ? { y: -100, opacity: 1, scale: 1 }
                  : { y: 10, opacity: 0, scale: 0.96 }
              }
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-vibes text-3xl text-olivo mb-1">Nos casamos</p>
              <p className="font-cormorant text-xs text-olivo-oscuro uppercase tracking-[0.2em]">
                {eventConfig.dateShort}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {phase === 'idle' && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={handleOpen}
            className="mt-14 min-h-[48px] px-10 py-3 rounded-full border-2 border-ostion/70
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
