import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { Header } from '../atoms';

const Cursos = () => {
  const featuredCursos = [
    {
      title: 'React - The Complete Guide',
      platform: 'Udemy',
      date: '2023',
      description: 'Curso completo de React do básico ao avançado, incluindo hooks, context API e Redux.',
      link: '#'
    },
    {
      title: 'TypeScript for Professionals',
      platform: 'Coursera',
      date: '2023',
      description: 'TypeScript avançado com tipagem estática, generics e padrões de projeto.',
      link: '#'
    },
    {
      title: 'Three.js Journey',
      platform: 'Three.js Journey',
      date: '2024',
      description: 'Desenvolvimento de experiências 3D na web com Three.js e WebGL.',
      link: '#'
    },
    {
      title: 'Cybersecurity Fundamentals',
      platform: 'IBM',
      date: '2023',
      description: 'Fundamentos de cibersegurança, ethical hacking e proteção de redes.',
      link: '#'
    },
    {
      title: 'Product Management',
      platform: 'University of Alberta',
      date: '2023',
      description: 'Gestão de produtos digitais, metodologias ágeis e estratégias de desenvolvimento.',
      link: '#'
    },
    {
      title: 'Node.js - The Complete Guide',
      platform: 'Udemy',
      date: '2024',
      description: 'Desenvolvimento backend com Node.js, Express e MongoDB.',
      link: '#'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <motion.div variants={textVariant()} className="text-center mb-16">
        <Header useMotion={true} {...config.sections.cursos} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredCursos.map((curso, index) => (
          <motion.div
            key={index}
            variants={fadeIn('up', 'spring', index * 0.08, 0.75)}
            className="glass-card p-8 group neon-hover flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-transparent flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">📚</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors">
                  {curso.title}
                </h3>
                <p className="text-sm text-[var(--cyber-purple)]">{curso.platform}</p>
              </div>
            </div>

            <p className="text-[var(--text-secondary)] flex-1 line-clamp-3">
              {curso.description}
            </p>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
              <span className="text-white/60">{curso.date}</span>
              <a
                href={curso.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cyber-cyan)] hover:text-white font-medium flex items-center gap-1"
              >
                Ver Certificado →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <a href="#all-cursos" className="btn-primary text-base px-12">
          Ver Todos os Cursos e Certificações
        </a>
      </div>
    </div>
  );
};

export default SectionWrapper(Cursos, 'cursos');