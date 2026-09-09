import { m, useScroll, useTransform } from 'framer-motion';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '../../hooks/useDebouncedResize';
import TextScramble from '../atoms/TextScramble';

const ThreeExperience = lazy(() => import('../canvas/ThreeExperience'));

const Hero = () => {
  const { t } = useTranslation();
  const { width } = useBreakpoints();
  const isMobileOrTablet = width <= 1024;
  const [load3D, setLoad3D] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    let isLoaded = false;
    const scheduleLoad = () => {
      if (isLoaded) return;
      if (window.innerWidth <= 1024) return;
      isLoaded = true;
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
          () => setLoad3D(true),
          { timeout: 4000 }
        );
      } else {
        setTimeout(() => setLoad3D(true), 3000);
      }
      window.removeEventListener('mousemove', scheduleLoad);
      window.removeEventListener('touchstart', scheduleLoad);
    };

    window.addEventListener('mousemove', scheduleLoad, { once: true, passive: true });
    window.addEventListener('touchstart', scheduleLoad, { once: true, passive: true });
    const timer = setTimeout(scheduleLoad, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', scheduleLoad);
      window.removeEventListener('touchstart', scheduleLoad);
    };
  }, []);

  const subtitles = [
    t('hero.subtitle.0'),
    t('hero.subtitle.1'),
    t('hero.subtitle.2'),
    t('hero.subtitle.3'),
    t('hero.subtitle.4'),
  ];

  return (
    <section
      ref={heroRef}
      id='hero'
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
      style={{ touchAction: 'pan-y' }}
    >
      <Helmet>
        <title>{t('hero.titleMeta')}</title>
        <meta name='description' content={t('hero.descriptionMeta')} />
      </Helmet>

      {/* 3D Background with parallax */}
      <m.div className='absolute inset-0 z-0' style={{ scale: bgScale }}>
        {isMobileOrTablet ? (
          <div className='w-full h-full bg-gradient-to-b from-[var(--cyber-purple)]/10 to-transparent' />
        ) : load3D ? (
          <Suspense fallback={<div className='w-full h-full shimmer-loading' />}>
            <ThreeExperience />
          </Suspense>
        ) : (
          <div className='w-full h-full shimmer-loading' />
        )}
      </m.div>

      {/* Gradient overlay */}
      <div className='absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none' />

      {/* Main content */}
      <m.div
        className='relative z-10 w-full flex flex-col items-center justify-center px-[clamp(1rem,5vw,4rem)]'
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Name - Heroic typography */}
        <div className='text-center mb-8'>
          <m.h1
            className='font-bold tracking-[-0.03em] leading-[0.9] mb-2'
            style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}
          >
            <m.span
              className='block text-white'
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <TextScramble text={t('hero.titlePart1')} delay={300} duration={1.5} className='inline-block' />
            </m.span>
            <m.span
              className='block bg-gradient-to-r from-[var(--cyber-cyan)] via-[var(--cyber-glow)] to-[var(--cyber-purple)] bg-clip-text text-transparent'
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <TextScramble text={t('hero.titlePart2')} delay={500} duration={1.5} className='inline-block' />
            </m.span>
          </m.h1>

          {/* Tagline */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-4'
          >
            {(t('hero.tagline', 'Full-Stack Developer \u00B7 Creative Technologist') as string)
              .split(' ')
              .map((word, i) => (
                <m.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className='text-[clamp(0.85rem,2vw,1.25rem)] text-white/60 font-light tracking-wide'
                >
                  {word}
                </m.span>
              ))}
          </m.div>
        </div>

        {/* Terminal text */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className='text-center mb-12'
        >
          <div className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm'>
            <span className='w-1.5 h-1.5 rounded-full bg-[var(--cyber-cyan)] animate-pulse' />
            <span className='text-[clamp(0.7rem,1.3vw,0.85rem)] text-white/50 font-mono'>
              {subtitles[0]}
            </span>
          </div>
        </m.div>

        {/* CTA Buttons */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className='flex flex-wrap items-center justify-center gap-4'
        >
          <a
            href='#works'
            className='group relative px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] min-h-[48px] flex items-center'
          >
            <span className='relative z-10 group-hover:text-white transition-colors duration-300'>{t('hero.ctaWork', 'Ver Projetos')}</span>
            <div className='absolute inset-0 bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </a>
          <a
            href='#contact'
            className='px-8 py-3.5 rounded-full border border-white/20 text-white/80 font-medium text-sm tracking-wide hover:border-white/40 hover:text-white transition-all duration-300 hover:scale-105 min-h-[48px] flex items-center'
          >
            {t('hero.ctaContact', 'Contato')}
          </a>
        </m.div>
      </m.div>

      {/* Scroll indicator */}
      {!isMobileOrTablet && (
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20'>
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className='flex flex-col items-center gap-2'>
            <m.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className='w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5'
            >
              <div className='w-1 h-1.5 rounded-full bg-white/40' />
            </m.div>
            <span className='text-[10px] text-white/20 uppercase tracking-[0.3em]'>
              {t('hero.scroll', 'Scroll')}
            </span>
          </m.div>
        </div>
      )}
    </section>
  );
};

export default Hero;
