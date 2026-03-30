import { useRef, useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

interface GearButtonProps {
    onClick: () => void;
    isOpen: boolean;
}

const GearButton = ({ onClick, isOpen }: GearButtonProps) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <AnimatePresence>
            {isMounted && (
                <m.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[10000] theme-toggle-container"
                >
                    <div className="relative group/gear">
                        {/* Múltiplos glow effects coloridos RGB */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <m.div
                                className="w-28 h-28 rounded-full"
                                style={{
                                    background: 'conic-gradient(from 0deg, #915EFF, #00D4FF, #FF6B9D, #00FF88, #915EFF)',
                                    filter: 'blur(25px)',
                                    opacity: 0.6
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                            <m.div
                                className="absolute w-24 h-24 rounded-full"
                                style={{
                                    background: 'conic-gradient(from 180deg, #00D4FF, #915EFF, #FF6B9D, #00FF88, #00D4FF)',
                                    filter: 'blur(20px)',
                                    opacity: 0.5
                                }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            />
                            <m.div
                                className="absolute w-20 h-20 rounded-full"
                                style={{
                                    background: 'conic-gradient(from 90deg, #FF6B9D, #00D4FF, #915EFF, #00FF88, #FF6B9D)',
                                    filter: 'blur(15px)',
                                    opacity: 0.4
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Container da animação de respiração com efeito extra */}
                        <m.div
                            className="launch-btn-wrap relative gear-breathing-enhanced"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                            }}
                        >
                            <button
                                ref={btnRef}
                                onClick={onClick}
                                aria-label="Toggle theme settings"
                                aria-expanded={isOpen}
                                className="launch-btn relative flex items-center justify-center p-5 bg-black/30 border-2 border-[#915EFF]/60 rounded-full shadow-[0_0_25px_rgba(145,94,255,0.6),0_0_50px_rgba(0,212,255,0.4),0_0_75px_rgba(255,107,157,0.3),inset_0_0_25px_rgba(145,94,255,0.15)] hover:shadow-[0_0_40px_rgba(145,94,255,0.8),0_0_80px_rgba(0,212,255,0.6),0_0_100px_rgba(255,107,157,0.4),inset_0_0_35px_rgba(145,94,255,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#915EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300"
                            >
                                {/* Borda animada colorida RGB */}
                                <m.div
                                    className="absolute inset-0 rounded-full border-2 border-transparent"
                                    style={{
                                        background: 'conic-gradient(from 0deg, #915EFF, #00D4FF, #FF6B9D, #00FF88, #915EFF)',
                                        WebkitBackgroundClip: 'padding-box',
                                        backgroundClip: 'padding-box'
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Ícone SVG com gradiente e glow */}
                                <m.svg
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="w-10 h-10 relative z-10"
                                    fill="none"
                                    stroke="url(#gearGradLeft)"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    style={{
                                        filter: 'drop-shadow(0 0 10px rgba(145,94,255,0.9)) drop-shadow(0 0 20px rgba(0,212,255,0.7)) drop-shadow(0 0 30px rgba(255,107,157,0.5))'
                                    }}
                                >
                                    <defs>
                                        <linearGradient id="gearGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#915EFF" />
                                            <stop offset="25%" stopColor="#00D4FF" />
                                            <stop offset="50%" stopColor="#FF6B9D" />
                                            <stop offset="75%" stopColor="#00FF88" />
                                            <stop offset="100%" stopColor="#915EFF" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </m.svg>
                            </button>
                        </m.div>

                        {/* Efeito de brilho pulsante extra */}
                        <m.div
                            className="absolute inset-0 rounded-full border-2 border-[#915EFF] opacity-0"
                            animate={{
                                opacity: [0, 0.6, 0],
                                scale: [0.8, 1.5, 2]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        />

                        {/* Segundo anel pulsante */}
                        <m.div
                            className="absolute inset-0 rounded-full border-2 border-[#00D4FF] opacity-0"
                            animate={{
                                opacity: [0, 0.4, 0],
                                scale: [0.6, 1.3, 1.8]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 0.5
                            }}
                        />
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default GearButton;