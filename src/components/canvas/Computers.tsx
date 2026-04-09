import { AdaptiveDpr, AdaptiveEvents, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { useTouchScrollGuard } from '../../hooks/useTouchScrollGuard';
import { useViewport } from '../../hooks/useViewport';

// Preload do modelo para melhorar performance
useGLTF.preload('/desktop_pc/scene-optimized.gltf');

type ScreenSize = 'watch' | 'mobileSmall' | 'mobile' | 'tablet' | 'desktop' | 'tv' | '4k';

const getScreenSize = (width: number): ScreenSize => {
  if (width < 280) return 'watch';
  if (width < 380) return 'mobileSmall';
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width > 3840) return '4k';
  if (width > 2560) return 'tv';
  return 'desktop';
};

const SCREEN_CONFIG: Record<
  ScreenSize,
  {
    position: [number, number, number];
    scale: number;
    fov: number;
    dprMax: number;
  }
> = {
  watch: { position: [0, -1.2, -1.0], scale: 0.65, fov: 32, dprMax: 1 },
  mobileSmall: { position: [0, -1.4, -1.0], scale: 0.75, fov: 30, dprMax: 1.5 },
  mobile: { position: [0, -1.6, -1.0], scale: 0.85, fov: 28, dprMax: 1.5 },
  tablet: { position: [0, -2.0, -1.5], scale: 0.85, fov: 28, dprMax: 2 },
  desktop: { position: [0, -2.8, -1.5], scale: 0.75, fov: 25, dprMax: 2 },
  tv: { position: [0, -3.0, -2], scale: 1.1, fov: 22, dprMax: 2 },
  '4k': { position: [0, -3.0, -2], scale: 1.3, fov: 20, dprMax: 2 },
};

const ComputersContent: React.FC<{ screenSize: ScreenSize }> = ({ screenSize }) => {
  const [shouldLoadModel, setShouldLoadModel] = useState(false);
  const computer = useGLTF('/desktop_pc/scene-optimized.gltf');

  useEffect(() => {
    // Delay adaptativo: menor em desktop, maior em mobile para priorizar LCP
    const delay =
      screenSize === 'watch' || screenSize === 'mobileSmall'
        ? 600
        : screenSize === 'mobile'
          ? 400
          : 300;

    const timer = setTimeout(() => {
      setShouldLoadModel(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [screenSize]);

  const cfg = SCREEN_CONFIG[screenSize];

  if (!shouldLoadModel || !computer?.scene) {
    return null;
  }

  return (
    <mesh>
      <hemisphereLight
        intensity={screenSize === 'watch' ? 0.8 : 0.65}
        groundColor='#2a1a3a' // Slightly brighter lilac/purple for shadows
      />
      <ambientLight intensity={0.4} />
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
        scale={cfg.scale}
        position={cfg.position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

export const ComputersCanvas = () => {
  const { containerRef, isTouchInteracting, touchStyle } = useTouchScrollGuard({
    verticalThreshold: 25, // Mais sensível ao scroll vertical no computador 3D
    intentThreshold: 6,
  });
  const [shouldLoad, setShouldLoad] = useState(false);
  const { width: viewportWidth } = useViewport();
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => 'desktop');

  // Detectar tamanho da tela baseado no viewportWidth do hook
  useEffect(() => {
    setScreenSize(getScreenSize(viewportWidth));
  }, [viewportWidth]);

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
      {
        threshold: 0.05,
        rootMargin:
          screenSize === 'watch' || screenSize === 'mobileSmall' ? '50px' : '200px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [screenSize, containerRef]);

  const cfg = SCREEN_CONFIG[screenSize];

  // DPR adaptativo: menor em mobile para economizar bateria e memória
  const dpr = Math.min(
    typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    cfg.dprMax
  );

  return (
    <div
      ref={containerRef}
      className='relative h-full w-full'
      data-engine='r3f'
      style={{
        minHeight: '100%',
        marginTop: '0px',
        // Em mobile, mantemos 100% para não esmagar a renderização do modelo (o touch guard protege o scroll nativo)
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        zIndex: 0,
        pointerEvents: 'auto',
        ...touchStyle,
      }}
    >
      <Canvas
        frameloop='demand'
        shadows={false}
        camera={{
          position: [20, 3, 5],
          fov: cfg.fov,
        }}
        gl={{
          preserveDrawingBuffer: false,
          antialias:
            screenSize === 'desktop' || screenSize === 'tv' || screenSize === '4k',
          powerPreference:
            screenSize === 'watch' || screenSize === 'mobileSmall'
              ? 'low-power'
              : 'high-performance',
          stencil: false,
          depth: true,
          // Reduzir qualidade em mobile para melhorar performance
          precision:
            screenSize === 'watch' || screenSize === 'mobileSmall' ? 'lowp' : 'mediump',
        }}
        dpr={dpr}
        performance={{
          min: 0.5,
          max: 1,
          debounce: 200,
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            // Rotação mais suave em touch
            rotateSpeed={screenSize === 'watch' ? 0.5 : 1}
            enableDamping={true}
            dampingFactor={0.05}
            // Só permite rotação touch quando o guard detectou intenção de interação 3D
            enabled={
              isTouchInteracting ||
              screenSize === 'desktop' ||
              screenSize === 'tv' ||
              screenSize === '4k'
            }
          />
          {shouldLoad && <ComputersContent screenSize={screenSize} />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
