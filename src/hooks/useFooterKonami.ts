import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
];

export const useFooterKonami = () => {
    const [konamiProgress, setKonamiProgress] = useState(0);
    const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const expectedKey = KONAMI_CODE[konamiProgress];

            if (event.code === expectedKey) {
                const newIndex = konamiProgress + 1;
                setKonamiProgress(newIndex);

                if (newIndex === KONAMI_CODE.length) {
                    // Sequência completa - mostrar animação de desbloqueio
                    setShowUnlockAnimation(true);
                    setIsUnlocked(true);

                    // Após a animação, abrir o DOOM
                    setTimeout(() => {
                        window.open('/doom', '_blank', 'fullscreen=yes,scrollbars=yes,resizable=yes');
                        setShowUnlockAnimation(false);
                        setKonamiProgress(0);
                        setIsUnlocked(false);
                    }, 2000);
                }
            } else {
                setKonamiProgress(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiProgress]);

    const simulateKeyPress = useCallback((index: number) => {
        const expectedKey = KONAMI_CODE[index];
        if (expectedKey) {
            const event = new KeyboardEvent('keydown', { code: expectedKey });
            window.dispatchEvent(event);
        }
    }, []);

    const reset = useCallback(() => {
        setKonamiProgress(0);
        setIsUnlocked(false);
        setShowUnlockAnimation(false);
    }, []);

    return {
        konamiProgress,
        showUnlockAnimation,
        isUnlocked,
        simulateKeyPress,
        reset,
    };
};
