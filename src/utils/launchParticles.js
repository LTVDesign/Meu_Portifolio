export const initLaunchParticles = (canvas, btn) => {
  const CONFIG = {
    burstCount: 107,
    ambientInterval: 4,
    spriteSize: 80,
    shapeRadius: 15,
    spriteCacheLimit: 255,
    hueJitter: 40,
    fadeRate: { min: 0.003, max: 0.007 },
    burstSpeed: { min: 0.4, max: 1.2 },
    ambientSpeed: 0.15,
    burstSize: { min: 0.66, max: 1.0 },
    ambientSize: { min: 0.33, max: 0.66 },
    burstGravity: 0.012,
    ambientGravity: 0.003,
  };

  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx || !btn) return () => {};

  const particles = [];
  let frameCount = 0;
  let isHovered = false;
  let pxPerVw = 0;
  let btnPos = { x: 0, y: 0, w: 0 };
  let dpr = window.devicePixelRatio ?? 1;
  let animationId;

  const rand = (min, max) => min + Math.random() * (max - min);
  const vw = (n) => n * pxPerVw;

  const shapePathFns = {
    circle: (ctx, cx, r) => ctx.arc(cx, cx, r, 0, Math.PI * 2),
    square: (ctx, cx, r) => ctx.rect(cx - r, cx - r, r * 2, r * 2),
    diamond: (ctx, cx, r) => {
      ctx.moveTo(cx, cx - r);
      ctx.lineTo(cx + r, cx);
      ctx.lineTo(cx, cx + r);
      ctx.lineTo(cx - r, cx);
      ctx.closePath();
    },
    triangle: (ctx, cx, r) => {
      ctx.moveTo(cx, cx - r);
      ctx.lineTo(cx + r, cx + r);
      ctx.lineTo(cx - r, cx + r);
      ctx.closePath();
    },
    cross: (ctx, cx, r) => {
      const arm = r * 0.4;
      const len = r * 1.2;
      ctx.rect(cx - len / 2, cx - arm / 2, len, arm);
      ctx.rect(cx - arm / 2, cx - len / 2, arm, len);
    },
    heart: (ctx, cx, r) => {
      ctx.moveTo(cx, cx + r * 0.6);
      ctx.bezierCurveTo(cx + r, cx - r * 0.4, cx + r * 1.5, cx - r * 1.1, cx, cx - r * 1.5);
      ctx.bezierCurveTo(cx - r * 1.5, cx - r * 1.1, cx - r, cx - r * 0.4, cx, cx + r * 0.6);
      ctx.closePath();
    },
  };

  const SHAPES = Object.keys(shapePathFns);
  const pickShape = () => SHAPES[Math.floor(Math.random() * SHAPES.length)];

  const spriteCache = new Map();

  const buildSprite = (shape, hue) => {
    const { spriteSize, shapeRadius } = CONFIG;
    const offscreen = Object.assign(document.createElement('canvas'), {
      width: spriteSize,
      height: spriteSize,
    });
    const octx = offscreen.getContext('2d');
    const color = `oklch(78% 0.30 ${hue}deg)`;
    const center = spriteSize / 2;

    Object.assign(octx, { fillStyle: color, shadowBlur: 12, shadowColor: color });
    octx.beginPath();
    (shapePathFns[shape] ?? shapePathFns.circle)(octx, center, shapeRadius);
    octx.fill();

    return offscreen;
  };

  const getSprite = (shape, hue) => {
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
      spriteCache.delete(spriteCache.keys().next().value);
    }

    return sprite;
  };

  const syncLayout = () => {
    dpr = window.devicePixelRatio ?? 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
    pxPerVw = window.innerWidth / 100;

    const rect = btn.getBoundingClientRect();
    btnPos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, w: rect.width };
  };

  const gradientAngle = () => ((performance.now() % 4000) / 4000) * 360;

  const hueAt = (clientX, clientY) => {
    const angle = (Math.atan2(clientY - btnPos.y, clientX - btnPos.x) * 180) / Math.PI;
    return (angle + 90 - gradientAngle() + 720) % 360;
  };

  const randomEdgeOrigin = () => {
    const angle = rand(0, Math.PI * 2);
    const r = btnPos.w * 0.5 * rand(0.85, 1.05);
    const hue = ((angle * 180) / Math.PI + 90 - gradientAngle() + 720) % 360;
    return {
      x: btnPos.x + Math.cos(angle) * r,
      y: btnPos.y + Math.sin(angle) * r * 0.4,
      hue,
    };
  };

  const spawnParticle = (x, y, isBurst = false, baseHue = null) => {
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
    const { min, max } = isBurst ? burstSize : ambientSize;

    return {
      x,
      y,
      sprite: getSprite(pickShape(), hue),
      isBurst,
      fade: rand(fadeRate.min, fadeRate.max),
      vx: isBurst ? Math.cos(angle) * vw(speed) : vw(rand(-speed, speed)),
      vy: isBurst ? Math.sin(angle) * vw(speed) : vw(rand(-speed, -speed)),
      size: vw(rand(min, max)),
      life: isBurst ? 1 : rand(0.6, 1),
      gravity: vw(isBurst ? burstGravity : ambientGravity),
    };
  };

  const stepParticle = (p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.life -= p.fade;
  };

  const drawParticle = ({ x, y, size, sprite, life }) => {
    const { spriteSize, shapeRadius } = CONFIG;
    const drawSize = spriteSize * (size / shapeRadius);
    ctx.globalAlpha = Math.max(0, life);
    ctx.drawImage(sprite, x - drawSize / 2, y - drawSize / 2, drawSize, drawSize);
  };

  const burst = (x, y, hue) => {
    const { burstCount } = CONFIG;
    particles.push(...Array.from({ length: burstCount }, () => spawnParticle(x, y, true, hue)));
  };

  const tick = () => {
    const { ambientInterval } = CONFIG;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const burstActive = particles.some((p) => p.isBurst && p.life > 0);

    if (isHovered && !burstActive && ++frameCount % ambientInterval === 0) {
      const { x, y, hue } = randomEdgeOrigin();
      particles.push(spawnParticle(x, y, false, hue));
    }

    let i = 0;
    while (i < particles.length) {
      const p = particles[i];
      stepParticle(p);
      if (p.life > 0) {
        drawParticle(p);
        i++;
      } else {
        particles[i] = particles.at(-1);
        particles.pop();
      }
    }

    animationId = requestAnimationFrame(tick);
  };

  const enterHover = () => (isHovered = true);
  const leaveHover = () => (isHovered = false);
  const onClick = (e) => burst(e.clientX, e.clientY, hueAt(e.clientX, e.clientY));
  const onTouch = (e) =>
    burst(
      e.touches[0].clientX,
      e.touches[0].clientY,
      hueAt(e.touches[0].clientX, e.touches[0].clientY)
    );

  btn.addEventListener('mouseenter', enterHover);
  btn.addEventListener('mouseleave', leaveHover);
  btn.addEventListener('click', onClick);
  btn.addEventListener('touchstart', onTouch);
  window.addEventListener('resize', syncLayout);
  window.addEventListener('scroll', syncLayout);

  syncLayout();
  tick();

  return () => {
    btn.removeEventListener('mouseenter', enterHover);
    btn.removeEventListener('mouseleave', leaveHover);
    btn.removeEventListener('click', onClick);
    btn.removeEventListener('touchstart', onTouch);
    window.removeEventListener('resize', syncLayout);
    window.removeEventListener('scroll', syncLayout);
    cancelAnimationFrame(animationId);
  };
};
