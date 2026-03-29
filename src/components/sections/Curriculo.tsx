import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

const Curriculo = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  return (
    <>
      <Header useMotion={true} {...config.sections.curriculo} />

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-4 text-[17px] leading-[30px] text-center"
      >
        {config.sections.curriculo.content}
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
          Ver Currículo completo
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Curriculo, 'curriculo');
