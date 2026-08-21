import { Heart } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import ScrollReveal from './ScrollReveal';
import TexturedSection from './ui/TexturedSection';

const Footer = () => {
  const { couple } = eventConfig;

  return (
    <ScrollReveal variant="fade" as="footer" className="w-full">
      <TexturedSection texture="fondo2" overlay={0.85} className="pt-10 pb-28 px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="vintage-divider mb-6" />
          <p className="font-parisienne text-4xl md:text-5xl text-olivo mb-4">Con amor,</p>
          <p className="font-cormorant text-xl text-olivo-oscuro mb-2">
            {couple.bride} & {couple.groom}
          </p>
          <div className="flex items-center justify-center gap-2 text-olivo/50 mt-6">
            <Heart size={16} fill="currentColor" />
            <span className="font-cormorant text-sm">2026</span>
            <Heart size={16} fill="currentColor" />
          </div>
        </div>
      </TexturedSection>
    </ScrollReveal>
  );
};

export default Footer;
