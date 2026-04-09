// Mock para framer-motion
export const motion = new Proxy(
  {},
  {
    get: (_target, _prop) => {
      // Retorna um componente que renderiza seus filhos
      return ({ children, ...props }: any) => children;
    },
  }
);

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => children;

export const useAnimation = () => ({
  start: jest.fn(),
  stop: jest.fn(),
  set: jest.fn(),
});

export const useMotionValue = (initial: any) => ({
  get: () => initial,
  set: jest.fn(),
  onChange: jest.fn(),
});

export const useTransform = () => ({
  get: () => 0,
  set: jest.fn(),
});

export const useSpring = () => ({
  get: () => 0,
  set: jest.fn(),
});

export const useScroll = () => ({
  scrollX: { get: () => 0 },
  scrollY: { get: () => 0 },
  scrollXProgress: { get: () => 0 },
  scrollYProgress: { get: () => 0 },
});

export const useInView = () => [null, true];

export const stagger = jest.fn();
export const spring = jest.fn();
export const tween = jest.fn();

export default {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
  stagger,
  spring,
  tween,
};
