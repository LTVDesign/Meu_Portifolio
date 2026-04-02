import { AnimatePresence, m } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import { useTranslation } from 'react-i18next';
import React, { Suspense, lazy } from 'react';

// Dynamic imports para carregar apenas o editor necessário
const BolhasEditor = lazy(() => import('../background-editors/BolhasEditor').then(m => ({ default: m.default })));
const CyberpunkEditor = lazy(() => import('../background-editors/CyberpunkEditor').then(m => ({ default: m.default })));
const LiquidEditor = lazy(() => import('../background-editors/LiquidEditor').then(m => ({ default: m.default })));
const MatrixEditor = lazy(() => import('../background-editors/MatrixEditor').then(m => ({ default: m.default })));
const ParticlesEditor = lazy(() => import('../background-editors/ParticlesEditor').then(m => ({ default: m.default })));
const ParticulateEditor = lazy(() => import('../background-editors/ParticulateEditor').then(m => ({ default: m.default })));
const SolidEditor = lazy(() => import('../background-editors/SolidEditor').then(m => ({ default: m.default })));
const WavefieldEditor = lazy(() => import('../background-editors/WavefieldEditor').then(m => ({ default: m.default })));

// Mapeamento de editores para carregamento dinâmico
const editorComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  bolhas: BolhasEditor,
  particles: ParticlesEditor,
  liquid: LiquidEditor,
  particulate: ParticulateEditor,
  cyberpunk: CyberpunkEditor,
  wavefield: WavefieldEditor,
  solid: SolidEditor,
  matrix: MatrixEditor,
};

// Componente de fallback para o Suspense
const EditorLoadingFallback = () => (
  <div className="flex flex-col items-center justify-center py-16 gap-4">
    <div className="w-10 h-10 border-4 border-[#915EFF]/30 border-t-[#915EFF] rounded-full animate-spin" />
    <p className="text-gray-400 text-sm">Carregando editor...</p>
  </div>
);

interface BackgroundEditorModalProps {
  isOpen: boolean;
  selectedBg: string;
  onClose: () => void;
}

const BackgroundEditorModal = ({
  isOpen,
  selectedBg,
  onClose,
}: BackgroundEditorModalProps) => {
  const { config, updateConfig } = useParticleConfig();
  const { t } = useTranslation();

  const renderEditor = () => {
    const props = { config, updateConfig };
    const EditorComponent = editorComponents[selectedBg];

    if (EditorComponent) {
      return (
        <Suspense fallback={<EditorLoadingFallback />}>
          <EditorComponent {...props} />
        </Suspense>
      );
    }

    return (
      <div className='text-center py-16 text-gray-400'>
        {t('backgroundEditor.notImplemented', { bg: selectedBg })}
      </div>
    );
  };

  return createPortal(
    <AnimatePresence mode='wait'>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/60 backdrop-blur-md p-2 sm:p-4'
          onClick={onClose}
        >
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className='bg-gradient-to-br from-[#0a0820]/95 to-[#1a1433]/95 backdrop-blur-2xl border border-[#915EFF]/50 rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] overflow-hidden shadow-2xl floating-effect'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header com botão de fechar */}
            <div className='relative px-4 sm:px-6 py-3 sm:py-5 border-b border-white/10 bg-gradient-to-r from-[#1a1433]/80 to-[#0a0820]/80'>
              <m.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className='absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 shadow-[0_0_15px_rgba(145,94,255,0.3)] hover:shadow-[0_0_20px_rgba(145,94,255,0.6)]'
                aria-label={t('backgroundEditor.closeEditor')}
              >
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              </m.button>
              <div className='flex items-center justify-center gap-3'>
                <div className='w-8 h-8 bg-gradient-to-br from-[#915EFF] to-[#00D4FF] rounded-xl flex items-center justify-center text-sm shadow-[0_0_15px_rgba(145,94,255,0.5)]'>
                  ✏️
                </div>
                <div className='text-center'>
                  <h2 className='text-lg font-bold text-white tracking-tight'>Editor</h2>
                  <p className='text-[#915EFF] text-xs font-medium'>
                    {t(`backgrounds.${selectedBg}`) || selectedBg}
                  </p>
                </div>
              </div>
            </div>

            {/* Corpo do editor */}
            <div className='p-6 overflow-y-auto max-h-[calc(85vh-140px)] custom-scrollbar'>
              {renderEditor()}
            </div>

            {/* Footer com botões Aplicar e Voltar */}
            <div className='px-6 py-4 border-t border-white/10 bg-gradient-to-r from-[#1a1433]/60 to-[#0a0820]/60 flex items-center justify-between gap-3'>
              <m.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 border border-white/20 hover:border-white/40'
              >
                {t('backgroundEditor.back')}
              </m.button>
              <m.button
                onClick={onClose}
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#915EFF] to-[#00D4FF] hover:from-[#a17fff] hover:to-[#33ddff] text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(145,94,255,0.3)] hover:shadow-[0_0_30px_rgba(145,94,255,0.6)] btn-glow'
              >
                {t('backgroundEditor.apply')}
              </m.button>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BackgroundEditorModal;
