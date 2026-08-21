import { useEffect, useState } from 'react';
import { Send, CalendarClock, UserPlus, X, Loader2 } from 'lucide-react';
import { eventConfig, buildWhatsAppUrl, buildRsvpMessage } from '../data/eventConfig';
import { fetchConfirmations, submitRsvp } from '../api/rsvp';
import ScrollReveal from './ScrollReveal';
import WaxSeal from './ui/WaxSeal';
import WaveDivider from './ui/WaveDivider';
import GuestAutocomplete from './GuestAutocomplete';
import { OptimizedImage } from './OptimizedImage';
import TexturedSection from './ui/TexturedSection';

const emptyEntry = () => ({ text: '', guest: null });

const RsvpForm = () => {
  const [entries, setEntries] = useState([emptyEntry()]);
  const [confirmations, setConfirmations] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const { rsvp, photos } = eventConfig;

  useEffect(() => {
    fetchConfirmations()
      .then(setConfirmations)
      .catch(() => setConfirmations({}));
  }, []);

  const addNameField = () => setEntries((prev) => [...prev, emptyEntry()]);
  const removeNameField = (index) => {
    if (entries.length === 1) return;
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const updateEntry = (index, text, guest) => {
    setEntries((prev) => prev.map((entry, i) => (i === index ? { text, guest } : entry)));
  };

  const buildGuestPayload = (entry) => {
    if (entry.guest) {
      return {
        sheetLabel: entry.guest.sheetLabel,
        count: entry.guest.count,
        inputName: entry.guest.label,
        source: 'list',
      };
    }

    const trimmed = entry.text.trim();
    const countMatch = trimmed.match(/\((\d+)\)\s*$/);
    const count = countMatch ? Number(countMatch[1]) : 1;
    const nameWithoutCount = countMatch
      ? trimmed.replace(/\(\d+\)\s*$/, '').trim()
      : trimmed;

    return {
      sheetLabel: count > 1 ? `${nameWithoutCount} (${count})` : nameWithoutCount,
      count,
      inputName: trimmed,
      source: 'manual',
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filledEntries = entries.filter((entry) => entry.text.trim());
    if (filledEntries.length === 0) return;

    const filledNames = filledEntries.map((entry) => entry.text.trim()).join('\n');
    const message = buildRsvpMessage(filledNames);
    const whatsappUrl = buildWhatsAppUrl(rsvp.whatsapp, message);

    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const result = await submitRsvp(filledEntries.map(buildGuestPayload));
      const savedCount = (result.updated?.length || 0) + (result.appended?.length || 0);
      if (savedCount > 0) {
        setStatusMessage('Confirmación registrada en la lista de invitados.');
        const nextConfirmations = { ...confirmations };
        result.updated?.forEach((item) => {
          nextConfirmations[item.label] = item.count;
        });
        result.appended?.forEach((item) => {
          nextConfirmations[item.label] = item.count;
        });
        setConfirmations(nextConfirmations);
      } else if (result.errors?.length) {
        setStatusMessage('No se pudo registrar en la lista, pero puedes continuar por WhatsApp.');
      }
    } catch {
      setStatusMessage('No se pudo registrar en la lista, pero puedes continuar por WhatsApp.');
    } finally {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const hasValidNames = entries.some((entry) => entry.text.trim());

  return (
    <ScrollReveal variant="up" className="w-full">
      <div className="relative w-full aspect-[5/4] max-h-[320px] overflow-hidden">
        <OptimizedImage
          src={photos.rsvp}
          alt=""
          className="w-full h-full object-cover vintage-photo-filter"
          style={{ objectPosition: 'center 35%' }}
        />
        <WaveDivider className="absolute bottom-0 left-0 right-0" />
      </div>

      <TexturedSection texture="fondo4" overlay={0.82} className="px-4 py-10 max-w-md mx-auto">
        <div className="sealed-card p-6 pt-10 relative">
          <div className="absolute -top-7 left-1/2 -translate-x-1/2">
            <WaxSeal size={52} />
          </div>

          <h2 className="font-cormorant text-2xl font-semibold text-olivo-oscuro text-center mb-2">
            Confirma tu asistencia
          </h2>
          <p className="font-parisienne text-2xl text-olivo text-center mb-6">RSVP</p>

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
                {entries.map((entry, index) => (
                  <div key={index} className="flex gap-2">
                    <GuestAutocomplete
                      id={`guest-name-${index}`}
                      value={entry.text}
                      guest={entry.guest}
                      confirmations={confirmations}
                      onChange={(text, guest) => updateEntry(index, text, guest)}
                      placeholder={`Nombre o familia ${index + 1}`}
                    />
                    {entries.length > 1 && (
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

            {statusMessage && (
              <p className="font-cormorant text-sm text-olivo/80 text-center">{statusMessage}</p>
            )}

            <button
              type="submit"
              disabled={!hasValidNames || isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              Confirmar por WhatsApp
            </button>
          </form>
        </div>
      </TexturedSection>
    </ScrollReveal>
  );
};

export default RsvpForm;
