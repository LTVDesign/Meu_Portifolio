import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import defaultLogo from '../../assets/logo.svg';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import albertaLogo from '../../logos/alberta.png';
import bradescoLogo from '../../logos/bradesco.png';
import googleLogo from '../../logos/google.png';
import hackersLogo from '../../logos/hackers.png';
import ibmLogo from '../../logos/ibm.png';
import ipadLogo from '../../logos/ipad.png';
import johnsLogo from '../../logos/johns.png';
import scrumLogo from '../../logos/scrum.png';
import skillLogo from '../../logos/skill.png';
import { fadeIn } from '../../utils/motion';
import { LinkAnimado } from '../atoms';
import { Header } from '../atoms/Header';

interface Credential {
  name: string;
  path: string;
  institution: string;
  description: string;
  type: 'course' | 'certificate';
  date?: string;
  category?: string;
}

const CredentialCard: React.FC<{ index: number } & Credential> = ({
  index,
  name,
  institution,
  description,
  path,
  type,
  date,
  category,
}) => {
  const getLogo = () => {
    if (institution === 'University of Alberta') return albertaLogo;
    if (institution?.includes('Google')) return googleLogo;
    if (institution?.includes('Skillshop')) return skillLogo;
    if (institution?.includes('IBM')) return ibmLogo;
    if (institution?.includes('Scrum')) return scrumLogo;
    if (institution?.includes('Johns Hopkins')) return johnsLogo;
    if (institution?.includes('Hackers do Bem')) return hackersLogo;
    if (institution?.includes('Fundação Bradesco') || institution?.includes('Bradesco'))
      return bradescoLogo;
    if (institution?.includes('IPED')) return ipadLogo;
    return defaultLogo;
  };

  const badgeColors: Record<string, string> = {
    'Product Management': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    'Infrastructure & Support': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    Cybersecurity: 'text-red-400 bg-red-400/10 border-red-400/20',
    'Web Development': 'text-green-400 bg-green-400/10 border-green-400/20',
    'Agile Methodologies': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    'Data Science & DB': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    Default: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
  };

  return (
    <motion.div 
      variants={fadeIn('up', 'spring', index * 0.15, 0.75)} 
      className="w-full flex justify-center"
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        className="relative group p-[2px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent w-full max-w-[350px]"
      >
        {/* Glow Halo Background */}
        <div className="absolute -inset-10 bg-[#915EFF]/5 blur-[60px] group-hover:bg-[#915EFF]/10 transition-all duration-500 pointer-events-none" />

        <div className="bg-[#151030]/90 border border-white/10 backdrop-blur-2xl w-full rounded-[24px] pt-10 pb-16 px-8 relative z-20 flex flex-col min-h-[440px] shadow-2xl">
          {/* Top Section: Category & Type */}
          <div className="flex flex-col items-center justify-center gap-3 mb-8 w-full mt-2">
            <span
              className={`px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest border text-center ${badgeColors[category || 'Default']}`}
            >
              {category || 'Especialização'}
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#915EFF] opacity-80`}
            >
              {type === 'course' ? 'CURSO' : 'CERTIFICADO'}
            </span>
          </div>

          {/* Institution Logo Area */}
          <div className="relative h-16 w-full flex justify-center items-center mb-4">
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={getLogo()}
              alt={institution}
              className="h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-150"
            />
          </div>

          {/* Content Section */}
          <div className="flex-grow text-center">
            <h3 className="text-white font-bold text-[clamp(1.1rem,3vw,1.3rem)] leading-tight mb-2 line-clamp-2">
              {name}
            </h3>
            <p className="text-[var(--dynamic-text-secondary)] text-[clamp(0.8rem,2vw,0.9rem)] font-medium opacity-70 mb-4">
              {institution} • {date || '2023'}
            </p>
            <p className="text-[var(--dynamic-text-secondary)] text-[clamp(0.8rem,2vw,0.85rem)] leading-relaxed line-clamp-3 opacity-100 transition-opacity">
              {description}
            </p>
          </div>

          {/* Footer Action */}
          <div className="mt-auto pt-6 border-t border-white/5 w-full">
            <LinkAnimado
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-[#915EFF] to-[#00FFFF] border-none shadow-[0_0_20px_rgba(145,94,255,0.4)] hover:scale-[1.02] transition-transform text-white uppercase tracking-widest mt-2"
            >
              {type === 'course' ? 'VER DIPLOMA' : 'VER DIPLOMA'}
            </LinkAnimado>
          </div>

          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        </div>
      </Tilt>
    </motion.div>
  );
};

const Cursos = ({ setViewMode }: { setViewMode: (mode: string) => void }) => {
  const featuredCredentials: Credential[] = [
    {
      name: 'Software Product Management Capstone',
      path: '/cursos/gerenciamento de produtos de software/Software-Product-Management-Capstone---Course-Map.pdf',
      institution: 'University of Alberta',
      date: '2023',
      description:
        'Este curso final consolida toda a especialização em gerenciamento de produtos através de uma simulação real de seis semanas. O foco é aplicar práticas ágeis para resolver desafios da indústria, interagindo com clientes para discernir necessidades reais e transformá-las em requisitos de software claros.',
      type: 'course',
      category: 'Product Management',
    },
    {
      name: 'Certificado Profissional de Suporte em TI do Google',
      path: '/certificados/TechnicalSupportBasics_Badge20230225-28-ldlr1j.pdf',
      institution: 'Google (via Coursera)',
      date: '2023',
      description:
        'Uma certificação de peso que atesta domínio completo sobre a infraestrutura de TI moderna. O programa engloba desde a montagem de hardware e redes até a administração avançada de sistemas (Windows/Linux) e segurança de rede.',
      type: 'certificate',
      category: 'Infrastructure & Support',
    },
    {
      name: 'Foundations of Cybersecurity',
      path: '/certificados/Foundations of Cybersecurity.pdf',
      institution: 'Google (via Coursera)',
      date: '2023',
      description:
        'Explore os pilares da segurança: confidencialidade, integridade e disponibilidade. Cobre a análise de riscos em ambientes corporativos, o papel da conformidade e as ferramentas de defesa modernas.',
      type: 'certificate',
      category: 'Cybersecurity',
    },
    {
      name: 'HTML, CSS, and Javascript for Web Developers',
      path: '/certificados/HTML, CSS, and Javascript for Web Developers.pdf',
      institution: 'Johns Hopkins University (via Coursera)',
      date: '2023',
      description:
        'Criação de aplicações web dinâmicas e responsivas. Abrange desde a estrutura semântica do HTML5 até a lógica de programação client-side com JavaScript e integração via AJAX.',
      type: 'certificate',
      category: 'Web Development',
    },
    {
      name: 'Introduction to Scrum Master Profession',
      path: '/certificados/Introduction to Scrum Master Profession.pdf',
      institution: 'IBM (via Coursera)',
      date: '2023',
      description:
        'Facilitação de equipes de alto desempenho sob a ótica de metodologias ágeis e DevOps, focando nas cerimônias do Scrum para garantir entrega contínua.',
      type: 'certificate',
      category: 'Agile Methodologies',
    },
    {
      name: 'Implementando Banco de Dados',
      path: '/certificados/Implementando Banco de Dados - Fundação Bradesco.pdf',
      institution: 'Fundação Bradesco',
      date: '2023',
      description:
        'Focado na criação física e estruturação de bancos de dados relacionais. Cobre desde a modelagem conceitual até a implementação prática utilizando SQL Server.',
      type: 'certificate',
      category: 'Data Science & DB',
    },
  ];

  return (
    <>
      <Header useMotion={true} {...config.sections.cursos} />

      <div className="flex w-full justify-center">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-3 text-[clamp(0.9rem,3vw,1.1rem)] leading-relaxed text-center max-w-4xl"
        >
          {config.sections.cursos.content}
        </motion.p>
      </div>

      {/* Grade de Cursos com Padding Inferior Forçado */}
      <div className="w-full block relative pb-32 sm:pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 justify-items-center w-full mt-24">
          {featuredCredentials.map((item, index) => (
            <CredentialCard key={`${item.type}-${index}`} index={index} {...item} />
          ))}
        </div>
      </div>

      {/* Divisor Visual de Segurança (Linha Técnica) */}
      <div className="w-full h-px bg-white/5 my-10" />

      {/* Área do Botão Ultra Espaçada */}
      <div className="w-full flex justify-center pt-48 pb-40 relative z-10">
        <div className="relative group">
          {/* Brilho de Fundo Sutil e Elegante */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#915EFF]/20 blur-[100px] rounded-full group-hover:bg-[#915EFF]/30 transition-colors duration-700 pointer-events-none" />
          
          <button
            type="button"
            onClick={() => setViewMode('allcourses')}
            className="relative px-20 py-8 rounded-3xl font-black tracking-[0.3em] text-[16px] uppercase shadow-2xl transition-all duration-500 hover:scale-[1.03] border border-white/20 active:scale-95 group overflow-hidden"
          >
            {/* Fundo de Vidro Puro e Sólido */}
            <div className="absolute inset-0 bg-[#0a0a20]/90 backdrop-blur-2xl z-0" />
            
            {/* Borda de Gradiente em Neon */}
            <div className="absolute inset-0 p-[2px] rounded-3xl bg-gradient-to-r from-[#915EFF]/40 via-cyan-500/40 to-[#915EFF]/40 group-hover:bg-gradient-to-r group-hover:from-[#915EFF] group-hover:via-cyan-400 group-hover:to-[#915EFF] transition-all duration-500 z-10" />
            
            {/* Overlay Interno para manter o fundo escuro */}
            <div className="absolute inset-[2px] bg-[#0a0a20] rounded-[22px] z-10" />

            <span className="relative z-20 text-white flex items-center justify-center gap-8 text-center leading-none">
               Explorar todos Cursos e certificações 
               <FaArrowRight className="group-hover:translate-x-5 transition-transform duration-500 text-[1.4em] text-[#915EFF]" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Cursos, 'cursos');
