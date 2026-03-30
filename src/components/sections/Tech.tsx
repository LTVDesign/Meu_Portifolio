import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { technologies } from '../../constants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Tech = () => {
  console.log('[Tech] Renderizando componente Tech');
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        variants={prefersReduced ? {} : textVariant()}
        className="text-center mb-16"
      >
        <p className="text-[var(--cyber-purple)] uppercase tracking-widest text-sm font-bold opacity-60">{t('tech.arsenal')}</p>
        <h2 className="section-title mt-3 drop-shadow-[0_0_15px_rgba(145,94,255,0.4)]">{t('tech.stackTitle')}</h2>
      </motion.div>

      {/* Grid optimized for 13 items per row on desktop */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-13 gap-x-2 gap-y-10 justify-items-center">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            variants={prefersReduced ? {} : fadeIn('up', 'spring', index * 0.05, 0.75)}
            className="flex flex-col items-center justify-center group relative h-24 w-16"
          >
            {/* Glass Icon Container */}
            <div className="w-14 h-14 p-3 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] border border-white/10 group-hover:border-[var(--cyber-cyan)] relative z-10 bg-white shadow-lg">
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-8 h-8 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Label name - Floating reveal on hover with intense neon glow */}
            <p className="absolute bottom-2 text-[10px] font-black text-white uppercase tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 drop-shadow-[0_0_12px_rgba(0,255,255,1)] pointer-events-none text-center leading-none">
              {tech.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, 'tecnologias');