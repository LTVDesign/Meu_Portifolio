import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../../hoc';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import googleImg from '../../logos/google.webp';
import albertaImg from '../../logos/alberta.webp';
import close from '../../assets/close.svg';
import ThemeToggle from '../layout/ThemeToggle';
import type { Curso } from '../../types';

interface AllCursosProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const AllCursos = ({ isOpen = false, onClose = () => { } }: AllCursosProps) => {
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState<'year' | 'duration' | 'company'>('year');
    const [visibleCount, setVisibleCount] = useState(6);
    const modalRef = useRef<HTMLDivElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen) {
            lastFocusedElement.current = document.activeElement as HTMLElement;

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };

            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key === 'Tab' && modalRef.current) {
                    const focusableElements = modalRef.current.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0] as HTMLElement;
                    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            };

            document.addEventListener('keydown', handleEscape);
            document.addEventListener('keydown', handleTabKey);
            document.body.style.overflow = 'hidden';

            if (modalRef.current) {
                modalRef.current.focus();
            }

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.removeEventListener('keydown', handleTabKey);
                document.body.style.overflow = 'unset';

                if (lastFocusedElement.current) {
                    lastFocusedElement.current.focus();
                }
            };
        }
    }, [isOpen, onClose]);

    const allCursos: Curso[] = [
        {
            id: '1',
            title: 'Administração de Sistemas, Serviços e Infraestrutura de TI',
            platform: 'Google (via Coursera)',
            date: '2024',
            duration: 'Aproximadamente 6 meses',
            workload: 'Cerca de 120 horas',
            icon: googleImg,
            summary: 'Este curso aborda a administração de sistemas e serviços de infraestrutura de TI, cobrindo desde a instalação e configuração de sistemas operacionais até a gestão de serviços de rede e segurança. Aprenda a manter sistemas operacionais funcionando e a configurar serviços de rede essenciais.',
            description: 'Este curso ensina as habilidades fundamentais necessárias para administrar sistemas e serviços de infraestrutura de TI. Você aprenderá a instalar e configurar sistemas operacionais Windows e Linux, gerenciar serviços de rede como DNS e DHCP, implementar políticas de segurança, e realizar tarefas de manutenção e suporte. É uma base sólida para qualquer profissional de TI que trabalha com infraestrutura.',
            modules: [
                'Instalação e configuração de sistemas operacionais',
                'Gerenciamento de serviços de rede (DNS, DHCP)',
                'Administração de usuários e permissões',
                'Segurança de sistemas e redes',
                'Monitoramento e troubleshooting',
                'Automação de tarefas administrativas'
            ],
            verificationLink: 'https://www.coursera.org/account/accomplishments/verify/XQUDR4SCZEYA',
            link: 'https://www.coursera.org/learn/administracao-de-sistemas-servicos-infraestrutura-ti'
        },
        {
            id: '2',
            title: 'Fundamentos do Suporte Técnico',
            platform: 'Google (via Coursera)',
            date: '2024',
            duration: 'Aproximadamente 6 meses',
            workload: 'Cerca de 120 horas',
            icon: googleImg,
            summary: 'Certificado Profissional que cobre os fundamentos do suporte técnico, incluindo hardware, redes, sistemas operacionais, segurança e atendimento ao cliente. Uma base completa para atuação como técnico de suporte N1/N2.',
            description: 'Este certificado profissional fornece uma base abrangente para uma carreira em suporte técnico de TI. Abrange desde os conceitos básicos de hardware e software até tópicos avançados como redes, sistemas operacionais, segurança da informação e boas práticas de atendimento ao cliente. É o ponto de partida ideal para quem deseja atuar como técnico de suporte ou Help Desk.',
            modules: [
                'Fundamentos de TI e hardware',
                'Redes de computadores e protocolos',
                'Sistemas operacionais (Windows, Linux, macOS)',
                'Segurança da informação e cibersegurança',
                'Atendimento ao cliente e comunicação',
                'Resolução de problemas e troubleshooting'
            ],
            verificationLink: 'https://www.coursera.org/account/accomplishments/specialization/DFXUPFCXH965',
            isProfessionalCertificate: true,
            link: 'https://www.coursera.org/learn/fundamentos-do-suporte-tecnico'
        },
        {
            id: '3',
            title: 'Introduction to Software Product Management (PT)',
            platform: 'University of Alberta (via Coursera)',
            date: '2023',
            duration: 'Aproximadamente 6 semanas',
            workload: 'Cerca de 30 horas',
            icon: albertaImg,
            summary: 'Curso introdutório em gerenciamento de produtos de software, abordando os conceitos fundamentais de GPS, diferenças entre gerenciamento de produtos e projetos, e a importância do foco no cliente e na entrega de valor.',
            description: 'Este curso estabelece a base para o gerenciamento de produtos de software (GPS), diferenciando-o do gerenciamento de projetos tradicional. Foca em três pilares para o sucesso: fornecer o produto certo (validação), feito corretamente (verificação) e gerenciado adequadamente (processos). Aborda a filosofia Ágil e o Manifesto Ágil como ferramentas para lidar com a mudança e as expectativas dos clientes.',
            modules: [
                'Introdução ao Gerenciamento de Produtos de Software',
                'Diferenças entre Gerenciamento de Produtos e Projetos',
                'Os três pilares do GPS: Validação, Verificação e Processos',
                'Filosofia Ágil e Manifesto Ágil',
                'Foco no cliente e valor delivery',
                'Papéis e responsabilidades do Product Manager'
            ],
            verificationLink: 'https://www.coursera.org/account/accomplishments/verify/WKNDJF2YGF88',
            link: 'https://www.coursera.org/learn/introduction-to-software-product-management-pt'
        },
        {
            id: '4',
            title: 'Redes de Computadores',
            platform: 'Google (via Coursera)',
            date: '2024',
            duration: 'Aproximadamente 2 meses',
            workload: 'Cerca de 40 horas',
            icon: googleImg,
            summary: 'Curso completo sobre redes de computadores, cobrindo desde os fundamentos de comunicação de dados até protocolos, arquiteturas de rede, segurança e troubleshooting. Essencial para profissionais de TI e desenvolvimento.',
            description: 'Este curso oferece uma compreensão abrangente das redes de computadores, desde os conceitos básicos de comunicação de dados até arquiteturas de rede complexas. Aborda protocolos, modelos de referência (OSI/TCP-IP), dispositivos de rede, segurança cibernética e técnicas de diagnóstico e resolução de problemas. Fundamental para qualquer profissional de tecnologia que trabalhe com sistemas conectados.',
            modules: [
                'Fundamentos de comunicação de dados',
                'Modelos de referência (OSI e TCP/IP)',
                'Protocolos de rede (IP, TCP, UDP, HTTP, DNS)',
                'Dispositivos de rede (roteadores, switches, firewalls)',
                'Segurança de redes e criptografia',
                'Troubleshooting e monitoramento de redes'
            ],
            verificationLink: 'https://www.coursera.org/account/accomplishments/specialization/DFXUPFCXH965',
            link: 'https://www.coursera.org/learn/redes-computadores'
        }
    ];

    const filteredCursos = allCursos.filter((curso) =>
        curso.title.toLowerCase().includes(filter.toLowerCase()) ||
        curso.platform.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedCursos = [...filteredCursos].sort((a, b) => {
        if (sortBy === 'year') {
            return parseInt(b.date) - parseInt(a.date);
        } else if (sortBy === 'company') {
            return a.platform.localeCompare(b.platform);
        } else if (sortBy === 'duration') {
            const extractNumber = (duration: string | undefined): number => {
                if (!duration) return 0;
                const match = duration.match(/(\d+)/);
                return match ? parseInt(match[1]) : 0;
            };
            const durationA = extractNumber(a.duration);
            const durationB = extractNumber(b.duration);
            return durationB - durationA;
        }
        return 0;
    });

    const displayedCursos = sortedCursos.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    if (!isOpen) return null;

    const modalTitleId = 'cursos-modal-title';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
                role="presentation"
            >
                {/* Header da Modal */}
                <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-white/10 bg-black/80 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <h2 id={modalTitleId} className="text-2xl font-bold text-white">
                            {t('courses.allTitle')}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            aria-label={t('common.close')}
                        >
                            <img src={close} alt="" className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div
                    ref={modalRef}
                    className="flex-1 overflow-y-auto p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={modalTitleId}
                    tabIndex={-1}
                >
                    <div className="max-w-7xl mx-auto">
                        {/* Barra de Filtros e Organização */}
                        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:w-96">
                                <input
                                    type="text"
                                    placeholder={t('courses.filterPlaceholder')}
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="w-full px-6 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[var(--cyber-cyan)] transition-colors"
                                    aria-label={t('courses.filterPlaceholder')}
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">🔍</span>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <span className="text-white/60 text-sm whitespace-nowrap">{t('courses.sortBy')}:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'year' | 'duration' | 'company')}
                                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--cyber-cyan)] transition-colors"
                                    aria-label={t('courses.sortBy')}
                                >
                                    <option value="year">{t('courses.sortYear')}</option>
                                    <option value="duration">{t('courses.sortDuration')}</option>
                                    <option value="company">{t('courses.sortCompany')}</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid de Cursos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedCursos.map((curso, index) => (
                                <motion.div
                                    key={curso.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass-card p-8 neon-hover flex flex-col group border border-white/10"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors leading-tight">
                                                {curso.title}
                                            </h3>
                                            {curso.isProfessionalCertificate && (
                                                <span className="text-yellow-400 text-sm ml-2 flex-shrink-0">★</span>
                                            )}
                                        </div>
                                        <p className="text-[var(--cyber-purple)] font-bold uppercase tracking-widest text-sm mb-4">
                                            {curso.platform}
                                        </p>
                                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                                            {curso.summary}
                                        </p>
                                        <div className="flex flex-wrap gap-3 text-xs text-white/50 font-mono mb-4">
                                            <span className="px-2 py-1 bg-white/5 rounded">📅 {curso.date}</span>
                                            <span className="px-2 py-1 bg-white/5 rounded">⏱ {curso.duration}</span>
                                            <span className="px-2 py-1 bg-white/5 rounded">⏳ {curso.workload}</span>
                                        </div>
                                        {curso.modules && curso.modules.length > 0 && (
                                            <div className="mt-4">
                                                <p className="text-xs text-[var(--cyber-cyan)] font-bold uppercase tracking-wider mb-2">
                                                    Módulos principais:
                                                </p>
                                                <ul className="space-y-1">
                                                    {curso.modules.slice(0, 3).map((module, idx) => (
                                                        <li key={idx} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                                                            <span className="text-[var(--cyber-cyan)]">▸</span>
                                                            <span>{module}</span>
                                                        </li>
                                                    ))}
                                                    {curso.modules.length > 3 && (
                                                        <li className="text-xs text-white/40 italic">
                                                            +{curso.modules.length - 3} mais módulos...
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                                        <a
                                            href={curso.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 text-[var(--cyber-cyan)] hover:text-white font-bold uppercase tracking-widest transition-all group/btn"
                                        >
                                            {t('courses.viewCertificate')}
                                            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                        </a>
                                        {curso.verificationLink && curso.verificationLink !== '#' && (
                                            <a
                                                href={curso.verificationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 text-xs text-[var(--cyber-purple)] hover:text-[var(--cyber-cyan)] transition-colors"
                                            >
                                                <span>🔗</span>
                                                <span>Verificar autenticidade</span>
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {sortedCursos.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-white/50 text-lg">{t('courses.noResults')}</p>
                            </div>
                        ) : sortedCursos.length > visibleCount && (
                            <div className="mt-12 text-center">
                                <button
                                    onClick={handleLoadMore}
                                    className="px-8 py-3 bg-gradient-to-r from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/20 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-transform"
                                >
                                    Carregar Mais
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer da Modal */}
                <div className="sticky bottom-0 z-20 p-6 border-t border-white/10 bg-black/80 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-white/40">
                        <p>Total de cursos: {sortedCursos.length}</p>
                        <p>Leandro Saturnino Barbosa © 2024</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SectionWrapper(AllCursos, 'allcourses');
