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
    <div className="max-w-7xl mx-auto px-6">
      <motion.div variants={textVariant()} className="text-center mb-16">
        <p className="text-[var(--cyber-purple)] uppercase tracking-widest text-sm font-bold">Tecnologias</p>
        <h2 className="section-title mt-3">Stack Tecnológica</h2>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            variants={fadeIn('up', 'spring', index * 0.05, 0.75)}
            className="glass-card p-8 flex flex-col items-center justify-center gap-4 hover:scale-110 transition-transform neon-hover"
          >
            <img src={tech.icon} alt={tech.name} className="w-16 h-16 object-contain" />
            <p className="text-white font-medium text-lg">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, 'tecnologias');