import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const reducedVariants = {
  initial: {},
  animate: { transition: { duration: 0 } },
  exit: { transition: { duration: 0 } },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const prefersReduced = useReducedMotion();

  return (
    <m.div
      variants={prefersReduced ? reducedVariants : pageVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {children}
    </m.div>
  );
};

export default PageTransition;
