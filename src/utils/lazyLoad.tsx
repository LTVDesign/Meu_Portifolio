import React, { lazy, Suspense, ComponentType } from 'react';

/**
 * Utilitário para lazy loading com fallback otimizado
 * Reduz o trabalho da thread principal ao carregar componentes sob demanda
 */

interface LazyLoadOptions {
    /** Fallback component enquanto carrega */
    fallback?: React.ReactNode;
    /** Delay mínimo antes de mostrar fallback (evita flash) */
    minDelay?: number;
    /** Timeout máximo de carregamento */
    timeout?: number;
}

/**
 * Fallback padrão para componentes lazy
 */
const DefaultFallback = () => (
    <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
    </div>
);

/**
 * Hook para lazy loading com opções avançadas
 */
export function useLazyLoad<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    options: LazyLoadOptions = {}
): { component: React.ComponentType<any>; loading: boolean } {
    const [loading, setLoading] = React.useState(false);
    const [Component, setComponent] = React.useState<T | null>(null);

    React.useEffect(() => {
        let mounted = true;
        let timeoutId: NodeJS.Timeout;

        const loadComponent = async () => {
            setLoading(true);

            if (options.minDelay) {
                timeoutId = setTimeout(() => {
                    // Fallback já está sendo mostrado
                }, options.minDelay);
            }

            try {
                const module = await importFn();
                if (mounted) {
                    setComponent(module.default);
                }
            } catch (error) {
                console.error('Erro ao carregar componente:', error);
            } finally {
                if (mounted) {
                    setLoading(false);
                    if (timeoutId) clearTimeout(timeoutId);
                }
            }
        };

        loadComponent();

        return () => {
            mounted = false;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [importFn, options.minDelay]);

    return { component: Component as React.ComponentType<any>, loading };
}

/**
 * Cria um componente lazy com fallback personalizado e preload
 */
export function lazyWithFallback<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    options: LazyLoadOptions = {}
): React.ComponentType<any> {
    const LazyComponent = lazy(importFn);

    return function LazyLoadedComponent(props: any) {
        return (
            <Suspense fallback={options.fallback || <DefaultFallback />}>
                <LazyComponent {...props} />
            </Suspense>
        );
    };
}

/**
 * Preload de componente lazy
 */
export function preloadLazy(
    importFn: () => Promise<{ default: any }>
): void {
    // Inicia o carregamento antecipado
    importFn().catch(console.error);
}

/**
 * Hook para preload inteligente baseado em interseção
 */
export function useIntersectionPreload(
    importFn: () => Promise<{ default: any }>,
    options?: IntersectionObserverInit
) {
    const [shouldLoad, setShouldLoad] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !shouldLoad) {
                        setShouldLoad(true);
                        preloadLazy(importFn);
                        observer.unobserve(element);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '200px', ...options }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [importFn, shouldLoad, options]);

    return { ref, shouldLoad };
}

/**
 * Componente wrapper para lazy loading com preload
 */
export const LazyWrapper: React.FC<{
    children: React.ReactNode;
    fallback?: React.ReactNode;
}> = ({ children, fallback }) => {
    return (
        <Suspense fallback={fallback || <DefaultFallback />}>
            {children}
        </Suspense>
    );
};