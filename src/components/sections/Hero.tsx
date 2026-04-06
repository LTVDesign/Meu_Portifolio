import { lazy, Suspense, useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useBackgroundMenu } from '../../contexts/ParticleConfigContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useBreakpoints } from '../../hooks/useDebouncedResize';
import TerminalText from '../atoms/TerminalText';

// Lazy load do ThreeExperience (Three.js + @react-three/fiber + @react-three/drei)
const ThreeExperience = lazy(() => import('../canvas/ThreeExperience'));

// LCP Optimization: Lazy loading do GearButton - botão flutuante não é crítico para LCP
const GearButton = lazy(() => import('../layout/GearButton'));

/**
 * Hero - Seção principal da página
 * 
 * Otimizações:
 * - usa useBreakpoints hook com RAF debounce para resize
 * - useMemo para cálculos de layout responsivo
 * - contain: layout style paint para isolar animações
 * - defer de 3D canvas com base em interação para otimizar métricas Lighthouse (Unused JS)
 */
const Hero = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const { openBgMenu } = useBackgroundMenu();
  // Hook otimizado com RAF debounce para evitar reflows
  const { isWatch, isMobile } = useBreakpoints();

  // Lazy load 3D assets to fix Lighthouse Unused JS and Performance
  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    let isLoaded = false;

    const scheduleLoad = () => {
      if (isLoaded) return;
      isLoaded = true;
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => setLoad3D(true), { timeout: 5000 });
      } else {
        setLoad3D(true);
      }

      window.removeEventListener('mousemove', scheduleLoad);
      window.removeEventListener('touchstart', scheduleLoad);
      window.removeEventListener('scroll', scheduleLoad);
      window.removeEventListener('keydown', scheduleLoad);
    };

    window.addEventListener('mousemove', scheduleLoad, { once: true, passive: true });
    window.addEventListener('touchstart', scheduleLoad, { once: true, passive: true });
    window.addEventListener('scroll', scheduleLoad, { once: true, passive: true });
    window.addEventListener('keydown', scheduleLoad, { once: true, passive: true });

    const timer = setTimeout(scheduleLoad, 8000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', scheduleLoad);
      window.removeEventListener('touchstart', scheduleLoad);
      window.removeEventListener('scroll', scheduleLoad);
      window.removeEventListener('keydown', scheduleLoad);
    };
  }, []);

  const handleBackgroundClick = () => {
    openBgMenu();
  };

  const rawSubtitles = t('hero.subtitle', { returnObjects: true });
  const subtitles = Array.isArray(rawSubtitles)
    ? rawSubtitles.map(s => String(s))
    : ['Full Stack Developer', 'AI Specialist']; // Safe fallback



  return (
    <>
      <m.section
        id='hero'
        initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
        viewport={prefersReduced ? {} : { once: true, amount: 0.25 }}
        className='relative min-h-screen flex items-start justify-center pt-0 overflow-hidden'
        style={{ touchAction: 'pan-y' }}
      >
        <Helmet>
          <title>{t('hero.titleMeta')}</title>
          <meta name='description' content={t('hero.descriptionMeta')} />
        </Helmet>

        {/* Texto de introdução - acima do 3D, abaixo do menu */}
        <div
          className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none pt-[clamp(2rem,5vh,4rem)] pb-[clamp(0.5rem,2vh,2rem)]"
        >
          {/* LCP Critical: h1 renderiza imediatamente sem delay para melhor LCP */}
          <h1
            className="font-bold text-white tracking-wide uppercase mb-2 text-center px-4 pointer-events-auto text-[clamp(1rem,4vw,2.5rem)]"
          >
            {t('hero.title')}
          </h1>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 lowercase italic text-center px-4 w-full max-w-[16rem] text-[clamp(0.6rem,1.2vw,0.875rem)] leading-snug break-normal hyphens-auto"
          >
            <TerminalText
              words={subtitles}
              colors={[
                '#00FFFF',
                '#915EFF',
                '#00FFFF',
                '#915EFF',
                '#00FFFF',
                '#915EFF',
              ]}
              typingSpeed={isWatch ? 120 : 80}
              pauseTime={2000}
              loop={true}
              className='terminal-text block break-words'
            />
          </m.div>
        </div>

        {/* Canvas 3D do Computador - abaixo do texto */}
        <div className='absolute inset-0 z-0 pointer-events-auto flex items-center -mt-[clamp(3rem,8vh,6rem)]'>
          {load3D ? (
            <Suspense fallback={
              <div className="h-screen w-full shimmer-loading flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-[var(--cyber-purple)]/30 border-t-[var(--cyber-cyan)] rounded-full animate-spin" />
                  <span className="text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.3em] font-medium">{t('common.loading3d')}</span>
                </div>
              </div>
            }>
              <ThreeExperience />
            </Suspense>
          ) : (
            <div className="h-screen w-full shimmer-loading flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-[var(--cyber-purple)]/30 border-t-[var(--cyber-cyan)] rounded-full animate-spin" />
                <span className="text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.3em] font-medium min-w-[200px] text-center">
                  {t('common.loading3d', 'Iniciando ambiente 3D...')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scroll / Interact Icon - Responsivo usando Fluid Design */}
        <div className="absolute bottom-[clamp(6rem,15vh,9rem)] w-full flex justify-center items-center z-20 pointer-events-none">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex flex-col items-center"
          >
            {/* Glow ring behind the scroll indicator */}
            <div className="relative mb-3">
              <m.div
                className="absolute inset-0 rounded-3xl border-2 border-[var(--cyber-cyan)]/30 blur-sm w-[clamp(2rem,6vw,3rem)] h-[clamp(3.5rem,10vh,5rem)]"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative rounded-3xl border-2 border-[var(--cyber-cyan)]/60 flex justify-center p-2 backdrop-blur-sm bg-black/20 w-[clamp(1.5rem,4vw,1.875rem)] h-[clamp(2.5rem,8vh,3.125rem)]">
                <m.div
                  animate={
                    prefersReduced
                      ? {}
                      : {
                        y: [0, 16, 0], // Can use a fixed px for generic animation or let it adapt
                      }
                  }
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                      }
                  }
                  className={`rounded-full bg-gradient-to-br from-[var(--cyber-cyan)] to-[var(--cyber-purple)] mb-1 shadow-[0_0_12px_rgba(0,255,255,0.9),0_0_20px_rgba(145,94,255,0.6)] ${isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5'}`}
                />
              </div>
            </div>

            {/* Text with enhanced effects */}
            <div className='flex flex-col items-center gap-1'>
              <m.span
                className="font-black tracking-[0.3em] uppercase bg-gradient-to-r from-[var(--cyber-cyan)] via-white to-[var(--cyber-purple)] bg-clip-text text-transparent text-[clamp(0.6rem,1.5vw,0.85rem)] text-center"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {t('hero.dragToRotate')}
              </m.span>
              <m.span
                className="font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] bg-clip-text text-transparent text-[clamp(0.55rem,1.2vw,0.75rem)] text-center mt-1"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {t('hero.dragToRotateSubtitle')}
              </m.span>
            </div>

            {/* Decorative lines */}
            <div className="flex items-center gap-2 mt-2 hidden sm:flex">
              <m.div
                className="h-[1px] bg-gradient-to-r from-transparent to-[var(--cyber-cyan)]"
                animate={{ width: [8, 16, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <m.div
                className="w-1 h-1 rounded-full bg-[var(--cyber-purple)]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <m.div
                className="h-[1px] bg-gradient-to-l from-transparent to-[var(--cyber-purple)]"
                animate={{ width: [8, 16, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </m.div>
        </div>
      </m.section>

      {/* Engrenagem flutuante esquerda - Background selector (Componente GearButton com Efeitos RGB) */}
      {/* Movido para fora do m.section para não herdar transforms que quebram o position: fixed */}
      <Suspense fallback={null}>
        <GearButton onClick={handleBackgroundClick} />
      </Suspense>
    </>
  );
};

export default Hero;
