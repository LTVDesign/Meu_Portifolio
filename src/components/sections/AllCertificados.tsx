import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { LinkAnimado } from '../atoms';
import { Header } from '../atoms/Header';

const AllCertificados = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  // Lista completa de arquivos de certificados
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
    {
      name: 'Foundations of Cybersecurity',
      path: '/certificados/Foundations of Cybersecurity.pdf',
    },
    { name: 'Google My Business', path: '/certificados/Google My Business  Google.pdf' },
    {
      name: 'Creative Certification Exam - Google',
      path: '/certificados/Creative Certification Exam _ Google.pdf',
    },
    {
      name: 'Exame de certificação no Search Ads 360 - Google',
      path: '/certificados/Exame de certifica��o no Search Ads 360  Google.pdf',
    },
    {
      name: 'Waze Ads Fundamentals - Google',
      path: '/certificados/Waze Ads Fundamentals  Google certificado.pdf',
    },
    {
      name: 'Administração de Sistemas e Serviços de Infraestrutura de TI',
      path: '/certificados/Administra��o de Sistemas e Servi�os de Infraestrutura de TI.pdf',
    },
    {
      name: 'Estrutura e Funcionamento das Redes de Computadores',
      path: '/certificados/Estrutura e Funcionamento das Redes de computadores.pdf',
    },
    {
      name: 'Sistemas Operacionais e Você - Google',
      path: '/certificados/Sistemas Operacionais e Voc� - Google.pdf',
    },
    {
      name: 'Defesa Contra as Artes Obscuras',
      path: '/certificados/Defesa Contra as Artes Obscuras.pdf',
    },
    {
      name: 'Introdução ao Gerenciamento de Produtos - Alberta',
      path: '/certificados/Introdu��o ao Gerenciamento de produtos  ALBERTA.pdf',
    },
    {
      name: 'Fundamentos de TI - Fundação Bradesco',
      path: '/certificados/fundamentos de ti - Funda��o Bradesco.pdf',
    },
    {
      name: 'Administrando Banco de Dados - Fundação Bradesco',
      path: '/certificados/Administrando Banco de Dados - Funda��o Bradesco.pdf',
    },
    {
      name: 'Implementando Banco de Dados - Fundação Bradesco',
      path: '/certificados/Implementando Banco de Dados - Funda��o Bradesco.pdf',
    },
    {
      name: 'Segurança em Tecnologia da Informação - Fundação Bradesco',
      path: '/certificados/Seguran�a em Tecnologia da Informa��o - Funda��o Bradesco.pdf',
    },
    {
      name: 'Atendimento ao Cliente - IPED',
      path: '/certificados/Atendimento ao cliente IPED.pdf',
    },
    {
      name: 'Satisfação de Clientes - IPED',
      path: '/certificados/Satista��o de clientes IPED.pdf',
    },
    { name: 'Ética, Política e Cidadania', path: '/certificados/etica politica e cidadania.pdf' },
    {
      name: 'Boas Práticas de Manipulação de Alimentos',
      path: '/certificados/Boas Pr�ticas de Manipula��o de Alimentos.pdf',
    },
    { name: 'Certificado - Nivelamento', path: '/certificados/Certificado - Nivelamento.pdf' },
  ];

  return (
    <>
      <Header useMotion={true} {...config.sections.certificados} />

      <div className="flex w-full justify-between items-center">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-3 text-[17px] leading-[30px]"
        >
          {config.sections.certificados.content}
        </motion.p>
        <button
          type="button"
          onClick={() => setViewMode?.('default')}
          className="bg-primary text-[var(--dynamic-text-color)] px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors mt-3"
        >
          Voltar
        </button>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {certificadosFiles.map((certificado, index) => (
          <motion.div
            key={`certificado-${index}`}
            variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
            className="bg-tertiary w-full rounded-2xl p-8 hover:scale-105 transition-transform shadow-card"
          >
            <div className="mt-5">
              <h3 className="text-[16px] font-bold text-[var(--dynamic-text-color)] sm:text-[18px]">
                {certificado.name}
              </h3>
              <div className="mt-4 flex w-full justify-center">
                <LinkAnimado
                  href={certificado.path}
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
    </>
  );
};

export default SectionWrapper(AllCertificados, 'allcertificados');
