import { useEffect, useRef, useState } from 'react';
import { usePerformance } from '../../contexts/PerformanceContext';
import { initLaunchParticles } from '../../utils/particles/launchParticles';

const ParticlesCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = useState(false);
  const { isLowPerformance } = usePerformance();

  useEffect(() => {
    const canvas = canvasRef.current;
    const btn = btnRef.current;
    if (!canvas || !btn) return;

    // Só inicializa partículas se não for baixa performance
    if (isLowPerformance) {
      return;
    }

    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);

    let cleanup = () => {};

    // Só inicializa quando ativo
    if (isActive) {
      cleanup = initLaunchParticles(canvas, btn);
    }

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      cleanup();
    };
  }, [isActive, isLowPerformance]);

  // Não renderiza em baixa performance
  if (isLowPerformance) {
    return null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        id='particles-canvas'
        className='fixed inset-0 pointer-events-none'
        style={{ zIndex: 0, opacity: isActive ? 1 : 0 }}
        data-background='true'
      />
      <button
        ref={btnRef}
        aria-label='Efeito de Partículas Interativo'
        className='fixed left-[clamp(0.5rem,1.5vw,1rem)] top-1/2 -translate-y-1/2 w-14 h-14 pointer-events-none opacity-0'
      />
    </>
  );
};

export default ParticlesCanvas;
