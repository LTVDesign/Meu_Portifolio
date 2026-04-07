import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';

const NotFound = () => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();

  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center px-6'>
      <m.div variants={fadeIn('up', 'tween', 0.2, 1)} className='text-center'>
        {/* Número 404 Gigante */}
        <m.h1
          initial={prefersReduced ? {} : { scale: 0, rotate: -180 }}
          animate={prefersReduced ? { scale: 1, rotate: 0 } : { scale: 1, rotate: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }
          }
          className='text-[clamp(6rem,20vw,12rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] leading-none mb-4'
        >
          404
        </m.h1>

        {/* Efeito de glitch no 404 */}
        <div className='relative'>
          <m.div
            animate={
              prefersReduced
                ? {}
                : {
                  x: [-2, 2, -2, 2, 0],
                  opacity: [0.5, 0.8, 0.5, 0.8, 0],
                }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
            }
            className='absolute inset-0 text-[clamp(6rem,20vw,12rem)] font-black text-[var(--cyber-cyan)] opacity-30 blur-sm'
          >
            404
          </m.div>
        </div>

        {/* Header com título */}
        <Header
          useMotion={true}
          p={t('notFound.p', 'Página não encontrada')}
          h2={t('notFound.h2', 'Oops! Algo deu errado')}
        />

        {/* Descrição */}
        <m.p
          variants={fadeIn('up', 'tween', 0.4, 1)}
          className='text-lg mt-6 max-w-md mx-auto leading-relaxed text-white/80'
          style={{
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
          }}
        >
          {t(
            'notFound.description',
            'A página que você está procurando não existe ou foi movida.'
          )}
        </m.p>

        {/* Ícone decorativo */}
        <m.div
          variants={fadeIn('up', 'tween', 0.5, 1)}
          className='mt-8 flex justify-center'
        >
          <div className='relative'>
            <m.div
              animate={prefersReduced ? {} : { rotate: 360 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 10, repeat: Infinity, ease: 'linear' }
              }
              className='w-24 h-24 rounded-full border-4 border-dashed border-[var(--cyber-purple)]/30 flex items-center justify-center'
            >
              <m.div
                animate={prefersReduced ? {} : { rotate: -360 }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { duration: 10, repeat: Infinity, ease: 'linear' }
                }
                className='w-16 h-16 rounded-full border-2 border-[var(--cyber-cyan)]/50 flex items-center justify-center'
              >
                <span className='text-3xl'>🔍</span>
              </m.div>
            </m.div>

            {/* Partículas decorativas */}
            {[...Array(6)].map((_, i) => (
              <m.div
                key={i}
                animate={
                  prefersReduced
                    ? {}
                    : {
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }
                }
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : {
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }
                }
                className='absolute w-2 h-2 rounded-full bg-[var(--cyber-cyan)]'
                style={{
                  top: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                  left: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
        </m.div>

        {/* Botão de voltar */}
        <m.div
          variants={prefersReduced ? {} : fadeIn('up', 'tween', 0.6, 1)}
          className='mt-10'
        >
          <Link to='/' className='btn-primary inline-flex items-center gap-3 group'>
            <span>{t('notFound.backHome', 'Voltar ao Início')}</span>
            <m.span
              animate={prefersReduced ? {} : { x: [0, 5, 0] }}
              transition={
                prefersReduced ? { duration: 0 } : { duration: 1.5, repeat: Infinity }
              }
              className='text-xl group-hover:translate-x-1 transition-transform'
            >
              →
            </m.span>
          </Link>
        </m.div>

        {/* Links rápidos */}
        <m.div
          variants={prefersReduced ? {} : fadeIn('up', 'tween', 0.7, 1)}
          className='mt-8 flex flex-wrap justify-center gap-4'
        >
          {[
            { path: '/', label: t('nav.home', 'Início') },
            { path: '/formacao', label: t('nav.formacao', 'Formação') },
            { path: '/projetos', label: t('nav.projetos', 'Projetos') },
            { path: '/contato', label: t('nav.contact', 'Contato') },
          ].map((link, index) => (
            <m.div
              key={link.path}
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={prefersReduced ? { duration: 0 } : { delay: 0.8 + index * 0.1 }}
            >
              <Link
                to={link.path}
                className='px-4 py-2 text-sm hover:text-[var(--cyber-cyan)] transition-colors border border-white/10 rounded-lg hover:border-[var(--cyber-cyan)]/50 hover:bg-white/5 text-white/80'
                style={{
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                }}
              >
                {link.label}
              </Link>
            </m.div>
          ))}
        </m.div>

        {/* Mensagem de Easter Egg */}
        <m.p
          variants={prefersReduced ? {} : fadeIn('up', 'tween', 0.9, 1)}
          className='mt-12 text-xs text-white/40'
        >
          {t('tech.easterEgg')}
        </m.p>
      </m.div>
    </div>
  );
};

export default SectionWrapper(NotFound, 'notfound');
