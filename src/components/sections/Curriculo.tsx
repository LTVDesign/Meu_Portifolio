import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

const Curriculo = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  const { t } = useTranslation();

  return (
    <>
      <Header useMotion={true} p={t('curriculo.p')} h2={t('curriculo.h2')} />

      <motion.p
        variants={fadeIn('up', 'tween', 0.1, 1)}
        className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-4 text-[17px] leading-[30px] text-center"
      >
        {t('curriculo.content')}
      </motion.p>

      <div className="mt-8 flex flex-col items-center sm:items-start justify-center">
        {/* O conteúdo principal do currículo agora será visto na página 'Ver Todos'. Opcionalmente, pode-se colocar um card resumido aqui, mas deixaremos limpo para não duplicar Visão Geral. */}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setViewMode?.('allcurriculo')}
          className="glass-btn px-6 py-3 rounded-lg font-bold tracking-wider"
        >
          {t('curriculo.viewFull')}
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Curriculo, 'curriculo');
