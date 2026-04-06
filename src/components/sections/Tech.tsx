import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { technologies } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeIn, textVariant } from '../../utils/motion';

type Technology = (typeof technologies)[0];

const Tech = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  const handleTechClick = (techName: string) => {
    // Abre uma busca sobre a tecnologia em uma nova aba
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(techName + ' tutorial')}`;
    window.open(searchUrl, '_blank');
  };

  // Agrupar tecnologias por categoria
  const technologiesByCategory: Record<string, Technology[]> = {};

  technologies.forEach((tech) => {
    const category = tech.category || 'Outros';
    if (!technologiesByCategory[category]) {
      technologiesByCategory[category] = [];
    }
    technologiesByCategory[category].push(tech);
  });

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6'>
      {/* Box de texto informativo com animação */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-[clamp(2rem,6vw,4rem)]'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-[clamp(1.25rem,5vw,3rem)] shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
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
            {/* Título e subtítulo animados */}
            <div className='text-center'>
              <m.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='text-[clamp(1.25rem,6vw,2.5rem)] font-black text-white mb-[clamp(0.75rem,2vw,1.5rem)] tracking-tight'
              >
                <span className='bg-gradient-to-r from-[var(--cyber-cyan)] via-white to-[var(--cyber-purple)] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]'>
                  {t('tech.experienceTitle')}
                </span>
              </m.h3>

              {/* Badges de destaque */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='flex flex-wrap justify-center gap-[clamp(0.5rem,1.5vw,0.75rem)] mt-[clamp(1.25rem,3vw,2rem)]'
              >
                {[
                  { text: t('tech.arsenal'), color: 'from-purple-500 to-pink-500' },
                  { text: t('tech.stackTitle'), color: 'from-cyan-500 to-blue-500' },
                ].map((badge, idx) => (
                  <m.span
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-full text-[clamp(0.65rem,1.5vw,0.75rem)] font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20 motion-composited`}
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

      {/* Grid de tecnologias com escadinhas */}
      <div className='space-y-10 sm:space-y-16'>
        {Object.entries(technologiesByCategory).map(([category, techs]) => (
          <div key={category}>
            {/* Título da categoria */}
            <m.div
              variants={prefersReduced ? {} : textVariant()}
              className='text-center mb-[clamp(1.5rem,4vw,2.5rem)]'
            >
              <p className='text-[var(--cyber-purple)] uppercase tracking-widest text-[clamp(0.75rem,2vw,0.875rem)] font-bold opacity-60'>
                {t(category)}
              </p>
              <h3 className='section-title mt-2 drop-shadow-[0_0_15px_rgba(145,94,255,0.4)] text-[clamp(1.25rem,4vw,2rem)]'>
                {techs.length} {t('tech.technologiesTitle')}
              </h3>
            </m.div>

            {/* Grid flexível e autoajustável usando auto-fit e fluid units */}
            <div className='grid grid-cols-[repeat(auto-fit,minmax(clamp(3rem,10vw,4.5rem),1fr))] gap-[clamp(1rem,4vw,2.5rem)] justify-items-center'>
              {techs.map((tech: Technology, index: number) => (
                <m.div
                  key={tech.name}
                  variants={
                    prefersReduced ? {} : fadeIn('up', 'spring', index * 0.05, 0.75)
                  }
                  onClick={() => handleTechClick(tech.name)}
                  className='flex flex-col items-center justify-center group relative h-[clamp(5rem,16vw,6rem)] w-[clamp(3rem,12vw,4.5rem)] cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-20'
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glass Icon Container com efeito de escadinha */}
                  <div className='relative'>
                    {/* Efeito de glow animado */}
                    <m.div
                      className='absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/30 to-[var(--cyber-purple)]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    <div className='relative w-[clamp(2.5rem,10vw,3.5rem)] h-[clamp(2.5rem,10vw,3.5rem)] p-[clamp(0.5rem,2vw,0.75rem)] flex items-center justify-center rounded-2xl transition-all duration-300 border border-white/10 group-hover:border-[var(--cyber-cyan)]/60 group-hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] bg-white/10 backdrop-blur-sm shadow-lg tech-badge-composited skill-icon'>
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className='w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500'
                      />
                    </div>
                  </div>

                  {/* Label name - Floating reveal on hover com intenso brilho neon */}
                  <p className='absolute bottom-2 text-[clamp(0.5rem,2vw,0.625rem)] font-black text-white uppercase tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 drop-shadow-[0_0_12px_rgba(0,255,255,1)] pointer-events-none text-center leading-none'>
                    {t(tech.name)}
                  </p>

                  {/* Efeito de clique */}
                  <m.div
                    className='absolute inset-0 rounded-2xl border-2 border-[var(--cyber-cyan)]/50 opacity-0'
                    initial={false}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </m.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Informação adicional */}
      <div className='mt-10 sm:mt-16 text-center'>
        <p className='text-[var(--text-secondary)] text-sm'>
          {t('tech.clickInfo')}
        </p>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, 'tecnologias');
