import { motion } from 'framer-motion';
import { useState } from 'react';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { Header } from '../atoms';
import CursosModal from '../atoms/CursosModal';
import albertaImg from '../../logos/alberta.png';
import googleImg from '../../logos/google.png';
import ibmImg from '../../logos/ibm.png';
import hackersImg from '../../logos/hackers.png';
import johnsImg from '../../logos/johns.png';
import bradescoImg from '../../logos/bradesco.png';
import cateImg from '../../logos/cate.png';

const Cursos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredCursos = [
    {
      id: '1',
      title: 'Software Product Management Capstone',
      platform: 'University of Alberta',
      date: '2023',
      duration: '6 semanas',
      icon: albertaImg,
      description: 'Este curso final consolida toda a especialização em gerenciamento de produtos através de uma simulação real de seis semanas. O foco é aplicar práticas ágeis para resolver desafios da indústria, interagindo com clientes para discernir necessidades reais e transformá-las em requisitos de software claros. É a prova de que você consegue liderar o ciclo de vida completo de um produto, desde a concepção até a entrega de valor.',
      link: '#'
    },
    {
      id: '2',
      title: 'Certificado Profissional de Suporte em TI do Google',
      platform: 'Google (via Coursera)',
      date: '2023',
      duration: 'Completo',
      icon: googleImg,
      description: 'Uma certificação de peso que atesta domínio completo sobre a infraestrutura de TI moderna. O programa engloba desde a montagem de hardware e redes (TCP/IP e protocolos) até a administração avançada de sistemas (Windows/Linux), serviços de diretório e segurança de rede. Representa a base sólida necessária para qualquer desenvolvedor ou analista entender como o código se comporta no "mundo real" da infraestrutura.',
      link: '#'
    },
    {
      id: '3',
      title: 'Foundations of Cybersecurity',
      platform: 'Google (via Coursera)',
      date: '2023',
      duration: 'Curso',
      icon: googleImg,
      description: 'Essencial para o seu interesse em pentesting, este curso explora os pilares da segurança: confidencialidade, integridade e disponibilidade. Cobre a análise de riscos em ambientes corporativos, o papel da conformidade e as ferramentas de defesa utilizadas para proteger ativos digitais contra ameaças modernas. Mostra que você constrói sistemas com a segurança em mente desde o primeiro dia.',
      link: '#'
    },
    {
      id: '4',
      title: 'HTML, CSS, and Javascript for Web Developers',
      platform: 'Johns Hopkins University (via Coursera)',
      date: '2023',
      duration: 'Curso',
      icon: johnsImg,
      description: 'Focado no desenvolvimento front-end moderno, este curso ensina a criar aplicações web dinâmicas e responsivas. Abrange desde a estrutura semântica do HTML5 e design com CSS até a lógica de programação client-side com JavaScript e integração de dados via AJAX. É a prova técnica da sua capacidade de transformar designs em interfaces funcionais e interativas.',
      link: '#'
    },
    {
      id: '5',
      title: 'Introduction to Scrum Master Profession',
      platform: 'IBM (via Coursera)',
      date: '2023',
      duration: 'Curso',
      icon: ibmImg,
      description: 'Este curso posiciona você como um facilitador de equipes de alto desempenho. Aborda o ciclo de vida de desenvolvimento de software (SDLC) sob a ótica de metodologias ágeis e DevOps, focando nas cerimônias do Scrum para garantir entrega contínua e melhoria de processos. Demonstra que você possui a "soft skill" de liderança técnica necessária para o mercado atual.',
      link: '#'
    },
    {
      id: '6',
      title: 'Implementando Banco de Dados',
      platform: 'Fundação Bradesco',
      date: '2023',
      duration: 'Curso',
      icon: bradescoImg,
      description: 'Crucial para sua pós em Data Science, este curso foca na criação física e estruturação de bancos de dados relacionais. Cobre desde a modelagem conceitual e lógica até a implementação prática utilizando SQL Server, ensinando a manipular volumes de dados com eficiência e integridade. É a base técnica para qualquer trabalho sério com análise de dados e inteligência artificial.',
      link: '#'
    },
    {
      id: '7',
      title: 'Especialização em Gerenciamento de Produtos de Software',
      platform: 'University of Alberta',
      date: '2023',
      duration: 'Especialização',
      icon: albertaImg,
      description: 'Esta especialização estabelece a base para o gerenciamento de produtos de software (GPS), diferenciando-o do gerenciamento de projetos tradicional. Foca em três pilares para o sucesso: fornecer o produto certo (validação), feito corretamente (verificação) e gerenciado adequadamente (processos). Aborda a filosofia Ágil e o Manifesto Ágil como ferramentas para lidar com a mudança e as expectativas dos clientes.',
      link: '#'
    },
    {
      id: '8',
      title: 'Software Processes and Agile Practices',
      platform: 'University of Alberta',
      date: '2023',
      duration: 'Curso',
      icon: albertaImg,
      description: 'O curso aprofunda-se em modelos de processos de software, desde os tradicionais e lineares, como o Modelo em Cascata (Waterfall) e o V-Model, até modelos iterativos como o Espiral e o Processo Unificado. Explora as bases das práticas Ágeis modernas, com foco especial em Extreme Programming (XP) e Scrum (incluindo pilares, papéis como Product Owner e Scrum Master, e eventos como Sprints e Backlog).',
      link: '#'
    },
    {
      id: '9',
      title: 'Client Needs and Software Requirements',
      platform: 'University of Alberta',
      date: '2023',
      duration: 'Curso',
      icon: albertaImg,
      description: 'Focado nas técnicas práticas para elicitar, analisar e expressar requisitos de software a partir da interação com o cliente. Ensina a transformar necessidades em User Stories eficazes, Backlogs de produto e critérios de aceitação. O aluno aprende a visualizar as necessidades do cliente através de protótipos de baixa fidelidade, como Wireframes, Storyboards e Use Cases.',
      link: '#'
    },
    {
      id: '10',
      title: 'Agile Planning for Software Products',
      platform: 'University of Alberta',
      date: '2023',
      duration: 'Curso',
      icon: albertaImg,
      description: 'Este curso ensina a decompor e mapear requisitos em planos de produção eficazes. Cobre técnicas de estimativa de esforço (como Story Points e o Cone da Incerteza), planejamento de iterações (sprints) e de releases. O aluno aprende a gerenciar riscos do projeto, aplicar técnicas de planejamento baseadas na velocidade da equipe e utilizar ferramentas de visualização como Gráficos de Gantt, PERT e o Método do Caminho Crítico (CPM).',
      link: '#'
    },
    {
      id: '11',
      title: 'Reviews and Metrics for Software Improvements',
      platform: 'University of Alberta',
      date: '2023',
      duration: 'Curso',
      icon: albertaImg,
      description: 'O curso foca no monitoramento e melhoria contínua de projetos de software através de métricas e revisões. Ensina a utilizar Gráficos de Burndown (Iteration e Release) para visualizar o progresso real versus planejado e técnicas de medição de velocidade. Aborda a metodologia GQM (Goal, Quality, Metric) para definir o que medir, análise de defeitos e realização de reuniões de retrospectiva eficazes.',
      link: '#'
    },
    {
      id: '12',
      title: 'Nivelamento em Cibersegurança',
      platform: 'Hackers do Bem (SENAI/RNP)',
      date: '2023',
      duration: '80h',
      icon: hackersImg,
      description: 'Curso de 80 horas que cobre os fundamentos necessários para a trilha de segurança ofensiva e defensiva. Inclui hardware de computador, redes TCP/IP (camadas, IPs, IPv6), sistemas operacionais Windows e Linux e lógica de programação aplicada à segurança.',
      link: '#'
    },
    {
      id: '13',
      title: 'Introduction to Technical Support',
      platform: 'IBM (via Coursera)',
      date: '2023',
      duration: 'Curso',
      icon: ibmImg,
      description: 'Explora o ecossistema de suporte técnico de TI, canais de suporte, ferramentas de acesso remoto e os diferentes níveis de atendimento (Tiers). Aborda o uso de Acordos de Nível de Serviço (SLAs), matrizes de escalonamento e tendências emergentes como o uso de IA no atendimento técnico.',
      link: '#'
    },
    {
      id: '14',
      title: 'Fundamentos de TI: Hardware e Software',
      platform: 'Fundação Bradesco',
      date: '2023',
      duration: 'Curso',
      icon: bradescoImg,
      description: 'Apresenta a evolução da computação, os componentes internos e externos do computador e as funções de armazenamento e processamento. Cobre a distinção entre hardware e software e noções básicas de prevenção e segurança digital.',
      link: '#'
    },
    {
      id: '15',
      title: 'Implementando Banco de Dados',
      platform: 'Fundação Bradesco',
      date: '2023',
      duration: 'Curso',
      icon: bradescoImg,
      description: 'Curso de nível intermediário que ensina a projetar, configurar e implementar bancos de dados relacionais utilizando o SQL Server. Aborda técnicas de modelagem de dados nos níveis conceitual, lógico e físico.',
      link: '#'
    },
    {
      id: '16',
      title: 'Administrando Banco de Dados',
      platform: 'Fundação Bradesco',
      date: '2023',
      duration: 'Curso',
      icon: bradescoImg,
      description: 'Focado na gestão avançada de SGBDs. Cobre a arquitetura de sistemas de banco de dados, manutenção de sistemas de dados, procedimentos administrativos, gerenciamento de instâncias e tabelas.',
      link: '#'
    },
    {
      id: '17',
      title: 'Segurança em Tecnologia da Informação',
      platform: 'Fundação Bradesco',
      date: '2023',
      duration: 'Curso',
      icon: bradescoImg,
      description: 'Aborda as vulnerabilidades do mundo digital, segurança em redes e controle de acesso lógico. Ensina boas práticas para combater ataques virtuais, engenharia social e a implementação de políticas de segurança da informação.',
      link: '#'
    },
    {
      id: '18',
      title: 'Exame de Certificação no Search Ads 360',
      platform: 'Google Skillshop',
      date: '2023',
      duration: 'Certificação',
      icon: googleImg,
      description: 'Certificação técnica para profissionais que gerenciam grandes campanhas de busca. Foca no uso da plataforma para automação, análise de dados de conversão cruzada e otimização de lances em tempo real para maximizar o ROI.',
      link: '#'
    },
    {
      id: '19',
      title: 'Google My Business (Perfil da Empresa)',
      platform: 'Google Skillshop',
      date: '2023',
      duration: 'Curso',
      icon: googleImg,
      description: 'Ensina a criar e otimizar a presença digital de empresas locais nas buscas e mapas do Google. Cobre gerenciamento de avaliações, publicação de atualizações e análise de insights de engajamento do cliente.',
      link: '#'
    },
    {
      id: '20',
      title: 'Waze Ads Fundamentals',
      platform: 'Google Skillshop',
      date: '2023',
      duration: 'Curso',
      icon: googleImg,
      description: 'Treinamento focado em publicidade geolocalizada. Ensina a criar anúncios que conectam marcas a motoristas em trânsito, utilizando pins no mapa, buscas patrocinadas e banners para aumentar o fluxo de clientes para locais físicos.',
      link: '#'
    },
    {
      id: '21',
      title: 'Satisfação de Clientes e Atendimento ao Cliente',
      platform: 'IPED',
      date: '2023',
      duration: 'Curso',
      icon: cateImg,
      description: 'Cursos focados na excelência do serviço. Abordam técnicas de comunicação verbal e não verbal, gestão de conflitos, fidelização de clientes e o uso de métricas para avaliar a qualidade do suporte prestado.',
      link: '#'
    },
    {
      id: '22',
      title: 'Ética, Política e Cidadania',
      platform: 'IPED',
      date: '2023',
      duration: 'Curso',
      icon: cateImg,
      description: 'Analisa a importância da conduta ética no ambiente corporativo, a responsabilidade social do profissional de tecnologia e as relações entre cidadania e participação política.',
      link: '#'
    },
    {
      id: '23',
      title: 'Boas Práticas de Manipulação de Alimentos',
      platform: 'IPED',
      date: '2023',
      duration: 'Curso',
      icon: cateImg,
      description: 'Normas de higiene e procedimentos técnicos para garantir a segurança alimentar, cobrindo desde o armazenamento até o manuseio correto para evitar contaminações.',
      link: '#'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 font-primary">
      <motion.div variants={textVariant()} className="text-center mb-16">
        <Header useMotion={true} {...config.sections.cursos} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {featuredCursos.map((curso, index) => (
          <motion.div
            key={index}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="glass-card p-10 group neon-hover flex flex-col h-full border border-white/10"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/5 transition-transform group-hover:scale-110 overflow-hidden p-2">
                <img src={curso.icon} alt={curso.platform} className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white group-hover:text-[var(--cyber-cyan)] transition-colors leading-tight">
                  {curso.title}
                </h3>
                <p className="text-xs text-[var(--cyber-purple)] font-black uppercase tracking-widest mt-2">{curso.platform}</p>
              </div>
            </div>

            <p className="text-[var(--text-secondary)] text-sm flex-1 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
              {curso.description}
            </p>

            <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-white/40 tracking-tighter">[{curso.date}] • {curso.duration}</span>
              <a
                href={curso.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cyber-cyan)] hover:text-white font-bold tracking-widest transition-all flex items-center gap-2 group/btn"
              >
                DETALHES <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-xs px-16 py-5 uppercase tracking-[0.4em] font-black group shadow-[0_0_25px_rgba(145,94,255,0.3)]"
        >
          Veja Todos Cursos
          <span className="group-hover:translate-x-2 transition-transform ml-2">→</span>
        </button>
      </div>

      {/* Modal de Todos os Cursos */}
      <CursosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cursos={featuredCursos}
      />
    </div>
  );
};

export default SectionWrapper(Cursos, 'cursos');