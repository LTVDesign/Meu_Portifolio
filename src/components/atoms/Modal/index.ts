// Main Modal component
export { default as Modal } from './Modal';

// Context
export { ModalProvider, useModalContext, useModalDialog } from './Modal.context';

// Types
export type {
    ModalProps,
    ModalSizeConfig,
    ModalThemeConfig,
    ModalContextType,
    ModalProviderProps,
} from './Modal.types';

// Animation configuration type
export type { ModalAnimationConfig } from './Modal.animation';

// Animation configurations
export {
    modalAnimations as animationPresets,
} from './Modal.animation';

// Hooks
export {
    useModal,
    useModalWithConfig,
    useAnimationDirection,
    useModalKeyboardShortcuts,
    useModalStack,
} from './Modal.hooks';

export {
    useModalAccessibility,
    useModalAria,
    useModalBodyScroll,
} from './Modal.accessibility';

// Size presets
export { modalSizes as sizePresets } from './Modal.types';

// Theme presets
export { modalThemes as themePresets } from './Modal.types';

// Animation presets
export { modalAnimations } from './Modal.animation';