import type React from 'react';
import { useContext, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import {
  useModalAccessibility,
  useModalAria,
  useModalBodyScroll,
} from './Modal.accessibility';
import { modalAnimations } from './Modal.animation';
import { ModalContext } from './Modal.context';
import {
  type ModalContextType,
  type ModalProps,
  modalSizes,
  modalThemes,
} from './Modal.types';

const Modal: React.FC<ModalProps> = ({
  children,

  // Core props
  isOpen: controlledOpen,
  onClose: controlledOnClose,

  // Animation props
  animation = 'scale',
  animationDirection = 'up',
  customAnimation,
  animationDuration = 0.3,

  // Size props
  size = 'md',
  width,
  height,
  maxWidth,
  maxHeight,
  minHeight,

  // Style props
  className = '',
  overlayClassName = '',
  backdropBlur = 'md',
  overlayColor = 'bg-black/50',
  closeOnEscape = true,
  trapFocus = true,
  autoFocus = true,
  preventScroll = true,

  // Position props
  position = 'center',
  align = 'center',
  justify = 'center',

  // Content props
  showCloseButton = true,
  closeIcon,
  closeOnBackdropClick = true,
  closeOnContentClick = false,
  closeOnEsc = true,
  closeOnOutsideClick = true,

  // Accessibility props
  title,
  describedBy,
  role = 'dialog',
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,

  // Z-index props - handled by CSS classes
  zIndex: _zIndex,
  overlayZIndex: _overlayZIndex,
  contentZIndex: _contentZIndex,

  // Event props
  onOpen,
  onCloseComplete,
  onOpenComplete,
  onOverlayClick,
  onContentClick,

  // Animation variants
  initial,
  animate,
  exit,
  transition: customTransition,
}) => {
  // Use context or controlled props
  const context = useContext(ModalContext);
  const isControlled = controlledOpen !== undefined;
  const contextValues = context as ModalContextType | undefined;

  const {
    isOpen: isOpenFromContext,
    onClose: onCloseFromContext,
    theme: themeFromContext,
    size: sizeFromContext,
    animation: animationFromContext,
    animationDirection: animationDirectionFromContext,
    closeOnEscape: closeOnEscapeFromContext,
    trapFocus: trapFocusFromContext,
    autoFocus: autoFocusFromContext,
    preventScroll: preventScrollFromContext,
    closeOnBackdropClick: closeOnBackdropClickFromContext,
    closeOnContentClick: closeOnContentClickFromContext,
    showCloseButton: showCloseButtonFromContext,
    title: titleFromContext,
    describedBy: describedByFromContext,
    role: roleFromContext,
    zIndex: _zIndexFromContext,
    overlayZIndex: _overlayZIndexFromContext,
    contentZIndex: _contentZIndexFromContext,
  } = contextValues || {};

  // Use props or context values
  const isOpen = isControlled ? controlledOpen : isOpenFromContext || false;
  const onClose = isControlled ? controlledOnClose : onCloseFromContext;
  const theme = themeFromContext || modalThemes.default;
  const sizeConfig = sizeFromContext || modalSizes[size];
  const animationConfig =
    customAnimation || animationFromContext || modalAnimations[animation];
  const finalAnimationDirection = animationDirectionFromContext || animationDirection;
  const finalCloseOnEscape = closeOnEscapeFromContext ?? closeOnEscape;
  const finalTrapFocus = trapFocusFromContext ?? trapFocus;
  const finalAutoFocus = autoFocusFromContext ?? autoFocus;
  const finalPreventScroll = preventScrollFromContext ?? preventScroll;
  const finalCloseOnBackdropClick =
    closeOnBackdropClickFromContext ?? closeOnBackdropClick;
  const finalCloseOnContentClick = closeOnContentClickFromContext ?? closeOnContentClick;
  const finalShowCloseButton = showCloseButtonFromContext ?? showCloseButton;
  const finalTitle = titleFromContext || title;
  const finalDescribedBy = describedByFromContext || describedBy;
  const finalRole = roleFromContext || role;
  // zIndex props are handled by CSS classes

  // Apply accessibility hooks
  const { modalRef } = useModalAccessibility({
    isOpen,
    onClose,
    closeOnEscape: finalCloseOnEscape,
    trapFocus: finalTrapFocus,
    autoFocus: finalAutoFocus,
  });

  // Apply ARIA attributes (hook returns no usable values for now)
  useModalAria({
    isOpen,
    title: finalTitle,
    describedBy: finalDescribedBy,
  });

  // Apply scroll prevention
  useModalBodyScroll(isOpen, finalPreventScroll);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onCloseComplete?.();
    }
  }, [isOpen, onOpen, onCloseComplete]);

  const handleAnimationComplete = () => {
    if (isOpen) {
      onOpenComplete?.();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (finalCloseOnBackdropClick && !closeOnOutsideClick) {
      e.stopPropagation();
      onClose?.();
    }
    onOverlayClick?.(e);
  };

  // Handle content click
  const handleContentClick = (e: React.MouseEvent) => {
    if (finalCloseOnContentClick) {
      e.stopPropagation();
      onClose?.();
    }
    onContentClick?.(e);
  };

  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && finalCloseOnEscape && closeOnEsc) {
      onClose?.();
    }
  };

  // Calculate animation variants
  const getAnimationVariants = () => {
    if (initial !== undefined || animate !== undefined || exit !== undefined) {
      return { initial, animate, exit };
    }

    const contentVariants = animationConfig.content as any;
    const direction = finalAnimationDirection;

    const resolveVariant = (variant: any, dir: string): any => {
      if (variant === undefined) return undefined;
      return typeof variant === 'function' ? variant(dir) : variant;
    };

    return {
      initial: resolveVariant(contentVariants.initial, direction),
      animate: contentVariants.animate,
      exit: resolveVariant(contentVariants.exit, direction),
    };
  };

  const animationVariants = getAnimationVariants();
  const transition = customTransition || { duration: animationDuration };

  // Calculate backdrop blur classes
  const backdropBlurClasses = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  }[backdropBlur];

  // Calculate position classes
  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-20',
    bottom: 'items-end justify-end pb-20',
    left: 'items-center justify-start pl-20',
    right: 'items-center justify-end pr-20',
  }[position];

  const justifyClasses = {
    center: 'justify-center',
    start: 'justify-start',
    end: 'justify-end',
    between: 'justify-between',
  }[justify];

  const alignClasses = {
    center: 'items-center',
    start: 'items-start',
    end: 'items-end',
  }[align];

  // Build size classes
  const sizeClasses = sizeConfig.padding;
  const widthStyle = width || sizeConfig.width;
  const maxWidthStyle = maxWidth || sizeConfig.maxWidth;
  const heightStyle = height || sizeConfig.height;
  const maxHeightStyle = maxHeight || sizeConfig.maxHeight;
  const minHeightStyle = minHeight;

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className={`fixed inset-0 z-[40] ${backdropBlurClasses} ${overlayColor} ${overlayClassName} ${positionClasses}`}
          onClick={handleBackdropClick}
          initial={animationConfig.overlay.initial as any}
          animate={animationConfig.overlay.animate as any}
          exit={animationConfig.overlay.exit as any}
          transition={transition}
        >
          <m.div
            ref={modalRef}
            data-modal-role='dialog'
            role={finalRole}
            tabIndex={-1}
            aria-modal='true'
            aria-labelledby={ariaLabelledby || finalTitle ? 'modal-title' : undefined}
            aria-describedby={ariaDescribedby || finalDescribedBy || undefined}
            className={`
                            relative z-[50]
                            ${theme.background}
                            ${theme.border}
                            ${theme.shadow}
                            ${sizeClasses}
                            ${className}
                            ${alignClasses}
                            ${justifyClasses}
                            outline-none
                        `}
            style={{
              width: widthStyle,
              maxWidth: maxWidthStyle,
              height: heightStyle,
              maxHeight: maxHeightStyle,
              minHeight: minHeightStyle,
            }}
            onClick={handleContentClick}
            onKeyDown={handleKeyDown}
            initial={animationVariants.initial as any}
            animate={animationVariants.animate as any}
            exit={animationVariants.exit as any}
            transition={transition}
            onAnimationComplete={handleAnimationComplete}
          >
            {/* Title */}
            {finalTitle && (
              <h2
                id='modal-title'
                className='text-2xl font-bold text-gray-900 dark:text-white mb-4'
              >
                {finalTitle}
              </h2>
            )}

            {/* Content */}
            <div className='relative'>
              {children}

              {/* Close Button */}
              {finalShowCloseButton && (
                <m.button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    onClose?.();
                  }}
                  className={`
                                        absolute top-4 right-4 z-10 p-2 rounded-full
                                        ${theme.closeButton.background}
                                        ${theme.closeButton.hover}
                                        ${theme.closeButton.icon}
                                        hover:shadow-lg transition-all duration-200
                                    `}
                  aria-label='Fechar'
                >
                  {closeIcon || (
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  )}
                </m.button>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

