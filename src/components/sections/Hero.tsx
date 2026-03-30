import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ComputersCanvas } from '../canvas';
import { TerminalText } from '../atoms';
import BackgroundSelectorModal from '../atoms/BackgroundSelectorModal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Hero = () => {
  console.log('[Hero] Renderizando componente Hero');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Title is static now, so start the subtitle sooner
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleBackgroundClick = () => {
    setShowBackgroundModal(true);
  };

  return (
    <motion.section
      id="hero"
      initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
      viewport={prefersReduced ? {} : { once: true, amount: 0.25 }}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <Helmet>
        <title>{t('hero.titleMeta')}</title>
        <meta name="description" content={t('hero.descriptionMeta')} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex flex-col items-center text-center relative -top-32 md:-top-40">
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-bold tracking-tight whitespace-nowrap mb-2 animate-fade-in text-white">
          {t('hero.title')}
        </h1>

        {/* Reserva espaço para o TerminalText para evitar CLS */}
        <div className="mt-4 max-w-2xl min-h-[2.5rem]">
          {showSubtitle && (
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.3 }}
            >
              <TerminalText
                words={t('hero.subtitle', { returnObjects: true }) as string[]}
                colors={['#06b6d4', '#a855f7', '#e5e7eb']}
                typingSpeed={60}
                pauseTime={3000}
                loop={false}
                typeOnce={true}
                className="text-[clamp(1rem,2vw,1.25rem)]"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Decorative neon element & 3D Model - com dimensões fixas para evitar CLS */}
      <div className="absolute inset-0 z-0 opacity-40 xl:opacity-100" style={{ minHeight: '100vh', minWidth: '100vw' }}>
        <ComputersCanvas />
      </div>

      {/* Engrenagem Animada com Arco Brilhante */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        initial={prefersReduced ? {} : { scale: 0, opacity: 0 }}
        animate={{
          scale: prefersReduced ? 1 : 1,
          opacity: prefersReduced ? 1 : 1,
          rotate: prefersReduced ? 0 : 360
        }}
        transition={{
          scale: prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 1 },
          opacity: prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 1 },
          rotate: prefersReduced ? { duration: 0 } : {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        whileHover={prefersReduced ? {} : { scale: 1.1 }}
        onClick={handleBackgroundClick}
      >
        {/* Arco brilhante colorido ao redor da engrenagem */}
        <div className="absolute inset-0 rounded-full">
          <motion.div
            className="w-full h-full rounded-full border-4 border-transparent"
            style={{
              background: `conic-gradient(from 0deg, #00FFFF, #915EFF, #ff00ff, #00FFFF)`,
              filter: 'blur(8px)',
              opacity: 0.8
            }}
            animate={prefersReduced ? {} : { rotate: 360 }}
            transition={prefersReduced ? { duration: 0 } : {
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Pulsação da engrenagem */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={prefersReduced ? {} : {
            scale: prefersReduced ? 1 : [1, 1.15, 1],
            opacity: prefersReduced ? 1 : [0.9, 1, 0.9]
          }}
          transition={prefersReduced ? { duration: 0 } : {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Engrenagem principal */}
            <motion.g
              animate={prefersReduced ? {} : { rotate: 360 }}
              transition={prefersReduced ? { duration: 0 } : {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Círculo central */}
              <circle
                cx="50"
                cy="50"
                r="15"
                fill="none"
                stroke="url(#gearGradient)"
                strokeWidth="3"
              />

              {/* Dentes da engrenagem */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const x1 = 50 + 25 * Math.cos(angle);
                const y1 = 50 + 25 * Math.sin(angle);
                const x2 = 50 + 35 * Math.cos(angle);
                const y2 = 50 + 35 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#gearGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Círculos decorativos nos dentes */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const cx = 50 + 30 * Math.cos(angle);
                const cy = 50 + 30 * Math.sin(angle);
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="#00FFFF"
                  />
                );
              })}

              <defs>
                <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FFFF" />
                  <stop offset="50%" stopColor="#915EFF" />
                  <stop offset="100%" stopColor="#00FFFF" />
                </linearGradient>
              </defs>
            </motion.g>
          </svg>
        </motion.div>

        {/* Efeito de brilho pulsante ao redor */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          animate={prefersReduced ? {} : {
            boxShadow: [
              '0 0 20px #00FFFF',
              '0 0 40px #915EFF',
              '0 0 60px #00FFFF',
              '0 0 40px #915EFF',
              '0 0 20px #00FFFF'
            ]
          }}
          transition={prefersReduced ? { duration: 0 } : {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Modal de Seleção de Background */}
      <BackgroundSelectorModal
        isOpen={showBackgroundModal}
        onClose={() => setShowBackgroundModal(false)}
      />

      {/* Scroll / Interact Icon */}
      <div className="absolute bottom-10 w-full flex justify-center items-center z-20 pointer-events-none">
        <div className="flex flex-col items-center opacity-70">
          <div className="w-[30px] h-[50px] rounded-3xl border-2 border-white/50 flex justify-center p-2 mb-2">
            <motion.div
              animate={prefersReduced ? {} : {
                y: [0, 16, 0],
              }}
              transition={prefersReduced ? { duration: 0 } : {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2 h-2 rounded-full bg-[#00FFFF] mb-1 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
            />
          </div>
          <span className="text-xs font-medium tracking-widest uppercase shadow-[0_0_10px_rgba(0,255,255,0.2)]" style={{ color: '#e5e7eb', opacity: 0.6 }}>{t('hero.dragToRotate')}</span>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
