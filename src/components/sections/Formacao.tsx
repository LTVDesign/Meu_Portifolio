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

const Formacao = () => {
  const [selectedFormation, setSelectedFormation] = useState<FormacaoData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

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
      status: 'CONCLUÍDO',
      icon: facul,
      logo: facul,
      period: '2023 - 2025',
      description: 'Formação superior focada no ciclo completo de desenvolvimento de software, análise de requisitos e gestão de projetos. Concluído com excelência acadêmica.',
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
      title: 'Pós-Graduação em IA & Data Science',
      institution: 'Anhanguera',
      date: '2024 - Em andamento',
      status: 'EM ANDAMENTO',
      icon: facul,
      logo: facul,
      period: '2024 - Em andamento',
      description: 'Especialização focada em Inteligência Artificial Generativa, Machine Learning e análise estatística para decisões baseadas em dados.',
      link: '#',
      disciplinas: [
        'Introdução à Inteligência Artificial',
        'Machine Learning',
        'Deep Learning',
        'Processamento de Linguagem Natural',
        'Big Data e Analytics',
        'Estatística Aplicada',
        'Visualização de Dados',
        'Ética em IA'
      ]
    }
  ];

  const stats = useMemo(() => {
    if (!selectedFormation || selectedFormation.id !== '1') return null;
    const items = selectedFormation.disciplinas.filter(d => typeof d !== 'string') as Disciplina[];
    if (items.length === 0) return null;

    const totalCH = items.reduce((acc, d) => acc + parseInt(d.cargaHoraria), 0);
    const weightedSum = items.reduce((acc, d) => acc + (Number(d.nota) * parseInt(d.cargaHoraria)), 0);
    const average = weightedSum / totalCH;

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
      acc[sem].sum += Number(d.nota);
      acc[sem].count += 1;
      acc[sem].ch += parseInt(d.cargaHoraria);
      acc[sem].disciplinas.push(d);
      return acc;
    }, {} as Record<string, { sum: number, count: number, ch: number, disciplinas: Disciplina[] }>);

    const chartData = Object.keys(semesterData).map(sem => ({
      sem,
      avg: semesterData[sem].sum / semesterData[sem].count,
      ch: semesterData[sem].ch
    }));

    return { average, totalCH, chartData, semesterData };
  }, [selectedFormation]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Header useMotion={true} p={t('formacao.p')} h2={t('formacao.h2')} />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {formacoes.map((item, index) => (
          <motion.div
            key={item.title}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            onClick={() => openModal(item)}
            className="glass-card group relative overflow-hidden p-8 md:p-10 flex flex-col h-full neon-hover border border-white/10 cursor-pointer"
          >
            <div className="absolute top-4 right-4 px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white shadow-lg border border-white/20 z-20">
              {item.status}
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-black/50 p-4 flex items-center justify-center shadow-inner relative z-10 transition-transform group-hover:scale-105">
                <img src={item.logo} alt={item.institution} className="w-12 h-12 object-contain" />
              </div>

              <div className="flex-1 relative z-10">
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[var(--cyber-cyan)] transition-colors tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--cyber-purple)] font-bold uppercase tracking-widest mt-2 text-sm">{item.institution}</p>
                <div className="mt-3 text-white/50 text-xs font-mono uppercase tracking-[0.2em]">
                  Período: {item.period}
                </div>

                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-10">
              <div className="w-full text-xs font-bold uppercase tracking-widest py-4 justify-center gap-3 group/btn rounded-2xl shadow-[0_0_20px_rgba(145,94,255,0.2)] flex items-center justify-center text-center">
                {t('formacao.viewDetails')}
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedFormation?.title || ''}
      >
        {selectedFormation && (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyber-purple)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-32 h-32 flex-shrink-0 rounded-3xl overflow-hidden border border-white/20 bg-black/60 p-6 flex items-center justify-center shadow-2xl relative z-10">
                <img src={selectedFormation.logo} alt={selectedFormation.institution} className="w-20 h-20 object-contain" />
              </div>
              <div className="flex-1 text-center md:text-left relative z-10">
                <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">{selectedFormation.title}</h3>
                <p className="text-[var(--cyber-cyan)] font-extrabold uppercase tracking-[0.3em] text-sm mb-4">{selectedFormation.institution}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-white/70 text-xs font-mono">
                    Período: <span className="text-white">{selectedFormation.period}</span>
                  </div>
                  {selectedFormation.cargaHorariaGeral && (
                    <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-white/70 text-xs font-mono">
                      Carga Horária: <span className="text-[var(--cyber-cyan)] font-bold">{selectedFormation.cargaHorariaGeral}</span>
                    </div>
                  )}
                  {selectedFormation.dataConclusao && (
                    <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-white/70 text-xs font-mono">
                      Concluído em: <span className="text-white">{selectedFormation.dataConclusao}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {stats && (
              <div className="p-8 rounded-3xl bg-black/40 border border-white/10 relative overflow-hidden">
                <div className="absolute top-4 right-4 p-4 bg-black/60 rounded-xl border border-white/10">
                  <div className="text-center">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Média Geral</p>
                    <span className="text-3xl font-black text-[var(--cyber-cyan)] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                      {stats.average.toFixed(2)}
                    </span>
                    <p className="text-white/30 text-[9px] uppercase tracking-widest mt-2">
                      {stats.totalCH}h total
                    </p>
                  </div>
                </div>

                <h4 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[var(--cyber-cyan)] rounded-full" />
                  Evolução Acadêmica por Semestre
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end h-56">
                  {stats.chartData.map((data, idx) => (
                    <div key={data.sem} className="flex flex-col items-center gap-3 group/bar">
                      <div className="relative w-full h-40 bg-white/5 rounded-xl overflow-hidden flex items-end border border-white/5">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.min(data.avg * 10, 100)}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="w-full bg-gradient-to-t from-[var(--cyber-purple)] to-[var(--cyber-cyan)] relative"
                        >
                          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                        </motion.div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/bar:opacity-100 transition-opacity bg-black/60">
                          <span className="text-[10px] font-bold text-white mb-1">Média</span>
                          <span className="text-lg font-black text-[var(--cyber-cyan)]">
                            {data.avg.toFixed(1)}
                          </span>
                          <span className="text-[9px] text-white/50 mt-1">{data.ch}h</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] font-mono text-[var(--cyber-cyan)] font-bold">
                          {data.sem}
                        </span>
                        <p className="text-[8px] text-white/30">{data.ch}h</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[var(--cyber-purple)] rounded-full" />
                Histórico Acadêmico Completo
              </h4>

              {stats && stats.semesterData && (
                <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                  {Object.entries(stats.semesterData)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([semestre, data]) => (
                      <div key={semestre} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-[var(--cyber-purple)]/10 to-transparent border-b border-white/5">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <h5 className="text-[var(--cyber-cyan)] font-black text-lg uppercase tracking-wider">
                                {semestre}
                              </h5>
                              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
                                {data.disciplinas.length} disciplina(s)
                              </p>
                            </div>
                            <div className="flex gap-4">
                              <div className="text-right">
                                <p className="text-white/40 text-[9px] uppercase tracking-widest mb-1">Carga Horária Total</p>
                                <p className="text-[var(--cyber-cyan)] font-mono font-bold text-lg">
                                  {data.ch}h
                                </p>
                              </div>
                              <div className="h-8 w-px bg-white/10 hidden md:block" />
                              <div className="text-right">
                                <p className="text-white/40 text-[9px] uppercase tracking-widest mb-1">Média do Semestre</p>
                                <p className="text-white font-mono font-bold text-lg">
                                  {(data.sum / data.count).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 space-y-2">
                          {data.disciplinas
                            .sort((a, b) => a.materia.localeCompare(b.materia))
                            .map((disc, idx) => (
                              <div
                                key={idx}
                                className="group/item p-4 rounded-xl bg-black/30 border border-white/5 hover:border-[var(--cyber-cyan)]/30 transition-all"
                              >
                                <div className="flex flex-col md:flex-row md:items-center gap-3">
                                  <div className="flex-1">
                                    <h5 className="text-white font-bold text-sm group-hover/item:text-[var(--cyber-cyan)] transition-colors">
                                      {disc.materia}
                                    </h5>
                                    <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium mt-1">
                                      {disc.professor}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="text-center min-w-[50px]">
                                      <p className="text-white/20 text-[8px] uppercase tracking-widest mb-1">Carga H.</p>
                                      <p className="text-white font-mono text-xs">{disc.cargaHoraria}</p>
                                    </div>
                                    <div className="h-6 w-px bg-white/10 hidden md:block" />
                                    <div className="text-center min-w-[50px]">
                                      <p className="text-white/20 text-[8px] uppercase tracking-widest mb-1">Nota</p>
                                      <p className={`text-base font-black font-mono ${Number(disc.nota) >= 9 ? 'text-[var(--cyber-cyan)]' : 'text-white'}`}>
                                        {Number(disc.nota).toFixed(1)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {(!stats || !selectedFormation.disciplinas) && (
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <p className="text-white/40">Nenhum registro de disciplinas disponível.</p>
                </div>
              )}
            </div>

            {(selectedFormation.diplomaPreview || selectedFormation.authLink) && (
              <div className="space-y-6 pt-6">
                <h4 className="text-xl font-black text-white flex items-center gap-3">
                  <span className="w-2 h-8 bg-[var(--cyber-cyan)] rounded-full" />
                  Diploma e Autenticação
                </h4>

                {selectedFormation.diplomaPreview && (
                  <div
                    onClick={() => window.open(selectedFormation.diplomaDownload, '_blank')}
                    className="relative group/diploma rounded-3xl overflow-hidden border border-white/10 bg-black/40 cursor-pointer hover:border-[var(--cyber-cyan)]/50 transition-all"
                  >
                    <img
                      src={selectedFormation.diplomaPreview}
                      alt="Preview do Diploma"
                      className="w-full h-64 object-cover opacity-60 group-hover/diploma:opacity-40 blur-[2px] group-hover/diploma:blur-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-transparent to-black/80">
                      <div className="transform transition-transform group-hover/diploma:scale-110">
                        <h5 className="text-white font-black text-2xl mb-4 drop-shadow-lg">Clique para Abrir Diploma</h5>
                        <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] text-black font-bold text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(0,243,255,0.4)]">
                          📄 Abrir Diploma Digital
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedFormation.authLink && (
                  <div className="rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      <div className="w-32 h-32 bg-white p-4 rounded-3xl flex-shrink-0 shadow-2xl border-2 border-[var(--cyber-cyan)]/30">
                        <img src={selectedFormation.qrCode} alt="QR Code" className="w-full h-full object-contain" />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h5 className="text-white font-black text-2xl mb-3 tracking-tight">Verificação de Autenticidade</h5>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                          Escaneie o QR Code com seu smartphone ou clique no botão abaixo para verificar a autenticidade deste diploma no portal oficial da Cogna.
                        </p>
                        <a
                          href={selectedFormation.authLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] text-black font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,243,255,0.4)]"
                        >
                          🔗 Validar no Portal Oficial
                          <span className="text-lg">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SectionWrapper(Formacao, 'formacao');
