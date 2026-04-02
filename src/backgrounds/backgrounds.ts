// Barrel file para backgrounds 3D PESADOS
// Separado do index.ts principal para evitar carregamento desnecessário

// Background Manager (controla todos os backgrounds)
export { default as BackgroundManager } from '../components/canvas/BackgroundManager';
export { default as CyberpunkUltraBackground } from '../components/canvas/CyberpunkUltraBackground';
export { default as LiquidBackground } from '../components/canvas/LiquidBackground';
export { default as NotFoundModel } from '../components/canvas/NotFoundModel';
// Componentes de erro/404
export { default as NotFoundScene } from '../components/canvas/NotFoundScene';
export { default as ParticleBackground } from '../components/canvas/ParticleBackground';
export { default as ParticulateShatterBackground } from '../components/canvas/ParticulateShatterBackground';
export { default as SolidColorBackground } from '../components/canvas/SolidColorBackground';
export { default as WavefieldUltraBackground } from '../components/canvas/WavefieldUltraBackground';
