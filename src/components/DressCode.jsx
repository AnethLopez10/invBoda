import { eventConfig } from '../data/eventConfig';
import ScrollReveal from './ScrollReveal';
import WaveDivider from './ui/WaveDivider';

const DressCode = () => {
  const { dressCode, photos } = eventConfig;

  return (
    <ScrollReveal variant="scale" className="bg-ostion">
      <div className="relative w-full aspect-[5/4] max-h-[360px] overflow-hidden">
        <img
          src={photos.dressCode}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover vintage-photo-filter"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-x-0 bottom-0">
          <WaveDivider />
        </div>
      </div>

      <div className="px-6 py-12 text-center max-w-md mx-auto">
        <p className="font-vibes text-5xl md:text-6xl text-olivo-oscuro mb-1">{dressCode.title}</p>
        <p className="font-cormorant text-sm uppercase tracking-[0.3em] text-olivo mb-4">Code</p>
        <p className="font-cormorant text-lg uppercase tracking-[0.15em] text-olivo-oscuro mb-8">
          {dressCode.subtitle}
        </p>

        <p className="font-cormorant text-sm uppercase tracking-[0.12em] text-olivo/70 mb-5">
          Colores reservados — no utilizar
        </p>

        <div className="flex justify-center gap-8">
          {dressCode.reservedColors.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-full border-2 border-olivo/30 shadow-sm relative"
                style={{ backgroundColor: color.hex }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-white/90 text-lg font-bold">
                  ×
                </span>
              </div>
              <span className="font-cormorant text-sm text-olivo-oscuro font-medium">{color.name}</span>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default DressCode;
