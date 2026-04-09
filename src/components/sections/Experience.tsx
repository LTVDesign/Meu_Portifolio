import { m } from 'framer-motion';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { experiences } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { useLazyImage } from '../../hooks/useLazyImage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { TExperience } from '../../types';
import { textVariant } from '../../utils/motion';
import { Header } from '../atoms';

const ExperienceCard = forwardRef<
  HTMLDivElement,
  { experience: TExperience; index: number }
>(({ experience, index }, ref) => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const [loadedIcon, isLoading, imgRef] = useLazyImage(experience.icon, {
    rootMargin: '100px',
    threshold: 0.01,
  });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className='relative pl-[clamp(3.5rem,8vw,5rem)] pb-[clamp(2.5rem,6vw,3rem)] last:pb-0 group'
    >
      {/* Line & Circle */}
      <div
        className='absolute left-[clamp(1.4375rem,3.5vw,1.9375rem)] top-0 h-full w-[2px] bg-gradient-to-b from-[var(--cyber-cyan)] via-white/10 to-transparent group-last:h-16'
        style={{
          boxShadow:
            '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2)',
        }}
      >
        {/* Animated glow that travels down the line */}
        <m.div
          className='absolute left-[-4px] w-[10px] h-[10px] rounded-full bg-[var(--cyber-cyan)]'
          animate={{
            top: ['0%', '100%'],
            scale: [1, 0.8, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        />
      </div>

      {/* Logo badge - responsivo */}
      <div className='absolute left-[clamp(-0.5rem,-1vw,-0.25rem)] top-0 w-[clamp(3.5rem,8vw,5rem)] h-[clamp(3.5rem,8vw,5rem)] rounded-full bg-white border-2 border-[var(--cyber-cyan)] z-10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110 shadow-[0_0_20px_rgba(0,255,255,0.2)]'>
        {/* External orbiting glow */}
        <m.div
          className='absolute w-[clamp(0.5rem,1.5vw,0.75rem)] h-[clamp(0.5rem,1.5vw,0.75rem)] rounded-full bg-[var(--cyber-cyan)]'
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [-30, 0, 30, 0, -30],
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 1.5,
          }}
        />
        {isLoading ? (
          <div className='w-[clamp(2.5rem,6vw,4rem)] h-[clamp(2.5rem,6vw,4rem)] flex items-center justify-center'>
            <div className='animate-spin rounded-full h-[clamp(1.5rem,4vw,2rem)] w-[clamp(1.5rem,4vw,2rem)] border-b-2 border-[var(--cyber-cyan)]'></div>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={loadedIcon}
            alt={experience.companyName}
            className='w-[clamp(2.5rem,6vw,4rem)] h-[clamp(2.5rem,6vw,4rem)] object-contain'
            loading='lazy'
          />
        )}
      </div>

      {/* Content Card */}
      <m.div
        whileHover={prefersReduced ? {} : { y: -5 }}
        className='glass-card p-[clamp(1rem,4vw,2rem)] neon-hover relative overflow-hidden'
      >
        <div className='flex flex-wrap items-center justify-between gap-[clamp(0.5rem,2vw,1rem)] mb-[clamp(1rem,3vw,1.5rem)]'>
          <div>
            <h3 className='text-[clamp(1.125rem,4vw,1.5rem)] font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors tracking-tight'>
              {t(experience.title)}
            </h3>
            <p className='text-white/70 font-medium text-[clamp(0.875rem,2vw,1.125rem)] mt-1'>
              {t(experience.companyName)}
            </p>
          </div>
          <div className='text-[var(--cyber-purple)] font-mono text-[clamp(0.65rem,1.5vw,0.85rem)] tracking-widest bg-white/5 px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.4rem,1vw,0.5rem)] rounded-xl h-fit border border-white/5 shadow-inner'>
            {t(experience.date)}
          </div>
        </div>

        <ul className='space-y-[clamp(0.75rem,2vw,1rem)]'>
          {experience.points.map((point: string, i: number) => (
            <li
              key={i}
              className='text-white/80 text-[clamp(0.75rem,2vw,0.875rem)] flex gap-[clamp(0.5rem,2vw,0.75rem)] leading-relaxed'
              style={{
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
              }}
            >
              <span className='text-[var(--cyber-cyan)] mt-1.5 flex-shrink-0 animate-pulse text-[clamp(1rem,2vw,1.25rem)] leading-none'>
                •
              </span>
              {t(point)}
            </li>
          ))}
        </ul>
      </m.div>
    </m.div>
  );
});

const Experience = () => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <div className='w-full mx-auto px-[clamp(1rem,5vw,2rem)]'>
      <m.div variants={textVariant()} className='text-center mb-[clamp(2.5rem,6vw,4rem)]'>
        <Header useMotion={true} p={t('experience.p')} h2={t('experience.h2')} />
      </m.div>

      {/* Box de texto informativo com animação */}

      <div className='relative pt-2'>
        {/* Timeline Line (Background) */}
        <div className='absolute left-[clamp(1.4375rem,3.5vw,1.9375rem)] top-[clamp(1rem,3vw,1rem)] bottom-0 w-[2px] bg-gradient-to-b from-[var(--cyber-cyan)]/30 via-white/10 to-transparent' />

        {displayedExperiences.map((exp, index) => (
          <ExperienceCard key={exp.title + exp.date} experience={exp} index={index} />
        ))}
      </div>

      {!showAll && experiences.length > 4 && (
        <div className='mt-[clamp(2rem,6vw,3rem)] flex justify-center'>
          <m.button
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className='relative px-[clamp(1.5rem,4vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.65rem,1.5vw,0.75rem)] font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-3 shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden min-h-[44px] hover:shadow-[0_8px_30px_rgba(0,255,255,0.3)]'
          >
            <m.div
              className='absolute inset-0 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)]/20 to-transparent'
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <span className='relative z-10'>{t('experience.verMais')}</span>

            <div className='absolute inset-0 rounded-2xl border border-[var(--cyber-cyan)]/0 group-hover/btn:border-[var(--cyber-cyan)]/60 transition-all duration-300' />
          </m.button>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Experience, 'experience');
