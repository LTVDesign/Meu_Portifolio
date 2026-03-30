import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { Header } from '../atoms';
import CursosModal from '../atoms/CursosModal';
import CursoDetailModal from '../atoms/CursoDetailModal';
import googleImg from '../../logos/google.webp';
import albertaImg from '../../logos/alberta.webp';

interface Curso {
  id: string;
  title: string;
  platform: string;
  date: string;
  duration: string;
  workload: string;
  icon: string;
  description: string;
  summary: string;
  modules: string[];
  verificationLink: string;
  isProfessionalCertificate?: boolean;
  link: string;
}

const Cursos = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  console.log('[Cursos] Renderizando componente Cursos, isHomePage:', isHomePage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const { t } = useTranslation();

  const allCursos: Curso[] = [
    {
      id: '1',
      title: 'Administração de Sistemas, Serviços e Infraestrutura de TI',
      platform: 'Google (via Coursera)',
      date: '2024',
      duration: 'Aproximadamente 6 meses',
      workload: 'Cerca de 120 horas',
      icon: googleImg,
      summary: 'Este curso aborda a administração de sistemas e serviços de infraestrutura de TI, cobrindo desde a instalação e configuração de sistemas operacionais até a gestão de serviços de rede e segurança. Aprenda a manter sistemas operacionais funcionando e a configurar serviços de rede essenciais.',
      description: 'Este curso ensina as habilidades fundamentais necessárias para administrar sistemas e serviços de infraestrutura de TI. Você aprenderá a instalar e configurar sistemas operacionais Windows e Linux, gerenciar serviços de rede como DNS e DHCP, implementar políticas de segurança, e realizar tarefas de manutenção e suporte. É uma base sólida para qualquer profissional de TI que trabalha com infraestrutura.',
      modules: [
        'Instalação e configuração de sistemas operacionais',
        'Gerenciamento de serviços de rede (DNS, DHCP)',
        'Administração de usuários e permissões',
        'Segurança de sistemas e redes',
        'Monitoramento e troubleshooting',
        'Automação de tarefas administrativas'
      ],
      verificationLink: 'https://www.coursera.org/account/accomplishments/verify/XQUDR4SCZEYA',
      link: 'https://www.coursera.org/learn/administracao-de-sistemas-servicos-infraestrutura-ti'
    },
    {
      id: '2',
      title: 'Fundamentos do Suporte Técnico',
      platform: 'Google (via Coursera)',
      date: '2024',
      duration: 'Aproximadamente 6 meses',
      workload: 'Cerca de 120 horas',
      icon: googleImg,
      summary: 'Certificado Profissional que cobre os fundamentos do suporte técnico, incluindo hardware, redes, sistemas operacionais, segurança e atendimento ao cliente. Uma base completa para atuação como técnico de suporte N1/N2.',
      description: 'Este certificado profissional fornece uma base abrangente para uma carreira em suporte técnico de TI. Abrange desde os conceitos básicos de hardware e software até tópicos avançados como redes, sistemas operacionais, segurança da informação e boas práticas de atendimento ao cliente. É o ponto de partida ideal para quem deseja atuar como técnico de suporte ou Help Desk.',
      modules: [
        'Fundamentos de TI e hardware',
        'Redes de computadores e protocolos',
        'Sistemas operacionais (Windows, Linux, macOS)',
        'Segurança da informação e cibersegurança',
        'Atendimento ao cliente e comunicação',
        'Resolução de problemas e troubleshooting'
      ],
      verificationLink: 'https://www.coursera.org/account/accomplishments/specialization/DFXUPFCXH965',
      isProfessionalCertificate: true,
      link: 'https://www.coursera.org/learn/fundamentos-do-suporte-tecnico'
    },
    {
      id: '3',
      title: 'Introduction to Software Product Management (PT)',
      platform: 'University of Alberta (via Coursera)',
      date: '2023',
      duration: 'Aproximadamente 6 semanas',
      workload: 'Cerca de 30 horas',
      icon: albertaImg,
      summary: 'Curso introdutório em gerenciamento de produtos de software, abordando os conceitos fundamentais de GPS, diferenças entre gerenciamento de produtos e projetos, e a importância do foco no cliente e na entrega de valor.',
      description: 'Este curso estabelece a base para o gerenciamento de produtos de software (GPS), diferenciando-o do gerenciamento de projetos tradicional. Foca em três pilares para o sucesso: fornecer o produto certo (validação), feito corretamente (verificação) e gerenciado adequadamente (processos). Aborda a filosofia Ágil e o Manifesto Ágil como ferramentas para lidar com a mudança e as expectativas dos clientes.',
      modules: [
        'Introdução ao Gerenciamento de Produtos de Software',
        'Diferenças entre Gerenciamento de Produtos e Projetos',
        'Os três pilares do GPS: Validação, Verificação e Processos',
        'Filosofia Ágil e Manifesto Ágil',
        'Foco no cliente e valor delivery',
        'Papéis e responsabilidades do Product Manager'
      ],
      verificationLink: 'https://www.coursera.org/account/accomplishments/verify/WKNDJF2YGF88',
      link: 'https://www.coursera.org/learn/introduction-to-software-product-management-pt'
    },
    {
      id: '4',
      title: 'Redes de Computadores',
      platform: 'Google (via Coursera)',
      date: '2024',
      duration: 'Aproximadamente 2 meses',
      workload: 'Cerca de 40 horas',
      icon: googleImg,
      summary: 'Curso completo sobre redes de computadores, cobrindo desde os fundamentos de comunicação de dados até protocolos, arquiteturas de rede, segurança e troubleshooting. Essencial para profissionais de TI e desenvolvimento.',
      description: 'Este curso oferece uma compreensão abrangente das redes de computadores, desde os conceitos básicos de comunicação de dados até arquiteturas de rede complexas. Aborda protocolos, modelos de referência (OSI/TCP-IP), dispositivos de rede, segurança cibernética e técnicas de diagnóstico e resolução de problemas. Fundamental para qualquer profissional de tecnologia que trabalhe com sistemas conectados.',
      modules: [
        'Fundamentos de comunicação de dados',
        'Modelos de referência (OSI e TCP/IP)',
        'Protocolos de rede (IP, TCP, UDP, HTTP, DNS)',
        'Dispositivos de rede (roteadores, switches, firewalls)',
        'Segurança de redes e criptografia',
        'Troubleshooting e monitoramento de redes'
      ],
      verificationLink: 'https://www.coursera.org/account/accomplishments/specialization/DFXUPFCXH965',
      link: 'https://www.coursera.org/learn/redes-computadores'
    }
  ];

  const displayedCursos = isHomePage ? allCursos.slice(0, 6) : allCursos;

  return (
    <div className="max-w-7xl mx-auto px-6 font-primary">
      <motion.div variants={textVariant()} className="text-center mb-16">
        <Header useMotion={true} p={t('courses.p')} h2={t('courses.h2')} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayedCursos.map((curso, index) => (
          <motion.div
            key={curso.id}
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
                {curso.isProfessionalCertificate && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-xs text-yellow-400 font-bold">Certificado Profissional</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-[var(--text-secondary)] text-sm flex-1 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
              {curso.summary}
            </p>

            <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center">
              <motion.button
                onClick={() => {
                  setSelectedCurso(curso);
                  setIsDetailOpen(true);
                }}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: '0 10px 40px rgba(0, 255, 255, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-3 shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden"
              >
                {/* Efeito de brilho animado */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)]/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <span className="relative z-10">VER CERTIFICADO</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>

                {/* Bordas luminosas */}
                <div className="absolute inset-0 rounded-2xl border border-[var(--cyber-cyan)]/0 group-hover/btn:border-[var(--cyber-cyan)]/60 transition-all duration-300" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-xs px-16 py-5 uppercase tracking-[0.4em] font-black group shadow-[0_0_25px_rgba(145,94,255,0.3)]"
        >
          {t('courses.viewAll') || 'Veja Todos Cursos'}
        </button>
      </div>

      {/* Modal de Todos os Cursos */}
      <CursosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cursos={allCursos}
      />

      {/* Modal de Detalhes do Curso */}
      <CursoDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedCurso(null);
        }}
        curso={selectedCurso}
      />
    </div>
  );
};

export default SectionWrapper(Cursos, 'cursos');
