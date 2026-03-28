import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import facul from '../../assets/facul.png';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms/Header';

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
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] bg-[#1d1836] border border-white/10 p-8 sm:p-16 shadow-2xl custom-scrollbar"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="fixed sm:absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-bold transition-all shadow-xl border border-white/20 backdrop-blur-lg"
        >
          FECHAR
        </button>

        <div className="flex flex-col gap-10">
          {/* Header Row */}
          <div className="flex justify-between items-center sm:items-start w-full border-b border-white/10 pb-10">
            <div className="flex flex-col gap-4">
              <span
                style={{ backgroundColor: education.statusColor }}
                className="w-fit text-[12px] font-extrabold text-white px-4 py-2 rounded-full shadow-lg tracking-wider"
              >
                {education.status}
              </span>
              <h2 className="text-[28px] sm:text-[40px] font-bold text-white leading-tight">
                {education.title}
              </h2>
              <p className="text-[16px] sm:text-[18px] text-[#915EFF] font-semibold uppercase tracking-widest">
                {education.institution} | {education.period}
              </p>
            </div>
            <img
              src={facul}
              alt="Logo"
              className="w-20 sm:w-32 h-auto object-contain hidden sm:block"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Description & Disciplines */}
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-[20px] font-bold text-white mb-4 uppercase tracking-tighter opacity-70 border-l-4 border-[#915EFF] pl-4">
                  Resumo da Formação
                </h4>
                <p className="text-[16px] text-gray-300 leading-relaxed italic">
                  "{education.fullDescription || education.description}"
                </p>
              </div>

              <div>
                <h4 className="text-[20px] font-bold text-white mb-6 uppercase tracking-tighter opacity-70 border-l-4 border-[#915EFF] pl-4">
                  Grade de Matérias
                </h4>
                <ul className="grid grid-cols-1 gap-4">
                  {education.subjects?.map((subj: any, idx: number) => (
                    <li
                      key={idx}
                      className="bg-white/5 border border-white/5 rounded-2xl p-5 flex justify-between items-center group/item hover:bg-white/10 transition-colors"
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
            <div className="flex flex-col gap-8">
              {education.certificatePreview || education.validateLink ? (
                <div>
                  <h4 className="text-[20px] font-bold text-white mb-6 uppercase tracking-tighter opacity-70 border-l-4 border-[#00cea8] pl-4">
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
                    className="bg-white/5 border border-white/10 rounded-[30px] p-4 overflow-hidden aspect-video flex items-center justify-center relative group cursor-pointer shadow-inner hover:shadow-[#00cea8]/20 transition-all duration-500 my-8 mx-2 w-full text-left"
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

                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={education.validateLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-2xl bg-[#00cea8]/10 border border-[#00cea8]/30 text-[#00cea8] text-center font-bold hover:bg-[#00cea8] hover:text-white transition-all duration-300"
                    >
                      Conferir Autenticidade do Diploma
                    </a>
                    <p className="text-[12px] text-gray-500 text-center uppercase tracking-tighter italic">
                      Código de Controle: {Math.random().toString(36).substring(7).toUpperCase()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 rounded-[30px] p-10 border border-white/10 flex flex-col items-center justify-center text-center gap-6 min-h-[300px]">
                  <div className="w-20 h-20 rounded-full bg-[#915EFF]/20 flex items-center justify-center shadow-[0_0_20px_#915EFF33]">
                    <div className="w-10 h-10 rounded-full border-4 border-[#915EFF] border-t-transparent animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-[20px] font-bold text-white mb-2 uppercase tracking-widest">
                      Documentação em Breve
                    </h4>
                    <p className="text-gray-400 text-sm max-w-[250px] leading-relaxed">
                      Como o curso ainda está em andamento, o diploma e o código de autenticidade
                      serão disponibilizados após a conclusão.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-white/5 rounded-[30px] p-8 border border-white/5">
                <h4 className="text-[16px] font-bold text-white mb-4 uppercase tracking-widest opacity-50">
                  Destaques Acadêmicos
                </h4>
                <div className="flex flex-wrap gap-2">
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
                      className="text-[11px] bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/5"
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
        'Formação superior voltada para o ciclo completo de desenvolvimento de software e engenharia de sistemas.',
      fullDescription:
        'Uma jornada acadêmica profunda focada em transformar requisitos de negócio em arquiteturas de software robustas. O curso proporcionou uma base sólida em algoritmos, estruturas de dados e desenvolvimento ágil, preparando-me para desafios complexos em engenharia de sistemas e desenvolvimento Full Stack.',
      points: [
        'Ciclo completo de desenvolvimento e engenharia de software.',
        'Administração de Bancos de Dados e lógica de programação.',
        'Aplicação prática de Metodologias Ágeis (Scrum/XP).',
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
      highlights: ['Engenharia de Software', 'Web Design', 'Banco de Dados', 'Clean Code'],
    },
    {
      title: 'Pós-Graduação em Inteligência Artificial e Data Science',
      institution: 'Anhanguera',
      period: 'Cursando – Previsão: Dezembro de 2026',
      status: 'EM ANDAMENTO',
      statusColor: '#915EFF',
      description:
        'Especialização em modelos inteligentes e análise preditiva focada em extrair valor de big data.',
      fullDescription:
        'Formação prática e avançada voltada ao desenvolvimento de soluções inteligentes e inovadoras. Foco em IA Generativa, Machine Learning e Big Data para automação de processos e suporte estratégico em decisões complexas, abrangendo setores como Cibersegurança, Finanças e Saúde Pública.',
      points: [
        'Foco em Machine Learning e Modelos Preditivos.',
        'Processamento e análise de grandes volumes de dados (Big Data).',
        'Automação de processos e geração de insights estratégicos.',
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
      highlights: ['IA Generativa', 'Big Data', 'Machine Learning', 'Data Strategy'],
    },
  ];

  return (
    <>
      <Header useMotion={true} {...config.sections.formacao} />

      <div className="mt-20 flex flex-col items-center w-full">
        <div className="flex flex-wrap gap-10 justify-center items-stretch w-full">
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
              className="w-full relative rounded-[40px] bg-tertiary border border-white/[0.05] p-10 py-16 shadow-2xl sm:w-[500px] min-w-0 break-words group flex flex-col cursor-pointer hover:border-[#915EFF]/50 transition-all active:scale-[0.98]"
            >
              {/* Card Header: Status & Logo */}
              <div className="flex justify-between items-center mb-20 w-full mt-2">
                <span
                  style={{ backgroundColor: education.statusColor }}
                  className="text-[10px] font-extrabold text-white px-4 py-2 rounded-full shadow-lg tracking-wider"
                >
                  {education.status}
                </span>
                <img src={facul} alt="Logo" className="w-16 h-auto object-contain drop-shadow-lg" />
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-[20px] font-bold text-[var(--dynamic-text-color)] group-hover:text-[#915EFF] transition-colors leading-tight mb-4">
                  {education.title}
                </h3>

                <div className="flex flex-col mb-10">
                  <span className="text-[13px] font-semibold text-[#915EFF] opacity-90 uppercase tracking-widest">
                    {education.institution}
                  </span>
                  <span className="text-[12px] text-[var(--dynamic-text-secondary)] opacity-70 mt-1">
                    {education.period}
                  </span>
                </div>

                <p className="text-[14px] text-[var(--dynamic-text-secondary)] leading-relaxed mb-10 font-medium italic opacity-90 border-l-2 border-[#915EFF]/30 pl-4">
                  "{education.description}"
                </p>

                <div className="flex-grow">
                  <p className="text-[13px] font-bold text-[var(--dynamic-text-color)] mb-6 uppercase tracking-tighter opacity-60">
                    Disciplinas & Competências:
                  </p>
                  <ul className="list-none space-y-4">
                    {education.points.map((point, idx) => (
                      <li
                        key={`discipline-${idx}`}
                        className="text-[13px] text-[var(--dynamic-text-secondary)] flex items-start gap-3 px-4"
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#915EFF] shrink-0 shadow-[0_0_8px_#915EFF]" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-10 text-[12px] text-[#915EFF] font-bold text-center uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                  Clique para ver detalhes completos
                </p>
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
