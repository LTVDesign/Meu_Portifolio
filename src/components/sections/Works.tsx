import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projects } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';

const Works = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  const handleProjectClick = (projectName: string) => {
    const project = projects.find((p) => p.name === projectName);
    if (project) {
      window.open(project.sourceCodeLink, '_blank');
    }
  };

  return (
    <div className='w-full mx-auto px-[clamp(1rem,5vw,2rem)]'>
      {/* Box de texto informativo com animação */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-[clamp(2.5rem,8vw,4rem)]'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-[clamp(1.5rem,5vw,3rem)] shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
          {/* Efeito de brilho animado no fundo */}
          <div className='absolute inset-0 opacity-30'>
            <m.div
              className='absolute inset-0'
              style={{
                background:
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
              }}
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Conteúdo da box */}
          <div className='relative z-10'>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Header useMotion={true} p={t('works.p')} h2={t('works.h2')} />
            </m.div>

            {/* Linha com animação discreta de brilho */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className='relative w-full max-w-xl mx-auto my-[clamp(1.5rem,4vw,2rem)]'
            >
              <div className='h-[1px] bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent relative'>
                <m.div
                  className='absolute top-1/2 -translate-y-1/2 w-[clamp(0.75rem,1.5vw,1rem)] h-[clamp(0.75rem,1.5vw,1rem)] rounded-full bg-[var(--cyber-cyan)] blur-sm'
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
                  className='absolute top-1/2 -translate-y-1/2 w-[clamp(0.75rem,1.5vw,1rem)] h-[clamp(0.75rem,1.5vw,1rem)] rounded-full bg-[var(--cyber-purple)] blur-sm'
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

            {/* Badges de destaque */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className='flex flex-wrap justify-center gap-[clamp(0.5rem,1.5vw,0.75rem)] mt-[clamp(1rem,3vw,1.5rem)]'
            >
              {[
                { text: t('works.badgeReact'), color: 'from-cyan-500 to-blue-500' },
                { text: t('works.badgeThree'), color: 'from-purple-500 to-pink-500' },
                { text: t('works.badgeNode'), color: 'from-green-500 to-emerald-500' },
                { text: t('works.badgeFullStack'), color: 'from-orange-500 to-red-500' },
              ].map((badge, idx) => (
                <m.span
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)] rounded-full text-[clamp(0.6rem,1.5vw,0.75rem)] font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
                >
                  {badge.text}
                </m.span>
              ))}
            </m.div>
          </div>

          {/* Borda decorativa com glow */}
          <div className='absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none' />
          <div className='absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10' />
        </div>
      </m.div>

      {/* Grid de projetos - responsivo */}
      <div className='mt-[clamp(2rem,6vw,3rem)] grid grid-cols-[repeat(auto-fit,minmax(clamp(250px,25vw,350px),1fr))] gap-[clamp(1.25rem,4vw,2.5rem)]'>
        {projects.map((project) => {
          const projectName = project.name; // Nomes de projetos geralmente não mudam entre línguas, mas se mudar use t()
          const projectDescription = t(project.description);
          const projectCategory = t(`works.${project.category}`);
          const projectStatus = t(`works.${project.status}`);

          return (
            <m.div
              key={projectName}
              variants={prefersReduced ? {} : fadeIn('up', 'spring', 0, 0.75)}
              onClick={() => handleProjectClick(projectName)}
              className='glass-card group relative overflow-hidden h-full flex flex-col neon-hover border border-white/10 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='relative aspect-video max-h-[clamp(11rem,25vw,16rem)] overflow-hidden'>
                <img
                  src={project.image}
                  alt={projectName}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                  loading='eager'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent' />

                {/* Badges Container */}
                <div className='absolute top-[clamp(0.75rem,2vw,1rem)] left-[clamp(0.75rem,2vw,1rem)] right-[clamp(0.75rem,2vw,1rem)] flex flex-col items-start gap-2'>
                  {/* Category Badge */}
                  <div className='flex-shrink-0 px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.25rem,1vw,0.375rem)] bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[clamp(0.55rem,1.5vw,0.65rem)] font-bold text-[var(--cyber-cyan)] uppercase tracking-widest shadow-xl'>
                    {projectCategory}
                  </div>

                  {/* Status Badge */}
                  <div className='flex-shrink-0 px-[clamp(0.5rem,1.5vw,0.75rem)] py-[clamp(0.25rem,1vw,0.25rem)] bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[clamp(0.5rem,1.2vw,0.55rem)] font-bold text-green-400 uppercase tracking-widest'>
                    {projectStatus}
                  </div>
                </div>
              </div>

              <div className='p-[clamp(1.25rem,4vw,2rem)] flex-1 flex flex-col'>
                <div className='flex flex-wrap gap-[clamp(0.375rem,1vw,0.5rem)] mb-[clamp(0.75rem,2vw,1rem)]'>
                  {project.tags?.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className='text-[clamp(0.55rem,1.5vw,0.65rem)] px-[clamp(0.5rem,1.5vw,0.75rem)] py-[clamp(0.125rem,0.5vw,0.25rem)] bg-white/5 border border-white/10 rounded-full text-white/80 font-medium'
                      style={{
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>

                <h3 className='text-[clamp(1.125rem,3vw,1.5rem)] font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors line-clamp-1 mb-[clamp(0.5rem,1.5vw,0.75rem)]'>
                  {projectName}
                </h3>

                <p
                  className='mt-[clamp(0.5rem,1.5vw,0.75rem)] text-white/80 line-clamp-3 text-[clamp(0.75rem,2vw,0.875rem)] flex-1 leading-relaxed'
                  style={{
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {projectDescription}
                </p>

                <div className='mt-[clamp(1.25rem,4vw,2rem)] w-full flex justify-center'>
                  <m.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(projectName);
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className='relative px-[clamp(1.25rem,4vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.625rem,1.5vw,0.75rem)] font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden min-h-[44px] btn-glow'
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

                    <span className='relative z-10'>{t('works.accessProject')}</span>

                    <div className='absolute inset-0 rounded-2xl border border-[var(--cyber-cyan)]/0 group-hover/btn:border-[var(--cyber-cyan)]/60 transition-all duration-300' />
                  </m.button>
                </div>
              </div>
            </m.div>
          );
        })}
      </div>

      <div className='mt-[clamp(2.5rem,8vw,4rem)] flex justify-center'>
        <m.a
          href='https://github.com/lelebrr'
          target='_blank'
          rel='noopener noreferrer'
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.95 }}
          className='relative px-[clamp(1.5rem,5vw,2rem)] py-[clamp(0.75rem,2.5vw,1rem)] text-[clamp(0.625rem,1.5vw,0.75rem)] font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-white backdrop-blur-sm group/btn flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden min-h-[44px] btn-glow'
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

          <span className='relative z-10'>{t('works.viewProjects')}</span>

          <div className='absolute inset-0 rounded-2xl border border-[var(--cyber-cyan)]/0 group-hover/btn:border-[var(--cyber-cyan)]/60 transition-all duration-300' />
        </m.a>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'works');
