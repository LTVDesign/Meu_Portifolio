import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LinkAnimadoProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const LinkAnimado = ({ href, children, className, target, rel, onClick }: LinkAnimadoProps) => {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={onClick}
      whileTap={{ scale: 0.95, opacity: 0.8 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.a>
  );
};

export default LinkAnimado;
