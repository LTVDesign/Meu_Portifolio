import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export default function ThreeExperience() {
  return (
    <Canvas 
      frameloop="demand" 
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Toda sua cena 3D, models, lights, effects, OrbitControls, etc. aqui */}
      </Suspense>
    </Canvas>
  );
}
