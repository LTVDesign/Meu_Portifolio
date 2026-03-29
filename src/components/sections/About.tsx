import { motion } from 'framer-motion';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { Header } from '../atoms';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Texto */}
        <div className="lg:col-span-7">
          <Header useMotion={true} {...config.sections.about} />

          <motion.div
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="prose prose-invert max-w-none mt-10 text-[var(--text-secondary)] leading-relaxed text-lg"
          >
            {config.sections.about.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>
        </div>

        {/* Imagem / Canvas decorativo */}
        <motion.div
          variants={fadeIn('left', 'tween', 0.4, 1)}
          className="lg:col-span-5 relative"
        >
          <div className="glass-card aspect-square rounded-3xl overflow-hidden border border-[var(--cyber-purple)]/30">
            <img
              src="/assets/about-image.jpg"
              alt="Leandro Saturnino Barbosa"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'sobre');