import ScrollReveal from './ScrollReveal';
import TexturedSection from './ui/TexturedSection';
import CoupleNames from './CoupleNames';
import { eventConfig } from '../data/eventConfig';

const WelcomeSection = () => {
  const { welcomeMessage } = eventConfig;

  return (
    <ScrollReveal variant="up" className="w-full">
      <TexturedSection texture="fondo1" overlay={0.8} className="px-6 py-14 text-center max-w-md mx-auto">
        <CoupleNames variant="section" className="mb-8" />
        <p className="font-cormorant text-base md:text-lg text-olivo-oscuro/85 leading-relaxed italic max-w-sm mx-auto">
          {welcomeMessage}
        </p>
      </TexturedSection>
    </ScrollReveal>
  );
};

export default WelcomeSection;
