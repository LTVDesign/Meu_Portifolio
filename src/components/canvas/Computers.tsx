import { AdaptiveDpr, AdaptiveEvents, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type React from 'react';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

import CanvasLoader from '../layout/Loader';

const Computers: React.FC<{ screenSize: string }> = ({ screenSize }) => {
  const computer = useGLTF('./desktop_pc/scene-compressed.compressed.gltf');

  const getPosition = () => {
    if (screenSize === 'mobile') return [0, -4.5, 0];
    if (screenSize === 'tablet') return [0, -4.8, 0];
    return [0, -3.25, -1.5];
  };

  const getScale = () => {
    if (screenSize === 'mobile') return 0.45;
    if (screenSize === 'tablet') return 0.6;
    return 0.75;
  };

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={getScale()}
        position={getPosition()}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setScreenSize('mobile');
      else if (window.innerWidth < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-full w-full">
      <Canvas
        frameloop="demand"
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{
          position: [20, 3, 5],
          fov: screenSize === 'desktop' ? 25 : 45,
        }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
          <Computers screenSize={screenSize} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
