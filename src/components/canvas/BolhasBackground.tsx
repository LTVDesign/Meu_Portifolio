import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import ComputeInstancedLODParticles from '../three/ComputeInstancedLODParticles';

const BolhasBackground = () => {
  const { config } = useParticleConfig();
  const mousePosition = useRef({ x: 0, y: 0, z: 0 });
  const lastMouseMoveRef = useRef(0);

  const handleMouseMove = (e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMouseMoveRef.current < 16) return;
    lastMouseMoveRef.current = now;

    // Converte coordenadas de tela para coordenadas 3D (aproximadas)
    // Como as partículas estão em uma esfera de raio spread, mapeamos para -spread a +spread
    const normalizedX = (e.clientX / window.innerWidth) * 2 - 1; // -1 a 1
    const normalizedY = -((e.clientY / window.innerHeight) * 2 - 1); // -1 a 1 (inverte Y)

    mousePosition.current = {
      x: normalizedX * (config.bolhasSpread || 50),
      y: normalizedY * (config.bolhasSpread || 50),
      z: 0,
    };
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='fixed inset-0 -z-10 pointer-events-none w-full h-full'>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ComputeInstancedLODParticles
          count={config.bolhasCount || 15000}
          speed={config.bolhasSpeed || 0.5}
          size={config.bolhasSize || 0.02}
          spread={config.bolhasSpread || 50}
          colors={[
            config.bolhasColor1 || '#915EFF',
            config.bolhasColor2 || '#00D4FF',
            config.bolhasColor3 || '#FF6B9D',
          ]}
          mousePosition={mousePosition.current}
        />
      </Canvas>
    </div>
  );
};

export default React.memo(BolhasBackground);
