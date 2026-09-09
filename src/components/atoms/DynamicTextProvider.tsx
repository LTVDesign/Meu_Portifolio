// src/components/atoms/DynamicTextProvider.tsx
import { createContext, type ReactNode, useContext, useMemo } from 'react';
import { useBackgroundColorSampler } from '../../hooks/useBackgroundColorSampler';

const DynamicTextContext = createContext<{
  defaultColorMode: 'auto' | 'dark' | 'light' | 'high-contrast';
}>({ defaultColorMode: 'auto' });

export const DynamicTextProvider = ({
  children,
  defaultColorMode = 'auto',
}: {
  children: ReactNode;
  defaultColorMode?: 'auto' | 'dark' | 'light' | 'high-contrast';
}) => {
  // Verificação de segurança para children
  const safeChildren = children && !Array.isArray(children) ? children : null;

  if (!safeChildren) {
    console.warn('DynamicTextProvider: children inválido ou ausente');
    return null;
  }

  const value = useMemo(() => ({ defaultColorMode }), [defaultColorMode]);

  // Ativa a amostragem em tempo real do background canvas
  // Atualiza --dynamic-text-color e --dynamic-text-secondary a ~8fps
  useBackgroundColorSampler();

  return (
    <DynamicTextContext.Provider value={value}>
      {safeChildren}
    </DynamicTextContext.Provider>
  );
};

export const useDynamicTextContext = () => useContext(DynamicTextContext);
