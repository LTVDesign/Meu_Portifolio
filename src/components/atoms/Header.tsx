import { motion } from 'framer-motion';
import type React from 'react';

import { styles } from '../../constants/styles';
import { textVariant } from '../../utils/motion';

interface IHeader {
  useMotion: boolean;
  p: string;
  h2: string;
}

export const Header: React.FC<IHeader> = ({ useMotion, p, h2 }) => {
  const Content = () => (
    <div className="text-center flex flex-col items-center">
      <p className={styles.sectionSubText}>{p}</p>
      <h2 className={styles.sectionHeadText}>{h2}</h2>
    </div>
  );

  return useMotion === true ? (
    <motion.div
      variants={textVariant()}
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
