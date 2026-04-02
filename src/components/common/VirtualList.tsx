import type React from 'react';
import { useCallback, useRef, useState } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  containerHeight?: number;
  overscan?: number;
}

/**
 * VirtualList - Lista virtualizada otimizada para performance
 * 
 * Otimizações aplicadas:
 * 1. RAF para deferir leitura de scrollTop (evita reflow forçado)
 * 2. Threshold para evitar atualizações desnecessárias (mudança mínima de 8px)
 * 3. contain: strict para isolar renderização
 * 4. will-change: transform para elementos animados
 */
function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  containerHeight = 400,
  overscan = 5,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cancela RAF anterior para evitar múltiplas leituras
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Defer leitura de scrollTop para próximo frame (evita reflow forçado)
    // Isso separa a leitura do DOM das escritas pendentes
    rafRef.current = requestAnimationFrame(() => {
      const newScrollTop = container.scrollTop;

      // Threshold: só atualiza se mudou significativamente (evita micro-updates)
      // Isso reduz o número de re-renders durante scroll contínuo
      if (Math.abs(newScrollTop - lastScrollRef.current) > 8) {
        lastScrollRef.current = newScrollTop;
        setScrollTop(newScrollTop);
      }

      rafRef.current = null;
    });
  }, []);


  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;

  return (
    <div
      ref={containerRef}
      className='virtual-list-container'
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
        // Containment para isolar renderização e evitar reflows externos
        contain: 'layout style paint',
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          const translateY = actualIndex * itemHeight;
          return (
            <div
              key={actualIndex}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: itemHeight,
                transform: `translateY(${translateY}px)`,
                // GPU acceleration para transform
                willChange: 'transform',
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualList;