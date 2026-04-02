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
            y: [0, -12, 0]
          }}
          exit={{ opacity: 0, scale: 0, x: -20 }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            x: { duration: 0.5 },
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
          className='fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-[10000]'
        >
          <div className='relative group'>
            {/* ========== ANÉIS RGB GIRATÓRIOS EXTREMOS ========== */}

            {/* Anel 0 - Ultra externo mega dramático */}
            <m.div
              className='absolute -inset-16 rounded-full'
              style={{
                background: 'conic-gradient(from 0deg, #FF0000, #FF7700, #FFDD00, #00FF00, #00DDFF, #0077FF, #FF00FF, #FF0000)',
                filter: 'blur(25px)',
                opacity: 0.8,
              }}
              animate={{
                rotate: -360,
                scale: [1, 1.15, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            {/* Anel 1 - Mais externo e dramático */}
            <m.div
              className='absolute -inset-14 rounded-full'
              style={{
                background: 'conic-gradient(from 45deg, #00D4FF, #915EFF, #FF00FF, #FF6B35, #00D4FF)',
                filter: 'blur(20px)',
                opacity: 0.9,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.12, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                rotate: { duration: 1.8, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            {/* Anel 2 - Contra-girando rápido */}
            <m.div
              className='absolute -inset-12 rounded-full'
              style={{
                background: 'conic-gradient(from 120deg, #FF00FF, #00FF88, #00D4FF, #915EFF, #FF00FF)',
                filter: 'blur(14px)',
                opacity: 0.85,
              }}
              animate={{
                rotate: -360,
                scale: [1, 1.18, 1]
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            {/* Anel 3 - Pulso de energia */}
            <m.div
              className='absolute -inset-10 rounded-full'
              style={{
                background: 'conic-gradient(from 240deg, #FFD700, #FF00FF, #00D4FF, #FF6B35, #FFD700)',
                filter: 'blur(10px)',
                opacity: 0.75,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.22, 1],
                opacity: [0.75, 1, 0.75]
              }}
              transition={{
                rotate: { duration: 1.2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            {/* Anel 4 - Mais interno e rápido */}
            <m.div
              className='absolute -inset-8 rounded-full'
              style={{
                background: 'conic-gradient(from 60deg, #00FF88, #00D4FF, #FF00FF, #915EFF, #00FF88)',
                filter: 'blur(8px)',
                opacity: 0.95,
              }}
              animate={{
                rotate: -360,
                scale: [1, 1.28, 1]
              }}
              transition={{
                rotate: { duration: 0.8, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            {/* Anel 5 - Extra interno ultra-rápido */}
            <m.div
              className='absolute -inset-6 rounded-full'
              style={{
                background: 'conic-gradient(from 180deg, #FF6B35, #00D4FF, #FF00FF, #FFD700, #FF6B35)',
                filter: 'blur(6px)',
                opacity: 1,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.35, 1]
              }}
              transition={{
                rotate: { duration: 0.5, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            {/* Anel 6 - Hyper interno */}
            <m.div
              className='absolute -inset-4 rounded-full'
              style={{
                background: 'conic-gradient(from 90deg, #00FFFF, #FF00FF, #FFFF00, #00FFFF)',
                filter: 'blur(4px)',
                opacity: 1,
              }}
              animate={{
                rotate: -360,
                scale: [1, 1.4, 1]
              }}
              transition={{
                rotate: { duration: 0.3, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            {/* ========== EFEITO GLOW PULSANTE MEGA ========== */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <m.div
                className='w-32 h-32 rounded-full'
                style={{
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, rgba(145, 94, 255, 0.5) 20%, rgba(255, 0, 255, 0.4) 40%, rgba(255, 215, 0, 0.2) 60%, transparent 80%)',
                  filter: 'blur(25px)',
                }}
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <m.div
                className='absolute w-24 h-24 rounded-full'
                style={{
                  background: 'radial-gradient(circle, rgba(255, 0, 255, 0.5) 0%, rgba(0, 255, 136, 0.3) 50%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
              <m.div
                className='absolute w-20 h-20 rounded-full'
                style={{
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 107, 53, 0.4) 50%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
                animate={{
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>

            {/* ========== RAIOS DE ENERGIA (LIGHTNING) ========== */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <m.div
                key={`lightning-${i}`}
                className='absolute'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '2px',
                  height: `${25 + i * 2}px`,
                  background: `linear-gradient(to top, transparent, ${i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#FF00FF' : '#FFD700'})`,
                  transformOrigin: 'bottom center',
                  transform: `translateX(-1px) translateY(-${32 + i * 2}px) rotate(${angle}deg)`,
                  filter: 'blur(1px)',
                  boxShadow: `0 0 10px ${i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#FF00FF' : '#FFD700'}`,
                }}
                animate={{
                  opacity: [0, 1, 0.2, 1, 0],
                  scaleY: [0.3, 1.4, 0.6, 1.5, 0.3],
                }}
                transition={{
                  duration: 0.5 + i * 0.08,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.06,
                }}
              />
            ))}

            {/* ========== RAIOS SECUNDÁRIOS MAIS CURTOS ========== */}
            {[15, 75, 135, 195, 255, 315].map((angle, i) => (
              <m.div
                key={`lightning-secondary-${i}`}
                className='absolute'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '1px',
                  height: `${15 + i * 2}px`,
                  background: `linear-gradient(to top, transparent, ${i % 2 === 0 ? '#00FF88' : '#FF6B35'})`,
                  transformOrigin: 'bottom center',
                  transform: `translateX(-0.5px) translateY(-${20 + i}px) rotate(${angle}deg)`,
                  filter: 'blur(0.5px)',
                  boxShadow: `0 0 6px ${i % 2 === 0 ? '#00FF88' : '#FF6B35'}`,
                }}
                animate={{
                  opacity: [0, 0.8, 0.1, 0.9, 0],
                  scaleY: [0.4, 1.1, 0.5, 1.2, 0.4],
                }}
                transition={{
                  duration: 0.4 + i * 0.05,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1 + 0.2,
                }}
              />
            ))}

            {/* ========== PARTÍCULAS ORBITAIS MULTI-CAMADAS ========== */}

            {/* Camada 1 - Partículas grandes e brilhantes */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <m.div
                key={`orbital-1-${i}`}
                className='absolute w-3 h-3 rounded-full'
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-6px',
                  marginLeft: '-6px',
                  transformOrigin: `${35 + i * 2}px 0px`,
                  background: i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#FF00FF' : '#FFD700',
                  boxShadow: `0 0 12px ${i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#FF00FF' : '#FFD700'}, 0 0 24px ${i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#FF00FF' : '#FFD700'}`,
                }}
                animate={{
                  rotate: [angle, angle + 360],
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  rotate: { duration: 2 + i * 0.3, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 1 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 1 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
                }}
              />
            ))}

            {/* Camada 2 - Partículas pequenas e rápidas */}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => (
              <m.div
                key={`orbital-2-${i}`}
                className='absolute w-1.5 h-1.5 rounded-full'
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-3px',
                  marginLeft: '-3px',
                  transformOrigin: `${50 + i * 3}px 0px`,
                  background: i % 2 === 0 ? '#00FF88' : '#FF6B35',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#00FF88' : '#FF6B35'}`,
                }}
                animate={{
                  rotate: [angle, angle - 360],
                }}
                transition={{
                  duration: 1.5 + i * 0.2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}

            {/* Camada 3 - Partículas externas distantes */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <m.div
                key={`orbital-3-${i}`}
                className='absolute w-2 h-2 rounded-full'
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-4px',
                  marginLeft: '-4px',
                  transformOrigin: `${65 + i * 4}px 0px`,
                  background: '#915EFF',
                  boxShadow: '0 0 10px #915EFF, 0 0 20px #915EFF',
                }}
                animate={{
                  rotate: [angle, angle + 360],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  rotate: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                }}
              />
            ))}

            {/* ========== SPARKLE/TWINKLE EFFECTS MEGA ========== */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((_, i) => (
              <m.div
                key={`sparkle-${i}`}
                className='absolute'
                style={{
                  top: `${10 + Math.sin(i * 0.4) * 60}%`,
                  left: `${10 + Math.cos(i * 0.4) * 60}%`,
                  width: `${3 + (i % 3)}px`,
                  height: `${3 + (i % 3)}px`,
                  background: i % 6 === 0 ? 'white' : i % 6 === 1 ? '#00D4FF' : i % 6 === 2 ? '#FF00FF' : i % 6 === 3 ? '#FFD700' : i % 6 === 4 ? '#00FF88' : '#FF6B35',
                  borderRadius: '50%',
                  boxShadow: `0 0 ${4 + i % 4}px ${2 + i % 2}px ${i % 6 === 0 ? 'white' : i % 6 === 1 ? '#00D4FF' : i % 6 === 2 ? '#FF00FF' : i % 6 === 3 ? '#FFD700' : i % 6 === 4 ? '#00FF88' : '#FF6B35'}`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2 + (i % 3) * 0.3, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 0.5 + i * 0.12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            ))}

            {/* ========== PARTÍCULAS FLUTUANTES EXTRAS MEGA ========== */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, i) => (
              <m.div
                key={`floating-${i}`}
                className='absolute rounded-full'
                style={{
                  width: `${2 + i % 2}px`,
                  height: `${2 + i % 2}px`,
                  top: `${25 + Math.sin(i * 0.8) * 40}%`,
                  left: `${25 + Math.cos(i * 0.8) * 40}%`,
                  background: i % 3 === 0 ? '#00FF88' : i % 3 === 1 ? '#FF6B35' : '#915EFF',
                  boxShadow: `0 0 ${6 + i % 4}px ${i % 3 === 0 ? '#00FF88' : i % 3 === 1 ? '#FF6B35' : '#915EFF'}`,
                }}
                animate={{
                  y: [0, -30 - i * 3, 0],
                  x: [0, 15 + i * 2, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.3, 1.5, 0.3],
                }}
                transition={{
                  duration: 2.5 + i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* ========== ANÉIS EXTRAS PULSANTES MEGA ========== */}
            <m.div
              className='absolute -inset-14 rounded-full border border-[#00D4FF]/20'
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <m.div
              className='absolute -inset-16 rounded-full border border-[#FF00FF]/15'
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <m.div
              className='absolute -inset-18 rounded-full border border-[#FFD700]/10'
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, -180, -360],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <m.div
              className='absolute -inset-20 rounded-full border border-[#00FF88]/8'
              animate={{
                scale: [1, 1.7, 1],
                opacity: [0.05, 0.3, 0.05],
                rotate: [360, 0, -360],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
            <m.div
              className='absolute -inset-22 rounded-full border border-[#FF6B35]/5'
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.02, 0.2, 0.02],
                rotate: [0, 360, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            {/* ========== RAIOS DE ENERGIA EXTRAS ========== */}
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((angle, i) => (
              <m.div
                key={`lightning-extra-${i}`}
                className='absolute'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '1px',
                  height: `${18 + i * 1.5}px`,
                  background: `linear-gradient(to top, transparent, ${i % 4 === 0 ? '#00D4FF' : i % 4 === 1 ? '#FF00FF' : i % 4 === 2 ? '#FFD700' : '#00FF88'})`,
                  transformOrigin: 'bottom center',
                  transform: `translateX(-0.5px) translateY(-${22 + i * 1.5}px) rotate(${angle}deg)`,
                  filter: 'blur(0.5px)',
                  boxShadow: `0 0 ${4 + i % 3}px ${i % 4 === 0 ? '#00D4FF' : i % 4 === 1 ? '#FF00FF' : i % 4 === 2 ? '#FFD700' : '#00FF88'}`,
                }}
                animate={{
                  opacity: [0, 0.7, 0.1, 0.8, 0],
                  scaleY: [0.2, 1.2, 0.4, 1.3, 0.2],
                }}
                transition={{
                  duration: 0.3 + i * 0.04,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.04,
                }}
              />
            ))}

            {/* ========== PARTICULAS DE ENERGIA ========== */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((_, i) => (
              <m.div
                key={`energy-${i}`}
                className='absolute rounded-full'
                style={{
                  width: `${1 + i % 2}px`,
                  height: `${1 + i % 2}px`,
                  top: `${20 + Math.sin(i * 0.6) * 45}%`,
                  left: `${20 + Math.cos(i * 0.6) * 45}%`,
                  background: i % 5 === 0 ? '#00D4FF' : i % 5 === 1 ? '#FF00FF' : i % 5 === 2 ? '#FFD700' : i % 5 === 3 ? '#00FF88' : '#FF6B35',
                  boxShadow: `0 0 ${5 + i % 4}px ${i % 5 === 0 ? '#00D4FF' : i % 5 === 1 ? '#FF00FF' : i % 5 === 2 ? '#FFD700' : i % 5 === 3 ? '#00FF88' : '#FF6B35'}`,
                }}
                animate={{
                  y: [0, -40 - i * 4, 0],
                  x: [0, 20 + i * 3, 0],
                  opacity: [0.1, 1, 0.1],
                  scale: [0.2, 1.8, 0.2],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* ========== BOTÃO PRINCIPAL ========== */}
            <m.button
              onClick={onClick}
              aria-label={t("backgroundMenu.openSettings")}
              className='relative w-14 h-14 rounded-full flex items-center justify-center
                bg-gradient-to-br from-[var(--cyber-purple)]/30 to-[var(--cyber-cyan)]/20
                border-2 border-[var(--cyber-cyan)]/60
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyber-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-black
                backdrop-blur-sm'
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(145, 94, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2)',
                  '0 0 40px rgba(0, 212, 255, 0.8), 0 0 80px rgba(145, 94, 255, 0.6), 0 0 120px rgba(255, 0, 255, 0.4)',
                  '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(145, 94, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2)'
                ],
                filter: [
                  'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))',
                  'drop-shadow(0 0 20px rgba(0, 212, 255, 1))',
                  'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))'
                ]
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                filter: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.85 }}
            >
              {/* Ícone SVG de engrenagem */}
              <m.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className='w-7 h-7'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden='true'
              >
                <defs>
                  <linearGradient id='gearGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <stop offset='0%' stopColor='#00D4FF' />
                    <stop offset='33%' stopColor='#915EFF' />
                    <stop offset='66%' stopColor='#FF00FF' />
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

            {/* ========== ANÉIS PULSANTES DECORATIVOS MEGA ========== */}
            <m.div
              className='absolute inset-0 rounded-full border-2 border-[var(--cyber-cyan)]/40'
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            />
            <m.div
              className='absolute inset-0 rounded-full border border-[var(--cyber-purple)]/30'
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />
            <m.div
              className='absolute inset-0 rounded-full border border-[#FF00FF]/20'
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 1 }}
            />
            <m.div
              className='absolute inset-0 rounded-full border border-[#FFD700]/15'
              animate={{
                scale: [1, 2.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
            />
            <m.div
              className='absolute inset-0 rounded-full border border-[#00FF88]/10'
              animate={{
                scale: [1, 2.4, 1],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 2 }}
            />

            {/* ========== ARCOS DE ENERGIA ========== */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <m.div
                key={`arc-${i}`}
                className='absolute'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '3px',
                  height: `${30 + i * 4}px`,
                  background: `linear-gradient(to top, transparent, ${i % 4 === 0 ? '#00D4FF' : i % 4 === 1 ? '#FF00FF' : i % 4 === 2 ? '#FFD700' : '#00FF88'})`,
                  transformOrigin: 'bottom center',
                  transform: `translateX(-1.5px) translateY(-${35 + i * 4}px) rotate(${angle}deg)`,
                  filter: 'blur(2px)',
                  boxShadow: `0 0 15px ${i % 4 === 0 ? '#00D4FF' : i % 4 === 1 ? '#FF00FF' : i % 4 === 2 ? '#FFD700' : '#00FF88'}`,
                  borderRadius: '50% 50% 0 0',
                }}
                animate={{
                  opacity: [0, 0.9, 0.2, 1, 0],
                  scaleY: [0.2, 1.3, 0.5, 1.4, 0.2],
                  scaleX: [0.5, 1.2, 0.7, 1.3, 0.5],
                }}
                transition={{
                  duration: 0.8 + i * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.12,
                }}
              />
            ))}

            {/* ========== PARTÍCULAS DE COR ========== */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((_, i) => (
              <m.div
                key={`color-particle-${i}`}
                className='absolute rounded-full'
                style={{
                  width: `${1 + i % 3}px`,
                  height: `${1 + i % 3}px`,
                  top: `${5 + Math.sin(i * 0.3) * 70}%`,
                  left: `${5 + Math.cos(i * 0.3) * 70}%`,
                  background: i % 8 === 0 ? '#00D4FF' : i % 8 === 1 ? '#FF00FF' : i % 8 === 2 ? '#FFD700' : i % 8 === 3 ? '#00FF88' : i % 8 === 4 ? '#FF6B35' : i % 8 === 5 ? '#915EFF' : i % 8 === 6 ? '#00FFFF' : '#FFFFFF',
                  boxShadow: `0 0 ${6 + i % 5}px ${i % 8 === 0 ? '#00D4FF' : i % 8 === 1 ? '#FF00FF' : i % 8 === 2 ? '#FFD700' : i % 8 === 3 ? '#00FF88' : i % 8 === 4 ? '#FF6B35' : i % 8 === 5 ? '#915EFF' : i % 8 === 6 ? '#00FFFF' : '#FFFFFF'}`,
                }}
                animate={{
                  y: [0, -50 - i * 5, 0],
                  x: [0, 25 + i * 4, 0],
                  opacity: [0.05, 1, 0.05],
                  scale: [0.1, 2 + i * 0.1, 0.1],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 1.5 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }}
              />
            ))}

            {/* ========== LINHAS DE ENERGIA ========== */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, i) => (
              <m.div
                key={`energy-line-${i}`}
                className='absolute'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '1px',
                  height: `${40 + i * 8}px`,
                  background: `linear-gradient(to top, transparent, ${i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#FF00FF' : '#FFD700'}, transparent)`,
                  transformOrigin: 'bottom center',
                  transform: `translateX(-0.5px) translateY(-${45 + i * 8}px) rotate(${i * 30}deg)`,
                  filter: 'blur(1px)',
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scaleY: [0.3, 1.2, 0.3],
                }}
                transition={{
                  duration: 0.6 + i * 0.08,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            ))}

            {/* ========== ONDAS DE CHOQUE ========== */}
            {[0, 1, 2].map((_, i) => (
              <m.div
                key={`shockwave-${i}`}
                className='absolute rounded-full border'
                style={{
                  top: '50%',
                  left: '50%',
                  width: '10px',
                  height: '10px',
                  marginTop: '-5px',
                  marginLeft: '-5px',
                  borderColor: i === 0 ? '#00D4FF' : i === 1 ? '#FF00FF' : '#FFD700',
                  borderWidth: '2px',
                }}
                animate={{
                  scale: [1, 8 + i * 2],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: i * 0.7,
                }}
              />
            ))}

            {/* ========== PONTOS BRILHANTES ========== */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((_, i) => (
              <m.div
                key={`bright-dot-${i}`}
                className='absolute rounded-full'
                style={{
                  top: `${15 + Math.sin(i * 0.9) * 55}%`,
                  left: `${15 + Math.cos(i * 0.9) * 55}%`,
                  width: '2px',
                  height: '2px',
                  background: 'white',
                  boxShadow: '0 0 8px 3px white',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2.5, 0],
                }}
                transition={{
                  duration: 0.4 + i * 0.08,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.25,
                }}
              />
            ))}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default GearButton;