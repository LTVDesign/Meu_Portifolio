import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { LinkAnimado } from '../atoms';
import { Header } from '../atoms/Header';
import { useTranslation } from 'react-i18next';

const AllCourses = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  const { t } = useTranslation();
  // Lista completa de arquivos de cursos e certificados
  const cursosFiles = [
    // Especialização em Gerenciamento de Produtos de Software - University of Alberta
    {
      name: 'Introdução ao Gerenciamento de Produtos de Software',
      path: '/cursos/gerenciamento de produtos de software/introducao ao gps 2.2.pdf',
    },
    {
      name: 'Software Processes and Agile Practices',
      path: '/cursos/gerenciamento de produtos de software/-Software-Processes-and-Agile-Practices---Course-Map.pdf',
    },
    {
      name: 'Client Needs and Software Requirements',
      path: '/cursos/gerenciamento de produtos de software/Client-Needs-and-Software-Requirements---Course-Map.pdf',
    },
    {
      name: 'Agile Planning for Software Products',
      path: '/cursos/gerenciamento de produtos de software/Agile-Planning-for-Software-Products---Course-Map.pdf',
    },
    {
      name: 'Reviews and Metrics for Software Improvements',
      path: '/cursos/gerenciamento de produtos de software/Reviews-and-Metrics-for-Software-Improvements---Course-Map.pdf',
    },
    {
      name: 'Software Product Management Capstone',
      path: '/cursos/gerenciamento de produtos de software/Software-Product-Management-Capstone---Course-Map.pdf',
    },
    // Google IT Support
    {
      name: 'Certificado Profissional de Suporte em TI (Completo)',
      path: '/certificados/TechnicalSupportBasics_Badge20230225-28-ldlr1j.pdf',
    },
    {
      name: 'Os Aspectos Básicos do Suporte Técnico',
      path: '/certificados/TechnicalSupportBasics_Badge20230225-28-ldlr1j.pdf',
    },
    {
      name: 'Estrutura e Funcionamento das Redes de Computadores',
      path: '/certificados/Estrutura e Funcionamento das Redes de computadores.pdf',
    },
    {
      name: 'Sistemas Operacionais e Você: Tornando-se um Usuário de Poder',
      path: '/certificados/Sistemas Operacionais e Você - Google.pdf',
    },
    {
      name: 'Administração de Sistemas e Serviços de Infraestrutura de TI',
      path: '/certificados/Administração de Sistemas e Serviços de Infraestrutura de TI.pdf',
    },
    {
      name: 'Segurança de TI: Defesa Contra as Artes Obscuras do Mundo Digital',
      path: '/certificados/Defesa Contra as Artes Obscuras.pdf',
    },
    // Cybersecurity & Tech
    {
      name: 'Foundations of Cybersecurity',
      path: '/certificados/Foundations of Cybersecurity.pdf',
    },
    {
      name: 'Nivelamento (Cibersegurança)',
      path: '/certificados/Certificado - Nivelamento.pdf',
    },
    {
      name: 'Introduction to Technical Support (IBM)',
      path: '/certificados/Introduction to Technical Support IBM.pdf',
    },
    {
      name: 'Introduction to Scrum Master Profession (IBM)',
      path: '/certificados/Introduction to Scrum Master Profession.pdf',
    },
    {
      name: 'HTML, CSS, and Javascript for Web Developers',
      path: '/certificados/HTML, CSS, and Javascript for Web Developers.pdf',
    },
    // Fundação Bradesco
    {
      name: 'Fundamentos de TI: Hardware e Software',
      path: '/certificados/fundamentos de ti - Fundação Bradesco.pdf',
    },
    {
      name: 'Implementando Banco de Dados',
      path: '/certificados/Implementando Banco de Dados - Fundação Bradesco.pdf',
    },
    {
      name: 'Administrando Banco de Dados',
      path: '/certificados/Administrando Banco de Dados - Fundação Bradesco.pdf',
    },
    {
      name: 'Segurança em Tecnologia da Informação',
      path: '/certificados/Segurança em Tecnologia da Informação - Fundação Bradesco.pdf',
    },
    // Marketing & Skillshop
    {
      name: 'Exame de Certificação no Search Ads 360',
      path: '/certificados/Exame de certificação no Search Ads 360  Google.pdf',
    },
    {
      name: 'Google My Business (Perfil da Empresa)',
      path: '/certificados/Google My Business  Google.pdf',
    },
    {
      name: 'Waze Ads Fundamentals',
      path: '/certificados/Waze Ads Fundamentals  Google certificado.pdf',
    },
    // IPED
    {
      name: 'Satisfação de Clientes e Atendimento ao Cliente',
      path: '/certificados/Satistação de clientes IPED.pdf',
    },
    {
      name: 'Ética, Política e Cidadania',
      path: '/certificados/etica politica e cidadania.pdf',
    },
    {
      name: 'Boas Práticas de Manipulação de Alimentos',
      path: '/certificados/Boas Práticas de Manipulação de Alimentos.pdf',
    },
  ];

  return (
    <>
      <Header useMotion={true} {...config.sections.cursos} />

      <div className='flex w-full justify-between items-center'>
        <motion.p
          variants={fadeIn('up', 'tween', 0.1, 1)}
          className='text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-3 text-[17px] leading-[30px]'
        >
          {config.sections.cursos.content}
        </motion.p>
        <button
          type='button'
          onClick={() => setViewMode?.('default')}
          className='bg-primary text-[var(--dynamic-text-color)] px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors mt-3'
        >
          {t('allCourses.back')}
        </button>
      </div>

      <div className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center'>
        {cursosFiles.map((curso, index) => (
          <motion.div
            key={`curso-${index}`}
            variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
            className='bg-tertiary w-full rounded-2xl p-8 hover:scale-105 transition-transform shadow-card'
          >
            <div className='mt-5'>
              <h3 className='text-[20px] font-bold text-white sm:text-[24px]'>
                {curso.name}
              </h3>
              <div className='mt-4 flex w-full justify-center'>
                <LinkAnimado
                  href={curso.path}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='glass-btn mt-4 text-[14px] px-6 py-2 text-center font-medium rounded-full'
                >
                  {t('allCourses.viewDiploma')}
                </LinkAnimado>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(AllCourses, 'allcourses');
