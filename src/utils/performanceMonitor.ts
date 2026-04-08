/**
 * Monitoramento de performance para identificar gargalos
 * Observa long tasks, FID, LCP e outras métricas Core Web Vitals
 */

interface PerformanceMetric {
    name: string;
    value: number;
    timestamp: number;
    metadata?: Record<string, any>;
}

interface LongTaskEntry {
    duration: number;
    startTime: number;
    attribution: string;
}

const METRICS_THRESHOLDS = {
    LONG_TASK: 50,
    LCP_GOOD: 2500,
    FID_GOOD: 100,
    CLS_GOOD: 0.1,
};

class PerformanceMonitor {
    private metrics: PerformanceMetric[] = [];
    private longTasks: LongTaskEntry[] = [];
    private observer: PerformanceObserver | null = null;
    private isActive = false;

    init() {
        if (this.isActive || typeof PerformanceObserver === 'undefined') return;

        this.isActive = true;

        // Observa tarefas longas
        try {
            this.observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > METRICS_THRESHOLDS.LONG_TASK) {
                        this.longTasks.push({
                            duration: entry.duration,
                            startTime: entry.startTime,
                            attribution: entry.name || 'unknown',
                        });

                        // Log para desenvolvimento
                        if (import.meta.env.DEV) {
                            console.warn(`⚠️ Long Task detectado: ${entry.duration.toFixed(0)}ms`, entry);
                        }
                    }
                }
            });

            this.observer.observe({ entryTypes: ['longtask', 'largest-contentful-paint', 'first-input'] });
        } catch (e) {
            // Navegador não suporta PerformanceObserver
            console.debug('PerformanceObserver não suportado');
        }

        // Registra métricas no carregamento
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.collectLoadMetrics();
            }, 0);
        });
    }

    collectLoadMetrics() {
        if (!performance.timing) return;

        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;

        this.addMetric('loadTime', loadTime);
        this.addMetric('domContentLoaded', domContentLoaded);

        if (import.meta.env.DEV) {
            console.log(`📊 Performance: Load ${loadTime}ms | DOM Ready ${domContentLoaded}ms`);
        }
    }

    addMetric(name: string, value: number, metadata?: Record<string, any>) {
        this.metrics.push({
            name,
            value,
            timestamp: Date.now(),
            metadata,
        });
    }

    getLongTasks() {
        return [...this.longTasks];
    }

    getMetrics() {
        return [...this.metrics];
    }

    getTotalLongTaskTime() {
        return this.longTasks.reduce((sum, task) => sum + task.duration, 0);
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.isActive = false;
    }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Decorator para medir tempo de execução de funções
 */
export function measurePerformance(name: string) {
    return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const start = performance.now();
            const result = originalMethod.apply(this, args);
            const duration = performance.now() - start;

            performanceMonitor.addMetric(name, duration);

            if (import.meta.env.DEV && duration > 10) {
                console.debug(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
            }

            return result;
        };

        return descriptor;
    };
}

/**
 * Higher Order Function para medir performance de funções
 */
export function withPerformance<T extends (...args: any[]) => any>(fn: T, name: string): T {
    return ((...args: Parameters<T>): ReturnType<T> => {
        const start = performance.now();
        const result = fn(...args);
        const duration = performance.now() - start;

        performanceMonitor.addMetric(name, duration);

        return result;
    }) as T;
}

// Inicializa automaticamente em produção
if (import.meta.env.PROD) {
    performanceMonitor.init();
}

export default performanceMonitor;