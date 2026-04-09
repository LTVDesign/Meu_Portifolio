import React, {
  createContext,
  type FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type ParticleConfig, validateLocalStorageData } from '../utils/validation';

const defaultConfig: ParticleConfig = {
  particleColor: '#915EFF',
  speed: 1,
  intensity: 0.7,
  quantity: 50,
  zoom: 1,
  backgroundType: 'particles',
  liquidResolution: 0.5,
  liquidOctaves: 3,
  liquidSpeed: 0.5,
  liquidScale: 0.05,
  liquidComplexity: 3.0,
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
  particulateSpeed: 1,
  particulateIntensity: 0.8,
  particulateColor: '#ffffff',
  particulateMode: 'blow',
  particulateQuantity: 1000,
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
  cyberpunkBloomStrength: 5,
  cyberpunkFogDensity: 0.7,
  cyberpunkSpeed: 1,
  cyberpunkColor1: '#00ff00',
  cyberpunkColor2: '#ffff00',
  cyberpunkColor3: '#4499ff',
  cyberpunkRotationSpeed: 1.0,
  cyberpunkTunnelRadius: 2.0,
  cyberpunkPointSize: 0.015,
  cyberpunkLineOpacity: 0.5,
  cyberpunkCameraFOV: 75,
  wavefieldSpeed: 1,
  wavefieldAmplitude: 1,
  wavefieldColor: '#00ffff',
  solidType: 'solid',
  solidColor1: '#08080c',
  solidColor2: '#915EFF',
  solidColor3: '#ff0055',
  solidColor1Alpha: 1,
  solidColor2Alpha: 1,
  solidColor3Alpha: 1,
  solidAngle: 135,
  solidAnimationSpeed: 10,
  solidGrain: false,
  solidOpacity: 1,
  solidBlur: 0,
  solidScale: 1,
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
  interactionMode: 'none',
};

interface ParticleConfigContextType {
  config: ParticleConfig;
  updateConfig: (newConfig: Partial<ParticleConfig>) => void;
  isBgMenuOpen: boolean;
  openBgMenu: () => void;
  closeBgMenu: () => void;
}

const ParticleConfigContext = createContext<ParticleConfigContextType | undefined>(
  undefined
);

/**
 * useBackgroundMenu hook
 */
const useBackgroundMenu = () => {
  const context = useContext(ParticleConfigContext);
  if (!context) {
    throw new Error('useBackgroundMenu must be used within a ParticleConfigProvider');
  }
  return {
    isBgMenuOpen: context.isBgMenuOpen,
    openBgMenu: context.openBgMenu,
    closeBgMenu: context.closeBgMenu,
  };
};

const useParticleConfig = () => {
  const context = useContext(ParticleConfigContext);
  if (!context) {
    throw new Error('useParticleConfig must be used within a ParticleConfigProvider');
  }
  return context;
};

interface ParticleConfigProviderProps {
  children: React.ReactNode;
}

const ParticleConfigProvider: FC<ParticleConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<ParticleConfig>(defaultConfig);
  const [isBgMenuOpen, setIsBgMenuOpen] = useState(false);

  const openBgMenu = useCallback(() => setIsBgMenuOpen(true), []);
  const closeBgMenu = useCallback(() => setIsBgMenuOpen(false), []);

  useEffect(() => {
    const savedConfig = localStorage.getItem('particleConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        const validated = validateLocalStorageData(parsed);
        if (validated) {
          setConfig({ ...defaultConfig, ...validated });
        } else {
          localStorage.removeItem('particleConfig');
          setConfig(defaultConfig);
        }
      } catch {
        setConfig(defaultConfig);
      }
    }
  }, []);

  // FIX: Usar ref para evitar loop infinito de re-renderizações
  const hasInitializedThemeColor = useRef(false);

  useEffect(() => {
    const updateParticleColorBasedOnTheme = () => {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const currentTheme =
        savedTheme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const newColor = currentTheme === 'light' ? '#000000' : '#ffffff';

      if (
        config.particleColor === '#000000' ||
        config.particleColor === '#ffffff' ||
        config.particleColor === '#915EFF'
      ) {
        updateConfig({ particleColor: newColor });
      }
    };

    // Só executa uma vez na inicialização para evitar loop
    if (!hasInitializedThemeColor.current) {
      hasInitializedThemeColor.current = true;
      updateParticleColorBasedOnTheme();
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        updateParticleColorBasedOnTheme();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); // FIX: Removido config.particleColor das dependências

  const updateConfig = useCallback((newConfig: Partial<ParticleConfig>) => {
    setConfig((prevConfig: ParticleConfig) => {
      const updatedConfig = { ...prevConfig, ...newConfig };
      localStorage.setItem('particleConfig', JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      config,
      updateConfig,
      isBgMenuOpen,
      openBgMenu,
      closeBgMenu,
    }),
    [config, updateConfig, isBgMenuOpen, openBgMenu, closeBgMenu]
  );

  return (
    <ParticleConfigContext.Provider value={contextValue}>
      {children}
    </ParticleConfigContext.Provider>
  );
};

export { ParticleConfigProvider, useBackgroundMenu, useParticleConfig };
