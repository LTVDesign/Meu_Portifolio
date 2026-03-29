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
    const titleLength = t('hero.title').length;
    const typingSpeed = 80;
    const pauseTime = 3000;
    const totalTime = (titleLength * typingSpeed) + pauseTime;

    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, totalTime);

    return () => clearTimeout(timer);
  }, [t]);

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

      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex flex-col items-center text-center">
        <TerminalText
          words={[t('hero.title')]}
          colors={['#a855f7', '#06b6d4', '#ffffff']}
          typingSpeed={80}
          pauseTime={3000}
          typeOnce={true}
          loop={false}
          className="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-bold tracking-tight text-white neon-text whitespace-nowrap"
        />

        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl"
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

      {/* Decorative neon element & 3D Model */}
      <div className="absolute inset-0 z-0 opacity-40 xl:opacity-100">
        <ComputersCanvas />
      </div>

    </motion.section>
  );
};

export default Hero;
