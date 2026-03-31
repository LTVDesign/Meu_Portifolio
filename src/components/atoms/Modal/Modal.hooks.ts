import { useState, useCallback, useRef, useEffect } from 'react';
import { useModalAccessibility } from './Modal.accessibility';
import { useModalBodyScroll } from './Modal.accessibility';

export interface ModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const useModal = (initialState = false): ModalState => {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
};

export interface ModalConfig {
    closeOnEscape?: boolean;
    trapFocus?: boolean;
    autoFocus?: boolean;
    preventScroll?: boolean;
}

export const useModalWithConfig = (initialState = false, config: ModalConfig = {}) => {
    const { isOpen, open, close, toggle } = useModal(initialState);

    // Apply accessibility hooks
    useModalAccessibility({
        isOpen,
        onClose: close,
        closeOnEscape: config.closeOnEscape !== false,
        trapFocus: config.trapFocus !== false,
        autoFocus: config.autoFocus !== false,
    });

    // Apply scroll prevention
    useModalBodyScroll(isOpen, config.preventScroll !== false);

    return {
        isOpen,
        open,
        close,
        toggle,
        ...config,
    };
};

// Hook for managing animation direction
export const useAnimationDirection = () => {
    const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('up');
    const lastAnimationTime = useRef(0);

    const setDirectionBasedOnClick = useCallback((element: HTMLElement) => {
        const now = Date.now();
        if (now - lastAnimationTime.current < 300) return; // Debounce rapid clicks

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = window.innerWidth / 2;
        const mouseY = window.innerHeight / 2;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            setDirection(deltaX > 0 ? 'right' : 'left');
        } else {
            setDirection(deltaY > 0 ? 'down' : 'up');
        }

        lastAnimationTime.current = now;
    }, []);

    return { direction, setDirectionBasedOnClick };
};

// Hook for keyboard shortcuts
export const useModalKeyboardShortcuts = (
    isOpen: boolean,
    onClose: () => void,
    shortcuts: { key: string; ctrl?: boolean; shift?: boolean; alt?: boolean; action: () => void }[] = []
) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const matchingShortcut = shortcuts.find(shortcut => {
                const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
                const ctrlMatch = shortcut.ctrl ? e.ctrlKey : true;
                const shiftMatch = shortcut.shift ? e.shiftKey : true;
                const altMatch = shortcut.alt ? e.altKey : true;

                return keyMatch && ctrlMatch && shiftMatch && altMatch;
            });

            if (matchingShortcut) {
                e.preventDefault();
                matchingShortcut.action();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, shortcuts]);
};

// Hook for managing modal stack (for multiple modals)
export const useModalStack = () => {
    const stack = useRef<symbol[]>([]);

    const push = useCallback(() => {
        const id = Symbol();
        stack.current = [...stack.current, id];
        return id;
    }, []);

    const pop = useCallback((id: symbol) => {
        stack.current = stack.current.filter(item => item !== id);
    }, []);

    const getTopModal = useCallback(() => {
        return stack.current[stack.current.length - 1];
    }, []);

    const isTopModal = useCallback((id: symbol) => {
        return getTopModal() === id;
    }, [getTopModal]);

    return { push, pop, getTopModal, isTopModal, stackLength: stack.current.length };
};