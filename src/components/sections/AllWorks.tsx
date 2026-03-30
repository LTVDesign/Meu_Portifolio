import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { github } from '../../assets';
import { projects } from '../../constants';
import { SectionWrapper } from '../../hoc';
import type { TProject } from '../../types';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={prefersReduced ? {} : fadeIn('up', 'spring', index * 0.5, 0.75)}
      className="glass-card p-5 sm:w-[300px]"
    >
      <div className="relative h-[230px] w-full">
        <img
          src={image}
          alt={name}
          className="h-full w-full rounded-2xl object-cover"
          loading="lazy"
          decoding="async"
          width={300}
          height={230}
        />
        <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (sourceCodeLink) {
                try {
                  const url = new URL(sourceCodeLink);
                  if (['http:', 'https:'].includes(url.protocol)) {
                    window.open(sourceCodeLink, '_blank', 'noopener,noreferrer');
                  }
                } catch {
                }
              }
            }}
            className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
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
      </div>
      <div className="mt-5">
        <h3 className="text-[24px] font-bold text-[var(--dynamic-text-color)]">{name}</h3>
        <p className="text-[var(--dynamic-text-secondary)] mt-2 text-[14px]">{description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={tag.name} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const AllWorks = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <>
      <Header useMotion={true} p={t('works.p')} h2={t('works.h2')} />

      <div className="flex w-full justify-between items-center">
        <motion.p
          variants={fadeIn('up', 'tween', 0.1, 1)}
          className="text-[var(--dynamic-text-secondary)] transition-colors duration-500 mt-3 text-[17px] leading-[30px]"
        >
          {t('works.content')}
        </motion.p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-primary text-[var(--dynamic-text-color)] px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors mt-3"
        >
          Voltar
        </button>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={`project-${project.name}`} index={index} {...project} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="glass-btn px-8 py-3 rounded-lg font-bold tracking-wider hover:scale-105 transition-transform"
          >
            Carregar Mais
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(AllWorks, 'allworks');
