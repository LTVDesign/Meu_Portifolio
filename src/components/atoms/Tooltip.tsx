import { AnimatePresence, m } from 'framer-motion';
import React, { useState } from 'react';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    position = 'top'
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowPositionClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t border-l',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 mt-1 border-b border-r',
        left: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-t border-r',
        right: 'left-full top-1/2 -translate-y-1/2 ml-1 border-b border-l',
    };

    return (
        <div
            className='relative inline-block'
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <>
                        <m.div
                            initial={{ opacity: 0, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0, x: position === 'left' ? 10 : position === 'right' ? -10 : 0 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0, x: position === 'left' ? 10 : position === 'right' ? -10 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute ${positionClasses[position]} px-3 py-2 bg-black/90 border border-[var(--cyber-cyan)]/50 rounded-lg text-white text-xs whitespace-nowrap z-50 shadow-lg backdrop-blur-sm`}
                        >
                            {content}
                        </m.div>
                        <div
                            className={`absolute ${arrowPositionClasses[position]} w-2 h-2 bg-black/90 border border-[var(--cyber-cyan)]/50 rotate-45`}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;
