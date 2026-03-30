import React, { useEffect, useState, useRef } from 'react';

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

  useEffect(() => {
    loopRef.current = loop;
    typeOnceRef.current = typeOnce;
    onCompleteRef.current = onComplete;

    wordsRef.current = [...words];
    colorsRef.current = [...colors];
    currentColor.current = colors[0];
    letterCountRef.current = 1;
    xRef.current = 1;
    waitingRef.current = false;
    setDisplayText(words[0].substring(0, 1));
    setShowCursor(true);

    const typeInterval = setInterval(() => {
      let currentWords = wordsRef.current;
      let currentColors = colorsRef.current;

      if (letterCountRef.current === 0 && waitingRef.current === false) {
        waitingRef.current = true;
        setDisplayText(currentWords[0].substring(0, letterCountRef.current));

        setTimeout(() => {
          const usedColor = currentColors.shift();
          if (usedColor) currentColors.push(usedColor);
          currentColor.current = currentColors[0];

          if (loopRef.current) {
            const usedWord = currentWords.shift();
            if (usedWord) currentWords.push(usedWord);
          }

          xRef.current = 1;
          letterCountRef.current += xRef.current;
          waitingRef.current = false;
        }, pauseTime);
      } else if (letterCountRef.current === currentWords[0].length + 1 && waitingRef.current === false) {
        waitingRef.current = true;
        if (typeOnceRef.current) {
          setDisplayText(currentWords[0]);
          // Call onComplete callback when typeOnce finishes
          if (onCompleteRef.current) {
            setTimeout(() => {
              onCompleteRef.current!();
            }, 100);
          }
          clearInterval(typeInterval);
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
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [words, colors, typingSpeed, pauseTime, loop, typeOnce]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 400);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={`inline-block whitespace-wrap ${className}`} style={style}>
      <span style={{ color: currentColor.current, transition: 'color 0.2s ease' }}>
        {displayText}
      </span>
      <span
        style={{ color: currentColor.current }}
        className={`inline-block relative -top-[0.14em] ml-[10px] select-none transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'
          } ${cursorClassName}`}
      >
        &#95;
      </span>
    </span>
  );
};

export default TerminalText;
