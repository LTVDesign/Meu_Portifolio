import { m } from 'framer-motion';
import { useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import {
  FiAward,
  FiBook,
  FiDownload,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPrinter,
} from 'react-icons/fi';
import cvFile from '../assets/docs/Leandro_Barbosa_curriculo.pdf';
import { experiences, projects, technologies } from '../constants';
import cursosData from '../data/cursos.json';

const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right',
  type: string,
  delay: number,
  duration: number
) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

const staggerContainer = (staggerChildren?: number, delayChildren?: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren: delayChildren || 0,
    },
  },
});

const OnlineResume = () => {
  const { t, i18n } = useTranslation();

  const currentLang = useMemo(
    () => (i18n.language.startsWith('pt') ? 'pt' : 'en') as 'pt' | 'en',
    [i18n.language]
  );
  const allCourses = useMemo(
    () => (cursosData[currentLang] || cursosData.en) as any[],
    [currentLang]
  );

  const handlePrint = useCallback(() => window.print(), []);

  return (
    <div className='min-h-screen bg-[#050816] text-white pt-[clamp(6rem,12vw,8rem)] pb-[clamp(4rem,8vw,6rem)] px-[clamp(1rem,5vw,2rem)] overflow-x-hidden relative'>
      {/* Background Decorativo */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 print:hidden'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--cyber-cyan)] blur-[150px] rounded-full' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--cyber-purple)] blur-[150px] rounded-full' />
      </div>

      <Helmet>
        <title>
          {t('common.name')} | {t('allCurriculo.title')}
        </title>
        <meta name='description' content={t('hero.descriptionMeta')} />
      </Helmet>

      {/* Banner de Aviso & Toolbar */}
      <m.div
        variants={fadeIn('down', 'tween', 0.1, 0.8)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='max-w-6xl mx-auto mb-12 bg-white/5 backdrop-blur-xl border border-white/10 p-[clamp(1.5rem,4vw,2rem)] rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-8 print:hidden relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
      >
        <div className='flex-1 text-center lg:text-left'>
          <h3 className='text-[clamp(1.25rem,3vw,1.5rem)] font-black mb-3 flex items-center justify-center lg:justify-start gap-3 bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] bg-clip-text text-transparent'>
            🚀 {t('allCurriculo.bannerTitle', 'Portal de Currículo Interativo')}
          </h3>
          <p className='text-[clamp(0.9rem,1.8vw,1.05rem)] text-gray-300 leading-relaxed font-medium max-w-2xl'>
            {t(
              'allCurriculo.bannerText',
              'Esta página é uma experiência imersiva com meu arsenal completo.'
            )}
            <br />
            {t(
              'allCurriculo.bannerSubtext',
              'Para apresentações formais, utilize as ferramentas de exportação ao lado.'
            )}
          </p>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-4 shrink-0'>
          <button
            onClick={handlePrint}
            className='flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-500 hover:shadow-[0_10px_30px_rgba(0,240,255,0.3)] text-white rounded-2xl transition-all text-sm font-extrabold active:scale-95'
          >
            <FiPrinter className='text-lg' />
            {t('common.print', 'Imprimir')}
          </button>

          <a
            href={cvFile}
            download='Leandro_Barbosa_curriculo.pdf'
            className='flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[var(--cyber-purple)] to-blue-600 hover:shadow-[0_10px_30px_rgba(151,71,255,0.3)] text-white rounded-2xl transition-all text-sm font-extrabold active:scale-95'
          >
            <FiDownload className='text-lg' />
            {t('allCurriculo.downloadCv', 'Download do Currículo')}
          </a>
        </div>
      </m.div>

      {/* Conteúdo Principal Estilizado */}
      <m.div
        variants={staggerContainer(0.1)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='max-w-6xl mx-auto space-y-12 relative z-10 online-content print:hidden'
      >
        {/* Header Visual */}
        <m.section
          variants={fadeIn('up', 'spring', 0.2, 1)}
          className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-[clamp(2rem,6vw,4rem)] overflow-hidden relative'
        >
          <div className='absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--cyber-cyan)] to-[var(--cyber-purple)]' />

          <div className='lg:col-span-2 space-y-6'>
            <div>
              <m.h1 className='text-[clamp(2.5rem,8vw,4.5rem)] font-black leading-tight tracking-tighter bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent'>
                Leandro Barbosa
              </m.h1>
              <p className='text-[clamp(1.1rem,3vw,1.6rem)] font-bold text-[var(--cyber-cyan)] mt-2 uppercase tracking-[0.2em]'>
                {t('allCurriculo.role', 'Software Engineer')}
              </p>
            </div>

            <p className='text-gray-400 text-lg leading-relaxed max-w-2xl font-medium'>
              {t('allCurriculo.shortSummary')}
            </p>

            <div className='flex flex-wrap gap-6'>
              <a
                href='https://wa.me/5511984838629'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 text-gray-300 hover:text-[var(--cyber-cyan)] transition-colors group'
              >
                <div className='w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[var(--cyber-cyan)]/50 transition-all'>
                  <FaWhatsapp className='text-xl' />
                </div>
                <div>
                  <p className='text-xs text-gray-500 font-bold uppercase tracking-widest'>
                    WhatsApp
                  </p>
                  <p className='font-bold'>+55 11 98483-8629</p>
                </div>
              </a>
              <a
                href='https://www.linkedin.com/in/lelebrr'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 text-gray-300 hover:text-[var(--cyber-purple)] transition-colors group'
              >
                <div className='w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[var(--cyber-purple)]/50 transition-all'>
                  <FiLinkedin className='text-xl' />
                </div>
                <div>
                  <p className='text-xs text-gray-500 font-bold uppercase tracking-widest'>
                    LinkedIn
                  </p>
                  <p className='font-bold'>/in/lelebrr</p>
                </div>
              </a>
              <div className='flex items-center gap-3 text-gray-300 hover:text-white transition-colors group'>
                <div className='w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all'>
                  <FiMapPin className='text-xl' />
                </div>
                <div>
                  <p className='text-xs text-gray-500 font-bold uppercase tracking-widest'>
                    {t('allCurriculo.locationLabel', 'Location')}
                  </p>
                  <p className='font-bold text-gray-200'>
                    {t('allCurriculo.location', 'São Paulo, SP')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center h-full'>
            <div className='relative group'>
              <div className='absolute -inset-4 bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse' />
              <div className='relative bg-[#050816] border border-white/10 rounded-[2rem] p-6 shadow-2xl flex flex-col items-center justify-center'>
                <img
                  src='/assets/images/eu-hM19CCeb.webp'
                  alt='Foto'
                  className='w-40 h-40 object-cover rounded-full transition-all duration-500'
                />
              </div>
            </div>
          </div>
        </m.section>

        {/* Arsenal & Competências - Grid Moderno */}
        <m.section variants={fadeIn('up', 'spring', 0.3, 1)} className='space-y-8'>
          <div className='flex items-center gap-4'>
            <h2 className='text-3xl font-black uppercase tracking-tighter'>
              {t('allCurriculo.skillsTitle', 'Arsenal Técnico')}
            </h2>
            <div className='h-[2px] flex-1 bg-gradient-to-r from-[var(--cyber-cyan)] to-transparent opacity-30' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start'>
            {Object.entries(
              technologies.reduce(
                (acc, tech) => {
                  const category = t(tech.category);
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(tech.name);
                  return acc;
                },
                {} as Record<string, string[]>
              )
            ).map(([category, skills], idx) => (
              <m.div
                key={category}
                variants={fadeIn('up', 'spring', 0.1 * idx, 0.75)}
                className='group bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all hover:-translate-y-2 relative overflow-hidden'
              >
                <div className='absolute -top-2 -right-2 p-4 opacity-10 group-hover:opacity-30 transition-opacity'>
                  <FiAward className='text-5xl text-[var(--cyber-cyan)]' />
                </div>
                <h4 className='text-xl font-black mb-6 flex items-center gap-3 text-white uppercase tracking-wider'>
                  <span className='w-2 h-6 bg-[var(--cyber-cyan)] rounded-full' />
                  {category}
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className='px-4 py-2 bg-white/5 border border-white/5 rounded-full text-xs font-bold text-gray-300 hover:text-[var(--cyber-cyan)] hover:border-[var(--cyber-cyan)]/30 transition-all cursor-default'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* Experiência - Timeline Visual */}
        <m.section variants={fadeIn('up', 'spring', 0.4, 1)} className='space-y-12'>
          <div className='flex items-center gap-4'>
            <h2 className='text-3xl font-black uppercase tracking-tighter'>
              {t('allCurriculo.experienceTitle', 'Carreira Profissional')}
            </h2>
            <div className='h-[2px] flex-1 bg-gradient-to-r from-[var(--cyber-purple)] to-transparent opacity-30' />
          </div>

          <div className='space-y-8'>
            {experiences.map((exp, index) => (
              <m.div
                key={index}
                variants={fadeIn('left', 'spring', 0.2 * index, 0.75)}
                className='relative pl-12 group'
              >
                <div className='absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[var(--cyber-purple)] to-blue-900 group-last:h-12 opacity-50' />
                <div className='absolute left-[-6px] top-6 w-3.5 h-3.5 rounded-full bg-[var(--cyber-purple)] shadow-[0_0_15px_rgba(151,71,255,1)] group-hover:scale-150 transition-transform' />

                <div className='bg-white/5 border border-white/10 rounded-[2.5rem] p-[clamp(1.5rem,4vw,2.5rem)] hover:bg-white/[0.08] transition-all relative overflow-hidden group-hover:shadow-[0_20px_50px_rgba(151,71,255,0.05)]'>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
                    <div>
                      <h3 className='text-2xl font-black text-white mb-1'>
                        {t(exp.title)}
                      </h3>
                      <p className='text-[var(--cyber-purple)] font-black uppercase tracking-widest text-sm'>
                        {t(exp.companyName)}
                      </p>
                    </div>
                    <span className='px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400'>
                      {t(exp.date)}
                    </span>
                  </div>

                  <ul className='space-y-4'>
                    {exp.points.map((point, pIndex) => (
                      <li
                        key={pIndex}
                        className='flex items-start gap-4 text-gray-400 group/item'
                      >
                        <span className='w-1.5 h-1.5 rounded-full bg-[var(--cyber-cyan)] mt-2 shrink-0 group-hover/item:scale-150 transition-transform' />
                        <span className='leading-relaxed font-medium group-hover/item:text-gray-200 transition-colors'>
                          {t(point)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            ))}
          </div>
        </m.section>

        {/* Formação & Acadêmico */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
          <m.section
            variants={fadeIn('right', 'spring', 0.5, 1)}
            className='space-y-8 p-10 bg-white/5 border border-white/10 rounded-[3rem] relative overflow-hidden'
          >
            <div className='absolute top-0 right-0 p-10 opacity-5'>
              <FiBook className='text-[10rem] text-[var(--cyber-cyan)]' />
            </div>
            <h2 className='text-2xl font-black uppercase tracking-tighter flex items-center gap-3'>
              <FiBook className='text-[var(--cyber-cyan)]' />{' '}
              {t('allCurriculo.academicsTitle', 'Formação Acadêmica')}
            </h2>
            <div className='space-y-8'>
              <div className='relative pl-6 border-l-2 border-[var(--cyber-cyan)]/30'>
                <h4 className='text-xl font-bold mb-2'>
                  {t('allCurriculo.posGradTitle')}
                </h4>
                <p className='text-gray-400 font-medium'>
                  Anhanguera |{' '}
                  <span className='text-[var(--cyber-cyan)] uppercase text-xs font-black'>
                    {t('allCurriculo.currentlyStudying', 'Cursando')}
                  </span>
                </p>
                <p className='text-gray-500 text-sm mt-1'>
                  Início: 10/03/2026 — Previsão: 04/01/2027
                </p>
              </div>
              <div className='relative pl-6 border-l-2 border-white/10'>
                <h4 className='text-xl font-bold mb-2'>{t('allCurriculo.adsTitle')}</h4>
                <p className='text-gray-400 font-medium'>Anhanguera | Dez 2025</p>
                <div className='mt-3 flex gap-4 text-xs font-mono text-gray-500'>
                  <span>CR: 10.0</span>
                  <span>CH: 2100h</span>
                </div>
              </div>
            </div>
          </m.section>

          <m.section
            variants={fadeIn('left', 'spring', 0.6, 1)}
            className='space-y-8 p-10 bg-white/5 border border-white/10 rounded-[3rem]'
          >
            <h2 className='text-2xl font-black uppercase tracking-tighter flex items-center gap-3'>
              <FiAward className='text-[var(--cyber-purple)]' />{' '}
              {t('allCurriculo.specializationsTitle', 'Especializações')}
            </h2>
            <div className='space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-4'>
              {allCourses.map((course) => (
                <div
                  key={course.id}
                  className='p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all border-l-4 border-l-transparent hover:border-l-[var(--cyber-purple)] group cursor-default'
                >
                  <h5 className='font-bold group-hover:text-[var(--cyber-purple)] transition-colors'>
                    {course.title}
                  </h5>
                  <div className='flex justify-between items-center mt-2'>
                    <span className='text-xs text-gray-500 font-bold uppercase'>
                      {course.platform}
                    </span>
                    <span className='text-[10px] text-gray-600'>{course.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </m.section>
        </div>
      </m.div>

      {/* Versão para impressão - Clean & Professional */}
      <div className='hidden print:block print-content p-0 m-0 text-gray-900'>
        {/* Header Colorido */}
        <div className='flex justify-between items-start mb-8 pb-6 border-b-4 border-[var(--cyber-cyan)]'>
          <div className='space-y-4'>
            <div>
              <h1 className='text-4xl font-black text-[#050816] mb-1 uppercase tracking-tighter'>
                Leandro Barbosa
              </h1>
              <p className='text-lg font-extrabold text-[var(--cyber-purple)] uppercase tracking-widest'>
                {t('allCurriculo.role')}
              </p>
            </div>

            <div className='grid grid-cols-2 gap-y-2 gap-x-12 text-[10.5pt] font-medium'>
              <span className='flex items-center gap-2'>
                <FiMail className='text-[var(--cyber-purple)]' /> lelebrr@gmail.com
              </span>
              <span className='flex items-center gap-2'>
                <FaWhatsapp className='text-[var(--cyber-purple)]' /> +55 11 98483-8629
              </span>
              <span className='flex items-center gap-2'>
                <FiLinkedin className='text-[var(--cyber-purple)]' />{' '}
                linkedin.com/in/lelebrr
              </span>
              <span className='flex items-center gap-2'>
                <FiMapPin className='text-[var(--cyber-purple)]' />{' '}
                {t('allCurriculo.location')}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <img
              src='/assets/images/eu-hM19CCeb.webp'
              alt='Foto'
              className='w-24 h-24 object-cover rounded-full border-2 border-[var(--cyber-cyan)] p-1'
            />
          </div>
        </div>

        <div className='space-y-8'>
          {/* Sumário */}
          <section>
            <h2 className='text-xl font-black bg-[var(--cyber-cyan)]/10 text-[#050816] px-4 py-2 mb-4 border-l-[6px] border-[var(--cyber-cyan)] uppercase tracking-tight'>
              {t('allCurriculo.summaryTitle', 'Sumário Profissional')}
            </h2>
            <p className='text-[10.5pt] leading-relaxed text-gray-800 font-medium'>
              {t('allCurriculo.summary')}
            </p>
          </section>

          {/* Arsenal */}
          <section>
            <h2 className='text-xl font-black bg-[var(--cyber-purple)]/10 text-[#050816] px-4 py-2 mb-6 border-l-[6px] border-[var(--cyber-purple)] uppercase tracking-tight'>
              {t('allCurriculo.skillsTitle')}
            </h2>
            <div className='grid grid-cols-3 gap-6'>
              {Object.entries(
                technologies.reduce(
                  (acc, tech) => {
                    const category = t(tech.category);
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(tech.name);
                    return acc;
                  },
                  {} as Record<string, string[]>
                )
              ).map(([category, skills]) => (
                <div key={category} className='break-inside-avoid'>
                  <h4 className='text-[10pt] font-black mb-3 uppercase border-b-2 border-gray-100 text-[var(--cyber-purple)]'>
                    {category}
                  </h4>
                  <div className='flex flex-wrap gap-1.5'>
                    {skills.map((s) => (
                      <span
                        key={s}
                        className='text-[8.5pt] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md font-bold text-gray-700'
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experiência */}
          <section>
            <h2 className='text-xl font-black bg-[#050816] text-white px-4 py-2 mb-6 border-l-[6px] border-[var(--cyber-cyan)] uppercase tracking-tight'>
              {t('allCurriculo.experienceTitle')}
            </h2>
            <div className='space-y-6'>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className='break-inside-avoid relative pl-5 border-l-2 border-gray-100'
                >
                  <div className='absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[var(--cyber-cyan)]' />
                  <div className='flex justify-between items-baseline mb-2'>
                    <h3 className='font-black text-[11pt] text-[#050816] uppercase'>
                      {t(exp.title)}
                    </h3>
                    <span className='text-[9pt] font-bold text-[var(--cyber-purple)] bg-[var(--cyber-purple)]/5 px-3 py-0.5 rounded-full'>
                      {t(exp.date)}
                    </span>
                  </div>
                  <p className='text-[9.5pt] font-black text-gray-600 mb-3 uppercase tracking-wider'>
                    {t(exp.companyName)}
                  </p>
                  <ul className='space-y-1.5'>
                    {exp.points.map((p, pi) => (
                      <li
                        key={pi}
                        className='text-[9.5pt] text-gray-700 leading-tight flex items-start gap-2'
                      >
                        <span className='text-[var(--cyber-cyan)] mt-0.5'>•</span>
                        {t(p)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projetos & Certificações */}
          <section className='break-before-page pt-8'>
            <h2 className='text-xl font-black bg-gray-100 text-[#050816] px-4 py-2 mb-6 border-l-[6px] border-black uppercase tracking-tight'>
              {t('allCurriculo.highlightsTitle')}
            </h2>
            <div className='grid grid-cols-2 gap-12'>
              <div className='space-y-6'>
                <h3 className='text-[11pt] font-black text-[var(--cyber-purple)] border-b-2 border-[var(--cyber-purple)]/20 pb-2 uppercase'>
                  {t('allCurriculo.printProjectsTitle')}
                </h3>
                <div className='space-y-4 font-bold'>
                  {projects.slice(0, 3).map((p, i) => (
                    <div
                      key={i}
                      className='p-3 bg-gray-50 rounded-lg border border-gray-100'
                    >
                      <div className='flex justify-between items-baseline mb-1'>
                        <span className='text-[10pt] text-[#050816]'>{p.name}</span>
                        <span className='text-[7pt] text-[var(--cyber-purple)] uppercase italic'>
                          {t(`works.${p.category}`)}
                        </span>
                      </div>
                      <p className='text-[8.5pt] text-gray-600 font-medium leading-tight'>
                        {t(p.description)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='space-y-6'>
                <h3 className='text-[11pt] font-black text-[var(--cyber-cyan)] border-b-2 border-[var(--cyber-cyan)]/20 pb-2 uppercase'>
                  {t('allCurriculo.academicsAndLanguages')}
                </h3>
                <div className='space-y-4'>
                  <div>
                    <p className='font-black text-[10pt] text-[#050816]'>
                      {t('allCurriculo.posGradTitle')}
                    </p>
                    <p className='text-[9pt] text-gray-600'>Anhanguera | 2026</p>
                  </div>
                  <div>
                    <p className='font-black text-[10pt] text-[#050816]'>
                      {t('allCurriculo.adsTitle')}
                    </p>
                    <p className='text-[9pt] text-gray-600'>Anhanguera | Dezembro 2025</p>
                  </div>
                </div>
                <div className='flex flex-wrap gap-2 pt-2'>
                  {[
                    'Inglês Intermediário',
                    'Scrum Master',
                    'Kanban',
                    'Azure Fundamentals',
                    'Ethical Hacking',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className='text-[9pt] font-bold border-2 border-gray-100 px-3 py-1 rounded-xl text-gray-700'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OnlineResume;
