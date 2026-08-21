import { QRCodeSVG } from 'qrcode.react';
import { QrCode } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import ScrollReveal from './ScrollReveal';
import TexturedSection from './ui/TexturedSection';

const QrSection = () => {
  const qrUrl = eventConfig.invitationUrl;

  return (
    <ScrollReveal variant="scale" className="w-full">
      <TexturedSection texture="fondo1" overlay={0.8} className="max-w-md mx-auto px-4 py-14">
        <h2 className="section-title mb-2">Invitación Digital</h2>
        <p className="section-subtitle mb-8">Escanea para ver la invitación</p>

        <div className="vintage-card p-6 flex flex-col items-center">
          <QrCode className="text-olivo mb-4" size={28} />

          <div className="bg-white p-4 rounded-xl border border-ostion-oscuro/50 shadow-inner">
            <QRCodeSVG
              value={qrUrl}
              size={180}
              level="M"
              fgColor="#4A5530"
              bgColor="#FFFFFF"
              includeMargin={false}
            />
          </div>

          <p className="font-cormorant text-olivo/70 text-center mt-4 text-base">
            Comparte este código con quienes desees invitar
          </p>
        </div>
      </TexturedSection>
    </ScrollReveal>
  );
};

export default QrSection;
