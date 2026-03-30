import { motion } from 'framer-motion';
import type React from 'react';

import { styles } from '../../constants/styles';
import DynamicText from './DynamicText';

interface IHeader {
  useMotion: boolean;
  p: string;
  h2: string;
}

export const Header: React.FC<IHeader> = ({ useMotion, p, h2 }) => {
  console.log('[Header] Renderizando Header, p:', p?.substring(0, 50), 'h2:', h2?.substring(0, 50));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const nameVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 40,
      filter: 'blur(20px)',
      textShadow: '0 0 0px rgba(145,94,255,0)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      textShadow: [
        '0 0 10px rgba(145,94,255,0.5)',
        '0 0 20px rgba(145,94,255,0.8)',
        '0 0 40px rgba(0,255,255,0.6)',
        '0 0 10px rgba(145,94,255,0.5)'
      ],
      transition: {
        scale: {
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1]
        },
        y: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        },
        filter: {
          duration: 0.5
        },
        textShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  if (useMotion === true) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center flex flex-col items-center justify-center"
      >
        <motion.div
          variants={nameVariants}
          className="mb-6 relative"
          style={{
            textShadow: '0 0 20px rgba(145,94,255,0.6), 0 0 40px rgba(0,255,255,0.4)'
          }}
        >
          <h2 className={`${styles.sectionHeadText} relative z-10`}>
            <DynamicText colorMode="auto">{h2}</DynamicText>
          </h2>
          {/* Efeito de brilho atrás do texto */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] bg-clip-text text-transparent blur-xl opacity-30 -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <DynamicText colorMode="auto">{h2}</DynamicText>
          </motion.div>
        </motion.div>
        <motion.div variants={subtitleVariants}>
          <p className={`${styles.sectionSubText} relative`}>
            <DynamicText colorMode="auto">{p}</DynamicText>
            {/* Linha animada abaixo do subtítulo */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="text-center flex flex-col items-center justify-center">
      <div className="mb-4 relative">
        <h2 className={`${styles.sectionHeadText} relative z-10`}>
          <DynamicText colorMode="auto">{h2}</DynamicText>
        </h2>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] bg-clip-text text-transparent blur-xl opacity-30 -z-10">
          <DynamicText colorMode="auto">{h2}</DynamicText>
        </div>
      </div>
      <p className={`${styles.sectionSubText} relative`}>
        <DynamicText colorMode="auto">{p}</DynamicText>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent w-0 group-hover:w-full transition-all duration-500" />
      </p>
    </div>
  );
};
