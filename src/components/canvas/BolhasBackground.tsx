import { Canvas, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import { useTouchScrollGuard } from '../../hooks/useTouchScrollGuard';
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
  active,
}: {
  mouseRef: React.MutableRefObject<MousePos>;
  active: boolean;
}) => {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!active) return;

    const vec = new THREE.Vector3();
    const camPos = new THREE.Vector3();

    const updateMouse = (clientX: number, clientY: number) => {
      const ndcX = (clientX / size.width) * 2 - 1;
      const ndcY = -(clientY / size.height) * 2 + 1;

      vec.set(ndcX, ndcY, 0.5).unproject(camera);
      camPos.copy(camera.position);
      const dir = vec.sub(camPos).normalize();

      if (Math.abs(dir.z) < 0.0001) return;

      const distance = -camera.position.z / dir.z;
      mouseRef.current = {
        x: camera.position.x + dir.x * distance,
        y: camera.position.y + dir.y * distance,
        z: 0,
      };
    };

    const handleMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);

    // Touch: só atualiza posição, NÃO chama preventDefault (deixa o scroll funcionar)
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
  }, [camera, size, mouseRef, active]);

  return null;
};

const BolhasBackground = () => {
  const { config } = useParticleConfig();
  const mouseRef = useRef<MousePos>({ x: 0, y: 0, z: 0 });

  const interactionMode = config.interactionMode || 'none';
  const needsPointerEvents = interactionMode !== 'none';

  // Em dispositivos móveis, NUNCA permitir que o background capture pointer-events
  // Isso garante que o scroll nativo sempre funcione.
  const isTouch = typeof window !== 'undefined' && (('ontouchstart' in window) || navigator.maxTouchPoints > 0);
  const canInteract = needsPointerEvents && !isTouch;

  // Guard de scroll: só ativa quando o modo de interação está ligado E não é touch (para segurança extra)
  const { containerRef, isTouchInteracting, touchStyle } = useTouchScrollGuard({
    verticalThreshold: 25,
    intentThreshold: 6,
    enabled: canInteract,
  });

  const finalStyle: React.CSSProperties = canInteract
    ? {
      pointerEvents: 'auto',
      touchAction: isTouchInteracting ? 'none' : 'pan-y',
      ...touchStyle,
    }
    : {
      pointerEvents: 'none',
      touchAction: 'pan-y',
    };

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 -z-10 w-full h-full'
      data-engine={needsPointerEvents ? 'r3f' : undefined}
      style={finalStyle}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        style={{
          pointerEvents: needsPointerEvents ? 'auto' : 'none',
          // touch-action: pan-y permite scroll vertical mesmo no canvas
          touchAction: needsPointerEvents && isTouchInteracting ? 'none' : 'pan-y',
        }}
      >
        {/* MouseTracker só ativo quando há modo de interação */}
        <MouseTracker mouseRef={mouseRef} active={needsPointerEvents} />
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
          mousePosition={mouseRef.current}
        />
      </Canvas>
    </div>
  );
};

export default React.memo(BolhasBackground);
