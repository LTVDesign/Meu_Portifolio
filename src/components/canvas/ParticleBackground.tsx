import { useEffect, useRef, memo } from 'react';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import { usePerformance } from '../../contexts/PerformanceContext';
import { useViewport } from '../../hooks/useViewport';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface ParticleBackgroundProps {
  particleColor?: string;
  speed?: number;
  intensity?: number;
  quantity?: number;
  zoom?: number;
  particleSize?: number;
  particleConnectDistance?: number;
  lineThickness?: number;
  particleOpacity?: number;
  particleLineColor?: string;
}

const ParticleBackground = ({
  particleColor = '#915EFF',
  speed = 1,
  intensity = 0.7,
  quantity = 100,
  zoom = 1,
  particleSize = 1.5,
  particleConnectDistance = 120,
  lineThickness = 1.0,
  particleOpacity = 0.8,
  particleLineColor = '#915EFF',
}: ParticleBackgroundProps) => {
  const { isLowPerformance, level } = usePerformance();
  const { config } = useParticleConfig();
  const { width: viewportWidth, height: viewportHeight } = useViewport();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseMoveRef = useRef(0);
  const canvasRectRef = useRef<DOMRect | null>(null);

  const mouseInteractionRadius = isLowPerformance ? 80 : 150;
  const mouseForce = isLowPerformance ? 0.08 : 0.2;
  const adjustedConnectDistance = isLowPerformance ? Math.min(particleConnectDistance, 80) : particleConnectDistance;
  const maxConnectionsLimit = isLowPerformance ? 20 : 50;

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = viewportWidth;
    const height = viewportHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    canvasRectRef.current = {
      left: 0,
      top: 0,
      width: width,
      height: height,
      right: width,
      bottom: height,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };
  };

  const createParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = [];

    // Ajusta quantidade baseado na performance
    const adjustedQuantity = level === 'low' ? Math.min(quantity, 30) :
      level === 'medium' ? Math.min(quantity, 60) :
        quantity;

    for (let i = 0; i < adjustedQuantity; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5 * speed,
        vy: (Math.random() - 0.5) * 0.5 * speed,
        size: (Math.random() * particleSize + 0.5) * zoom,
      });
    }
  };

  const updateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mode = config.interactionMode || 'none';
    const isFrozen = mode === 'freeze';

    particlesRef.current.forEach((particle) => {
      if (isFrozen) {
        return; // Não atualiza posições se congelado
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce nas bordas sem teletransporte
      if (particle.x < 0) {
        particle.x = 0;
        particle.vx *= -1;
      } else if (particle.x > canvas.width) {
        particle.x = canvas.width;
        particle.vx *= -1;
      }

      if (particle.y < 0) {
        particle.y = 0;
        particle.vy *= -1;
      } else if (particle.y > canvas.height) {
        particle.y = canvas.height;
        particle.vy *= -1;
      }
    });
  };

  const drawParticles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    const particles = particlesRef.current;

    // Draw particles (pula algumas em baixa performance)
    const particleStep = isLowPerformance ? 2 : 1;
    for (let i = 0; i < particles.length; i += particleStep) {
      const particle = particles[i];
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.globalAlpha = intensity * particleOpacity;
      ctx.fill();
    }

    // Draw connections (limitado baseado na performance)
    const maxConnections = maxConnectionsLimit;
    const connectionDistance = adjustedConnectDistance;

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      let connections = 0;

      for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < connectionDistance * connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = particleLineColor;
          ctx.globalAlpha =
            (1 - Math.sqrt(distanceSq) / connectionDistance) *
            intensity *
            particleOpacity *
            0.5;
          ctx.lineWidth = lineThickness;
          ctx.stroke();
          connections++;
        }
      }
    }

    // Mouse interaction
    const mode = config.interactionMode || 'none';
    if (mode !== 'none' && mode !== 'freeze') {
      const isAttract = mode === 'attract';
      const forceMultiplier = isAttract ? 1 : -1; // Atração: positivo, Repulsão: negativo

      particles.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInteractionRadius && distance > 0) {
          const force = (mouseInteractionRadius - distance) / mouseInteractionRadius;
          const directionX = (dx / distance) * force * mouseForce * forceMultiplier;
          const directionY = (dy / distance) * force * mouseForce * forceMultiplier;

          particle.vx += directionX;
          particle.vy += directionY;
        }
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const now = Date.now();
    // Throttle mais agressivo em baixa performance
    const throttleTime = isLowPerformance ? 32 : 16;
    if (now - lastMouseMoveRef.current < throttleTime) return;
    lastMouseMoveRef.current = now;

    // Usa o rect cacheado em vez de chamar getBoundingClientRect a cada evento
    const rect = canvasRectRef.current;
    if (rect) {
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    } else {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
  };

  // Inicialização
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    createParticles();

    const onResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [quantity, isLowPerformance, viewportWidth, viewportHeight]);

  // Animação com requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    quantity,
    particleColor,
    speed,
    intensity,
    particleConnectDistance,
    lineThickness,
    particleOpacity,
    particleLineColor,
    particleSize,
    zoom,
    config.interactionMode,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        touchAction: 'pan-y',
      }}
    />
  );
};

export default memo(ParticleBackground);
