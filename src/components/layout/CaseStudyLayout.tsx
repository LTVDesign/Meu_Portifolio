import { m, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeIn, staggerContainer } from '../../utils/motion';
import PageTransition from '../layout/PageTransition';

export interface CaseStudyData {
  id: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  stack: string[];
  status: string;
  image: string;
  color: string;
  problem: string;
  process: string[];
  solution: string;
  results: string[];
  behindTheScenes: string;
  nextProject?: { id: string; name: string; color: string };
  prevProject?: { id: string; name: string; color: string };
}

interface CaseStudyLayoutProps {
  data: CaseStudyData;
  children?: ReactNode;
}

const CaseStudyLayout = ({ data, children }: CaseStudyLayoutProps) => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <PageTransition>
      <article className='min-h-screen'>
        {/* Hero */}
        <div ref={heroRef} className='relative h-[80vh] overflow-hidden'>
          <m.div className='absolute inset-0' style={{ y: heroY, scale: heroScale }}>
            <img
              src={data.image}
              alt={data.name}
              className='w-full h-full object-cover'
              loading='eager'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />
          </m.div>

          <m.div
            className='absolute inset-0 flex items-end'
            style={{ opacity: heroOpacity }}
          >
            <div className='w-full max-w-6xl mx-auto px-[clamp(1rem,5vw,4rem)] pb-[clamp(2rem,6vw,4rem)]'>
              <m.div
                initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span
                  className='inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border'
                  style={{
                    backgroundColor: `${data.color}20`,
                    borderColor: `${data.color}40`,
                    color: data.color,
                  }}
                >
                  {data.category}
                </span>
              </m.div>

              <m.h1
                className='text-[clamp(2.5rem,8vw,5rem)] font-bold text-white leading-[0.95] mb-4'
                initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                {data.name}
              </m.h1>

              <m.p
                className='text-[clamp(1rem,2.5vw,1.5rem)] text-white/70 max-w-2xl'
                initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {data.tagline}
              </m.p>
            </div>
          </m.div>
        </div>

        {/* Meta bar */}
        <div className='border-b border-white/10 bg-[var(--bg-glass)]'>
          <div className='max-w-6xl mx-auto px-[clamp(1rem,5vw,4rem)] py-6 grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[
              { label: 'Role', value: data.role },
              { label: 'Year', value: data.year },
              { label: 'Status', value: data.status },
              { label: 'Stack', value: data.stack.join(', ') },
            ].map((item, i) => (
              <m.div
                key={item.label}
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className='text-xs uppercase tracking-[0.2em] text-white/40 block mb-1'>
                  {item.label}
                </span>
                <span className='text-sm font-medium text-white'>{item.value}</span>
              </m.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='max-w-4xl mx-auto px-[clamp(1rem,5vw,4rem)]'>
          {/* Problem */}
          <m.section
            className='py-[clamp(3rem,8vw,6rem)]'
            variants={prefersReduced ? {} : staggerContainer(0.1, 0.2)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.3 }}
          >
            <m.h2
              variants={fadeIn('up', 'spring', 0, 0.6)}
              className='text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white mb-8'
            >
              <span className='text-white/30 font-mono text-sm mr-3'>01</span>
              {t('caseStudy.problem', 'O Problema')}
            </m.h2>
            <m.p
              variants={fadeIn('up', 'spring', 0.1, 0.6)}
              className='text-[clamp(0.95rem,2vw,1.125rem)] text-white/70 leading-relaxed'
            >
              {data.problem}
            </m.p>
          </m.section>

          {/* Process */}
          <m.section
            className='py-[clamp(3rem,8vw,6rem)] border-t border-white/5'
            variants={prefersReduced ? {} : staggerContainer(0.1, 0.2)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.3 }}
          >
            <m.h2
              variants={fadeIn('up', 'spring', 0, 0.6)}
              className='text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white mb-8'
            >
              <span className='text-white/30 font-mono text-sm mr-3'>02</span>
              {t('caseStudy.process', 'O Processo')}
            </m.h2>
            <div className='space-y-6'>
              {data.process.map((step, i) => (
                <m.div
                  key={i}
                  variants={fadeIn('up', 'spring', i * 0.1, 0.6)}
                  className='flex gap-4 items-start'
                >
                  <span
                    className='flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mt-1'
                    style={{ backgroundColor: `${data.color}20`, color: data.color }}
                  >
                    {i + 1}
                  </span>
                  <p className='text-[clamp(0.9rem,1.8vw,1.05rem)] text-white/70 leading-relaxed'>
                    {step}
                  </p>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* Solution */}
          <m.section
            className='py-[clamp(3rem,8vw,6rem)] border-t border-white/5'
            variants={prefersReduced ? {} : staggerContainer(0.1, 0.2)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.3 }}
          >
            <m.h2
              variants={fadeIn('up', 'spring', 0, 0.6)}
              className='text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white mb-8'
            >
              <span className='text-white/30 font-mono text-sm mr-3'>03</span>
              {t('caseStudy.solution', 'A Solução')}
            </m.h2>
            <m.p
              variants={fadeIn('up', 'spring', 0.1, 0.6)}
              className='text-[clamp(0.95rem,2vw,1.125rem)] text-white/70 leading-relaxed'
            >
              {data.solution}
            </m.p>
          </m.section>

          {/* Results */}
          {data.results.length > 0 && (
            <m.section
              className='py-[clamp(3rem,8vw,6rem)] border-t border-white/5'
              variants={prefersReduced ? {} : staggerContainer(0.1, 0.2)}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true, amount: 0.3 }}
            >
              <m.h2
                variants={fadeIn('up', 'spring', 0, 0.6)}
                className='text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white mb-8'
              >
                <span className='text-white/30 font-mono text-sm mr-3'>04</span>
                {t('caseStudy.results', 'Resultados')}
              </m.h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {data.results.map((result, i) => (
                  <m.div
                    key={i}
                    variants={fadeIn('up', 'spring', i * 0.1, 0.6)}
                    className='p-6 rounded-2xl bg-white/[0.03] border border-white/5'
                  >
                    <p className='text-[clamp(0.9rem,1.8vw,1.05rem)] text-white/70'>
                      {result}
                    </p>
                  </m.div>
                ))}
              </div>
            </m.section>
          )}

          {/* Behind the scenes */}
          <m.section
            className='py-[clamp(3rem,8vw,6rem)] border-t border-white/5'
            initial={prefersReduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className='text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white mb-8'>
              <span className='text-white/30 font-mono text-sm mr-3'>05</span>
              {t('caseStudy.behindTheScenes', 'Behind the Scenes')}
            </h2>
            <div className='prose prose-invert max-w-none text-[clamp(0.9rem,1.8vw,1.05rem)] text-white/70 leading-relaxed'>
              {data.behindTheScenes}
            </div>
          </m.section>

          {children}
        </div>

        {/* Next/Prev project */}
        <div className='border-t border-white/10'>
          <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2'>
            {data.prevProject && (
              <Link
                to={`/projetos/${data.prevProject.id}`}
                className='group p-[clamp(2rem,6vw,4rem)] flex items-center gap-4 hover:bg-white/[0.02] transition-colors'
              >
                <span className='text-white/30 text-sm'>&larr;</span>
                <div>
                  <span className='text-xs uppercase tracking-[0.2em] text-white/40'>
                    {t('caseStudy.previous', 'Anterior')}
                  </span>
                  <p
                    className='text-lg font-bold group-hover:opacity-100 opacity-80 transition-opacity'
                    style={{ color: data.prevProject.color }}
                  >
                    {data.prevProject.name}
                  </p>
                </div>
              </Link>
            )}
            {data.nextProject && (
              <Link
                to={`/projetos/${data.nextProject.id}`}
                className='group p-[clamp(2rem,6vw,4rem)] flex items-center gap-4 justify-end text-right hover:bg-white/[0.02] transition-colors md:border-l border-white/5'
              >
                <div>
                  <span className='text-xs uppercase tracking-[0.2em] text-white/40'>
                    {t('caseStudy.next', 'Próximo')}
                  </span>
                  <p
                    className='text-lg font-bold group-hover:opacity-100 opacity-80 transition-opacity'
                    style={{ color: data.nextProject.color }}
                  >
                    {data.nextProject.name}
                  </p>
                </div>
                <span className='text-white/30 text-sm'>&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </article>
    </PageTransition>
  );
};

export default CaseStudyLayout;
