import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

import { github } from '../../assets';
import { projects } from '../../constants';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import type { TProject } from '../../types';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
  status,
  category,
}) => {
  // Cores de glow baseadas na categoria
  const getGlowColor = (cat?: string) => {
    if (cat?.includes('IA')) return 'from-[#915EFF] to-[#FF00FF]';
    if (cat?.includes('Hardware')) return 'from-[#00FFFF] to-[#00FF00]';
    if (cat?.includes('Ciber')) return 'from-[#FF0000] to-[#FF00FF]';
    return 'from-[#915EFF] to-[#00FFFF]';
  };

  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.3, 0.75)}>
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        glareColor="#ffffff20"
        className="relative group p-[1px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/20 to-transparent m-4"
      >
        {/* Glow de Fundo */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-br ${getGlowColor(category)} opacity-10 group-hover:opacity-30 blur-xl transition duration-500`}
        />

        <div className="bg-[#151030]/95 backdrop-blur-xl w-[clamp(260px,90vw,400px)] rounded-3xl p-[clamp(1rem,5vw,2rem)] relative z-10 border border-white/5 h-full flex flex-col">
          <div className="relative h-[clamp(160px,30vh,220px)] w-full group/img overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-110"
              loading="lazy"
            />

            {/* Overlay link ao GitHub */}
            <div className="absolute inset-0 flex justify-end m-3">
              <button
                type="button"
                onClick={() => window.open(sourceCodeLink, '_blank')}
                onKeyDown={(e) => e.key === 'Enter' && window.open(sourceCodeLink, '_blank')}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition shadow-card"
                aria-label="Ver código no GitHub"
              >
                <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
              </button>
            </div>

            {/* Status Badge */}
            {status && (
              <div className="absolute top-4 left-4">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-white border border-white/20 shadow-lg">
                  {status}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 flex-grow">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#915EFF]">
                {category || 'Projeto'}
              </span>
            </div>
            <h3 className="text-white font-bold text-[clamp(1.2rem,4vw,1.5rem)] mb-2">{name}</h3>
            <p className="text-[var(--dynamic-text-secondary)] text-[clamp(0.85rem,2.5vw,1rem)] leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 pt-4">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`text-[12px] px-3 py-1 rounded-full bg-white/5 border border-white/5 ${tag.color} font-medium`}
              >
                #{tag.name}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <button
              type="button"
              onClick={() => window.open(sourceCodeLink, '_blank')}
              className="w-full glass-btn py-[clamp(0.75rem,2vh,1rem)] rounded-xl text-[clamp(0.8rem,2vw,0.9rem)] font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
            >
              <img src={github} alt="github" className="w-5 h-5" />
              Ver Código Fonte
            </button>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full justify-center">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-3 text-[17px] max-w-3xl leading-[30px] text-center"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <div className="mt-12 mb-8 flex justify-center w-full relative z-20 px-4">
        <button
          type="button"
          onClick={() => {
            window.open(
              'https://github.com/lelebrr?tab=repositories',
              '_blank',
              'noopener,noreferrer'
            );
          }}
          className="px-[clamp(2rem,8vw,4rem)] py-[clamp(1rem,3vh,1.5rem)] rounded-2xl font-black tracking-widest text-[clamp(0.9rem,3vw,1.1rem)] uppercase hover:scale-[1.03] transition-all shadow-[0_0_30px_rgba(145,94,255,0.4)] bg-gradient-to-r from-[#915EFF] to-[#00FFFF] text-white border-none group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 drop-shadow-md">Explorar todos repositórios</span>
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'projects');
