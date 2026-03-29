import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { Header } from '../atoms';

const Cursos = () => {
  const featuredCursos = [
    {
      title: 'Product Management',
      platform: 'University of Alberta',
      date: '2023',
      icon: '📊',
      description: 'Gestão de produtos digitais, metodologias ágeis (Scrum/Kanban) e estratégias de mercado para software.',
      link: '#'
    },
    {
      title: 'Cibersegurança - Hackers do Bem',
      platform: 'Hackers do Bem / RNP',
      date: '2023',
      icon: '🛡️',
      description: 'Treinamento em defesa cibernética, análise de vulnerabilidades, segurança ofensiva e conformidade.',
      link: '#'
    },
    {
      title: 'Ethical Hacking Avançado',
      platform: 'Udemy / InfoSec',
      date: '2023',
      icon: '🔐',
      description: 'Análise de redes, testes de intrusão, segurança em sistemas e resposta rápida a incidentes.',
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/5 transition-transform group-hover:scale-110">
                <span className="text-4xl filter drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]">{curso.icon}</span>
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
              <span className="text-white/40 tracking-tighter">[{curso.date}]</span>
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
        <a href="#projects" className="btn-primary text-xs px-16 py-5 uppercase tracking-[0.4em] font-black group shadow-[0_0_25px_rgba(145,94,255,0.3)]">
          Ver Meus Projetos
          <span className="group-hover:translate-x-2 transition-transform ml-2">→</span>
        </a>
      </div>
    </div>
  );
};

export default SectionWrapper(Cursos, 'cursos');