// src/components/atoms/DynamicText.tsx
// Texto com cor dinâmica em tempo real baseada no background animado.
// Usa CSS variable --dynamic-text-color atualizada pelo useBackgroundColorSampler
// + mix-blend-mode: difference como fallback para inversão pixel a pixel.

import { m } from 'framer-motion';
import React, { forwardRef, useMemo } from 'react';

interface DynamicTextProps {
  children: React.ReactNode;
  colorMode?: 'auto' | 'dark' | 'light' | 'high-contrast';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  backgroundColor?: string;
  [key: string]: any;
}

/**
 * DynamicText - Texto com inversão de cor em tempo real.
 *
 * Combina duas estratégias:
 * 1. CSS variable --dynamic-text-color (atualizada ~8fps pelo sampler)
 * 2. mix-blend-mode: difference (inversão pixel-a-pixel em tempo real)
 *
 * A cor se adapta automaticamente a qualquer background animado.
 */
const DynamicText = forwardRef<HTMLElement, DynamicTextProps>(
  (
    {
      children,
      colorMode = 'auto',
      className = '',
      as: _Tag = 'span',
      backgroundColor: _backgroundColor,
      ...props
    },
    ref
  ) => {
    const safeChildren = useMemo(() => {
      if (React.isValidElement(children)) return children;
      if (Array.isArray(children)) {
        return children.map((child) =>
          React.isValidElement(child) ? child : String(child)
        );
      }
      return children == null ? '' : String(children);
    }, [children]);

    return (
      <m.span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={`dynamic-text-blend ${className}`}
        style={{
          color: 'var(--dynamic-text-color, #ffffff)',
          transition: 'color 0.15s ease-out',
        }}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {safeChildren}
      </m.span>
    );
  }
);

DynamicText.displayName = 'DynamicText';

export default DynamicText;
