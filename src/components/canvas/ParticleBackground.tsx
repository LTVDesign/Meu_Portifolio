import React, { useEffect, useRef } from 'react';
import { usePerformance } from '../../contexts/PerformanceContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

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
  const { isLowPerformance } = usePerformance();
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseInteractionRadius = isLowPerformance ? 100 : 150;
  const mouseForce = isLowPerformance ? 0.1 : 0.2;
  const lastMouseMoveRef = useRef(0);
  const canvasRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particlesRef.current = [];

      for (let i = 0; i < quantity; i++) {
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
      if (prefersReduced) return; // Não animar se preferir redução de movimento
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Otimização: Usar path único para múltiplos círculos
      const particles = particlesRef.current;

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = intensity * particleOpacity;
        ctx.fill();
      }

      // Se preferir redução de movimento, pular animações de conexão
      if (prefersReduced) return;

      // Draw connections (otimizado: limitar a 50 partículas mais próximas)
      const maxConnections = 50;
      const connectionDistance = particleConnectDistance;

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
              (1 - Math.sqrt(distanceSq) / connectionDistance) * intensity * particleOpacity * 0.5;
            ctx.lineWidth = lineThickness;
            ctx.stroke();
            connections++;
          }
        }
      }

      // Draw mouse connections (otimizado)
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseRadiusSq = mouseInteractionRadius * mouseInteractionRadius;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < mouseRadiusSq) {
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(particle.x, particle.y);
          ctx.strokeStyle = particleLineColor;
          ctx.globalAlpha =
            (1 - Math.sqrt(distanceSq) / mouseInteractionRadius) *
            intensity *
            particleOpacity *
            0.6;
          ctx.lineWidth = lineThickness;
          ctx.stroke();
        }
      }

      // Mouse interaction
      particlesRef.current.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInteractionRadius) {
          const force = (mouseInteractionRadius - distance) / mouseInteractionRadius;
          particle.vx += (dx / distance) * force * mouseForce;
          particle.vy += (dy / distance) * force * mouseForce;
        }
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      if (!prefersReduced) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const updateCanvasRect = () => {
      if (canvas) {
        canvasRectRef.current = canvas.getBoundingClientRect();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle mousemove para 60fps (16ms)
      if (now - lastMouseMoveRef.current < 16) return;
      lastMouseMoveRef.current = now;

      if (!canvasRectRef.current) updateCanvasRect();
      const rect = canvasRectRef.current;

      if (rect) {
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      }
    };

    const handleResize = () => {
      resizeCanvas();
      updateCanvasRect();
      createParticles();
    };

    resizeCanvas();
    updateCanvasRect();
    createParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [
    particleColor,
    speed,
    intensity,
    quantity,
    zoom,
    particleSize,
    particleConnectDistance,
    lineThickness,
    particleOpacity,
    particleLineColor,
    prefersReduced,
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
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default React.memo(ParticleBackground);
