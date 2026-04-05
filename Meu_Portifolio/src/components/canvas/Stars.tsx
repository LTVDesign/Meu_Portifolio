import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import type * as THREE from 'three';

const Stars = (props: {}) => {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState<Float32Array>(() => {
    const count = 1000; // Reduzido de 2000 para 1000 para melhor performance
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.0;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        renderOrder={-999}
        {...props}
      >
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='absolute inset-0 z-[-1] h-auto w-full'>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={1} frameloop='demand'>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        {/* Preload removido para evitar erros de bounding sphere com NaN */}
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
