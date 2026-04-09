/**
 * Utilitário de Preload Dinâmico de Chunks
 *
 * Otimiza o carregamento de módulos Three.js e React Three
 * usando requestIdleCallback para não bloquear o LCP.
 *
 * @module preloadChunks
 */

/**
 * Preload dos chunks críticos do Three.js
 *
 * Carrega @react-three/fiber e @react-three/drei após o LCP
 * usando requestIdleCallback para não impactar a interatividade.
 */
export function preloadCriticalChunks(): void {
  // Verificar se requestIdleCallback está disponível
  const scheduleIdle =
    'requestIdleCallback' in window
      ? window.requestIdleCallback
      : (cb: IdleRequestCallback) =>
          setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 1);

  // Preload de Three.js após LCP (usando idle time)
  scheduleIdle(() => {
    // Preload dinâmico dos módulos React Three
    import('@react-three/fiber').catch((err) => {
      console.warn('[Preload] Falha ao preloader @react-three/fiber:', err);
    });

    import('@react-three/drei').catch((err) => {
      console.warn('[Preload] Falha ao preloader @react-three/drei:', err);
    });
  });

  // Preload de framer-motion com prioridade menor
  scheduleIdle(() => {
    import('framer-motion').catch((err) => {
      console.warn('[Preload] Falha ao preloader framer-motion:', err);
    });
  });
}

/**
 * Preload do modelo 3D principal
 *
 * Usa fetch com prioridade baixa para não competir com recursos críticos.
 */
export function preloadGLTFModel(modelPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Verificar se o navegador suporta fetch
    if (!('fetch' in window)) {
      reject(new Error('Fetch API não suportada'));
      return;
    }

    // Usar requestIdleCallback para não bloquear LCP
    const scheduleIdle =
      'requestIdleCallback' in window
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) =>
            setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 100);

    scheduleIdle(() => {
      fetch(modelPath, {
        method: 'GET',
        credentials: 'same-origin',
        // Prioridade baixa para não competir com recursos críticos
        priority: 'low' as RequestPriority,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          // Apenas carregar o recurso no cache do navegador
          return response.blob();
        })
        .then(() => {
          console.log(`[Preload] Modelo pré-carregado: ${modelPath}`);
          resolve();
        })
        .catch((err) => {
          console.warn(`[Preload] Falha ao preloader modelo ${modelPath}:`, err);
          reject(err);
        });
    });
  });
}

/**
 * Inicializa o preload de todos os recursos críticos
 *
 * Deve ser chamado após o LCP (ex: no useEffect do App ou Hero)
 */
export function initializePreload(): void {
  // Aguardar o evento LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries.find(
          (entry) => entry.entryType === 'largest-contentful-paint'
        );

        if (lcpEntry) {
          console.log(`[Preload] LCP detectado: ${lcpEntry.startTime}ms`);
          // Iniciar preload após LCP
          preloadCriticalChunks();
          observer.disconnect();
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      // Fallback: iniciar preload após um delay
      console.log('[Preload] PerformanceObserver não suportado, usando fallback');
      setTimeout(preloadCriticalChunks, 500);
    }
  } else {
    // Fallback para navegadores sem PerformanceObserver
    setTimeout(preloadCriticalChunks, 500);
  }
}

/**
 * Preload de fontes críticas
 */
export function preloadCriticalFonts(): void {
  const criticalFonts = [
    { family: 'Inter', weight: '400', style: 'normal' },
    { family: 'Inter', weight: '500', style: 'normal' },
    { family: 'Inter', weight: '600', style: 'normal' },
  ];

  // Usar CSS Font Loading API se disponível
  if ('fonts' in document) {
    criticalFonts.forEach(({ family, weight, style }) => {
      document.fonts.load(`${weight} ${style} 1em "${family}"`).catch((err) => {
        console.warn(`[Preload] Falha ao carregar fonte ${family}:`, err);
      });
    });
  }
}

// Tipos para requestIdleCallback já existem no TypeScript lib
// Usando os tipos nativos do TypeScript

export default {
  preloadCriticalChunks,
  preloadGLTFModel,
  initializePreload,
  preloadCriticalFonts,
};
