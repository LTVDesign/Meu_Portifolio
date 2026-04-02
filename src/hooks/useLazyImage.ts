import { useEffect, useRef, useState } from 'react';

interface UseLazyImageOptions {
  rootMargin?: string;
  threshold?: number;
  skip?: boolean;
}

export function useLazyImage(
  src: string,
  options: UseLazyImageOptions = {}
): [string, boolean, React.RefObject<HTMLImageElement>] {
  const { rootMargin = '100px', threshold = 0.01, skip = false } = options;
  const [loadedSrc, setLoadedSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    if (skip || !src) {
      setLoadedSrc(src);
      return;
    }

    // Se já carregamos esta src, não fazer nada
    if (hasLoadedRef.current && loadedSrc === src) {
      return;
    }

    const loadImage = () => {
      setIsLoading(true);
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedSrc(src);
        setIsLoading(false);
        hasLoadedRef.current = true;
      };
      img.onerror = () => {
        // Em caso de erro, ainda assim marcar como carregado para evitar loop
        setLoadedSrc(src);
        setIsLoading(false);
        hasLoadedRef.current = true;
      };
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();

          // Desconectar observer após disparar
          if (observerRef.current && imgRef.current) {
            observerRef.current.unobserve(imgRef.current);
          }
        }
      });
    };

    // Criar observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    // Observar elemento se existir
    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, skip, rootMargin, threshold]);

  return [loadedSrc || src, isLoading, imgRef];
}

export default useLazyImage;
