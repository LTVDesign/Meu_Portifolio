import { type ComponentType, Suspense, useEffect, useState } from 'react';

interface LazyBackgroundLoaderProps {
  backgroundType: 'wavefield' | 'liquid' | 'particulate';
  fallback?: React.ReactNode;
  [key: string]: any;
}

// Importações dinâmicas lazy
const backgroundImports: Record<string, () => Promise<{ default: ComponentType<any> }>> =
  {
    wavefield: () => import('./WavefieldUltraBackground'),
    liquid: () => import('./LiquidUltraBackground'),
    particulate: () => import('./ParticulateShatterBackground'),
  };

/**
 * Loader lazy para backgrounds 3D
 * Carrega o componente apenas quando for necessário, evitando carregar Three.js no bundle inicial
 * Reduz o tamanho do bundle principal em ~200KB
 */
export function LazyBackgroundLoader({
  backgroundType,
  fallback = null,
  ...props
}: LazyBackgroundLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [BackgroundComponent, setBackgroundComponent] =
    useState<ComponentType<any> | null>(null);

  useEffect(() => {
    // Espera a página estar completamente carregada antes de carregar o background
    if (document.readyState === 'complete') {
      // Espera mais um frame para não bloquear a thread principal no LCP
      requestIdleCallback(() => {
        setShouldLoad(true);
      });
    } else {
      const handleLoad = () => {
        requestIdleCallback(() => {
          setShouldLoad(true);
        });
      };
      window.addEventListener('load', handleLoad, { once: true });
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    // Carrega o componente de forma assíncrona
    const loadComponent = async () => {
      try {
        const module = await backgroundImports[backgroundType]();
        setBackgroundComponent(() => module.default);
      } catch (error) {
        console.warn(`Falha ao carregar background ${backgroundType}`, error);
      }
    };

    loadComponent();
  }, [shouldLoad, backgroundType]);

  if (!shouldLoad || !BackgroundComponent) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <BackgroundComponent {...props} />
    </Suspense>
  );
}

export default LazyBackgroundLoader;
