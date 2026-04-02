import { OrbitControls, Preload, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// Import textures as Vite assets to ensure correct paths in production build
// Usando WebP otimizado para melhor performance
import planetBaseColor from '../../../planet/textures/webp/Planet_baseColor.webp?url';
import CanvasLoader from '../layout/Loader';

// Detect touch devices to avoid blocking scroll
const getIsTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(pointer: coarse)').matches || 'ontouchstart' in window);

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(planetBaseColor);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.7} metalness={0.0} />
    </mesh>
  );
};

const EarthCanvas = () => {
  const [isTouch] = useState(getIsTouchDevice);

  return (
    <div style={{ width: '100%', height: '100%', touchAction: 'pan-y' }}>
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        frameloop='always'
        dpr={[1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, 5],
        }}
        style={{ touchAction: 'pan-y' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enablePan={false}
            enableZoom={!isTouch}
            enableRotate={!isTouch}
            zoomSpeed={0.6}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
          <Earth />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
