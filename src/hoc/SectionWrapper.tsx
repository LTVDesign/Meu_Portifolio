import { motion } from 'framer-motion';
import type { ReactNode, ComponentType } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

// Componente JSX
const SectionWrapperComponent = ({ children, id, className = '' }: SectionWrapperProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
      className={`relative py-[clamp(5rem,10vw,8rem)] ${className}`}
    >
      {children}
    </motion.section>
  );
};

// HOC pattern para compatibilidade com código existente
const SectionWrapper = (Component: ComponentType<any>, idName: string) => {
  return function HOC(props: any) {
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
