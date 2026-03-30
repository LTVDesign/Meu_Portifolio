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
    const lastColorRef = useRef<string>('');
    const lastBgRef = useRef<string>('');
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const mutationObserverRef = useRef<MutationObserver | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isMountedRef = useRef<boolean>(true);

    /**
     * Converte cor CSS para RGB
     */
    const parseColorToRGB = useCallback((cssColor: string): { r: number; g: number; b: number } | null => {
        if (!cssColor || cssColor === 'transparent' || cssColor === 'rgba(0, 0, 0, 0)') {
            return null;
        }

        // Cria elemento temporário para conversão
        const temp = document.createElement('div');
        temp.style.color = cssColor;
        document.body.appendChild(temp);
        const computed = getComputedStyle(temp).color;
        document.body.removeChild(temp);

        const match = computed.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (match) {
            return {
                r: parseInt(match[1], 10),
                g: parseInt(match[2], 10),
                b: parseInt(match[3], 10),
            };
        }

        const matchRgba = computed.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)$/);
        if (matchRgba) {
            return {
                r: parseInt(matchRgba[1], 10),
                g: parseInt(matchRgba[2], 10),
                b: parseInt(matchRgba[3], 10),
            };
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
     * Amostra cor média de um elemento usando canvas
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
            // Nota: Isso pode não funcionar para todos os elementos devido a CORS
            const images = element.querySelectorAll('img');
            if (images.length > 0) {
                // Tenta desenhar a primeira imagem encontrada
                const img = images[0] as HTMLImageElement;
                if (img.complete && img.naturalWidth > 0) {
                    try {
                        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
                    } catch {
                        // CORS ou outro erro
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                // Se não há imagens, tenta desenhar o elemento como html2canvas
                // Mas como não temos html2canvas, tentamos com o elemento filho que seja canvas/image
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

                // Ignora pixels transparentes
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
     * Amostra cor do renderer Three.js
     */
    const sampleColorFromThreeRenderer = useCallback((): string | null => {
        if (!threeRenderer) return null;

        try {
            const renderer = threeRenderer();
            if (!renderer) return null;

            // Lê pixel do centro do viewport
            const width = renderer.domElement.width;
            const height = renderer.domElement.height;
            if (width <= 0 || height <= 0) return null;

            // Verifica se há um render target ativo
            const currentRenderTarget = renderer.getRenderTarget();
            if (!currentRenderTarget) {
                // Se não há render target, lê do dom element
                const canvas = renderer.domElement as HTMLCanvasElement;
                const ctx = canvas.getContext('2d');
                if (!ctx) return null;

                const pixel = ctx.getImageData(Math.floor(width / 2), Math.floor(height / 2), 1, 1).data;
                return rgbToHex(pixel[0], pixel[1], pixel[2]);
            }

            // Se há render target, lê dele
            const pixels = new Uint8Array(4);
            renderer.readRenderTargetPixels(
                currentRenderTarget,
                Math.floor(width / 2),
                Math.floor(height / 2),
                1,
                1,
                pixels
            );

            return rgbToHex(pixels[0], pixels[1], pixels[2]);
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
        const visited = new Set<HTMLElement>();

        while (current && visited.size < 100) {
            if (visited.has(current)) break;
            visited.add(current);

            const style = getComputedStyle(current);
            const bgColor = style.backgroundColor;

            // Verifica se é uma cor sólida (não transparente)
            const rgb = parseColorToRGB(bgColor);
            if (rgb) {
                return rgbToHex(rgb.r, rgb.g, rgb.b);
            }

            // Se for transparente, sobe para o pai
            current = current.parentElement;
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
            // É gradiente ou imagem
            const type: BackgroundType = bgImage.includes('url') ? 'image' : 'gradient';

            // Tenta amostrar cor do elemento
            const sampledColor = sampleColorFromElement(element);
            if (sampledColor) {
                return { color: sampledColor, type };
            }

            // Fallback: extrai cor do gradiente se possível
            if (type === 'gradient') {
                // Pega a primeira cor do gradiente
                const colors = bgImage.match(/#[a-fA-F0-9]{6}|rgb\([^)]+\)/g);
                if (colors && colors.length > 0) {
                    const rgb = parseColorToRGB(colors[0]);
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

            return { color: '#000000', type };
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
        return { color: fallbackMode === 'dark' ? '#1a1a1a' : '#ffffff', type: 'transparent' };
    }, [sampleColorFromElement, findSolidBackgroundColor, parseColorToRGB, rgbToHex, fallbackMode]);

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
                // Fallback
                return {
                    textColor: fallbackMode === 'dark' ? '#ffffff' : '#000000',
                    isDark: fallbackMode === 'dark',
                    luminance: fallbackMode === 'dark' ? 0.1 : 0.9,
                    isColorful: false,
                };
            }

            // Calcula luminância
            const lum = getLuminance(rgb.r, rgb.g, rgb.b);
            const dark = isDarkBackground(lum);

            // Para fundos coloridos/movimentados, usa cor complementar
            let textHex: string;
            if (bgType !== 'solid') {
                // Usa cor complementar para contraste visual
                try {
                    textHex = getComplementaryColor(bgHex);
                    // Garante contraste mínimo
                    const textRgb = parseColorToRGB(textHex);
                    if (textRgb) {
                        const textLum = getLuminance(textRgb.r, textRgb.g, textRgb.b);
                        const contrast = getContrastRatio(lum, textLum);
                        if (contrast < 4.5) {
                            // Se contraste insuficiente, usa preto ou branco
                            textHex = getOptimalTextColor(lum);
                        }
                    } else {
                        textHex = getOptimalTextColor(lum);
                    }
                } catch {
                    textHex = getOptimalTextColor(lum);
                }
            } else {
                // Fundo sólido: usa preto ou branco baseado em luminância
                textHex = getOptimalTextColor(lum);
            }

            return {
                textColor: textHex,
                isDark: dark,
                luminance: lum,
                isColorful: bgType !== 'solid',
            };
        } catch {
            return {
                textColor: fallbackMode === 'dark' ? '#ffffff' : '#000000',
                isDark: fallbackMode === 'dark',
                luminance: fallbackMode === 'dark' ? 0.1 : 0.9,
                isColorful: false,
            };
        }
    }, [parseColorToRGB, fallbackMode]);

    /**
     * Atualiza as cores com throttle via requestAnimationFrame
     */
    const updateColors = useCallback(() => {
        if (!ref.current) return;

        const now = Date.now();
        if (now - lastUpdateRef.current < updateInterval) return;

        // Tenta amostrar do Three.js primeiro se disponível
        let detectedColor: string | null = null;
        let detectedType: BackgroundType = 'solid';

        if (threeRenderer) {
            detectedColor = sampleColorFromThreeRenderer();
            if (detectedColor) {
                detectedType = 'mixed';
            }
        }

        // Se não conseguiu do Three.js, tenta amostrar de canvas 2D no elemento
        if (!detectedColor) {
            // Primeiro, tenta detectar background do elemento ou seus pais
            const result = detectBackground(ref.current);
            detectedColor = result.color;
            detectedType = result.type;

            // Se ainda não tem cor ou está usando fallback, tenta encontrar canvas dentro do elemento
            const fallbackColor = fallbackMode === 'dark' ? '#1a1a1a' : '#ffffff';
            if (!detectedColor || detectedColor === fallbackColor) {
                const canvas = ref.current.querySelector('canvas');
                if (canvas) {
                    try {
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            const imageData = ctx.getImageData(0, 0, 1, 1);
                            const pixel = imageData.data;
                            if (pixel[3] > 0) { // Se não for transparente
                                detectedColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
                                detectedType = 'image';
                            }
                        }
                    } catch {
                        // Ignora erros de canvas
                    }
                }
            }
        }

        if (!detectedColor) {
            // Falha total - usa fallback
            const fallbackColor = fallbackMode === 'dark' ? '#1a1a1a' : '#ffffff';
            detectedColor = fallbackColor;
            detectedType = 'transparent';
        }

        // Calcula cores de texto
        const { textColor: newTextColor, isDark: newIsDark, luminance: newLuminance, isColorful: newIsColorful } =
            calculateTextColor(detectedColor, detectedType);

        // Só atualiza se houve mudança significativa
        const colorKey = `${newTextColor}-${detectedColor}`;
        if (colorKey !== lastColorRef.current || detectedColor !== lastBgRef.current) {
            lastColorRef.current = colorKey;
            lastBgRef.current = detectedColor;

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
    }, [
        ref,
        threeRenderer,
        sampleColorFromThreeRenderer,
        detectBackground,
        calculateTextColor,
        updateInterval,
        fallbackMode,
        rgbToHex,
    ]);

    /**
     * Handler para mudanças de tamanho
     */
    const handleResize = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
            updateColors();
            rafRef.current = null;
        });
    }, [updateColors]);

    /**
     * Handler para mudanças de estilo/atributos
     */
    const handleMutation = useCallback((mutations: MutationRecord[]) => {
        // Verifica se houve mudança relevante
        const relevant = mutations.some((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                return true;
            }
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                return true;
            }
            if (mutation.type === 'childList') {
                return true;
            }
            return false;
        });

        if (relevant) {
            handleResize();
        }
    }, [handleResize]);

    // Efeito principal
    useEffect(() => {
        isMountedRef.current = true;

        // Observer de redimensionamento
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

        // Observer de mutações
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

        // Observer de mudanças de estilo global (para transições CSS)
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
        const handleMediaChange = () => handleResize();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMediaChange);
        }

        // Inicialização
        updateColors();

        // Polling como fallback para mudanças dinâmicas
        timeoutRef.current = setInterval(() => {
            updateColors();
        }, updateInterval * 2);

        // Cleanup
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
                clearInterval(timeoutRef.current);
            }

            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleMediaChange);
            }
        };
    }, [ref, handleResize, handleMutation, updateColors, updateInterval]);

    // Memoiza o resultado para evitar re-renders desnecessários
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
