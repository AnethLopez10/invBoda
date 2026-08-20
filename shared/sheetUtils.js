export function formatSheetLabel(guest) {
  return guest.count > 1 ? `${guest.name} (${guest.count})` : guest.name;
}

export function normalizeLabel(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function parseCountFromLabel(label) {
  const match = String(label || '').match(/\((\d+)\)\s*$/);
  return match ? Number(match[1]) : 1;
}
