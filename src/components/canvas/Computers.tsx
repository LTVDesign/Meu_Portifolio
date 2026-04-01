import { AdaptiveDpr, AdaptiveEvents, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type React from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';

import CanvasLoader from '../layout/Loader';

const ComputersContent: React.FC<{ screenSize: string }> = ({ screenSize }) => {
  // Carregamento atrasado para não bloquear LCP
  const [shouldLoadModel, setShouldLoadModel] = useState(false);
  const computer = useGLTF('/desktop_pc/scene-optimized.gltf');

  useEffect(() => {
    // Delay de 300ms após a montagem para priorizar LCP
    const timer = setTimeout(() => {
      setShouldLoadModel(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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

  if (!shouldLoadModel || !computer?.scene) {
    return null;
  }

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.8}
        castShadow={false}
      />
      <pointLight intensity={0.8} />
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
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState('desktop');

  // Detectar tamanho da tela
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

  // Carregamento lazy com IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className='relative h-full w-full'
      style={{ minHeight: '100%', minWidth: '100%', zIndex: 0, pointerEvents: 'auto' }}
    >
      <Canvas
        frameloop='demand'
        shadows={false}
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
          preserveDrawingBuffer: false,
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
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
          {shouldLoad && <ComputersContent screenSize={screenSize} />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
