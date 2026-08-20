import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import ScrollReveal from './ScrollReveal';
import { usePreloadImages } from '../hooks/usePreloadImages';

const AUTO_INTERVAL = 4000;

const PhotoSkeleton = () => (
  <div className="w-full h-full rounded-xl bg-ostion-oscuro/30 animate-pulse" />
);

const PhotoSlide = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [retried, setRetried] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoaded(false);
    setRetried(false);
  }, [src]);

  const handleError = () => {
    if (!retried) {
      setRetried(true);
      setImgSrc(`${src}?t=${Date.now()}`);
      return;
    }
    setHasError(true);
  };

  if (hasError) {
    return <PhotoSkeleton />;
  }

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0">
          <PhotoSkeleton />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="eager"
        decoding="async"
        draggable={false}
        fetchPriority="high"
        className={`w-full h-full object-cover rounded-xl vintage-photo-filter transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
      />
    </div>
  );
};

const stackVariants = (stackPos) => ({
  opacity: 1 - stackPos * 0.14,
  x: stackPos * 8,
  y: stackPos * 16,
  rotate: stackPos * (stackPos % 2 === 0 ? -2.5 : 2.5),
  scale: 1 - stackPos * 0.05,
});

const PhotoGallery = () => {
  const { gallery: photos, couple } = eventConfig;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  usePreloadImages(photos);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (isPaused || photos.length <= 1) return undefined;

    const timer = setInterval(goNext, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext, isPaused, photos.length]);

  const backIndices = [1, 2]
    .filter((pos) => pos < photos.length)
    .map((pos) => (currentIndex - pos + photos.length) % photos.length);

  return (
    <ScrollReveal variant="scale" className="max-w-md lg:max-w-2xl mx-auto px-4 py-12">
      <h2 className="section-title mb-2">Nosotros</h2>
      <p className="section-subtitle mb-8">Nuestra historia</p>

      <div
        className="relative mx-auto max-w-sm"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
      >
        <div className="relative aspect-[4/5] max-h-[420px]">
          {backIndices.map((photoIndex, i) => {
            const stackPos = i + 1;
            return (
              <motion.div
                key={`back-${stackPos}-${photoIndex}`}
                className="absolute inset-0 vintage-card p-2.5 pointer-events-none"
                style={{ zIndex: 3 - stackPos }}
                animate={stackVariants(stackPos)}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
                  <PhotoSlide
                    src={photos[photoIndex]}
                    alt={`${couple.bride} y ${couple.groom} - foto ${photoIndex + 1}`}
                  />
                </div>
              </motion.div>
            );
          })}

          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 vintage-card p-2.5"
              style={{ zIndex: 4 }}
              initial={{
                opacity: 0,
                x: direction > 0 ? 90 : -90,
                y: 20,
                rotate: direction > 0 ? 7 : -7,
                scale: 1.05,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -110 : 110,
                rotate: direction > 0 ? -8 : 8,
                scale: 0.9,
                transition: { duration: 0.4, ease: 'easeIn' },
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                <PhotoSlide
                  src={photos[currentIndex]}
                  alt={`${couple.bride} y ${couple.groom} - foto ${currentIndex + 1}`}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-1.5 mt-10">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label={`Ir a foto ${i + 1}`}
            >
              <motion.span
                className={`block rounded-full ${
                  i === currentIndex ? 'bg-olivo' : 'bg-olivo/25'
                }`}
                animate={{
                  width: i === currentIndex ? 20 : 8,
                  height: 8,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default PhotoGallery;
