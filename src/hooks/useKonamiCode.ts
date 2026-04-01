import { useEffect, useState } from 'react';

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

export const useKonamiCode = () => {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const expectedKey = KONAMI_CODE[konamiIndex];

      if (event.code === expectedKey) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);

        if (newIndex === KONAMI_CODE.length) {
          setIsActivated(true);
          setKonamiIndex(0);

          // Abre o Doom em uma nova janela em full screen
          const doomWindow = window.open(
            '/doom',
            '_blank',
            'fullscreen=yes,scrollbars=yes,resizable=yes'
          );

          if (doomWindow) {
            doomWindow.focus();
          }

          // Reseta após ativar
          setTimeout(() => setIsActivated(false), 1000);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [konamiIndex]);

  return { isActivated, konamiIndex };
};
