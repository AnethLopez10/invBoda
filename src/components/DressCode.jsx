import { eventConfig } from '../data/eventConfig';
import ScrollReveal from './ScrollReveal';
import TexturedSection from './ui/TexturedSection';

const DRESSCODE_IMAGE = '/images/fondos/dresscode-sf.PNG';

const DressCode = () => {
  const { dressCode } = eventConfig;

  return (
    <ScrollReveal variant="scale" className="w-full">
      <TexturedSection texture="fondo4" overlay={0.82} className="px-6 py-12 text-center max-w-md mx-auto">
        <p className="font-parisienne text-5xl md:text-6xl text-olivo-oscuro mb-6">{dressCode.title}</p>

        <p className="font-parisienne text-4xl md:text-5xl text-olivo-oscuro mb-4 px-2">
          Formal y elegante
        </p>

        <div className="mb-8 flex justify-center">
          <img
            src={DRESSCODE_IMAGE}
            alt="Formal y elegante"
            loading="lazy"
            className="w-full max-w-[320px] h-auto object-contain"
          />
        </div>

        <p className="font-cormorant text-sm uppercase tracking-[0.12em] text-olivo/70 mb-5 leading-relaxed">
          Colores reservados
          <br />
          No utilizar
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
      </TexturedSection>
    </ScrollReveal>
  );
};

export default DressCode;
