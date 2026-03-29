import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/atoms';
import { useTranslation } from 'react-i18next';
import { SectionWrapperComponent } from '../hoc/SectionWrapper';
import { fadeIn } from '../utils/motion';

const DoomPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Impedir scroll quando o DOOM estiver carregado
        const handleScroll = (e: Event) => {
            e.preventDefault();
            window.scrollTo(0, 0);
        };

        window.addEventListener('scroll', handleScroll, { passive: false });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Helmet>
                <title>DOOM - Leandro Barbosa</title>
                <meta name="description" content="DOOM rodando no navegador - Easter Egg" />
            </Helmet>

            <SectionWrapperComponent id="doom" className="doom-container">
                <div className="relative w-full h-screen overflow-hidden bg-black">
                    <Header useMotion={true} p={t('doom.p')} h2={t('doom.h2')} />

                    <motion.div
                        variants={fadeIn('up', 'spring', 0.1, 0.75)}
                        className="relative w-full h-[calc(100vh-200px)] mt-8 rounded-2xl overflow-hidden border-2 border-[var(--cyber-cyan)]/30 shadow-[0_0_50px_rgba(0,243,255,0.3)]"
                    >
                        <iframe
                            src="/doom/index.html"
                            className="w-full h-full border-0"
                            title="DOOM Game"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                        <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/80 border border-[var(--cyber-cyan)]/30 rounded-xl backdrop-blur-sm">
                            <p className="text-[var(--cyber-cyan)] text-xs font-mono uppercase tracking-widest">
                                🎮 Use as setas para mover | Espaço para atirar
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeIn('up', 'spring', 0.2, 0.75)}
                        className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
                    >
                        <h3 className="text-white font-bold text-lg mb-3">Como Jogar</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
                            <div>
                                <p className="font-bold text-[var(--cyber-cyan)] mb-1">Movimento</p>
                                <p>Setas do teclado ↑ ↓ ← →</p>
                            </div>
                            <div>
                                <p className="font-bold text-[var(--cyber-cyan)] mb-1">Ação</p>
                                <p>Espaço para atirar | Ctrl para usar</p>
                            </div>
                            <div>
                                <p className="font-bold text-[var(--cyber-cyan)] mb-1">Objetivo</p>
                                <p>Explore, encontre chaves e elimine os demônios!</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </SectionWrapperComponent>
        </>
    );
};

export default DoomPage;
