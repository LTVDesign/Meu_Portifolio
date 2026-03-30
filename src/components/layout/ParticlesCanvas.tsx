import { useRef, useEffect } from 'react';
import { initLaunchParticles } from '../../utils/particles/launchParticles';

const ParticlesCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const btn = btnRef.current;
        if (!canvas || !btn) return;

        const cleanup = initLaunchParticles(canvas, btn);
        return cleanup;
    }, []);

    return (
        <>
            <canvas ref={canvasRef} id="particles-canvas" className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} data-background="true" />
            <button ref={btnRef} className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 w-14 h-14 pointer-events-none opacity-0" aria-hidden="true" />
        </>
    );
};

export default ParticlesCanvas;
