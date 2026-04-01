import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { diploma, diplomaPdf, qrcode } from '../../assets';
import anhanguera from '../../assets/anhanguera.svg';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Disciplina, FormacaoData } from '../../types';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';
import Modal from '../atoms/Modal';

// Componente de engrenagem animada
const AnimatedGear = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className='absolute top-20 right-20 w-32 h-32 hidden lg:block opacity-30'>
      {/* Container principal da engrenagem com pulsação */}
      <motion.div
        animate={
          prefersReduced
            ? {}
            : {
              scale: [1, 1.08, 1],
            }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='relative w-full h-full'
      >
        {/* SVG da engrenagem com design realista */}
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 100 100'
          className='drop-shadow-[0_0_20px_rgba(145,94,255,0.8)]'
        >
          <defs>
            <linearGradient id='gearGradFormacao' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='#00D4FF' />
              <stop offset='50%' stopColor='#915EFF' />
              <stop offset='100%' stopColor='#FF6B9D' />
            </linearGradient>
            <filter id='glow'>
              <feGaussianBlur stdDeviation='2' result='coloredBlur' />
              <feMerge>
                <feMergeNode in='coloredBlur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>

          <g filter='url(#glow)'>
            {/* Corpo principal da engrenagem com dentes */}
            <path
              fill='rgba(20,20,30,0.9)'
              stroke='url(#gearGradFormacao)'
              strokeWidth='2.5'
              d='M50 10 L57 10 L59 20 L67 16 L73 22 L67 30 L77 34 L75 42 L87 48 L87 56 L75 60 L79 70 L71 76 L63 66 L57 74 L50 88 L43 74 L37 66 L29 76 L21 70 L25 60 L13 56 L13 48 L25 44 L21 34 L29 28 L37 38 L43 30 L50 22 Z'
            />
            {/* Círculo interno */}
            <circle
              cx='50'
              cy='50'
              r='14'
              fill='rgba(20,20,30,0.95)'
              stroke='url(#gearGradFormacao)'
              strokeWidth='2'
            />
            {/* Círculo central */}
            <circle cx='50' cy='50' r='5' fill='url(#gearGradFormacao)' />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

const Formacao = () => {
  const [selectedFormation, setSelectedFormation] = useState<FormacaoData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDiplomaModal, setShowDiplomaModal] = useState(false);
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

  const openDiplomaModal = () => {
    setShowDiplomaModal(true);
  };

  const closeDiplomaModal = () => {
    setShowDiplomaModal(false);
  };

  const formacoes: FormacaoData[] = [
    {
      id: '1',
      title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      institution: 'Anhanguera',
      date: '2023 - 2025',
      status: t('status.concluido'),
      icon: anhanguera,
      logo: anhanguera,
      period: '2023 - 2025',
      description:
        'Formação superior com foco abrangente no ciclo completo de desenvolvimento de software, desde a concepção até a implantação e manutenção de sistemas. O curso proporciona uma base sólida em análise de requisitos, arquitetura de software, gestão de projetos e metodologias ágeis, preparando profissionais capazes de liderar iniciativas tecnológicas em diversos segmentos do mercado. Com uma abordagem prática e alinhada às demandas da indústria, a graduação enfatiza o desenvolvimento de soluções inovadoras, escaláveis e sustentáveis, capacitando os egressos a enfrentar os desafios contemporâneos da área de tecnologia da informação com excelência técnica e visão estratégica. Durante o curso, foram exploradas tecnologias modernas como React, Node.js, TypeScript, bancos de dados relacionais e não-relacionais, além de práticas de DevOps e CI/CD, proporcionando uma formação completa e atualizada com as necessidades do mercado de trabalho.',
      link: '#',
      cargaHorariaGeral: '2100h',
      dataConclusao: '13/12/2025',
      diplomaPreview: diploma,
      diplomaDownload: diplomaPdf,
      qrCode: qrcode,
      authLink:
        'https://diplomas.cogna.com.br/diploma-digital/diploma?code=298.298.ed35015ba174&fornecedor=AVMB',
      disciplinas: [
        // 2023/2
        {
          semestre: '2023/2',
          materia: 'Engenharia de Software',
          professor: 'Marcio de Castro Oliveira',
          nota: 8.7,
          cargaHoraria: '60h',
        },
        {
          semestre: '2023/2',
          materia: 'Linguagem de Programação',
          professor: 'Gerson Risso',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2023/2',
          materia: 'Lógica e Matemática Computacional',
          professor: 'Leonardo de Souza',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2023/2',
          materia: 'Algoritmos e Programação Estruturada',
          professor: 'Gerson Risso',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2023/2',
          materia: 'Análise e Modelagem de Sistemas',
          professor: 'Marcio de Castro Oliveira',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        // 2024/1
        {
          semestre: '2024/1',
          materia: 'Análise Orientada a Objetos',
          professor: 'Marcio de Castro Oliveira',
          nota: 9.9,
          cargaHoraria: '60h',
        },
        {
          semestre: '2024/1',
          materia: 'Linguagem Orientada a Objetos',
          professor: 'Gerson Risso',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2024/1',
          materia: 'Modelagem de Dados',
          professor: 'Gerson Risso',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2024/1',
          materia: 'Projeto de Extensão I',
          professor: 'Maria Jose de Castro Oliveira',
          nota: 10.0,
          cargaHoraria: '220h',
        },
        {
          semestre: '2024/1',
          materia: 'Qualidade e Automação de Testes',
          professor: 'Rodrigo de Souza Rocha',
          nota: 8.8,
          cargaHoraria: '60h',
        },
        // 2024/2
        {
          semestre: '2024/2',
          materia: 'Sistemas Operacionais',
          professor: 'Rodrigo de Souza Rocha',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2024/2',
          materia: 'Computação em Nuvem',
          professor: 'Rodrigo de Souza Rocha',
          nota: 8.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2024/2',
          materia: 'Governança de Tecnologia',
          professor: 'Rodrigo de Souza Rocha',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2024/2',
          materia: 'Green IT',
          professor: 'Rodrigo de Souza Rocha',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2024/2',
          materia: 'Programação e Desenv. de Banco de Dados',
          professor: 'Gerson Risso',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        // 2025/1
        {
          semestre: '2025/1',
          materia: 'Programação Web',
          professor: 'Gerson Risso',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/1',
          materia: 'Desenvolvimento em Javascript',
          professor: 'Gerson Risso',
          nota: 9.9,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/1',
          materia: 'Desenvolvimento Mobile',
          professor: 'Gerson Risso',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/1',
          materia: 'Desenvolvimento Responsivo',
          professor: 'Gerson Risso',
          nota: 8.1,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/1',
          materia: 'Frameworks para Desenv. de Software',
          professor: 'Gerson Risso',
          nota: 9.8,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/1',
          materia: 'Projeto de Extensão II',
          professor: 'Maria Jose de Castro Oliveira',
          nota: 10.0,
          cargaHoraria: '220h',
        },
        {
          semestre: '2025/1',
          materia: 'Sistemas Distribuídos',
          professor: 'Gerson Risso',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        // 2025/2
        {
          semestre: '2025/2',
          materia: 'Arquitetura e Org. de Computadores',
          professor: 'Rodrigo de Souza Rocha',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/2',
          materia: 'Projeto de Software',
          professor: 'Marcio de Castro Oliveira',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/2',
          materia: 'Redes de Computadores',
          professor: 'Rodrigo de Souza Rocha',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/2',
          materia: 'Segurança e Auditoria de Sistemas',
          professor: 'Rodrigo de Souza Rocha',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/2',
          materia: 'Sociedade Brasileira e Cidadania',
          professor: 'Leonardo de Souza',
          nota: 10.0,
          cargaHoraria: '60h',
        },
        {
          semestre: '2025/2',
          materia: 'Interface e Usabilidade',
          professor: 'Rodrigo de Souza Rocha',
          nota: 10.0,
          cargaHoraria: '60h',
        },
      ],
    },
    {
      id: '2',
      title: 'Inteligência Artificial: Conceitos, Ferramentas e Aplicações',
      institution: 'Anhanguera',
      date: '2026 - Em andamento',
      status: t('status.emAndamento'),
      icon: anhanguera,
      logo: anhanguera,
      period: '2026 - Em andamento',
      description:
        'O curso de pós-graduação em Inteligência Artificial e Data Science é projetado para atender às demandas crescentes do mercado tecnológico, capacitando profissionais a desenvolver soluções inovadoras e baseadas em dados. Com uma abordagem prática e avançada, o curso prepara os alunos para enfrentar os desafios do mundo do trabalho, promovendo a inovação e a precisão em suas respectivas áreas de atuação.',
      link: '#',
      tipoFormacao: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      cargaHorariaGeral: '360h',
      statusDiploma: 'Em breve',
      nota: '10,0',
      disciplinas: [
        {
          semestre: '2026/1',
          materia: 'Inteligência Artificial: Conceitos, Ferramentas e Aplicações',
          professor: 'Corpo Docente',
          nota: 10.0,
          cargaHoraria: '30h',
        },
        {
          semestre: '2026/1',
          materia: 'Redes Neurais',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2026/1',
          materia: 'Processamento de linguagem natural',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2026/1',
          materia: 'Visão computacional Generativa',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2026/2',
          materia:
            'Modelos generativos (GANs, Variational Autoencoders (VAEs) e Flow-based Models)',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2026/2',
          materia: 'Linguagens de programação para ciência de dados (Python com Spark)',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2026/2',
          materia: 'Data Discovery, Olap e visualização de dados',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2027/1',
          materia: 'Linguagem SQL para Data Analytics',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2027/1',
          materia: 'Integração e fluxo de dados (ETL)',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2027/1',
          materia: 'Governança de dados',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2027/2',
          materia: 'Interações entre big data e cloud computing',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
        {
          semestre: '2027/2',
          materia: 'Lei Geral de Proteção de Dados',
          professor: 'Corpo Docente',
          nota: 'CURSANDO',
          cargaHoraria: '30h',
        },
      ],
    },
  ];

  const stats = useMemo(() => {
    if (!selectedFormation || !selectedFormation.disciplinas) return null;
    const items = selectedFormation.disciplinas.filter(
      (d) => typeof d !== 'string'
    ) as Disciplina[];
    if (items.length === 0) return null;

    // Filtrar apenas disciplinas com nota numérica para cálculos de média
    const itemsComNota = items.filter((d) => !isNaN(Number(d.nota)));

    const totalCH = items.reduce((acc, d) => acc + parseInt(d.cargaHoraria), 0);
    const weightedSum = itemsComNota.reduce(
      (acc, d) => acc + Number(d.nota) * parseInt(d.cargaHoraria),
      0
    );
    const average = itemsComNota.length > 0 ? weightedSum / totalCH : 0;

    const semesterData = items.reduce(
      (acc, d) => {
        const sem = d.semestre || 'N/A';
        if (!acc[sem]) {
          acc[sem] = {
            sum: 0,
            count: 0,
            ch: 0,
            disciplinas: [],
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
      },
      {} as Record<
        string,
        { sum: number; count: number; ch: number; disciplinas: Disciplina[] }
      >
    );

    const chartData = Object.keys(semesterData).map((sem) => ({
      sem,
      avg:
        semesterData[sem].count > 0 ? semesterData[sem].sum / semesterData[sem].count : 0,
      ch: semesterData[sem].ch,
    }));

    return { average, totalCH, chartData, semesterData, allDisciplinas: items };
  }, [selectedFormation]);

  return (
    <div className='max-w-7xl mx-auto px-6 relative'>
      {/* Engrenagem animada decorativa */}
      <AnimatedGear />

      <Header useMotion={true} p={t('formacao.p')} h2={t('formacao.h2')} />

      {/* Linha com animação discreta de brilho */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className='relative w-full max-w-xl mx-auto my-8'
      >
        <div className='h-[1px] bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent relative'>
          {/* Brilho esquerdo */}
          <motion.div
            className='absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--cyber-cyan)] blur-sm'
            style={{ left: '50%' }}
            animate={{
              left: ['50%', '0%', '50%'],
              opacity: [0.8, 0.3, 0.8],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Brilho direito */}
          <motion.div
            className='absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--cyber-purple)] blur-sm'
            style={{ right: '50%' }}
            animate={{
              right: ['50%', '0%', '50%'],
              opacity: [0.8, 0.3, 0.8],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>

      <div className='mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {formacoes.map((item, index) => (
          <motion.div
            key={item.title}
            variants={prefersReduced ? {} : fadeIn('up', 'spring', index * 0.1, 0.75)}
            onClick={() => openModal(item)}
            className='glass-card group relative overflow-hidden p-8 md:p-10 flex flex-col h-full neon-hover border border-white/10 cursor-pointer'
          >
            <div
              className={`absolute top-4 right-4 px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full text-white shadow-[0_0_15px_rgba(145,94,255,0.5)] border border-white/30 z-20 backdrop-blur-sm ${item.status === t('status.concluido')
                ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                : 'bg-gradient-to-r from-yellow-600 to-orange-600'
                }`}
            >
              {item.status}
            </div>

            <div className='flex flex-col md:flex-row items-start gap-8 pt-6'>
              <div className='w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-black/50 p-4 flex items-center justify-center shadow-inner relative z-10'>
                <img
                  src={item.logo}
                  alt={item.institution}
                  className='w-20 h-20 object-contain transition-transform duration-500 ease-out group-hover:scale-110'
                />
              </div>

              <div className='flex-1 relative z-10'>
                <h3 className='text-xl md:text-2xl font-black text-white group-hover:text-[var(--cyber-cyan)] transition-colors tracking-tight'>
                  {item.title}
                </h3>
                <p className='text-[var(--cyber-purple)] font-bold uppercase tracking-widest mt-2 text-sm'>
                  {item.institution}
                </p>
                <div className='mt-3 text-white/50 text-xs font-mono uppercase tracking-[0.2em]'>
                  {t('education.period')}: {item.period}
                </div>

                <p className='mt-4 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity line-clamp-4'>
                  {item.description}
                </p>
                {/* Ajuste de layout para cards de formação */}
              </div>
            </div>

            <div className='mt-auto pt-10 flex justify-center'>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: '0 10px 40px rgba(0, 255, 255, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                className='relative px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-3 shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden'
              >
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)]/20 to-transparent'
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <span className='relative z-10'>VER DETALHES</span>

                <div className='absolute inset-0 rounded-2xl border border-[var(--cyber-cyan)]/0 group-hover/btn:border-[var(--cyber-cyan)]/60 transition-all duration-300' />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedFormation && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedFormation.title}>
          <div className='p-2'>
            <div className='flex gap-2 mb-3'>
              <div className='w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 bg-black/50 p-2 flex items-center justify-center'>
                <img
                  src={selectedFormation.logo}
                  alt={selectedFormation.institution}
                  className='w-12 h-12 object-contain'
                />
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='text-sm font-bold text-white mb-1 line-clamp-2'>
                  {selectedFormation.title}
                </h3>
                <p className='text-[var(--cyber-purple)] font-bold uppercase tracking-widest text-xs'>
                  {selectedFormation.institution}
                </p>
                <div className='mt-1 text-white/50 text-xs font-mono'>
                  {t('education.period')}: {selectedFormation.period}
                </div>
              </div>
            </div>

            {stats && (
              <div className='p-2 rounded-lg bg-black/40 border border-white/10 overflow-hidden'>
                <div className='flex items-start justify-between gap-2 mb-3'>
                  <h4 className='text-xs font-bold text-white'>
                    {t('education.semesterEvolution')}
                  </h4>
                  <div className='p-1.5 bg-black/60 rounded border border-white/10 flex-shrink-0'>
                    <div className='text-center'>
                      <div className='text-sm font-bold text-[var(--cyber-cyan)]'>
                        {stats.average.toFixed(1)}
                      </div>
                      <div className='text-[10px] text-white/50 uppercase tracking-widest'>
                        {t('education.generalAverage')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='space-y-1.5'>
                  {stats.chartData.map((data, index) => (
                    <div key={index} className='flex items-center gap-1'>
                      <div className='w-14 text-[10px] text-white/70 truncate'>
                        {data.sem}
                      </div>
                      <div className='flex-1 h-4 bg-white/5 rounded overflow-hidden relative'>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(data.avg / 10) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className='h-full bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)]'
                        />
                        <div className='absolute inset-0 flex items-center justify-center text-[10px] font-bold'>
                          {data.avg.toFixed(1)}
                        </div>
                      </div>
                      <div className='w-10 text-right text-[10px] text-white/50'>
                        {data.ch}h
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFormation.disciplinas &&
              selectedFormation.disciplinas.length > 0 && (
                <div className='mt-4'>
                  <h4 className='text-xs font-bold text-white mb-2'>
                    {t('education.semesterHistory')}
                  </h4>
                  <div className='overflow-x-auto -mx-1 px-1'>
                    <table className='w-full text-[10px]'>
                      <thead>
                        <tr className='border-b border-white/10'>
                          <th className='text-left py-2 px-1.5 text-white/70'>
                            {t('education.semester')}
                          </th>
                          <th className='text-left py-2 px-1.5 text-white/70'>
                            {t('education.subject')}
                          </th>
                          <th className='text-center py-2 px-1.5 text-white/70'>
                            {t('education.grade')}
                          </th>
                          <th className='text-center py-2 px-1.5 text-white/70'>
                            {t('education.professor')}
                          </th>
                          <th className='text-right py-2 px-1.5 text-white/70'>
                            {t('education.hours')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedFormation.disciplinas
                          .filter(
                            (disc) =>
                              typeof disc === 'object' &&
                              disc !== null &&
                              'semestre' in disc
                          )
                          .map((disc, idx) => {
                            const disciplina = disc as Disciplina;
                            return (
                              <tr
                                key={idx}
                                className='border-b border-white/5 hover:bg-white/5'
                              >
                                <td className='py-2 px-1.5 text-white/50 truncate max-w-20'>
                                  {disciplina.semestre}
                                </td>
                                <td className='py-2 px-1.5 text-white truncate max-w-32'>
                                  {disciplina.materia}
                                </td>
                                <td
                                  className='text-center py-2 px-1.5 font-bold'
                                  style={{
                                    color:
                                      Number(disciplina.nota) >= 7
                                        ? '#10b981'
                                        : '#ef4444',
                                  }}
                                >
                                  {disciplina.nota}
                                </td>
                                <td className='text-center py-2 px-1.5 text-white/50 truncate max-w-24'>
                                  {disciplina.professor}
                                </td>
                                <td className='text-right py-2 px-1.5 text-white/50'>
                                  {disciplina.cargaHoraria}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            <div className='mt-4 flex flex-wrap gap-1.5'>
              {selectedFormation.diplomaPreview && (
                <motion.div
                  onClick={openDiplomaModal}
                  className='relative group rounded-3xl overflow-hidden border border-white/10 bg-black/40 cursor-pointer hover:border-[var(--cyber-cyan)]/50 transition-all'
                >
                  <div className='p-2'>
                    <div className='flex items-center gap-2'>
                      <div className='w-10 h-10 rounded overflow-hidden border border-white/20 bg-black/60 p-1 flex items-center justify-center'>
                        <img
                          src={selectedFormation.diplomaPreview}
                          alt='Diploma'
                          className='w-8 h-8 object-contain'
                        />
                      </div>
                      <div>
                        <div className='font-bold text-white text-xs'>
                          {t('education.diplomaPreview')}
                        </div>
                        <div className='text-[8px] text-white/50'>
                          {t('education.clickToOpen')}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedFormation.diplomaDownload && (
                <motion.a
                  href={selectedFormation.diplomaDownload}
                  download
                  className='relative group rounded-3xl overflow-hidden border border-white/10 bg-black/40 hover:border-[var(--cyber-cyan)]/50 transition-all'
                >
                  <div className='p-2'>
                    <div className='flex items-center gap-2'>
                      <div className='w-10 h-10 rounded bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center'>
                        <svg
                          className='w-5 h-5 text-[var(--cyber-cyan)]'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                      </div>
                      <div>
                        <div className='font-bold text-white text-xs'>
                          {t('education.diplomaAuthentication')}
                        </div>
                        <div className='text-[8px] text-white/50'>
                          {t('education.openDigitalDiploma')}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}

              {selectedFormation.id === '1' && selectedFormation.authLink && (
                <motion.a
                  href={selectedFormation.authLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='relative group rounded-3xl overflow-hidden border border-[var(--cyber-purple)]/30 bg-gradient-to-br from-[var(--cyber-purple)]/10 to-[var(--cyber-cyan)]/10 hover:border-[var(--cyber-purple)]/50 transition-all'
                >
                  <div className='p-2'>
                    <div className='flex items-center gap-2'>
                      <div className='w-10 h-10 rounded bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/20 flex items-center justify-center'>
                        <svg
                          className='w-5 h-5 text-[var(--cyber-cyan)]'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                      </div>
                      <div>
                        <div className='font-bold text-[var(--cyber-cyan)] text-xs'>
                          {t('education.validateOnPortal')}
                        </div>
                        <div className='text-[8px] text-white/50'>
                          Cogna - {t('education.scanQRCode')}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Modal interno para preview do diploma */}
      {selectedFormation && showDiplomaModal && (
        <Modal
          isOpen={showDiplomaModal}
          onClose={closeDiplomaModal}
          title={t('education.diplomaPreview')}
        >
          <div className='p-2'>
            <div className='flex flex-col items-center'>
              <div className='w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-2'>
                <img
                  src={selectedFormation.diplomaPreview}
                  alt='Diploma'
                  className='w-full h-auto object-contain rounded-xl'
                />
              </div>

              {selectedFormation.qrCode && (
                <div className='mt-4 p-2 rounded-lg bg-black/40 border border-white/10'>
                  <div className='flex flex-col items-center gap-1'>
                    <img
                      src={selectedFormation.qrCode}
                      alt='QR Code'
                      className='w-24 h-24 object-contain'
                    />
                    <p className='text-[10px] text-white/50 text-center'>
                      {t('education.scanQRCode')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SectionWrapper(Formacao, 'formacao');
