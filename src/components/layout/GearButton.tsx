import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GearButtonProps {
  onClick: () => void;
}

const GearButton = ({ onClick }: GearButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {isMounted && (
        <m.div
          initial={{ opacity: 0, scale: 0, x: -20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: 0,
            y: [0, -10, 0] 
          }}
          exit={{ opacity: 0, scale: 0, x: -20 }}
          transition={{ 
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            x: { duration: 0.5 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
          className='fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-[10000]'
        >
          <div className='relative group'>
            {/* Anel RGB giratório rápido - MUITO CHAMATIVO */}
            <m.div
              className='absolute -inset-4 rounded-full'
              style={{
                background: 'conic-gradient(from 0deg, #00D4FF, #915EFF, #FF00FF, #00D4FF)',
                filter: 'blur(8px)',
                opacity: 0.7,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Segundo anel RGB contra-girando */}
            <m.div
              className='absolute -inset-6 rounded-full'
              style={{
                background: 'conic-gradient(from 180deg, #FF00FF, #00D4FF, #915EFF, #FF00FF)',
                filter: 'blur(12px)',
                opacity: 0.5,
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Glow effect suave */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <m.div
                className='w-20 h-20 rounded-full'
                style={{
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, rgba(145, 94, 255, 0.3) 50%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Partículas Orbitais (Animação Externa) */}
            {[0, 120, 240].map((angle, i) => (
              <m.div
                key={i}
                className='absolute w-2 h-2 rounded-full bg-[var(--cyber-cyan)] shadow-[0_0_10px_var(--cyber-cyan)]'
                animate={{
                  rotate: [angle, angle + 360],
                }}
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-4px',
                  marginLeft: '-4px',
                  transformOrigin: `${40 + i * 5}px 0px`,
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}

            {/* Botão principal redondo */}
            <m.button
              onClick={onClick}
              aria-label={t("backgroundMenu.openSettings")}
              className='relative w-14 h-14 rounded-full flex items-center justify-center
                bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10
                border-2 border-[var(--cyber-cyan)]/40
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyber-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-black
                backdrop-blur-sm'
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(145, 94, 255, 0.3)',
                  '0 0 40px rgba(0, 212, 255, 0.7), 0 0 80px rgba(145, 94, 255, 0.5)',
                  '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(145, 94, 255, 0.3)'
                ],
                filter: [
                  'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))',
                  'drop-shadow(0 0 15px rgba(0, 212, 255, 0.8))',
                  'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))'
                ]
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                filter: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Ícone SVG de engrenagem bonito */}
              <m.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className='w-7 h-7'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden='true'
              >
                <defs>
                  <linearGradient id='gearGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <stop offset='0%' stopColor='#00D4FF' />
                    <stop offset='50%' stopColor='#915EFF' />
                    <stop offset='100%' stopColor='#00D4FF' />
                  </linearGradient>
                </defs>
                <path
                  d='M12 15a3 3 0 100-6 3 3 0 000 6z'
                  stroke='url(#gearGradient)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z'
                  stroke='url(#gearGradient)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </m.svg>
            </m.button>

            {/* Anel pulsante decorativo */}
            <m.div
              className='absolute inset-0 rounded-full border border-[var(--cyber-cyan)]/30'
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default GearButton;