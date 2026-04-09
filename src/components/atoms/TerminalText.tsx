import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface TerminalTextProps {
  words: string[];
  colors?: string[];
  typingSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursorClassName?: string;
  loop?: boolean;
  typeOnce?: boolean;
  onComplete?: () => void;
  style?: React.CSSProperties;
}

const TerminalText: React.FC<TerminalTextProps> = ({
  words,
  colors = ['#ffffff'],
  typingSpeed = 120,
  pauseTime = 1000,
  className = '',
  cursorClassName = '',
  loop = true,
  typeOnce = false,
  onComplete,
  style = {},
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const wordsRef = useRef([...words]);
  const colorsRef = useRef([...colors]);
  const currentColor = useRef(colorsRef.current[0]);
  const letterCountRef = useRef(1);
  const xRef = useRef(1);
  const waitingRef = useRef(false);
  const loopRef = useRef(loop);
  const typeOnceRef = useRef(typeOnce);
  const onCompleteRef = useRef(onComplete);
  const typingSpeedMsRef = useRef(typingSpeed);

  useEffect(() => {
    loopRef.current = loop;
    typeOnceRef.current = typeOnce;
    onCompleteRef.current = onComplete;
    typingSpeedMsRef.current = typingSpeed;

    wordsRef.current = [...words];
    colorsRef.current = [...colors];
    currentColor.current = colors[0];
    letterCountRef.current = 1;
    xRef.current = 1;
    waitingRef.current = false;
    setDisplayText(words[0].substring(0, 1));
    setShowCursor(true);

    let animationFrameId: number;
    let lastTimestamp: number = 0;

    const typeLoop = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      if (elapsed >= typingSpeedMsRef.current) {
        lastTimestamp = timestamp;
      }

      const currentWords = wordsRef.current;
      const shouldContinue =
        !typeOnceRef.current ||
        (typeOnceRef.current && letterCountRef.current <= currentWords[0].length + 1);

      if (!shouldContinue) {
        return;
      }

      if (elapsed >= typingSpeedMsRef.current) {
        if (letterCountRef.current === 0 && waitingRef.current === false) {
          waitingRef.current = true;
          setDisplayText(currentWords[0].substring(0, letterCountRef.current));

          setTimeout(() => {
            if (loopRef.current) {
              const usedWord = currentWords.shift();
              if (usedWord) currentWords.push(usedWord);
            }

            xRef.current = 1;
            letterCountRef.current += xRef.current;
            waitingRef.current = false;
          }, pauseTime);
        } else if (
          letterCountRef.current === currentWords[0].length + 1 &&
          waitingRef.current === false
        ) {
          waitingRef.current = true;
          if (typeOnceRef.current) {
            setDisplayText(currentWords[0]);
            if (onCompleteRef.current) {
              setTimeout(() => {
                onCompleteRef.current!();
              }, 100);
            }
          } else {
            setTimeout(() => {
              xRef.current = -1;
              letterCountRef.current += xRef.current;
              waitingRef.current = false;
            }, pauseTime);
          }
        } else if (waitingRef.current === false) {
          setDisplayText(currentWords[0].substring(0, letterCountRef.current));
          letterCountRef.current += xRef.current;
        }
      }

      animationFrameId = requestAnimationFrame(typeLoop);
    };

    animationFrameId = requestAnimationFrame(typeLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [words, colors, typingSpeed, pauseTime, loop, typeOnce]);

  useEffect(() => {
    let cursorFrameId: number;
    let lastCursorTime = 0;
    const cursorIntervalMs = 400;

    const cursorLoop = (timestamp: number) => {
      if (timestamp - lastCursorTime >= cursorIntervalMs) {
        lastCursorTime = timestamp;
        setShowCursor((prev) => !prev);
      }
      cursorFrameId = requestAnimationFrame(cursorLoop);
    };

    cursorFrameId = requestAnimationFrame(cursorLoop);

    return () => cancelAnimationFrame(cursorFrameId);
  }, []);

  return (
    <div className={`${className}`} style={style}>
      <span style={{ color: currentColor.current }}>{displayText}</span>
      <span
        style={{ color: currentColor.current }}
        className={`inline-block relative -top-[0.14em] ml-[10px] select-none ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } ${cursorClassName}`}
      >
        &#95;
      </span>
    </div>
  );
};

export default TerminalText;
