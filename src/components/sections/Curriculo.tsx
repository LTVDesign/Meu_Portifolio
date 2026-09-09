import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import { cvPdf } from '../../assets';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

const Curriculo = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Box de texto informativo com animação */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-[clamp(2.5rem,8vw,4rem)]'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-[clamp(1.25rem,4vw,3rem)] shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
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
              <Header useMotion={true} p={t('curriculo.p')} h2={t('curriculo.h2')} />
            </m.div>

            {/* Linha com animação discreta de brilho */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className='relative w-full max-w-xl mx-auto my-[clamp(1.5rem,5vw,2rem)]'
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

            <m.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='text-white transition-colors composited-hover duration-500 mt-[clamp(1rem,3vw,1.5rem)] text-[clamp(0.875rem,2vw,1.0625rem)] leading-relaxed text-center max-w-3xl mx-auto'
              style={{
                textShadow:
                  '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(145, 94, 255, 0.3)',
              }}
            >
              {t('curriculo.content')}
            </m.p>

            {/* Badges de destaque */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='flex flex-wrap justify-center gap-[clamp(0.5rem,1.5vw,1rem)] mt-[clamp(1.5rem,3vw,2rem)]'
            >
              {[
                { text: t('curriculo.badgeOnline'), color: 'from-cyan-500 to-blue-500' },
                { text: t('curriculo.badgePDF'), color: 'from-green-500 to-emerald-500' },
                {
                  text: t('curriculo.badgeExperience'),
                  color: 'from-purple-500 to-pink-500',
                },
                { text: t('curriculo.badgeSkills'), color: 'from-orange-500 to-red-500' },
              ].map((badge, idx) => (
                <m.span
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)] rounded-full text-[clamp(0.625rem,1.5vw,0.75rem)] font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
                >
                  {badge.text}
                </m.span>
              ))}
            </m.div>

            {/* Botões de ação dentro do card */}
            <div className='mt-[clamp(1.5rem,4vw,2.5rem)] flex flex-row flex-wrap items-center justify-center gap-[clamp(0.5rem,1.5vw,1rem)]'>
              <m.a
                variants={prefersReduced ? {} : fadeIn('up', 'spring', 0.6, 0.75)}
                href='/online-cv'
                target='_blank'
                rel='noopener noreferrer'
                className='btn-primary flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] px-[clamp(1.25rem,3vw,1.75rem)] py-[clamp(0.6rem,1.5vw,0.85rem)] rounded-xl font-bold tracking-wider group shadow-[0_0_20px_rgba(145,94,255,0.3)] min-h-[44px] text-[clamp(0.8rem,1.8vw,0.95rem)] cursor-pointer'
              >
                <FiExternalLink className='text-xl group-hover:scale-110 transition-transform' />
                {t('curriculo.viewOnline')}
              </m.a>

              <m.a
                variants={prefersReduced ? {} : fadeIn('up', 'spring', 0.7, 0.75)}
                href={cvPdf}
                download='Leandro_Barbosa_curriculo.pdf'
                className='btn-secondary flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] px-[clamp(1.25rem,3vw,1.75rem)] py-[clamp(0.6rem,1.5vw,0.85rem)] rounded-xl font-bold tracking-wider group border border-white/10 hover:border-[var(--cyber-cyan)]/50 transition-all shadow-lg min-h-[44px] text-[clamp(0.8rem,1.8vw,0.95rem)]'
              >
                <FiDownload className='text-xl text-[var(--cyber-cyan)] group-hover:animate-bounce transition-transform' />
                <span className='text-white group-hover:text-[var(--cyber-cyan)] transition-colors'>
                  {t('curriculo.downloadPDF')}
                </span>
              </m.a>
            </div>
          </div>

          {/* Borda decorativa com glow */}
          <div className='absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none' />
          <div className='absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10' />
        </div>
      </m.div>
    </>
  );
};

export default SectionWrapper(Curriculo, 'curriculo');
