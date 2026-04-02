import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isWatch = screenWidth < 280;
  const isMobileSmall = screenWidth < 380;
  const isMobile = screenWidth < 640;
  const isTV = screenWidth > 2560;

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
          className={`fixed top-1/2 -translate-y-1/2 z-[10000] ${isWatch ? 'left-0.5' : isMobileSmall ? 'left-1' : isMobile ? 'left-2' : isTV ? 'left-12' : 'left-4 sm:left-6'}`}
        >
          <div className='relative group'>
            {/* ========== ANÉIS RGB GIRATÓRIOS OTIMIZADOS ========== */}

            {/* Anel 0 - Ultra externo */}
            <m.div
              className='absolute -inset-16 rounded-full'
              style={{
                background: 'conic-gradient(from 0deg, #FF0000, #FF7700, #FFDD00, #00FF00, #00DDFF, #0077FF, #FF00FF, #FF0000)',
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

            {/* Anel 1 */}
            <m.div
              className='absolute -inset-14 rounded-full'
              style={{
                background: 'conic-gradient(from 45deg, #00D4FF, #915EFF, #FF00FF, #FF6B35, #00D4FF)',
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

            {/* Anel 2 */}
            <m.div
              className='absolute -inset-12 rounded-full'
              style={{
                background: 'conic-gradient(from 120deg, #FF00FF, #00FF88, #00D4FF, #915EFF, #FF00FF)',
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

            {/* Anel 3 */}
            <m.div
              className='absolute -inset-10 rounded-full'
              style={{
                background: 'conic-gradient(from 240deg, #FFD700, #FF00FF, #00D4FF, #FF6B35, #FFD700)',
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

            {/* Anel 4 */}
            <m.div
              className='absolute -inset-8 rounded-full'
              style={{
                background: 'conic-gradient(from 60deg, #00FF88, #00D4FF, #FF00FF, #915EFF, #00FF88)',
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

            {/* Anel 5 */}
            <m.div
              className='absolute -inset-6 rounded-full'
              style={{
                background: 'conic-gradient(from 180deg, #FF6B35, #00D4FF, #FF00FF, #FFD700, #FF6B35)',
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

            {/* Anel 6 */}
            <m.div
              className='absolute -inset-4 rounded-full'
              style={{
                background: 'conic-gradient(from 90deg, #00FFFF, #FF00FF, #FFFF00, #00FFFF)',
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

            {/* ========== EFEITO GLOW PULSANTE OTIMIZADO ========== */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <m.div
                className='w-32 h-32 rounded-full'
                style={{
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, rgba(145, 94, 255, 0.5) 20%, rgba(255, 0, 255, 0.4) 40%, rgba(255, 215, 0, 0.2) 60%, transparent 80%)',
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
                }}
                animate={{
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>

            {/* ========== RAIOS DE ENERGIA OTIMIZADOS ========== */}
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

            {/* ========== RAIOS SECUNDÁRIOS OTIMIZADOS ========== */}
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

            {/* ========== PARTÍCULAS ORBITAIS OTIMIZADAS ========== */}

            {/* Camada 1 - Partículas grandes */}
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

            {/* Camada 2 - Partículas pequenas */}
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

            {/* Camada 3 - Partículas externas */}
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

            {/* ========== SPARKLE/TWINKLE OTIMIZADOS ========== */}
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

            {/* ========== PARTÍCULAS FLUTUANTES OTIMIZADAS ========== */}
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

            {/* ========== ANÉIS PULSANTES DECORATIVOS OTIMIZADOS ========== */}
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
            <m.div
              className='absolute inset-0 rounded-full border border-[#FF6B35]/5'
              animate={{
                scale: [1, 2.8, 1],
                opacity: [0.02, 0.2, 0.02],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 2.5 }}
            />

            {/* ========== SOMBRA RGB EXTERNA GIRATÓRIA ========== */}
            <m.div
              className='absolute rounded-full'
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
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
            />

            {/* ========== SOMBRA RGB EXTERNA 2 ========== */}
            <m.div
              className='absolute rounded-full'
              style={{
                top: '50%',
                left: '50%',
                width: '220px',
                height: '220px',
                marginTop: '-110px',
                marginLeft: '-110px',
                background: 'conic-gradient(from 90deg, #00D4FF, #915EFF, #FF00FF, #FF6B35, #00D4FF)',
                filter: 'blur(50px)',
                opacity: 0.5,
              }}
              animate={{
                rotate: -360,
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            />

            {/* ========== RAIOS DE ENERGIA EXTRAS OTIMIZADOS ========== */}
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

            {/* ========== PARTÍCULAS DE ENERGIA OTIMIZADAS ========== */}
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

            {/* ========== LINHAS DE ENERGIA OTIMIZADAS ========== */}
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

            {/* ========== ONDAS DE CHOQUE OTIMIZADAS ========== */}
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

            {/* ========== PONTOS BRILHANTES OTIMIZADOS ========== */}
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

            {/* ========== BOTÃO PRINCIPAL OTIMIZADO ========== */}
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
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
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
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default GearButton;
