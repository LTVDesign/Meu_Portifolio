import { domAnimation, LazyMotion, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useBackgroundMenu } from '../../contexts/ParticleConfigContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import TerminalText from '../atoms/TerminalText';
import { ComputersCanvas } from '../canvas';

const Hero = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const { openBgMenu } = useBackgroundMenu();
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBackgroundClick = () => {
    openBgMenu();
  };

  const isWatch = screenWidth < 280;
  const isMobileSmall = screenWidth < 380;
  const isMobile = screenWidth < 640;
  const isTablet = screenWidth < 1024;
  const isTV = screenWidth > 2560;

  const subtitles = [
    t('hero.subtitle.0'),
    t('hero.subtitle.1'),
    t('hero.subtitle.2'),
    t('hero.subtitle.3'),
    t('hero.subtitle.4'),
    t('hero.subtitle.5'),
  ];

  // Tamanho da engrenagem responsivo
  const gearSize = isWatch ? 'w-7 h-7' : isMobileSmall ? 'w-8 h-8' : isMobile ? 'w-10 h-10' : isTV ? 'w-20 h-20' : 'w-14 h-14';
  const gearLeft = isWatch ? 'left-1' : isMobileSmall ? 'left-1.5' : isMobile ? 'left-2' : isTablet ? 'left-4' : isTV ? 'left-16' : 'left-4 md:left-8';

  return (
    <LazyMotion features={domAnimation} strict={false}>
      <m.section
        id='hero'
        initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
        viewport={prefersReduced ? {} : { once: true, amount: 0.25 }}
        className='relative min-h-screen flex items-start justify-center pt-0 overflow-hidden'
      >
        <Helmet>
          <title>{t('hero.titleMeta')}</title>
          <meta name='description' content={t('hero.descriptionMeta')} />
        </Helmet>

        {/* Texto de introdução - acima do 3D, abaixo do menu */}
        <div
          className={`relative z-10 w-full flex flex-col items-center justify-start
            ${isWatch ? 'pt-16 pb-4' : isMobileSmall ? 'pt-20 pb-6' : isMobile ? 'pt-24 pb-6' : isTV ? 'pt-48 pb-12' : 'pt-28 md:pt-36 pb-8'}`}
        >
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`font-bold text-white tracking-wide uppercase mb-3 text-center px-4
              ${isWatch ? 'text-sm' : isMobileSmall ? 'text-base' : isMobile ? 'text-xl' : isTV ? 'text-8xl' : 'text-2xl md:text-4xl lg:text-5xl'}`}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(145,94,255,0.6))',
              textShadow: '0 0 10px rgba(145,94,255,0.6)',
            }}
          >
            {t('hero.title')}
          </m.h1>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`text-white/70 lowercase italic text-center px-4
              ${isWatch ? 'text-[10px]' : isMobileSmall ? 'text-xs' : isMobile ? 'text-sm' : isTV ? 'text-3xl' : 'text-sm md:text-base'}`}
            style={{
              filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.4))',
            }}
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
        <div className='absolute inset-0 z-0 pointer-events-none flex items-end'>
          <ComputersCanvas />
        </div>

        {/* Engrenagem flutuante esquerda - Background selector (FIXA) */}
        <m.button
          onClick={handleBackgroundClick}
          className={`fixed ${gearLeft} top-1/2 -translate-y-1/2 z-[100001] cursor-pointer gear-rgb-container`}
          aria-label={t('hero.backgroundSelectorHint')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          {/* Container com animação de respiração e brilho RGB */}
          <m.div
            className={`relative ${gearSize} flex items-center justify-center`}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* RGB glow pulsante por trás */}
            <div className='absolute inset-0 rounded-full gear-rgb-glow blur-md opacity-60' />

            {/* Engrenagem que gira sem parar */}
            <m.div
              className='relative z-10 w-full h-full'
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg
                viewBox='0 0 24 24'
                className='w-full h-full drop-shadow-lg'
                fill='none'
                aria-hidden='true'
              >
                <defs>
                  <linearGradient id='gearGradHero' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <stop offset='0%' stopColor='#00FFFF' />
                    <stop offset='50%' stopColor='#915EFF' />
                    <stop offset='100%' stopColor='#FF00FF' />
                  </linearGradient>
                </defs>
                <path
                  d='M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64L19.43 12.97z'
                  fill='url(#gearGradHero)'
                />
                <circle cx='12' cy='12' r='3' fill='rgba(10,10,15,1)' />
              </svg>
            </m.div>

            {/* Anel pulsante RGB ao redor */}
            <m.div
              className='absolute inset-0 rounded-full border border-[var(--cyber-cyan)]/30'
              animate={{
                scale: [1, 1.4],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          </m.div>
        </m.button>

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
                  className={`font-black tracking-[0.3em] uppercase bg-gradient-to-r from-[var(--cyber-cyan)] via-white to-[var(--cyber-purple)] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.7)] ${isMobile ? 'text-[9px]' : isTV ? 'text-base' : 'text-xs'}`}
                  style={{
                    filter:
                      'drop-shadow(0 0 10px rgba(0,255,255,0.8)) drop-shadow(0 0 20px rgba(145,94,255,0.5))',
                  }}
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
    </LazyMotion>
  );
};

export default Hero;
