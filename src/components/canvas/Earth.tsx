import { OrbitControls, Preload, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { PCFShadowMap, SRGBColorSpace } from 'three';
import type { Mesh } from 'three';
// Import textures as Vite assets to ensure correct paths in production build
// Usando WebP otimizado para melhor performance
import planetBaseColor from '/assets/3d-models/planet/textures/Planet_baseColor.png?url';
import { useTouchScrollGuard } from '../../hooks/useTouchScrollGuard';


const Earth = () => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(planetBaseColor);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = SRGBColorSpace;
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
  const [shouldLoad, setShouldLoad] = useState(false);
  const { containerRef, isTouchInteracting, touchStyle } = useTouchScrollGuard({
    verticalThreshold: 30,
    intentThreshold: 8,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
        } else {
          setShouldLoad(false);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className='w-full h-full'
      style={touchStyle}
    >
      <Canvas
        shadows={{ type: PCFShadowMap }}
        frameloop='demand'
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
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          {shouldLoad && (
            <>
              <OrbitControls
                autoRotate
                autoRotateSpeed={0.5}
                enablePan={false}
                // Em touch: zoom e rotação só quando o guard detectou intenção horizontal
                enableZoom={isTouchInteracting}
                enableRotate={isTouchInteracting}
                zoomSpeed={0.6}
                minDistance={3}
                maxDistance={10}
                maxPolarAngle={Math.PI}
                minPolarAngle={0}
              />
              <Earth />
              <Preload all />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
