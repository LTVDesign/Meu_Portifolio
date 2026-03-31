import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ComputersCanvas } from '../canvas';
import { TerminalText } from '../atoms';
import { useBackgroundMenu } from '../../contexts/ParticleConfigContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Hero = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const { openBgMenu } = useBackgroundMenu();

  const handleFirstLineComplete = () => {
    // Quando a primeira linha completa, inicia a segunda
    setShowSecondLine(true);
  };

  // Memoizar arrays para evitar recriação e reset da animação
  const firstLineWords = useMemo(() => [t('hero.title')], [t]);
  const firstLineColors = useMemo(() => ['#ffffff'], []);
  const secondLineWords = useMemo(() => (t('hero.subtitle', { returnObjects: true }) as string[]).slice(0, 1), [t]);
  const secondLineColors = useMemo(() => ['#a855f7', '#06b6d4', '#e5e7eb'], []);

  useEffect(() => {
    // Reduzido de 1200ms para 300ms para melhorar LCP
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleBackgroundClick = () => {
    openBgMenu();
  };

  return (
    <LazyMotion features={domAnimation} strict={false}>
      <m.section
        id="hero"
        initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
        viewport={prefersReduced ? {} : { once: true, amount: 0.25 }}
        className="relative min-h-screen flex items-start justify-center pt-0 overflow-hidden"
      >
        <Helmet>
          <title>{t('hero.titleMeta')}</title>
          <meta name="description" content={t('hero.descriptionMeta')} />
        </Helmet>

        <div className="max-w-7xl mx-auto px-6 z-10 w-full flex flex-col items-center justify-center text-center relative mt-16 md:mt-20 min-h-screen">
          {/* Texto com animação de terminal - duas linhas */}
          <div className="flex flex-col items-center justify-center gap-1 w-full">
            {showSubtitle && (
              <>
                {/* Primeira linha: maior, branca com borda gradiente, fixa após digitação */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <TerminalText
                    words={firstLineWords}
                    colors={firstLineColors}
                    typingSpeed={65}
                    pauseTime={2000}
                    loop={false}
                    typeOnce={true}
                    onComplete={handleFirstLineComplete}
                    className="text-[clamp(3rem,5vw,4.5rem)] font-bold tracking-wide"
                  />
                  {/* Efeito de borda gradiente na linha de cima */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-lg opacity-30 blur-md -z-10" />
                </m.div>
                {/* Segunda linha: sem efeito, em loop após primeira completar */}
                {showSecondLine && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <TerminalText
                      words={secondLineWords}
                      colors={secondLineColors}
                      typingSpeed={55}
                      pauseTime={2800}
                      loop={true}
                      typeOnce={false}
                      className="text-[clamp(1.8rem,3vw,2.8rem)]"
                    />
                  </m.div>
                )}
              </>
            )}
          </div>

        </div>

        {/* Canvas 3D do Computador - rola junto com a página */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <ComputersCanvas />
        </div>

        {/* Engrenagem flutuante esquerda - Background selector (FIXA) */}
        <m.button
          onClick={handleBackgroundClick}
          className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-[100001] cursor-pointer group"
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
            <div className="flex flex-col items-center gap-1">
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
              <m.span
                className="text-[10px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] bg-clip-text text-transparent"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {t('hero.dragToRotateSubtitle')}
              </m.span>
            </div>


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