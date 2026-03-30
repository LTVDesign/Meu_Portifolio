import { m, AnimatePresence } from 'framer-motion';
import { useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { Header } from '../atoms';
import { experiences } from '../../constants';
import type { TExperience } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ExperienceCard = forwardRef<HTMLDivElement, { experience: TExperience; index: number }>(
  ({ experience, index }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <m.div
        ref={ref}
        variants={prefersReduced ? {} : fadeIn('up', 'spring', index * 0.1, 0.75)}
        className="relative pl-24 pb-12 last:pb-0 group"
      >
        {/* Line & Circle */}
        <div className="absolute left-[31px] top-0 h-full w-[2px] bg-gradient-to-b from-[var(--cyber-cyan)] via-white/10 to-transparent group-last:h-16" />
        <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-white border-2 border-[var(--cyber-cyan)] shadow-[0_0_20px_rgba(0,255,255,0.4)] z-10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(0,255,255,0.7)]">
          <img src={experience.icon} alt={experience.companyName} className="w-12 h-12 object-contain" />
        </div>

        {/* Content Card */}
        <m.div
          whileHover={prefersReduced ? {} : { y: -5 }}
          className="glass-card p-8 neon-hover relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors tracking-tight">
                {experience.title}
              </h3>
              <p className="text-white/70 font-medium text-lg mt-1">{experience.companyName}</p>
            </div>
            <div className="text-[var(--cyber-purple)] font-mono text-sm tracking-widest bg-white/5 px-4 py-2 rounded-xl h-fit border border-white/5 shadow-inner">
              {experience.date}
            </div>
          </div>

          <ul className="space-y-4">
            {experience.points.map((point: string, i: number) => (
              <li key={i} className="text-[var(--text-secondary)] text-sm flex gap-3 leading-relaxed">
                <span className="text-[var(--cyber-cyan)] mt-1.5 flex-shrink-0 animate-pulse text-lg leading-none">•</span>
                {point}
              </li>
            ))}
          </ul>
        </m.div>
      </m.div>
    );
  }
);

const Experience = () => {
  console.log('[Experience] Renderizando componente Experience');
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <m.div variants={textVariant()} className="text-center mb-12">
        <Header useMotion={true} p={t('experience.p')} h2={t('experience.h2')} />
      </m.div>

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
            {/* Título e subtítulo animados */}
            <div className="mb-8 text-center">
              <m.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight"
              >
                <span className="bg-gradient-to-r from-[var(--cyber-cyan)] via-white to-[var(--cyber-purple)] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                  Experiência Consolidada, Olhar no Futuro.
                </span>
              </m.h3>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl font-bold text-[var(--cyber-purple)] uppercase tracking-wider mb-8"
              >
                Engenheiro de Software • Tecnólogo em ADS • Pós-Graduando em IA & Data Science
              </m.p>

              {/* Texto principal com melhor leitura */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="prose prose-invert max-w-none"
              >
                <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg mb-6">
                  {t('about.content')}
                </p>
              </m.div>

              {/* Badges de destaque */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                {[
                  { text: 'Product Management', color: 'from-purple-500 to-pink-500' },
                  { text: 'Scrum Master', color: 'from-green-500 to-emerald-500' },
                  { text: 'Cibersegurança', color: 'from-red-500 to-orange-500' },
                  { text: 'IA & Data Science', color: 'from-cyan-500 to-blue-500' }
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
          </div>

          {/* Borda decorativa com glow */}
          <div className="absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none" />
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10" />
        </div>
      </m.div>

      <div className="relative pt-2">
        {/* Timeline Line (Background) */}
        <div className="absolute left-[31px] top-4 bottom-0 w-[2px] bg-white/5" />

        <AnimatePresence mode="popLayout">
          {displayedExperiences.map((exp, index) => (
            <ExperienceCard key={exp.title + exp.date} experience={exp} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {!showAll && experiences.length > 4 && (
        <div className="mt-10 flex justify-center">
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(true)}
            className="btn-primary px-12 py-5 text-base shadow-[0_0_35px_rgba(145,94,255,0.4)] font-black uppercase tracking-[0.2em]"
          >
            {t('experience.verMais')}
          </m.button>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Experience, 'experiencia');