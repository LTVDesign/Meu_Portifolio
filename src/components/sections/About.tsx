import { motion } from 'framer-motion';
import { SectionWrapper } from '../../hoc';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Texto */}
        <div className="lg:col-span-7">
          <Header
            useMotion={true}
            p={t('about.p')}
            h2={t('about.h2')}
          />

          <motion.div
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="prose prose-invert max-w-none mt-10 text-[var(--text-secondary)] leading-relaxed text-lg"
          >
            {t('about.content').split('\n').map((paragraph, i) => (
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