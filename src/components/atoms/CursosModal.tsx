import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import close from '../../assets/close.svg';
import ThemeToggle from '../layout/ThemeToggle';
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
                            Todos os Cursos
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            aria-label="Fechar modal"
                        >
                            <img src={close} alt="" className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div
                    ref={modalRef}
                    className="flex-1 overflow-y-auto p-6"
                    tabIndex={-1}
                >
                    <div className="max-w-7xl mx-auto">
                        {/* Barra de Filtros e Organização */}
                        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:w-96">
                                <input
                                    type="text"
                                    placeholder="Buscar cursos..."
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="w-full px-6 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[var(--cyber-cyan)] transition-colors"
                                    aria-label="Buscar cursos"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">🔍</span>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <span className="text-white/60 text-sm whitespace-nowrap">Organizar por:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'year' | 'duration' | 'company')}
                                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--cyber-cyan)] transition-colors"
                                    aria-label="Organizar cursos por"
                                >
                                    <option value="year">Ano</option>
                                    <option value="duration">Duração</option>
                                    <option value="company">Empresa</option>
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
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--cyber-cyan)] transition-colors">
                                            {curso.title}
                                        </h3>
                                        <p className="text-[var(--cyber-purple)] font-bold uppercase tracking-widest text-sm mb-4">
                                            {curso.platform}
                                        </p>
                                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                                            {curso.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-white/50 font-mono">
                                            <span>Ano: {curso.date}</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <a
                                            href={curso.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[var(--cyber-cyan)] hover:text-white font-bold uppercase tracking-widest transition-all group/btn"
                                        >
                                            Ver Certificado
                                            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {sortedCursos.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-white/50 text-lg">Nenhum curso encontrado.</p>
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
