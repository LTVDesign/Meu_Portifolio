import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
    getLuminance,
    isDarkBackground,
    getComplementaryColor,
    getContrastRatio,
    getOptimalTextColor,
} from '../utils/contrastUtils';

/**
 * Tipos para o hook useDynamicTextColor
 */
export type BackgroundType = 'solid' | 'gradient' | 'image' | 'mixed' | 'transparent';

export interface UseDynamicTextColorOptions {
    /**
     * Resolução do canvas para amostragem de imagens/gradientes
     * @default 16
     */
    sampleSize?: number;

    /**
     * Intervalo mínimo entre atualizações (ms)
     * @default 100
     */
    updateInterval?: number;

    /**
     * Modo de fallback quando a detecção falha
     * @default 'auto'
     */
    fallbackMode?: 'dark' | 'light' | 'auto';

    /**
     * Callback para obter o renderer Three.js (para R3F)
     * Opcional - só necessário se estiver usando React Three Fiber
     */
    threeRenderer?: () => THREE.WebGLRenderer | null;
}

export interface UseDynamicTextColorResult {
    /**
     * Cor de texto recomendada (hex)
     */
    textColor: string;

    /**
     * Cor de fundo detectada (hex)
     */
    backgroundColor: string;

    /**
     * Indica se o fundo é considerado escuro
     */
    isDark: boolean;

    /**
     * Indica se o fundo é colorido/misto (não sólido simples)
     */
    isColorful: boolean;

    /**
     * Tipo de fundo detectado
     */
    backgroundType: BackgroundType;

    /**
     * Luminância da cor de fundo (0-1)
     */
    luminance: number;
}

/**
 * Constante para limite de profundidade na árvore DOM
 */
const MAX_DEPTH = 50;

/**
 * Hook para detecção inteligente de cor de fundo e cálculo de cor de texto ótima
 *
 * @param ref - Referência para o elemento cujo fundo será analisado
 * @param options - Opções de configuração
 * @returns Objeto com cores e metadados de análise
 *
 * @example
 * ```tsx
 * const { textColor, backgroundColor, isDark } = useDynamicTextColor(ref, {
 *   sampleSize: 32,
 *   updateInterval: 200,
 *   fallbackMode: 'auto'
 * });
 *
 * return <div ref={ref} style={{ color: textColor, backgroundColor }}>...</div>;
 * ```
 */
export function useDynamicTextColor(
    ref: React.RefObject<HTMLElement>,
    options: UseDynamicTextColorOptions = {}
): UseDynamicTextColorResult {
    const {
        sampleSize = 16,
        updateInterval = 100,
        fallbackMode = 'auto',
        threeRenderer,
    } = options;

    // Estados
    const [textColor, setTextColor] = useState<string>('#000000');
    const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
    const [isDark, setIsDark] = useState<boolean>(false);
    const [isColorful, setIsColorful] = useState<boolean>(false);
    const [backgroundType, setBackgroundType] = useState<BackgroundType>('solid');
    const [luminance, setLuminance] = useState<number>(1);

    // Refs para controle de performance
    const rafRef = useRef<number | null>(null);
    const lastUpdateRef = useRef<number>(0);
    const lastTextColorRef = useRef<string>('');
    const lastBgColorRef = useRef<string>('');
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const mutationObserverRef = useRef<MutationObserver | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const timeoutRef = useRef<number | null>(null);
    const isMountedRef = useRef<boolean>(true);

    /**
     * Obtém a cor de fallback baseada no modo
     */
    const getFallbackColor = useCallback((mode: typeof fallbackMode): { bg: string; text: string } => {
        if (mode === 'auto') {
            // Para 'auto', retorna cinza médio como cor neutra
            return { bg: '#808080', text: '#ffffff' };
        }
        return mode === 'dark'
            ? { bg: '#1a1a1a', text: '#ffffff' }
            : { bg: '#ffffff', text: '#000000' };
    }, []);

    /**
     * Converte cor CSS para RGB
     */
    const parseColorToRGB = useCallback((cssColor: string): { r: number; g: number; b: number; a?: number } | null => {
        if (!cssColor || cssColor === 'transparent' || cssColor === 'rgba(0, 0, 0, 0)') {
            return null;
        }

        // Cria elemento temporário para conversão
        const temp = document.createElement('div');
        temp.style.color = cssColor;
        document.body.appendChild(temp);
        const computed = getComputedStyle(temp).color;
        document.body.removeChild(temp);

        // Regex melhorado: aceita espaços opcionais e valores de 1-3 dígitos
        const matchRgb = computed.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
        if (matchRgb) {
            return {
                r: parseInt(matchRgb[1], 10),
                g: parseInt(matchRgb[2], 10),
                b: parseInt(matchRgb[3], 10),
            };
        }

        // Regex melhorado para rgba: captura alpha e valida se > 0
        const matchRgba = computed.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)$/);
        if (matchRgba) {
            const alpha = parseFloat(matchRgba[4]);
            // Só retorna se alpha > 0, caso contrário é transparente
            if (alpha > 0) {
                return {
                    r: parseInt(matchRgba[1], 10),
                    g: parseInt(matchRgba[2], 10),
                    b: parseInt(matchRgba[3], 10),
                    a: alpha,
                };
            }
            return null;
        }

        // Tenta hex
        if (computed.startsWith('#')) {
            try {
                const hex = computed.replace(/^#/, '');
                const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
                const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
                const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
                return { r, g, b };
            } catch {
                return null;
            }
        }

        return null;
    }, []);

    /**
     * RGB para hex
     */
    const rgbToHex = useCallback((r: number, g: number, b: number): string => {
        const toHex = (n: number): string => {
            const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }, []);

    /**
     * Amostra cor média de um elemento usando canvas (img e canvas)
     */
    const sampleColorFromElement = useCallback((element: HTMLElement): string | null => {
        if (!element) return null;

        try {
            // Inicializa canvas se necessário
            if (!canvasRef.current) {
                canvasRef.current = document.createElement('canvas');
                ctxRef.current = canvasRef.current.getContext('2d', { willReadFrequently: true });
            }

            const canvas = canvasRef.current;
            const ctx = ctxRef.current;
            if (!ctx) return null;

            // Ajusta tamanho do canvas
            const rect = element.getBoundingClientRect();
            const width = Math.min(rect.width, 1000);
            const height = Math.min(rect.height, 1000);

            if (width <= 0 || height <= 0) return null;

            canvas.width = sampleSize;
            canvas.height = sampleSize;

            // Tenta desenhar imagens do elemento no canvas
            const images = element.querySelectorAll('img');
            if (images.length > 0) {
                const img = images[0] as HTMLImageElement;
                if (img.complete && img.naturalWidth > 0) {
                    try {
                        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
                    } catch {
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                const canvasChildren = element.querySelectorAll('canvas');
                if (canvasChildren.length > 0) {
                    try {
                        ctx.drawImage(canvasChildren[0] as HTMLCanvasElement, 0, 0, sampleSize, sampleSize);
                    } catch {
                        return null;
                    }
                } else {
                    return null;
                }
            }

            // Obtém dados de pixel
            const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
            const data = imageData.data;

            let totalR = 0, totalG = 0, totalB = 0, count = 0;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                if (a > 0) {
                    totalR += r;
                    totalG += g;
                    totalB += b;
                    count++;
                }
            }

            if (count === 0) return null;

            return rgbToHex(
                Math.round(totalR / count),
                Math.round(totalG / count),
                Math.round(totalB / count)
            );
        } catch {
            return null;
        }
    }, [sampleSize, rgbToHex]);

    /**
     * Amostra cor de background-image CSS (gradientes e imagens)
     */
    const sampleFromCSSBackground = useCallback((element: HTMLElement): string | null => {
        if (!element) return null;

        try {
            const style = getComputedStyle(element);
            const bgImage = style.backgroundImage;

            if (!bgImage || bgImage === 'none') {
                return null;
            }

            // Se for gradiente CSS, extrai cores diretamente
            if (bgImage.includes('gradient')) {
                // Regex melhorada: captura #RGB, #RRGGBB, #RGBA, #RRGGBBAA, rgb(), rgba()
                const colorRegex = /(#[a-fA-F0-9]{3,8})|(rgb\(\s*[\d,]+\s*\))|(rgba\(\s*[\d.,]+\s*\))/g;
                const colors = bgImage.match(colorRegex) || [];

                // Pega a primeira cor não transparente
                for (const color of colors) {
                    const rgb = parseColorToRGB(color);
                    if (rgb) {
                        return rgbToHex(rgb.r, rgb.g, rgb.b);
                    }
                }

                // Se não encontrou cores válidas, tenta extrair stops do gradient
                const stopRegex = /(?:to|at)\s+[^,]+,\s*([^;)]+)/g;
                const stops = [];
                let match;
                while ((match = stopRegex.exec(bgImage)) !== null) {
                    stops.push(match[1].trim());
                }

                for (const stop of stops) {
                    const rgb = parseColorToRGB(stop);
                    if (rgb) {
                        return rgbToHex(rgb.r, rgb.g, rgb.b);
                    }
                }

                return null;
            }

            // Para imagens via URL (incluindo data URI), retorna null
            // Pois requer carregamento assíncrono que não se adequa ao fluxo síncrono
            return null;
        } catch {
            return null;
        }
    }, [parseColorToRGB, rgbToHex]);

    /**
     * Amostra cor do renderer Three.js
     */
    const sampleColorFromThreeRenderer = useCallback((): string | null => {
        if (!threeRenderer) return null;

        try {
            const renderer = threeRenderer();
            if (!renderer) return null;

            const width = renderer.domElement.width;
            const height = renderer.domElement.height;
            if (width <= 0 || height <= 0) return null;

            const currentRenderTarget = renderer.getRenderTarget();
            if (!currentRenderTarget) {
                const canvas = renderer.domElement as HTMLCanvasElement;
                const ctx = canvas.getContext('2d');
                if (!ctx) return null;

                const pixel = ctx.getImageData(Math.floor(width / 2), Math.floor(height / 2), 1, 1).data;
                // Validação: verifica se pixel tem pelo menos 4 valores e alpha > 0
                if (pixel.length >= 4 && pixel[3] > 0) {
                    return rgbToHex(pixel[0], pixel[1], pixel[2]);
                }
                return null;
            }

            const pixels = new Uint8Array(4);
            renderer.readRenderTargetPixels(
                currentRenderTarget,
                Math.floor(width / 2),
                Math.floor(height / 2),
                1,
                1,
                pixels
            );

            // Validação: verifica se pixel tem pelo menos 4 valores e alpha > 0
            if (pixels.length >= 4 && pixels[3] > 0) {
                return rgbToHex(pixels[0], pixels[1], pixels[2]);
            }
            return null;
        } catch {
            return null;
        }
    }, [threeRenderer, rgbToHex]);

    /**
     * Sobe a árvore DOM para encontrar cor de fundo sólida
     */
    const findSolidBackgroundColor = useCallback((element: HTMLElement | null): string | null => {
        if (!element) return null;

        let current: HTMLElement | null = element;
        let depth = 0;

        while (current && depth < MAX_DEPTH) {
            const style = getComputedStyle(current);
            const bgColor = style.backgroundColor;

            // Verifica se é uma cor sólida (não transparente)
            const rgb = parseColorToRGB(bgColor);
            if (rgb) {
                return rgbToHex(rgb.r, rgb.g, rgb.b);
            }

            // Se for transparente, sobe para o pai
            current = current.parentElement;
            depth++;
        }

        return null;
    }, [parseColorToRGB, rgbToHex]);

    /**
     * Detecta o tipo de fundo e retorna a cor representativa
     */
    const detectBackground = useCallback((
        element: HTMLElement
    ): { color: string; type: BackgroundType } => {
        // 1. Tenta obter cor sólida direta
        const style = getComputedStyle(element);
        const bgColor = style.backgroundColor;
        const bgImage = style.backgroundImage;

        // Se tem background-image (gradiente ou imagem)
        if (bgImage && bgImage !== 'none') {
            const type: BackgroundType = bgImage.includes('url') ? 'image' : 'gradient';

            // Primeiro tenta amostrar via CSS background
            const cssSampledColor = sampleFromCSSBackground(element);
            if (cssSampledColor) {
                return { color: cssSampledColor, type };
            }

            // Depois tenta amostrar elemento (img/canvas filhos)
            const sampledColor = sampleColorFromElement(element);
            if (sampledColor) {
                return { color: sampledColor, type };
            }

            // Fallback: extrai cor do gradiente se possível
            if (type === 'gradient') {
                // Regex melhorada: captura #RGB, #RRGGBB, #RGBA, #RRGGBBAA, rgb(), rgba()
                const colorRegex = /(#[a-fA-F0-9]{3,8})|(rgb\(\s*[\d,]+\s*\))|(rgba\(\s*[\d.,]+\s*\))/g;
                const colors = bgImage.match(colorRegex) || [];

                // Filtra cores válidas e pega a primeira não transparente
                for (const color of colors) {
                    const rgb = parseColorToRGB(color);
                    if (rgb) {
                        return { color: rgbToHex(rgb.r, rgb.g, rgb.b), type };
                    }
                }
            }

            // Se falhar, sobe a árvore
            const parentColor = findSolidBackgroundColor(element.parentElement || element);
            if (parentColor) {
                return { color: parentColor, type: 'mixed' };
            }

            // Fallback final para gradiente/imagem
            const fallback = getFallbackColor(fallbackMode);
            return { color: fallback.bg, type };
        }

        // 2. Apenas cor de fundo sólida
        const rgb = parseColorToRGB(bgColor);
        if (rgb) {
            return {
                color: rgbToHex(rgb.r, rgb.g, rgb.b),
                type: 'solid'
            };
        }

        // 3. Transparente - sobe a árvore
        const parentColor = findSolidBackgroundColor(element);
        if (parentColor) {
            return { color: parentColor, type: 'transparent' };
        }

        // 4. Fallback final
        const fallback = getFallbackColor(fallbackMode);
        return { color: fallback.bg, type: 'transparent' };
    }, [sampleFromCSSBackground, sampleColorFromElement, findSolidBackgroundColor, parseColorToRGB, rgbToHex, fallbackMode, getFallbackColor]);

    /**
     * Calcula a cor de texto ótima baseada na cor de fundo
     */
    const calculateTextColor = useCallback((bgHex: string, bgType: BackgroundType): {
        textColor: string;
        isDark: boolean;
        luminance: number;
        isColorful: boolean;
    } => {
        try {
            const rgb = parseColorToRGB(bgHex);
            if (!rgb) {
                const fallback = getFallbackColor(fallbackMode);
                return {
                    textColor: fallback.text,
                    isDark: fallbackMode === 'dark',
                    luminance: fallbackMode === 'dark' ? 0.1 : 0.9,
                    isColorful: false,
                };
            }

            const lum = getLuminance(rgb.r, rgb.g, rgb.b);
            const dark = isDarkBackground(lum);

            let textHex: string;
            if (bgType !== 'solid') {
                try {
                    textHex = getComplementaryColor(bgHex);
                    const textRgb = parseColorToRGB(textHex);
                    if (textRgb) {
                        const textLum = getLuminance(textRgb.r, textRgb.g, textRgb.b);
                        const contrast = getContrastRatio(lum, textLum);
                        if (contrast < 4.5) {
                            textHex = getOptimalTextColor(lum);
                        }
                    } else {
                        textHex = getOptimalTextColor(lum);
                    }
                } catch {
                    textHex = getOptimalTextColor(lum);
                }
            } else {
                textHex = getOptimalTextColor(lum);
            }

            return {
                textColor: textHex,
                isDark: dark,
                luminance: lum,
                isColorful: bgType !== 'solid',
            };
        } catch {
            const fallback = getFallbackColor(fallbackMode);
            return {
                textColor: fallback.text,
                isDark: fallbackMode === 'dark',
                luminance: fallbackMode === 'dark' ? 0.1 : 0.9,
                isColorful: false,
            };
        }
    }, [parseColorToRGB, fallbackMode, getFallbackColor]);

    /**
     * Atualiza as cores com throttle via requestAnimationFrame
     */
    const updateColors = useCallback(() => {
        if (!ref.current) return;

        // Throttle com timestamp - skip se não passou intervalo
        const now = Date.now();
        if (now - lastUpdateRef.current < updateInterval) {
            return;
        }

        // Se já há um RAF agendado, não agenda outro
        if (rafRef.current) {
            return;
        }

        let detectedColor: string | null = null;
        let detectedType: BackgroundType = 'solid';

        if (threeRenderer) {
            detectedColor = sampleColorFromThreeRenderer();
            if (detectedColor) {
                detectedType = 'mixed';
            }
        }

        if (!detectedColor) {
            const result = detectBackground(ref.current);
            detectedColor = result.color;
            detectedType = result.type;

            const fallbackColors = getFallbackColor(fallbackMode);
            if (!detectedColor || detectedColor === fallbackColors.bg) {
                const canvas = ref.current.querySelector('canvas');
                if (canvas) {
                    try {
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            const width = canvas.width;
                            const height = canvas.height;

                            // Amostragem de múltiplos pontos (9-point sampling)
                            const points = [
                                { x: Math.floor(width / 2), y: Math.floor(height / 2) }, // centro
                                { x: Math.floor(width / 3), y: Math.floor(height / 3) }, // superior esq
                                { x: Math.floor(width * 2 / 3), y: Math.floor(height / 3) }, // superior dir
                                { x: Math.floor(width / 3), y: Math.floor(height * 2 / 3) }, // inferior esq
                                { x: Math.floor(width * 2 / 3), y: Math.floor(height * 2 / 3) }, // inferior dir
                                { x: Math.floor(width / 2), y: 0 }, // topo centro
                                { x: Math.floor(width / 2), y: height - 1 }, // baixo centro
                                { x: 0, y: Math.floor(height / 2) }, // esquerda centro
                                { x: width - 1, y: Math.floor(height / 2) }, // direita centro
                            ];

                            // Tenta encontrar um pixel não transparente
                            for (const point of points) {
                                try {
                                    const imageData = ctx.getImageData(point.x, point.y, 1, 1);
                                    const pixel = imageData.data;
                                    if (pixel.length >= 4 && pixel[3] > 0) {
                                        detectedColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
                                        detectedType = 'image';
                                        break;
                                    }
                                } catch {
                                    // Continua para o próximo ponto
                                }
                            }
                        }
                    } catch {
                        // Ignora erros
                    }
                }
            }
        }

        if (!detectedColor) {
            const fallbackColors = getFallbackColor(fallbackMode);
            detectedColor = fallbackColors.bg;
            detectedType = 'transparent';
        }

        const { textColor: newTextColor, isDark: newIsDark, luminance: newLuminance, isColorful: newIsColorful } =
            calculateTextColor(detectedColor, detectedType);

        // Comparação simplificada: armazenar cores separadamente e comparar com ===
        if (newTextColor !== lastTextColorRef.current || detectedColor !== lastBgColorRef.current) {
            lastTextColorRef.current = newTextColor;
            lastBgColorRef.current = detectedColor;

            if (isMountedRef.current) {
                setTextColor(newTextColor);
                setBackgroundColor(detectedColor);
                setIsDark(newIsDark);
                setIsColorful(newIsColorful);
                setBackgroundType(detectedType);
                setLuminance(newLuminance);
            }
        }

        lastUpdateRef.current = now;
        rafRef.current = null;
    }, [
        ref,
        threeRenderer,
        sampleColorFromThreeRenderer,
        detectBackground,
        calculateTextColor,
        updateInterval,
        fallbackMode,
        rgbToHex,
        getFallbackColor,
    ]);

    const handleResize = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
            updateColors();
            rafRef.current = null;
        });
    }, [updateColors]);

    const handleMutation = useCallback((mutations: MutationRecord[]) => {
        const relevant = mutations.some((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') return true;
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') return true;
            if (mutation.type === 'childList') return true;
            return false;
        });

        if (relevant) {
            handleResize();
        }
    }, [handleResize]);

    useEffect(() => {
        isMountedRef.current = true;

        if (ref.current) {
            try {
                resizeObserverRef.current = new ResizeObserver(() => {
                    handleResize();
                });
                resizeObserverRef.current.observe(ref.current);
            } catch {
                // ResizeObserver não suportado
            }
        }

        if (ref.current) {
            try {
                mutationObserverRef.current = new MutationObserver(handleMutation);
                mutationObserverRef.current.observe(ref.current, {
                    attributes: true,
                    attributeFilter: ['style', 'class'],
                    childList: true,
                    subtree: true,
                });
            } catch {
                // MutationObserver não suportado
            }
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
        const handleMediaChange = () => handleResize();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMediaChange);
        }

        updateColors();

        // Usa window.setInterval que retorna number no navegador
        timeoutRef.current = window.setInterval(() => {
            updateColors();
        }, updateInterval * 2);

        return () => {
            isMountedRef.current = false;

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }

            if (mutationObserverRef.current) {
                mutationObserverRef.current.disconnect();
            }

            if (timeoutRef.current) {
                window.clearInterval(timeoutRef.current);
            }

            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleMediaChange);
            }
        };
    }, [ref, handleResize, handleMutation, updateColors, updateInterval]);

    const result = useMemo<UseDynamicTextColorResult>(() => ({
        textColor,
        backgroundColor,
        isDark,
        isColorful,
        backgroundType,
        luminance,
    }), [textColor, backgroundColor, isDark, isColorful, backgroundType, luminance]);

    return result;
}
