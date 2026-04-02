import type { Variant } from 'framer-motion';
import type { ModalAnimationConfig, modalAnimations } from './Modal.animation';

export interface ModalProps {
  // Core props
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;

  // Animation props
  animation?: keyof typeof modalAnimations;
  animationDirection?: 'up' | 'down' | 'left' | 'right';
  customAnimation?: ModalAnimationConfig;
  animationDuration?: number;

  // Size props
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  minHeight?: string | number;

  // Style props
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  backdropBlur?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  overlayColor?: string;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  autoFocus?: boolean;
  preventScroll?: boolean;

  // Position props
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  align?: 'center' | 'start' | 'end';
  justify?: 'center' | 'start' | 'end' | 'between';

  // Content props
  showCloseButton?: boolean;
  closeIcon?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnContentClick?: boolean;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;

  // Accessibility props
  title?: string;
  describedBy?: string;
  role?: 'dialog' | 'alertdialog' | 'menu';
  'aria-labelledby'?: string;
  'aria-describedby'?: string;

  // Z-index props
  zIndex?: number;
  overlayZIndex?: number;
  contentZIndex?: number;

  // Event props
  onOpen?: () => void;
  onCloseComplete?: () => void;
  onOpenComplete?: () => void;
  onOverlayClick?: (e: React.MouseEvent) => void;
  onContentClick?: (e: React.MouseEvent) => void;

  // Animation variants
  initial?: Variant;
  animate?: Variant;
  exit?: Variant;
  transition?: any;
}

export interface ModalSizeConfig {
  size: string;
  width: string;
  maxWidth: string;
  height?: string;
  maxHeight?: string;
  padding: string;
}

export interface ModalThemeConfig {
  background: string;
  border: string;
  shadow: string;
  closeButton: {
    background: string;
    hover: string;
    icon: string;
  };
  overlay: {
    background: string;
    blur: string;
  };
}

export const modalSizes: Record<string, ModalSizeConfig> = {
  sm: {
    size: 'sm',
    width: '400px',
    maxWidth: '90vw',
    padding: '1.5rem',
  },
  md: {
    size: 'md',
    width: '600px',
    maxWidth: '90vw',
    padding: '2rem',
  },
  lg: {
    size: 'lg',
    width: '800px',
    maxWidth: '90vw',
    padding: '2.5rem',
  },
  xl: {
    size: 'xl',
    width: '1000px',
    maxWidth: '90vw',
    padding: '3rem',
  },
  full: {
    size: 'full',
    width: '100vw',
    maxWidth: '100vw',
    height: '100vh',
    maxHeight: '100vh',
    padding: '0',
  },
  auto: {
    size: 'auto',
    width: 'auto',
    maxWidth: '90vw',
    padding: '2rem',
  },
};

export const modalThemes: Record<string, ModalThemeConfig> = {
  default: {
    background: 'bg-white dark:bg-gray-800',
    border: 'border-gray-200 dark:border-gray-700',
    shadow: 'shadow-lg',
    closeButton: {
      background: 'bg-gray-100 dark:bg-gray-700',
      hover: 'bg-gray-200 dark:hover:bg-gray-600',
      icon: 'text-gray-600 dark:text-gray-300',
    },
    overlay: {
      background: 'bg-black/50',
      blur: 'backdrop-blur-sm',
    },
  },
  glass: {
    background: 'bg-white/10 backdrop-blur-md border border-white/20',
    border: 'border-white/20',
    shadow: 'shadow-2xl',
    closeButton: {
      background: 'bg-white/10',
      hover: 'bg-white/20',
      icon: 'text-white',
    },
    overlay: {
      background: 'bg-black/60',
      blur: 'backdrop-blur-md',
    },
  },
  dark: {
    background: 'bg-gray-900 dark:bg-black',
    border: 'border-gray-700 dark:border-gray-800',
    shadow: 'shadow-2xl',
    closeButton: {
      background: 'bg-gray-800 dark:bg-gray-900',
      hover: 'bg-gray-700 dark:hover:bg-gray-800',
      icon: 'text-gray-300 dark:text-gray-100',
    },
    overlay: {
      background: 'bg-black/70',
      blur: 'backdrop-blur-sm',
    },
  },
  minimal: {
    background: 'bg-white dark:bg-gray-900',
    border: 'border-gray-100 dark:border-gray-800',
    shadow: 'shadow-sm',
    closeButton: {
      background: 'transparent',
      hover: 'bg-gray-100 dark:hover:bg-gray-800',
      icon: 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300',
    },
    overlay: {
      background: 'bg-black/30',
      blur: 'backdrop-blur-sm',
    },
  },
};

export interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
  theme: ModalThemeConfig;
  size: ModalSizeConfig;
  animation: ModalAnimationConfig;
  animationDirection: 'up' | 'down' | 'left' | 'right';
  closeOnEscape: boolean;
  trapFocus: boolean;
  autoFocus: boolean;
  preventScroll: boolean;
  closeOnBackdropClick: boolean;
  closeOnContentClick: boolean;
  showCloseButton: boolean;
  title?: string;
  describedBy?: string;
  role: 'dialog' | 'alertdialog' | 'menu';
  zIndex: number;
  overlayZIndex: number;
  contentZIndex: number;
}

export interface ModalProviderProps {
  children: React.ReactNode;
  defaultTheme?: keyof typeof modalThemes;
  defaultSize?: keyof typeof modalSizes;
  defaultAnimation?: keyof typeof modalAnimations;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  autoFocus?: boolean;
  preventScroll?: boolean;
  zIndex?: number;
  overlayZIndex?: number;
  contentZIndex?: number;
}
