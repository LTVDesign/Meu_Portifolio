import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '../../hooks/useDebouncedResize';

const BG_TYPES = ['bolhas', 'particles', 'liquid', 'particulate', 'cyberpunk', 'wavefield', 'solid', 'matrix'];

interface BackgroundMenuProps {
  onEdit: () => void;
  onClose: () => void;
}

/**
 * BackgroundMenu - Menu de seleção de background
 * 
 * Otimizações:
 * - usa useBreakpoints hook com RAF debounce para resize
 * - contain: layout style paint para isolar animações
 */
const BackgroundMenu = ({ onEdit, onClose }: BackgroundMenuProps) => {
  const { config, updateConfig } = useParticleConfig();
  const { t } = useTranslation();
  // Hook otimizado com RAF debounce para evitar reflows
  const { isWatch, isMobileSmall, isMobile, isTablet } = useBreakpoints();

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Posicionamento responsivo do menu
  const getMenuPosition = () => {
    if (isWatch) {
      return {
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100vw - 16px)',
        maxWidth: '260px',
        minWidth: 'unset',
      };
    }
    if (isMobileSmall) {
      return {
        top: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100vw - 24px)',
        maxWidth: '320px',
        minWidth: 'unset',
      };
    }
    if (isMobile) {
      return {
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100vw - 32px)',
        maxWidth: '360px',
        minWidth: 'unset',
      };
    }
    if (isTablet) {
      return {
        top: '18%',
        left: '80px',
        width: '320px',
        minWidth: 'unset',
      };
    }
    // Desktop
    return {
      top: '20%',
      left: '100px',
      minWidth: '340px',
    };
  };

  const menuStyle = getMenuPosition();

  return (
    <>
      {/* Backdrop invisível que bloqueia cliques */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='fixed inset-0 z-[99998] pointer-events-auto'
        onClick={onClose}
      />
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: isMobile ? -10 : 0, x: isMobile ? 0 : 20 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: isMobile ? -10 : 0, x: isMobile ? 0 : 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className='fixed bg-black/85 backdrop-blur-3xl rounded-3xl shadow-2xl p-0 z-[99999] border border-white/20 overflow-hidden pointer-events-auto'
        style={menuStyle}
        onClick={handleBackdropClick}
      >
        {/* Header com botão de fechar */}
        <div className={`relative bg-gradient-to-r from-[#1a1433] to-black border-b border-white/10 ${isWatch ? 'px-3 py-2' : 'px-6 py-4'}`}>
          <h3 className={`text-white font-bold uppercase tracking-widest text-center ${isWatch ? 'text-[10px]' : 'text-sm'}`}>
            {t('backgroundMenu.settings')}
          </h3>

          <m.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 shadow-[0_0_15px_rgba(145,94,255,0.3)] hover:shadow-[0_0_20px_rgba(145,94,255,0.6)] min-w-[44px] min-h-[44px] ${isWatch ? 'w-6 h-6 right-2' : 'w-8 h-8'}`}
            aria-label={t('backgroundMenu.closeMenu')}
          >
            <svg
              width={isWatch ? '10' : '14'}
              height={isWatch ? '10' : '14'}
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
        </div>

        {/* Grid de opções */}
        <div className={isWatch ? 'p-3 pt-2' : 'p-6 pt-4'}>
          {/* Seção: Tipo de Background */}
          <div className={isWatch ? 'mb-3' : 'mb-6'}>
            <h4 className={`text-white/60 font-bold uppercase tracking-wider ${isWatch ? 'text-[9px] mb-2' : 'text-xs mb-3'}`}>
              {t('backgroundMenu.backgroundType')}
            </h4>
            <div className={`grid gap-2 ${isWatch ? 'grid-cols-2' : isMobileSmall ? 'grid-cols-2' : 'grid-cols-2'}`}>
              {BG_TYPES.map((type) => (
                <m.button
                  key={type}
                  onClick={() => {
                    updateConfig({ backgroundType: type });
                    onClose();
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full font-bold uppercase tracking-widest rounded-2xl transition-all relative overflow-hidden min-h-[44px] ${isWatch ? 'py-2 text-[9px]' : 'py-3 text-xs'} ${config.backgroundType === type
                    ? 'bg-gradient-to-r from-[#915EFF] to-[#00D4FF] text-white shadow-[0_0_20px_rgba(145,94,255,0.5)]'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(145,94,255,0.2)]'
                    }`}
                >
                  <span className='relative z-10'>{t(`backgrounds.${type}`)}</span>
                  {config.backgroundType === type && (
                    <m.div
                      layoutId='activeBg'
                      className='absolute inset-0 bg-gradient-to-r from-[#915EFF] to-[#00D4FF]'
                      style={{ opacity: 0.3 }}
                    />
                  )}
                </m.button>
              ))}
            </div>
          </div>

          <m.button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-gradient-to-r from-[#915EFF] to-[#00D4FF] hover:from-[#a17fff] hover:to-[#33ddff] text-white font-bold rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(145,94,255,0.3)] hover:shadow-[0_0_30px_rgba(145,94,255,0.6)] transition-all duration-300 min-h-[44px] ${isWatch ? 'py-2 text-[9px]' : 'py-4 text-sm'} btn-glow`}
          >
            <span>✏️</span>
            <span>{t('backgroundMenu.editBackground')}</span>
          </m.button>
        </div>
      </m.div>
    </>
  );
};

export default BackgroundMenu;
