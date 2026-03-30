import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import NotFoundModel from '../components/canvas/NotFoundModel';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center">
            {/* 3D Canvas Background */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <NotFoundModel />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-6 flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-[clamp(6rem,20vw,12rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] leading-none mb-4">
                    404
                </h1>

                <p className="text-[var(--text-secondary)] text-lg mt-6 max-w-md mx-auto leading-relaxed">
                    A página que você está procurando não existe ou foi movida.
                </p>

                {/* Botão de voltar - posicionado na parte inferior */}
                <div className="mt-auto pb-10">
                    <Link
                        to="/"
                        className="btn-primary inline-flex items-center gap-3 group"
                    >
                        <span>Voltar ao Início</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;