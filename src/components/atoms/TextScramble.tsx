import { m } from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  scrambleChars?: string;
  onComplete?: () => void;
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`\u30A0-\u30FF\u4E00-\u9FAF';

const TextScramble = memo(
  ({
    text,
    className = '',
    delay = 0,
    duration = 1.2,
    scrambleChars = CHARS,
    onComplete,
  }: TextScrambleProps) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const frameRef = useRef(0);
    const queueRef = useRef<{ from: string; to: string; start: number; end: number }[]>(
      []
    );
    const startTimeRef = useRef(0);

    const scramble = useCallback(
      (now: number) => {
        if (!startTimeRef.current) startTimeRef.current = now;
        const elapsed = (now - startTimeRef.current) / 1000;

        if (elapsed < delay / 1000) {
          frameRef.current = requestAnimationFrame(scramble);
          return;
        }

        const queue = queueRef.current;
        let output = '';
        let complete = 0;

        for (let i = 0; i < queue.length; i++) {
          const { from, to, start, end } = queue[i];
          if (now < start) {
            output += from;
          } else if (now > end) {
            output += to;
            complete++;
          } else {
            const midProgress = (now - start) / (end - start);
            if (Math.random() < midProgress) {
              output += to;
            } else {
              output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
          }
        }

        setDisplayText(output);

        if (complete === queue.length) {
          setIsComplete(true);
          onComplete?.();
        } else {
          frameRef.current = requestAnimationFrame(scramble);
        }
      },
      [delay, duration, scrambleChars, onComplete]
    );

    useEffect(() => {
      const chars = text.split('');
      const step = (duration * 1000) / chars.length;

      queueRef.current = chars.map((char, i) => ({
        from: scrambleChars[Math.floor(Math.random() * scrambleChars.length)],
        to: char,
        start: delay + i * step * 0.5,
        end: delay + i * step * 0.5 + step,
      }));

      startTimeRef.current = 0;
      frameRef.current = requestAnimationFrame(scramble);

      return () => cancelAnimationFrame(frameRef.current);
    }, [text, delay, duration, scrambleChars, scramble]);

    return (
      <m.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: delay / 1000 }}
      >
        {displayText.split('').map((char, i) => (
          <m.span
            key={`${i}-${char}`}
            initial={{ opacity: 0.3, y: 4 }}
            animate={{
              opacity: isComplete || displayText[i] === text[i] ? 1 : 0.6,
              y: 0,
            }}
            transition={{ duration: 0.15 }}
            className='inline-block'
            style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
          >
            {char}
          </m.span>
        ))}
        {!isComplete && (
          <m.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className='inline-block w-[2px] h-[1em] bg-white/80 ml-0.5 align-middle'
          />
        )}
      </m.span>
    );
  }
);

TextScramble.displayName = 'TextScramble';
export default TextScramble;
