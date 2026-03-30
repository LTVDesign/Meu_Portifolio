/**
 * Barrel export otimizado para framer-motion
 * Importa apenas os componentes necessários para reduzir bundle size
 * 
 * Uso: import { motion, AnimatePresence } from '@/utils/framerMotion';
 */

// Exporta apenas o módulo 'm' que é mais leve que 'motion'
export { m as motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

// Exporta tipos comuns
export type {
    Variants,
    Transition,
    AnimationControls,
    PanInfo,
    TargetAndTransition,
    VisualElement
} from 'framer-motion';

// Hooks úteis
export {
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
    useAnimation,
    useMotionTemplate,
    useVelocity,
    useMotionValueEvent,
    useInView
} from 'framer-motion';