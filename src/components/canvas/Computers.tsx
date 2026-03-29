import { AdaptiveDpr, AdaptiveEvents, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type React from 'react';
import { Suspense, useEffect, useState } from 'react';

import CanvasLoader from '../layout/Loader';

// Preload do modelo para melhor performance
useGLTF.preload('./desktop_pc/scene-compressed.compressed.gltf');

const Computers: React.FC<{ screenSize: string }> = ({ screenSize }) => {
  const computer = useGLTF('./desktop_pc/scene-compressed.compressed.gltf');

  const getPosition = () => {
    if (screenSize === 'watch') return [0, -3.5, 0];
    if (screenSize === 'mobile') return [0, -4.5, 0];
    if (screenSize === 'tablet') return [0, -4.8, 0];
    if (screenSize === 'cinema') return [0, -3.5, -2];
    return [0, -3.25, -1.5];
  };

  const getScale = () => {
    if (screenSize === 'watch') return 0.35;
    if (screenSize === 'mobile') return 0.45;
    if (screenSize === 'tablet') return 0.6;
    if (screenSize === 'cinema') return 1.2;
    return 0.75;
  };

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.8} // Reduzido intensidade
        castShadow={false} // Desabilitado sombras
      />
      <pointLight intensity={0.8} /> {/* Reduzido intensidade */}
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
      if (window.innerWidth < 280) setScreenSize('watch');
      else if (window.innerWidth < 640) setScreenSize('mobile');
      else if (window.innerWidth < 1024) setScreenSize('tablet');
      else if (window.innerWidth > 2560) setScreenSize('cinema');
      else setScreenSize('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-full w-full" style={{ minHeight: '100%', minWidth: '100%' }}>
      <Canvas
        frameloop="demand"
        shadows={false} // Desabilitado sombras para melhor performance
        camera={{
          position: [20, 3, 5],
          fov:
            screenSize === 'desktop' || screenSize === 'cinema'
              ? 25
              : screenSize === 'watch'
                ? 55
                : 45,
        }}
        gl={{
          preserveDrawingBuffer: false, // Desabilitado para melhor performance
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false, // Desabilitado stencil buffer
          depth: true,
        }}
        dpr={Math.min(window.devicePixelRatio, 2)} // Limita DPR para 2x
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
