import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Curso {
    id: string;
    title: string;
    platform: string;
    date: string;
    duration: string;
    icon: string;
    description: string;
    link: string;
}

interface CursoDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    curso: Curso | null;
}

const CursoDetailModal: React.FC<CursoDetailModalProps> = ({ isOpen, onClose, curso }) => {
    if (!isOpen || !curso) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] rounded-2xl border border-[var(--cyber-purple)]/30 shadow-[0_0_50px_rgba(145,94,255,0.3)] max-w-md w-full max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center flex-shrink-0 overflow-hidden p-2">
                                <img src={curso.icon} alt={curso.platform} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-black text-white leading-tight">
                                    {curso.title}
                                </h3>
                                <p className="text-xs text-[var(--cyber-purple)] font-bold uppercase tracking-widest mt-1">
                                    {curso.platform}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[50vh]">
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                            {curso.description}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 flex items-center justify-between">
                        <a
                            href={curso.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(145,94,255,0.4)]"
                        >
                            Download Certificado
                        </a>
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all"
                        >
                            Fechar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CursoDetailModal;