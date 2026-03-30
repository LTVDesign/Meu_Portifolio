import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ComputersCanvas } from '../canvas';
import { TerminalText } from '../atoms';
import BackgroundSelectorModal from '../atoms/BackgroundSelectorModal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Hero = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Reduzido de 1200ms para 300ms para melhorar LCP
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleBackgroundClick = () => {
    setShowBackgroundModal(true);
  };

  return (
    <LazyMotion features={domAnimation} strict={false}>
      <m.section
        id="hero"
        initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
        viewport={prefersReduced ? {} : { once: true, amount: 0.25 }}
        className="relative min-h-screen flex items-center justify-center pt-0 overflow-hidden"
      >
        <Helmet>
          <title>{t('hero.titleMeta')}</title>
          <meta name="description" content={t('hero.descriptionMeta')} />
        </Helmet>

        <div className="max-w-7xl mx-auto px-6 z-10 w-full flex flex-col items-center text-center relative -mt-16">
          {/* Título principal com animação de entrada */}
          <m.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              duration: 1
            }}
          >
            <h1 className="text-[clamp(2.2rem,6vw,4rem)] leading-none font-black tracking-[-0.04em] text-white mb-4">
              {t('hero.title')}
            </h1>
          </m.div>

          {/* Texto "Olá, eu sou..." com animação de typing */}
          <div className="min-h-[3rem] max-w-2xl -mt-2">
            {showSubtitle && (
              <TerminalText
                words={t('hero.subtitle', { returnObjects: true }) as string[]}
                colors={['#06b6d4', '#a855f7', '#e5e7eb']}
                typingSpeed={55}
                pauseTime={2800}
                loop={false}
                typeOnce={true}
                className="text-[clamp(1.05rem,2.2vw,1.35rem)]"
              />
            )}
          </div>

        </div>

        {/* Canvas 3D */}
        <div className="absolute inset-0 z-0">
          <ComputersCanvas />
        </div>

        {/* Engrenagem flutuante esquerda - Gear button */}
        <m.button
          onClick={() => window.location.href = '/'}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Ir para página inicial"
        >
          <div className="relative w-20 h-20">
            {/* Glow externo */}
            <m.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 blur-xl opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Engrenagem SVG com design realista */}
            <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="gearGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FFFF" />
                  <stop offset="50%" stopColor="#915EFF" />
                  <stop offset="100%" stopColor="#FF00FF" />
                </linearGradient>
                <filter id="glowLeft">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g filter="url(#glowLeft)">
                {/* Corpo principal da engrenagem com dentes */}
                <path
                  d="M50 12 L58 12 L60 22 L68 18 L74 24 L68 32 L78 36 L76 44 L88 50 L88 58 L76 62 L80 72 L72 78 L64 68 L58 76 L50 88 L42 76 L36 68 L28 78 L20 72 L24 62 L12 58 L12 50 L24 46 L20 36 L28 30 L36 40 L42 32 L50 24 Z"
                  fill="rgba(30,30,40,0.9)"
                  stroke="url(#gearGradLeft)"
                  strokeWidth="2.5"
                />
                {/* Círculo interno */}
                <circle cx="50" cy="50" r="16" fill="rgba(20,20,30,0.95)" stroke="url(#gearGradLeft)" strokeWidth="2" />
                {/* Círculo central */}
                <circle cx="50" cy="50" r="6" fill="url(#gearGradLeft)" />
              </g>
            </svg>

            {/* Anéis pulsantes */}
            <m.div
              className="absolute inset-0 rounded-full border-2 border-[var(--cyber-cyan)]/30"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </m.button>

        {/* Engrenagem flutuante direita - Background selector */}
        <m.button
          onClick={handleBackgroundClick}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Abrir seletor de background"
        >
          <div className="relative w-20 h-20">
            {/* Glow externo */}
            <m.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-cyan-400 blur-xl opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Engrenagem SVG com design realista */}
            <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="gearGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FFFF" />
                  <stop offset="50%" stopColor="#915EFF" />
                  <stop offset="100%" stopColor="#00FFFF" />
                </linearGradient>
                <filter id="glowRight">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g filter="url(#glowRight)">
                {/* Corpo principal da engrenagem com dentes */}
                <path
                  d="M50 12 L58 12 L60 22 L68 18 L74 24 L68 32 L78 36 L76 44 L88 50 L88 58 L76 62 L80 72 L72 78 L64 68 L58 76 L50 88 L42 76 L36 68 L28 78 L20 72 L24 62 L12 58 L12 50 L24 46 L20 36 L28 30 L36 40 L42 32 L50 24 Z"
                  fill="rgba(30,30,40,0.9)"
                  stroke="url(#gearGradRight)"
                  strokeWidth="2.5"
                />
                {/* Círculo interno */}
                <circle cx="50" cy="50" r="16" fill="rgba(20,20,30,0.95)" stroke="url(#gearGradRight)" strokeWidth="2" />
                {/* Círculo central */}
                <circle cx="50" cy="50" r="6" fill="url(#gearGradRight)" />
              </g>
            </svg>
          </div>
        </m.button>

        {/* Modal de Seleção de Background */}
        <BackgroundSelectorModal
          isOpen={showBackgroundModal}
          onClose={() => setShowBackgroundModal(false)}
        />

        {/* Scroll / Interact Icon - Enhanced */}
        <div className="absolute bottom-10 w-full flex justify-center items-center z-20 pointer-events-none">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex flex-col items-center"
          >
            {/* Glow ring behind the scroll indicator */}
            <div className="relative mb-3">
              <m.div
                className="absolute inset-0 w-12 h-20 rounded-3xl border-2 border-[var(--cyber-cyan)]/30 blur-sm"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative w-[30px] h-[50px] rounded-3xl border-2 border-[var(--cyber-cyan)]/60 flex justify-center p-2 backdrop-blur-sm bg-black/20">
                <m.div
                  animate={prefersReduced ? {} : {
                    y: [0, 16, 0],
                  }}
                  transition={prefersReduced ? { duration: 0 } : {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[var(--cyber-cyan)] to-[var(--cyber-purple)] mb-1 shadow-[0_0_12px_rgba(0,255,255,0.9),0_0_20px_rgba(145,94,255,0.6)]"
                />
              </div>
            </div>

            {/* Text with enhanced effects for better readability */}
            <m.span
              className="text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-[var(--cyber-cyan)] via-white to-[var(--cyber-purple)] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(0,255,255,0.8)) drop-shadow(0 0 20px rgba(145,94,255,0.5))'
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
                filter: [
                  'drop-shadow(0 0 10px rgba(0,255,255,0.8)) drop-shadow(0 0 20px rgba(145,94,255,0.5))',
                  'drop-shadow(0 0 15px rgba(0,255,255,1)) drop-shadow(0 0 30px rgba(145,94,255,0.7))',
                  'drop-shadow(0 0 10px rgba(0,255,255,0.8)) drop-shadow(0 0 20px rgba(145,94,255,0.5))'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {t('hero.dragToRotate')}
            </m.span>

            {/* Decorative lines */}
            <div className="flex items-center gap-2 mt-2">
              <m.div
                className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[var(--cyber-cyan)]"
                animate={{ width: [8, 16, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <m.div
                className="w-1 h-1 rounded-full bg-[var(--cyber-purple)]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <m.div
                className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[var(--cyber-purple)]"
                animate={{ width: [8, 16, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default Hero;
