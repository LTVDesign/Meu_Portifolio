import { useEffect, useRef, useCallback } from 'react';

export const useModalAccessibility = ({
    isOpen,
    onClose,
    closeOnEscape = true,
    trapFocus = true,
    autoFocus = true,
}: {
    isOpen?: boolean;
    onClose?: () => void;
    closeOnEscape?: boolean;
    trapFocus?: boolean;
    autoFocus?: boolean;
} = {}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Get all focusable elements within the modal
    const getFocusableElements = useCallback(() => {
        const modal = modalRef.current;
        if (!modal) return [];

        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [data-focusable]'
        ) as NodeListOf<HTMLElement>;

        return Array.from(focusableElements);
    }, []);

    // Set focus to the first focusable element
    const focusFirstElement = useCallback(() => {
        const elements = getFocusableElements();
        if (elements.length > 0) {
            const firstElement = elements[0];
            firstElement.focus();
        }
    }, [getFocusableElements]);

    // Handle Escape key
    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape' && closeOnEscape && isOpen) {
                onClose?.();
            }
        },
        [closeOnEscape, isOpen, onClose]
    );

    // Handle Tab key for focus trapping
    const handleTab = useCallback(
        (e: KeyboardEvent) => {
            if (!trapFocus) return;

            const elements = getFocusableElements();
            if (elements.length === 0) return;

            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab: Navigate backwards
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    }
                } else {
                    // Tab: Navigate forwards
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            }
        },
        [getFocusableElements, trapFocus]
    );

    // Set up event listeners
    useEffect(() => {
        if (!isOpen) return;

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('keydown', handleTab);

        // Set focus when modal opens
        if (trapFocus && autoFocus) {
            // Small timeout to ensure the modal is fully rendered
            const timeoutId = setTimeout(() => {
                focusFirstElement();
            }, 50);

            return () => clearTimeout(timeoutId);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('keydown', handleTab);
        };
    }, [isOpen, handleEscape, handleTab, trapFocus, autoFocus, focusFirstElement]);

    // Handle click outside for accessibility
    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (trapFocus && modalRef.current && !modalRef.current.contains(e.target as Node)) {
                // If clicked outside, focus returns to first element
                focusFirstElement();
            }
        },
        [trapFocus, focusFirstElement]
    );

    // Add outside click handler
    useEffect(() => {
        if (!isOpen || !trapFocus) return;

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, trapFocus, handleOutsideClick]);

    return {
        modalRef,
        focusFirstElement,
        getFocusableElements,
    };
};

// Hook for managing aria attributes
export const useModalAria = ({
    isOpen,
    title,
    describedBy,
}: {
    isOpen?: boolean;
    title?: string;
    describedBy?: string;
} = {}) => {
    const setAriaAttributes = useCallback(() => {
        if (!isOpen) return;

        // Set modal attributes
        const modal = document.querySelector('[data-modal-role="dialog"]');
        if (modal) {
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', title ? 'modal-title' : undefined);
            modal.setAttribute('aria-describedby', describedBy || undefined);
        }

        // Set title attributes
        const titleElement = document.getElementById('modal-title');
        if (title && titleElement) {
            titleElement.id = 'modal-title';
            titleElement.setAttribute('role', 'heading');
            titleElement.setAttribute('aria-level', '2');
        }
    }, [isOpen, title, describedBy]);

    useEffect(() => {
        setAriaAttributes();
    }, [setAriaAttributes]);

    return { setAriaAttributes };
};

// Hook for managing body scroll
export const useModalBodyScroll = (isOpen?: boolean, preventScroll = true) => {
    useEffect(() => {
        if (!preventScroll) return;

        if (isOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            return () => {
                // Restore scroll position
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            };
        }
    }, [isOpen, preventScroll]);
};