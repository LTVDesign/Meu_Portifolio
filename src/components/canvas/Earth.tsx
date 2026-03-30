import { OrbitControls, Preload, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import CanvasLoader from '../layout/Loader';

// Import textures as Vite assets to ensure correct paths in production build
import planetBaseColor from '../../../planet/textures/Planet_baseColor.png?url';

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(planetBaseColor);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.7}
        metalness={0.0}
      />
    </mesh>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      frameloop="demand"
      dpr={[1, 2]}
      gl={{
        preserveDrawingBuffer: true,
        antialias: false,
        powerPreference: 'high-performance',
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 6], // Vista frontal centralizada
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
