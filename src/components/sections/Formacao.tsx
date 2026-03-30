import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';
import Modal from '../atoms/Modal';
import facul from '../../assets/facul.webp';
import { diploma, qrcode, diplomaPdf } from '../../assets';
import type { FormacaoData, Disciplina } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Componente de engrenagem animada
const AnimatedGear = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className="absolute top-20 right-20 w-32 h-32 hidden lg:block opacity-30">
      {/* Arco brilhante colorido externo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #915EFF, #00D4FF, #FF6B9D, #915EFF)',
          filter: 'blur(8px)',
          opacity: 0.6
        }}
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Container principal da engrenagem com pulsação */}
      <motion.div
        animate={prefersReduced ? {} : {
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-full h-full"
      >
        {/* SVG da engrenagem com design realista */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="drop-shadow-[0_0_20px_rgba(145,94,255,0.8)]"
        >
          <defs>
            <linearGradient id="gearGradFormacao" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="50%" stopColor="#915EFF" />
              <stop offset="100%" stopColor="#FF6B9D" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#glow)">
            {/* Corpo principal da engrenagem com dentes */}
            <path
              fill="rgba(20,20,30,0.9)"
              stroke="url(#gearGradFormacao)"
              strokeWidth="2.5"
              d="M50 10 L57 10 L59 20 L67 16 L73 22 L67 30 L77 34 L75 42 L87 48 L87 56 L75 60 L79 70 L71 76 L63 66 L57 74 L50 88 L43 74 L37 66 L29 76 L21 70 L25 60 L13 56 L13 48 L25 44 L21 34 L29 28 L37 38 L43 30 L50 22 Z"
            />
            {/* Círculo interno */}
            <circle cx="50" cy="50" r="14" fill="rgba(20,20,30,0.95)" stroke="url(#gearGradFormacao)" strokeWidth="2" />
            {/* Círculo central */}
            <circle cx="50" cy="50" r="5" fill="url(#gearGradFormacao)" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

const Formacao = () => {
  const [selectedFormation, setSelectedFormation] = useState<FormacaoData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  const openModal = (formacao: FormacaoData) => {
    setSelectedFormation(formacao);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFormation(null);
  };

  const formacoes: FormacaoData[] = [
    {
      id: '1',
      title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      institution: 'Anhanguera',
      date: '2023 - 2025',
      status: t('status.concluido'),
      icon: facul,
      logo: facul,
      period: '2023 - 2025',
      description: 'Formação superior com foco abrangente no ciclo completo de desenvolvimento de software, desde a concepção até a implantação e manutenção de sistemas. O curso proporciona uma base sólida em análise de requisitos, arquitetura de software, gestão de projetos e metodologias ágeis, preparando profissionais capazes de liderar iniciativas tecnológicas em diversos segmentos do mercado. Com uma abordagem prática e alinhada às demandas da indústria, a graduação enfatiza o desenvolvimento de soluções inovadoras, escaláveis e sustentáveis, capacitando os egressos a enfrentar os desafios contemporâneos da área de tecnologia da informação com excelência técnica e visão estratégica. Durante o curso, foram exploradas tecnologias modernas como React, Node.js, TypeScript, bancos de dados relacionais e não-relacionais, além de práticas de DevOps e CI/CD, proporcionando uma formação completa e atualizada com as necessidades do mercado de trabalho.',
      link: '#',
      cargaHorariaGeral: '2100h',
      dataConclusao: '13/12/2025',
      diplomaPreview: diploma,
      diplomaDownload: diplomaPdf,
      qrCode: qrcode,
      authLink: 'https://diplomas.cogna.com.br/diploma-digital/diploma?code=298.298.ed35015ba174&fornecedor=AVMB',
      disciplinas: [
        // 2023/2
        { semestre: '2023/2', materia: 'Engenharia de Software', professor: 'Marcio de Castro Oliveira', nota: 8.7, cargaHoraria: '60h' },
        { semestre: '2023/2', materia: 'Linguagem de Programação', professor: 'Gerson Risso', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2023/2', materia: 'Lógica e Matemática Computacional', professor: 'Leonardo de Souza', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2023/2', materia: 'Algoritmos e Programação Estruturada', professor: 'Gerson Risso', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2023/2', materia: 'Análise e Modelagem de Sistemas', professor: 'Marcio de Castro Oliveira', nota: 10.0, cargaHoraria: '60h' },
        // 2024/1
        { semestre: '2024/1', materia: 'Análise Orientada a Objetos', professor: 'Marcio de Castro Oliveira', nota: 9.9, cargaHoraria: '60h' },
        { semestre: '2024/1', materia: 'Linguagem Orientada a Objetos', professor: 'Gerson Risso', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2024/1', materia: 'Modelagem de Dados', professor: 'Gerson Risso', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2024/1', materia: 'Projeto de Extensão I', professor: 'Maria Jose de Castro Oliveira', nota: 10.0, cargaHoraria: '220h' },
        { semestre: '2024/1', materia: 'Qualidade e Automação de Testes', professor: 'Rodrigo de Souza Rocha', nota: 8.8, cargaHoraria: '60h' },
        // 2024/2
        { semestre: '2024/2', materia: 'Sistemas Operacionais', professor: 'Rodrigo de Souza Rocha', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2024/2', materia: 'Computação em Nuvem', professor: 'Rodrigo de Souza Rocha', nota: 8.0, cargaHoraria: '60h' },
        { semestre: '2024/2', materia: 'Governança de Tecnologia', professor: 'Rodrigo de Souza Rocha', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2024/2', materia: 'Green IT', professor: 'Rodrigo de Souza Rocha', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2024/2', materia: 'Programação e Desenv. de Banco de Dados', professor: 'Gerson Risso', nota: 10.0, cargaHoraria: '60h' },
        // 2025/1
        { semestre: '2025/1', materia: 'Programação Web', professor: 'Gerson Risso', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2025/1', materia: 'Desenvolvimento em Javascript', professor: 'Gerson Risso', nota: 9.9, cargaHoraria: '60h' },
        { semestre: '2025/1', materia: 'Desenvolvimento Mobile', professor: 'Gerson Risso', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2025/1', materia: 'Desenvolvimento Responsivo', professor: 'Gerson Risso', nota: 8.1, cargaHoraria: '60h' },
        { semestre: '2025/1', materia: 'Frameworks para Desenv. de Software', professor: 'Gerson Risso', nota: 9.8, cargaHoraria: '60h' },
        { semestre: '2025/1', materia: 'Projeto de Extensão II', professor: 'Maria Jose de Castro Oliveira', nota: 10.0, cargaHoraria: '220h' },
        { semestre: '2025/1', materia: 'Sistemas Distribuídos', professor: 'Gerson Risso', nota: 10.0, cargaHoraria: '60h' },
        // 2025/2
        { semestre: '2025/2', materia: 'Arquitetura e Org. de Computadores', professor: 'Rodrigo de Souza Rocha', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2025/2', materia: 'Projeto de Software', professor: 'Marcio de Castro Oliveira', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2025/2', materia: 'Redes de Computadores', professor: 'Rodrigo de Souza Rocha', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2025/2', materia: 'Segurança e Auditoria de Sistemas', professor: 'Rodrigo de Souza Rocha', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2025/2', materia: 'Sociedade Brasileira e Cidadania', professor: 'Leonardo de Souza', nota: 10.0, cargaHoraria: '60h' },
        { semestre: '2025/2', materia: 'Interface e Usabilidade', professor: 'Rodrigo de Souza Rocha', nota: 10.0, cargaHoraria: '60h' },
      ],
    },
    {
      id: '2',
      title: 'Inteligência Artificial: Conceitos, Ferramentas e Aplicações',
      institution: 'Anhanguera',
      date: '2026 - Em andamento',
      status: t('status.emAndamento'),
      icon: facul,
      logo: facul,
      period: '2026 - Em andamento',
      description: 'O curso de pós-graduação em Inteligência Artificial e Data Science é projetado para atender às demandas crescentes do mercado tecnológico, capacitando profissionais a desenvolver soluções inovadoras e baseadas em dados. Com uma abordagem prática e avançada, o curso prepara os alunos para enfrentar os desafios do mundo do trabalho, promovendo a inovação e a precisão em suas respectivas áreas de atuação.',
      link: '#',
      tipoFormacao: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      cargaHorariaGeral: '360h',
      statusDiploma: 'Em breve',
      nota: '10,0',
      disciplinas: [
        { semestre: '2026/1', materia: 'Inteligência Artificial: Conceitos, Ferramentas e Aplicações', professor: 'Corpo Docente', nota: 10.0, cargaHoraria: '30h' },
        { semestre: '2026/1', materia: 'Redes Neurais', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2026/1', materia: 'Processamento de linguagem natural', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2026/1', materia: 'Visão computacional Generativa', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2026/2', materia: 'Modelos generativos (GANs, Variational Autoencoders (VAEs) e Flow-based Models)', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2026/2', materia: 'Linguagens de programação para ciência de dados (Python com Spark)', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2026/2', materia: 'Data Discovery, Olap e visualização de dados', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2027/1', materia: 'Linguagem SQL para Data Analytics', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2027/1', materia: 'Integração e fluxo de dados (ETL)', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2027/1', materia: 'Governança de dados', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2027/2', materia: 'Interações entre big data e cloud computing', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' },
        { semestre: '2027/2', materia: 'Lei Geral de Proteção de Dados', professor: 'Corpo Docente', nota: 'CURSANDO', cargaHoraria: '30h' }
      ]
    }
  ];

  const stats = useMemo(() => {
    if (!selectedFormation || !selectedFormation.disciplinas) return null;
    const items = selectedFormation.disciplinas.filter(d => typeof d !== 'string') as Disciplina[];
    if (items.length === 0) return null;

    // Filtrar apenas disciplinas com nota numérica para cálculos de média
    const itemsComNota = items.filter(d => !isNaN(Number(d.nota)));

    const totalCH = items.reduce((acc, d) => acc + parseInt(d.cargaHoraria), 0);
    const weightedSum = itemsComNota.reduce((acc, d) => acc + (Number(d.nota) * parseInt(d.cargaHoraria)), 0);
    const average = itemsComNota.length > 0 ? weightedSum / totalCH : 0;

    const semesterData = items.reduce((acc, d) => {
      const sem = d.semestre || 'N/A';
      if (!acc[sem]) {
        acc[sem] = {
          sum: 0,
          count: 0,
          ch: 0,
          disciplinas: []
        };
      }
      // Só adiciona à soma se for nota numérica
      if (!isNaN(Number(d.nota))) {
        acc[sem].sum += Number(d.nota);
        acc[sem].count += 1;
      }
      acc[sem].ch += parseInt(d.cargaHoraria);
      acc[sem].disciplinas.push(d);
      return acc;
    }, {} as Record<string, { sum: number, count: number, ch: number, disciplinas: Disciplina[] }>);

    const chartData = Object.keys(semesterData).map(sem => ({
      sem,
      avg: semesterData[sem].count > 0 ? semesterData[sem].sum / semesterData[sem].count : 0,
      ch: semesterData[sem].ch
    }));

    return { average, totalCH, chartData, semesterData, allDisciplinas: items };
  }, [selectedFormation]);

  return (
    <div className="max-w-7xl mx-auto px-6 relative">
      {/* Engrenagem animada decorativa */}
      <AnimatedGear />

      <Header useMotion={true} p={t('formacao.p')} h2={t('formacao.h2')} />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {formacoes.map((item, index) => (
          <motion.div
            key={item.title}
            variants={prefersReduced ? {} : fadeIn('up', 'spring', index * 0.1, 0.75)}
            onClick={() => openModal(item)}
            className="glass-card group relative overflow-hidden p-8 md:p-10 flex flex-col h-full neon-hover border border-white/10 cursor-pointer"
          >
            <div className={`absolute top-4 right-4 px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full text-white shadow-[0_0_15px_rgba(145,94,255,0.5)] border border-white/30 z-20 backdrop-blur-sm ${item.status === t('status.concluido')
              ? 'bg-gradient-to-r from-green-500 to-emerald-400'
              : 'bg-gradient-to-r from-yellow-500 to-orange-400'
              }`}>
              {item.status}
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 pt-6">
              <div className="w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-black/50 p-4 flex items-center justify-center shadow-inner relative z-10 transition-transform group-hover:scale-105">
                <img src={item.logo} alt={item.institution} className="w-12 h-12 object-contain" />
              </div>

              <div className="flex-1 relative z-10">
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[var(--cyber-cyan)] transition-colors tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--cyber-purple)] font-bold uppercase tracking-widest mt-2 text-sm">{item.institution}</p>
                <div className="mt-3 text-white/50 text-xs font-mono uppercase tracking-[0.2em]">
                  {t('education.period')}: {item.period}
                </div>

                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity line-clamp-4">
                  {item.description}
                </p>
                {/* Ajuste de layout para cards de formação */}
              </div>
            </div>

            <div className="mt-auto pt-10">
              <motion.button
                whileHover={prefersReduced ? {} : {
                  scale: 1.02,
                  y: -2,
                  boxShadow: '0 8px 30px rgba(145, 94, 255, 0.3)'
                }}
                whileTap={prefersReduced ? {} : { scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] font-bold uppercase tracking-wider text-sm backdrop-blur-sm transition-all duration-300 hover:border-[var(--cyber-cyan)]/60"
              >
                {t('formacao.viewDetails')}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedFormation && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedFormation.title}>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-black/50 p-4 flex items-center justify-center">
                <img src={selectedFormation.logo} alt={selectedFormation.institution} className="w-16 h-16 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedFormation.title}</h3>
                <p className="text-[var(--cyber-purple)] font-bold uppercase tracking-widest">{selectedFormation.institution}</p>
                <div className="mt-2 text-white/50 text-sm font-mono">
                  {t('education.period')}: {selectedFormation.period}
                </div>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  {selectedFormation.description}
                </p>
              </div>
            </div>

            {stats && (
              <div className="p-8 rounded-3xl bg-black/40 border border-white/10 relative overflow-hidden">
                <div className="absolute top-4 right-4 p-4 bg-black/60 rounded-xl border border-white/10">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--cyber-cyan)]">{stats.average.toFixed(1)}</div>
                    <div className="text-xs text-white/50 uppercase tracking-widest mt-1">{t('education.generalAverage')}</div>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white mb-6">{t('education.semesterEvolution')}</h4>
                <div className="space-y-6">
                  {stats.chartData.map((data, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-32 text-sm text-white/70">{data.sem}</div>
                      <div className="flex-1 h-8 bg-white/5 rounded-xl overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(data.avg / 10) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)]"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                          {data.avg.toFixed(1)}
                        </div>
                      </div>
                      <div className="w-20 text-right text-sm text-white/50">{data.ch}h</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFormation.disciplinas && selectedFormation.disciplinas.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-4">{t('education.semesterHistory')}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-white/70">{t('education.semester')}</th>
                        <th className="text-left py-3 px-4 text-white/70">{t('education.subject')}</th>
                        <th className="text-center py-3 px-4 text-white/70">{t('education.grade')}</th>
                        <th className="text-center py-3 px-4 text-white/70">{t('education.professor')}</th>
                        <th className="text-right py-3 px-4 text-white/70">{t('education.hours')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFormation.disciplinas
                        .filter(disc => typeof disc === 'object' && disc !== null && 'semestre' in disc)
                        .map((disc, idx) => {
                          const disciplina = disc as Disciplina;
                          return (
                            <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 px-4 text-white/50">{disciplina.semestre}</td>
                              <td className="py-3 px-4 text-white">{disciplina.materia}</td>
                              <td className="text-center py-3 px-4 font-bold" style={{ color: Number(disciplina.nota) >= 7 ? '#10b981' : '#ef4444' }}>
                                {disciplina.nota}
                              </td>
                              <td className="text-center py-3 px-4 text-white/50">{disciplina.professor}</td>
                              <td className="text-right py-3 px-4 text-white/50">{disciplina.cargaHoraria}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              {selectedFormation.diplomaPreview && (
                <motion.div
                  onClick={() => window.open(selectedFormation.diplomaPreview, '_blank')}
                  className="relative group rounded-3xl overflow-hidden border border-white/10 bg-black/40 cursor-pointer hover:border-[var(--cyber-cyan)]/50 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-black/60 p-2 flex items-center justify-center">
                        <img src={selectedFormation.diplomaPreview} alt="Diploma" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{t('education.diplomaPreview')}</div>
                        <div className="text-sm text-white/50">{t('education.clickToOpen')}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedFormation.diplomaDownload && (
                <motion.a
                  href={selectedFormation.diplomaDownload}
                  download
                  className="relative group rounded-3xl overflow-hidden border border-white/10 bg-black/40 hover:border-[var(--cyber-cyan)]/50 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[var(--cyber-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-white">{t('education.diplomaAuthentication')}</div>
                        <div className="text-sm text-white/50">{t('education.openDigitalDiploma')}</div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}

              {selectedFormation.id === '1' && selectedFormation.authLink && (
                <motion.a
                  href={selectedFormation.authLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group rounded-3xl overflow-hidden border border-[var(--cyber-purple)]/30 bg-gradient-to-br from-[var(--cyber-purple)]/10 to-[var(--cyber-cyan)]/10 hover:border-[var(--cyber-purple)]/50 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[var(--cyber-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-[var(--cyber-cyan)]">{t('education.validateOnPortal')}</div>
                        <div className="text-sm text-white/50">Cogna - {t('education.scanQRCode')}</div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SectionWrapper(Formacao, 'formacao');
