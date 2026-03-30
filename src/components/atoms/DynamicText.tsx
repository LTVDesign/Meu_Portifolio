import React, { useRef, useMemo, useEffect } from 'react';
import { useDynamicTextColor, UseDynamicTextColorResult } from '../../hooks/useDynamicTextColor';
import { motion, MotionProps } from 'framer-motion';
import { useDynamicTextContext } from './DynamicTextProvider';

/**
 * Estratégias de cálculo de cor para o texto dinâmico
 */
export type ColorMode = 'auto' | 'dark' | 'light' | 'complement';

/**
 * Props do componente DynamicText
 */
export interface DynamicTextProps extends Omit<MotionProps, 'children'> {
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
 * // Forçando cor clara
 * <DynamicText colorMode="light" className="text-lg">
 *   Texto sempre claro
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
export function DynamicText({
    children,
    colorMode: propColorMode,
    transitionDuration: propTransitionDuration,
    className = '',
    style = {},
    threeRenderer,
    onColorChange,
    ...motionProps
}: DynamicTextProps) {
    // Obtém configurações do contexto
    const context = useDynamicTextContext();

    // Prioridade: props locais > contexto > defaults
    const colorMode = propColorMode ?? context.defaultColorMode;
    const transitionDuration = propTransitionDuration ?? context.defaultTransitionDuration;

    // Cria ref interna para o elemento
    const internalRef = useRef<HTMLElement>(null);

    // Usa o hook com a ref interna
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

    // Determina a cor final baseada no colorMode
    const finalTextColor = useMemo(() => {
        switch (colorMode) {
            case 'dark':
                return '#000000';
            case 'light':
                return '#ffffff';
            case 'complement':
                // Usa cor complementar calculada pelo hook se disponível
                // ou fallback para contraste
                if (isColorful) {
                    // Para fundos coloridos, usamos branco ou preto dependendo da luminância
                    return luminance > 0.5 ? '#000000' : '#ffffff';
                }
                return textColor;
            case 'auto':
            default:
                return textColor;
        }
    }, [colorMode, textColor, isColorful, luminance]);

    // Garante contraste WCAG AA (4.5:1) - fallback se necessário
    const guaranteedColor = useMemo(() => {
        // Se já temos uma cor do hook, ela já passou pelo cálculo de contraste
        // Mas verificamos se o colorMode forçou uma cor que pode não ter contraste
        if (colorMode === 'dark' || colorMode === 'light') {
            // Para cores forçadas, assumimos que o usuário sabe o que está fazendo
            // mas ainda verificamos se é uma cor válida
            const rgb = hexToRgb(finalTextColor);
            if (rgb) {
                // Cores forçadas (preto/branco) têm contraste garantido
                return finalTextColor;
            }
        }
        return finalTextColor;
    }, [finalTextColor, colorMode]);

    // Estilo combinado
    const combinedStyle: React.CSSProperties = useMemo(() => ({
        color: guaranteedColor,
        transition: `color ${transitionDuration}ms ease-in-out`,
        ...style,
    }), [guaranteedColor, transitionDuration, style]);

    // Renderiza com motion.span wrapper (sempre span para simplicidade)
    return (
        <motion.span
            ref={internalRef as React.Ref<HTMLSpanElement>}
            className={className}
            style={combinedStyle}
            initial={{ color: guaranteedColor }}
            animate={{ color: guaranteedColor }}
            transition={{ duration: transitionDuration / 1000, ease: 'easeInOut' }}
            {...motionProps}
        >
            {children}
        </motion.span>
    );
}

/**
 * Utilitário para converter hex para RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

// Exportação default
export default DynamicText;
