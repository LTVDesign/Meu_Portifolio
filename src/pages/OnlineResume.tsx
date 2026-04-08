import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiMapPin,
  FiDownload,
  FiPrinter,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiZap,
  FiGlobe,
  FiCheckCircle,
  FiStar
} from 'react-icons/fi';
import { experiences, technologies, projects } from '../constants';
import cursosData from '../data/cursos.json';

const OnlineResume = () => {
  const { t, i18n } = useTranslation();
  const resumeRef = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.language.startsWith('pt') ? 'pt' : 'en') as 'pt' | 'en';
  const allCourses = (cursosData[currentLang] || cursosData.en) as any[];

  // Professional Certificates
  const professionalCerts = allCourses.filter(c => c.isProfessionalCertificate);

  // Group technologies
  const techCategories = technologies.reduce((acc, tech) => {
    const category = tech.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tech.name);
    return acc;
  }, {} as Record<string, string[]>);

  const handlePrint = () => window.print();

  return (
    <div className='min-h-screen bg-[#050816] text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8'>
      <Helmet>
        <title>{t('common.name')} | {t('allCurriculo.title')}</title>
        <meta name="description" content={t('hero.descriptionMeta')} />
      </Helmet>

      {/* Toolbar */}
      <div className='max-w-5xl mx-auto mb-8 flex justify-end gap-4 print:hidden relative z-10'>
        <button
          onClick={handlePrint}
          className='flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm'
        >
          <FiPrinter className="text-[var(--cyber-cyan)]" /> {t('common.print', 'Imprimir')}
        </button>
        <a
          href='/formacao/DiplomaDigital.pdf'
          download
          className='flex items-center gap-2 px-4 py-2 bg-[var(--cyber-purple)] hover:opacity-90 text-white rounded-lg transition-all text-sm shadow-lg shadow-[var(--cyber-purple)]/20'
        >
          <FiDownload /> {t('allCurriculo.downloadCV', 'Download PDF')}
        </a>
      </div>

      <m.div
        ref={resumeRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm print:bg-white print:text-black print:border-none print:shadow-none print:rounded-none'
      >
        {/* Header */}
        <div className='bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] p-8 sm:p-12 text-white print:bg-none print:bg-white print:text-black print:border-b-4 print:border-black'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8'>
            <div className='flex-1'>
              <h1 className='text-4xl sm:text-6xl font-black mb-3 tracking-tight'>{t('common.name')}</h1>
              <p className='text-xl sm:text-2xl text-white/90 font-medium tracking-wide'>
                {t('about.p')}
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-sm font-medium'>
              <a href={`mailto:${t('common.email')}`} className='flex items-center gap-3 hover:text-white/80 transition-colors'>
                <div className='p-2 bg-white/10 rounded-lg print:hidden'><FiMail /></div> {t('common.email')}
              </a>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-white/10 rounded-lg print:hidden'><FiPhone /></div> +55 11 98483-8629
              </div>
              <a href="https://linkedin.com/in/lelebrr" target="_blank" className='flex items-center gap-3 hover:text-white/80 transition-colors'>
                <div className='p-2 bg-white/10 rounded-lg print:hidden'><FiLinkedin /></div> linkedin.com/in/lelebrr
              </a>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-white/10 rounded-lg print:hidden'><FiMapPin /></div> São Paulo, SP
              </div>
            </div>
          </div>
        </div>

        <div className='p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12'>
          {/* Column Left (Main) */}
          <div className='lg:col-span-8 space-y-16'>
            {/* Summary */}
            <section className='print-section'>
              <h2 className='text-2xl font-black flex items-center gap-3 mb-8 text-[var(--cyber-cyan)] uppercase tracking-widest print:text-black print:border-b-2 print:border-black print:pb-2'>
                <FiBookOpen className="text-xl" /> {t('about.h2')}
              </h2>
              <div className='text-gray-300 leading-relaxed text-lg print:text-black space-y-4'>
                <p className='whitespace-pre-line'>{t('about.content')}</p>
              </div>
            </section>

            {/* Work Experience */}
            <section className='print-section'>
              <h2 className='text-2xl font-black flex items-center gap-3 mb-10 text-[var(--cyber-cyan)] uppercase tracking-widest print:text-black print:border-b-2 print:border-black print:pb-2'>
                <FiBriefcase className="text-xl" /> {t('experience.h2')}
              </h2>
              <div className='space-y-12'>
                {experiences.map((exp, index) => (
                  <div key={index} className='relative pl-10 border-l-2 border-[var(--cyber-purple)]/30 print:border-black/20 page-break-inside-avoid'>
                    <div className='absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--cyber-purple)] shadow-[0_0_10px_rgba(151,71,255,0.5)] print:bg-black print:shadow-none' />
                    <div className='mb-6'>
                      <h3 className='text-2xl font-black text-white print:text-black'>{t(exp.title)}</h3>
                      <div className='flex flex-wrap items-center gap-4 text-sm mt-2'>
                        <span className='font-bold text-[var(--cyber-cyan)] print:text-gray-700'>{t(exp.companyName)}</span>
                        <span className='hidden sm:inline w-1 h-1 bg-white/20 rounded-full' />
                        <span className='text-gray-400 font-mono print:text-gray-600'>{t(exp.date)}</span>
                      </div>
                    </div>
                    <ul className='grid grid-cols-1 gap-3'>
                      {exp.points.map((point, pIndex) => (
                        <li key={pIndex} className='text-gray-400 print:text-black text-[15px] leading-relaxed flex gap-3'>
                          <FiCheckCircle className='mt-1 flex-shrink-0 text-[var(--cyber-purple)] print:text-black opacity-60' />
                          <span>{t(point)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Projects */}
            <section className='print-section'>
              <h2 className='text-2xl font-black flex items-center gap-3 mb-10 text-[var(--cyber-cyan)] uppercase tracking-widest print:text-black print:border-b-2 print:border-black print:pb-2'>
                <FiZap className="text-xl" /> {t('works.h2')}
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {projects.slice(0, 4).map((project, index) => (
                  <div key={index} className='p-6 bg-white/5 border border-white/10 rounded-2xl print:border-black/10 print:bg-white print:p-4'>
                    <div className='flex justify-between items-start mb-3'>
                      <h3 className='font-bold text-lg'>{project.name}</h3>
                      <span className='text-[10px] uppercase font-black text-[var(--cyber-cyan)] bg-[var(--cyber-cyan)]/10 px-2 py-0.5 rounded'>
                        {project.category}
                      </span>
                    </div>
                    <p className='text-sm text-gray-400 print:text-black leading-relaxed mb-4'>
                      {t(project.description)}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className='text-[10px] font-mono text-[var(--cyber-purple)] uppercase'>
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Column Right (Sidebar) */}
          <div className='lg:col-span-4 space-y-16 lg:border-l lg:border-white/10 lg:pl-12 print:border-black/10 print:pl-8'>
            {/* Technical Skills */}
            <section>
              <h3 className='text-xl font-black flex items-center gap-3 mb-8 text-[var(--cyber-cyan)] uppercase tracking-widest print:text-black'>
                <FiCode className="text-xl" /> {t('tech.technologiesTitle')}
              </h3>
              <div className='space-y-8'>
                {Object.entries(techCategories).map(([cat, techs]) => (
                  <div key={cat} className='space-y-4'>
                    <h4 className='text-xs font-black uppercase tracking-[0.3em] text-[var(--cyber-purple)]/80 print:text-black'>
                      {t(cat)}
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {techs.map((name, i) => (
                        <span key={i} className='px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-medium print:border-black/20 print:text-black'>
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Soft Skills & Methodologies (NEW) */}
            <section>
              <h3 className='text-xl font-black flex items-center gap-3 mb-8 text-[var(--cyber-cyan)] uppercase tracking-widest print:text-black'>
                <FiStar className="text-xl" /> {t('skills.softSkills', 'Soft Skills')}
              </h3>
              <div className='flex flex-wrap gap-3'>
                {['Resiliência', 'Liderança', 'Comunicação', 'Gestão de Tempo', 'Metodologias Ágeis', 'Scrum', 'Kanban'].map(skill => (
                  <span key={skill} className='px-3 py-1 bg-[var(--cyber-purple)]/10 border border-[var(--cyber-purple)]/20 text-[var(--cyber-purple)] rounded-full text-[11px] font-bold print:text-black print:border-black/20'>
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section>
              <h3 className='text-xl font-black flex items-center gap-3 mb-8 text-[var(--cyber-cyan)] uppercase tracking-widest print:text-black'>
                <FiGlobe className="text-xl" /> {t('common.language')}
              </h3>
              <div className='space-y-4'>
                <div className='flex justify-between items-center bg-white/5 p-3 rounded-lg print:border print:border-black/10'>
                  <span className='font-bold'>{currentLang === 'pt' ? 'Português' : 'Portuguese'}</span>
                  <span className='text-[10px] font-black uppercase bg-[var(--cyber-purple)] px-2 py-0.5 rounded'>{currentLang === 'pt' ? 'Nativo' : 'Native'}</span>
                </div>
                <div className='flex justify-between items-center bg-white/5 p-3 rounded-lg print:border print:border-black/10'>
                  <span className='font-bold'>{currentLang === 'pt' ? 'Inglês' : 'English'}</span>
                  <span className='text-[10px] font-black uppercase bg-white/10 px-2 py-0.5 rounded'>{currentLang === 'pt' ? 'Intermediário' : 'Intermediate'}</span>
                </div>
              </div>
            </section>

            {/* Professional Certifications */}
            <section className='page-break-inside-avoid'>
              <h3 className='text-xl font-black flex items-center gap-3 mb-8 text-[var(--cyber-cyan)] uppercase tracking-widest print:text-black'>
                <FiAward className="text-xl" /> {t('allCursos.title')}
              </h3>
              <div className='space-y-6'>
                {professionalCerts.map(cert => (
                  <div key={cert.id} className='group border-l-2 border-white/10 pl-4 py-1 hover:border-[var(--cyber-cyan)] transition-colors print:border-black/20'>
                    <h4 className='font-bold text-sm leading-tight text-white/90 group-hover:text-[var(--cyber-cyan)] print:text-black'>{cert.title}</h4>
                    <p className='text-[10px] mt-1 text-gray-500 font-medium print:text-black'>{cert.platform} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className='page-break-inside-avoid'>
              <h3 className='text-xl font-black flex items-center gap-3 mb-8 text-[var(--cyber-cyan)] uppercase tracking-widest print:text-black text-xs sm:text-lg'>
                <FiBookOpen className="text-xl" /> {t('formacao.h2')}
              </h3>
              <div className='space-y-6'>
                <div className='border-l-2 border-white/10 pl-4 print:border-black/20'>
                  <h4 className='font-bold text-sm leading-tight'>{t('education.postgraduateTitle', 'Pós-Graduação em IA & Data Science')}</h4>
                  <p className='text-[10px] mt-1 text-gray-400 print:text-black'>Anhanguera | {t('education.inProgress', 'Cursando')}</p>
                </div>
                <div className='border-l-2 border-white/10 pl-4 print:border-black/20'>
                  <h4 className='font-bold text-sm leading-tight'>{t('education.technologist', 'Tecnólogo em ADS')}</h4>
                  <p className='text-[10px] mt-1 text-gray-400 print:text-black'>Unopar Anhanguera | 2025</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer print only */}
        <div className='hidden print:block p-8 text-center text-[10px] text-gray-500 border-t border-gray-100'>
          <p>{currentLang === 'pt' ? 'Este currículo foi gerado digitalmente em' : 'This resume was digitally generated on'} {new Date().toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : 'en-US')}</p>
          <p className='font-bold mt-1'>leandrobarbosa.dev</p>
        </div>
      </m.div>

      {/* Page Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        :root {
          --cyber-purple: #9747FF;
          --cyber-cyan: #00F0FF;
        }

        body { font-family: 'Plus Jakarta Sans', sans-serif; }

        @media print {
          body { background: white !important; color: black !important; padding: 0 !important; margin: 0 !important; }
          .print-section { page-break-inside: avoid; margin-bottom: 2rem !important; }
          .bg-gradient-to-r { background: none !important; color: black !important; }
          .print\\:hidden { display: none !important; }
          h1, h2, h3, h4 { color: black !important; border-color: black !important; }
          p, span, li { color: black !important; }
          .border-white\\/10 { border-color: #eee !important; }
          .page-break-inside-avoid { page-break-inside: avoid; }
        }

        @keyframes subtle-fade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        section { animation: subtle-fade 0.6s ease-out forwards; }
      `}} />
    </div>
  );
};

export default OnlineResume;
