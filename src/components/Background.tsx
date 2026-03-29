// Background.tsx - DEPRECATED
// Este componente foi substituído por ComputeInstancedLODParticles no App.tsx
// Mantido apenas para compatibilidade com imports antigos

import ComputeInstancedLODParticles from './three/ComputeInstancedLODParticles';

const Background = () => {
  return <ComputeInstancedLODParticles count={50000} />;
};

export default Background;
