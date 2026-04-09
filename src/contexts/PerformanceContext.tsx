import * as React from 'react';

type PerformanceLevel = 'high' | 'medium' | 'low';

interface PerformanceContextType {
  level: PerformanceLevel;
  setLevel: (level: PerformanceLevel) => void;
  isLowPerformance: boolean;
  particleCount: number;
  quality: number;
}

const PerformanceContext = React.createContext<PerformanceContextType | null>(null);

export const PerformanceProvider = ({ children }: { children: React.ReactNode }) => {
  // Verificação de segurança para children
  const safeChildren = children && !Array.isArray(children) ? children : null;

  if (!safeChildren) {
    console.warn('PerformanceProvider: children inválido ou ausente');
    return null;
  }

  const [level, setLevel] = React.useState<PerformanceLevel>('high');

  const isLowPerformance = level === 'low';
  const particleCount = level === 'high' ? 5000 : level === 'medium' ? 2000 : 500;
  const quality = level === 'high' ? 2 : level === 'medium' ? 1.5 : 1;

  const value = React.useMemo(
    () => ({
      level,
      setLevel,
      isLowPerformance,
      particleCount,
      quality,
    }),
    [level, isLowPerformance, particleCount, quality]
  );

  return (
    <PerformanceContext.Provider value={value}>{safeChildren}</PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = React.useContext(PerformanceContext);
  if (!context) throw new Error('usePerformance must be used within PerformanceProvider');
  return context;
};
