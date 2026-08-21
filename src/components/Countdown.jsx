import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { ScrollRevealStagger, ScrollRevealItem } from './ScrollReveal';
import TexturedSection from './ui/TexturedSection';

const calculateTimeLeft = (target) => {
  const difference = new Date(target).getTime() - Date.now();
  if (difference <= 0) return null;
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const units = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Seg' },
];

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(eventConfig.countdownTarget)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventConfig.countdownTarget));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollRevealStagger as="section" className="w-full">
      <TexturedSection texture="fondo3" overlay={0.76} className="max-w-md mx-auto px-4 py-14 text-center">
        <ScrollRevealItem>
          <p className="font-cormorant text-lg md:text-xl font-semibold text-olivo uppercase tracking-[0.2em]">
            Tan solo
          </p>
          <p className="font-parisienne text-6xl md:text-7xl text-olivo-oscuro -mt-1 mb-10">faltan</p>
        </ScrollRevealItem>

        <ScrollRevealItem>
          {timeLeft ? (
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {units.map(({ key, label }) => (
                <div
                  key={key}
                  className="bg-marfil/70 backdrop-blur-sm border border-ostion-oscuro/50 rounded-xl px-3 py-4 md:py-5"
                >
                  {key === 'seconds' ? (
                    <motion.span
                      key={timeLeft.seconds}
                      animate={{ opacity: [1, 0.65, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="display-serif block text-5xl sm:text-6xl md:text-7xl"
                    >
                      {String(timeLeft[key]).padStart(2, '0')}
                    </motion.span>
                  ) : (
                    <span className="display-serif block text-5xl sm:text-6xl md:text-7xl">
                      {String(timeLeft[key]).padStart(2, '0')}
                    </span>
                  )}
                  <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-[0.25em] text-olivo/65 mt-2 block">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-parisienne text-5xl md:text-6xl text-olivo-oscuro">¡Hoy es el gran día!</p>
          )}
        </ScrollRevealItem>

        <ScrollRevealItem>
          <p className="font-cormorant text-sm uppercase tracking-[0.2em] text-olivo/70 mt-10">
            Para nuestro gran día
          </p>
        </ScrollRevealItem>
      </TexturedSection>
    </ScrollRevealStagger>
  );
};

export default Countdown;
