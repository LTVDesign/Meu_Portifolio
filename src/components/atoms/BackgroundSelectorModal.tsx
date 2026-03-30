import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface BackgroundSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const backgrounds = [
    { id: 'cyberpunk', name: 'Cyberpunk', gradient: 'from-[var(--cyber-purple)] to-[var(--cyber-cyan)]' },
    { id: 'matrix', name: 'Matrix', gradient: 'from-green-500 to-emerald-700' },
    { id: 'ocean', name: 'Ocean', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'sunset', name: 'Sunset', gradient: 'from-orange-500 to-pink-500' },
    { id: 'aurora', name: 'Aurora', gradient: 'from-purple-500 to-teal-400' },
    { id: 'minimal', name: 'Minimal', gradient: 'from-gray-700 to-gray-900' },
];

const BackgroundSelectorModal: React.FC<BackgroundSelectorModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSelectBackground = (bgId: string) => {
        // Salvar no localStorage ou context
        localStorage.setItem('selectedBackground', bgId);
        onClose();
        // Pode navegar para uma página de preview ou aplicar diretamente
        navigate('/');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop com blur */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] shadow-[0_0_60px_rgba(145,94,255,0.3)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botão Fechar - Otimizado e Animado */}
                        <motion.button
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", damping: 20, stiffness: 200 }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 90,
                                boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white font-bold text-xl shadow-[0_0_25px_rgba(145,94,255,0.5)] hover:shadow-[0_0_40px_rgba(0,255,255,0.7)] transition-all duration-300 group"
                            aria-label="Fechar"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            {/* Efeito de brilho rotativo */}
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                                <motion.div
                                    className="w-full h-full"
                                    style={{
                                        background: `conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4), transparent)`
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                            </div>

                            {/* Pulsação interna */}
                            <motion.div
                                className="absolute inset-1 rounded-full bg-gradient-to-br from-[var(--cyber-purple)] to-[var(--cyber-cyan)] opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.button>

                        {/* Header */}
                        <div className="p-8 border-b border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyber-purple)]/10 to-transparent" />
                            <motion.h2
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl font-black text-white relative z-10"
                            >
                                {t('backgrounds.title') || 'Selecione o Background'}
                            </motion.h2>
                            <p className="text-white/60 mt-2 relative z-10">
                                {t('backgrounds.subtitle') || 'Escolha um estilo para personalizar seu portfólio'}
                            </p>
                        </div>

                        {/* Grid de backgrounds */}
                        <div className="p-8 overflow-y-auto max-h-[50vh] custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {backgrounds.map((bg, index) => (
                                    <motion.div
                                        key={bg.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{
                                            scale: 1.03,
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                        onClick={() => handleSelectBackground(bg.id)}
                                        className="relative group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--cyber-cyan)]/50 transition-all duration-300"
                                    >
                                        {/* Preview do background */}
                                        <div className={`h-40 bg-gradient-to-br ${bg.gradient} relative overflow-hidden`}>
                                            {/* Efeito de brilho */}
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />

                                            {/* Animações decorativas */}
                                            <motion.div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                animate={{
                                                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)`
                                                }}
                                            />
                                        </div>

                                        {/* Nome do background */}
                                        <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/5">
                                            <h3 className="text-white font-bold text-lg group-hover:text-[var(--cyber-cyan)] transition-colors">
                                                {bg.name}
                                            </h3>

                                            {/* Indicador de seleção */}
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileHover={{ width: '100%' }}
                                                className="h-0.5 bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] mt-2 rounded-full"
                                            />
                                        </div>

                                        {/* Botão Aplicar flutuante */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileHover={{ opacity: 1, y: 0 }}
                                            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] text-black font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                                                Aplicar
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Footer com botões */}
                        <div className="p-6 border-t border-white/10 flex items-center justify-between bg-black/20 backdrop-blur-md">
                            <motion.button
                                whileHover={{ x: -5 }}
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 font-bold text-sm uppercase tracking-widest transition-all"
                            >
                                Cancelar
                            </motion.button>

                            <div className="text-white/40 text-sm">
                                {t('backgrounds.hint') || 'Clique em um background para aplicá-lo'}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BackgroundSelectorModal;
