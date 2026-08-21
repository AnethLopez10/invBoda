import ScrollReveal from './ScrollReveal';
import TexturedSection from './ui/TexturedSection';
import { eventConfig } from '../data/eventConfig';

const DateHighlight = () => {
  const { dateParts } = eventConfig;

  return (
    <ScrollReveal variant="scale" className="w-full">
      <TexturedSection texture="fondo2" overlay={0.78} className="px-6 py-14 text-center max-w-md mx-auto">
        <p className="display-serif text-7xl md:text-8xl">{dateParts.day}</p>
        <p className="font-parisienne text-5xl md:text-6xl text-olivo-oscuro my-1">{dateParts.month}</p>
        <p className="font-cormorant text-4xl md:text-5xl font-semibold text-olivo tracking-wider">
          {dateParts.year}
        </p>
      </TexturedSection>
    </ScrollReveal>
  );
};

export default DateHighlight;
