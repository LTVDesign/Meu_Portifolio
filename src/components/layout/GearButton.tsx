import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GearButtonProps {
  onClick: () => void;
}

const GearButton = ({ onClick }: GearButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {isMounted && (
        <m.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-[10000]'
        >
          <div className='relative group'>
            {/* Glow effect suave */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <m.div
                className='w-20 h-20 rounded-full'
                style={{
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, rgba(145, 94, 255, 0.3) 50%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Botão principal redondo */}
            <m.button
              onClick={onClick}
              aria-label='Abrir configurações de background'
              className='relative w-14 h-14 rounded-full flex items-center justify-center
                bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10
                border-2 border-[var(--cyber-cyan)]/40
                shadow-[0_0_20px_rgba(0,212,255,0.3),0_0_40px_rgba(145,94,255,0.2)]
                hover:border-[var(--cyber-cyan)]/70
                hover:shadow-[0_0_30px_rgba(0,212,255,0.5),0_0_60px_rgba(145,94,255,0.3)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyber-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-black
                transition-all duration-300 backdrop-blur-sm'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
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
