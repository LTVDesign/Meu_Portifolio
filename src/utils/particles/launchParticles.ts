/**
 * Sistema de partículas otimizado para botões
 * Performance melhorada: cache de sprites, limite de partículas, loop reverso
 */

interface Config {
  burstCount: number;
  ambientInterval: number;
  spriteSize: number;
  shapeRadius: number;
  spriteCacheLimit: number;
  hueJitter: number;
  fadeRate: { min: number; max: number };
  burstSpeed: { min: number; max: number };
  ambientSpeed: number;
  burstSize: { min: number; max: number };
  ambientSize: { min: number; max: number };
  burstGravity: number;
  ambientGravity: number;
  maxParticles: number;
}

interface Particle {
  x: number;
  y: number;
  sprite: HTMLCanvasElement;
  isBurst: boolean;
  fade: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  gravity: number;
}

interface ButtonPosition {
  x: number;
  y: number;
  w: number;
}

type ShapeFunction = (ctx: CanvasRenderingContext2D, cx: number, r: number) => void;

export const initLaunchParticles = (
  canvas: HTMLCanvasElement,
  btn: HTMLElement
): (() => void) => {
  if (!canvas || !btn) return () => { };

  const CONFIG: Config = {
    burstCount: 60, // Reduzido de 80 para 60
    ambientInterval: 8, // Aumentado de 6 para 8 (menos partículas ambientais)
    spriteSize: 48, // Reduzido de 64 para 48
    shapeRadius: 10, // Reduzido de 14 para 10
    spriteCacheLimit: 80, // Reduzido de 120 para 80
    hueJitter: 25, // Reduzido de 35 para 25
    fadeRate: { min: 0.006, max: 0.012 }, // Aumentado para partículas sumirem mais rápido
    burstSpeed: { min: 0.5, max: 1.2 }, // Reduzido
    ambientSpeed: 0.12, // Reduzido de 0.18 para 0.12
    burstSize: { min: 0.5, max: 0.9 }, // Reduzido
    ambientSize: { min: 0.25, max: 0.55 }, // Reduzido
    burstGravity: 0.008, // Reduzido de 0.011
    ambientGravity: 0.0015, // Reduzido de 0.0025
    maxParticles: 200, // Reduzido de 300 para 200
  };

  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true, willReadFrequently: true });
  if (!ctx) return () => { };

  let particles: Particle[] = [];
  let frameCount: number = 0;
  let isHovered: boolean = false;
  let pxPerVw: number = 0;
  let btnPos: ButtonPosition = { x: 0, y: 0, w: 0 };
  let dpr: number = window.devicePixelRatio ?? 1;
  let animationId: number;
  let btnPosCache: ButtonPosition | null = null;
  let lastBtnPosUpdate = 0;
  const BTN_POS_CACHE_DURATION = 1000; // Cache por 1 segundo

  const rand = (min: number, max: number): number => min + Math.random() * (max - min);
  const vw = (n: number): number => n * pxPerVw;

  const shapePathFns: Record<string, ShapeFunction> = {
    circle: (ctx: CanvasRenderingContext2D, cx: number, r: number) =>
      ctx.arc(cx, cx, r, 0, Math.PI * 2),
    square: (ctx: CanvasRenderingContext2D, cx: number, r: number) =>
      ctx.rect(cx - r, cx - r, r * 2, r * 2),
    diamond: (ctx: CanvasRenderingContext2D, cx: number, r: number) => {
      ctx.moveTo(cx, cx - r);
      ctx.lineTo(cx + r, cx);
      ctx.lineTo(cx, cx + r);
      ctx.lineTo(cx - r, cx);
      ctx.closePath();
    },
    triangle: (ctx: CanvasRenderingContext2D, cx: number, r: number) => {
      ctx.moveTo(cx, cx - r);
      ctx.lineTo(cx + r, cx + r);
      ctx.lineTo(cx - r, cx + r);
      ctx.closePath();
    },
  };

  const SHAPES = Object.keys(shapePathFns);
  const pickShape = (): string => SHAPES[Math.floor(Math.random() * SHAPES.length)];

  const spriteCache = new Map<string, HTMLCanvasElement>();

  const buildSprite = (shape: string, hue: number): HTMLCanvasElement => {
    const { spriteSize, shapeRadius } = CONFIG;
    const offscreen = document.createElement('canvas');
    offscreen.width = spriteSize;
    offscreen.height = spriteSize;
    const octx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!octx) return offscreen;

    const color = `oklch(78% 0.30 ${hue}deg)`;
    const center = spriteSize / 2;

    octx.fillStyle = color;
    octx.shadowBlur = 10;
    octx.shadowColor = color;
    octx.beginPath();
    (shapePathFns[shape] ?? shapePathFns.circle)(octx, center, shapeRadius);
    octx.fill();

    return offscreen;
  };

  const getSprite = (shape: string, hue: number): HTMLCanvasElement => {
    const { spriteCacheLimit } = CONFIG;
    const snappedHue = Math.round(hue / 10) * 10;
    const key = `${shape}_${snappedHue}`;
    const cached = spriteCache.get(key);

    if (cached) {
      spriteCache.delete(key);
      spriteCache.set(key, cached);
      return cached;
    }

    const sprite = buildSprite(shape, snappedHue);
    spriteCache.set(key, sprite);

    if (spriteCache.size > spriteCacheLimit) {
      const firstKey = spriteCache.keys().next().value;
      if (firstKey) spriteCache.delete(firstKey);
    }

    return sprite;
  };

  const updateBtnPosition = (): void => {
    const now = performance.now();
    // Usa cache se disponível e válido
    if (btnPosCache && now - lastBtnPosUpdate < BTN_POS_CACHE_DURATION) {
      btnPos = btnPosCache;
      return;
    }

    // Atualiza a posição do botão fora do ciclo de renderização principal
    // Usa requestAnimationFrame para separar leituras de escritas do DOM
    requestAnimationFrame(() => {
      const rect = btn.getBoundingClientRect();
      btnPosCache = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        w: rect.width,
      };
      btnPos = btnPosCache;
      lastBtnPosUpdate = performance.now();
    });
  };

  const syncLayout = (): void => {
    dpr = window.devicePixelRatio ?? 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Fase 1: Escritas no DOM (todas juntas) - isso invalida o layout
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pxPerVw = w / 100;

    // Fase 2: Leitura - Separada das escritas para evitar reflow forçado
    // Atualiza a posição do botão de forma assíncrona
    updateBtnPosition();
  };

  const gradientAngle = (): number => ((performance.now() % 4000) / 4000) * 360;

  const hueAt = (clientX: number, clientY: number): number => {
    const angle = (Math.atan2(clientY - btnPos.y, clientX - btnPos.x) * 180) / Math.PI;
    return (angle + 90 - gradientAngle() + 720) % 360;
  };

  const randomEdgeOrigin = (): { x: number; y: number; hue: number } => {
    const angle = rand(0, Math.PI * 2);
    const r = btnPos.w * 0.5 * rand(0.85, 1.05);
    const hue = ((angle * 180) / Math.PI + 90 - gradientAngle() + 720) % 360;
    return {
      x: btnPos.x + Math.cos(angle) * r,
      y: btnPos.y + Math.sin(angle) * r * 0.4,
      hue,
    };
  };

  const spawnParticle = (
    x: number,
    y: number,
    isBurst = false,
    baseHue: number | null = null
  ): Particle => {
    const {
      hueJitter,
      burstSpeed,
      ambientSpeed,
      burstSize,
      ambientSize,
      burstGravity,
      ambientGravity,
      fadeRate,
    } = CONFIG;

    const hue = baseHue !== null ? baseHue + rand(-hueJitter, hueJitter) : rand(0, 360);
    const angle = rand(0, Math.PI * 2);
    const speed = isBurst ? rand(burstSpeed.min, burstSpeed.max) : ambientSpeed;
    const sizeRange = isBurst ? burstSize : ambientSize;

    return {
      x,
      y,
      sprite: getSprite(pickShape(), hue),
      isBurst,
      fade: rand(fadeRate.min, fadeRate.max),
      vx: isBurst ? Math.cos(angle) * vw(speed) : vw(rand(-speed, speed)),
      vy: isBurst ? Math.sin(angle) * vw(speed) : vw(rand(-speed, speed)),
      size: vw(rand(sizeRange.min, sizeRange.max)),
      life: isBurst ? 1 : rand(0.6, 1),
      gravity: vw(isBurst ? burstGravity : ambientGravity),
    };
  };

  const stepParticle = (p: Particle): void => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.life -= p.fade;
  };

  const drawParticle = ({ x, y, size, sprite, life }: Particle): void => {
    if (life <= 0) return;
    const { spriteSize, shapeRadius } = CONFIG;
    const drawSize = spriteSize * (size / shapeRadius);
    ctx.globalAlpha = Math.max(0, life);
    ctx.drawImage(sprite, x - drawSize / 2, y - drawSize / 2, drawSize, drawSize);
  };

  const burst = (x: number, y: number, hue: number): void => {
    const { burstCount } = CONFIG;
    const available = CONFIG.maxParticles - particles.length;
    const count = Math.min(burstCount, Math.max(0, available));
    if (count > 0) {
      particles.push(
        ...Array.from({ length: count }, () => spawnParticle(x, y, true, hue))
      );
    }
  };

  const tick = (): void => {
    const { ambientInterval } = CONFIG;

    if (particles.length > 0) {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }

    const burstActive = particles.some((p) => p.isBurst && p.life > 0);

    if (isHovered && !burstActive && ++frameCount % ambientInterval === 0) {
      const { x, y, hue } = randomEdgeOrigin();
      if (particles.length < CONFIG.maxParticles) {
        particles.push(spawnParticle(x, y, false, hue));
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      stepParticle(p);
      if (p.life > 0) {
        drawParticle(p);
      } else {
        particles[i] = particles[particles.length - 1];
        particles.pop();
      }
    }

    animationId = requestAnimationFrame(tick);
  };

  const enterHover = (): void => {
    // Atualiza a posição do botão apenas se necessário
    updateBtnPosition();
    isHovered = true;
  };

  const leaveHover = (): void => {
    isHovered = false;
  };

  const onClick = (e: MouseEvent): void => {
    syncLayout();
    burst(e.clientX, e.clientY, hueAt(e.clientX, e.clientY));
  };

  const onTouch = (e: TouchEvent): void => {
    e.preventDefault();
    syncLayout();
    const touch = e.touches[0];
    burst(touch.clientX, touch.clientY, hueAt(touch.clientX, touch.clientY));
  };

  btn.addEventListener('mouseenter', enterHover);
  btn.addEventListener('mouseleave', leaveHover);
  btn.addEventListener('click', onClick);
  btn.addEventListener('touchstart', onTouch, { passive: false });
  window.addEventListener('resize', syncLayout);

  syncLayout();
  tick();

  return () => {
    btn.removeEventListener('mouseenter', enterHover);
    btn.removeEventListener('mouseleave', leaveHover);
    btn.removeEventListener('click', onClick);
    btn.removeEventListener('touchstart', onTouch);
    window.removeEventListener('resize', syncLayout);
    cancelAnimationFrame(animationId);
    particles = [];
    spriteCache.clear();
  };
};

export default initLaunchParticles;
