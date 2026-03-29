import { createContext, useContext, useState, ReactNode } from 'react';

type PerformanceLevel = 'high' | 'medium' | 'low';

interface PerformanceContextType {
    level: PerformanceLevel;
    setLevel: (level: PerformanceLevel) => void;
    isLowPerformance: boolean;
    particleCount: number;
    quality: number;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
    const [level, setLevel] = useState<PerformanceLevel>('high');

    const isLowPerformance = level === 'low';
    const particleCount = level === 'high' ? 5000 : level === 'medium' ? 2000 : 500;
    const quality = level === 'high' ? 2 : level === 'medium' ? 1.5 : 1;

    return (
        <PerformanceContext.Provider value={{ level, setLevel, isLowPerformance, particleCount, quality }}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = () => {
    const context = useContext(PerformanceContext);
    if (!context) throw new Error('usePerformance must be used within PerformanceProvider');
    return context;
};