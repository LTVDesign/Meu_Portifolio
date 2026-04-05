import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms';

// Importando a foto pessoal de src/assets/images/
import eu from '../../assets/images/eu.jpg';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6'>
      <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 items-start'>
        {/* Box de texto informativo grande */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='flex-1 w-full'
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

            {/* Conteúdo da box de texto */}
            <div className='relative z-10'>
              <Header useMotion={true} p={t('about.p')} h2={t('about.h2')} />

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

              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className='prose prose-invert max-w-none mt-4 sm:mt-6 leading-relaxed text-sm sm:text-base'
                style={{ color: 'var(--dynamic-text-secondary, #666666)' }}
              >
                {(t('about.content') as string).split('\n').map((paragraph, i) => (
                  <p key={i} className='mb-3 sm:mb-4'>
                    {paragraph}
                  </p>
                ))}
              </m.div>
            </div>

            {/* Borda decorativa com glow */}
            <div className='absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none' />
            <div className='absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10' />
          </div>
        </m.div>

        {/* Card da imagem - responsivo */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='w-full lg:w-80 xl:w-96 flex-shrink-0 mx-auto lg:mx-0'
          style={{ maxWidth: '280px' }}
        >
          <div className='glass-card aspect-square rounded-3xl overflow-hidden border border-[var(--cyber-purple)]/30 hover:border-[var(--cyber-cyan)]/50 transition-all duration-500 shadow-2xl'>
            <img
              src={eu}
              alt='Leandro Saturnino Barbosa'
              className='w-full h-full object-cover'
              loading='lazy'
            />
            {/* Overlay com gradiente */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500' />
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
