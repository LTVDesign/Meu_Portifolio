import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';
import { FiDownload, FiExternalLink } from 'react-icons/fi';

const Curriculo = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  const { t } = useTranslation();

  return (
    <>
      <Header useMotion={true} p={t('curriculo.p')} h2={t('curriculo.h2')} />

      <motion.p
        variants={fadeIn('up', 'tween', 0.1, 1)}
        className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-4 text-[17px] leading-[30px] text-center max-w-3xl mx-auto"
      >
        {t('curriculo.content')}
      </motion.p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
        <motion.button
          variants={fadeIn('right', 'spring', 0.3, 0.75)}
          onClick={() => setViewMode?.('allcurriculo')}
          className="btn-primary flex items-center gap-3 px-8 py-4 rounded-xl font-bold tracking-wider group shadow-[0_0_20px_rgba(145,94,255,0.3)]"
        >
          <FiExternalLink className="text-xl group-hover:scale-110 transition-transform" />
          {t('curriculo.viewOnline')}
        </motion.button>

        <motion.a
          variants={fadeIn('left', 'spring', 0.4, 0.75)}
          href="/assets/curriculo.pdf"
          download
          className="glass-card flex items-center gap-3 px-8 py-4 rounded-xl font-bold tracking-wider group border border-white/10 hover:border-[var(--cyber-cyan)]/50 transition-all shadow-lg"
        >
          <FiDownload className="text-xl text-[var(--cyber-cyan)] group-hover:animate-bounce transition-transform" />
          <span className="text-white group-hover:text-[var(--cyber-cyan)] transition-colors">
            {t('curriculo.downloadPDF')}
          </span>
        </motion.a>
      </div>
    </>
  );
};

export default SectionWrapper(Curriculo, 'curriculo');
