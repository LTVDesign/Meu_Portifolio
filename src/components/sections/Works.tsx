import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MouseEvent } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { projects } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { Header } from '../atoms';

const ProjectSpotlight = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-150, 150], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <m.div variants={prefersReduced ? {} : fadeIn('up', 'spring', index * 0.1, 0.7)}>
      <Link to={`/projetos/${slug}`} className='block group'>
        <m.div
          ref={cardRef}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: prefersReduced ? 0 : rotateX,
            rotateY: prefersReduced ? 0 : rotateY,
            transformPerspective: 1200,
          }}
          className='relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500'
          whileHover={{ scale: 1.01 }}
        >
          {/* Image */}
          <div className='relative aspect-[16/10] overflow-hidden'>
            <img
              src={project.image}
              alt={project.name}
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent' />

            {/* Category + Status */}
            <div className='absolute top-4 left-4 flex gap-2'>
              <span className='px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[11px] font-bold text-[var(--cyber-cyan)] uppercase tracking-[0.15em]'>
                {t(`works.${project.category}`)}
              </span>
              <span className='px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[11px] font-bold text-green-400 uppercase tracking-[0.15em]'>
                {t(`works.${project.status}`)}
              </span>
            </div>

            {/* Hover overlay */}
            <div className='absolute inset-0 bg-[var(--cyber-cyan)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
          </div>

          {/* Content */}
          <div className='p-6 md:p-8'>
            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-4'>
              {project.tags?.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className='text-[11px] px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-white/50 font-medium'
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            <h3 className='text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors duration-300 mb-3'>
              {project.name}
            </h3>

            <p className='text-[clamp(0.8rem,1.8vw,0.95rem)] text-white/50 line-clamp-2 leading-relaxed mb-6'>
              {t(project.description)}
            </p>

            {/* CTA */}
            <div className='flex items-center gap-2 text-[var(--cyber-cyan)] text-sm font-medium group-hover:gap-3 transition-all duration-300'>
              <span>{t('works.viewCaseStudy', 'Ver Case Study')}</span>
              <svg
                className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </div>
          </div>

          {/* Glow effect on hover */}
          <div className='absolute -inset-px rounded-3xl bg-gradient-to-r from-[var(--cyber-cyan)]/10 via-transparent to-[var(--cyber-purple)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl' />
        </m.div>
      </Link>
    </m.div>
  );
};

const Works = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  return (
    <div className='w-full mx-auto px-[clamp(1rem,5vw,2rem)]'>
      {/* Section header */}
      <m.div
        initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className='mb-[clamp(2rem,6vw,4rem)] text-center'
      >
        <Header useMotion={true} p={t('works.p')} h2={t('works.h2')} />

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='mt-6 flex items-center justify-center gap-4'
        >
          <div className='h-px w-12 bg-gradient-to-r from-transparent to-white/20' />
          <span className='text-xs text-white/30 uppercase tracking-[0.3em]'>
            {projects.length} {t('works.projectCount', 'Projetos')}
          </span>
          <div className='h-px w-12 bg-gradient-to-l from-transparent to-white/20' />
        </m.div>
      </m.div>

      {/* Projects grid */}
      <m.div
        variants={prefersReduced ? {} : staggerContainer(0.15, 0.2)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.1 }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
      >
        {projects.map((project, i) => (
          <ProjectSpotlight key={project.name} project={project} index={i} />
        ))}
      </m.div>

      {/* View all */}
      <m.div
        initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='mt-12 text-center'
      >
        <a
          href='https://github.com/lelebrr'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 hover:text-white transition-all duration-300'
        >
          <span>{t('works.viewProjects', 'Ver todos no GitHub')}</span>
          <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
        </a>
      </m.div>
    </div>
  );
};

export default SectionWrapper(Works, 'works');
