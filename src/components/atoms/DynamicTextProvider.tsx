import { createContext, useContext, useMemo, ReactNode } from 'react';

console.log('[DynamicTextProvider] Carregando DynamicTextProvider');

console.log('[DynamicTextProvider] Carregando DynamicTextProvider');

/**
 * Configurações padrão para o DynamicText
 */
const DEFAULT_CONFIG = {
    defaultColorMode: 'auto' as const,
    defaultTransitionDuration: 400,
    fallbackMode: 'auto' as const,
    enableHighContrast: false,
    contrastLevel: 4.5 as const,
    enablePerformanceOptimization: true,
};

/**
 * Interface para as configurações do DynamicTextProvider
 */
export interface DynamicTextProviderProps {
    /**
     * Componentes filhos que usarão o contexto
     */
    children: ReactNode;

    /**
     * Modo de cor padrão para textos dinâmicos
     * - 'auto': usa contraste ótimo automático
     * - 'dark': força cor escura
     * - 'light': força cor clara
     * - 'complement': usa cor complementar ao fundo
     * - 'high-contrast': força contraste máximo (WCAG AAA)
     * - 'safe': usa cores seguras garantidas
     * @default 'auto'
     */
    defaultColorMode?: 'auto' | 'dark' | 'light' | 'complement' | 'high-contrast' | 'safe';

    /**
     * Duração padrão da transição em ms
     * @default 400
     */
    defaultTransitionDuration?: number;

    /**
     * Modo de fallback quando não for possível detectar o fundo
     * - 'dark': fallback para texto escuro
     * - 'light': fallback para texto claro
     * - 'auto': usa detecção automática
     * @default 'auto'
     */
    fallbackMode?: 'dark' | 'light' | 'auto';

    /**
     * Habilita modo de alto contraste global
     * @default false
     */
    enableHighContrast?: boolean;

    /**
     * Nível de contraste desejado (4.5 para AA, 7 para AAA)
     * @default 4.5
     */
    contrastLevel?: number;

    /**
     * Habilita otimizações de performance
     * - Reduz frequência de atualizações
     * - Cache de resultados
     * - Throttling mais agressivo
     * @default true
     */
    enablePerformanceOptimization?: boolean;
}

/**
 * Interface para o contexto do DynamicText
 */
export interface DynamicTextContextValue {
    /**
     * Modo de cor padrão configurado
     */
    defaultColorMode: 'auto' | 'dark' | 'light' | 'complement' | 'high-contrast' | 'safe';

    /**
     * Duração padrão da transição em ms
     */
    defaultTransitionDuration: number;

    /**
     * Modo de fallback configurado
     */
    fallbackMode: 'dark' | 'light' | 'auto';

    /**
     * Modo de alto contraste habilitado
     */
    enableHighContrast: boolean;

    /**
     * Nível de contraste desejado
     */
    contrastLevel: number;

    /**
     * Otimizações de performance habilitadas
     */
    enablePerformanceOptimization: boolean;
}

/**
 * Contexto para gerenciar configurações globais do DynamicText
 */
const DynamicTextContext = createContext<DynamicTextContextValue>({
    ...DEFAULT_CONFIG,
});

/**
 * Hook para acessar as configurações globais do DynamicText
 *
 * Deve ser usado dentro de um DynamicTextProvider
 *
 * @example
 * ```tsx
 * const { defaultColorMode, defaultTransitionDuration } = useDynamicTextContext();
 * ```
 *
 * @throws {Error} Se usado fora de um DynamicTextProvider
 *
 * @returns Configurações globais do DynamicText
 */
export function useDynamicTextContext(): DynamicTextContextValue {
    const context = useContext(DynamicTextContext);

    if (!context) {
        throw new Error(
            'useDynamicTextContext deve ser usado dentro de um DynamicTextProvider. ' +
            'Wrap sua aplicação ou componente com <DynamicTextProvider>.'
        );
    }

    return context;
}

/**
 * Provider para gerenciar configurações globais do DynamicText
 *
 * Permite configurar valores padrão para todos os componentes DynamicText
 * na aplicação, evitando a necessidade de passar props repetidamente.
 *
 * A ordem de prioridade é:
 * 1. Props locais do DynamicText
 * 2. Configurações do DynamicTextProvider (contexto)
 * 3. Valores padrão do componente
 *
 * @example
 * ```tsx
 * import { DynamicTextProvider } from './DynamicTextProvider';
 *
 * function App() {
 *   return (
 *     <DynamicTextProvider
 *       defaultColorMode="auto"
 *       defaultTransitionDuration={300}
 *       fallbackMode="light"
 *       enableHighContrast={true}
 *       contrastLevel={7}
 *     >
 *       <SuaAplicacao />
 *     </DynamicTextProvider>
 *   );
 * }
 * ```
 */
export function DynamicTextProvider({
    children,
    defaultColorMode = DEFAULT_CONFIG.defaultColorMode,
    defaultTransitionDuration = DEFAULT_CONFIG.defaultTransitionDuration,
    fallbackMode = DEFAULT_CONFIG.fallbackMode,
    enableHighContrast = DEFAULT_CONFIG.enableHighContrast,
    contrastLevel = DEFAULT_CONFIG.contrastLevel,
    enablePerformanceOptimization = DEFAULT_CONFIG.enablePerformanceOptimization,
}: DynamicTextProviderProps) {
    // Memoiza o valor do contexto para evitar re-renders desnecessários
    const contextValue = useMemo<DynamicTextContextValue>(
        () => ({
            defaultColorMode,
            defaultTransitionDuration,
            fallbackMode,
            enableHighContrast,
            contrastLevel,
            enablePerformanceOptimization,
        }),
        [defaultColorMode, defaultTransitionDuration, fallbackMode, enableHighContrast, contrastLevel, enablePerformanceOptimization]
    );

    return (
        <DynamicTextContext.Provider value={contextValue}>
            {children}
        </DynamicTextContext.Provider>
    );
}

// Exportação do contexto para casos avançados (se necessário)
export { DynamicTextContext };
