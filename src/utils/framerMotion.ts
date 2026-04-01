/**
 * Barrel export otimizado para framer-motion
 * Importa apenas os componentes necessários para reduzir bundle size
 *
 * Uso: import { motion, AnimatePresence } from '@/utils/framerMotion';
 */

// Exporta tipos comuns
export type {
  AnimationControls,
  PanInfo,
  TargetAndTransition,
  Transition,
  Variants,
  VisualElement,
} from 'framer-motion';
// Exporta apenas o módulo 'm' que é mais leve que 'motion'
// Hooks úteis
export {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m as motion,
  useAnimation,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
