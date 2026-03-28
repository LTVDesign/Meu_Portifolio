import { motion, useScroll } from 'framer-motion';
import { config } from '../../constants/config';
import { styles } from '../../constants/styles';
import { LinkAnimado } from '../atoms';
import { ComputersCanvas } from '../canvas';

const Hero = () => {
  const { scrollYProgress } = useScroll();

  return (
    <section className={`relative mx-auto h-screen w-full`}>
      <div
        className={`absolute inset-0 top-[15vh] w-full ${styles.paddingX} flex flex-col items-center justify-start gap-1 z-10 text-center pointer-events-none`}
      >
        {/* Decorative ball and stick removed */}

        <div className="mt-2">
          <h1 className={styles.heroHeadText}>
            Olá, eu sou <span className="text-[#915EFF]">Leandro Saturnino Barbosa</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2`}>
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <ComputersCanvas />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 z-50 w-full h-1 bg-[#915EFF] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="xs:bottom-10 absolute bottom-32 z-10 flex w-full items-center justify-center">
        <LinkAnimado href="#about">
          <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </LinkAnimado>
      </div>
    </section>
  );
};

export default Hero;
