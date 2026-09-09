import { m } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Manifesto = () => {
  const prefersReduced = useReducedMotion();

  return (
    <m.div
      initial={prefersReduced ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }}
      className='text-center py-[clamp(4rem,12vh,8rem)] px-[clamp(1rem,5vw,4rem)]'
    >
      <m.blockquote
        initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className='relative max-w-3xl mx-auto'
      >
        <p className='text-[clamp(1.5rem,4vw,2.5rem)] font-light text-white/90 leading-snug tracking-tight'>
          Interfaces que respiram.
          <br />
          <span className='text-white/40'>Código que encanta.</span>
          <br />
          <span className='bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] bg-clip-text text-transparent font-medium'>
            Design que permanece.
          </span>
        </p>
      </m.blockquote>

      <m.p
        initial={prefersReduced ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
        className='mt-[clamp(2rem,5vh,3rem)] text-[clamp(0.7rem,1.2vw,0.85rem)] text-white/30 uppercase tracking-[0.4em]'
      >
        Design com alma &mdash; Craft &amp; Precision
      </m.p>
    </m.div>
  );
};

export default Manifesto;
