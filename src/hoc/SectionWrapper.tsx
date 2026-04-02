import { m } from 'framer-motion';
import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

// Componente JSX
const SectionWrapperComponent = ({
  children,
  id,
  className = '',
}: SectionWrapperProps) => {
  const prefersReduced = useReducedMotion();

  return (
    <m.section
      id={id}
      initial={prefersReduced ? {} : { opacity: 0, y: 50 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
      viewport={prefersReduced ? {} : { once: true, amount: 0.25 }}
      className={`relative py-[clamp(2.5rem,5vw,4rem)] ${className}`}
    >
      {children}
    </m.section>
  );
};

// HOC pattern para compatibilidade com código existente
const SectionWrapper = <P extends object>(
  Component: ComponentType<P>,
  idName: string
) => {
  return function HOC(props: PropsWithChildren<P>) {
    return (
      <SectionWrapperComponent id={idName}>
        <Component {...props} />
      </SectionWrapperComponent>
    );
  };
};

// Exportar ambos para compatibilidade
export { SectionWrapperComponent };
export default SectionWrapper;
