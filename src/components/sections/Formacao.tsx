import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';
import facul from '../../assets/facul.png';

const Formacao = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <Header useMotion={true} {...config.sections.formacao} />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          {
            title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
            institution: 'Anhanguera',
            period: '2022 - 2024',
            status: 'CONCLUÍDO',
            logo: facul,
            description: 'Formação completa em desenvolvimento de software, análise de sistemas e gestão de projetos de TI voltados para o mercado corporativo.',
            link: '#'
          },
          {
            title: 'Pós-Graduação em IA & Data Science',
            institution: 'Anhanguera',
            period: '2024 - Em andamento',
            status: 'EM ANDAMENTO',
            logo: facul,
            description: 'Especialização focada em Inteligência Artificial Generativa, Machine Learning e análise estatística para decisões baseadas em dados.',
            link: '#'
          }
        ].map((item, index) => (
          <motion.div
            key={item.title}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="glass-card group relative overflow-hidden p-8 md:p-10 flex flex-col h-full neon-hover border border-white/10"
          >
            {/* Badge Indicator */}
            <div className="absolute top-4 right-4 px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white shadow-lg border border-white/20 z-20">
              {item.status}
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-black/50 p-4 flex items-center justify-center shadow-inner relative z-10 transition-transform group-hover:scale-105">
                <img src={item.logo} alt={item.institution} className="w-12 h-12 object-contain" />
              </div>

              <div className="flex-1 relative z-10">
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[var(--cyber-cyan)] transition-colors tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--cyber-purple)] font-bold uppercase tracking-widest mt-2 text-sm">{item.institution}</p>
                <div className="mt-3 text-white/50 text-xs font-mono uppercase tracking-[0.2em]">
                  Período: {item.period}
                </div>

                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-10">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-xs font-bold uppercase tracking-widest py-4 justify-center gap-3 group/btn rounded-2xl shadow-[0_0_20px_rgba(145,94,255,0.2)]"
              >
                Ver Detalhes do Certificado
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Formacao, 'formacao');
