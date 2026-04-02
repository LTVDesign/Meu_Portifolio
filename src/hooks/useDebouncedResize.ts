/**
 * useDebouncedResize - Hook otimizado para resize com debounce via requestAnimationFrame
 * 
 * Este hook evita reflows forçados causados por múltiplas leituras de window.innerWidth
 * durante o resize. Usa requestAnimationFrame para sincronizar com o ciclo de renderização
 * do navegador, garantindo que apenas UMA leitura de layout ocorra por frame.
 * 
 * Benefits:
 * - Evita layout thrashing durante resize
 * - Sincroniza com o paint cycle do navegador
 * - Previne reflows forçados relatados pelo PageSpeed
 */
import { useState, useEffect, useRef } from 'react';

interface DebouncedResizeOptions {
    /** Delay do debounce em ms (padrão: 100ms) */
    debounceMs?: number;
    /** Se true, usa resizeObserver em vez de window resize */
    useResizeObserver?: boolean;
    /** Elemento alvo para ResizeObserver (padrão: none) */
    elementRef?: React.RefObject<HTMLElement | null>;
}

export function useDebouncedResize(
    options: DebouncedResizeOptions = {}
): { width: number; height: number } {
    const { debounceMs = 100, elementRef } = options;

    // Estado inicial seguro (SSR-safe)
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    // Refs para cleanup e debounce
    const rafRef = useRef<number | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dimensionsRef = useRef(dimensions);

    useEffect(() => {
        // Se temos um elementRef, usa ResizeObserver para observá-lo
        if (elementRef?.current) {
            const element = elementRef.current;
            const observer = new ResizeObserver((entries) => {
                // Debounce com timeout para evitar múltiplas atualizações
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                timeoutRef.current = setTimeout(() => {
                    const entry = entries[0];
                    if (entry) {
                        const newDimensions = {
                            width: Math.round(entry.contentRect.width),
                            height: Math.round(entry.contentRect.height),
                        };

                        // Só atualiza se mudou significativamente (evita micro-updates)
                        const prev = dimensionsRef.current;
                        if (
                            Math.abs(newDimensions.width - prev.width) > 1 ||
                            Math.abs(newDimensions.height - prev.height) > 1
                        ) {
                            dimensionsRef.current = newDimensions;
                            setDimensions(newDimensions);
                        }
                    }
                }, debounceMs);
            });

            observer.observe(element);

            return () => {
                observer.disconnect();
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }

        // Handler otimizado para window resize
        // Usa RAF para garantir leitura única por frame
        const handleResize = () => {
            // Cancela RAF anterior para evitar leituras duplicadas
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            // Schedule leitura no próximo frame
            rafRef.current = requestAnimationFrame(() => {
                const newDimensions = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };

                // Só atualiza se mudou significativamente (evita micro-updates)
                const prev = dimensionsRef.current;
                if (
                    Math.abs(newDimensions.width - prev.width) > 1 ||
                    Math.abs(newDimensions.height - prev.height) > 1
                ) {
                    dimensionsRef.current = newDimensions;
                    setDimensions(newDimensions);
                }

                rafRef.current = null;
            });
        };

        // Adiciona listener com passive: true para não bloquear scroll
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [debounceMs, elementRef]);

    return dimensions;
}

/**
 * Hook para obter breakpoints responsivos de forma otimizada
 * Evita múltiplas consultas de media query
 */
export function useBreakpoints() {
    const { width } = useDebouncedResize();

    return {
        width,
        isWatch: width < 280,
        isMobileSmall: width < 380,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
        isTV: width > 2560,
        // Para compatibilidade com código existente
        shouldShowDesktop: width >= 1024,
        shouldShowMobile: width < 1024,
    };
}

/**
 * Hook para ler dimensões de elemento sem causar reflow
 * Usa ResizeObserver que é assíncrono e não causa layout thrashing
 */
export function useElementDimensions(elementRef: React.RefObject<HTMLElement | null>) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                // ResizeObserver não causa reflow porque é assíncrono
                setDimensions({
                    width: Math.round(entry.contentRect.width),
                    height: Math.round(entry.contentRect.height),
                });
            }
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [elementRef]);

    return dimensions;
}

export default useDebouncedResize;