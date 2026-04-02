import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GearButtonProps {
  onClick: () => void;
}

const GearButton = ({ onClick }: GearButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const { t } = useTranslation();
  const rafResizeRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      if (rafResizeRef.current) cancelAnimationFrame(rafResizeRef.current);
      rafResizeRef.current = requestAnimationFrame(() => {
        setScreenWidth(window.innerWidth);
        rafResizeRef.current = null;
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafResizeRef.current) cancelAnimationFrame(rafResizeRef.current);
    };
  }, []);

  const isWatch = screenWidth < 280;
  const isMobileSmall = screenWidth < 380;
  const isMobile = screenWidth < 640;
  const isTV = screenWidth > 2560;

  // Cores das sombras RGB
  const shadowColors = [
    '#FF00FF', // Magenta
    '#00D4FF', // Ciano
    '#FFD700', // Dourado
    '#00FF88', // Verde
    '#FF6B35', // Laranja
    '#0077FF', // Azul
  ];

  return (
    <AnimatePresence>
      {isMounted && (
        <m.div
          initial={{ opacity: 0, scale: 0, x: -20 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: [0, -8, 0]
          }}
          exit={{ opacity: 0, scale: 0, x: -20 }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            x: { duration: 0.5 },
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
          className={`fixed top-1/2 -translate-y-1/2 z-[10000] ${isWatch ? 'left-0.5' : isMobileSmall ? 'left-1' : isMobile ? 'left-2' : isTV ? 'left-12' : 'left-4 sm:left-6'}`}
        >
          <div className='relative' style={{ width: '140px', height: '140px' }}>
            {/* ========== SOMBRAS RGB EXTERNAS GIRANDO ========== */}
            {/* Sombra RGB externa 1 - Grande */}
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

            {/* Sombra RGB externa 2 - Média */}
            <m.div
              className='absolute rounded-full pointer-events-none'
              style={{
                top: '50%',
                left: '50%',
                width: '150px',
                height: '150px',
                marginTop: '-75px',
                marginLeft: '-75px',
                background: 'conic-gradient(from 180deg, #00D4FF, #915EFF, #FF00FF, #FF6B35, #00D4FF)',
                filter: 'blur(35px)',
                opacity: 0.5,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Sombra RGB externa 3 - Interna */}
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

            {/* ========== LINHAS FINAS ORBITAIS ========== */}
            {/* Linha orbital 1 - Externa */}
            <m.div
              className='absolute'
              style={{
                top: '5px',
                left: '5px',
                right: '5px',
                bottom: '5px',
                borderRadius: '50%',
                border: '1px solid transparent',
                background: `linear-gradient(#0a0a0a, #0a0a0a) padding-box, 
                             linear-gradient(var(--angle), #FF00FF, #00D4FF, #FFD700, #FF00FF) border-box`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* Linha orbital 2 */}
            <m.div
              className='absolute'
              style={{
                top: '15px',
                left: '15px',
                right: '15px',
                bottom: '15px',
                borderRadius: '50%',
                border: '1px solid transparent',
                background: `linear-gradient(#0a0a0a, #0a0a0a) padding-box, 
                             linear-gradient(var(--angle), #00D4FF, #FFD700, #00FF88, #00D4FF) border-box`,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Linha orbital 3 */}
            <m.div
              className='absolute'
              style={{
                top: '25px',
                left: '25px',
                right: '25px',
                bottom: '25px',
                borderRadius: '50%',
                border: '1px solid transparent',
                background: `linear-gradient(#0a0a0a, #0a0a0a) padding-box, 
                             linear-gradient(var(--angle), #FFD700, #FF6B35, #FF00FF, #FFD700) border-box`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Linha orbital 4 - Interna */}
            <m.div
              className='absolute'
              style={{
                top: '35px',
                left: '35px',
                right: '35px',
                bottom: '35px',
                borderRadius: '50%',
                border: '1px solid transparent',
                background: `linear-gradient(#0a0a0a, #0a0a0a) padding-box, 
                             linear-gradient(var(--angle), #00FF88, #0077FF, #FF00FF, #00FF88) border-box`,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            {/* ========== SOMBRAS COLORIDAS MOVENTO-SE ========== */}
            {shadowColors.map((color, i) => (
              <m.div
                key={`shadow-${i}`}
                className='absolute rounded-full pointer-events-none'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '80px',
                  height: '80px',
                  marginTop: '-40px',
                  marginLeft: '-40px',
                  background: `radial-gradient(circle, ${color}50 0%, transparent 70%)`,
                  filter: 'blur(15px)',
                }}
                animate={{
                  x: [
                    0,
                    Math.cos((i * Math.PI * 2) / 6) * 25,
                    0,
                    Math.cos((i * Math.PI * 2) / 6 + Math.PI) * 25,
                    0,
                  ],
                  y: [
                    0,
                    Math.sin((i * Math.PI * 2) / 6) * 25,
                    0,
                    Math.sin((i * Math.PI * 2) / 6 + Math.PI) * 25,
                    0,
                  ],
                  scale: [1, 1.3, 1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* ========== LINHAS DE LUZ FINAS ========== */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
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

            {/* ========== PONTOS BRILHANTES NAS LINHAS ========== */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <m.div
                key={`dot-${i}`}
                className='absolute w-1.5 h-1.5 rounded-full'
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-3px',
                  marginLeft: '-3px',
                  background: shadowColors[i],
                  boxShadow: `0 0 8px ${shadowColors[i]}, 0 0 16px ${shadowColors[i]}50`,
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

            {/* ========== PONTOS EXTERNOS ORBITAIS ========== */}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => (
              <m.div
                key={`outer-dot-${i}`}
                className='absolute w-1 h-1 rounded-full'
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-2px',
                  marginLeft: '-2px',
                  background: '#FFFFFF',
                  boxShadow: `0 0 6px ${shadowColors[(i + 2) % 6]}`,
                  transformOrigin: '65px 0px',
                  transform: `rotate(${angle}deg)`,
                }}
                animate={{
                  rotate: [angle, angle - 360],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  rotate: { duration: 8 + i * 0.5, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
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
            <m.div
              className='absolute rounded-full border border-[#FFD700]/30'
              style={{
                top: '50%',
                left: '50%',
                width: '100px',
                height: '100px',
                marginTop: '-50px',
                marginLeft: '-50px',
              }}
              animate={{
                scale: [1, 2.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1 }}
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

                {/* Botão */}
                <m.button
                  onClick={onClick}
                  aria-label={t('backgroundMenu.openSettings')}
                  className='relative w-16 h-16 rounded-full flex items-center justify-center
                             bg-[#0a0a0a]/95 backdrop-blur-xl
                             border border-white/10
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                             transition-all duration-300 cursor-pointer'
                  style={{
                    boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.05)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 15px rgba(255, 0, 255, 0.4), 0 0 30px rgba(0, 212, 255, 0.2)',
                      '0 0 15px rgba(0, 212, 255, 0.4), 0 0 30px rgba(255, 215, 0, 0.2)',
                      '0 0 15px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 0, 255, 0.2)',
                      '0 0 15px rgba(255, 0, 255, 0.4), 0 0 30px rgba(0, 212, 255, 0.2)',
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 4, repeat: Infinity, ease: 'linear' },
                  }}
                  whileHover={{
                    scale: 1.15,
                    boxShadow: '0 0 25px rgba(0, 212, 255, 0.6), 0 0 50px rgba(255, 0, 255, 0.4)',
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
      )}
    </AnimatePresence>
  );
};

export default GearButton;
