import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import close from '../../assets/close.svg';
import type { Curso } from '../../types';

interface CursosModalProps {
    isOpen: boolean;
    onClose: () => void;
    cursos: Curso[];
}

const CursosModal = ({ isOpen, onClose, cursos }: CursosModalProps) => {
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState<'year' | 'duration' | 'company'>('year');
    const modalRef = useRef<HTMLDivElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen) {
            // Salvar o elemento que tinha foco antes de abrir o modal
            lastFocusedElement.current = document.activeElement as HTMLElement;

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };

            // Focus trap dentro do modal
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

            // Focar no modal quando abrir
            if (modalRef.current) {
                modalRef.current.focus();
            }

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.removeEventListener('keydown', handleTabKey);
                document.body.style.overflow = 'unset';

                // Retornar foco ao elemento anterior
                if (lastFocusedElement.current) {
                    lastFocusedElement.current.focus();
                }
            };
        }
    }, [isOpen, onClose]);

    const filteredCursos = cursos.filter((curso) =>
        curso.title.toLowerCase().includes(filter.toLowerCase()) ||
        curso.platform.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedCursos = [...filteredCursos].sort((a, b) => {
        if (sortBy === 'year') {
            return parseInt(b.date) - parseInt(a.date);
        } else if (sortBy === 'company') {
            return a.platform.localeCompare(b.platform);
        } else if (sortBy === 'duration') {
            // Função segura para extrair número da duração
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
                            {sortedCursos.map((curso, index) => (
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
                                            className="glass-btn inline-flex items-center justify-center text-sm font-medium rounded-full px-6 py-2"
                                        >
                                            {t('courses.viewCertificate')}
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

                        {sortedCursos.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-white/50 text-lg">{t('courses.noResults')}</p>
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

export default CursosModal;
