import type React from 'react';
import { lazy, Suspense } from 'react';
import { useParticleConfig } from '../contexts/ParticleConfigContext';
import CyberpunkUltraBackground from './canvas/CyberpunkUltraBackground';
import LiquidUltraBackground from './canvas/LiquidUltraBackground';
import ParticleBackground from './canvas/ParticleBackground';
import ParticulateShatterBackground from './canvas/ParticulateShatterBackground';
import WavefieldUltraBackground from './canvas/WavefieldUltraBackground';

const SolidColorBackgroundLazy = lazy(() => import('./canvas/SolidColorBackground'));

const Background: React.FC = () => {
  const { config } = useParticleConfig();

  return (
    <Suspense fallback={null}>
      {(() => {
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
              <LiquidUltraBackground
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
          case 'particulate':
            return (
              <ParticulateShatterBackground
                speed={config.particulateSpeed}
                intensity={config.particulateIntensity}
                color={config.particulateColor}
                mode={config.particulateMode}
                quantity={config.particulateQuantity}
                size={config.particulateSize}
                friction={config.particulateFriction}
                spring={config.particulateSpring}
                palette={config.particulatePalette}
                color1={config.particulateColor1}
                color2={config.particulateColor2}
                color3={config.particulateColor3}
                color4={config.particulateColor4}
                color5={config.particulateColor5}
                color6={config.particulateColor6}
                wanderSpeed={config.particulateWanderSpeed}
                wanderStrength={config.particulateWanderStrength}
              />
            );
          case 'cyberpunk':
            return (
              <CyberpunkUltraBackground
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
              <WavefieldUltraBackground
                speed={config.wavefieldSpeed}
                amplitude={config.wavefieldAmplitude}
                color={config.wavefieldColor}
                frequency={config.wavefieldFrequency}
                complexity={config.wavefieldComplexity}
                glow={config.wavefieldGlow}
                starIntensity={config.wavefieldStarIntensity}
                color2={config.wavefieldColor2}
                color3={config.wavefieldColor3}
                rotationSpeed={config.wavefieldRotationSpeed}
                mouseStrength={config.wavefieldMouseStrength}
              />
            );
          case 'solid':
            return (
              <Suspense fallback={null}>
                <SolidColorBackgroundLazy
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
              </Suspense>
            );
          default:
            return <ParticleBackground />;
        }
      })()}
    </Suspense>
  );
};

export default Background;
