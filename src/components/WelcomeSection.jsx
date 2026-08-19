import ScrollReveal from './ScrollReveal';
import { eventConfig } from '../data/eventConfig';

const WelcomeSection = () => {
  const { couple, welcomeMessage } = eventConfig;

  return (
    <ScrollReveal variant="up" className="bg-ostion px-6 py-12 text-center max-w-md mx-auto">
      <div className="relative mb-8 min-h-[100px] flex items-center justify-center">
        <p className="font-vibes text-4xl md:text-5xl text-olivo-oscuro -rotate-6 absolute left-4 top-0">
          {couple.shortBride}
        </p>
        <span className="font-cormorant text-2xl text-olivo/60 z-10">&</span>
        <p className="font-vibes text-4xl md:text-5xl text-olivo-oscuro rotate-6 absolute right-4 bottom-0">
          {couple.shortGroom}
        </p>
      </div>
      <p className="font-cormorant text-base md:text-lg text-olivo-oscuro/85 leading-relaxed italic max-w-sm mx-auto">
        {welcomeMessage}
      </p>
    </ScrollReveal>
  );
};

export default WelcomeSection;
