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
 *
 * @example
 * const { width, height } = useViewport();
 * // Use width/height para inicialização de canvas, etc.
 */
import { useState, useEffect } from 'react';

interface ViewportSize {
    width: number;
    height: number;
}

// Valores iniciais seguros para SSR
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;

// Singleton state para compartilhar entre todos os consumidores
let sharedState: ViewportSize = {
    width: typeof window !== 'undefined' ? window.innerWidth : DEFAULT_WIDTH,
    height: typeof window !== 'undefined' ? window.innerHeight : DEFAULT_HEIGHT,
};
let listeners: Set<(size: ViewportSize) => void> = new Set();
let isInitialized = false;
let rafId: number | null = null;
let observer: ResizeObserver | null = null;

// Função para atualizar todos os listeners
const notifyListeners = () => {
    listeners.forEach((listener) => listener(sharedState));
};

// Função para ler dimensões com RAF (evita layout thrashing)
const updateSizeWithRAF = () => {
    if (rafId !== null) {
        cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        // Só atualiza se houve mudança
        if (sharedState.width !== newWidth || sharedState.height !== newHeight) {
            sharedState = { width: newWidth, height: newHeight };
            notifyListeners();
        }
        rafId = null;
    });
};

// Inicialização única do listener global
const initializeGlobalListener = () => {
    if (isInitialized || typeof window === 'undefined') return;
    isInitialized = true;

    // Leitura inicial após mount
    updateSizeWithRAF();

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
    const [size, setSize] = useState<ViewportSize>(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : DEFAULT_WIDTH,
        height: typeof window !== 'undefined' ? window.innerHeight : DEFAULT_HEIGHT,
    }));

    useEffect(() => {
        // Inicializa o listener global se ainda não foi inicializado
        initializeGlobalListener();

        // Registra este componente como listener
        const handleUpdate = (newSize: ViewportSize) => {
            setSize(newSize);
        };
        listeners.add(handleUpdate);

        // Retorna o estado atual imediatamente se já foi inicializado
        if (sharedState.width !== size.width || sharedState.height !== size.height) {
            setSize(sharedState);
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
