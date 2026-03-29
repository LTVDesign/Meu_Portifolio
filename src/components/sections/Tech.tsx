import { motion } from 'framer-motion';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import {
  reactjs,
  typescript,
  tailwind,
  threejs,
  nodejs,
  python,
  docker,
  git,
  linux,
  figma,
  vscode,
} from '../../assets';

const technologies = [
  { name: 'React', icon: reactjs },
  { name: 'TypeScript', icon: typescript },
  { name: 'Tailwind', icon: tailwind },
  { name: 'Three.js', icon: threejs },
  { name: 'Node.js', icon: nodejs },
  { name: 'Python', icon: python },
  { name: 'Docker', icon: docker },
  { name: 'Git', icon: git },
  { name: 'Linux', icon: linux },
  { name: 'Figma', icon: figma },
  { name: 'VS Code', icon: vscode },
];

const Tech = () => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <motion.div variants={textVariant()} className="text-center mb-16">
        <p className="text-[var(--cyber-purple)] uppercase tracking-widest text-sm font-bold opacity-60">Meu Arsenal</p>
        <h2 className="section-title mt-3 drop-shadow-[0_0_15px_rgba(145,94,255,0.4)]">Stack Tecnológica</h2>
      </motion.div>

      {/* Grid optimized for 2 rows (6+5 items) on desktop */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-12 justify-items-center">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            variants={fadeIn('up', 'spring', index * 0.05, 0.75)}
            className="flex flex-col items-center justify-center group relative h-36 w-24"
          >
            {/* Glass Icon Container */}
            <div className="w-20 h-20 glass-card p-5 flex items-center justify-center rounded-3xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] border border-white/10 group-hover:border-[var(--cyber-cyan)] relative z-10 bg-black/40">
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-12 h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
            </div>
            
            {/* Label name - Floating reveal on hover with intense neon glow */}
            <p className="absolute bottom-2 text-[10px] font-black text-white uppercase tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 drop-shadow-[0_0_12px_rgba(0,255,255,1)] pointer-events-none text-center leading-none">
              {tech.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, 'tecnologias');