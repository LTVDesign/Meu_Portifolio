// src/components/atoms/DynamicTextProvider.tsx
import { createContext, type ReactNode, useContext, useEffect, useMemo } from 'react';
import { useParticleConfig } from '../../contexts/ParticleConfigContext';
import { getLuminance, getOptimalTextColor, hexToRGB } from '../../utils/contrastUtils';

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
  const value = useMemo(() => ({ defaultColorMode }), [defaultColorMode]);
  const { config } = useParticleConfig();

  // Atualiza as variáveis CSS globalmente baseadas na configuração do background
  useEffect(() => {
    const currentBgHex = (): string => {
      switch (config.backgroundType) {
        case 'solid':
          return config.solidColor1;
        case 'liquid':
          return config.liquidColor1;
        case 'wavefield':
          return config.wavefieldColor;
        case 'cyberpunk':
          return '#0a0a1a';
        case 'matrix':
          return '#000000';
        case 'bolhas':
          return '#0a0a2e';
        case 'particulate':
          return config.particulateColor1 || '#0a0a1a';
        default:
          return '#050816';
      }
    };

    const bgHex = currentBgHex();
    const bgRGB = hexToRGB(bgHex);
    const bgLuminance = getLuminance(bgRGB.r, bgRGB.g, bgRGB.b);
    const textHex = getOptimalTextColor(bgLuminance);
    const isDark = bgLuminance < 0.5;

    const root = document.documentElement;
    root.style.setProperty('--dynamic-text-color', textHex);
    root.style.setProperty('--dynamic-bg-color', bgHex);
    root.style.setProperty('--dynamic-text-is-dark', isDark ? 'true' : 'false');
  }, [config]);

  return (
    <DynamicTextContext.Provider value={value}>{children}</DynamicTextContext.Provider>
  );
};

export const useDynamicTextContext = () => useContext(DynamicTextContext);
