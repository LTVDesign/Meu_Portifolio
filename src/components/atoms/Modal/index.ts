// Main Modal component
export { default as Modal } from './Modal';
export {
  useModalAccessibility,
  useModalAria,
  useModalBodyScroll,
} from './Modal.accessibility';
// Animation configuration type
export type { ModalAnimationConfig } from './Modal.animation';
// Animation configurations
// Animation presets
export {
  modalAnimations as animationPresets,
  modalAnimations,
} from './Modal.animation';
// Context
export { ModalProvider, useModalContext, useModalDialog } from './Modal.context';
// Hooks
export {
  useAnimationDirection,
  useModal,
  useModalKeyboardShortcuts,
  useModalStack,
  useModalWithConfig,
} from './Modal.hooks';
// Types
export type {
  ModalContextType,
  ModalProps,
  ModalProviderProps,
  ModalSizeConfig,
  ModalThemeConfig,
} from './Modal.types';
// Size presets
// Theme presets
export { modalSizes as sizePresets, modalThemes as themePresets } from './Modal.types';
