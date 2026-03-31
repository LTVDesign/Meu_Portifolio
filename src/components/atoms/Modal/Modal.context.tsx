import React, { createContext, useContext } from 'react';
import { ModalContextType } from './Modal.types';
import { ModalProviderProps } from './Modal.types';

// Create context with default values
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider component
export const ModalProvider: React.FC<ModalProviderProps> = ({
    children,
    defaultTheme = 'default',
    defaultSize = 'md',
    defaultAnimation = 'scale',
    closeOnEscape = true,
    trapFocus = true,
    autoFocus = true,
    preventScroll = true,
    zIndex = 50,
    overlayZIndex = 40,
    contentZIndex = 50,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [theme, setTheme] = React.useState(() => {
        // Import here to avoid circular dependencies
        const { modalThemes } = require('./Modal.types');
        return modalThemes[defaultTheme] || modalThemes.default;
    });
    const [size, setSize] = React.useState(() => {
        const { modalSizes } = require('./Modal.types');
        return modalSizes[defaultSize] || modalSizes.md;
    });
    const [animation, setAnimation] = React.useState(() => {
        const { modalAnimations } = require('./Modal.animation');
        return modalAnimations[defaultAnimation] || modalAnimations.scale;
    });
    const [animationDirection, setAnimationDirection] = React.useState<'up' | 'down' | 'left' | 'right'>('up');
    const [title, setTitle] = React.useState<string>();
    const [describedBy, setDescribedBy] = React.useState<string>();
    const [role, setRole] = React.useState<'dialog' | 'alertdialog' | 'menu'>('dialog');

    const value: ModalContextType = {
        isOpen,
        onClose: () => setIsOpen(false),
        theme,
        size,
        animation,
        animationDirection,
        closeOnEscape,
        trapFocus,
        autoFocus,
        preventScroll,
        closeOnBackdropClick: true,
        closeOnContentClick: false,
        showCloseButton: true,
        title,
        describedBy,
        role,
        zIndex,
        overlayZIndex,
        contentZIndex,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

// Hook to use the modal context
export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};

// Hook to open a modal
export const useModalDialog = () => {
    const context = useModalContext();

    const open = (options?: {
        theme?: string;
        size?: string;
        animation?: string;
        title?: string;
        describedBy?: string;
        role?: 'dialog' | 'alertdialog' | 'menu';
    }) => {
        if (options?.theme) {
            const { modalThemes } = require('./Modal.types');
            context.theme = modalThemes[options.theme] || modalThemes.default;
        }

        if (options?.size) {
            const { modalSizes } = require('./Modal.types');
            context.size = modalSizes[options.size] || modalSizes.md;
        }

        if (options?.animation) {
            const { modalAnimations } = require('./Modal.animation');
            context.animation = modalAnimations[options.animation] || modalAnimations.scale;
        }

        if (options?.title) {
            context.title = options.title;
        }

        if (options?.describedBy) {
            context.describedBy = options.describedBy;
        }

        if (options?.role) {
            context.role = options.role;
        }

        context.isOpen = true;
    };

    const close = () => {
        context.isOpen = false;
    };

    const toggle = () => {
        context.isOpen = !context.isOpen;
    };

    return {
        isOpen: context.isOpen,
        open,
        close,
        toggle,
        context,
    };
};