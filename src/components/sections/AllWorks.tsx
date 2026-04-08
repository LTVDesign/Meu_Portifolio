import { useState } from 'react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { projects } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { TProject } from '../../types';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

const ProjectCard: React.FC<{ index: number } & Pick<TProject, 'tags' | 'image' | 'sourceCodeLink'>> = ({
  index,
  tags,
  image,
  sourceCodeLink,
}) => {
  const prefersReduced = useReducedMotion();
  const { t } = useTranslation();

  return (
    <m.div
      variants={prefersReduced ? {} : fadeIn('up', 'spring', index * 0.5, 0.75)}
      className='glass-card p-5 sm:w-[300px]'
    >
      <div className='relative h-[230px] w-full'>
        <img
          src={image}
          alt={t(`projects.list.${index}.name`)}
          className='h-full w-full rounded-2xl object-cover'
          loading='lazy'
          decoding='async'
          width={300}
          height={230}
        />
        <div className='card-img_hover absolute inset-0 m-3 flex justify-end'>
          <button
            type='button'
            onClick={() => {
              if (sourceCodeLink) {
                try {
                  const url = new URL(sourceCodeLink);
                  if (['http:', 'https:'].includes(url.protocol)) {
                    window.open(sourceCodeLink, '_blank', 'noopener,noreferrer');
                  }
                } catch { }
              }
            }}
            className='black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full'
          >
            <svg
              className='h-1/2 w-1/2'
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </button>
        </div>
      </div>
      <div className='mt-5'>
        <h3 className='text-[24px] font-bold text-white'>{t(`projects.list.${index}.name`)}</h3>
        <p className='text-gray-300 mt-2 text-[14px]'>
          {t(`projects.list.${index}.description`)}
        </p>
      </div>
      <div className='mt-4 flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <p key={tag.name} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </m.div>
  );
};

const AllWorks = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <>
      <Header useMotion={true} p={t('works.p')} h2={t('works.h2')} />

      <div className='flex w-full justify-between items-center'>
        <m.p
          variants={fadeIn('up', 'tween', 0.1, 1)}
          className='text-white/80 transition-colors duration-500 mt-3 text-[17px] leading-[30px]'
          style={{
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
          }}
        >
          {t('works.content')}
        </m.p>
        <button
          type='button'
          onClick={() => navigate('/')}
          className='bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors mt-3'
        >
          {t('allWorks.backToHome')}
        </button>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            tags={project.tags}
            image={project.image}
            sourceCodeLink={project.sourceCodeLink}
          />
        ))}
      </div>

      {hasMore && (
        <div className='mt-12 flex justify-center'>
          <button
            type='button'
            onClick={handleLoadMore}
            className='glass-btn px-8 py-3 rounded-lg font-bold tracking-wider hover:scale-105 transition-transform'
          >
            {t('allWorks.loadMore')}
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(AllWorks, 'allworks');
