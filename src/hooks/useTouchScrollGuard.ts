/**
 * useTouchScrollGuard
 *
 * Hook que resolve o conflito entre scroll da página e interação com canvas 3D
 * em dispositivos touch (mobile, tablet, smartwatch).
 *
 * Estratégia:
 * - Detecta a INTENÇÃO do gesto no touchstart (primeiros pixels de movimento)
 * - Se o gesto é predominantemente VERTICAL → scroll da página (não bloqueia)
 * - Se o gesto é predominantemente HORIZONTAL ou multi-touch → interação 3D
 * - Aplica `touch-action: pan-y` no canvas quando não há interação ativa
 *
 * Uso:
 *   const { canvasRef, isTouchInteracting } = useTouchScrollGuard();
 *   <div ref={canvasRef} style={{ touchAction: isTouchInteracting ? 'none' : 'pan-y' }}>
 *     <Canvas ... />
 *   </div>
 */

import { useCallback, useEffect, useRef, useState } from 'react';

interface TouchScrollGuardOptions {
  /** Ângulo em graus abaixo do qual o gesto é considerado scroll vertical (padrão: 30°) */
  verticalThreshold?: number;
  /** Pixels mínimos de movimento antes de decidir a intenção (padrão: 8px) */
  intentThreshold?: number;
  /** Se false, desabilita completamente a interação touch (padrão: true) */
  enabled?: boolean;
}

interface TouchScrollGuardReturn {
  /** Ref para aplicar no container do canvas */
  containerRef: React.RefObject<HTMLDivElement>;
  /** true quando o usuário está interagindo com o 3D (não scrollando) */
  isTouchInteracting: boolean;
  /** Estilo CSS a aplicar no container */
  touchStyle: React.CSSProperties;
}

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const useTouchScrollGuard = (
  options: TouchScrollGuardOptions = {}
): TouchScrollGuardReturn => {
  const {
    verticalThreshold = 30,
    intentThreshold = 8,
    enabled = true,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchInteracting, setIsTouchInteracting] = useState(false);

  // Refs para não re-criar os listeners a cada render
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const intentDecidedRef = useRef(false);
  const isTouchInteractingRef = useRef(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;

      // Multi-touch (pinch/zoom) → sempre interação 3D
      if (e.touches.length > 1) {
        intentDecidedRef.current = true;
        isTouchInteractingRef.current = true;
        setIsTouchInteracting(true);
        return;
      }

      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      intentDecidedRef.current = false;
    },
    [enabled]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enabled || !touchStartRef.current) return;

      // Intenção já decidida neste gesto
      if (intentDecidedRef.current) {
        // Se decidimos que é interação 3D, podemos opcionalmente prevenir o scroll
        // Mas como os listeners são passivos, o preventDefault não funcionaria aqui.
        // A mágica acontece via CSS touch-action dinâmico.
        return;
      }

      const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
      
      // Se o movimento vertical for significativamente maior que o horizontal,
      // assumimos IMEDIATAMENTE que é scroll e não ativamos interação 3D.
      if (dy > dx && dy > 5) {
        intentDecidedRef.current = true;
        isTouchInteractingRef.current = false;
        setIsTouchInteracting(false);
        return;
      }

      const totalMovement = Math.sqrt(dx * dx + dy * dy);

      // Aguarda pixels suficientes para decidir a intenção (para gestos horizontais)
      if (totalMovement < intentThreshold) return;

      intentDecidedRef.current = true;

      // Calcula o ângulo do gesto em relação ao eixo vertical
      // Atan2(dx, dy) -> dx é o oposto, dy é o adjacente. 
      // Se dx for pequeno (horizontal pequeno) e dy grande (vertical grande), o ângulo será pequeno.
      const angleFromVertical = (Math.atan2(dx, dy) * 180) / Math.PI;

      if (angleFromVertical < verticalThreshold) {
        // Gesto predominantemente VERTICAL → scroll da página
        isTouchInteractingRef.current = false;
        setIsTouchInteracting(false);
      } else {
        // Gesto predominantemente HORIZONTAL ou diagonal → interação 3D
        isTouchInteractingRef.current = true;
        setIsTouchInteracting(true);
      }
    },
    [enabled, intentThreshold, verticalThreshold]
  );

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    intentDecidedRef.current = false;
    isTouchInteractingRef.current = false;
    setIsTouchInteracting(false);
  }, []);

  useEffect(() => {
    if (!enabled || !isTouchDevice()) return;

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [enabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const touchStyle: React.CSSProperties = {
    // auto: comportamento padrão (permite scroll vertical e horizontal)
    // none: bloqueia tudo (quando interagindo com o 3D)
    touchAction: isTouchInteracting ? 'none' : 'auto',
  };

  return { containerRef, isTouchInteracting, touchStyle };
};

export default useTouchScrollGuard;
