export function weddingImage(filename) {
  const base = filename.replace(/\.jpe?g$/i, '');
  return `/images/novios-webp/${base}.webp`;
}

export const CRITICAL_IMAGES = [
  weddingImage('IMG_8729.jpg'),
];
