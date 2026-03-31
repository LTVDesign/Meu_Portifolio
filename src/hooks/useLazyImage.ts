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

    useEffect(() => {
        if (skip || !src) {
            setLoadedSrc(src);
            return;
        }

        // Se a imagem já está carregada, não precisa observar
        if (loadedSrc === src) return;

        const handleIntersection: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Quando a imagem entra na viewport, começa o carregamento
                    setIsLoading(true);
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        setLoadedSrc(src);
                        setIsLoading(false);
                    };
                    img.onerror = () => {
                        // Fallback para src original em caso de erro
                        setLoadedSrc(src);
                        setIsLoading(false);
                    };

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
    }, [src, skip, rootMargin, threshold, loadedSrc]);

    return [loadedSrc || src, isLoading, imgRef];
}

export default useLazyImage;