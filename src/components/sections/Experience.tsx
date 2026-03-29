import { m, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { Header } from '../atoms';
import { experiences } from '../../constants';
import type { TExperience } from '../../types';

const ExperienceCard = ({ experience, index }: { experience: TExperience; index: number }) => (
  <m.div
    variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
    className="relative pl-24 pb-12 last:pb-0 group"
  >
    {/* Line & Circle */}
    <div className="absolute left-[31px] top-0 h-full w-[2px] bg-gradient-to-b from-[var(--cyber-cyan)] via-white/10 to-transparent group-last:h-16" />
    <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-white border-2 border-[var(--cyber-cyan)] shadow-[0_0_20px_rgba(0,255,255,0.4)] z-10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(0,255,255,0.7)]">
      <img src={experience.icon} alt={experience.companyName} className="w-12 h-12 object-contain" />
    </div>

    {/* Content Card */}
    <m.div
      whileHover={{ y: -5 }}
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

const Experience = () => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <m.div variants={textVariant()} className="text-center mb-20">
        <Header useMotion={true} p={t('experience.p')} h2={t('experience.h2')} />
      </m.div>

      <div className="relative pt-4">
        {/* Timeline Line (Background) */}
        <div className="absolute left-[31px] top-4 bottom-0 w-[2px] bg-white/5" />

        <AnimatePresence mode="popLayout">
          {displayedExperiences.map((exp, index) => (
            <ExperienceCard key={exp.title + exp.date} experience={exp} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {!showAll && experiences.length > 4 && (
        <div className="mt-16 flex justify-center">
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