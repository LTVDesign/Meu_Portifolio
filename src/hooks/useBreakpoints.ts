/**
 * useBreakpoints - Hook para detecção de breakpoints responsivos
 *
 * Este hook utiliza o useViewport para obter as dimensões da tela
 * e retorna flags booleanas para diferentes tamanhos de dispositivo.
 *
 * @example
 * const { isMobile, isDesktop, width } = useBreakpoints();
 */
import { useViewport } from './useViewport';

export function useBreakpoints() {
    const { width, height } = useViewport();

    // Retorna objeto direto para evitar problemas de React queue
    return {
        width,
        height,
        // Watch/very small devices
        isWatch: width < 280,
        // Mobile pequeno
        isMobileSmall: width < 380,
        // Mobile em geral
        isMobile: width < 640,
        // Tablet
        isTablet: width >= 640 && width < 1024,
        // Desktop
        isDesktop: width >= 1024,
        // TV/monitores grandes
        isTV: width > 2560,
        // Para compatibilidade com código existente
        shouldShowDesktop: width >= 1024,
        shouldShowMobile: width < 1024,
    };
}

export default useBreakpoints;
