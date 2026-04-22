import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
// Importando a foto pessoal de src/assets/images/
import eu from '../../assets/images/eu.webp';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full mx-auto px-[clamp(1rem,5vw,2rem)]'>
      <div className='flex flex-col-reverse lg:flex-row gap-[clamp(1.5rem,4vw,3rem)] items-center lg:items-start justify-center'>
        {/* Box de texto informativo grande */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0 }}
          className='flex-1 min-w-[min(100%,350px)]'
        >
          <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-[clamp(1.25rem,5vw,2.5rem)] shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
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
                transition={{ duration: 0.8, delay: 0 }}
                className='relative w-full max-w-xl mx-auto my-[clamp(1.5rem,4vw,2.5rem)]'
              >
                <div className='h-[1px] bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent relative'>
                  <m.div
                    className='absolute top-1/2 -translate-y-1/2 w-[clamp(0.6rem,1.2vw,0.85rem)] h-[clamp(0.6rem,1.2vw,0.85rem)] rounded-full bg-[var(--cyber-cyan)] blur-sm'
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
                    className='absolute top-1/2 -translate-y-1/2 w-[clamp(0.6rem,1.2vw,0.85rem)] h-[clamp(0.6rem,1.2vw,0.85rem)] rounded-full bg-[var(--cyber-purple)] blur-sm'
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
                transition={{ duration: 0.8, delay: 0 }}
                className='prose prose-invert max-w-none mt-[clamp(0.75rem,2.5vw,1.25rem)] leading-relaxed text-[clamp(0.85rem,2vw,1rem)]'
                style={{ color: 'var(--text-primary)' }}
              >
                {(t('about.content') as string).split('\n').map((paragraph, i) => (
                  <p key={i} className='mb-[clamp(0.5rem,1.5vw,0.85rem)]'>
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
          transition={{ duration: 0.8, delay: 0 }}
          className='w-[clamp(14rem,35vw,22rem)] flex-shrink-0'
        >
          <div className='glass-card aspect-square rounded-3xl overflow-hidden border border-[var(--cyber-purple)]/30 hover:border-[var(--cyber-cyan)]/50 transition-all duration-500 shadow-2xl'>
            <img
              src={eu}
              alt='Leandro Saturnino Barbosa'
              className='w-full h-full object-cover'
              loading='eager'
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
