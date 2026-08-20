import { useEffect, useState } from 'react';
import { guestStats, allGuests, formatSheetLabel } from '../data/guestList';
import { fetchConfirmations } from '../api/rsvp';

const AdminGuestList = () => {
  const [confirmations, setConfirmations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfirmations()
      .then(setConfirmations)
      .catch(() => setConfirmations({}))
      .finally(() => setLoading(false));
  }, []);

  const confirmedCount = allGuests.filter(
    (guest) => confirmations[formatSheetLabel(guest)] != null
  ).length;

  return (
    <div className="min-h-screen bg-ostion p-6 max-w-3xl mx-auto">
      <h1 className="font-cormorant text-3xl font-bold text-olivo-oscuro mb-2">
        Lista de invitados
      </h1>
      <p className="font-cormorant text-olivo/70 mb-8">Uso interno — Marbella & Oscar</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="vintage-card p-4 text-center">
          <p className="font-cormorant text-2xl font-bold text-olivo">{guestStats.familiares}</p>
          <p className="font-cormorant text-sm text-olivo/60">Familiares</p>
        </div>
        <div className="vintage-card p-4 text-center">
          <p className="font-cormorant text-2xl font-bold text-olivo">{guestStats.amigos}</p>
          <p className="font-cormorant text-sm text-olivo/60">Amigos</p>
        </div>
        <div className="vintage-card p-4 text-center">
          <p className="font-cormorant text-2xl font-bold text-olivo">{guestStats.total}</p>
          <p className="font-cormorant text-sm text-olivo/60">Total invitados</p>
        </div>
        <div className="vintage-card p-4 text-center">
          <p className="font-cormorant text-2xl font-bold text-olivo">{confirmedCount}</p>
          <p className="font-cormorant text-sm text-olivo/60">Confirmados</p>
        </div>
      </div>

      {loading && (
        <p className="font-cormorant text-olivo/70 mb-4">Cargando confirmaciones...</p>
      )}

      <div className="vintage-card overflow-hidden">
        <table className="w-full font-cormorant text-sm">
          <thead>
            <tr className="bg-olivo/10 text-olivo-oscuro">
              <th className="text-left p-3 font-semibold">Nombre</th>
              <th className="text-left p-3 font-semibold">Categoría</th>
              <th className="text-right p-3 font-semibold">Cupo</th>
              <th className="text-right p-3 font-semibold">Confirmación</th>
            </tr>
          </thead>
          <tbody>
            {allGuests.map((guest, i) => {
              const sheetLabel = formatSheetLabel(guest);
              const confirmed = confirmations[sheetLabel];
              const isConfirmed = confirmed != null;

              return (
                <tr
                  key={`${guest.name}-${i}`}
                  className={`border-t border-ostion-oscuro/40 ${
                    isConfirmed ? 'bg-olivo/5' : ''
                  }`}
                >
                  <td className="p-3 text-olivo-oscuro">{guest.name}</td>
                  <td className="p-3 text-olivo/70">{guest.category}</td>
                  <td className="p-3 text-right text-olivo font-semibold">{guest.count}</td>
                  <td className="p-3 text-right font-semibold text-olivo-oscuro">
                    {isConfirmed ? confirmed : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.location.hash = '';
        }}
        className="inline-block mt-8 font-cormorant text-olivo underline"
      >
        Volver a la invitación
      </a>
    </div>
  );
};

export default AdminGuestList;
