import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import NotFoundScene from '../canvas/NotFoundScene';

const NotFound = ({ setViewMode }: { setViewMode?: (mode: string) => void }) => {
    const navigate = useNavigate();

    return (
        <div className="h-[70vh] w-full flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <NotFoundScene />
            </div>

            <div className="relative z-10 text-center pointer-events-none">
                <motion.div
                    variants={fadeIn('up', 'spring', 0.1, 1)}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center"
                >
                    <h1 className="text-[clamp(4rem,15vw,8rem)] font-black text-white drop-shadow-[0_0_20px_rgba(145,94,255,0.4)]">
                        404
                    </h1>
                    <p className="text-[clamp(1rem,2vw,1.5rem)] text-[var(--text-secondary)] uppercase tracking-[0.5em] mt-[-1rem]">
                        Página não encontrada
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                          if (setViewMode) {
                            setViewMode('default');
                          }
                          navigate('/');
                        }}
                        className="mt-12 glass-btn px-10 py-4 rounded-2xl font-bold tracking-widest uppercase hover:scale-105 transition-all pointer-events-auto"
                    >
                        Voltar para o Início
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default SectionWrapper(NotFound, 'notfound');
