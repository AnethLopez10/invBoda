import { guestStats, allGuests } from '../data/guestList';

const AdminGuestList = () => {
  return (
    <div className="min-h-screen bg-ostion p-6 max-w-3xl mx-auto">
      <h1 className="font-cormorant text-3xl font-bold text-olivo-oscuro mb-2">
        Lista de invitados
      </h1>
      <p className="font-cormorant text-olivo/70 mb-8">Uso interno — Marbella & Oscar</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
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
          <p className="font-cormorant text-sm text-olivo/60">Total</p>
        </div>
      </div>

      <div className="vintage-card overflow-hidden">
        <table className="w-full font-cormorant text-sm">
          <thead>
            <tr className="bg-olivo/10 text-olivo-oscuro">
              <th className="text-left p-3 font-semibold">Nombre</th>
              <th className="text-left p-3 font-semibold">Categoría</th>
              <th className="text-right p-3 font-semibold">Cupo</th>
            </tr>
          </thead>
          <tbody>
            {allGuests.map((guest, i) => (
              <tr key={`${guest.name}-${i}`} className="border-t border-ostion-oscuro/40">
                <td className="p-3 text-olivo-oscuro">{guest.name}</td>
                <td className="p-3 text-olivo/70">{guest.category}</td>
                <td className="p-3 text-right text-olivo font-semibold">{guest.count}</td>
              </tr>
            ))}
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
