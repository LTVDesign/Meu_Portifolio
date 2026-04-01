import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import {
  BolhasEditor,
  CyberpunkEditor,
  LiquidEditor,
  MatrixEditor,
  ParticlesEditor,
  ParticulateEditor,
  SolidEditor,
  WavefieldEditor,
} from '../background-editors';

const BG_LABELS: Record<string, string> = {
  bolhas: 'Bolhas',
  particles: 'Partículas',
  liquid: 'Líquido',
  particulate: 'Pontos',
  cyberpunk: 'Túnel',
  wavefield: 'Ondas',
  solid: 'Cor Sólida',
  matrix: 'Matrix',
};

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

  const renderEditor = () => {
    const props = { config, updateConfig };
    switch (selectedBg) {
      case 'bolhas':
        return <BolhasEditor {...props} />;
      case 'particles':
        return <ParticlesEditor {...props} />;
      case 'liquid':
        return <LiquidEditor {...props} />;
      case 'particulate':
        return <ParticulateEditor {...props} />;
      case 'cyberpunk':
        return <CyberpunkEditor {...props} />;
      case 'wavefield':
        return <WavefieldEditor {...props} />;
      case 'solid':
        return <SolidEditor {...props} />;
      case 'matrix':
        return <MatrixEditor {...props} />;
      default:
        return (
          <div className='text-center py-16 text-gray-400'>
            Editor para "{selectedBg}" ainda não implementado
          </div>
        );
    }
  };

  return createPortal(
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/60 backdrop-blur-md p-4'
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className='bg-gradient-to-br from-[#0a0820]/95 to-[#1a1433]/95 backdrop-blur-2xl border border-[#915EFF]/50 rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden shadow-2xl floating-effect'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header com botão de fechar */}
            <div className='relative px-6 py-5 border-b border-white/10 bg-gradient-to-r from-[#1a1433]/80 to-[#0a0820]/80'>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className='absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 shadow-[0_0_15px_rgba(145,94,255,0.3)] hover:shadow-[0_0_20px_rgba(145,94,255,0.6)]'
                aria-label='Fechar editor'
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
              </motion.button>

              <div className='flex items-center justify-center gap-3'>
                <div className='w-8 h-8 bg-gradient-to-br from-[#915EFF] to-[#00D4FF] rounded-xl flex items-center justify-center text-sm shadow-[0_0_15px_rgba(145,94,255,0.5)]'>
                  ✏️
                </div>
                <div className='text-center'>
                  <h2 className='text-lg font-bold text-white tracking-tight'>Editor</h2>
                  <p className='text-[#915EFF] text-xs font-medium'>
                    {BG_LABELS[selectedBg] || selectedBg}
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
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 border border-white/20 hover:border-white/40'
              >
                Voltar
              </motion.button>
              <motion.button
                onClick={onClose}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 8px 30px rgba(145, 94, 255, 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#915EFF] to-[#00D4FF] hover:from-[#a17fff] hover:to-[#33ddff] text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(145,94,255,0.3)] hover:shadow-[0_0_30px_rgba(145,94,255,0.6)]'
              >
                Aplicar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BackgroundEditorModal;
