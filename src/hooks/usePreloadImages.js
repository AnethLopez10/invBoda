import { useEffect } from 'react';

export function usePreloadImages(urls) {
  useEffect(() => {
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [urls]);
}
