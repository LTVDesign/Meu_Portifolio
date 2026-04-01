import type React from 'react';
import { useEffect, useRef } from 'react';

interface MatrixRainBackgroundProps {
  density?: number;
  speed?: number;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  charSet?: 'matrix' | 'binary' | 'japanese' | 'mixed';
  glowIntensity?: number;
  trailLength?: number;
  columnSpacing?: number;
}

const MatrixRainBackground: React.FC<MatrixRainBackgroundProps> = ({
  density = 50,
  speed = 50,
  fontSize = 16,
  color = '#00ff00',
  backgroundColor = '#000000',
  charSet = 'matrix',
  glowIntensity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const charSets: Record<string, string> = {
      matrix: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}+-*/=#!$%&?',
      binary: '01',
      japanese:
        'アカサタナハマヤラワガザダバパイィウゥエェオォカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ',
      mixed: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アカサタナハマヤラワ',
    };

    const chars = charSets[charSet] || charSets.matrix;

    // Calcular número de colunas baseado na densidade e tamanho da fonte
    const columns = Math.floor(width / (fontSize * (100 / density)));
    const drops: number[] = [];

    // Inicializar drops com posições aleatórias para não começarem todos juntos
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let lastTime = 0;
    const fps = Math.max(1, (101 - speed) / 2); // Ajusta a velocidade baseado no prop speed (1-100)
    const frameInterval = 1000 / fps;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime > frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);

        // Efeito de trail: desenha um retângulo semi-transparente sobre o frame anterior
        ctx.fillStyle = `${backgroundColor}1a`; // '1a' é ~0.1 de opacidade
        ctx.fillRect(0, 0, width, height);

        ctx.font = `bold ${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];

          // X position based on column distribution
          const x = (i * width) / columns;
          const y = drops[i] * fontSize;

          // Glow Effect
          if (glowIntensity > 0) {
            ctx.shadowBlur = glowIntensity * 10;
            ctx.shadowColor = color;
          }

          // Sorteia caracteres mais claros para o "topo" da chuva
          if (Math.random() > 0.95) {
            ctx.fillStyle = '#fff';
          } else {
            ctx.fillStyle = color;
          }

          ctx.fillText(char, x, y);

          // Reseta sombra para não afetar tudo
          ctx.shadowBlur = 0;

          // Move o drop para baixo
          drops[i]++;

          // Reseta o drop quando sai da tela
          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Recalcula colunas no resize
      const newColumns = Math.floor(width / (fontSize * (100 / density)));
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.random() * -20;
        }
      } else if (newColumns < drops.length) {
        drops.length = newColumns;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, speed, fontSize, color, backgroundColor, charSet, glowIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 -z-10 pointer-events-none'
      style={{
        backgroundColor,
        display: 'block',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default MatrixRainBackground;
