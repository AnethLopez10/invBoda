import { eventConfig } from '../data/eventConfig';

const CoupleNames = ({ variant = 'section', className = '' }) => {
  const { shortBride, shortGroom } = eventConfig.couple;
  const isHero = variant === 'hero';

  return (
    <div
      className={`flex flex-col items-center text-center select-none ${className}`}
      aria-label={`${shortBride} y ${shortGroom}`}
    >
      <span
        className={`font-parisienne leading-[0.82] tracking-tight ${
          isHero
            ? 'text-[4.25rem] sm:text-[5.5rem] md:text-[7rem] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]'
            : 'text-[4rem] sm:text-[5rem] md:text-[6.5rem] text-olivo-oscuro'
        }`}
      >
        {shortBride}
      </span>

      <span
        className={`font-parisienne leading-none -my-1 ${
          isHero
            ? 'text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] text-white/90 pl-8 sm:pl-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]'
            : 'text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] text-olivo pl-6 sm:pl-10'
        }`}
      >
        &amp;
      </span>

      <span
        className={`font-parisienne leading-[0.82] tracking-tight -mt-1 ${
          isHero
            ? 'text-[4.25rem] sm:text-[5.5rem] md:text-[7rem] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]'
            : 'text-[4rem] sm:text-[5rem] md:text-[6.5rem] text-olivo-oscuro'
        }`}
      >
        {shortGroom}
      </span>
    </div>
  );
};

export default CoupleNames;
