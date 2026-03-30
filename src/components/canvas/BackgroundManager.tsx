import { Suspense, lazy, memo, useState } from 'react';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';

// Lazy load heavy backgrounds
const ParticleBackground = lazy(() => import('./ParticleBackground'));
const LiquidBackground = lazy(() => import('./LiquidUltraBackground'));
const CyberpunkBackground = lazy(() => import('./CyberpunkUltraBackground'));
const WavefieldBackground = lazy(() => import('./WavefieldUltraBackground'));
const ParticulateBackground = lazy(() => import('./ParticulateShatterBackground'));
const SolidBackground = lazy(() => import('./SolidColorBackground'));
const BolhasBackground = lazy(() => import('./BolhasBackground'));
const MatrixRainBackground = lazy(() => import('./MatrixRainBackground'));

/**
 * Centrally manages and switches between different background types based on user configuration.
 * Lazy loads backgrounds only when they are visible to improve LCP.
 */
const BackgroundManager = memo(() => {
  const { config } = useParticleConfig();
  const [isVisible] = useState(true); // Carregar imediatamente

  // Removido delay desnecessário que atrasava o carregamento do background

  const renderBackground = () => {
    switch (config.backgroundType) {
      case 'particles':
        return (
          <ParticleBackground
            particleColor={config.particleColor}
            speed={config.speed}
            intensity={config.intensity}
            quantity={config.quantity}
            zoom={config.zoom}
            particleSize={config.particleSize}
            particleConnectDistance={config.particleConnectDistance}
            lineThickness={config.lineThickness}
            particleOpacity={config.particleOpacity}
            particleLineColor={config.particleLineColor}
          />
        );
      case 'liquid':
        return (
          <LiquidBackground
            resolution={config.liquidResolution}
            octaves={config.liquidOctaves}
            speed={config.liquidSpeed}
            scale={config.liquidScale}
            complexity={config.liquidComplexity}
            expansion={config.liquidExpansion}
            twist={config.liquidTwist}
            grain={config.liquidGrain}
            smoothing={config.liquidSmoothing}
            color1={config.liquidColor1}
            color2={config.liquidColor2}
            color3={config.liquidColor3}
            color4={config.liquidColor4}
            color5={config.liquidColor5}
            color6={config.liquidColor6}
            intensity={config.liquidIntensity}
            noiseScale={config.liquidNoiseScale}
            gloss={config.liquidGloss}
            refraction={config.liquidRefraction}
          />
        );
      case 'cyberpunk':
        return (
          <CyberpunkBackground
            bloomStrength={config.cyberpunkBloomStrength}
            fogDensity={config.cyberpunkFogDensity}
            speed={config.cyberpunkSpeed}
            color1={config.cyberpunkColor1}
            color2={config.cyberpunkColor2}
            color3={config.cyberpunkColor3}
            rotationSpeed={config.cyberpunkRotationSpeed}
            tunnelRadius={config.cyberpunkTunnelRadius}
            pointSize={config.cyberpunkPointSize}
            lineOpacity={config.cyberpunkLineOpacity}
            cameraFOV={config.cyberpunkCameraFOV}
          />
        );
      case 'wavefield':
        return (
          <WavefieldBackground
            speed={config.wavefieldSpeed}
            amplitude={config.wavefieldAmplitude}
            color={config.wavefieldColor}
            color2={config.wavefieldColor2}
            color3={config.wavefieldColor3}
            glow={config.wavefieldGlow}
            starIntensity={config.wavefieldStarIntensity}
            rotationSpeed={config.wavefieldRotationSpeed}
            mouseStrength={config.wavefieldMouseStrength}
            complexity={config.wavefieldComplexity}
            frequency={config.wavefieldFrequency}
          />
        );
      case 'particulate':
        return (
          <ParticulateBackground
            speed={config.particulateSpeed}
            intensity={config.particulateIntensity}
            color={config.particulateColor}
            mode={config.particulateMode}
            quantity={config.particulateQuantity}
            size={config.particulateSize}
            friction={config.particulateFriction}
            spring={config.particulateSpring}
            palette={config.particulatePalette}
            wanderSpeed={config.particulateWanderSpeed}
            wanderStrength={config.particulateWanderStrength}
            color1={config.particulateColor1}
            color2={config.particulateColor2}
            color3={config.particulateColor3}
            color4={config.particulateColor4}
            color5={config.particulateColor5}
            color6={config.particulateColor6}
          />
        );
      case 'solid':
        return (
          <SolidBackground
            type={config.solidType}
            color1={config.solidColor1}
            color2={config.solidColor2}
            color3={config.solidColor3}
            angle={config.solidAngle}
            animationSpeed={config.solidAnimationSpeed}
            grain={config.solidGrain}
            opacity={config.solidOpacity}
            blur={config.solidBlur}
          />
        );
      case 'bolhas':
        return <BolhasBackground />;
      case 'matrix':
        return (
          <MatrixRainBackground
            density={config.matrixDensity}
            speed={config.matrixSpeed}
            fontSize={config.matrixFontSize}
            color={config.matrixColor}
            backgroundColor={config.matrixBackgroundColor}
            charSet={config.matrixCharSet}
            glowIntensity={config.glowIntensity}
            trailLength={config.trailLength}
            columnSpacing={config.columnSpacing}
          />
        );
      default:
        return <ParticleBackground />;
    }
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none bg-[#050816]"
      style={{ zIndex: 0 }}
      data-background="true"
    >
      {isVisible && (
        <Suspense fallback={<div className="w-full h-full bg-[#050816]" style={{ minHeight: '100vh', minWidth: '100vw' }} />}>
          {renderBackground()}
        </Suspense>
      )}
    </div>
  );
});

BackgroundManager.displayName = 'BackgroundManager';

export default BackgroundManager;
