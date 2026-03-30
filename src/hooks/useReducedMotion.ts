import { useState, useEffect } from 'react';

/**
 * Hook para detectar a preferência de redução de movimento do usuário
 * Respecta a configuração do sistema operacional: prefers-reduced-motion
 */
export const useReducedMotion = (): boolean => {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        // Verificar se está no cliente
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReduced(e.matches);
        };

        // Valor inicial
        setPrefersReduced(mediaQuery.matches);

        // Adicionar listener para mudanças
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Fallback para browsers antigos
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    return prefersReduced;
};

export default useReducedMotion;
