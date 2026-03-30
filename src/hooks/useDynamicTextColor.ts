// src/hooks/useDynamicTextColor.ts
import { useMemo, useEffect, useRef } from 'react';
import { useParticleConfig } from '../contexts/ParticleConfigContext';
import { hexToRGB, getLuminance, adjustColorForContrast, getOptimalTextColor } from '../utils/contrastUtils';

export type ColorMode = 'auto' | 'dark' | 'light' | 'high-contrast';

export interface UseDynamicTextColorResult {
    color: string;
    luminance: number;
    backgroundColor: string;
    isDark: boolean;
}

export const useDynamicTextColor = (
    colorMode: ColorMode = 'auto',
    fallbackBgHex = '#050816'
): UseDynamicTextColorResult => {
    const { config } = useParticleConfig();

    // Função auxiliar para calcular luminância aproximada de hex
    const getApproxLuminance = (hex: string): number => {
        try {
            const rgb = hexToRGB(hex);
            return getLuminance(rgb.r, rgb.g, rgb.b);
        } catch {
            return 0;
        }
    };

    // Calcula a cor de fundo dominante baseada no tipo de background e configurações
    const currentBgHex = useMemo((): string => {
        const { backgroundType } = config;

        // Para background sólido, usa a cor principal ou calcula do gradiente
        if (backgroundType === 'solid') {
            // Verifica se é gradiente (não 'solid' puro)
            if (config.solidType !== 'solid') {
                // Calcula média ponderada das cores do gradiente
                const colors = [config.solidColor1, config.solidColor2, config.solidColor3].filter(Boolean);
                if (colors.length > 0) {
                    // Usa a cor mais escura como referência para contraste seguro
                    let darkestColor = colors[0];
                    let darkestLum = getApproxLuminance(colors[0]);
                    for (const color of colors) {
                        const lum = getApproxLuminance(color);
                        if (lum < darkestLum) {
                            darkestLum = lum;
                            darkestColor = color;
                        }
                    }
                    return darkestColor;
                }
            }
            return config.solidColor1 || fallbackBgHex;
        }

        // Para liquid, usa média das cores principais
        if (backgroundType === 'liquid') {
            const colors = [config.liquidColor1, config.liquidColor2, config.liquidColor3].filter(Boolean);
            if (colors.length > 0) {
                // Usa a cor mais escura como referência
                let darkestColor = colors[0];
                let darkestLum = getApproxLuminance(colors[0]);
                for (const color of colors) {
                    const lum = getApproxLuminance(color);
                    if (lum < darkestLum) {
                        darkestLum = lum;
                        darkestColor = color;
                    }
                }
                return darkestColor;
            }
            return fallbackBgHex;
        }

        // Para wavefield, usa cor principal
        if (backgroundType === 'wavefield') {
            return config.wavefieldColor || fallbackBgHex;
        }

        // Para particulate, usa cor principal
        if (backgroundType === 'particulate') {
            return config.particulateColor || fallbackBgHex;
        }

        // Para cyberpunk, usa cor escura base
        if (backgroundType === 'cyberpunk') {
            return '#1a0f2e';
        }

        // Para matrix, usa cor de fundo
        if (backgroundType === 'matrix') {
            return config.matrixBackgroundColor || '#001a00';
        }

        // Para bolhas e particles, usa cores escuras base
        if (backgroundType === 'bolhas') {
            return '#0a0820';
        }

        if (backgroundType === 'particles') {
            return '#1a1433';
        }

        if (backgroundType === 'particulate') {
            return '#050816';
        }

        return fallbackBgHex;
    }, [config, fallbackBgHex]);

    // Cálculo da cor do texto (memoizado forte)
    const result = useMemo((): UseDynamicTextColorResult => {
        const bgRGB = hexToRGB(currentBgHex);
        const bgLuminance = getLuminance(bgRGB.r, bgRGB.g, bgRGB.b);
        const isDark = bgLuminance < 0.5;

        let textHex = '#ffffff';

        if (colorMode === 'dark') {
            textHex = '#000000';
        } else if (colorMode === 'light') {
            textHex = '#ffffff';
        } else if (colorMode === 'high-contrast') {
            textHex = getOptimalTextColor(bgLuminance);
        } else {
            // modo 'auto' - contraste seguro com WCAG AA (4.5:1)
            textHex = adjustColorForContrast(currentBgHex, '#ffffff', 4.5);
        }

        return {
            color: textHex,
            luminance: bgLuminance,
            backgroundColor: currentBgHex,
            isDark,
        };
    }, [currentBgHex, colorMode]);

    // Atualiza variáveis CSS globais para uso em outros componentes
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--dynamic-text-color', result.color);
        root.style.setProperty('--dynamic-bg-color', result.backgroundColor);
        root.style.setProperty('--dynamic-text-is-dark', result.isDark ? 'true' : 'false');
    }, [result]);

    // Debug limitado (só 1x por segundo no máximo)
    const lastLog = useRef(0);
    useEffect(() => {
        if (Date.now() - lastLog.current > 1000) {
            lastLog.current = Date.now();
            console.log(`[DynamicTextColor] Background: ${config.backgroundType} | Cor: ${result.backgroundColor} | Texto: ${result.color} | Luminância: ${result.luminance.toFixed(3)} | Escuro: ${result.isDark}`);
        }
    }, [config.backgroundType, result]);

    return result;
};
