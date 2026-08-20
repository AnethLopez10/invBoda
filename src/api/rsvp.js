export async function fetchConfirmations() {
  const response = await fetch('/api/confirmations');
  if (!response.ok) {
    throw new Error('No se pudieron cargar las confirmaciones');
  }
  const data = await response.json();
  return data.confirmations || {};
}

export async function submitRsvp(guests) {
  const response = await fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guests }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'No se pudo registrar la confirmación');
  }

  return data;
}
