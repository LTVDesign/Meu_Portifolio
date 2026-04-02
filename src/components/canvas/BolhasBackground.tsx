import { Canvas, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import ComputeInstancedLODParticles from '../three/ComputeInstancedLODParticles';

interface MousePos {
  x: number;
  y: number;
  z: number;
}

// Componente interno que converte coordenadas de tela para coordenadas 3D
// Deve estar DENTRO do Canvas para ter acesso ao useThree()
const MouseTracker = ({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<MousePos>;
}) => {
  const { camera, size } = useThree();

  useEffect(() => {
    const vec = new THREE.Vector3();
    const camPos = new THREE.Vector3();

    const updateMouse = (clientX: number, clientY: number) => {
      // Converte coordenadas de tela para NDC (-1 a 1)
      const ndcX = (clientX / size.width) * 2 - 1;
      const ndcY = -(clientY / size.height) * 2 + 1;

      // Projeta para o plano Z=0 no espaço 3D
      vec.set(ndcX, ndcY, 0.5).unproject(camera);
      camPos.copy(camera.position);
      const dir = vec.sub(camPos).normalize();

      // Evita divisão por zero
      if (Math.abs(dir.z) < 0.0001) return;

      const distance = -camera.position.z / dir.z;
      const posX = camera.position.x + dir.x * distance;
      const posY = camera.position.y + dir.y * distance;

      mouseRef.current = { x: posX, y: posY, z: 0 };
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [camera, size, mouseRef]);

  return null;
};

const BolhasBackground = () => {
  const { config } = useParticleConfig();
  const mouseRef = useRef<MousePos>({ x: 0, y: 0, z: 0 });

  const interactionMode = config.interactionMode || 'none';
  // Habilita pointer-events apenas quando há interação ativa
  const needsPointerEvents = interactionMode !== 'none';

  return (
    <div
      className='fixed inset-0 -z-10 w-full h-full'
      style={{ pointerEvents: needsPointerEvents ? 'auto' : 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: needsPointerEvents ? 'auto' : 'none' }}
      >
        {/* MouseTracker DEVE estar dentro do Canvas */}
        <MouseTracker mouseRef={mouseRef} />
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
          mouseRef={mouseRef}
        />
      </Canvas>
    </div>
  );
};

export default React.memo(BolhasBackground);
