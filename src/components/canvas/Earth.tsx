import { OrbitControls, Preload, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import type { Mesh } from 'three';
import { PCFShadowMap, SRGBColorSpace } from 'three';
import earthClouds from '/assets/3d-models/planet/textures/earth_clouds_1k.png?url';
// Import textures as Vite assets to ensure correct paths in production build
// Usando WebP otimizado para melhor performance
import earthDayMap from '/assets/3d-models/planet/textures/earth_day_4k.jpg?url';
import { useTouchScrollGuard } from '../../hooks/useTouchScrollGuard';

const Earth = () => {
  const earthRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);

  // Load textures
  const [texture, clouds] = useTexture([earthDayMap, earthClouds]);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = SRGBColorSpace;
    }
  }, [texture]);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.12; // Clouds rotate at a different speed
    }
  });

  return (
    <group>
      {/* Main Planet Mesh */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Cloud Layer Mesh */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshStandardMaterial
          map={clouds}
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={2} // Additive blending (AdditiveBlending = 2 in Three.js)
        />
      </mesh>
    </group>
  );
};

const EarthCanvas = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const { containerRef, touchStyle } = useTouchScrollGuard({
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
    <div ref={containerRef} className='w-full h-full' style={touchStyle}>
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
                // Zoom desabilitado para não atrapalhar o scroll da página.
                enableZoom={false}
                enableRotate={true}
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
