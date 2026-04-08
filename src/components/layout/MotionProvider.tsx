import { type ReactNode } from 'react';
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
  children: ReactNode;
}

export const MotionProvider = ({ children }: MotionProviderProps) => {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
};

MotionProvider.displayName = 'MotionProvider';
