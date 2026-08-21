import { Gift, Clock } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import ScrollReveal from './ScrollReveal';
import TexturedSection from './ui/TexturedSection';
import EmbossedCard from './ui/EmbossedCard';

const GiftRegistry = () => {
  const { giftRegistry } = eventConfig;
  const hasUrl = Boolean(giftRegistry.url);

  return (
    <ScrollReveal variant="up" className="w-full">
      <TexturedSection texture="fondo3" overlay={0.8} className="px-4 py-14 max-w-md mx-auto">
        <EmbossedCard className="p-8 text-center">
          <Gift className="text-olivo mx-auto mb-4" size={36} />
          <h2 className="font-parisienne text-4xl md:text-5xl text-olivo mb-2">{giftRegistry.label}</h2>
          <div className="h-px w-16 mx-auto bg-oro mb-6" />

          {hasUrl ? (
            <>
              <p className="font-cormorant text-olivo/80 mb-6 leading-relaxed">
                Tu presencia es nuestro mejor regalo, pero si deseas tener un detalle con nosotros,
                puedes consultar nuestra mesa de regalos.
              </p>
              <a href={giftRegistry.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Ver mesa de regalos
              </a>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 text-olivo/60 mb-3">
                <Clock size={20} />
                <span className="font-cormorant uppercase tracking-widest text-sm font-semibold">
                  Próximamente
                </span>
              </div>
              <p className="font-cormorant text-olivo/70 italic leading-relaxed">
                Muy pronto compartiremos el enlace a nuestra mesa de regalos.
              </p>
            </>
          )}
        </EmbossedCard>
      </TexturedSection>
    </ScrollReveal>
  );
};

export default GiftRegistry;
