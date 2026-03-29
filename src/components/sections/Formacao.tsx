import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import facul from '../../assets/facul.png';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';
import MotionLoader from '../layout/MotionLoader';

const EducationModal = ({ education, onClose }: { education: any; onClose: () => void }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-10"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[clamp(20px,5vw,40px)] bg-[#1d1836] border border-white/10 p-[clamp(1.5rem,5vw,4rem)] shadow-2xl custom-scrollbar"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="fixed sm:absolute top-8 right-8 z-[110] bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold transition-all shadow-xl border border-white/20 backdrop-blur-lg"
        >
          FECHAR
        </button>

        <div className="flex flex-col gap-12">
          {/* Header Row */}
          <div className="flex justify-between items-center sm:items-start w-full border-b border-white/10 pb-12">
            <div className="flex flex-col gap-5">
              <span
                style={{ backgroundColor: education.statusColor }}
                className="w-fit text-[12px] font-extrabold text-white px-4 py-2 rounded-full shadow-lg tracking-wider"
              >
                {education.status}
              </span>
              <h2 className="text-[clamp(1.5rem,6vw,2.5rem)] font-bold text-white leading-tight">
                {education.title}
              </h2>
              <p className="text-[clamp(0.8rem,2.5vw,1.1rem)] text-[#915EFF] font-semibold uppercase tracking-widest">
                {education.institution} | {education.period}
              </p>
            </div>
            <img
              src={facul}
              alt="Logo"
              className="w-20 sm:w-32 h-auto object-contain hidden sm:block"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left Column: Description & Disciplines */}
            <div className="flex flex-col gap-10">
              <div>
                <h4 className="text-[clamp(1rem,3vw,1.25rem)] font-bold text-white mb-5 uppercase tracking-tighter opacity-70 border-l-4 border-[#915EFF] pl-4">
                  Resumo da Formação
                </h4>
                <p className="text-[clamp(0.9rem,2.5vw,1rem)] text-gray-300 leading-relaxed italic">
                  "{education.fullDescription || education.description}"
                </p>
              </div>

              <div>
                <h4 className="text-[20px] font-bold text-white mb-8 uppercase tracking-tighter opacity-70 border-l-4 border-[#915EFF] pl-4">
                  Grade de Matérias
                </h4>
                <ul className="grid grid-cols-1 gap-5">
                  {education.subjects?.map((subj: any, idx: number) => (
                    <li
                      key={idx}
                      className="bg-white/5 border border-white/5 rounded-2xl p-6 flex justify-between items-center group/item hover:bg-white/10 transition-colors"
                    >
                      <span className="text-gray-200 font-medium">{subj.name}</span>
                      <span className="bg-[#915EFF]/20 text-[#915EFF] px-3 py-1 rounded-lg font-bold text-sm border border-[#915EFF]/30">
                        Nota: {subj.grade}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Certificate & Extras */}
            <div className="flex flex-col gap-10">
              {education.certificatePreview || education.validateLink ? (
                <div>
                  <h4 className="text-[20px] font-bold text-white mb-8 uppercase tracking-tighter opacity-70 border-l-4 border-[#00cea8] pl-4">
                    Certificado & Validação
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      if (education.certificateLink) {
                        try {
                          const url = new URL(education.certificateLink);
                          // Permitir apenas HTTP e HTTPS
                          if (['http:', 'https:'].includes(url.protocol)) {
                            window.open(education.certificateLink, '_blank', 'noopener,noreferrer');
                          } else {
                            console.warn('Protocolo inválido detectado:', url.protocol);
                          }
                        } catch (_e) {
                          console.warn('URL inválida detectada:', education.certificateLink);
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (education.certificateLink) {
                          try {
                            const url = new URL(education.certificateLink);
                            // Permitir apenas HTTP e HTTPS
                            if (['http:', 'https:'].includes(url.protocol)) {
                              window.open(
                                education.certificateLink,
                                '_blank',
                                'noopener,noreferrer'
                              );
                            } else {
                              console.warn('Protocolo inválido detectado:', url.protocol);
                            }
                          } catch (_e) {
                            console.warn('URL inválida detectada:', education.certificateLink);
                          }
                        }
                      }
                    }}
                    className="bg-white/5 border border-white/10 rounded-[30px] p-5 overflow-hidden aspect-video flex items-center justify-center relative group cursor-pointer shadow-inner hover:shadow-[#00cea8]/20 transition-all duration-500 my-10 mx-3 w-full text-left"
                  >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-[2px]">
                      <div className="bg-[#00cea8] text-white px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform pointer-events-none">
                        Ver Diploma PDF
                      </div>
                    </div>
                    {education.certificatePreview ? (
                      <img
                        src={education.certificatePreview}
                        className="w-full h-full object-cover rounded-[20px] transition-transform duration-700 group-hover:scale-110"
                        alt="Diploma Preview"
                      />
                    ) : (
                      <>
                        <img src={facul} className="w-24 opacity-20" alt="placeholder" />
                        <p className="absolute bottom-6 text-[#00cea8] font-bold text-sm tracking-widest uppercase animate-pulse">
                          Documento Verificado
                        </p>
                      </>
                    )}
                  </button>

                  <div className="mt-8 flex flex-col gap-4">
                    <a
                      href={education.validateLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-2xl bg-[#00cea8]/10 border border-[#00cea8]/30 text-[#00cea8] text-center font-bold hover:bg-[#00cea8] hover:text-white transition-all duration-300"
                    >
                      Conferir Autenticidade do Diploma
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 rounded-[30px] p-12 border border-white/10 flex flex-col items-center justify-center text-center gap-8 min-h-[300px]">
                  <div className="w-20 h-20 rounded-full bg-[#915EFF]/20 flex items-center justify-center shadow-[0_0_20px_#915EFF33]">
                    <div className="scale-x-[-0.4] scale-y-[0.4]">
                      <MotionLoader isSection />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[20px] font-bold text-white mb-3 uppercase tracking-widest">
                      Documentação em Breve
                    </h4>
                    <p className="text-gray-400 text-sm max-w-[280px] leading-relaxed">
                      Como o curso ainda está em andamento, o diploma e o código de autenticidade
                      serão disponibilizados após a conclusão.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-white/5 rounded-[30px] p-10 border border-white/5">
                <h4 className="text-[16px] font-bold text-white mb-5 uppercase tracking-widest opacity-50">
                  Destaques Acadêmicos
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {(
                    education.highlights || [
                      'Excelência Técnica',
                      'Liderança Ágil',
                      'Pesquisa e Dados',
                      'Inovação',
                    ]
                  ).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-white/10 text-white px-4 py-2 rounded-full border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Formacao = () => {
  const [selectedEducation, setSelectedEducation] = useState<any>(null);

  const educations = [
    {
      title: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
      institution: 'Universidade Pitágoras Unopar Anhanguera',
      period: 'Concluído em Dezembro de 2025',
      status: 'CONCLUÍDO',
      statusColor: '#00cea8',
      description:
        'Formação completa em desenvolvimento de software, combinando teoria e prática para criar soluções tecnológicas inovadoras e eficientes.',
      fullDescription:
        'Durante essa jornada acadêmica, mergulhei no universo da computação e do desenvolvimento de sistemas, onde cada desafio foi uma oportunidade de crescimento. Aprendi a transformar ideias complexas em código limpo e funcional, desenvolvendo não apenas habilidades técnicas, mas também uma mentalidade voltada para a resolução de problemas reais. O curso me preparou para atuar em um mercado em constante evolução, com foco em inovação, colaboração e entrega de valor através da tecnologia.',
      points: [
        'Desenvolvimento Full Stack com foco em React, Node.js e bancos de dados',
        'Arquitetura de software e design patterns para sistemas escaláveis',
        'Metodologias Ágeis aplicadas em projetos reais (Scrum, Kanban)',
        'Integração de APIs e desenvolvimento de microserviços',
        'Testes automatizados e garantia de qualidade de software',
        'Deploy e DevOps com Docker e CI/CD',
      ],
      subjects: [
        { name: 'Engenharia De Software', grade: '8,7' },
        { name: 'Análise E Modelagem De Sistemas', grade: '10' },
        { name: 'Lógica E Matemática Computacional', grade: '10' },
        { name: 'Algoritmos E Programação Estruturada', grade: '10' },
        { name: 'Linguagem De Programação', grade: '10' },
        { name: 'Sistemas Operacionais', grade: '10' },
        { name: 'Qualidade E Automação De Testes', grade: '8,8' },
        { name: 'Projeto De Extensão I - ADS', grade: '10' },
        { name: 'Linguagem Orientada A Objetos', grade: '10' },
        { name: 'Análise Orientada A Objetos', grade: '9,9' },
        { name: 'Modelagem De Dados', grade: '10' },
        { name: 'Programação E Dev. de Banco de Dados', grade: '10' },
        { name: 'Green IT', grade: '10' },
        { name: 'Governança De Tecnologia', grade: '10' },
        { name: 'Computação Em Nuvem', grade: '8' },
        { name: 'Programação Web', grade: '10' },
        { name: 'Projeto De Extensão II - ADS', grade: '10' },
        { name: 'Desenvolvimento Responsivo', grade: '8,1' },
        { name: 'Desenvolvimento Em Javascript', grade: '9,9' },
        { name: 'Frameworks Para Dev. De Software', grade: '9,8' },
        { name: 'Sistemas Distribuídos', grade: '10' },
        { name: 'Desenvolvimento Mobile', grade: '10' },
        { name: 'Sociedade Brasileira E Cidadania', grade: '10' },
        { name: 'Segurança E Auditoria De Sistemas', grade: '10' },
        { name: 'Projeto De Software', grade: '10' },
        { name: 'Arquitetura De Computadores', grade: '10' },
        { name: 'Interface E Usabilidade', grade: '10' },
        { name: 'Redes De Computadores', grade: '10' },
      ],
      validateLink:
        'https://diplomas.cogna.com.br/diploma-digital/validador/documento/academico/298.298.ed35015ba174',
      certificateLink: '/formacao/DiplomaDigital.pdf',
      certificatePreview: '/formacao/diploma.png',
      highlights: [
        'Engenharia de Software',
        'Desenvolvimento Full Stack',
        'Web Design & UX',
        'Banco de Dados',
        'Clean Code',
        'Metodologias Ágeis',
        'Testes Automatizados',
        'DevOps',
        'Arquitetura de Sistemas',
        'Integração de APIs',
        'React & Node.js',
        'Cloud Computing',
      ],
    },
    {
      title: 'Pós-Graduação em Inteligência Artificial e Data Science',
      institution: 'Anhanguera',
      period: 'Cursando – Previsão: Dezembro de 2026',
      status: 'EM ANDAMENTO',
      statusColor: '#915EFF',
      description:
        'Especialização avançada em IA e ciência de dados, transformando dados em inteligência estratégica para o futuro.',
      fullDescription:
        'Esta pós-graduação representa um mergulho profundo nas fronteiras da tecnologia, onde estou aprendendo a criar sistemas inteligentes que podem aprender, prever e tomar decisões. Cada módulo é uma porta de entrada para um novo universo: desde a criação de modelos de machine learning que detectam padrões invisíveis até o desenvolvimento de redes neurais que simulam o pensamento humano. Estou construindo não apenas conhecimento técnico, mas uma visão estratégica de como a IA pode transformar negócios, salvar vidas e moldar o futuro da humanidade.',
      points: [
        'Desenvolvimento de modelos de Machine Learning e Deep Learning',
        'Processamento de Linguagem Natural (NLP) e visão computacional',
        'Arquiteturas de redes neurais e modelos generativos (GANs, VAEs)',
        'Big Data com Spark, Hadoop e ecossistema moderno',
        'Data Engineering: ETL, pipelines e data lakes',
        'IA ética, governança de dados e LGPD',
        'Deploy de modelos em produção com MLOps',
        'Visualização de dados e storytelling com Tableau/Power BI',
        'Cloud AI: serviços de IA na AWS, Azure e GCP',
        'Projetos reais de IA para setores como saúde, finanças e cibersegurança',
      ],
      subjects: [
        { name: 'Inteligência Artificial: Conceitos e Aplicações', grade: '10,0' },
        { name: 'Machine Learning', grade: 'Cursando' },
        { name: 'Redes Neurais', grade: 'Cursando' },
        { name: 'Processamento de Linguagem Natural (NLP)', grade: 'Cursando' },
        { name: 'Visão Computacional Generativa', grade: 'Cursando' },
        { name: 'Modelos Generativos (GANs, VAEs)', grade: 'Cursando' },
        { name: 'Ciência de Dados com Python & Spark', grade: 'Cursando' },
        { name: 'Data Discovery & Visualização', grade: 'Cursando' },
        { name: 'SQL para Data Analytics', grade: 'Cursando' },
        { name: 'Integração e Fluxo de Dados (ETL)', grade: 'Cursando' },
        { name: 'Governança de Dados & LGPD', grade: 'Cursando' },
        { name: 'Big Data & Cloud Computing', grade: 'Cursando' },
      ],
      highlights: [
        'Machine Learning',
        'Deep Learning',
        'IA Generativa',
        'Processamento de Linguagem Natural (NLP)',
        'Visão Computacional',
        'Big Data & Spark',
        'Data Engineering',
        'Redes Neurais',
        'Modelos Preditivos',
        'Cloud AI',
        'MLOps',
        'Ética em IA',
        'Data Science',
        'Python para Data Science',
        'TensorFlow & PyTorch',
        'Governança de Dados',
      ],
    },
  ];

  return (
    <>
      <Header useMotion={true} {...config.sections.formacao} />

      <div className="mt-48 mb-16 flex flex-col items-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 w-full max-w-6xl px-8 sm:px-12">
          {educations.map((education, index) => (
            <motion.div
              key={education.title}
              variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedEducation(education)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedEducation(education);
              }}
              className="relative rounded-[24px] bg-gradient-to-br from-[rgba(29,24,54,0.9)] to-[rgba(21,16,48,0.7)] backdrop-blur-xl border border-white/[0.08] p-8 sm:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] group flex flex-col cursor-pointer hover:border-[#915EFF]/40 hover:shadow-[0_10px_50px_rgba(145,94,255,0.2)] transition-all duration-500 active:scale-[0.98] overflow-hidden"
            >
              {/* Decorative gradient orb */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: education.statusColor }}
              />

              {/* Card Header: Logo, Status & Period */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-12 relative z-10 gap-10">
                {/* Mobile Logo - Centered */}
                <div className="flex sm:hidden w-24 h-24 rounded-3xl bg-white/5 border border-white/10 items-center justify-center p-4 group-hover:bg-white/10 transition-colors shrink-0 shadow-2xl mb-2">
                  <img src={facul} alt="Logo" className="w-full h-full object-contain" />
                </div>

                <div className="flex flex-col items-center sm:items-start gap-5 min-w-0 flex-1">
                  <div className="flex flex-col items-center sm:items-start gap-5">
                    <span
                      style={{ backgroundColor: education.statusColor }}
                      className="text-[10px] sm:text-[11px] font-bold text-white px-6 py-2.5 rounded-full shadow-lg tracking-widest uppercase border border-white/10"
                    >
                      {education.status}
                    </span>
                    <span className="text-[13px] sm:text-[15px] text-gray-400 font-bold italic text-center sm:text-left">
                      {education.period}
                    </span>
                  </div>
                </div>

                {/* Desktop Logo - on the right */}
                <div className="hidden sm:flex w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/5 border border-white/10 items-center justify-center p-5 group-hover:bg-white/10 transition-colors shrink-0 shadow-2xl">
                  <img src={facul} alt="Logo" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-grow relative z-10">
                <h3 className="text-[clamp(1.1rem,3.5vw,1.35rem)] font-bold text-white group-hover:text-[#915EFF] transition-colors leading-snug mb-4 text-center sm:text-left">
                  {education.title}
                </h3>

                <div className="mb-8 flex justify-center sm:justify-start w-full">
                  <span className="text-[clamp(0.7rem,1.8vw,0.8rem)] font-bold text-[#915EFF] uppercase tracking-widest bg-[#915EFF]/10 px-4 py-1.5 rounded-lg inline-block text-center sm:text-left">
                    {education.institution}
                  </span>
                </div>

                <p className="text-[clamp(0.8rem,2.2vw,0.9rem)] text-gray-400 leading-relaxed mb-10 font-medium italic opacity-90 border-l-2 sm:border-l-2 border-[#915EFF]/30 pl-5 sm:pl-5 text-center sm:text-left px-4 sm:px-0">
                  "{education.description}"
                </p>

                <div className="flex flex-wrap gap-3 w-full justify-center sm:justify-start min-w-0 pointer-events-none">
                  {education.points.slice(0, 6).map((point, idx) => {
                    const shortName = point.split(' ').slice(0, 2).join(' ');
                    return (
                      <span
                        key={`skill-${idx}`}
                        className="text-[10px] sm:text-[11px] text-gray-400 bg-white/8 border border-white/10 px-4 py-2 rounded-full hover:bg-[#915EFF]/10 hover:border-[#915EFF]/40 hover:text-[#915EFF] transition-all duration-300 shadow-sm text-center truncate pointer-events-auto"
                      >
                        {shortName}
                      </span>
                    );
                  })}
                </div>

                {/* Bottom action button */}
                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-3.5 shrink-0">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse shrink-0 shadow-[0_0_12px_rgba(145,94,255,0.7)]"
                      style={{ backgroundColor: education.statusColor }}
                    />
                    <span className="text-[12px] text-gray-400 font-bold tracking-[0.2em] uppercase">
                      {education.subjects?.length || 0} disciplinas
                    </span>
                  </div>
                  <button
                    type="button"
                    className="w-full sm:w-auto text-[11px] sm:text-[12px] text-white bg-gradient-to-r from-[#915EFF]/20 to-[#915EFF]/40 border border-[#915EFF]/30 font-bold uppercase tracking-widest px-12 py-4 rounded-full hover:from-[#915EFF] hover:to-[#915EFF] hover:shadow-[0_0_25px_rgba(145,94,255,0.6)] transition-all duration-500 whitespace-nowrap active:scale-95 shadow-xl glass-btn"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEducation && (
          <EducationModal
            education={selectedEducation}
            onClose={() => setSelectedEducation(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(Formacao, 'formacao');
