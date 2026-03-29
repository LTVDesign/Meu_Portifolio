import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { Header } from '../atoms';

const Works = () => {
  const featuredWorks = [
    {
      title: 'Portfolio 3D',
      description: 'Portfólio interativo e imersivo em 3D desenvolvido com React, Three.js e Tailwind CSS. Uma experiência única que combina design moderno, animações fluidas e elementos 3D interativos.',
      image: '/assets/carrent-CkhBkZj4.png',
      tags: ['React', 'Three.js', 'Tailwind CSS', 'TypeScript'],
      sourceCode: 'https://github.com/lelebrr/Meu_Portifolio',
      liveDemo: '#'
    },
    {
      title: 'Smart Home IoT',
      description: 'Sistema de automação residencial com ESP32, controle por voz e dashboard web em tempo real para monitoramento de sensores.',
      image: '/assets/comptester-Vuci-Fx9.png',
      tags: ['ESP32', 'IoT', 'Node.js', 'MQTT'],
      sourceCode: '#',
      liveDemo: '#'
    },
    {
      title: 'Cybersec Toolkit',
      description: 'Ferramentas de cibersegurança para análise de vulnerabilidades, monitoramento de rede e resposta a incidentes.',
      image: '/assets/getnexo-BvBRfWQZ.png',
      tags: ['Python', 'Security', 'Network', 'Automation'],
      sourceCode: '#',
      liveDemo: '#'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Header useMotion={true} {...config.sections.works} />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredWorks.map((project, index) => (
          <motion.div
            key={project.title}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="glass-card group relative overflow-hidden h-full flex flex-col neon-hover"
          >
            <div className="relative h-60 overflow-hidden rounded-t-3xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex gap-2 mb-4">
                {project.tags?.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[var(--text-secondary)]">
                    #{tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors">
                {project.title}
              </h3>

              <p className="mt-3 text-[var(--text-secondary)] line-clamp-3 flex-1">
                {project.description}
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center border border-white/20 hover:border-[var(--cyber-purple)] rounded-2xl text-sm font-medium transition-all"
                >
                  Ver Código Fonte
                </a>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-medium transition-all"
                  >
                    Ver Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botão Explorar Todos */}
      <div className="mt-16 flex justify-center">
        <a
          href="#all-works"
          className="btn-primary text-base px-10"
        >
          Explorar Todos os Repositórios
        </a>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'projetos');