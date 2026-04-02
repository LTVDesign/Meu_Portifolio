import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

const Curriculo = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  console.log('[Curriculo] Renderizando componente Curriculo');
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Box de texto informativo com animação */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-16'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-8 md:p-12 shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
          {/* Efeito de brilho animado no fundo */}
          <div className='absolute inset-0 opacity-30'>
            <motion.div
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
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Header useMotion={true} p={t('curriculo.p')} h2={t('curriculo.h2')} />
            </motion.div>

            {/* Linha com animação discreta de brilho */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className='relative w-full max-w-xl mx-auto my-8'
            >
              <div className='h-[1px] bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent relative'>
                {/* Brilho esquerdo */}
                <motion.div
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
                <motion.div
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
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-6 text-[17px] leading-[30px] text-center max-w-3xl mx-auto'
            >
              {t('curriculo.content')}
            </motion.p>

            {/* Badges de destaque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='flex flex-wrap justify-center gap-4 mt-8'
            >
              {[
                { text: t('curriculo.badgeOnline'), color: 'from-cyan-500 to-blue-500' },
                { text: t('curriculo.badgePDF'), color: 'from-green-500 to-emerald-500' },
                { text: t('curriculo.badgeExperience'), color: 'from-purple-500 to-pink-500' },
                { text: t('curriculo.badgeSkills'), color: 'from-orange-500 to-red-500' },
              ].map((badge, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
                >
                  {badge.text}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Borda decorativa com glow */}
          <div className='absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none' />
          <div className='absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10' />
        </div>
      </motion.div>

      <div className='mt-12 flex flex-wrap items-center justify-center gap-6'>
        <motion.button
          variants={prefersReduced ? {} : fadeIn('right', 'spring', 0.3, 0.75)}
          onClick={() => setViewMode?.('allcurriculo')}
          className='btn-primary flex items-center gap-3 px-8 py-4 rounded-xl font-bold tracking-wider group shadow-[0_0_20px_rgba(145,94,255,0.3)]'
        >
          <FiExternalLink className='text-xl group-hover:scale-110 transition-transform' />
          {t('curriculo.viewOnline')}
        </motion.button>

        <motion.a
          variants={prefersReduced ? {} : fadeIn('left', 'spring', 0.4, 0.75)}
          href='/assets/curriculo.pdf'
          download
          className='glass-card flex items-center gap-3 px-8 py-4 rounded-xl font-bold tracking-wider group border border-white/10 hover:border-[var(--cyber-cyan)]/50 transition-all shadow-lg'
        >
          <FiDownload className='text-xl text-[var(--cyber-cyan)] group-hover:animate-bounce transition-transform' />
          <span className='text-white group-hover:text-[var(--cyber-cyan)] transition-colors'>
            {t('curriculo.downloadPDF')}
          </span>
        </motion.a>
      </div>
    </>
  );
};

export default SectionWrapper(Curriculo, 'curriculo');
