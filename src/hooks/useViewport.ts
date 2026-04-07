/**
* useViewport - Hook centralizado para leitura de dimensões do viewport
*
* Este hook resolve o problema de "layout thrashing" causado por múltiplas
* leituras síncronas de window.innerWidth/innerHeight durante a inicialização.
*
* Benefícios:
* - Usa requestAnimationFrame para batch de leituras (evita reflows forçados)
* - Usa ResizeObserver quando disponível (mais eficiente que resize event)
* - Valores iniciais seguros para SSR (1024x768)
* - Singleton pattern: apenas UM listener por página, compartilhado entre todos os componentes
* - Cache de dimensões para evitar leituras repetidas
*
* @example
* const { width, height } = useViewport();
* // Use width/height para inicialização de canvas, etc.
*/
import { useState, useEffect, useRef } from 'react';

interface ViewportSize {
    width: number;
    height: number;
}

// Valores iniciais seguros para SSR
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;

// Singleton state para compartilhar entre todos os consumidores
// NÃO lemos window.innerWidth aqui para evitar reflow na inicialização
let sharedState: ViewportSize = { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
let listeners: Set<(size: ViewportSize) => void> = new Set();
let isInitialized = false;
let rafId: number | null = null;
let observer: ResizeObserver | null = null;
let hasReadInitial: boolean = false;

// Função para atualizar todos os listeners
const notifyListeners = () => {
    listeners.forEach((listener) => listener(sharedState));
};

// Função para ler dimensões com RAF (evita layout thrashing)
const updateSizeWithRAF = () => {
    if (rafId !== null) return; // Se já há um frame agendado, não faz nada (throttling natural)

    rafId = requestAnimationFrame(() => {
        // Double RAF para garantir que estamos após o browser layout/paint
        requestAnimationFrame(() => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            // Só atualiza se houve mudança real
            if (sharedState.width !== newWidth || sharedState.height !== newHeight) {
                sharedState = { width: newWidth, height: newHeight };
                notifyListeners();
            }
            rafId = null;
        });
    });
};

// Inicialização única do listener global
const initializeGlobalListener = () => {
    if (isInitialized || typeof window === 'undefined') return;
    isInitialized = true;

    // Leitura inicial adiada para após o paint
    // Isso evita reflow síncrono durante a inicialização
    if (!hasReadInitial) {
        // Usa visualisViewport se disponível (mais eficiente)
        if (window.visualViewport) {
            sharedState = {
                width: Math.round(window.visualViewport.width),
                height: Math.round(window.visualViewport.height)
            };
        } else {
            sharedState = { width: window.innerWidth, height: window.innerHeight };
        }
        hasReadInitial = true;
    }

    // Prefer ResizeObserver se disponível (mais eficiente)
    if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(() => {
            updateSizeWithRAF();
        });
        observer.observe(document.documentElement);
    } else {
        // Fallback para resize event
        window.addEventListener('resize', updateSizeWithRAF, { passive: true });
    }
};

// Cleanup do listener global
const cleanupGlobalListener = () => {
    if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    if (observer) {
        observer.disconnect();
        observer = null;
    } else {
        window.removeEventListener('resize', updateSizeWithRAF);
    }
    isInitialized = false;
};

export function useViewport(): ViewportSize {
    // Estado inicial NÃO lê window para evitar reflow
    const [size, setSize] = useState<ViewportSize>(sharedState);
    const hasUpdatedRef = useRef(false);

    useEffect(() => {
        // Inicializa o listener global se ainda não foi inicializado
        initializeGlobalListener();

        // Registra este componente como listener
        const handleUpdate = (newSize: ViewportSize) => {
            setSize(newSize);
        };
        listeners.add(handleUpdate);

        // Atualiza com o estado atual se ainda não foi atualizado
        // Isso é feito de forma assíncrona para evitar reflow
        if (!hasUpdatedRef.current) {
            hasUpdatedRef.current = true;
            // Usa RAF para adiar a atualização
            requestAnimationFrame(() => {
                if (sharedState.width !== size.width || sharedState.height !== size.height) {
                    setSize(sharedState);
                }
            });
        }

        return () => {
            listeners.delete(handleUpdate);

            // Se não há mais listeners, cleanup do global
            if (listeners.size === 0) {
                cleanupGlobalListener();
            }
        };
    }, []);

    return size;
}

/**
 * Hook alternativo que retorna dimensões com DPR (Device Pixel Ratio)
 * Útil para canvas que precisam considerar densidade de pixels
 */
export function useViewportWithDPR(): ViewportSize & { dpr: number } {
    const { width, height } = useViewport();
    const [dpr, setDpr] = useState<number>(() =>
        typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);

        const handleDPRChange = () => {
            setDpr(Math.min(window.devicePixelRatio, 2));
        };

        // Alguns navegadores suportam addEventListener, outros usam addListener
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleDPRChange);
        } else {
            // @ts-ignore - Fallback para navegadores antigos
            mediaQuery.addListener(handleDPRChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleDPRChange);
            } else {
                // @ts-ignore - Fallback para navegadores antigos
                mediaQuery.removeListener(handleDPRChange);
            }
        };
    }, []);

    return { width, height, dpr };
}

export default useViewport;
