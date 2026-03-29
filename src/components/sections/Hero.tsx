import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { ComputersCanvas } from '../canvas';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 z-10">
        <div className="max-w-3xl">
          <motion.div variants={textVariant()}>
            <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] leading-none font-bold tracking-tighter text-white neon-text">
              Olá, eu sou<br />
              <span className="bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-white bg-clip-text text-transparent">
                {config.hero.name}
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="mt-8 text-[clamp(1.1rem,2.5vw,1.35rem)] text-[var(--text-secondary)] max-w-lg"
          >
            {config.hero.p[0]}
          </motion.p>

          <motion.div
            variants={fadeIn('up', 'tween', 0.6, 1)}
            className="mt-12 flex flex-wrap gap-5"
          >
            <a href="#projetos" className="btn-primary text-lg px-12 py-6">
              Ver Meus Projetos
            </a>
            <a href="#contact" className="border border-white/30 hover:border-white/60 text-white font-medium px-10 py-6 rounded-3xl transition-all">
              Entrar em Contato
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative neon element & 3D Model */}
      <div className="absolute inset-0 z-0 opacity-40 xl:opacity-100">
        <ComputersCanvas />
      </div>

      <div className="absolute bottom-10 right-10 hidden xl:block text-[12rem] font-black text-white/5 tracking-[-0.05em] pointer-events-none select-none">
        LSB
      </div>
    </div>
  );
};

export default SectionWrapper(Hero, 'hero');