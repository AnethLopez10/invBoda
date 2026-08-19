import { useState, useEffect } from 'react';
import { eventConfig } from '../data/eventConfig';
import { ScrollRevealStagger, ScrollRevealItem } from './ScrollReveal';

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
    <ScrollRevealStagger as="section" className="bg-ostion max-w-md mx-auto px-6 py-12 text-center">
      <ScrollRevealItem>
        <p className="font-cormorant text-2xl md:text-3xl font-semibold text-olivo uppercase tracking-[0.15em]">
          Tan solo
        </p>
        <p className="font-vibes text-4xl md:text-5xl text-olivo -mt-1 mb-8">faltan</p>
      </ScrollRevealItem>

      <ScrollRevealItem>
        {timeLeft ? (
          <>
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
              <span className="font-cormorant text-4xl md:text-5xl font-bold text-olivo-oscuro tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-olivo/40 text-2xl">:</span>
              <span className="font-cormorant text-4xl md:text-5xl font-bold text-olivo-oscuro tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-olivo/40 text-2xl">:</span>
              <span className="font-cormorant text-4xl md:text-5xl font-bold text-olivo-oscuro tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-olivo/40 text-2xl">:</span>
              <span className="font-cormorant text-4xl md:text-5xl font-bold text-olivo-oscuro tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <div className="flex justify-center gap-6 md:gap-10 mt-3 text-xs uppercase tracking-widest text-olivo/60">
              <span>Días</span>
              <span>Horas</span>
              <span>Min</span>
              <span>Seg</span>
            </div>
          </>
        ) : (
          <p className="font-vibes text-4xl text-olivo">¡Hoy es el gran día!</p>
        )}
      </ScrollRevealItem>

      <ScrollRevealItem>
        <p className="font-cormorant text-sm uppercase tracking-[0.2em] text-olivo/70 mt-10">
          Para nuestro gran día
        </p>
      </ScrollRevealItem>
    </ScrollRevealStagger>
  );
};

export default Countdown;
