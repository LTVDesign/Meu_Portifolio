import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';
import { projects } from '../../constants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Works = () => {
  console.log('[Works] Renderizando componente Works');
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Box de texto informativo com animação */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-8 md:p-12 shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500">
          {/* Efeito de brilho animado no fundo */}
          <div className="absolute inset-0 opacity-30">
            <m.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)'
              }}
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Conteúdo da box */}
          <div className="relative z-10">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Header useMotion={true} p={t('works.p')} h2={t('works.h2')} />
            </m.div>

            {/* Badges de destaque */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {[
                { text: 'React', color: 'from-cyan-500 to-blue-500' },
                { text: 'Three.js', color: 'from-purple-500 to-pink-500' },
                { text: 'Node.js', color: 'from-green-500 to-emerald-500' },
                { text: 'Full Stack', color: 'from-orange-500 to-red-500' }
              ].map((badge, idx) => (
                <m.span
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
                >
                  {badge.text}
                </m.span>
              ))}
            </m.div>
          </div>

          {/* Borda decorativa com glow */}
          <div className="absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none" />
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10" />
        </div>
      </m.div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <m.div
            key={project.name}
            variants={prefersReduced ? {} : fadeIn('up', 'spring', index * 0.1, 0.75)}
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
                  aria-label={`${t('works.viewCode')} - ${project.name}`}
                  className="btn-primary w-full py-4 text-center justify-center text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(145,94,255,0.3)] transition-all hover:scale-[1.02]"
                >
                  {t('works.viewCode')}
                </a>
              </div>
            </div>
          </m.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <a href="/cursos" className="btn-primary text-xs px-16 py-5 uppercase tracking-[0.4em] font-black group shadow-[0_0_25px_rgba(145,94,255,0.3)]">
          {t('works.viewProjects')}
        </a>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'projetos');