import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { LinkAnimado } from '../atoms';
import { Header } from '../atoms/Header';

const Cursos = ({ setViewMode }: { setViewMode: (mode: string) => void }) => {
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

  const certificadosFiles = [
    { name: 'Suporte em TI do Google', path: '/certificados/Suporte em TI do Google.pdf' },
    {
      name: 'Technical Support Basics - Google',
      path: '/certificados/TechnicalSupportBasics_Badge20230225-28-ldlr1j.pdf',
    },
    {
      name: 'Certificado Profissional de Suporte em TI do Google',
      path: '/certificados/CertificadoProfissionaldeSuporteemTIdoGoogle_Badge20230225-28-1iiyqbg.pdf',
    },
    {
      name: 'Introduction to Technical Support - IBM',
      path: '/certificados/Introduction to Technical Support IBM.pdf',
    },
    {
      name: 'HTML, CSS, and Javascript for Web Developers',
      path: '/certificados/HTML, CSS, and Javascript for Web Developers.pdf',
    },
    {
      name: 'Introduction to Scrum Master Profession',
      path: '/certificados/Introduction to Scrum Master Profession.pdf',
    },
  ];

  return (
    <>
      <Header useMotion={true} {...config.sections.cursos} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-3 text-[17px] leading-[30px] text-center w-full"
        >
          {config.sections.cursos.content}
        </motion.p>
      </div>

      {/* Cursos Grid */}
      <div className="mt-16 text-center">
        <h3 className="text-[24px] font-bold text-white uppercase tracking-widest mb-10 opacity-50">
          Cursos de Especialização
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {cursosFiles.slice(0, 3).map((curso, index) => (
            <motion.div
              key={`curso-${index}`}
              variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
              className="bg-tertiary w-full rounded-2xl p-8 hover:scale-105 transition-transform shadow-card border border-white/5"
            >
              <div className="mt-5">
                <h3 className="text-[18px] font-bold text-[var(--dynamic-text-color)] sm:text-[20px] text-center min-h-[60px] flex items-center justify-center">
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
      </div>

      {/* Certificados Grid */}
      <div className="mt-32 text-center">
        <h3 className="text-[24px] font-bold text-white uppercase tracking-widest mb-10 opacity-50">
          Certificações Profissionais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {certificadosFiles.slice(0, 3).map((cert, index) => (
            <motion.div
              key={`cert-${index}`}
              variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
              className="bg-tertiary w-full rounded-2xl p-8 hover:scale-105 transition-transform shadow-card border border-white/5"
            >
              <div className="mt-5">
                <h3 className="text-[18px] font-bold text-[var(--dynamic-text-color)] sm:text-[20px] text-center min-h-[60px] flex items-center justify-center">
                  {cert.name}
                </h3>
                <div className="mt-4 flex w-full justify-center">
                  <LinkAnimado
                    href={cert.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-btn mt-4 text-[14px] px-6 py-2 text-center font-medium rounded-full"
                  >
                    Ver Certificado
                  </LinkAnimado>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button
          type="button"
          onClick={() => setViewMode('allcourses')}
          className="glass-btn px-8 py-4 rounded-xl font-bold tracking-wider text-sm uppercase hover:bg-white/10 transition-colors"
        >
          Explorar Todos os Cursos
        </button>
        <button
          type="button"
          onClick={() => setViewMode('allcertificados')}
          className="glass-btn px-8 py-4 rounded-xl font-bold tracking-wider text-sm uppercase hover:bg-white/10 transition-colors"
        >
          Explorar Todas Certificações
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Cursos, 'cursos');
