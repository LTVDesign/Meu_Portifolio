import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { projects } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';

const Works = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  const handleProjectClick = (projectName: string) => {
    const projectUrls: Record<string, string> = {
      'GetNexo v1.0+': 'https://getnexo.ai',
      'Component Tester PRO v2.0': 'https://github.com/lelebrr/Component_Tester',
      'Willy Cyber-Multitool': 'https://github.com/lelebrr/Willy',
    };

    const url = projectUrls[projectName] || '#';
    window.open(url, '_blank');
  };

  const projectsList = [
    { nameKey: '0', tagsKey: '0' },
    { nameKey: '1', tagsKey: '1' },
    { nameKey: '2', tagsKey: '2' },
  ];

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6'>
      {/* Box de texto informativo com animação */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-10 sm:mb-16'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
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
              className='relative w-full max-w-xl mx-auto my-6 sm:my-8'
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

            {/* Badges de destaque */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className='flex flex-wrap justify-center gap-2 sm:gap-3 mt-4'
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
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
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
      <div className='mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8'>
        {projectsList.map((project, index) => {
          const projectKey = project.nameKey;
          const projectName = t(`projects.list.${projectKey}.name`);
          const projectDescription = t(`projects.list.${projectKey}.description`);
          const projectCategory = t(`projects.list.${projectKey}.category`);
          const projectStatus = t(`projects.list.${projectKey}.status`);
          const tags = t(`projects.list.${projectKey}.tags`, { returnObjects: true });
          const projectTags = (Array.isArray(tags) ? tags : []) as { name: string; color: string }[];

          return (
            <m.div
              key={projectKey}
              variants={prefersReduced ? {} : fadeIn('up', 'spring', index * 0.1, 0.75)}
              onClick={() => handleProjectClick(projectName)}
              className='glass-card group relative overflow-hidden h-full flex flex-col neon-hover border border-white/10 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='relative h-44 sm:h-60 overflow-hidden'>
                <img
                  src={projects[parseInt(projectKey)].image}
                  alt={projectName}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                  loading='lazy'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent' />

                {/* Badges Container */}
                <div className='absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-start gap-2'>
                  {/* Category Badge */}
                  <div className='flex-shrink-0 px-3 sm:px-4 py-1 sm:py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[9px] sm:text-[10px] font-bold text-[var(--cyber-cyan)] uppercase tracking-widest shadow-xl'>
                    {projectCategory}
                  </div>

                  {/* Status Badge */}
                  <div className='flex-shrink-0 px-2 sm:px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[8px] sm:text-[9px] font-bold text-green-400 uppercase tracking-widest'>
                    {projectStatus}
                  </div>
                </div>
              </div>

              <div className='p-5 sm:p-8 flex-1 flex flex-col'>
                <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4'>
                  {projectTags?.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className='text-[9px] sm:text-[10px] px-2 sm:px-3 py-0.5 sm:py-1 bg-white/5 border border-white/10 rounded-full text-[var(--text-secondary)] font-medium'
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>

                <h3 className='text-lg sm:text-2xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors line-clamp-1 mb-2 sm:mb-3'>
                  {projectName}
                </h3>

                <p className='mt-2 sm:mt-3 text-[var(--text-secondary)] line-clamp-3 text-xs sm:text-sm flex-1 leading-relaxed'>
                  {projectDescription}
                </p>

                <div className='mt-5 sm:mt-8 w-full flex justify-center'>
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
                    className='relative px-5 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-2 sm:gap-3 shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden min-h-[44px] btn-glow'
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

      <div className='mt-10 sm:mt-16 flex justify-center'>
        <m.a
          href='/cursos'
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.95 }}
          className='relative px-6 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-2 sm:gap-3 shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden min-h-[44px] btn-glow'
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
