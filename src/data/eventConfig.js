export const eventConfig = {
  couple: {
    bride: 'Marbella Montenegro',
    groom: 'Oscar Cerda',
    shortBride: 'Marbella',
    shortGroom: 'Oscar',
    monogram: 'MO',
  },
  date: '2026-11-14',
  dateFormatted: '14 de noviembre de 2026',
  dateShort: '14.11.2026',
  dateParts: {
    day: '14',
    month: 'Noviembre',
    year: '2026',
  },
  countdownTarget: '2026-11-14T17:00:00',
  welcomeMessage:
    'Hoy comienza un nuevo capítulo en nuestra historia, y sería un honor contar con tu presencia para celebrar este momento tan especial.',
  ceremony: {
    time: '17:00',
    place: 'Iglesia La Tercera Orden',
    address: 'Templo de la Tercera Orden',
    mapsUrl: 'https://maps.app.goo.gl/jCap7RzcCTU5fNWn7?g_st=ic',
  },
  reception: {
    time: '19:00',
    place: 'Quinta La Chilla',
    address: 'Jardín Quinta Chilla',
    mapsUrl: 'https://maps.app.goo.gl/uZTHpnSB7oBcTCTs9?g_st=ic',
  },
  rsvp: {
    deadline: '14 de octubre de 2026',
    whatsapp: '524443788703',
  },
  whatsapp: {
    number: '524443788703',
    defaultMessage:
      '¡Hola, Mar y Oscar! Con mucho gusto confirmamos nuestra asistencia a su boda.\n¡Nos vemos en su gran día! 💍🤍',
  },
  giftRegistry: {
    url: '',
    label: 'Mesa de regalos',
  },
  dressCode: {
    title: 'Dress Code',
    subtitle: 'Formal elegante',
    colors: [
      { name: 'Olivo', hex: '#6B7B3C' },
      { name: 'Ostión', hex: '#F5F0E8' },
      { name: 'Marfil', hex: '#FAFAF7' },
      { name: 'Tierra', hex: '#8B7355' },
    ],
  },
  invitationUrl: import.meta.env.VITE_INVITATION_URL || '',
  heroPhoto: '/images/novios/IMG_8729.jpg',
  heroPhotoAlt: '/images/novios/IMG_8801.jpg',
  photos: {
    banner1: '/images/novios/IMG_8805.jpg',
    banner2: '/images/novios/IMG_8731.jpg',
    dressCode: '/images/novios/IMG_8713.jpg',
    rsvp: '/images/novios/IMG_8801.jpg',
  },
  gallery: [
    '/images/novios/IMG_8729.jpg',
    '/images/novios/IMG_8713.jpg',
    '/images/novios/IMG_8805.jpg',
    '/images/novios/IMG_8801.jpg',
    '/images/novios/IMG_8725.jpg',
    '/images/novios/IMG_8731.jpg',
    '/images/novios/IMG_8850.jpg',
    '/images/novios/IMG_8998.jpg',
    '/images/novios/IMG_8865.jpg',
    '/images/novios/IMG_8932.jpg',
    '/images/novios/IMG_8983.jpg',
    '/images/novios/IMG_8795.jpg',
  ],
};

export function buildWhatsAppUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildRsvpMessage(names) {
  const trimmed = names.trim();
  if (!trimmed) {
    return eventConfig.whatsapp.defaultMessage;
  }
  return `¡Hola, Mar y Oscar!\n\nConfirmamos nuestra asistencia a su boda.\n\nAsistiremos:\n${trimmed}\n\n¡Nos vemos en su gran día! 💍🤍`;
}
