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
      className='relative pl-14 sm:pl-20 pb-10 sm:pb-12 last:pb-0 group'
    >
      {/* Line & Circle */}
      <div
        className='absolute left-[23px] sm:left-[31px] top-0 h-full w-[2px] bg-gradient-to-b from-[var(--cyber-cyan)] via-white/10 to-transparent group-last:h-16'
        style={{
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2)'
        }}
      >
        {/* Animated glow that travels down the line */}
        <m.div
          className='absolute left-[-4px] w-[10px] h-[10px] rounded-full bg-[var(--cyber-cyan)]'
          animate={{
            top: ['0%', '100%'],
            scale: [1, 0.8, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5
          }}
        />
      </div>

      {/* Logo badge - responsivo */}
      <div
        className='absolute left-[-4px] sm:left-[-8px] top-0 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[var(--cyber-cyan)] z-10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110'
      >
        {/* External orbiting glow */}
        <m.div
          className='absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[var(--cyber-cyan)]'
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [-30, 0, 30, 0, -30],
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 1.5
          }}
        />
        {isLoading ? (
          <div className='w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[var(--cyber-cyan)]'></div>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={loadedIcon}
            alt={experience.companyName}
            className='w-10 h-10 sm:w-16 sm:h-16 object-contain'
            loading='lazy'
          />
        )}
      </div>

      {/* Content Card */}
      <m.div
        whileHover={prefersReduced ? {} : { y: -5 }}
        className='glass-card p-4 sm:p-8 neon-hover relative overflow-hidden'
      >
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6'>
          <div>
            <h3 className='text-lg sm:text-2xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors tracking-tight'>
              {experience.title}
            </h3>
            <p className='text-white/70 font-medium text-sm sm:text-lg mt-1'>
              {experience.companyName}
            </p>
          </div>
          <div className='text-[var(--cyber-purple)] font-mono text-xs sm:text-sm tracking-widest bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl h-fit border border-white/5 shadow-inner self-start sm:self-auto'>
            {experience.date}
          </div>
        </div>

        <ul className='space-y-3 sm:space-y-4'>
          {experience.points.map((point: string, i: number) => (
            <li
              key={i}
              className='text-[var(--text-secondary)] text-xs sm:text-sm flex gap-2 sm:gap-3 leading-relaxed'
            >
              <span className='text-[var(--cyber-cyan)] mt-1.5 flex-shrink-0 animate-pulse text-base sm:text-lg leading-none'>
                •
              </span>
              {point}
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
    <div className='max-w-5xl mx-auto px-4 sm:px-6'>
      <m.div variants={textVariant()} className='text-center mb-8 sm:mb-12'>
        <Header useMotion={true} p={t('experience.p')} h2={t('experience.h2')} />
      </m.div>

      {/* Box de texto informativo com animação */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-10 sm:mb-16'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
          {/* Conteúdo da box */}
          <div className='relative z-10'>
            <div className='mb-6 sm:mb-8 text-center'>
              <m.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 sm:mb-4 tracking-tight'
              >
                <span className='bg-gradient-to-r from-[var(--cyber-cyan)] via-white to-[var(--cyber-purple)] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]'>
                  {t('experience.h2')}
                </span>
              </m.h3>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='text-sm sm:text-lg md:text-xl font-bold text-[var(--cyber-purple)] uppercase tracking-wider mb-6 sm:mb-8'
              >
                {t('experience.p')}
              </m.p>

              {/* Linha com animação discreta de brilho */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className='relative w-full max-w-xl mx-auto mb-6 sm:mb-8'
              >
                <div className='h-[1px] bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent relative'>
                  <m.div
                    className='absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--cyber-cyan)] blur-sm'
                    style={{ left: '50%' }}
                    animate={{
                      left: ['50%', '0%', '50%'],
                      opacity: [0.8, 0.3, 0.8],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <m.div
                    className='absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--cyber-purple)] blur-sm'
                    style={{ right: '50%' }}
                    animate={{
                      right: ['50%', '0%', '50%'],
                      opacity: [0.8, 0.3, 0.8],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </m.div>

              {/* Texto principal */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className='prose prose-invert max-w-none'
              >
                <p className='text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base md:text-lg mb-6'>
                  {t('about.content')}
                </p>
              </m.div>

              {/* Badges de destaque */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className='flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8'
              >
                {[
                  { text: t('services.gestaoBadge'), color: 'from-purple-500 to-pink-500' },
                  { text: t('services.scrumMasterBadge'), color: 'from-green-500 to-emerald-500' },
                  { text: t('services.cibersegurancaBadge'), color: 'from-red-500 to-orange-500' },
                  { text: t('services.iaDadosBadge'), color: 'from-cyan-500 to-blue-500' },
                ].map((badge, idx) => (
                  <m.span
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
                  >
                    {badge.text}
                  </m.span>
                ))}
              </m.div>
            </div>
          </div>

          {/* Borda decorativa com glow */}
          <div className='absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none' />
          <div className='absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10' />
        </div>
      </m.div>

      <div className='relative pt-2'>
        {/* Timeline Line (Background) */}
        <div
          className='absolute left-[23px] sm:left-[31px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-[var(--cyber-cyan)]/30 via-white/10 to-transparent'
        />

        {displayedExperiences.map((exp, index) => (
          <ExperienceCard key={exp.title + exp.date} experience={exp} index={index} />
        ))}
      </div>

      {!showAll && experiences.length > 4 && (
        <div className='mt-8 sm:mt-10 flex justify-center'>
          <m.button
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className='relative px-6 sm:px-8 py-3 sm:py-4 text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-3 shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden min-h-[44px] hover:shadow-[0_8px_30px_rgba(0,255,255,0.3)]'
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