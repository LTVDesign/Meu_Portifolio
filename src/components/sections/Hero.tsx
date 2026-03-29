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
        className={`absolute inset-0 top-[clamp(10vh,15vh,20vh)] w-full ${styles.paddingX} flex flex-col items-center justify-start gap-1 z-10 text-center pointer-events-none`}
      >
        {/* Decorative ball and stick removed */}

        <div className="mt-2">
          <h1 className={styles.heroHeadText}>
            Olá, eu sou <br className="sm:hidden" />
            <span className="neon-text font-extrabold uppercase tracking-tight">
              Leandro S. Barbosa
            </span>
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

      <div className="absolute min-[280px]:bottom-10 bottom-24 z-10 flex w-full items-center justify-center group px-4">
        <LinkAnimado href="#about">
          <div className="relative flex items-center justify-center">
            {/* Seta Circular de Rotação (Feedback visual de que pode girar o PC) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -inset-[clamp(20px,8vw,40px)] pointer-events-none opacity-30 group-hover:opacity-80 transition-opacity duration-500"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full fill-none stroke-secondary drop-shadow-[0_0_8px_rgba(145,94,255,0.3)]"
                aria-label="Indicador de rotação do modelo 3D"
              >
                <title>Indicador de rotação do modelo 3D</title>
                {/* Arco Superior */}
                <path
                  d="M 50, 10 A 40, 40 0 0, 1 90, 50"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
                <path d="M 85, 45 L 90, 50 L 95, 45" strokeWidth="1.5" strokeLinecap="round" />

                {/* Arco Inferior */}
                <path
                  d="M 50, 90 A 40, 40 0 0, 1 10, 50"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
                <path d="M 15, 55 L 10, 50 L 5, 55" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Mouse Indicator */}
            <div className="border-secondary flex h-[clamp(40px,6vh,64px)] w-[clamp(24px,3vh,35px)] items-start justify-center rounded-3xl border-[3px] p-1.5 relative z-10 bg-primary/10 backdrop-blur-[2px]">
              <motion.div
                animate={{
                  y: [0, 16, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="bg-secondary mb-1 h-3 w-3 rounded-full"
              />
            </div>
          </div>
        </LinkAnimado>
      </div>
    </section>
  );
};

export default Hero;
