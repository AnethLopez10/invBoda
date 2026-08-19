import { Heart } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import ScrollReveal from './ScrollReveal';

const Footer = () => {
  const { couple } = eventConfig;

  return (
    <ScrollReveal variant="fade" as="footer" className="pt-8 pb-28 px-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="vintage-divider mb-6" />
        <p className="font-vibes text-3xl md:text-4xl text-olivo mb-4">Con amor,</p>
        <p className="font-cormorant text-xl text-olivo-oscuro mb-2">
          {couple.bride} & {couple.groom}
        </p>
        <div className="flex items-center justify-center gap-2 text-olivo/50 mt-6">
          <Heart size={16} fill="currentColor" />
          <span className="font-cormorant text-sm">2026</span>
          <Heart size={16} fill="currentColor" />
        </div>
      </div>
    </ScrollReveal>
  );
};

export default Footer;
