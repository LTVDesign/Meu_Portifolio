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
}) => {
  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt glareEnable tiltEnable tiltMaxAngleX={30} tiltMaxAngleY={30} glareColor="#aaa6c3">
        <div className="bg-tertiary w-full rounded-2xl p-5 sm:w-[300px]">
          <div className="relative h-[230px] w-full">
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-2xl object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <h3 className="text-[24px] font-bold text-[var(--dynamic-text-color)]">{name}</h3>
            <button
              type="button"
              onClick={() => {
                if (sourceCodeLink) {
                  try {
                    const url = new URL(sourceCodeLink);
                    // Permitir apenas HTTP e HTTPS
                    if (['http:', 'https:'].includes(url.protocol)) {
                      window.open(sourceCodeLink, '_blank', 'noopener,noreferrer');
                    } else {
                      console.warn('Protocolo inválido detectado:', url.protocol);
                    }
                  } catch (_e) {
                    console.warn('URL inválida detectada:', sourceCodeLink);
                  }
                }
              }}
              className="black-gradient flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:scale-110 transition-transform shadow-lg"
              title="Ver código fonte"
            >
              <img
                src={github}
                alt="github"
                className="h-1/2 w-1/2 object-contain"
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>
          <div className="mt-2">
            <p className="text-[var(--dynamic-text-secondary)] text-[14px]">{description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full justify-center">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-3 text-[17px] leading-[30px] text-center"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center items-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => {
            window.open('https://github.com/lelebrr?tab=repositories', '_blank', 'noopener,noreferrer');
          }}
          className="glass-btn px-6 py-3 rounded-lg font-bold tracking-wider"
        >
          Ver Todos
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Works, '');
