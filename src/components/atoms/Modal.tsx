import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import close from '../../assets/close.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      // Salvar o elemento que tinha foco antes de abrir o modal
      lastFocusedElement.current = document.activeElement as HTMLElement;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      // Focus trap dentro do modal
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'hidden';

      // Focar no modal quando abrir
      if (modalRef.current) {
        modalRef.current.focus();
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTabKey);
        document.body.style.overflow = 'unset';

        // Retornar foco ao elemento anterior
        if (lastFocusedElement.current) {
          lastFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalTitleId = 'modal-title';

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[100] flex items-start justify-center p-[clamp(0.5rem,2vw,1rem)] bg-black/80 backdrop-blur-sm pt-[clamp(4rem,10vw,6rem)]'
        onClick={onClose}
        role='presentation'
      >
        <m.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className='relative w-full max-w-[clamp(18rem,85vw,48rem)] max-h-[80vh] overflow-y-auto glass-card border border-white/20 shadow-2xl'
          onClick={(e) => e.stopPropagation()}
          role='dialog'
          aria-modal='true'
          aria-labelledby={modalTitleId}
          tabIndex={-1}
        >
          {/* Header */}
          <div className='sticky top-0 z-10 flex items-center justify-between p-[clamp(0.5rem,1.5vw,0.75rem)] border-b border-white/10 bg-black/80 backdrop-blur-md gap-2'>
            <h2
              id={modalTitleId}
              className='text-[clamp(0.75rem,2vw,1rem)] font-bold text-white break-words line-clamp-2 flex-1 min-w-0'
            >
              {title}
            </h2>
            <button
              type='button'
              onClick={onClose}
              className='p-[clamp(0.25rem,1vw,0.5rem)] rounded hover:bg-white/10 transition-colors flex-shrink-0'
              aria-label={t('modal.closeModal')}
            >
              <img src={close} alt='' className='w-4 h-4' />
            </button>
          </div>

          {/* Content */}
          <div className='p-[clamp(0.4rem,1.5vw,0.75rem)]'>{children}</div>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
};

export default Modal;
