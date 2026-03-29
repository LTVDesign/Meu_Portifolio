import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';

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
            logo: '/assets/formacao/diploma.png',
            description: 'Formação completa em desenvolvimento de software, análise de sistemas e gestão de projetos de TI.',
            link: '#'
          },
          {
            title: 'Pós-Graduação em IA & Data Science',
            institution: 'Anhanguera',
            period: '2024 - Em andamento',
            status: 'EM ANDAMENTO',
            logo: '/assets/formacao/diploma.png',
            description: 'Especialização em inteligência artificial, machine learning e ciência de dados para soluções empresariais.',
            link: '#'
          },
          {
            title: 'Product Management',
            institution: 'University of Alberta',
            period: '2023',
            status: 'CONCLUÍDO',
            logo: '/assets/alberta-5gIiia4m.png',
            description: 'Certificação em gestão de produtos, metodologias ágeis e estratégias de desenvolvimento de software.',
            link: '#'
          },
          {
            title: 'Cibersegurança - Hackers do Bem',
            institution: 'Programa Hackers do Bem',
            period: '2023',
            status: 'CONCLUÍDO',
            logo: '/assets/hackers-DnffFmje.png',
            description: 'Formação avançada em cibersegurança, ethical hacking e proteção de infraestruturas digitais.',
            link: '#'
          }
        ].map((item, index) => (
          <motion.div
            key={item.title}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="glass-card group relative overflow-hidden p-8 md:p-10 flex flex-col h-full neon-hover"
          >
            {/* Badge */}
            <div className="absolute -top-3 -right-3 px-5 py-1.5 text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white shadow-lg">
              {item.status}
            </div>

            <div className="flex items-start gap-6">
              <div className="w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center">
                <img src={item.logo} alt={item.institution} className="w-12 h-12 object-contain" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-[var(--cyber-purple)] font-medium mt-1">{item.institution}</p>
                <p className="text-[var(--text-secondary)] mt-2 text-sm md:text-base">{item.period}</p>

                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-8 inline-flex items-center text-sm font-medium text-[var(--cyber-cyan)] hover:text-white transition-colors"
            >
              Ver Detalhes →
            </a>
          </motion.div>
        ))}
      </div>

      {/* Botão Explorar Todos */}
      <div className="mt-16 flex justify-center">
        <a
          href="#all-formacao"
          className="btn-primary text-base px-10"
        >
          Explorar Todos os Cursos e Certificações
        </a>
      </div>
    </div>
  );
};

export default SectionWrapper(Formacao, 'formacao');
