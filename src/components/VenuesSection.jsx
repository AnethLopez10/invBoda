import { MapPin, ExternalLink } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import SatinBackground from './ui/SatinBackground';
import EmbossedCard from './ui/EmbossedCard';
import ScrollReveal from './ScrollReveal';

const VenueBlock = ({ title, time, place, mapsUrl }) => (
  <div className="text-center py-6 border-b border-olivo/10 last:border-0">
    <p className="font-cormorant text-xs uppercase tracking-[0.2em] text-olivo/60 mb-2">
      {title}
    </p>
    <p className="font-cormorant text-2xl font-semibold text-olivo-oscuro mb-1">{time} hrs</p>
    <p className="font-cormorant text-lg text-olivo-oscuro/80 mb-4">{place}</p>
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2
        border border-olivo text-olivo font-cormorant text-sm uppercase tracking-wider
        hover:bg-olivo/5 transition-colors"
    >
      <MapPin size={16} />
      Ver mapa
      <ExternalLink size={14} />
    </a>
  </div>
);

const VenuesSection = () => {
  const { ceremony, reception } = eventConfig;

  return (
    <ScrollReveal variant="up" className="relative py-16 px-4">
      <SatinBackground className="absolute inset-0" />
      <div className="relative z-10 max-w-md mx-auto">
        <p className="font-cormorant text-xs uppercase tracking-[0.25em] text-ostion/70 text-center mb-6">
          Para nuestro gran día
        </p>

        <EmbossedCard className="p-8 md:p-10">
          <h2 className="font-vibes text-5xl text-olivo text-center mb-8">Sedes</h2>

          <VenueBlock
            title="Ceremonia religiosa"
            time={ceremony.time}
            place={ceremony.place}
            mapsUrl={ceremony.mapsUrl}
          />
          <VenueBlock
            title="Recepción"
            time={reception.time}
            place={reception.place}
            mapsUrl={reception.mapsUrl}
          />
        </EmbossedCard>
      </div>
    </ScrollReveal>
  );
};

export default VenuesSection;
