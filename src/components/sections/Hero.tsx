import { m } from 'framer-motion';
import { lazy, Suspense } from 'react';
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
 */
const Hero = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const { openBgMenu } = useBackgroundMenu();
  // Hook otimizado com RAF debounce para evitar reflows
  const { isWatch, isMobileSmall, isMobile, isTV } = useBreakpoints();

  const handleBackgroundClick = () => {
    openBgMenu();
  };

  const subtitles = [
    t('hero.subtitle.0'),
    t('hero.subtitle.1'),
    t('hero.subtitle.2'),
    t('hero.subtitle.3'),
    t('hero.subtitle.4'),
    t('hero.subtitle.5'),
  ];



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
        className={`relative z-10 w-full flex flex-col items-center justify-start pointer-events-none
          ${isWatch ? 'pt-6 pb-2' : isMobileSmall ? 'pt-8 pb-3' : isMobile ? 'pt-10 pb-4' : isTV ? 'pt-24 pb-12' : 'pt-10 md:pt-14 pb-8'}`}
      >
        {/* LCP Critical: h1 renderiza imediatamente sem delay para melhor LCP */}
        <h1
          className={`font-bold text-white tracking-wide uppercase mb-2 text-center px-4 pointer-events-auto
        ${isWatch ? 'text-xs' : isMobileSmall ? 'text-sm' : isMobile ? 'text-lg' : isTV ? 'text-8xl' : 'text-2xl md:text-4xl lg:text-5xl'}`}
        >
          {t('hero.title')}
        </h1>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-white/70 lowercase italic text-center px-4 max-w-xs sm:max-w-sm
            ${isWatch ? 'text-[9px] leading-tight' : isMobileSmall ? 'text-[10px] leading-tight' : isMobile ? 'text-xs leading-relaxed' : isTV ? 'text-3xl' : 'text-sm md:text-base'}`}
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
            className='terminal-text'
          />
        </m.div>
      </div>

      {/* Canvas 3D do Computador - abaixo do texto */}
      <div className='absolute inset-0 z-0 pointer-events-auto flex items-center -mt-16'>
        <Suspense fallback={
          <div className="h-screen w-full shimmer-loading flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-[var(--cyber-purple)]/30 border-t-[var(--cyber-cyan)] rounded-full animate-spin" />
              <span className="text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.3em] font-medium">Loading 3D</span>
            </div>
          </div>
        }>
          <ThreeExperience />
        </Suspense>
      </div>

      {/* Scroll / Interact Icon - Responsivo */}
      {!isWatch && (
        <div className='absolute bottom-6 sm:bottom-10 w-full flex justify-center items-center z-20 pointer-events-none'>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className='flex flex-col items-center'
          >
            {/* Glow ring behind the scroll indicator */}
            <div className='relative mb-3'>
              <m.div
                className={`absolute inset-0 rounded-3xl border-2 border-[var(--cyber-cyan)]/30 blur-sm ${isMobile ? 'w-8 h-14' : 'w-12 h-20'}`}
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
              <div className={`relative rounded-3xl border-2 border-[var(--cyber-cyan)]/60 flex justify-center p-2 backdrop-blur-sm bg-black/20 ${isMobile ? 'w-[24px] h-[40px]' : 'w-[30px] h-[50px]'}`}>
                <m.div
                  animate={
                    prefersReduced
                      ? {}
                      : {
                        y: [0, isMobile ? 10 : 16, 0],
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
                className={`font-black tracking-[0.3em] uppercase bg-gradient-to-r from-[var(--cyber-cyan)] via-white to-[var(--cyber-purple)] bg-clip-text text-transparent ${isMobile ? 'text-[9px]' : isTV ? 'text-base' : 'text-xs'}`}
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
                className={`font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] bg-clip-text text-transparent ${isMobile ? 'text-[8px]' : isTV ? 'text-sm' : 'text-[10px]'}`}
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
            {!isMobileSmall && (
              <div className='flex items-center gap-2 mt-2'>
                <m.div
                  className='h-[1px] bg-gradient-to-r from-transparent to-[var(--cyber-cyan)]'
                  animate={{ width: [8, 16, 8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <m.div
                  className='w-1 h-1 rounded-full bg-[var(--cyber-purple)]'
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <m.div
                  className='h-[1px] bg-gradient-to-l from-transparent to-[var(--cyber-purple)]'
                  animate={{ width: [8, 16, 8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            )}
          </m.div>
        </div>
      )}
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
