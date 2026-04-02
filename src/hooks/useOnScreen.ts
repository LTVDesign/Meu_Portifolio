import { type MutableRefObject, useEffect, useRef, useState } from 'react';

interface UseOnScreenOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export function useOnScreen<T extends Element>(
  ref: MutableRefObject<T | null>,
  options: UseOnScreenOptions = {}
) {
  const { rootMargin = '0px', threshold = 0 } = options;
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Cleanup observer anterior
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsOnScreen(isVisible);

        // Marcar como já foi visível pelo menos uma vez
        if (isVisible) {
          setHasBeenVisible(true);
        }
      },
      { rootMargin, threshold }
    );

    observerRef.current = observer;
    observer.observe(ref.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, rootMargin, threshold]);

  return { isOnScreen, hasBeenVisible };
}

export default useOnScreen;
