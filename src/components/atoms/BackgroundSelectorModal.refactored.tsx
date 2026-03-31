import React from 'react';
import { Modal } from './Modal/index';
import { useTranslation } from 'react-i18next';

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

    const handleSelectBackground = (bgId: string) => {
        // Salvar no localStorage ou context
        localStorage.setItem('selectedBackground', bgId);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={t('backgrounds.title') || 'Selecione o Background'}
            overlayClassName="bg-black/80 backdrop-blur-md"
            width="max-w-4xl"
            maxHeight="80vh"
            contentClassName="bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] border border-white/20 shadow-[0_0_60px_rgba(145,94,255,0.3)] rounded-3xl"
        >
            {/* Header */}
            <div className="p-8 border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyber-purple)]/10 to-transparent" />
                <div className="relative z-10">
                    <h2 className="text-3xl font-black text-white">
                        {t('backgrounds.title') || 'Selecione o Background'}
                    </h2>
                    <p className="text-white/60 mt-2">
                        {t('backgrounds.subtitle') || 'Escolha um estilo para personalizar seu portfólio'}
                    </p>
                </div>
            </div>

            {/* Grid de backgrounds */}
            <div className="p-8 overflow-y-auto max-h-[50vh] custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {backgrounds.map((bg) => (
                        <div
                            key={bg.id}
                            onClick={() => handleSelectBackground(bg.id)}
                            className="relative group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--cyber-cyan)]/50 transition-all duration-300"
                        >
                            {/* Preview do background */}
                            <div className={`h-40 bg-gradient-to-br ${bg.gradient} relative overflow-hidden`}>
                                {/* Efeito de brilho */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                            </div>

                            {/* Nome do background */}
                            <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/5">
                                <h3 className="text-white font-bold text-lg group-hover:text-[var(--cyber-cyan)] transition-colors">
                                    {bg.name}
                                </h3>

                                {/* Indicador de seleção */}
                                <div className="h-0.5 bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] mt-2 rounded-full" />
                            </div>

                            {/* Botão Aplicar flutuante */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] text-black font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                                    Aplicar
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer com botões */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between bg-black/20 backdrop-blur-md">
                <button
                    onClick={handleClose}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 font-bold text-sm uppercase tracking-widest transition-all"
                >
                    Cancelar
                </button>

                <div className="text-white/40 text-sm">
                    {t('backgrounds.hint') || 'Clique em um background para aplicá-lo'}
                </div>
            </div>
        </Modal>
    );
};

export default BackgroundSelectorModal;