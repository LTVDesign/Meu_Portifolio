import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import type { Certificado } from '../../types';
import { fadeIn } from '../../utils/motion';
import { LinkAnimado } from '../atoms';
import { Header } from '../atoms/Header';

const Certificados = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  // Lista de arquivos de certificados organizados por categoria
  const certificadosFiles: Certificado[] = [
    // Gerenciamento de Produtos - University of Alberta
    {
      name: 'Especialização em Gerenciamento de Produtos de Software',
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: 'University of Alberta',
      description:
        'Programa completo de especialização em gerenciamento de produtos de software',
    },
    {
      name: 'Introdução ao Gerenciamento de Produtos de Software',
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: 'University of Alberta',
      description:
        'Apresenta o papel do gerente de produto, focando em fornecer o produto certo, feito corretamente e gerenciado de forma eficaz, utilizando os valores do Manifesto Ágil.',
    },
    {
      name: 'Software Processes and Agile Practices',
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: 'University of Alberta',
      description:
        'Explora modelos de processo como Waterfall, V-Model, Spiral e práticas ágeis como Scrum (sprints, backlog) e Extreme Programming (XP).',
    },
    {
      name: 'Client Needs and Software Requirements',
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: 'University of Alberta',
      description:
        'Ensina técnicas para elicitar requisitos, criar User Stories, protótipos (wireframes e storyboards) e gerenciar o backlog do produto.',
    },
    {
      name: 'Agile Planning for Software Products',
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: 'University of Alberta',
      description:
        'Cobre estimativas de tempo (Story Points), cálculo de velocidade da equipe, gerenciamento de riscos, cronogramas (Gantt) e planejamento de iterações e releases.',
    },
    {
      name: 'Reviews and Metrics for Software Improvements',
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: 'University of Alberta',
      description:
        'Foca no monitoramento de progresso através de gráficos de Burndown, métricas de qualidade (GQM), análise de defeitos e reuniões de retrospectiva.',
    },
    {
      name: 'Software Product Management Capstone',
      path: '/certificados/Introdução ao Gerenciamento de produtos  ALBERTA.pdf',
      institution: 'University of Alberta',
      description:
        'Simulação prática de gerenciamento onde o aluno aplica todas as técnicas anteriores (requisitos, priorização, planos de release e retrospectivas) em um cenário real.',
    },

    // Certificações Google - Suporte em TI
    {
      name: 'Certificado Profissional de Suporte em TI do Google',
      path: '/certificados/CertificadoProfissionaldeSuporteemTIdoGoogle_Badge20230225-28-1iiyqbg.pdf',
      institution: 'Google (via Coursera/Credly)',
      description: 'Certificação profissional completa em suporte técnico de TI',
    },
    {
      name: 'Suporte em TI do Google',
      path: '/certificados/Suporte em TI do Google.pdf',
      institution: 'Google (via Coursera)',
      description:
        'Introdução ao mundo da computação, cobrindo hardware, software, redes e atendimento ao cliente.',
    },
    {
      name: 'Technical Support Basics',
      path: '/certificados/TechnicalSupportBasics_Badge20230225-28-ldlr1j.pdf',
      institution: 'Google (via Coursera/Credly)',
      description: 'Os Aspectos Básicos do Suporte Técnico',
    },
    {
      name: 'Estrutura e Funcionamento das Redes de Computadores',
      path: '/certificados/Estrutura e Funcionamento das Redes de computadores.pdf',
      institution: 'Google (via Coursera)',
      description:
        'Mergulho profundo em protocolos de rede (TCP/IP), serviços como DNS e DHCP, e ferramentas de solução de problemas de conectividade.',
    },
    {
      name: 'Sistemas Operacionais e Você: Tornando-se um Usuário de Poder',
      path: '/certificados/Sistemas Operacionais e Você - Google.pdf',
      institution: 'Google (via Coursera)',
      description:
        'Gerenciamento de diretórios, usuários, permissões e processos nos sistemas Windows e Linux.',
    },
    {
      name: 'Administração de Sistemas e Serviços de Infraestrutura de TI',
      path: '/certificados/Administração de Sistemas e Serviços de Infraestrutura de TI.pdf',
      institution: 'Google (via Coursera)',
      description:
        'Focado em serviços de infraestrutura como Active Directory, gerenciamento de frotas e backup de dados.',
    },
    {
      name: 'Segurança de TI: Defesa Contra as Artes Obscuras do Mundo Digital',
      path: '/certificados/Defesa Contra as Artes Obscuras.pdf',
      institution: 'Google (via Coursera)',
      description:
        'Cobre conceitos de criptografia, autenticação, tipos de ataques e como proteger redes e sistemas.',
    },

    // Certificações IBM
    {
      name: 'Introduction to Technical Support',
      path: '/certificados/Introduction to Technical Support IBM.pdf',
      institution: 'IBM (via Coursera)',
      description:
        'Aborda as habilidades essenciais para fornecer suporte técnico eficaz, incluindo metodologias de resolução de problemas e comunicação.',
    },
    {
      name: 'Introduction to Scrum Master Profession',
      path: '/certificados/Introduction to Scrum Master Profession.pdf',
      institution: 'IBM (via Coursera)',
      description:
        'Explora a mentalidade ágil e o papel específico do Scrum Master na facilitação de equipes de alto desempenho.',
    },

    // Desenvolvimento Web
    {
      name: 'HTML, CSS, and Javascript for Web Developers',
      path: '/certificados/HTML, CSS, and Javascript for Web Developers.pdf',
      institution: 'Johns Hopkins University (via Coursera)',
      description:
        'Ensina o desenvolvimento de páginas web modernas e responsivas utilizando as tecnologias fundamentais do front-end.',
    },

    // Cibersegurança
    {
      name: 'Foundations of Cybersecurity',
      path: '/certificados/Foundations of Cybersecurity.pdf',
      institution: 'Google (via Coursera)',
      description:
        'Base fundamental sobre ameaças, riscos e as principais ferramentas utilizadas por profissionais de segurança digital.',
    },
    {
      name: 'Nivelamento (Cibersegurança)',
      path: '/certificados/Certificado - Nivelamento.pdf',
      institution: 'Hackers do Bem (SENAI/RNP)',
      description:
        'Introdução técnica à área de segurança da informação para nivelamento em programas avançados.',
    },

    // Banco de Dados - Fundação Bradesco
    {
      name: 'Fundamentos de TI',
      path: '/certificados/fundamentos de ti - Fundação Bradesco.pdf',
      institution: 'Fundação Bradesco',
      description:
        'Conceitos essenciais de arquitetura de computadores, hardware e lógica de funcionamento.',
    },
    {
      name: 'Implementando Banco de Dados',
      path: '/certificados/Implementando Banco de Dados - Fundação Bradesco.pdf',
      institution: 'Fundação Bradesco',
      description:
        'Focado na criação física de bancos de dados, utilizando linguagens de consulta e estruturação.',
    },
    {
      name: 'Administrando Banco de Dados',
      path: '/certificados/Administrando Banco de Dados - Fundação Bradesco.pdf',
      institution: 'Fundação Bradesco',
      description:
        'Gerenciamento de segurança, usuários, integridade e manutenção de sistemas de banco de dados.',
    },
    {
      name: 'Segurança em Tecnologia da Informação',
      path: '/certificados/Segurança em Tecnologia da Informação - Fundação Bradesco.pdf',
      institution: 'Fundação Bradesco',
      description:
        'Princípios de segurança de dados, políticas de segurança e defesa de perímetros.',
    },

    // Marketing Digital - Google
    {
      name: 'Exame de Certificação no Search Ads 360',
      path: '/certificados/Exame de certificação no Search Ads 360  Google.pdf',
      institution: 'Google Skillshop',
      description:
        'Certificação avançada para gerenciar e otimizar campanhas de anúncios em larga escala.',
    },
    {
      name: 'Waze Ads Fundamentals',
      path: '/certificados/Waze Ads Fundamentals  Google certificado.pdf',
      institution: 'Google Skillshop',
      description:
        'Fundamentos para criação de publicidade voltada a motoristas em tempo real.',
    },
    {
      name: 'Google My Business (Perfil da Empresa)',
      path: '/certificados/Google My Business  Google.pdf',
      institution: 'Google Skillshop',
      description:
        'Ferramentas para otimizar a presença de negócios locais no Google Maps e na busca.',
    },
    {
      name: 'Creative Certification Exam',
      path: '/certificados/Creative Certification Exam _ Google.pdf',
      institution: 'Google Skillshop',
      description:
        'Teste de conhecimento sobre o desenvolvimento de criativos publicitários eficazes para plataformas Google.',
    },

    // Atendimento e Ética - IPED
    {
      name: 'Satisfação de Clientes',
      path: '/certificados/Satisfação de clientes IPED.pdf',
      institution: 'IPED',
      description:
        'Métodos para medir e melhorar o índice de contentamento dos clientes com produtos e serviços.',
    },
    {
      name: 'Atendimento ao Cliente',
      path: '/certificados/Atendimento ao cliente IPED.pdf',
      institution: 'IPED',
      description:
        'Técnicas de abordagem, postura profissional e resolução ágil de problemas durante o suporte.',
    },
    {
      name: 'Ética, Política e Cidadania',
      path: '/certificados/etica politica e cidadania.pdf',
      institution: 'IPED',
      description:
        'Estudo da conduta ética no ambiente de trabalho e o papel social do profissional.',
    },
    {
      name: 'Boas Práticas de Manipulação de Alimentos',
      path: '/certificados/Boas Práticas de Manipulação de Alimentos.pdf',
      institution: 'IPED',
      description:
        'Normas de higiene e segurança alimentar para processos de produção e manuseio.',
    },
  ];

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
              <Header useMotion={true} {...config.sections.certificados} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-6 text-[17px] leading-[30px] text-center'
            >
              {config.sections.certificados.content}
            </motion.p>

            {/* Badges de destaque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className='flex flex-wrap justify-center gap-3 mt-8'
            >
              {[
                { text: 'Google', color: 'from-blue-500 to-cyan-500' },
                { text: 'IBM', color: 'from-indigo-500 to-blue-500' },
                { text: 'University of Alberta', color: 'from-purple-500 to-pink-500' },
                { text: 'Hackers do Bem', color: 'from-red-500 to-orange-500' },
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

      <div className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center'>
        {certificadosFiles.slice(0, 6).map((certificado, index) => (
          <motion.div
            key={`certificado-${index}`}
            variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
            className='bg-tertiary w-full rounded-2xl p-8 hover:scale-105 transition-transform shadow-card'
          >
            <div className='mt-5'>
              <h3 className='text-[16px] font-bold text-[var(--dynamic-text-color)] sm:text-[18px] text-center'>
                {certificado.name}
              </h3>
              {certificado.institution && (
                <p className='text-[var(--dynamic-text-secondary)] text-[13px] text-center mt-2'>
                  {certificado.institution}
                </p>
              )}
              {certificado.description && (
                <p className='text-[var(--dynamic-text-secondary)] text-[12px] text-center mt-2 leading-relaxed'>
                  {certificado.description}
                </p>
              )}
              <div className='mt-4 flex w-full justify-center'>
                <LinkAnimado
                  href={certificado.path}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='glass-btn mt-4 text-[14px] px-6 py-2 text-center font-medium rounded-full'
                >
                  Ver Certificado
                </LinkAnimado>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {certificadosFiles.length > 6 && (
        <div className='mt-10 flex justify-center'>
          <button
            type='button'
            onClick={() => setViewMode?.('allcertificados')}
            className='glass-btn px-6 py-3 rounded-lg font-bold tracking-wider'
          >
            Ver Todos
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Certificados, 'certificados');
