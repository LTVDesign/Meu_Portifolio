import React, { useRef, useMemo, useEffect, useImperativeHandle } from 'react';
import { useDynamicTextColor, UseDynamicTextColorResult } from '../../hooks/useDynamicTextColor';
import { motion, MotionProps } from 'framer-motion';
import { useDynamicTextContext } from './DynamicTextProvider';
import { hexToRGB, getLuminance, getContrastRatio } from '../../utils/contrastUtils';

/**
 * Estratégias de cálculo de cor para o texto dinâmico
 */
export type ColorMode = 'auto' | 'dark' | 'light' | 'complement' | 'high-contrast' | 'safe';

/**
 * Props do componente DynamicText
 */
export interface DynamicTextProps extends Omit<MotionProps, 'children' | 'ref'> {
    /**
     * Conteúdo do componente (texto, elementos, etc.)
     */
    children: React.ReactNode;

    /**
     * Estratégia de cálculo da cor do texto
     * - 'auto': usa contraste ótimo automático
     * - 'dark': força cor escura
     * - 'light': força cor clara
     * - 'complement': usa cor complementar ao fundo
     * - 'high-contrast': força contraste máximo (WCAG AAA)
     * - 'safe': usa cores seguras garantidas
     * @default 'auto'
     */
    colorMode?: ColorMode;

    /**
     * Duração da transição CSS em milissegundos
     * @default 400
     */
    transitionDuration?: number;

    /**
     * Classes CSS adicionais
     */
    className?: string;

    /**
     * Estilos inline adicionais
     */
    style?: React.CSSProperties;

    /**
     * Callback para obter o renderer Three.js (para React Three Fiber)
     * Opcional - só necessário se estiver usando R3F
     */
    threeRenderer?: () => THREE.WebGLRenderer | null;

    /**
     * Callback quando a cor muda
     */
    onColorChange?: (result: UseDynamicTextColorResult) => void;
}

/**
 * Componente DynamicText - Texto com cor dinâmica baseada no fundo
 *
 * Aplica automaticamente a cor de texto ideal para garantir contraste WCAG AA (4.5:1)
 * contra o fundo detectado. Suporta animações suaves com Framer Motion e integração
 * com React Three Fiber.
 *
 * @example
 * ```tsx
 * // Uso básico
 * <DynamicText>Texto com contraste automático</DynamicText>
 *
 * // Forçando contraste alto
 * <DynamicText colorMode="high-contrast" className="text-lg">
 *   Texto com contraste máximo
 * </DynamicText>
 *
 * // Com estilo customizado
 * <DynamicText
 *   style={{ fontSize: '24px', fontWeight: 'bold' }}
 *   transitionDuration={200}
 * >
 *   Texto estilizado
 * </DynamicText>
 *
 * // Integração com R3F
 * <DynamicText threeRenderer={() => rendererRef.current}>
 *   Texto sobre canvas 3D
 * </DynamicText>
 * ```
 */
export const DynamicText = React.forwardRef<HTMLElement, DynamicTextProps>((
    {
        children,
        colorMode: propColorMode,
        transitionDuration: propTransitionDuration,
        className = '',
        style = {},
        threeRenderer,
        onColorChange,
        ...motionProps
    },
    externalRef
) => {
    console.log('[DynamicText] Renderizando DynamicText, children:', typeof children, 'colorMode:', propColorMode);
    // Obtém configurações do contexto
    const context = useDynamicTextContext();

    // Prioridade: props locais > contexto > defaults
    const colorMode = propColorMode ?? context.defaultColorMode;
    const transitionDuration = propTransitionDuration ?? context.defaultTransitionDuration;

    // Cria ref interna para o elemento
    const internalRef = useRef<HTMLElement>(null);

    // Expõe a ref interna para o componente pai
    useImperativeHandle(externalRef, () => internalRef.current!, []);

    const {
        textColor,
        backgroundColor,
        isDark,
        isColorful,
        backgroundType,
        luminance,
    } = useDynamicTextColor(internalRef, {
        threeRenderer,
        fallbackMode: context.fallbackMode,
    });

    // Determina a cor final baseada no colorMode
    const finalTextColor = useMemo(() => {
        switch (colorMode) {
            case 'dark':
                return '#000000';
            case 'light':
                return '#ffffff';
            case 'complement':
                if (isColorful) {
                    return luminance > 0.5 ? '#000000' : '#ffffff';
                }
                return textColor;
            case 'high-contrast':
                // Força contraste máximo (WCAG AAA - 7:1)
                return luminance > 0.5 ? '#000000' : '#ffffff';
            case 'safe':
                // Usa cores seguras garantidas
                return getSafeColorForBackground(backgroundColor, luminance, backgroundType);
            case 'auto':
            default:
                return textColor;
        }
    }, [colorMode, textColor, isColorful, luminance, backgroundColor, backgroundType]);

    // Garante contraste WCAG AA (4.5:1) ou superior
    const guaranteedColor = useMemo(() => {
        if (colorMode === 'dark' || colorMode === 'light') {
            const rgb = hexToRGB(finalTextColor);
            if (rgb) {
                return finalTextColor;
            }
        }

        // Verifica se o contraste é adequado
        const contrastLevel = colorMode === 'high-contrast' ? 7 : 4.5;
        if (hasSufficientContrast(backgroundColor, finalTextColor, contrastLevel)) {
            return finalTextColor;
        }

        // Se não tiver contraste adequado, ajusta a cor
        return adjustColorForContrast(backgroundColor, finalTextColor, contrastLevel);
    }, [finalTextColor, colorMode, backgroundColor]);

    // Ref para armazenar a cor anterior e permitir animação suave
    const prevColorRef = useRef<string>(guaranteedColor);

    // Notifica mudança de cor
    useEffect(() => {
        onColorChange?.({
            textColor,
            backgroundColor,
            isDark,
            isColorful,
            backgroundType,
            luminance,
        });
    }, [textColor, backgroundColor, isDark, isColorful, backgroundType, luminance, onColorChange]);

    // Atualiza a ref da cor anterior quando guaranteedColor mudar
    useEffect(() => {
        prevColorRef.current = guaranteedColor;
    }, [guaranteedColor]);

    // Estilo combinado
    const combinedStyle: React.CSSProperties = useMemo(() => ({
        color: guaranteedColor,
        ...style,
    }), [guaranteedColor, style]);

    // Renderiza com motion.span wrapper (sempre span para simplicidade)
    return (
        <motion.span
            ref={internalRef as React.Ref<HTMLSpanElement>}
            className={className}
            style={combinedStyle}
            initial={{ color: prevColorRef.current }}
            animate={{ color: guaranteedColor }}
            transition={{ duration: transitionDuration / 1000, ease: 'easeInOut' }}
            {...motionProps}
        >
            {children}
        </motion.span>
    );
});

// Exportação default para compatibilidade
export default DynamicText;

/**
 * Obtém uma cor segura para o background
 * Testa múltiplas cores seguras até encontrar uma que atenda ao contraste
 *
 * @param bgHex - cor de fundo em formato hex
 * @param luminance - luminância do fundo
 * @param backgroundType - tipo de fundo
 * @returns cor de texto segura em formato hex
 */
function getSafeColorForBackground(bgHex: string, luminance: number, backgroundType: string): string {
    const safeColors = [
        '#ffffff', // branco
        '#000000', // preto
        '#ffff00', // amarelo
        '#00ffff', // ciano
        '#ff00ff', // magenta
        '#ff6600', // laranja
        '#00ff00', // verde
        '#0000ff', // azul
        '#cccccc', // cinza claro
        '#333333', // cinza escuro
    ];

    // Para fundos coloridos, prioriza cores de alto contraste
    if (backgroundType !== 'solid' || luminance > 0.3 && luminance < 0.7) {
        const highContrast = [
            '#ffff00', // amarelo
            '#00ffff', // ciano
            '#ff00ff', // magenta
            '#ff6600', // laranja
            '#00ff00', // verde
            '#0000ff', // azul
        ];

        for (const color of highContrast) {
            if (hasSufficientContrast(bgHex, color, 7)) {
                return color;
            }
        }
    }

    // Tenta cores seguras padrão
    for (const color of safeColors) {
        if (hasSufficientContrast(bgHex, color, 4.5)) {
            return color;
        }
    }

    // Fallback final
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Verifica se o contraste entre duas cores atende ao WCAG AA
 * @param bgHex - cor de fundo em formato hex
 * @param textHex - cor de texto em formato hex
 * @param level - nível de contraste (4.5 para AA, 7 para AAA)
 * @returns true se contraste é adequado
 */
function hasSufficientContrast(bgHex: string, textHex: string, level: number = 4.5): boolean {
    try {
        const bgRGB = hexToRGB(bgHex);
        const textRGB = hexToRGB(textHex);

        const bgLuminance = getLuminance(bgRGB.r, bgRGB.g, bgRGB.b);
        const textLuminance = getLuminance(textRGB.r, textRGB.g, textRGB.b);

        const contrast = getContrastRatio(bgLuminance, textLuminance);
        return contrast >= level;
    } catch {
        return false;
    }
}

/**
 * Ajusta a cor para garantir contraste mínimo com outra cor
 * Modifica a cor de texto se necessário para atingir contraste adequado
 *
 * @param bgHex - cor de fundo em formato hex
 * @param textHex - cor de texto inicial em formato hex
 * @param level - nível de contraste desejado (4.5 para AA, 7 para AAA)
 * @returns cor de texto ajustada em formato hex
 */
function adjustColorForContrast(bgHex: string, textHex: string, level: number = 4.5): string {
    if (hasSufficientContrast(bgHex, textHex, level)) {
        return textHex;
    }

    // Tenta cores seguras primeiro
    const safeColors = [
        '#ffffff', // branco
        '#000000', // preto
        '#ffff00', // amarelo
        '#00ffff', // ciano
        '#ff00ff', // magenta
        '#ff6600', // laranja
        '#00ff00', // verde
        '#0000ff', // azul
    ];

    for (const color of safeColors) {
        if (hasSufficientContrast(bgHex, color, level)) {
            return color;
        }
    }

    // Se nenhuma cor segura funcionar, retorna preto ou branco baseado na luminância
    try {
        const bgRGB = hexToRGB(bgHex);
        const bgLuminance = getLuminance(bgRGB.r, bgRGB.g, bgRGB.b);
        return bgLuminance > 0.5 ? '#000000' : '#ffffff';
    } catch {
        return '#000000';
    }
}
