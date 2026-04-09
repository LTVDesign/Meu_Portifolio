import { domAnimation, LazyMotion } from 'framer-motion';
import type React from 'react';

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
  // Verificação de segurança para children
  const safeChildren = children && !Array.isArray(children) ? children : null;

  if (!safeChildren) {
    console.warn('MotionProvider: children inválido ou ausente');
    return null;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      {safeChildren}
    </LazyMotion>
  );
};

MotionProvider.displayName = 'MotionProvider';
