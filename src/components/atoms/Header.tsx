import { motion } from 'framer-motion';
import type React from 'react';

import { styles } from '../../constants/styles';
import { textVariant } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import DynamicText from './DynamicText';

interface IHeader {
  useMotion: boolean;
  p: string;
  h2: string;
}

export const Header: React.FC<IHeader> = ({ useMotion, p, h2 }) => {
  console.log('[Header] Renderizando Header, p:', p?.substring(0, 50), 'h2:', h2?.substring(0, 50));
  const prefersReduced = useReducedMotion();

  const Content = () => {
    console.log('[Header] Content renderizando, p:', p?.substring(0, 50), 'h2:', h2?.substring(0, 50));
    return (
      <div className="text-center flex flex-col items-center">
        <p className={styles.sectionSubText}>
          <DynamicText colorMode="auto">{p}</DynamicText>
        </p>
        <h2 className={styles.sectionHeadText}>
          <DynamicText colorMode="auto">{h2}</DynamicText>
        </h2>
      </div>
    );
  };

  return useMotion === true ? (
    <motion.div
      variants={prefersReduced ? {} : textVariant()}
      className="text-center flex flex-col items-center justify-center"
    >
      <Content />
    </motion.div>
  ) : (
    <div className="text-center flex flex-col items-center justify-center">
      <Content />
    </div>
  );
};
