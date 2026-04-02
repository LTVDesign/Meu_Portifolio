import type { ComponentType, PropsWithChildren, ReactNode } from 'react';

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
  return (
    <section
      id={id}
      className={`relative py-[clamp(2.5rem,5vw,4rem)] overflow-hidden ${className}`}
    >
      {children}
    </section>
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
