import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useViewport } from '../../hooks/useViewport';

interface GearButtonProps {
  onClick: () => void;
}

const GearButton = ({ onClick }: GearButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { width: screenWidth } = useViewport();
  const { t } = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const targetScale = Math.max(0.35, Math.min(1.2, screenWidth / 1024 + 0.15));

  return (
    <AnimatePresence>
      {isMounted && (
        <m.div
          initial={{ opacity: 0, scale: 0, x: -20 }}
          animate={{
            opacity: 1,
            scale: targetScale,
            x: 0,
          }}
          exit={{ opacity: 0, scale: 0, x: -20 }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            x: { duration: 0.5 },
          }}
          className="fixed top-1/2 -translate-y-1/2 z-[10000] origin-left"
          style={{
            transformOrigin: 'left center',
            left: 'clamp(0px, 2vw, 1.5rem)'
          }}
        >
          <m.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className='relative' style={{ width: 'clamp(80px, 15vw, 140px)', height: 'clamp(80px, 15vw, 140px)' }}>
              {/* ========== SOMBRAS RGB EXTERNAS GIRANDO ========== */}
              <m.div
                className='absolute rounded-full pointer-events-none'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '180px',
                  height: '180px',
                  marginTop: '-90px',
                  marginLeft: '-90px',
                  background: 'conic-gradient(from 0deg, #FF0000, #FF7700, #FFDD00, #00FF00, #00DDFF, #0077FF, #FF00FF, #FF0000)',
                  filter: 'blur(40px)',
                  opacity: 0.6,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Sombra RGB interna */}
              <m.div
                className='absolute rounded-full pointer-events-none'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '120px',
                  height: '120px',
                  marginTop: '-60px',
                  marginLeft: '-60px',
                  background: 'conic-gradient(from 90deg, #FFD700, #FF00FF, #00D4FF, #00FF88, #FFD700)',
                  filter: 'blur(25px)',
                  opacity: 0.7,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* ========== LINHAS ORBITAIS ========== */}
              <m.div
                className='absolute'
                style={{
                  top: '5px',
                  left: '5px',
                  right: '5px',
                  bottom: '5px',
                  borderRadius: '50%',
                  border: '1px solid transparent',
                  background: `linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(var(--angle), #FF00FF, #00D4FF, #FFD700, #FF00FF) border-box`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />

              <m.div
                className='absolute'
                style={{
                  top: '25px',
                  left: '25px',
                  right: '25px',
                  bottom: '25px',
                  borderRadius: '50%',
                  border: '1px solid transparent',
                  background: `linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(var(--angle), #00FF88, #0077FF, #FF00FF, #00FF88) border-box`,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* ========== LINHAS DE LUZ ========== */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <m.div
                  key={`light-line-${i}`}
                  className='absolute'
                  style={{
                    top: '50%',
                    left: '50%',
                    width: '1px',
                    height: '35px',
                    background: `linear-gradient(to top, transparent, ${i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#FF00FF' : '#FFD700'})`,
                    transformOrigin: 'bottom center',
                    transform: `translateX(-0.5px) translateY(-45px) rotate(${angle}deg)`,
                  }}
                  animate={{
                    opacity: [0, 0.9, 0],
                    scaleY: [0.4, 1.2, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                />
              ))}

              {/* ========== PONTOS BRILHANTES ========== */}
              {[0, 90, 180, 270].map((angle, i) => (
                <m.div
                  key={`dot-${i}`}
                  className='absolute w-1.5 h-1.5 rounded-full'
                  style={{
                    top: '50%',
                    left: '50%',
                    marginTop: '-3px',
                    marginLeft: '-3px',
                    background: ['#FF00FF', '#00D4FF', '#FFD700', '#00FF88'][i],
                    transformOrigin: '55px 0px',
                    transform: `rotate(${angle}deg)`,
                  }}
                  animate={{
                    rotate: [angle, angle + 360],
                    scale: [1, 1.8, 1],
                  }}
                  transition={{
                    rotate: { duration: 6 + i, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              ))}

              {/* ========== ANÉIS PULSANTES ========== */}
              <m.div
                className='absolute rounded-full border border-[#FF00FF]/30'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '100px',
                  height: '100px',
                  marginTop: '-50px',
                  marginLeft: '-50px',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <m.div
                className='absolute rounded-full border border-[#00D4FF]/30'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '100px',
                  height: '100px',
                  marginTop: '-50px',
                  marginLeft: '-50px',
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
              />

              {/* ========== BOTÃO PRINCIPAL ========== */}
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='relative p-[2px] rounded-full overflow-hidden'>
                  {/* Borda RGB sutil */}
                  <m.div
                    className='absolute inset-[-50%] opacity-70'
                    style={{
                      background: 'conic-gradient(from 0deg, #FF00FF, #00D4FF, #FFD700, #00FF88, #FF6B35, #FF00FF)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Botão - SEM box-shadow animado (usa opacity em vez disso) */}
                  <m.button
                    onClick={onClick}
                    aria-label={t('backgroundMenu.openSettings')}
                    className='relative w-16 h-16 rounded-full flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-all duration-300 cursor-pointer'
                    style={{
                      boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.05)',
                    }}
                    whileHover={{
                      scale: 1.15,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Ícone SVG de engrenagem */}
                    <m.svg
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className='w-8 h-8 relative z-10'
                      viewBox='0 0 24 24'
                      fill='none'
                      aria-hidden='true'
                      style={{
                        filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.5))',
                      }}
                    >
                      <defs>
                        <linearGradient id='gearGradientEnhanced' x1='0%' y1='0%' x2='100%' y2='100%'>
                          <stop stopColor='#00D4FF' offset='0%' />
                          <stop stopColor='#FF00FF' offset='50%' />
                          <stop stopColor='#FFD700' offset='100%' />
                        </linearGradient>
                      </defs>
                      <path
                        d='M12 15a3 3 0 100-6 3 3 0 000 6z'
                        stroke='url(#gearGradientEnhanced)'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z'
                        stroke='url(#gearGradientEnhanced)'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </m.svg>
                  </m.button>
                </div>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default GearButton;