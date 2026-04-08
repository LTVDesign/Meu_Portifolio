import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
  FiDownload,
  FiPrinter,
} from 'react-icons/fi';
import { experiences, technologies, projects } from '../constants';
import cursosData from '../data/cursos.json';

const OnlineResume = () => {
  const { t, i18n } = useTranslation();
oi para
  const currentLang = (i18n.language.startsWith('pt') ? 'pt' : 'en') as 'pt' | 'en';
  const allCourses = (cursosData[currentLang] || cursosData.en) as any[];

  const handlePrint = () => window.print();

  return (
    <div className='min-h-screen bg-[#050816] text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8'>
      <Helmet>
        <title>{t('common.name')} | {t('allCurriculo.title')}</title>
        <meta name="description" content={t('hero.descriptionMeta')} />
      </Helmet>

      {/* Toolbar - visível na tela online */}
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

      {/* Header com gradiente */}
      <div className='max-w-4xl mx-auto mb-0 p-8 rounded-t-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-5xl font-bold mb-3 text-black'>Leandro Barbosa</h1>
            <p className='text-2xl font-medium mb-2 text-black'>Engenheiro de Software • Tecnólogo em ADS • Pós-Graduando em IA & Data Science</p>
          </div>
          <div className='flex flex-col gap-3 text-right text-black'>
            <div className='flex items-center gap-3'>
              <span className='bg-white/20 p-2 rounded-full'>📧</span>
              <span className='text-lg'>lelebrr@gmail.com</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='bg-white/20 p-2 rounded-full'>📱</span>
              <span className='text-lg'>+55 11 98483-8629</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='bg-white/20 p-2 rounded-full'>💼</span>
              <span className='text-lg'>linkedin.com/in/lelebrr</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='bg-white/20 p-2 rounded-full'>📍</span>
              <span className='text-lg'>São Paulo, SP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Versão principal - otimizada para impressão (máx 2 páginas) */}
      <div className='max-w-4xl mx-auto bg-white text-black p-6 font-size-9'>
        {/* Cabeçalho com QR Code */}
        <div className='flex justify-between items-start mb-6'>
          <div>
            <h1 className='text-2xl font-bold mb-1' style={{ color: 'black' }}>Leandro Barbosa</h1>
            <p className='text-sm text-gray-700 mb-2' style={{ color: 'black' }}>Engenheiro de Software | Tecnólogo em ADS | Pós-Graduando IA & Data Science</p>
            <div className='text-xs space-y-1' style={{ color: 'black' }}>
              <div>📧 lelebrr@gmail.com | 📱 +55 11 98483-8629</div>
              <div>💼 linkedin.com/in/lelebrr | 📍 São Paulo, SP</div>
            </div>
          </div>
          <div className='flex-shrink-0'>
            <img
              src="/qrcode.png"
              alt="QR Code"
              className='w-16 h-16'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6'>
          {/* Sumário Profissional - Primeiro elemento para chamar atenção */}
          <div>
            <h2 className='text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1' style={{ color: 'black' }}>SUMÁRIO PROFISSIONAL</h2>
            <p className='text-sm text-gray-700 leading-relaxed' style={{ color: 'black' }}>
              Engenheiro de Software com formação em Tecnologia de Análise e Desenvolvimento de Sistemas e pós-graduando em IA & Data Science.
              Experiência em desenvolvimento full-stack, arquitetura de software e liderança de equipes.
              Focado em criar soluções inovadoras e otimizadas para negócios, com forte habilidade em tecnologias cloud e metodologias ágeis.
            </p>
          </div>

          {/* Competências Técnicas - Destaque para ATS */}
          <div>
            <h2 className='text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1' style={{ color: 'black' }}>COMPETÊNCIAS TÉCNICAS</h2>
            <div className='grid grid-cols-2 gap-3 text-xs'>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Linguagens</span>
                <div className='flex flex-wrap gap-1'>
                  {['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'SQL', 'HTML/CSS'].map(skill => (
                    <span key={skill} className='px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700' style={{ color: 'black' }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Frontend</span>
                <div className='flex flex-wrap gap-1'>
                  {['React', 'Next.js', 'Angular', 'Vue.js', 'Tailwind', 'Bootstrap'].map(skill => (
                    <span key={skill} className='px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700' style={{ color: 'black' }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Backend</span>
                <div className='flex flex-wrap gap-1'>
                  {['Node.js', 'Express', '.NET', 'Spring', 'Django', 'FastAPI'].map(skill => (
                    <span key={skill} className='px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700' style={{ color: 'black' }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Banco de Dados</span>
                <div className='flex flex-wrap gap-1'>
                  {['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle'].map(skill => (
                    <span key={skill} className='px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700' style={{ color: 'black' }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Cloud & DevOps</span>
                <div className='flex flex-wrap gap-1'>
                  {['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Git'].map(skill => (
                    <span key={skill} className='px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700' style={{ color: 'black' }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Ferramentas</span>
                <div className='flex flex-wrap gap-1'>
                  {['VS Code', 'IntelliJ', 'Postman', 'Jira', 'Figma', 'Swagger'].map(skill => (
                    <span key={skill} className='px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700' style={{ color: 'black' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experiência Profissional */}
          <div>
            <h2 className='text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1' style={{ color: 'black' }}>EXPERIÊNCIA PROFISSIONAL</h2>
            {experiences.map((exp, index) => (
              <div key={index} className='mb-4'>
                <div className='flex justify-between items-start mb-1'>
                  <h3 className='font-bold text-sm' style={{ color: 'black' }}>{t(exp.title)}</h3>
                  <span className='text-xs text-gray-600' style={{ color: 'black' }}>{t(exp.date)}</span>
                </div>
                <p className='text-xs text-gray-700 font-medium mb-2' style={{ color: 'black' }}>{t(exp.companyName)}</p>
                <ul className='list-disc list-inside text-xs space-y-1' style={{ color: 'black' }}>
                  {exp.points.map((point, pIndex) => (
                    <li key={pIndex} style={{ color: 'black' }}>{t(point)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projetos Relevantes */}
          <div>
            <h2 className='text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1' style={{ color: 'black' }}>PROJETOS DESTACADOS</h2>
            <div className='space-y-3'>
              {projects.slice(0, 3).map((project, index) => (
                <div key={index} className='mb-3'>
                  <div className='flex justify-between items-start mb-1'>
                    <h3 className='font-bold text-sm' style={{ color: 'black' }}>{project.name}</h3>
                    <span className='text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700' style={{ color: 'black' }}>{project.category}</span>
                  </div>
                  <p className='text-xs text-gray-700 leading-relaxed' style={{ color: 'black' }}>{t(project.description)}</p>
                  <div className='flex flex-wrap gap-1 mt-1'>
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className='text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700' style={{ color: 'black' }}>#{tag.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formação e Certificações */}
          <div>
            <h2 className='text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1' style={{ color: 'black' }}>FORMAÇÃO E CERTIFICAÇÕES</h2>
            <div className='space-y-3 text-xs'>
              <div>
                <h3 className='font-bold text-sm' style={{ color: 'black' }}>Pós-Graduação em IA & Data Science</h3>
                <p className='text-gray-600' style={{ color: 'black' }}>Anhanguera | Cursando</p>
              </div>
              <div>
                <h3 className='font-bold text-sm' style={{ color: 'black' }}>Tecnólogo em Análise e Desenvolvimento de Sistemas</h3>
                <p className='text-gray-600' style={{ color: 'black' }}>Unopar Anhanguera | 2025</p>
              </div>
              <div>
                <h3 className='font-bold text-sm mb-2' style={{ color: 'black' }}>Certificações Relevantes</h3>
                <div className='space-y-1'>
                  {allCourses.filter(c => c.isProfessionalCertificate).slice(0, 2).map(course => (
                    <div key={course.id}>
                      <p className='text-gray-700' style={{ color: 'black' }}>{course.title}</p>
                      <p className='text-gray-600 text-xs' style={{ color: 'black' }}>{course.platform} | {course.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Soft Skills e Metodologias */}
          <div>
            <h2 className='text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1' style={{ color: 'black' }}>COMPETÊNCIAS COMPORTAMENTAIS</h2>
            <div className='grid grid-cols-2 gap-2 text-xs'>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Liderança</span>
                <div className='flex flex-wrap gap-1'>
                  {['Gestão de Equipes', 'Mentoria', 'Coordenação'].map(skill => (
                    <span key={skill} className='px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700' style={{ color: 'black' }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Metodologias</span>
                <div className='flex flex-wrap gap-1'>
                  {['Scrum', 'Kanban', 'Ágil', 'DevOps'].map(skill => (
                    <span key={skill} className='px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700' style={{ color: 'black' }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Habilidades Pessoais</span>
                <div className='flex flex-wrap gap-1'>
                  {['Comunicação', 'Trabalho em Equipe', 'Resolução de Problemas', 'Gestão de Tempo'].map(skill => (
                    <span key={skill} className='px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700' style={{ color: 'black' }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className='font-medium text-gray-700 block mb-1' style={{ color: 'black' }}>Idiomas</span>
                <div className='space-y-1'>
                  <div className='flex justify-between'>
                    <span style={{ color: 'black' }}>Português</span>
                    <span className='font-medium' style={{ color: 'black' }}>Nativo</span>
                  </div>
                  <div className='flex justify-between'>
                    <span style={{ color: 'black' }}>Inglês</span>
                    <span className='font-medium' style={{ color: 'black' }}>Intermediário</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className='text-center mt-6 pt-4 border-t border-gray-200 text-xs' style={{ color: 'black' }}>
          <p>Este currículo foi gerado digitalmente em {new Date().toLocaleDateString('pt-BR')}</p>
          <p className='font-bold mt-1' style={{ color: 'black' }}>leandrobarbosa.dev | linkedin.com/in/lelebrr</p>
        </div>
      </div>

      {/* Page Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        :root {
          --cyber-purple: #9747FF;
          --cyber-cyan: #00F0FF;
        }

        body { 
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #050816;
          color: white;
        }

        @media print {
          body { 
            background: white !important; 
            color: black !important; 
            padding: 0 !important; 
            margin: 0 !important; 
          }
          * {
            color: black !important;
          }
          h1, h2, h3, h4 {
            color: black !important; 
            border-color: black !important;
          }
          p, span, li, div {
            color: black !important;
          }
          .text-gray-600, .text-gray-700, .text-gray-800 {
            color: black !important;
          }
          .bg-gray-100 {
            background-color: #f5f5f5 !important;
          }
          .border-gray-300 {
            border-color: #d1d1d1 !important;
          }
        }
      `}} />
    </div>
  );
};

export default OnlineResume;