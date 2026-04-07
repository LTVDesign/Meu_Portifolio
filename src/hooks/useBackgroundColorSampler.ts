// src/hooks/useBackgroundColorSampler.ts
// Amostragem em tempo real de pixels do background canvas para ajustar
// a cor do texto dinamicamente contra backgrounds animados.

import { useCallback, useEffect, useRef } from 'react';

/**
* Faz amostragem de pixels do canvas de background em tempo real
* e atualiza CSS variables globais para que textos se adaptem.
*
* Otimizações de Performance:
* 1. Cache de Contextos: Evita .getContext() síncrono a cada frame.
* 2. Throttling Inteligente: Amostragem a ~12fps (independente do anim rate).
* 3. Batching de DOM: Atualiza variáveis CSS apenas quando necessário.
* 4. Zero Reflow: Usa ResizeObserver para cache de dimensões.
*/

interface CanvasEntry {
  canvas: HTMLCanvasElement;
  ctx2d: CanvasRenderingContext2D | null;
  gl: WebGLRenderingContext | WebGL2RenderingContext | null;
  type: '2d' | 'webgl';
}

// Singleton Cache para evitar buscas no DOM e inicializações caras de contexto
let cachedCanvasEntries: CanvasEntry[] | null = null;
let lastCanvasDiscoveryTime = 0;
const DISCOVERY_INTERVAL = 2000; // Re-procura backgrounds a cada 2s
const SAMPLING_FPS = 12;
const SAMPLING_INTERVAL = 1000 / SAMPLING_FPS;

export function useBackgroundColorSampler() {
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);
  const lastAppliedColors = useRef({ bg: '', text: '' });
  
  // Cache de dimensões para evitar reflow síncrono
  const dimensionsRef = useRef({ vw: window.innerWidth, vh: window.innerHeight });

  // Pontos de amostragem estratégicos (viewport-relative)
  const samplePoints = useRef([
    { x: 0.5, y: 0.15 }, // Hero Area
    { x: 0.5, y: 0.5 },  // Middle
    { x: 0.2, y: 0.4 },  // Left
    { x: 0.8, y: 0.4 },  // Right
    { x: 0.5, y: 0.85 }, // Footer/Bottom
  ]);

  /**
   * Descobre canvases de background e inicializa seus contextos uma única vez.
   */
  const discoverBackgrounds = useCallback((): CanvasEntry[] => {
    const now = Date.now();
    if (cachedCanvasEntries && (now - lastCanvasDiscoveryTime) < DISCOVERY_INTERVAL) {
      return cachedCanvasEntries;
    }

    const entries: CanvasEntry[] = [];
    const canvases = document.querySelectorAll<HTMLCanvasElement>('canvas');
    
    canvases.forEach(canvas => {
      // Filtra por atributos ou posição fixa (estratégia de detecção de bg)
      const isBg = canvas.hasAttribute('data-bg-type') || 
                   canvas.getAttribute('id')?.includes('particle') ||
                   window.getComputedStyle(canvas).position === 'fixed';
      
      if (!isBg) return;

      let type: '2d' | 'webgl' = '2d';
      let ctx2d: CanvasRenderingContext2D | null = null;
      let gl: any = null;

      // Tenta obter contexto 2D primeiro se não for explicitamente WebGL
      if (!canvas.getAttribute('data-bg-type')?.includes('liquid') && 
          !canvas.getAttribute('data-bg-type')?.includes('tunnel') &&
          !canvas.getAttribute('data-bg-type')?.includes('wavefield')) {
        ctx2d = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx2d) type = '2d';
      }

      // Se falhou 2D ou é explicitamente WebGL
      if (!ctx2d) {
        gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
             canvas.getContext('webgl', { preserveDrawingBuffer: true });
        if (gl) type = 'webgl';
      }

      if (ctx2d || gl) {
        entries.push({ canvas, ctx2d, gl, type });
      }
    });

    cachedCanvasEntries = entries;
    lastCanvasDiscoveryTime = now;
    return entries;
  }, []);

  const getPixel = (entry: CanvasEntry, x: number, y: number): [number, number, number] | null => {
    const { canvas, ctx2d, gl, type } = entry;
    if (canvas.width === 0 || canvas.height === 0) return null;

    const dpr = window.devicePixelRatio || 1;
    const px = Math.min(Math.floor(x * dpr), canvas.width - 1);
    const py = Math.min(Math.floor(y * dpr), canvas.height - 1);

    if (px < 0 || py < 0) return null;

    try {
      if (type === '2d' && ctx2d) {
        const data = ctx2d.getImageData(px, py, 1, 1).data;
        if (data[3] < 10) return null; // Transparente
        return [data[0], data[1], data[2]];
      } 
      
      if (type === 'webgl' && gl) {
        const pixels = new Uint8Array(4);
        // WebGL Y é invertido (bottom-to-top)
        const glPy = canvas.height - py - 1;
        gl.readPixels(px, glPy, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        if (pixels[3] < 10 && pixels[0] === 0 && pixels[1] === 0 && pixels[2] === 0) return null;
        return [pixels[0], pixels[1], pixels[2]];
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const updateColors = useCallback(() => {
    const now = performance.now();
    if (now - lastUpdateRef.current < SAMPLING_INTERVAL) {
      rafRef.current = requestAnimationFrame(updateColors);
      return;
    }
    lastUpdateRef.current = now;

    const entries = discoverBackgrounds();
    if (entries.length === 0) {
      rafRef.current = requestAnimationFrame(updateColors);
      return;
    }

    let r = 0, g = 0, b = 0, count = 0;
    const { vw, vh } = dimensionsRef.current;

    for (const entry of entries) {
      for (const p of samplePoints.current) {
        const color = getPixel(entry, p.x * vw, p.y * vh);
        if (color) {
          r += color[0]; g += color[1]; b += color[2];
          count++;
        }
      }
    }

    if (count > 0) {
      const avgR = Math.round(r / count);
      const avgG = Math.round(g / count);
      const avgB = Math.round(b / count);

      // Conversão SRGB para Luminância linear (WCAG)
      const rs = avgR / 255, gs = avgG / 255, bs = avgB / 255;
      const rl = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
      const gl = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
      const bl = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
      const luminance = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;

      const bgHex = `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
      const isDark = luminance < 0.45; // Threshold balanceado para legibilidade
      const textColor = isDark ? '#ffffff' : '#000000';
      const textSecondary = isDark ? '#d1d5db' : '#374151';

      // Batch DOM update: Só mexe no CSS se realmente mudou significativamente
      if (lastAppliedColors.current.bg !== bgHex || lastAppliedColors.current.text !== textColor) {
        lastAppliedColors.current = { bg: bgHex, text: textColor };
        
        requestAnimationFrame(() => {
          const root = document.documentElement;
          root.style.setProperty('--dynamic-text-color', textColor);
          root.style.setProperty('--dynamic-text-secondary', textSecondary);
          root.style.setProperty('--dynamic-bg-color', bgHex);
          root.style.setProperty('--dynamic-bg-luminance', luminance.toFixed(3));
          root.style.setProperty('--dynamic-text-is-dark', isDark ? 'true' : 'false');
        });
      }
    }

    rafRef.current = requestAnimationFrame(updateColors);
  }, [discoverBackgrounds]);

  useEffect(() => {
    // Observer de redimensionamento para atualizar cache de dimensões sem causar reflow
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        dimensionsRef.current = {
          vw: Math.round(entry.contentRect.width),
          vh: Math.round(entry.contentRect.height)
        };
      }
    });

    ro.observe(document.documentElement);
    rafRef.current = requestAnimationFrame(updateColors);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cachedCanvasEntries = null;
    };
  }, [updateColors]);

  return null;
}
