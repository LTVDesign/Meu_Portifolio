import { motion } from 'framer-motion';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import { useTranslation } from 'react-i18next';

const BG_TYPES = ['bolhas', 'particles', 'liquid', 'particulate', 'cyberpunk', 'wavefield', 'solid', 'matrix'];

interface BackgroundMenuProps {
  onEdit: () => void;
  onClose: () => void;
}

const BackgroundMenu = ({ onEdit, onClose }: BackgroundMenuProps) => {
  const { config, updateConfig } = useParticleConfig();
  const { t } = useTranslation();

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Previne que cliques fora do menu fechem o menu ou causem outros comportamentos
    e.stopPropagation();
  };

  return (
    <>
      {/* Backdrop invisível que bloqueia cliques */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='fixed inset-0 z-[99998] pointer-events-auto'
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, x: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className='fixed top-[20%] left-[100px] bg-black/85 backdrop-blur-3xl rounded-3xl shadow-2xl p-0 min-w-[340px] z-[99999] border border-white/20 overflow-hidden pointer-events-auto'
        onClick={handleBackdropClick}
      >
        {/* Header com botão de fechar */}
        <div className='relative px-6 py-4 bg-gradient-to-r from-[#1a1433] to-black border-b border-white/10'>
          <h3 className='text-white font-bold text-sm uppercase tracking-widest text-center'>
            {t('backgroundMenu.settings')}
          </h3>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className='absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 shadow-[0_0_15px_rgba(145,94,255,0.3)] hover:shadow-[0_0_20px_rgba(145,94,255,0.6)]'
            aria-label={t('backgroundMenu.closeMenu')}
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
        </div>

        {/* Grid de opções */}
        <div className='p-6 pt-4'>
          {/* Seção: Tipo de Background */}
          <div className='mb-6'>
            <h4 className='text-white/60 text-xs font-bold uppercase tracking-wider mb-3'>
              {t('backgroundMenu.backgroundType')}
            </h4>
            <div className='grid grid-cols-2 gap-3'>
              {BG_TYPES.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => {
                    updateConfig({ backgroundType: type });
                    onClose();
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all relative overflow-hidden ${config.backgroundType === type
                    ? 'bg-gradient-to-r from-[#915EFF] to-[#00D4FF] text-white shadow-[0_0_20px_rgba(145,94,255,0.5)]'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(145,94,255,0.2)]'
                    }`}
                >
                  <span className='relative z-10'>{t(`backgrounds.${type}`)}</span>
                  {config.backgroundType === type && (
                    <motion.div
                      layoutId='activeBg'
                      className='absolute inset-0 bg-gradient-to-r from-[#915EFF] to-[#00D4FF]'
                      style={{ opacity: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 8px 30px rgba(145, 94, 255, 0.4)',
            }}
            whileTap={{ scale: 0.98 }}
            className='w-full bg-gradient-to-r from-[#915EFF] to-[#00D4FF] hover:from-[#a17fff] hover:to-[#33ddff] text-white font-bold py-4 rounded-2xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(145,94,255,0.3)] hover:shadow-[0_0_30px_rgba(145,94,255,0.6)] transition-all duration-300'
          >
            <span>✏️</span>
            <span>{t('backgroundMenu.editBackground')}</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default BackgroundMenu;
