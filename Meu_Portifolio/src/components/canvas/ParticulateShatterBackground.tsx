import type React from 'react';
import { useEffect, useRef } from 'react';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import { useViewport } from '../../hooks/useViewport';

// Palette presets (from CodePen reference)
const PALETTE_PRESETS: Record<string, string[]> = {
  city: ['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#533483', '#ffd460'],
  nature: ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7'],
  sunset: ['#ff6b35', '#f7c59f', '#efefd0', '#004e89', '#1a659e', '#ff9f1c'],
  abstract: ['#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9', '#fdcb6e', '#e17055'],
};

interface ParticulateShatterBackgroundProps {
  speed: number;
  intensity: number;
  color: string;
  mode: string;
  quantity: number;
  size: number;
  friction: number;
  spring: number;
  palette: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  wanderSpeed: number;
  wanderStrength: number;
}

const ParticulateShatterBackground: React.FC<ParticulateShatterBackgroundProps> = ({
  speed,
  intensity,
  color,
  mode,
  quantity,
  size,
  friction,
  spring,
  palette,
  color1,
  color2,
  color3,
  color4,
  color5,
  color6,
  wanderSpeed,
  wanderStrength,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { config } = useParticleConfig();
  const { width: viewportWidth, height: viewportHeight } = useViewport();

  // Usa interactionMode global se disponível, senão usa o mode da prop
  // Mapeia interactionMode para o modo do particulate: 'attract' -> 'magnet', 'blow' -> 'blow'
  const getEffectiveMode = () => {
    const interactionMode = config.interactionMode || 'none';
    if (interactionMode === 'none') return mode; // Usa o modo da prop se não houver interação global
    if (interactionMode === 'attract') return 'magnet';
    if (interactionMode === 'blow') return 'blow';
    if (interactionMode === 'freeze') return 'freeze';
    return mode;
  };

  // Store mutable refs for values used inside animation loop
  const modeRef = useRef(getEffectiveMode());
  const speedRef = useRef(speed);
  const frictionRef = useRef(friction);
  const springRef = useRef(spring);
  const wanderSpeedRef = useRef(wanderSpeed);
  const wanderStrengthRef = useRef(wanderStrength);

  // Update refs when props change (no re-render needed for animation loop values)
  useEffect(() => {
    modeRef.current = getEffectiveMode();
  }, [mode, config.interactionMode]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    frictionRef.current = friction;
  }, [friction]);
  useEffect(() => {
    springRef.current = spring;
  }, [spring]);
  useEffect(() => {
    wanderSpeedRef.current = wanderSpeed;
  }, [wanderSpeed]);
  useEffect(() => {
    wanderStrengthRef.current = wanderStrength;
  }, [wanderStrength]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let W = viewportWidth;
    let H = viewportHeight;
    canvas.width = W;
    canvas.height = H;

    let mx = W / 2,
      my = H / 2;
    let isPointerDown = false;
    let animationId: number;

    // Build color palette
    const getColors = (): string[] => {
      if (palette !== 'custom' && PALETTE_PRESETS[palette]) {
        return PALETTE_PRESETS[palette];
      }
      return [color1, color2, color3, color4, color5, color6];
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
        : { r: 255, g: 255, b: 255 };
    };

    // Particle class (ported from CodePen with enhancements)
    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      r: number;
      g: number;
      b: number;
      size: number;
      baseSize: number;
      vx: number;
      vy: number;
      particleFriction: number;
      springStrength: number;
      wanderAngle: number;
      wanderSpeed: number;
      opacity: number;
      targetOpacity: number;

      constructor(
        x: number,
        y: number,
        originX: number,
        originY: number,
        r: number,
        g: number,
        b: number,
        pSize: number
      ) {
        this.x = x;
        this.y = y;
        this.originX = originX;
        this.originY = originY;
        this.r = r;
        this.g = g;
        this.b = b;
        this.size = pSize;
        this.baseSize = pSize;
        this.vx = 0;
        this.vy = 0;
        this.particleFriction = frictionRef.current + (Math.random() - 0.5) * 0.04;
        this.springStrength = springRef.current + Math.random() * 0.008;
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.wanderSpeed =
          (wanderSpeedRef.current + Math.random() * 0.02) * speedRef.current;
        this.opacity = 0;
        this.targetOpacity = intensity;
      }

      update() {
        this.opacity += (this.targetOpacity - this.opacity) * 0.05;
        const currentMode = modeRef.current;

        if (currentMode === 'freeze') {
          this.vx *= 0.95;
          this.vy *= 0.95;
          this.x += this.vx;
          this.y += this.vy;
          return;
        }

        // Spring back to origin
        const dx = this.originX - this.x;
        const dy = this.originY - this.y;
        this.vx += dx * springRef.current;
        this.vy += dy * springRef.current;

        // Gentle wander
        this.wanderAngle += this.wanderSpeed;
        this.vx += Math.cos(this.wanderAngle) * wanderStrengthRef.current;
        this.vy += Math.sin(this.wanderAngle) * wanderStrengthRef.current;

        // Mouse interaction
        if (isPointerDown || currentMode === 'magnet') {
          const mdx = this.x - mx;
          const mdy = this.y - my;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          const radius =
            currentMode === 'blow' ? 140 : currentMode === 'magnet' ? 200 : 0;

          if (dist < radius && dist > 0) {
            const force = (radius - dist) / radius;
            const angle = Math.atan2(mdy, mdx);

            if (currentMode === 'blow' && isPointerDown) {
              const power = force * force * 8;
              this.vx += Math.cos(angle) * power;
              this.vy += Math.sin(angle) * power;
              this.size = this.baseSize * (1 + force * 0.8);
            } else if (currentMode === 'magnet') {
              const power = force * 2;
              this.vx -= Math.cos(angle) * power;
              this.vy -= Math.sin(angle) * power;
              this.size = this.baseSize * (1 - force * 0.3);
            }
          } else {
            this.size += (this.baseSize - this.size) * 0.1;
          }
        } else {
          this.size += (this.baseSize - this.size) * 0.1;
        }

        this.vx *= frictionRef.current;
        this.vy *= frictionRef.current;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;

        // Rounded rect for pixel art feel
        const s = Math.max(1, this.size);
        const half = s / 2;
        const rad = s > 4 ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(this.x - half + rad, this.y - half);
        ctx.lineTo(this.x + half - rad, this.y - half);
        ctx.quadraticCurveTo(
          this.x + half,
          this.y - half,
          this.x + half,
          this.y - half + rad
        );
        ctx.lineTo(this.x + half, this.y + half - rad);
        ctx.quadraticCurveTo(
          this.x + half,
          this.y + half,
          this.x + half - rad,
          this.y + half
        );
        ctx.lineTo(this.x - half + rad, this.y + half);
        ctx.quadraticCurveTo(
          this.x - half,
          this.y + half,
          this.x - half,
          this.y + half - rad
        );
        ctx.lineTo(this.x - half, this.y - half + rad);
        ctx.quadraticCurveTo(
          this.x - half,
          this.y - half,
          this.x - half + rad,
          this.y - half
        );
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    let particles: Particle[] = [];

    const createParticles = () => {
      particles = [];
      const colors = getColors();
      const rgbColors = colors.map(hexToRgb);

      for (let i = 0; i < quantity; i++) {
        const originX = Math.random() * W;
        const originY = Math.random() * H;

        // Spawn from random edge
        const edge = Math.random();
        let sx: number, sy: number;
        if (edge < 0.25) {
          sx = Math.random() * W;
          sy = -50;
        } else if (edge < 0.5) {
          sx = Math.random() * W;
          sy = H + 50;
        } else if (edge < 0.75) {
          sx = -50;
          sy = Math.random() * H;
        } else {
          sx = W + 50;
          sy = Math.random() * H;
        }

        const c = rgbColors[i % rgbColors.length];
        // Add slight color variation
        const r = Math.max(0, Math.min(255, c.r + (Math.random() - 0.5) * 30));
        const g = Math.max(0, Math.min(255, c.g + (Math.random() - 0.5) * 30));
        const b = Math.max(0, Math.min(255, c.b + (Math.random() - 0.5) * 30));

        const p = new Particle(sx, sy, originX, originY, r, g, b, size);
        p.vx = (originX - sx) * 0.01 + (Math.random() - 0.5) * 2;
        p.vy = (originY - sy) * 0.01 + (Math.random() - 0.5) * 2;
        particles.push(p);
      }
    };
    createParticles();

    // Mouse/touch events
    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const handleMouseDown = () => {
      isPointerDown = true;
    };
    const handleMouseUp = () => {
      isPointerDown = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      isPointerDown = true;
      if (e.touches.length > 0) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = () => {
      isPointerDown = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Resize handler - usa valores do hook useViewport
    const handleResize = () => {
      W = viewportWidth;
      H = viewportHeight;
      canvas.width = W;
      canvas.height = H;
      createParticles();
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(8, 8, 12, 0.25)';
      ctx.fillRect(0, 0, W, H);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    quantity,
    size,
    intensity,
    color,
    palette,
    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
    wanderSpeed,
    wanderStrength,
    viewportWidth,
    viewportHeight,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        // Background nunca deve bloquear scroll da página
        pointerEvents: 'none',
        touchAction: 'pan-y',
      }}
    />
  );
};

export default ParticulateShatterBackground;
