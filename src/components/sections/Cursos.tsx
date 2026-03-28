import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { LinkAnimado } from '../atoms';
import { Header } from '../atoms/Header';

const Cursos = ({ setViewMode }: { setViewMode: (mode: string) => void }) => {
  // Lista de arquivos de cursos (simplificada, você pode expandir com dados dinâmicos)
  const cursosFiles = [
    {
      name: 'Introdução ao Gerenciamento de Produtos de Software',
      path: '/cursos/gerenciamento de produtos de software/introducao ao gps 2.2.pdf',
    },
    {
      name: 'Software Processes and Agile Practices',
      path: '/cursos/gerenciamento de produtos de software/-Software-Processes-and-Agile-Practices---Course-Map.pdf',
    },
    {
      name: 'Agile Planning for Software Products',
      path: '/cursos/gerenciamento de produtos de software/Agile-Planning-for-Software-Products---Course-Map.pdf',
    },
    {
      name: 'Client Needs and Software Requirements',
      path: '/cursos/gerenciamento de produtos de software/Client-Needs-and-Software-Requirements---Course-Map.pdf',
    },
    {
      name: 'Reviews and Metrics for Software Improvements',
      path: '/cursos/gerenciamento de produtos de software/Reviews-and-Metrics-for-Software-Improvements---Course-Map.pdf',
    },
    {
      name: 'Software Product Management Capstone',
      path: '/cursos/gerenciamento de produtos de software/Software-Product-Management-Capstone---Course-Map.pdf',
    },
  ];

  return (
    <>
      <Header useMotion={true} {...config.sections.cursos} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-3 text-[17px] leading-[30px] text-center"
        >
          {config.sections.cursos.content}
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {cursosFiles.slice(0, 6).map((curso, index) => (
          <motion.div
            key={`curso-${index}`}
            variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
            className="bg-tertiary w-full rounded-2xl p-8 hover:scale-105 transition-transform shadow-card"
          >
            <div className="mt-5">
              <h3 className="text-[20px] font-bold text-[var(--dynamic-text-color)] sm:text-[24px] text-center">
                {curso.name}
              </h3>
              <div className="mt-4 flex w-full justify-center">
                <LinkAnimado
                  href={curso.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn mt-4 text-[14px] px-6 py-2 text-center font-medium rounded-full"
                >
                  Ver Diploma
                </LinkAnimado>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {cursosFiles.length >= 6 && setViewMode && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setViewMode('allcourses')}
            className="glass-btn px-6 py-3 rounded-lg font-bold tracking-wider"
          >
            Ver Todos
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Cursos, 'cursos');
