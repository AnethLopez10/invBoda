import { Gift } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import ScrollReveal from './ScrollReveal';
import TexturedSection from './ui/TexturedSection';
import EmbossedCard from './ui/EmbossedCard';

const GiftRegistry = () => {
  const { giftRegistry } = eventConfig;

  return (
    <ScrollReveal variant="up" className="w-full">
      <TexturedSection texture="fondo3" overlay={0.8} className="px-4 py-14 max-w-md mx-auto">
        <EmbossedCard className="p-8 text-center">
          <Gift className="text-olivo mx-auto mb-4" size={36} />
          <h2 className="font-parisienne text-4xl md:text-5xl text-olivo mb-2">{giftRegistry.label}</h2>
          <div className="h-px w-16 mx-auto bg-oro mb-6" />

          <p className="font-cormorant text-olivo/80 mb-6 leading-relaxed">
            Tu presencia es nuestro mejor regalo, pero si deseas tener un detalle con nosotros,
            puedes consultar nuestra mesa de regalos en Liverpool.
          </p>

          <div className="mb-6 p-4 bg-olivo/5 rounded border border-olivo/15">
            <p className="font-cormorant text-xs uppercase tracking-[0.2em] text-olivo/60 mb-2">
              Número de evento
            </p>
            <p className="font-cormorant text-3xl font-bold text-olivo-oscuro tracking-wider tabular-nums">
              {giftRegistry.eventNumber}
            </p>
          </div>

          <a
            href={giftRegistry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            Ir a mesa de regalos
          </a>

          <p className="font-cormorant text-sm text-olivo/60 mt-4 leading-relaxed">
            Ingresa el número de evento en la página de Liverpool para ver nuestra lista.
          </p>
        </EmbossedCard>
      </TexturedSection>
    </ScrollReveal>
  );
};

export default GiftRegistry;
