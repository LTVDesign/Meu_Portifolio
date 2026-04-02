// src/hooks/useBackgroundColorSampler.ts
// Amostragem em tempo real de pixels do background canvas para ajustar
// a cor do texto dinamicamente contra backgrounds animados.

import { useCallback, useEffect, useRef } from 'react';
import { useParticleConfig } from '../contexts/ParticleConfigContext';

/**
 * Faz amostragem de pixels do canvas de background em tempo real
 * e atualiza CSS variables globais para que textos se adaptem.
 * 
 * Estratégia híbrida:
 * - Canvas 2D: leitura direta de pixels (Particles, Matrix, Particulate)
 * - WebGL/Three.js: leitura de pixels com preserveDrawingBuffer habilitado
 * - Fallback: usa cores do config se não conseguir ler pixels
 * 
 * Throttled a ~8fps para performance mínima.
 */
export function useBackgroundColorSampler() {
  const { config } = useParticleConfig();
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);
  const lastColorRef = useRef('#000000');
  const lastTextRef = useRef('#ffffff');
  const frameCountRef = useRef(0);

  // Pontos de amostragem (viewport-relative)
  const samplePoints = useRef([
    { x: 0.5, y: 0.15 },  // centro-topo (Hero)
    { x: 0.5, y: 0.3 },   // centro-meio
    { x: 0.5, y: 0.5 },   // centro
    { x: 0.25, y: 0.4 },  // esquerda
    { x: 0.75, y: 0.4 },  // direita
    { x: 0.5, y: 0.7 },   // centro-baixo
  ]);

  const getPixelFromCanvas2D = useCallback((canvas: HTMLCanvasElement, x: number, y: number): [number, number, number] | null => {
    try {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return null;

      const dpr = window.devicePixelRatio || 1;
      const px = Math.min(Math.floor(x * dpr), canvas.width - 1);
      const py = Math.min(Math.floor(y * dpr), canvas.height - 1);

      if (px < 0 || py < 0) return null;

      const imageData = ctx.getImageData(px, py, 1, 1);
      const d = imageData.data;

      // Ignora pixels completamente transparentes
      if (d[3] < 10) return null;

      return [d[0], d[1], d[2]];
    } catch {
      return null;
    }
  }, []);

  const getPixelFromWebGL = useCallback((canvas: HTMLCanvasElement, x: number, y: number): [number, number, number] | null => {
    try {
      const gl = (canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
        canvas.getContext('webgl', { preserveDrawingBuffer: true })) as WebGLRenderingContext | null;
      if (!gl) return null;

      const dpr = window.devicePixelRatio || 1;
      const px = Math.min(Math.floor(x * dpr), canvas.width - 1);
      // WebGL Y invertido
      const py = Math.max(0, canvas.height - Math.floor(y * dpr) - 1);

      const pixels = new Uint8Array(4);
      gl.readPixels(px, py, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

      // Ignora pixels transparentes ou pretos puros (podem ser buffer vazio)
      if (pixels[3] < 10 && pixels[0] === 0 && pixels[1] === 0 && pixels[2] === 0) return null;

      return [pixels[0], pixels[1], pixels[2]];
    } catch {
      return null;
    }
  }, []);

  // Fallback: calcula cor do texto baseado nas cores da configuração
  const getConfigBasedColor = useCallback((): { text: string; secondary: string; bg: string; luminance: number } => {
    let bgHex = '#050816';

    switch (config.backgroundType) {
      case 'solid':
        bgHex = config.solidColor1 || '#050816';
        break;
      case 'liquid':
        bgHex = config.liquidColor1 || '#050816';
        break;
      case 'wavefield':
        bgHex = config.wavefieldColor || '#050816';
        break;
      case 'cyberpunk':
        bgHex = '#0a0a1a';
        break;
      case 'matrix':
        bgHex = config.matrixBackgroundColor || '#000000';
        break;
      case 'bolhas':
        bgHex = '#0a0a2e';
        break;
      case 'particulate':
        bgHex = config.particulateColor1 || '#0a0a1a';
        break;
      case 'particles':
        bgHex = '#050816';
        break;
    }

    // Parse hex
    const r = parseInt(bgHex.slice(1, 3), 16) / 255;
    const g = parseInt(bgHex.slice(3, 5), 16) / 255;
    const b = parseInt(bgHex.slice(5, 7), 16) / 255;
    const rLin = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gLin = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bLin = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    const luminance = 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;

    return {
      text: luminance > 0.4 ? '#000000' : '#ffffff',
      secondary: luminance > 0.4 ? '#333333' : '#d1d5db',
      bg: bgHex,
      luminance,
    };
  }, [config]);

  const sampleBackground = useCallback(() => {
    const now = Date.now();
    // Throttle: ~8fps (125ms) - suficiente para parecer em tempo real
    if (now - lastUpdateRef.current < 125) {
      rafRef.current = requestAnimationFrame(sampleBackground);
      return;
    }
    lastUpdateRef.current = now;
    frameCountRef.current++;

    // Encontra todos os canvas dentro do container de background
    const bgContainer = document.querySelector('[data-background]');
    const canvases: HTMLCanvasElement[] = [];

    if (bgContainer) {
      // Canvas filhos do container de background
      bgContainer.querySelectorAll<HTMLCanvasElement>('canvas').forEach(c => canvases.push(c));
    }

    // Canvas do ParticlesCanvas (id específico)
    const particlesCanvas = document.getElementById('particles-canvas') as HTMLCanvasElement | null;
    if (particlesCanvas) canvases.push(particlesCanvas);

    // Também procura por canvas fixos que podem ser backgrounds
    document.querySelectorAll<HTMLCanvasElement>('canvas').forEach(c => {
      const style = window.getComputedStyle(c);
      if (style.position === 'fixed' && !canvases.includes(c)) {
        canvases.push(c);
      }
    });

    let totalR = 0, totalG = 0, totalB = 0, validSamples = 0;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    for (const canvas of canvases) {
      if (canvas.width === 0 || canvas.height === 0) continue;

      for (const point of samplePoints.current) {
        const screenX = point.x * vw;
        const screenY = point.y * vh;

        // Tenta Canvas 2D primeiro (mais confiável)
        let color = getPixelFromCanvas2D(canvas, screenX, screenY);

        // Se falhou, tenta WebGL
        if (!color) {
          color = getPixelFromWebGL(canvas, screenX, screenY);
        }

        if (color) {
          totalR += color[0];
          totalG += color[1];
          totalB += color[2];
          validSamples++;
        }
      }
    }

    let textColor: string;
    let textSecondary: string;
    let bgHex: string;
    let luminance: number;

    if (validSamples >= 2) {
      // Usa amostragem real
      const avgR = Math.round(totalR / validSamples);
      const avgG = Math.round(totalG / validSamples);
      const avgB = Math.round(totalB / validSamples);

      // Luminância relativa WCAG
      const rNorm = avgR / 255;
      const gNorm = avgG / 255;
      const bNorm = avgB / 255;
      const rLin = rNorm <= 0.03928 ? rNorm / 12.92 : Math.pow((rNorm + 0.055) / 1.055, 2.4);
      const gLin = gNorm <= 0.03928 ? gNorm / 12.92 : Math.pow((gNorm + 0.055) / 1.055, 2.4);
      const bLin = bNorm <= 0.03928 ? bNorm / 12.92 : Math.pow((bNorm + 0.055) / 1.055, 2.4);
      luminance = 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;

      bgHex = `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
      // Garante contraste adequado: fundo claro = texto escuro, fundo escuro = texto claro
      // Threshold mais baixo (0.3) para detectar fundos claros mais cedo
      const isLightBackground = luminance > 0.3;
      const isVeryLightBackground = luminance > 0.7;
      textColor = isLightBackground ? '#000000' : '#ffffff';
      // Para fundos muito claros (branco), usa cinza escuro para melhor contraste
      textSecondary = isVeryLightBackground ? '#333333' : isLightBackground ? '#1a1a1a' : '#d1d5db';
    } else {
      // Fallback: usa config
      const fallback = getConfigBasedColor();
      textColor = fallback.text;
      textSecondary = fallback.secondary;
      bgHex = fallback.bg;
      luminance = fallback.luminance;
    }

    // Só atualiza DOM se mudou (evita repaints desnecessários)
    if (bgHex !== lastColorRef.current || textColor !== lastTextRef.current) {
      lastColorRef.current = bgHex;
      lastTextRef.current = textColor;

      const root = document.documentElement;
      root.style.setProperty('--dynamic-text-color', textColor);
      root.style.setProperty('--dynamic-text-secondary', textSecondary);
      root.style.setProperty('--dynamic-bg-color', bgHex);
      root.style.setProperty('--dynamic-bg-luminance', luminance.toFixed(3));
      root.style.setProperty('--dynamic-text-is-dark', luminance > 0.4 ? 'true' : 'false');
    }

    rafRef.current = requestAnimationFrame(sampleBackground);
  }, [getPixelFromCanvas2D, getPixelFromWebGL, getConfigBasedColor]);

  useEffect(() => {
    // Inicia a amostragem após delay para backgrounds carregarem
    const timer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(sampleBackground);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sampleBackground]);
}
