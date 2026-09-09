import { m, useMotionValue, useSpring } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CustomCursor = memo(() => {
  const prefersReduced = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover || prefersReduced) return;

    setIsMobile(false);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-hover')
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [cursorX, cursorY, prefersReduced, isVisible]);

  if (prefersReduced || isMobile) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      {/* Outer ring */}
      <m.div
        className='fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block'
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <m.div
          animate={{
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className='rounded-full border border-white/80'
        />
      </m.div>

      {/* Inner dot */}
      <m.div
        className='fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block'
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <m.div
          animate={{
            width: isClicking ? 4 : isHovering ? 6 : 4,
            height: isClicking ? 4 : isHovering ? 6 : 4,
            opacity: isVisible ? 1 : 0,
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          className='rounded-full bg-white'
        />
      </m.div>

      {/* Japanese symbol trail on hover */}
      <m.div
        className='fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block'
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <m.span
          animate={{
            opacity: isHovering ? 0.6 : 0,
            scale: isHovering ? 1 : 0.5,
            rotate: isHovering ? 0 : -45,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className='text-white text-xs font-bold select-none'
          style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
        >
          {'\u771F'}
        </m.span>
      </m.div>
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';
export default CustomCursor;
