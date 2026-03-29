import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';
import Modal from '../atoms/Modal';
import facul from '../../assets/facul.webp';
import type { FormacaoData } from '../../types';

const Formacao = () => {
  const [selectedFormation, setSelectedFormation] = useState<FormacaoData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const formacoes: FormacaoData[] = [
    {
      id: '1',
      title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      institution: 'Anhanguera',
      date: '2022 - 2024',
      status: 'CONCLUÍDO',
      icon: facul,
      logo: facul,
      period: '2022 - 2024',
      description: 'Formação completa em desenvolvimento de software, análise de sistemas e gestão de projetos de TI voltados para o mercado corporativo.',
      link: '#',
      disciplinas: [
        'Algoritmos e Lógica de Programação',
        'Estrutura de Dados',
        'Desenvolvimento Web Frontend',
        'Desenvolvimento Web Backend',
        'Banco de Dados',
        'Engenharia de Software',
        'Projeto Final',
        'Segurança da Informação',
        'Gestão de Projetos',
        'Sistemas Operacionais'
      ]
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

  const openModal = (formacao: FormacaoData) => {
    setSelectedFormation(formacao);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFormation(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Header useMotion={true} p={t('formacao.p')} h2={t('formacao.h2')} />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {formacoes.map((item, index) => (
          <motion.div
            key={item.title}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="glass-card group relative overflow-hidden p-8 md:p-10 flex flex-col h-full neon-hover border border-white/10"
          >
            {/* Badge Indicator */}
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
              <button
                onClick={() => openModal(item)}
                className="btn-primary w-full text-xs font-bold uppercase tracking-widest py-4 justify-center gap-3 group/btn rounded-2xl shadow-[0_0_20px_rgba(145,94,255,0.2)]"
              >
                Ver Detalhes do Certificado
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Detalhes da Formação */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedFormation?.title || ''}
      >
        {selectedFormation && (
          <div className="space-y-8">
            {/* Informações Gerais */}
            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-black/50 p-4 flex items-center justify-center">
                <img src={selectedFormation.logo} alt={selectedFormation.institution} className="w-16 h-16 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedFormation.title}</h3>
                <p className="text-[var(--cyber-purple)] font-bold uppercase tracking-widest mb-2">{selectedFormation.institution}</p>
                <div className="text-white/50 text-sm font-mono mb-4">
                  Período: {selectedFormation.period}
                </div>
                <div className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white">
                  {selectedFormation.status}
                </div>
              </div>
            </div>

            {/* Lista de Disciplinas */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-[var(--cyber-cyan)]">▶</span> Matérias Cursadas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedFormation.disciplinas.map((disc: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <h5 className="text-white font-bold mb-2">{disc}</h5>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Úteis */}
            {selectedFormation.diplomaLink && (
              <div className="grid grid-cols-1 gap-4">
                <a
                  href={selectedFormation.diplomaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--cyber-cyan)]/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <div className="text-left">
                      <h5 className="text-white font-bold">Diploma Digital</h5>
                      <p className="text-white/50 text-xs">Clique para visualizar</p>
                    </div>
                  </div>
                  <span className="text-[var(--cyber-cyan)] group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SectionWrapper(Formacao, 'formacao');
