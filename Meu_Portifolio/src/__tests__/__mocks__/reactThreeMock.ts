// Mock para @react-three/fiber
export const Canvas = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export const useFrame = jest.fn();
export const useThree = jest.fn(() => ({
  gl: { domElement: document.createElement('canvas') },
  scene: {},
  camera: {},
  size: { width: 800, height: 600 },
}));

export const useLoader = jest.fn();
export const extend = jest.fn();

// Mock para @react-three/drei
export const OrbitControls = () => null;
export const PerspectiveCamera = () => null;
export const Environment = () => null;
export const Float = ({ children }: { children: React.ReactNode }) => children;
export const Text = () => null;
export const Html = ({ children }: { children: React.ReactNode }) => children;
export const useGLTF = jest.fn(() => ({ scene: {} }));
export const useTexture = jest.fn(() => ({}));
export const Preload = () => null;
export const AdaptiveDpr = () => null;
export const AdaptiveEvents = () => null;

// Default export
export default {
  Canvas,
  useFrame,
  useThree,
  useLoader,
  extend,
};
