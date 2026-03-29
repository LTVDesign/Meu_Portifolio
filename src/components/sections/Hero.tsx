import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ComputersCanvas } from '../canvas';
import { TerminalText } from '../atoms';

const Hero = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Title is static now, so start the subtitle sooner
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <Helmet>
        <title>{t('hero.titleMeta')}</title>
        <meta name="description" content={t('hero.descriptionMeta')} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex flex-col items-center text-center relative -top-32 md:-top-40">
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-bold tracking-tight text-white whitespace-nowrap mb-2">
          Olá, eu sou{" "}
          <span className="text-[var(--cyber-cyan)] neon-text relative inline-block group cursor-default">
            <span className="absolute -inset-1 animate-pulse blur-md bg-[var(--cyber-cyan)] opacity-20 group-hover:opacity-60 transition-opacity"></span>
            Leandro Barbosa
          </span>
        </h1>

        {/* Reserva espaço para o TerminalText para evitar CLS */}
        <div className="mt-4 max-w-2xl min-h-[2.5rem]">
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TerminalText
                words={t('hero.subtitle', { returnObjects: true }) as string[]}
                colors={['#06b6d4', '#a855f7', '#ffffff']}
                typingSpeed={60}
                pauseTime={3000}
                className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)]"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Decorative neon element & 3D Model - com dimensões fixas para evitar CLS */}
      <div className="absolute inset-0 z-0 opacity-40 xl:opacity-100" style={{ minHeight: '100vh', minWidth: '100vw' }}>
        <ComputersCanvas />
      </div>

      {/* Scroll / Interact Icon */}
      <div className="absolute bottom-10 w-full flex justify-center items-center z-20 pointer-events-none">
        <div className="flex flex-col items-center opacity-70">
          <div className="w-[30px] h-[50px] rounded-3xl border-2 border-white/50 flex justify-center p-2 mb-2">
            <motion.div
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2 h-2 rounded-full bg-[var(--cyber-cyan)] mb-1 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
            />
          </div>
          <span className="text-white/60 text-xs font-medium tracking-widest uppercase shadow-[0_0_10px_rgba(0,255,255,0.2)]">Arraste p/ Girar</span>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
