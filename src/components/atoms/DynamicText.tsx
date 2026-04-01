// src/components/atoms/DynamicText.tsx

import { motion } from 'framer-motion';
import React, { forwardRef, useMemo } from 'react';
import { useDynamicTextColor } from '../../hooks/useDynamicTextColor';

interface DynamicTextProps {
  children: React.ReactNode;
  colorMode?: 'auto' | 'dark' | 'light' | 'high-contrast';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  backgroundColor?: string; // Permite override do background local
  [key: string]: any;
}

const DynamicText = forwardRef<HTMLElement, DynamicTextProps>(
  (
    {
      children,
      colorMode = 'auto',
      className = '',
      as: Tag = 'span',
      backgroundColor,
      ...props
    },
    ref
  ) => {
    const { color } = useDynamicTextColor(colorMode, undefined, backgroundColor);

    // Proteção contra children complexos
    const safeChildren = useMemo(() => {
      if (React.isValidElement(children)) return children;
      return String(children);
    }, [children]);

    return (
      <motion.span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={className}
        style={{ color }}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {safeChildren}
      </motion.span>
    );
  }
);

DynamicText.displayName = 'DynamicText';

export default DynamicText;
