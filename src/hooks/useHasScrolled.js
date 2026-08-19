import { useState, useEffect } from 'react';

export function useHasScrolled(threshold = 80) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > threshold) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return hasScrolled;
}
