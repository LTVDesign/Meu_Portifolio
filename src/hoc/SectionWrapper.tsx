import type { ComponentType, PropsWithChildren, ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Componente base que aplica o layout e ID padrão às seções.
 */
const SectionWrapperComponent = ({
  children,
  id,
  className = '',
}: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={`relative py-[clamp(2.5rem,5vw,4rem)] overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};

/**
 * HOC (Higher-Order Component) para envolver seções.
 * Refatorado para estabilidade absoluta em React 18/19.
 */
const SectionWrapper = <P extends object>(
  Component: ComponentType<P>,
  idName: string
) => {
  const HOC = (props: PropsWithChildren<P>) => {
    return (
      <SectionWrapperComponent id={idName}>
        <Component {...props} />
      </SectionWrapperComponent>
    );
  };

  HOC.displayName = `SectionWrapper(${Component.displayName || Component.name || 'Component'})`;

  return HOC;
};

export { SectionWrapper, SectionWrapperComponent };
export default SectionWrapper;
