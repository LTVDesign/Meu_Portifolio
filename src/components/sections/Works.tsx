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
        className="relative group p-[1px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/20 to-transparent"
      >
        {/* Glow de Fundo */}
        <div className={`absolute -inset-0.5 bg-gradient-to-br ${getGlowColor(category)} opacity-10 group-hover:opacity-30 blur-xl transition duration-500`} />

        <div className="bg-[#151030]/95 backdrop-blur-xl w-full rounded-3xl p-6 sm:w-[360px] relative z-10 border border-white/5 h-full flex flex-col">
          <div className="relative h-[200px] w-full group/img overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-110"
              loading="lazy"
            />
            
            {/* Overlay link ao GitHub */}
            <div className="absolute inset-0 flex justify-end m-3">
              <div
                onClick={() => window.open(sourceCodeLink, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition shadow-card"
              >
                <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
              </div>
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
            <h3 className="text-white font-bold text-[24px] mb-2">{name}</h3>
            <p className="text-[var(--dynamic-text-secondary)] text-[14px] leading-relaxed line-clamp-3">
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

          <div className="mt-6">
            <button
               onClick={() => window.open(sourceCodeLink, "_blank")}
               className="w-full glass-btn py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
            >
              <img src={github} alt="github" className="w-4 h-4" />
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

      <div className="mt-40 flex justify-center">
        <button
          type="button"
          onClick={() => {
            window.open('https://github.com/lelebrr?tab=repositories', '_blank', 'noopener,noreferrer');
          }}
          className="glass-btn px-10 py-4 rounded-2xl font-bold tracking-wider text-sm uppercase hover:scale-105 transition-all shadow-xl"
        >
          Explorar todos repositórios
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'projects');
