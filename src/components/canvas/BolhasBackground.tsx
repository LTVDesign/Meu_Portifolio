import { Canvas } from '@react-three/fiber';
import React from 'react';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import ComputeInstancedLODParticles from '../three/ComputeInstancedLODParticles';

const BolhasBackground = () => {
  const { config } = useParticleConfig();

  return (
    <div className='fixed inset-0 -z-10 pointer-events-none w-full h-full'>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ComputeInstancedLODParticles
          count={config.bolhasCount || 15000}
          speed={config.bolhasSpeed || 0.5}
          size={config.bolhasSize || 0.02}
          spread={config.bolhasSpread || 50}
          colors={[
            config.bolhasColor1 || '#915EFF',
            config.bolhasColor2 || '#00D4FF',
            config.bolhasColor3 || '#FF6B9D',
          ]}
        />
      </Canvas>
    </div>
  );
};

export default React.memo(BolhasBackground);
