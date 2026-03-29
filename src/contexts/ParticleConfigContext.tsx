import * as React from 'react';
import { type ParticleConfig, validateLocalStorageData } from '../utils/validation';

// Importamos o tipo do arquivo de validação

const defaultConfig: ParticleConfig = {
  particleColor: '#915EFF',
  speed: 1, // Reduzido de 2 para 1
  intensity: 0.7,
  quantity: 50, // Reduzido de 100 para 50
  zoom: 1,
  backgroundType: 'particles',
  liquidResolution: 0.5,
  liquidOctaves: 3, // Reduzido de 4 para 3
  liquidSpeed: 0.5,
  liquidScale: 0.05,
  liquidComplexity: 3.0, // Reduzido de 5.0 para 3.0
  liquidExpansion: 1.6,
  liquidTwist: 0.0,
  liquidGrain: 0.018,
  liquidSmoothing: 0.6,
  liquidColor1: '#339cff',
  liquidColor2: '#384fff',
  liquidColor3: '#261985',
  liquidColor4: '#3623c7',
  liquidColor5: '#cce9ff',
  liquidColor6: '#ffffff',
  liquidIntensity: 1.0,
  liquidNoiseScale: 1.0,
  liquidGloss: 0.6,
  liquidRefraction: 0.5,
  particulateSpeed: 1, // Reduzido de 2 para 1
  particulateIntensity: 0.8,
  particulateColor: '#ffffff',
  particulateMode: 'blow',
  particulateQuantity: 1000, // Reduzido de 3000 para 1000
  particulateSize: 3,
  particulateFriction: 0.94,
  particulateSpring: 0.01,
  particulatePalette: 'abstract',
  particulateColor1: '#FF6B6B',
  particulateColor2: '#4ECDC4',
  particulateColor3: '#45B7D1',
  particulateColor4: '#96CEB4',
  particulateColor5: '#FFEAA7',
  particulateColor6: '#DDA0DD',
  cyberpunkBloomStrength: 5, // Reduzido de 7 para 5
  cyberpunkFogDensity: 0.7,
  cyberpunkSpeed: 1, // Reduzido de 2 para 1
  cyberpunkColor1: '#00ff00',
  cyberpunkColor2: '#ffff00',
  cyberpunkColor3: '#4499ff',
  cyberpunkRotationSpeed: 1.0,
  cyberpunkTunnelRadius: 2.0,
  cyberpunkPointSize: 0.015,
  cyberpunkLineOpacity: 0.5,
  cyberpunkCameraFOV: 75,
  wavefieldSpeed: 1, // Reduzido de 2 para 1
  wavefieldAmplitude: 1, // Reduzido de 2 para 1
  wavefieldColor: '#00ffff',
  solidType: 'solid',
  solidColor1: '#08080c',
  solidColor2: '#915EFF',
  solidColor3: '#ff0055',
  solidAngle: 135,
  solidAnimationSpeed: 10,
  solidGrain: false,
  solidOpacity: 1,
  solidBlur: 0,
  particleSize: 1.5,
  particleConnectDistance: 120,
  lineThickness: 1.0,
  particleOpacity: 0.8,
  particleLineColor: '#915EFF',
  particulateWanderSpeed: 0.02,
  particulateWanderStrength: 0.05,
  wavefieldFrequency: 2.0,
  wavefieldComplexity: 1.0,
  wavefieldGlow: 0.8,
  wavefieldStarIntensity: 0.7,
  wavefieldColor2: '#ff00ff',
  wavefieldColor3: '#ff0055',
  wavefieldRotationSpeed: 1.0,
  wavefieldMouseStrength: 1.0,
  bolhasCount: 15000,
  bolhasSpeed: 0.5,
  bolhasSize: 0.02,
  bolhasSpread: 50,
  bolhasColor1: '#915EFF',
  bolhasColor2: '#00D4FF',
  bolhasColor3: '#FF6B9D',
  matrixDensity: 50,
  matrixSpeed: 50,
  matrixFontSize: 2,
  matrixColor: '#00ff00',
  matrixBackgroundColor: '#000000',
  glowIntensity: 0.5,
  trailLength: 20,
  columnSpacing: 0,
  matrixCharSet: 'matrix',
};

interface ParticleConfigContextType {
  config: ParticleConfig;
  updateConfig: (newConfig: Partial<ParticleConfig>) => void;
}

const ParticleConfigContext = React.createContext<ParticleConfigContextType | undefined>(undefined);

export const useParticleConfig = () => {
  const context = React.useContext(ParticleConfigContext);
  if (!context) {
    throw new Error('useParticleConfig must be used within a ParticleConfigProvider');
  }
  return context;
};

interface ParticleConfigProviderProps {
  children: React.ReactNode;
}

export const ParticleConfigProvider: React.FC<ParticleConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = React.useState<ParticleConfig>(defaultConfig);

  React.useEffect(() => {
    // Carregar e validar configurações do localStorage
    const savedConfig = localStorage.getItem('particleConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        const validated = validateLocalStorageData(parsed);
        if (validated) {
          setConfig({ ...defaultConfig, ...validated });
        } else {
          // Se falhar a validação, usa o default e limpa o item corrompido
          localStorage.removeItem('particleConfig');
          setConfig(defaultConfig);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações das partículas:', error);
        setConfig(defaultConfig);
      }
    }
  }, []);

  // Dynamic Text Contrast Tracker
  React.useEffect(() => {
    const getLuminance = (hex: string) => {
      if (!hex?.startsWith('#')) return 0;
      const rgb = parseInt(hex.replace('#', ''), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    let isLight = false;
    if (config.backgroundType === 'solid') {
      const hasLightGradient =
        config.solidType !== 'solid' &&
        (getLuminance(config.solidColor2) > 180 || getLuminance(config.solidColor3) > 180);
      isLight = getLuminance(config.solidColor1) > 180 || hasLightGradient;
    } else if (config.backgroundType === 'liquid') {
      // Liquid has a dark base, but colors can be very bright
      isLight = (getLuminance(config.liquidColor1) + getLuminance(config.liquidColor2)) / 2 > 190;
    } else if (config.backgroundType === 'wavefield') {
      // Wavefield is generally dark, check if the main wave color is extremely bright
      isLight = getLuminance(config.wavefieldColor) > 200;
    } else {
      // particles, cyberpunk, particulate are always dark backgrounds
      isLight = false;
    }

    const root = document.documentElement;
    root.style.setProperty('--dynamic-text-color', isLight ? '#050816' : '#ffffff');
    root.style.setProperty('--dynamic-text-secondary', isLight ? '#111111' : '#d1d5db');
  }, [config]);

  // Listener para mudanças de tema
  React.useEffect(() => {
    const updateParticleColorBasedOnTheme = () => {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const currentTheme =
        savedTheme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const newColor = currentTheme === 'light' ? '#000000' : '#ffffff';

      // Só atualiza se a cor não foi personalizada pelo usuário
      if (
        config.particleColor === '#000000' ||
        config.particleColor === '#ffffff' ||
        config.particleColor === '#915EFF'
      ) {
        updateConfig({ particleColor: newColor });
      }
    };

    // Atualizar cor inicial baseada no tema
    updateParticleColorBasedOnTheme();

    // Observar mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        updateParticleColorBasedOnTheme();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [config.particleColor]);

  const updateConfig = React.useCallback((newConfig: Partial<ParticleConfig>) => {
    setConfig((prevConfig: ParticleConfig) => {
      const updatedConfig = { ...prevConfig, ...newConfig };
      localStorage.setItem('particleConfig', JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  }, []);

  const contextValue = React.useMemo(() => ({ config, updateConfig }), [config, updateConfig]);

  return (
    <ParticleConfigContext.Provider value={contextValue}>{children}</ParticleConfigContext.Provider>
  );
};
