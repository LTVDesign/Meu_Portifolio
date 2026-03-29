import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

const AllCurriculo = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <Header useMotion={true} p={t('curriculo.p')} h2={t('curriculo.h2')} />

      <motion.p
        variants={fadeIn('up', 'tween', 0.1, 1)}
        className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-4 text-[17px] leading-[30px] text-center max-w-3xl"
      >
        {t('curriculo.content')}
      </motion.p>

      <div className="mt-12 flex flex-wrap gap-6 justify-center">
        <button
          type="button"
          onClick={() => setViewMode?.('default')}
          className="glass-btn px-8 py-3 rounded-xl font-bold tracking-wider hover:scale-105 transition-transform"
        >
          Voltar
        </button>

        <a
          href="/curriculo.pdf"
          download="Curriculo_Leandro_Saturnino.pdf"
          className="glass-btn px-8 py-3 rounded-xl font-bold tracking-wider bg-white/5 hover:bg-white/10 hover:scale-105 transition-all flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t('allCurriculo.downloadCV')}
        </a>
      </div>
    </div>
  );
};

export default SectionWrapper(AllCurriculo, 'allcurriculo');
