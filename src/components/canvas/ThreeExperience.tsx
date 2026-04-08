import { AdaptiveDpr, AdaptiveEvents, ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { useTouchScrollGuard } from '../../hooks/useTouchScrollGuard';
import { useViewport } from '../../hooks/useViewport';

import CanvasLoader from './Loader';

// LCP Optimization: Preload movido para dentro do componente para não bloquear renderização inicial
// O preload será feito após o componente montar, não no nível do módulo

// Fluid configuration parameters based on container width
  const getFluidConfig = (width: number) => {
    // Escala original para evitar "tamanho absurdo"
    const scaleBase = width < 1024 ? 0.6 : 0.75;
    const scale = Math.max(0.4, Math.min(1.0, scaleBase + (width - 1024) / 2500));
    
    // Posicionamento original
    const posY = -3.0;
    const posZ = -1.5;
    const fov = 25;
  
  // DPR adjustments
  const dprMax = width < 640 ? 1 : width < 1024 ? 1.5 : 2;

  return {
    scale,
    position: [0, posY, posZ] as [number, number, number],
    fov,
    dprMax
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

  const cfg = getFluidConfig(viewportWidth);

  if (!shouldLoadModel || !computer?.scene) {
    return null;
  }

  return (
    <mesh>
      {/* HemisphereLight - luz ambiente potente para eliminar silhuetas pretas */}
      <hemisphereLight
        intensity={viewportWidth < 380 ? 1.2 : 1.4}
        groundColor='black'
      />
      {/* DirectionalLight - Luz de Studio Principal (Highlight) */}
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={2.8} 
        castShadow={false}
      />
      {/* Frontal PointLight - lluminando a parte frontal dos periféricos e monitor */}
      <pointLight position={[0, 5, 20]} intensity={2.0} />
      {/* Case Internal Light - Realçando o hardware dentro do gabinete */}
      <pointLight position={[3.5, -1, -3]} intensity={1.5} color="#00ffff" />
      {/* Back/Rim Light - Definindo contornos */}
      <pointLight position={[-15, 0, -10]} intensity={1.2} />

      {/* Sombras de Contato para aterramento realista (custo baixo de performance) */}
      <ContactShadows 
         opacity={0.4} 
         scale={20} 
         blur={2.4} 
         far={4.5} 
         resolution={256} 
         color="#000000"
         position={[0, -3.01, 0]}
      />
      {/* Modelo 3D do computador */}
      <primitive
        object={computer.scene}
        scale={cfg.scale}
        position={cfg.position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
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
        rootMargin: viewportWidth < 380 ? '50px' : '200px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [viewportWidth, containerRef]);

  const cfg = getFluidConfig(viewportWidth);

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
        minHeight: viewportWidth >= 1024 ? '100%' : '75%',
        marginTop: viewportWidth >= 1024 ? '0' : '12%',
        // Em tablets como o iPad Mini (768px), reduzimos a largura do canvas interativo
        // para garantir que as bordas da tela permitam o scroll nativo.
        width: viewportWidth > 640 && viewportWidth < 1024 ? '85%' : '100%',
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
          preserveDrawingBuffer: true,
          antialias: viewportWidth >= 1024,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true,
          precision: viewportWidth < 380 ? 'lowp' : 'mediump',
        }}
        dpr={dpr}
        performance={{
          min: 0.5,
          max: 1,
          debounce: 200,
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
            // Rotação mais suave em touch
            rotateSpeed={viewportWidth < 280 ? 0.5 : 1}
            enableDamping={true}
            dampingFactor={0.05}
            // Só permite rotação touch quando o guard detectou intenção de interação 3D
            enabled={isTouchInteracting || viewportWidth >= 1024}
          />

          {/* Modelo 3D do computador com luzes */}
          {shouldLoad && <ComputersContent viewportWidth={viewportWidth} />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeExperience;
