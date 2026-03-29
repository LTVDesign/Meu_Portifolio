import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';
import { projects } from '../../constants';

const Works = () => {

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Header useMotion={true} {...config.sections.works} />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="glass-card group relative overflow-hidden h-full flex flex-col neon-hover border border-white/10"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-[var(--cyber-cyan)] uppercase tracking-widest shadow-xl">
                {project.category}
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex gap-2 mb-4">
                {project.tags?.slice(0, 3).map((tag, i) => (
                  <span key={i} className={`text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[var(--text-secondary)] font-medium`}>
                    #{tag.name}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors line-clamp-1">
                {project.name}
              </h3>

              <p className="mt-3 text-[var(--text-secondary)] line-clamp-3 text-sm flex-1 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-8">
                <a
                  href={project.sourceCodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-4 text-center justify-center text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(145,94,255,0.3)] transition-all hover:scale-[1.02]"
                >
                  Visualizar Código Fonte
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'projetos');