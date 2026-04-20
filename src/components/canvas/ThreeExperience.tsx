import {
  AdaptiveDpr,
  AdaptiveEvents,
  ContactShadows,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type React from 'react';
import { Suspense, useEffect, useState, useMemo } from 'react';
import { useTouchScrollGuard } from '../../hooks/useTouchScrollGuard';
import { useViewport } from '../../hooks/useViewport';

import CanvasLoader from './Loader';

// LCP Optimization: Preload movido para dentro do componente para não bloquear renderização inicial
// O preload será feito após o componente montar, não no nível do módulo

// Fluid configuration parameters based on container width
const getFluidConfig = (width: number) => {
  // Escala reduzida conforme pedido (um pouco menor ainda)
  const scaleBase = width < 1024 ? 0.6 : 0.65;
  const scale = Math.max(0.4, Math.min(1.0, scaleBase + (width - 1024) / 3000));

  // Posicionamento Y sincronizado com o repositório original (~ -2.8 a -3.0)
  const posY = -3.0;
  const posZ = Math.max(-2, Math.min(0, -((width - 640) / 1000) * 1.5));

  // FOV adaptável para melhor responsividade
  const fov = width < 640 ? 30 : width < 1024 ? 25 : 20;

  // DPR adjustments com base na densidade de pixels e performance
  const dprMax = width < 640 ? 1 : width < 1024 ? 1.5 : 2.5;

  return {
    scale,
    position: [0, posY, posZ] as [number, number, number],
    fov,
    dprMax,
  };
};

/**
 * ComputersContent - Componente interno que renderiza o modelo 3D do computador
 * Contém todas as luzes e o modelo primitive
 */
const ComputersContent: React.FC<{ viewportWidth: number }> = ({ viewportWidth }) => {
  const [shouldLoadModel, setShouldLoadModel] = useState(false);
  const computer = useGLTF('/desktop_pc/scene-optimized.gltf');

  useEffect(() => {
    // Delay adaptativo: menor em telas maiores
    const delay = viewportWidth < 640 ? 600 : 300;

    const timer = setTimeout(() => {
      setShouldLoadModel(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [viewportWidth]);

  const cfg = useMemo(() => getFluidConfig(viewportWidth), [viewportWidth]);

  if (!shouldLoadModel || !computer?.scene) {
    return null;
  }

  return (
    <group>
      {/* HemisphereLight - luz ambiente suave que ilumina as sombras */}
      <hemisphereLight intensity={0.4} groundColor='black' />

      {/* Luz Ambiente - eleva o brilho geral das partes pretas */}
      <ambientLight intensity={0.5} />

      {/* SpotLight Principal - define a forma e volume do computador */}
      <spotLight
        position={[-15, 10, 10]}
        angle={0.25}
        penumbra={1}
        intensity={3}
        castShadow
      />

      {/* PointLight Lateral (Direita) - Luz de preenchimento ciano para áreas escuras */}
      <pointLight position={[10, -1, 5]} intensity={1.8} color='#00FFFF' />

      {/* PointLight Traseira (Rim Light) - Ajuda a destacar a silhueta da mesa e PC */}
      <pointLight position={[-5, 5, -10]} intensity={1.2} color='#915EFF' />

      {/* PointLight Frontal - Garante que o painel frontal não fique totalmente preto */}
      <pointLight position={[0, 2, 8]} intensity={1.0} color='#ffffff' />

      {/* ContactShadows - Sombras de contato suaves no chão */}
      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.4}
        scale={20}
        blur={2.4}
        far={4.5}
      />

      {/* Modelo 3D do computador */}
      <primitive
        object={computer.scene}
        scale={cfg.scale}
        position={cfg.position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

/**
 * ThreeExperience - Componente principal da experiência Three.js
 *
 * Este componente encapsula toda a experiência 3D incluindo:
 * - Canvas configurado com otimizações de performance
 * - OrbitControls para interação
 * - AdaptiveDpr e AdaptiveEvents para performance adaptativa
 * - Modelo 3D do computador com luzes
 *
 * Otimizações:
 * - frameloop="demand" para renderizar apenas quando necessário
 * - DPR adaptativo baseado no dispositivo
 * - Lazy loading com IntersectionObserver
 * - Touch scroll guard para melhor UX em dispositivos touch
 * - Configurações específicas por tamanho de tela
 */
const ThreeExperience: React.FC = () => {
  const { containerRef, isTouchInteracting, touchStyle } = useTouchScrollGuard({
    verticalThreshold: 25, // Mais sensível ao scroll vertical no computador 3D
    intentThreshold: 6,
  });
  const [shouldLoad, setShouldLoad] = useState(false);
  const { width: viewportWidth } = useViewport();

  // LCP Optimization: Preload feito após montagem, não no nível do módulo
  useEffect(() => {
    // Preload após um pequeno delay para não bloquear LCP
    const preloadTimer = setTimeout(() => {
      useGLTF.preload('/desktop_pc/scene-optimized.gltf');
    }, 100);
    return () => clearTimeout(preloadTimer);
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
      {
        threshold: 0.05,
        rootMargin: viewportWidth < 380 ? '50px' : '200px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [viewportWidth, containerRef]);

  const cfg = useMemo(() => getFluidConfig(viewportWidth), [viewportWidth]);

  // DPR adaptativo: menor em mobile para economizar bateria e memória
  const dpr = Math.min(
    typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    cfg.dprMax
  );

  return (
    <div
      ref={containerRef}
      className='relative w-full'
      data-engine='r3f'
      style={{
        // Altura fluida baseada no tamanho da tela
        height: viewportWidth >= 1024 ? '100vh' : viewportWidth >= 640 ? '85vh' : '75vh',
        minHeight: '60vh',
        maxHeight: '120vh',
        // Posicionamento responsivo
        marginTop: viewportWidth >= 1024 ? '0' : '8%',
        // Largura fluida para diferentes tamanhos de tela
        width: viewportWidth > 640 && viewportWidth < 1024 ? '90%' : '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        zIndex: 0,
        pointerEvents: 'auto',
        ...touchStyle,
        // Containment para performance
        contain: 'layout style paint',
      }}
    >
      <Canvas
        frameloop={viewportWidth < 640 ? 'demand' : 'always'}
        shadows={false}
        camera={{
          position: [20, 3, 5],
          fov: cfg.fov,
        }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: viewportWidth >= 1024,
          powerPreference: viewportWidth < 380 ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
          // Ajuste de precisão adaptativo
          precision:
            viewportWidth < 640 ? 'lowp' : viewportWidth < 1024 ? 'mediump' : 'highp',
          // Otimizações de performance
          alpha: true,
        }}
        dpr={dpr}
        performance={{
          min: viewportWidth < 640 ? 0.3 : 0.5,
          max: viewportWidth < 640 ? 0.8 : 1,
          debounce: viewportWidth < 640 ? 300 : 200,
        }}
      >
        {/* Componentes de performance adaptativa */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Suspense fallback={<CanvasLoader />}>
          {/* Controles de órbita para rotação do modelo */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            // Rotação adaptável por tamanho de tela
            rotateSpeed={viewportWidth < 640 ? 0.8 : viewportWidth < 1024 ? 1 : 1.2}
            enableDamping={true}
            dampingFactor={viewportWidth < 640 ? 0.08 : 0.05}
            // Ajuste de sensibilidade por dispositivo
            screenSpacePanning={viewportWidth >= 1024}
            // Só permite rotação touch quando o guard detectou intenção de interação 3D
            enabled={isTouchInteracting || viewportWidth >= 1024}
            // Limites de rotação mais restritos em mobile
            minDistance={5}
            maxDistance={30}
          />

          {/* Modelo 3D do computador com luzes */}
          {shouldLoad && <ComputersContent viewportWidth={viewportWidth} />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeExperience;
