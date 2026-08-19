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
        <p className="font-cormorant text-sm uppercase tracking-[0.3em] text-olivo mb-6">Code</p>
        <p className="font-cormorant text-lg uppercase tracking-[0.15em] text-olivo-oscuro mb-8">
          {dressCode.subtitle}
        </p>

        <div className="flex justify-center gap-4">
          {dressCode.colors.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full border border-olivo/20 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
              <span className="font-cormorant text-xs text-olivo/60">{color.name}</span>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default DressCode;
