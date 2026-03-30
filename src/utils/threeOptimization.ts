/**
 * Utilitários de otimização para Three.js
 * Reduz o impacto do Three.js no main thread
 */

/**
 * Configuração de LOD (Level of Detail) para objetos 3D
 */
export interface LODConfig {
    /** Distância para trocar de LOD */
    distance: number;
    /** Nível de detalhe (0 = mais detalhado) */
    level: number;
}

/**
 * Hook para carregar Three.js sob demanda
 * Evita carregar Three.js se não for necessário
 */
export async function loadThreeJS(): Promise<typeof import('three')> {
    return import('three');
}

/**
 * Hook para carregar React Three Fiber sob demanda
 */
export async function loadR3F(): Promise<typeof import('@react-three/fiber')> {
    return import('@react-three/fiber');
}

/**
 * Hook para carregar Drei sob demanda
 */
export async function loadDrei(): Promise<typeof import('@react-three/drei')> {
    return import('@react-three/drei');
}

/**
 * Verifica se WebGL está disponível
 */
export function isWebGLAvailable(): boolean {
    try {
        const canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch {
        return false;
    }
}

/**
 * Verifica se o dispositivo é móvel
 */
export function isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

/**
 * Obtém configurações de qualidade baseadas no dispositivo
 */
export function getQualitySettings(): {
    particleCount: number;
    shadowQuality: 'low' | 'medium' | 'high';
    textureQuality: 'low' | 'medium' | 'high';
    pixelRatio: number;
} {
    const isMobile = isMobileDevice();
    const isLowEnd = navigator.hardwareConcurrency <= 4;

    if (isMobile || isLowEnd) {
        return {
            particleCount: 500,
            shadowQuality: 'low',
            textureQuality: 'low',
            pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        };
    }

    return {
        particleCount: 2000,
        shadowQuality: 'medium',
        textureQuality: 'medium',
        pixelRatio: Math.min(window.devicePixelRatio, 2),
    };
}

/**
 * Debounce para redimensionamento de canvas
 */
export function debounceResize(callback: () => void, delay = 250) {
    let timeoutId: NodeJS.Timeout;

    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, delay);
    };
}

/**
 * Cria um renderer Three.js otimizado
 */
export function createOptimizedRenderer(
    _canvas: HTMLCanvasElement,
    options?: {
        antialias?: boolean;
        alpha?: boolean;
        powerPreference?: 'default' | 'high-performance' | 'low-power';
    }
) {
    const {
        antialias = true,
        alpha = true,
        powerPreference = 'low-power',
    } = options || {};

    return {
        antialias,
        alpha,
        powerPreference,
        // Desabilita preservação de buffer para melhor performance
        preserveDrawingBuffer: false,
        // Fail_if_major_perf_caveat para evitar fallback para software
        failIfMajorPerformanceCaveat: true,
    };
}

/**
 * Pool de objetos para reutilização
 * Evita garbage collection frequente
 */
export class ObjectPool<T> {
    private pool: T[] = [];
    private createFn: () => T;

    constructor(createFn: () => T, initialSize = 10) {
        this.createFn = createFn;
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }

    acquire(): T {
        return this.pool.pop() || this.createFn();
    }

    release(obj: T): void {
        this.pool.push(obj);
    }
}