import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { staggerContainer, fadeIn } from '../../utils/motion';

const currentlyItems = [
  {
    emoji: '\u{1F3A8}',
    label: 'Creative Coding',
    description: 'Exploring generative art with shaders and WebGL',
  },
  {
    emoji: '\u{1F916}',
    label: 'AI Integration',
    description: 'Building intelligent interfaces with LLMs',
  },
  {
    emoji: '\u{1F30A}',
    label: 'WebGL Shaders',
    description: 'Custom GLSL effects for immersive experiences',
  },
  {
    emoji: '\u{267B}\uFE0F',
    label: 'Sustainability Tech',
    description: 'Green computing and efficient code patterns',
  },
];

const Currently = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  return (
    <div className='w-full mx-auto px-[clamp(1rem,5vw,2rem)]'>
      <m.div
        initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className='mb-[clamp(2rem,5vw,3rem)]'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/5 via-transparent to-[var(--cyber-cyan)]/5 border border-white/5 p-[clamp(1.5rem,4vw,2.5rem)]'>
          {/* Header */}
          <div className='flex items-center gap-3 mb-[clamp(1.5rem,4vw,2rem)]'>
            <div className='relative'>
              <div className='w-2.5 h-2.5 rounded-full bg-green-500' />
              <div className='absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping' />
            </div>
            <h2 className='text-[clamp(1.2rem,3vw,1.5rem)] font-bold text-white uppercase tracking-wider'>
              {t('currently.title', 'Atualmente')}
            </h2>
          </div>

          {/* Items grid */}
          <m.div
            variants={prefersReduced ? {} : staggerContainer(0.1, 0.2)}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.2 }}
            className='grid grid-cols-1 sm:grid-cols-2 gap-4'
          >
            {currentlyItems.map((item, i) => (
              <m.div
                key={item.label}
                variants={fadeIn('up', 'spring', i * 0.08, 0.5)}
                whileHover={{ scale: 1.02, y: -2 }}
                className='group p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 cursor-default'
              >
                <div className='flex items-start gap-3'>
                  <span className='text-2xl flex-shrink-0 mt-0.5'>{item.emoji}</span>
                  <div className='min-w-0'>
                    <h3 className='text-sm font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors'>
                      {item.label}
                    </h3>
                    <p className='text-xs text-white/50 leading-relaxed mt-1'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </m.div>
    </div>
  );
};

export default SectionWrapper(Currently, 'currently');
