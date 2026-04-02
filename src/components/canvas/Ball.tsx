import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type React from 'react';
import { memo, Suspense } from 'react';
import { useTouchScrollGuard } from '../../hooks/useTouchScrollGuard';
import CanvasLoader from '../layout/Loader';

interface BallProps {
  imgUrl: string;
}

const Ball: React.FC<BallProps> = memo(({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
});

const BallCanvas: React.FC<{ icon: string }> = memo(({ icon }) => {
  const { containerRef, isTouchInteracting, touchStyle } = useTouchScrollGuard({
    verticalThreshold: 30,
    intentThreshold: 8,
  });

  return (
    <div
      ref={containerRef}
      className='w-full h-full'
      style={touchStyle}
    >
      <Canvas frameloop='demand' dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={<CanvasLoader />}>
          {/* OrbitControls só ativo em touch quando há intenção de interação 3D */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={isTouchInteracting}
          />
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
});

export default BallCanvas;
