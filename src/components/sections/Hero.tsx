import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { config } from '../../constants/config';
import { fadeIn } from '../../utils/motion';
import { ComputersCanvas } from '../canvas';
import { TerminalText } from '../atoms';

const TITLE_WORDS = ['Olá, eu sou Leandro Barbosa'];
const SUBTITLE_WORDS = [
  'Bem-vindo à minha vida profissional',
  'Desenvolvedor Full Stack & Especialista em IA',
  'Transformando dados em decisões inteligentes',
  'Construindo infraestruturas seguras e inovadoras'
];

const Hero = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const titleLength = TITLE_WORDS[0].length;
    const typingSpeed = 80;
    const pauseTime = 3000;
    const totalTime = (titleLength * typingSpeed) + pauseTime;

    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, totalTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative min-h-screen flex items-start pt-4 overflow-hidden"
    >
      <Helmet>
        <title>Leandro Saturnino Barbosa | Portfólio 3D Cyberpunk</title>
        <meta name="description" content="Portfólio interativo 3D com React, Three.js e Tailwind. Especialista em IA, Segurança e Desenvolvimento Full Stack." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Leandro Saturnino Barbosa",
            "jobTitle": "Desenvolvedor Full Stack & Especialista em IA",
            "url": "https://lelebrr.github.io/Meu_Portifolio/",
            "sameAs": [
              "https://github.com/lelebrr",
              "https://linkedin.com/in/leandro-saturnino-barbosa"
            ],
            "knowsAbout": [
              "React",
              "TypeScript",
              "Three.js",
              "Inteligência Artificial",
              "Cibersegurança",
              "Desenvolvimento Full Stack"
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full">
        <TerminalText
          words={TITLE_WORDS}
          colors={['#a855f7', '#06b6d4', '#ffffff']}
          typingSpeed={80}
          pauseTime={3000}
          typeOnce={true}
          loop={false}
          className="text-[clamp(2rem,5vw,3rem)] leading-none font-bold tracking-tight text-white neon-text whitespace-nowrap"
        />

        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4"
          >
            <TerminalText
              words={SUBTITLE_WORDS}
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

      <div className="absolute bottom-10 right-10 hidden xl:block text-[12rem] font-black text-white/5 tracking-[-0.05em] pointer-events-none select-none">
        LSB
      </div>
    </motion.section>
  );
};

export default Hero;
