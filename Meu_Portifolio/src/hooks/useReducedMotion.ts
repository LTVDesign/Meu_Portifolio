import { useEffect } from 'react';

/**
 * Hook para detectar a preferência de redução de movimento do usuário
 * Respecta a configuração do sistema operacional: prefers-reduced-motion
 * NOTA: Este hook está desabilitado para forçar animações em todos os backgrounds
 */
export const useReducedMotion = (): boolean => {
  useEffect(() => {
    // Verificar se está no cliente
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Log para debug
      console.log('Preferência de movimento reduzido:', e.matches);
    };

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

  // SEMPRE retorna false para forçar animações
  return false;
};

export default useReducedMotion;
