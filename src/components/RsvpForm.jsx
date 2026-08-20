import { useState } from 'react';
import { Send, CalendarClock, UserPlus, X } from 'lucide-react';
import { eventConfig, buildWhatsAppUrl, buildRsvpMessage } from '../data/eventConfig';
import ScrollReveal from './ScrollReveal';
import WaxSeal from './ui/WaxSeal';
import WaveDivider from './ui/WaveDivider';
import GuestAutocomplete from './GuestAutocomplete';

const RsvpForm = () => {
  const [names, setNames] = useState(['']);
  const { rsvp, photos } = eventConfig;

  const addNameField = () => setNames((prev) => [...prev, '']);
  const removeNameField = (index) => {
    if (names.length === 1) return;
    setNames((prev) => prev.filter((_, i) => i !== index));
  };
  const updateName = (index, value) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledNames = names.filter((n) => n.trim()).join('\n');
    const message = buildRsvpMessage(filledNames);
    window.open(buildWhatsAppUrl(rsvp.whatsapp, message), '_blank', 'noopener,noreferrer');
  };

  const hasValidNames = names.some((n) => n.trim());

  return (
    <ScrollReveal variant="up" className="bg-ostion">
      <div className="relative w-full aspect-[5/4] max-h-[320px] overflow-hidden">
        <img
          src={photos.rsvp}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover vintage-photo-filter"
          style={{ objectPosition: 'center 35%' }}
        />
        <WaveDivider className="absolute bottom-0 left-0 right-0" />
      </div>

      <div className="px-4 py-10 max-w-md mx-auto">
        <div className="sealed-card p-6 pt-10 relative">
          <div className="absolute -top-7 left-1/2 -translate-x-1/2">
            <WaxSeal size={52} />
          </div>

          <h2 className="font-cormorant text-2xl font-semibold text-olivo-oscuro text-center mb-2">
            Confirma tu asistencia
          </h2>
          <p className="font-vibes text-xl text-olivo text-center mb-6">RSVP</p>

          <div className="flex items-center gap-3 mb-6 p-3 bg-olivo/5 rounded border border-olivo/15">
            <CalendarClock className="text-olivo shrink-0" size={20} />
            <p className="font-cormorant text-sm text-olivo/80">
              Confirmar antes del{' '}
              <span className="font-semibold text-olivo-oscuro">{rsvp.deadline}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-cormorant text-olivo-oscuro font-semibold mb-3 text-sm">
                Nombre(s) o familia de quienes asistirán
              </label>
              <p className="font-cormorant text-xs text-olivo/60 mb-3">
                Escribe para buscar en la lista de invitados o agrega manualmente
              </p>
              <div className="space-y-3">
                {names.map((name, index) => (
                  <div key={index} className="flex gap-2">
                    <GuestAutocomplete
                      id={`guest-name-${index}`}
                      value={name}
                      onChange={(val) => updateName(index, val)}
                      placeholder={`Nombre o familia ${index + 1}`}
                    />
                    {names.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNameField(index)}
                        className="w-11 h-11 rounded border border-ostion-oscuro/60 flex items-center
                          justify-center text-olivo/60 hover:text-olivo shrink-0"
                        aria-label="Eliminar nombre"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addNameField}
                className="mt-3 flex items-center gap-2 text-olivo font-cormorant text-sm"
              >
                <UserPlus size={16} />
                Agregar otro nombre
              </button>
            </div>

            <button
              type="submit"
              disabled={!hasValidNames}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              Confirmar por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default RsvpForm;
