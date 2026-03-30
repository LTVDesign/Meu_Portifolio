// src/components/atoms/DynamicTextProvider.tsx
import { createContext, useContext, useMemo, ReactNode } from 'react';

const DynamicTextContext = createContext<{ defaultColorMode: 'auto' | 'dark' | 'light' | 'high-contrast' }>({ defaultColorMode: 'auto' });

export const DynamicTextProvider = ({
    children,
    defaultColorMode = 'auto'
}: {
    children: ReactNode;
    defaultColorMode?: 'auto' | 'dark' | 'light' | 'high-contrast';
}) => {
    const value = useMemo(() => ({ defaultColorMode }), [defaultColorMode]);

    return (
        <DynamicTextContext.Provider value={value}>
            {children}
        </DynamicTextContext.Provider>
    );
};

export const useDynamicTextContext = () => useContext(DynamicTextContext);