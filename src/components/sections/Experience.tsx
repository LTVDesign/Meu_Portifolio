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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className='relative pl-20 pb-12 last:pb-0 group'
    >
      {/* Line & Circle */}
      <div className='absolute left-[31px] top-0 h-full w-[2px] bg-gradient-to-b from-[var(--cyber-cyan)] via-white/10 to-transparent group-last:h-16' style={{
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2)'
      }}>
        {/* Animated glow that travels down the line */}
        <m.div
          className='absolute left-[-4px] w-[10px] h-[10px] rounded-full bg-[var(--cyber-cyan)]'
          style={{
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.5), 0 0 45px rgba(0, 255, 255, 0.3)',
            filter: 'blur(1px)'
          }}
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
      <div className='absolute left-[-8px] top-0 w-20 h-20 rounded-full bg-white border-2 border-[var(--cyber-cyan)] z-10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110' style={{
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
      }}>
        {/* External orbiting glow - circles around the logo */}
        <m.div
          className='absolute w-3 h-3 rounded-full bg-[var(--cyber-cyan)]'
          style={{
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.9), 0 0 30px rgba(0, 255, 255, 0.6), 0 0 45px rgba(0, 255, 255, 0.3)',
            top: '50%',
            left: '50%',
            marginTop: '-6px',
            marginLeft: '-6px'
          }}
          animate={{
            x: [0, 40, 0, -40, 0],
            y: [-40, 0, 40, 0, -40]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 1.5
          }}
        />
        {isLoading ? (
          <div className='w-16 h-16 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--cyber-cyan)]'></div>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={loadedIcon}
            alt={experience.companyName}
            className='w-16 h-16 object-contain'
            loading='lazy'
          />
        )}
      </div>

      {/* Content Card */}
      <m.div
        whileHover={prefersReduced ? {} : { y: -5 }}
        className='glass-card p-8 neon-hover relative overflow-hidden'
      >
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
          <div>
            <h3 className='text-2xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors tracking-tight'>
              {experience.title}
            </h3>
            <p className='text-white/70 font-medium text-lg mt-1'>
              {experience.companyName}
            </p>
          </div>
          <div className='text-[var(--cyber-purple)] font-mono text-sm tracking-widest bg-white/5 px-4 py-2 rounded-xl h-fit border border-white/5 shadow-inner'>
            {experience.date}
          </div>
        </div>

        <ul className='space-y-4'>
          {experience.points.map((point: string, i: number) => (
            <li
              key={i}
              className='text-[var(--text-secondary)] text-sm flex gap-3 leading-relaxed'
            >
              <span className='text-[var(--cyber-cyan)] mt-1.5 flex-shrink-0 animate-pulse text-lg leading-none'>
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
  console.log('[Experience] Renderizando componente Experience');
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <div className='max-w-5xl mx-auto px-6'>
      <m.div variants={textVariant()} className='text-center mb-12'>
        <Header useMotion={true} p={t('experience.p')} h2={t('experience.h2')} />
      </m.div>

      {/* Box de texto informativo com animação */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-16'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-8 md:p-12 shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
          {/* Conteúdo da box */}
          <div className='relative z-10'>
            {/* Título e subtítulo animados */}
            <div className='mb-8 text-center'>
              <m.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='text-2xl md:text-3xl font-black text-white mb-4 tracking-tight'
              >
                <span className='bg-gradient-to-r from-[var(--cyber-cyan)] via-white to-[var(--cyber-purple)] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]'>
                  {t('about.h2')}
                </span>
              </m.h3>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='text-lg md:text-xl font-bold text-[var(--cyber-purple)] uppercase tracking-wider mb-8'
              >
                {t('about.p')}
              </m.p>

              {/* Linha com animação discreta de brilho */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className='relative w-full max-w-xl mx-auto mb-8'
              >
                <div className='h-[1px] bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent relative'>
                  {/* Brilho esquerdo */}
                  <m.div
                    className='absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--cyber-cyan)] blur-sm'
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
                  {/* Brilho direito */}
                  <m.div
                    className='absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--cyber-purple)] blur-sm'
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

              {/* Texto principal com melhor leitura */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className='prose prose-invert max-w-none'
              >
                <p className='text-[var(--text-secondary)] leading-relaxed text-base md:text-lg mb-6'>
                  {t('about.content')}
                </p>
              </m.div>

              {/* Badges de destaque */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className='flex flex-wrap justify-center gap-3 mt-8'
              >
                {[
                  { text: t('services.gestaoBadge'), color: 'from-purple-500 to-pink-500' },
                  { text: 'Scrum Master', color: 'from-green-500 to-emerald-500' },
                  { text: t('services.cibersegurancaBadge'), color: 'from-red-500 to-orange-500' },
                  { text: t('services.iaDadosBadge'), color: 'from-cyan-500 to-blue-500' },
                ].map((badge, idx) => (
                  <m.span
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
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
        <div className='absolute left-[31px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-[var(--cyber-cyan)]/30 via-white/10 to-transparent' style={{
          boxShadow: '0 0 8px rgba(0, 255, 255, 0.3), 0 0 16px rgba(0, 255, 255, 0.2)',
          animation: 'glow-pulse 2s ease-in-out infinite'
        }} />

        {displayedExperiences.map((exp, index) => (
          <ExperienceCard key={exp.title + exp.date} experience={exp} index={index} />
        ))}
      </div>

      {!showAll && experiences.length > 4 && (
        <div className='mt-10 flex justify-center'>
          <m.button
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: '0 10px 40px rgba(0, 255, 255, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className='relative px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-3 shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden'
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
