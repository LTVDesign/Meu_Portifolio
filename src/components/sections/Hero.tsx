import { m } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useBackgroundMenu } from '../../contexts/ParticleConfigContext';
import { useBreakpoints } from '../../hooks/useDebouncedResize';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PCGamerStatic } from '../atoms';
import TerminalText from '../atoms/TerminalText';

// Lazy load do ThreeExperience (Three.js + @react-three/fiber + @react-three/drei)
const ThreeExperience = lazy(() => import('../canvas/ThreeExperience'));

// LCP Optimization: Lazy loading do GearButton - botão flutuante não é crítico para LCP
import GearButton from '../layout/GearButton';

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
  const { width, isWatch } = useBreakpoints();
  const isMobileOrTablet = width <= 1024;

  // Lazy load 3D assets to fix Lighthouse Unused JS and Performance
  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    let isLoaded = false;

    const scheduleLoad = () => {
      if (isLoaded) return;
      isLoaded = true;
      // Carregar 3D mais rapidamente - após 1 segundo ou requestIdleCallback
      if ('requestIdleCallback' in window) {
        (
          window as Window & { requestIdleCallback: (cb: () => void) => number }
        ).requestIdleCallback(() => setLoad3D(true), { timeout: 3000 });
      } else {
        // Fallback: carregar após 1.5 segundos
        setTimeout(() => setLoad3D(true), 1500);
      }

      window.removeEventListener('mousemove', scheduleLoad);
      window.removeEventListener('touchstart', scheduleLoad);
      window.removeEventListener('scroll', scheduleLoad);
      window.removeEventListener('keydown', scheduleLoad);
    };

    // Adicionar listeners de interação
    window.addEventListener('mousemove', scheduleLoad, { once: true, passive: true });
    window.addEventListener('touchstart', scheduleLoad, { once: true, passive: true });
    window.addEventListener('scroll', scheduleLoad, { once: true, passive: true });
    window.addEventListener('keydown', scheduleLoad, { once: true, passive: true });

    // Timer de fallback - carregar após 3 segundos mesmo sem interação
    const timer = setTimeout(scheduleLoad, 3000);

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

  const subtitles = [
    t('hero.subtitle.0'),
    t('hero.subtitle.1'),
    t('hero.subtitle.2'),
    t('hero.subtitle.3'),
    t('hero.subtitle.4'),
  ];

  return (
    <>
      <m.section
        id='hero'
        initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
        viewport={prefersReduced ? {} : { once: true, amount: 0.25 }}
        className='relative min-h-screen flex items-start justify-center pt-[clamp(7rem,12vh,9rem)] overflow-hidden'
        style={{ touchAction: 'pan-y' }}
      >
        <Helmet>
          <title>{t('hero.titleMeta')}</title>
          <meta name='description' content={t('hero.descriptionMeta')} />
        </Helmet>

        {/* Texto de introdução - acima do 3D, abaixo do menu */}
        <div className='relative z-10 w-full flex flex-col items-center justify-center pointer-events-none pt-2 pb-[clamp(0.5rem,2vh,2rem)]'>
          {/* LCP Critical: h1 renderiza imediatamente sem delay para melhor LCP */}
          <m.h1
            className='font-bold tracking-wide uppercase mb-1 text-center px-4 pointer-events-auto text-[clamp(1rem,4vw,2.5rem)] relative whitespace-nowrap overflow-hidden text-ellipsis w-full'
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={prefersReduced ? {} : { opacity: 1 }}
            transition={
              prefersReduced ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }
            }
            style={{
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            <span className='inline-block relative'>{t('hero.titlePart1')}</span>
            {'\u00A0\u00A0'}
            <m.span
              className='inline-block relative'
              initial={prefersReduced ? {} : { opacity: 0, y: 20, scale: 0.95 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0, scale: 1 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }
              }
              style={{
                color: '#00FFFF',
                textShadow:
                  '0 0 20px rgba(0, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.9)',
              }}
            >
              {t('hero.titlePart2')}
            </m.span>
          </m.h1>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-white/80 lowercase italic text-center px-4 w-full max-w-[25rem] text-[clamp(0.55rem,1.1vw,0.8rem)] leading-snug whitespace-nowrap overflow-hidden text-ellipsis'
          >
            <TerminalText
              words={subtitles.map((s) => String(s))}
              colors={['#00FFFF', '#915EFF', '#00FFFF', '#915EFF', '#00FFFF', '#915EFF']}
              typingSpeed={isWatch ? 120 : 80}
              pauseTime={2000}
              loop={true}
              className='terminal-text block'
            />
          </m.div>
        </div>

        {/* Canvas 3D do Computador - abaixo do texto */}
        {/* Em desktop: mostra o ThreeExperience 3D. Em mobile/tablet: mostra imagem estática de PC gamer */}
        <div className='absolute inset-0 z-0 pointer-events-auto flex items-center justify-center'>
          {isMobileOrTablet ? (
            // Imagem estática de PC gamer para mobile/tablet
            <PCGamerStatic />
          ) : load3D ? (
            <Suspense
              fallback={
                <div
                  className={`${isMobileOrTablet ? 'h-[20vh]' : 'h-screen'} w-full shimmer-loading flex items-center justify-center`}
                >
                  <div className='flex flex-col items-center gap-3'>
                    <div className='w-[clamp(1.5rem,4vw,2.5rem)] h-[clamp(1.5rem,4vw,2.5rem)] border-2 border-[var(--cyber-purple)]/30 border-t-[var(--cyber-cyan)] rounded-full animate-spin' />
                    <span className='text-[clamp(0.5rem,1vw,0.75rem)] text-white/30 uppercase tracking-[0.3em] font-medium'>
                      {t('common.loading3d')}
                    </span>
                  </div>
                </div>
              }
            >
              <ThreeExperience />
            </Suspense>
          ) : (
            <div
              className={`${isMobileOrTablet ? 'h-[5vh]' : 'h-screen'} w-full shimmer-loading flex items-center justify-center pointer-events-none`}
            >
              <div className='flex flex-col items-center gap-3'>
                <div className='w-[clamp(1.5rem,4vw,2.5rem)] h-[clamp(1.5rem,4vw,2.5rem)] border-2 border-[var(--cyber-purple)]/30 border-t-[var(--cyber-cyan)] rounded-full animate-spin' />
                <span className='text-[clamp(0.5rem,1vw,0.75rem)] text-white/30 uppercase tracking-[0.3em] font-medium min-w-[200px] text-center'>
                  {t('common.loading3d', 'Iniciando ambiente 3D...')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scroll / Interact Icon - Responsivo usando Fluid Design */}
        {/* Ocultar em mobile/tablet quando está usando PC estático */}
        {!isMobileOrTablet && (
          <div className='absolute bottom-[clamp(6rem,15vh,9rem)] w-full flex justify-center items-center z-20 pointer-events-none'>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className='flex flex-col items-center'
            >
              {/* Glow ring behind the scroll indicator */}
              <div className='relative mb-3'>
                <div className='absolute inset-0 rounded-3xl border-2 border-[var(--cyber-cyan)]/30 blur-sm w-[clamp(2rem,6vw,3rem)] h-[clamp(3.5rem,10vh,5rem)]' />
                <div className='relative rounded-3xl border-2 border-[var(--cyber-cyan)]/60 flex justify-center p-2 backdrop-blur-sm bg-black/20 w-[clamp(1.5rem,4vw,1.875rem)] h-[clamp(2.5rem,8vh,3.125rem)]'>
                  <div className='rounded-full bg-gradient-to-br from-[var(--cyber-cyan)] to-[var(--cyber-purple)] mb-1 shadow-[0_0_12px_rgba(0,255,255,0.9),0_0_20px_rgba(145,94,255,0.6)] w-2.5 h-2.5' />
                </div>
              </div>

              {/* Text with enhanced effects */}
              <div className='flex flex-col items-center gap-1'>
                <span className='font-black tracking-[0.3em] uppercase bg-gradient-to-r from-[var(--cyber-cyan)] via-white to-[var(--cyber-purple)] bg-clip-text text-transparent text-[clamp(0.6rem,1.5vw,0.85rem)] text-center'>
                  {String(t('hero.dragToRotate'))}
                </span>
                <span className='font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] bg-clip-text text-transparent text-[clamp(0.55rem,1.2vw,0.75rem)] text-center mt-1'>
                  {String(t('hero.dragToRotateSubtitle'))}
                </span>
              </div>

              {/* Decorative lines */}
              <div className='flex items-center gap-2 mt-2'>
                <div className='h-[1px] bg-gradient-to-r from-transparent to-[var(--cyber-cyan)] w-4' />
                <div className='w-1 h-1 rounded-full bg-[var(--cyber-purple)] opacity-60' />
                <div className='h-[1px] bg-gradient-to-l from-transparent to-[var(--cyber-purple)] w-4' />
              </div>
            </m.div>
          </div>
        )}
      </m.section>

      {/* Engrenagem flutuante esquerda - Background selector (Componente GearButton com Efeitos RGB) */}
      {/* Movido para fora do m.section para não herdar transforms que quebram o position: fixed */}
      <GearButton onClick={handleBackgroundClick} />
    </>
  );
};

export default Hero;
