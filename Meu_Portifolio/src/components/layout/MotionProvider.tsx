import type React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * MotionProvider - Envolva sua aplicação com este componente para habilitar
 * LazyMotion globalmente, reduzindo o bundle size do framer-motion.
 *
 * Uso:
 * <MotionProvider>
 * <App />
 * </MotionProvider>
 */
interface MotionProviderProps {
  children: React.ReactNode;
}

export const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
};

MotionProvider.displayName = 'MotionProvider';
