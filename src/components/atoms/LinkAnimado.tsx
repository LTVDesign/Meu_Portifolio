import { m } from 'framer-motion';
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
    <m.a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 15px rgba(145, 94, 255, 0.5))"
      }}
      whileTap={{ scale: 0.95, opacity: 0.8 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </m.a>
  );
};

export default LinkAnimado;
