import ScrollReveal from './ScrollReveal';
import { eventConfig } from '../data/eventConfig';

const DateHighlight = () => {
  const { dateParts } = eventConfig;

  return (
    <ScrollReveal variant="scale" className="bg-ostion px-6 pb-12 text-center max-w-md mx-auto">
      <p className="font-cormorant text-7xl md:text-8xl font-bold text-olivo leading-none">
        {dateParts.day}
      </p>
      <p className="font-vibes text-4xl md:text-5xl text-olivo-oscuro my-2">{dateParts.month}</p>
      <p className="font-cormorant text-4xl md:text-5xl font-semibold text-olivo tracking-wider">
        {dateParts.year}
      </p>
    </ScrollReveal>
  );
};

export default DateHighlight;
