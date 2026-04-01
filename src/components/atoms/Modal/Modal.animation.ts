import type { Variant } from 'framer-motion';

export interface ModalAnimationConfig {
  overlay: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  content: {
    initial: Variant | ((direction: string) => Variant);
    animate: Variant;
    exit: Variant | ((direction: string) => Variant);
  };
}

export const modalAnimations: Record<string, ModalAnimationConfig> = {
  fade: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    content: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  scale: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    content: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
    },
  },
  slide: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    content: {
      initial: (direction: string) => ({
        x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
        y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
        opacity: 0,
      }),
      animate: { x: 0, y: 0, opacity: 1 },
      exit: (direction: string) => ({
        x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
        y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
        opacity: 0,
      }),
    },
  },
  spring: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    content: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
    },
  },
};
