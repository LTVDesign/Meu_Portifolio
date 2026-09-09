import { m, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import eu from '../../assets/images/eu.webp';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeIn, staggerContainer } from '../../utils/motion';

const milestones = [
  {
    year: '2018',
    title: 'Técnico de Informática',
    jp: '\u6280\u8853\u8005',
    description: 'Suporte técnico N2, infraestrutura e redes',
    side: 'left' as const,
  },
  {
    year: '2020',
    title: 'Web Master',
    jp: 'Web\u30DE\u30B9\u30BF\u30FC',
    description: 'Desenvolvimento web e gestão de conteúdo',
    side: 'right' as const,
  },
  {
    year: '2022',
    title: 'Tecnólogo em ADS',
    jp: '\u60C5\u5831\u30C6\u30AF\u30CE\u30ED\u30B8\u30B9\u30C8',
    description: 'Análise e Desenvolvimento de Sistemas',
    side: 'left' as const,
  },
  {
    year: '2023',
    title: 'Pós-Graduação em IA',
    jp: '\u4EBA\u5DE5\u77E5\u80FD',
    description: 'Inteligência Artificial & Data Science',
    side: 'right' as const,
  },
  {
    year: '2024',
    title: 'Full-Stack Developer',
    jp: '\u30D5\u30EB\u30B9\u30BF\u30C3\u30AF',
    description: 'Criando experiências imersivas com código',
    side: 'left' as const,
  },
];

const skills = [
  { name: 'React', level: 90, color: '#61DAFB' },
  { name: 'Node.js', level: 85, color: '#339933' },
  { name: 'TypeScript', level: 88, color: '#3178C6' },
  { name: 'Python', level: 80, color: '#3776AB' },
  { name: 'Three.js', level: 75, color: '#00FFFF' },
  { name: 'Cybersecurity', level: 82, color: '#FF6B35' },
];

const About = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const treeProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <div ref={sectionRef} className='w-full mx-auto px-[clamp(1rem,5vw,2rem)]'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,6vw,4rem)] items-start'>
        {/* Left: Image + Stats */}
        <m.div
          initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className='relative'
        >
          {/* Photo */}
          <div className='relative rounded-3xl overflow-hidden aspect-[4/5] mb-8'>
            <img
              src={eu}
              alt='Leandro Saturnino Barbosa'
              className='w-full h-full object-cover'
              loading='eager'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

            {/* Overlay name */}
            <div className='absolute bottom-6 left-6 right-6'>
              <h2 className='text-[clamp(1.5rem,4vw,2rem)] font-bold text-white mb-1'>
                Leandro Barbosa
              </h2>
              <p
                className='text-sm text-white/50'
                style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
              >
                {'\u30EC\u30A2\u30F3\u30C9\u30ED \u30D0\u30EB\u30DC\u30FC\u30B6'}
              </p>
            </div>
          </div>

          {/* Skills */}
          <m.div
            variants={prefersReduced ? {} : staggerContainer(0.08, 0.2)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.3 }}
            className='space-y-4'
          >
            {skills.map((skill) => (
              <m.div key={skill.name} variants={fadeIn('up', 'spring', 0, 0.5)}>
                <div className='flex justify-between items-center mb-1.5'>
                  <span className='text-xs font-medium text-white/70'>{skill.name}</span>
                  <span className='text-xs text-white/30 font-mono'>{skill.level}%</span>
                </div>
                <div className='h-1 bg-white/5 rounded-full overflow-hidden'>
                  <m.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    className='h-full rounded-full'
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </m.div>
            ))}
          </m.div>
        </m.div>

        {/* Right: Story + Timeline */}
        <div>
          {/* Header */}
          <m.div
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className='mb-[clamp(2rem,5vw,3rem)]'
          >
            <span
              className='text-xs text-white/20 uppercase tracking-[0.3em] block mb-3'
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              {'\u79C1\u306E\u7269\u8A9E'} &mdash; Sobre mim
            </span>
            <h2 className='text-[clamp(1.8rem,5vw,2.5rem)] font-bold text-white leading-tight mb-4'>
              {t('about.h2')}
            </h2>
            <p className='text-[clamp(0.9rem,1.8vw,1.05rem)] text-white/50 leading-relaxed'>
              {t('about.p')}
            </p>
          </m.div>

          {/* Bio text */}
          <m.div
            initial={prefersReduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='mb-[clamp(2rem,5vw,3rem)]'
          >
            <div className='text-[clamp(0.85rem,1.6vw,0.95rem)] text-white/60 leading-relaxed space-y-4'>
              {(t('about.content') as string).split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </m.div>

          {/* Timeline */}
          <div className='relative'>
            <m.h3
              initial={prefersReduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className='text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-8'
            >
              {t('about.timeline', 'Jornada')}
            </m.h3>

            {/* Timeline line */}
            <div className='absolute left-4 top-12 bottom-0 w-px bg-white/10'>
              <m.div
                className='w-full bg-gradient-to-b from-[var(--cyber-cyan)] to-[var(--cyber-purple)]'
                style={{ height: useTransform(treeProgress, [0, 1], ['0%', '100%']) }}
              />
            </div>

            {/* Milestones */}
            <div className='space-y-8'>
              {milestones.map((milestone, i) => (
                <m.div
                  key={milestone.year}
                  initial={
                    prefersReduced
                      ? {}
                      : { opacity: 0, x: milestone.side === 'left' ? -20 : 20 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className='relative pl-12'
                >
                  {/* Dot on timeline */}
                  <div className='absolute left-2.5 top-1 w-3 h-3 rounded-full bg-[var(--cyber-cyan)] border-2 border-black z-10' />

                  <div className='flex items-start gap-3'>
                    <div>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-xs font-mono text-[var(--cyber-cyan)]'>
                          {milestone.year}
                        </span>
                        <span
                          className='text-[10px] text-white/15'
                          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                        >
                          {milestone.jp}
                        </span>
                      </div>
                      <h4 className='text-sm font-bold text-white'>{milestone.title}</h4>
                      <p className='text-xs text-white/40 mt-0.5'>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
