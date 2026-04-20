import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import type { Group } from 'three';
import { PCFShadowMap } from 'three';
import { useTouchScrollGuard } from '../../hooks/useTouchScrollGuard';

const Earth = () => {
  const earth = useGLTF('/assets/3d-models/earth/scene.gltf');
  const earthRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <primitive
      ref={earthRef}
      object={earth.scene}
      scale={1.2}
      position-y={0.8}
      rotation-y={0}
    />
  );
};

const EarthCanvas = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const { containerRef, touchStyle } = useTouchScrollGuard({
    verticalThreshold: 30,
    intentThreshold: 8,
  });

  // LCP Optimization: Preload do modelo da Terra
  useEffect(() => {
    useGLTF.preload('/assets/3d-models/earth/scene.gltf');
  }, []);

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

