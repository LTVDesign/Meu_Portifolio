import { memo, useCallback, useEffect, useState } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../constants';
import { useViewport } from '../../hooks/useViewport';
import { LinkAnimado } from '../atoms';
import Tooltip from '../atoms/Tooltip';

// Logo da raiz (public) - servido estaticamente
const logo = '/logo.svg';

const Navbar = memo(() => {
  const [active, setActive] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const { width: screenWidth } = useViewport();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t, i18n } = useTranslation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fechar menu ao redimensionar para desktop   (XL breakpoint = 1280px)
  useEffect(() => {
    if (screenWidth >= 1280 && toggle) {
      setToggle(false);
    }
  }, [screenWidth, toggle]);

  // Ativar o link correto baseado na rota atual
  useEffect(() => {
    const pathToSectionMap: Record<string, string> = {
      '/formacao': 'formacao',
      '/cursos': 'cursos',
      '/contato': 'contact',
      '/projetos': 'works',
      '/doom': 'doom',
    };

    if (location.pathname === '/') {
      // Na home, o IntersectionObserver cuida de atualizar o active
      return;
    }

    const sectionId = pathToSectionMap[location.pathname];
    if (sectionId) {
      setActive(sectionId);
    } else {
      setActive(null);
    }
  }, [location.pathname]);

  // IntersectionObserver para seções na Home
  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -40% 0px',
      threshold: 0.05,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Mapear IDs das seções para IDs dos navLinks
          const sectionToNavMap: Record<string, string> = {
            'about': 'about',
            'formacao': 'formacao',
            'experience': 'experience',
            'cursos': 'cursos',
            'curriculo': 'curriculo',
            'works': 'works',
            'contact': 'contact',
          };
          if (sectionToNavMap[sectionId]) {
            setActive(sectionToNavMap[sectionId]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const observeSections = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        observer.observe(section);
      });
    };

    const timer = setTimeout(observeSections, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  // Scroll otimizado com RAF para evitar reflow forçado
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isHome) {
      // RAF para deferir leitura do DOM e scrollIntoView
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActive(id);
          setToggle(false);
          window.history.pushState(null, '', `#${id}`);
        }
      });
    } else {
      setToggle(false);
    }
  }, [isHome, setActive, setToggle]);

  const getNavLink = (navId: string) => {
    if (navId === 'doom') {
      return '/doom';
    }
    return `/#${navId}`;
  };

  // Fluid logo logic handled via Tailwind clamp utilities now!
  return (
    <nav
      className='critical-navbar glass transition-all duration-300'
      style={{
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Logo Flutuante - Tamanho responsivo usando clamp */}
      <Link
        to='/'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`absolute left-[clamp(0.25rem,2vw,1.5rem)] top-[clamp(0.25rem,1vw,0.5rem)] z-50 w-[clamp(2rem,5vw,4rem)] h-[clamp(2rem,5vw,4rem)] pointer-events-auto logo-float block`}
        aria-label={t('nav.logo')}
      >
        <m.div
          initial={{ y: -10 }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
          className='w-full h-full'
        >
          <img
            src={logo}
            alt={t('nav.logoAlt')}
            className='w-full h-full object-contain drop-shadow-[0_0_20px_rgba(145,94,255,0.8)]'
            width='128'
            height='128'
            decoding="sync"
          />
        </m.div>
      </Link>

      {/* Progress Line */}
      <div className='absolute bottom-0 left-0 h-[clamp(2px,0.5vh,4px)] w-full bg-white/10 overflow-hidden'>
        <m.div
          className='h-full bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] origin-left shadow-[0_0_20px_rgba(0,255,255,0.8)] relative overflow-hidden'
          style={{ scaleX }}
        >
          <div className='absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shine-anim' />
        </m.div>
      </div>

      <div
        className={`w-[min(100%,_var(--max-width,100vw))] mx-auto flex items-center justify-between gap-[clamp(0.5rem,2vw,1rem)] px-[clamp(0.5rem,5vw,4rem)] py-[clamp(0.25rem,1vw,0.75rem)]`}
      >
        {/* Left side: Brand and Tagline */}
        <div className={`flex items-center gap-[clamp(0.5rem,3vw,1.5rem)] ml-[clamp(3rem,6vw,5rem)]`}>
          <Link
            to='/'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='flex items-center gap-[clamp(0.4rem,1vw,0.75rem)] group relative'
            aria-label={t('nav.logo')}
          >
            <span className='navbar-brand-text text-high-contrast'>
              <span
                className='cyber-name'
                style={{
                  fontSize: 'clamp(1rem, 2.5vw + 0.5rem, 2.25rem)',
                  gap: 'clamp(0.3rem, 1vw, 0.75rem)',
                }}
              >
                <span className='name-part' data-text={String(t('nav.brand_part1'))}>
                  <div className='name-glow-layer' />
                  {String(t('nav.brand_part1'))}
                </span>
                <span className='name-part name-accent' data-text={String(t('nav.brand_part2'))}>
                  <div className='name-glow-layer' />
                  {String(t('nav.brand_part2'))}
                </span>
              </span>
            </span>
          </Link>
        </div>

        {/* Right aligned Menu - Desktop/Tablet - Agora alinhado com o breakpoint LG */}
        <div className='hidden lg:flex items-center gap-2 lg:gap-4'>
          <ul className='flex items-center gap-0.5 lg:gap-1 xl:gap-2'>
            {navLinks.map((nav) => {
              const isActive = active === nav.id;
              return (
                <li key={nav.id} className='relative group'>
                  <LinkAnimado
                    href={getNavLink(nav.id)}
                    onClick={(e) => {
                      if (isHome) {
                        handleNavClick(e, nav.id);
                      }
                    }}
                    className={`navbar-link composited-hover py-[clamp(0.25rem,0.6vw,0.5rem)] px-[clamp(0.3rem,1vw,0.75rem)] text-[clamp(0.65rem,1.2vw,0.85rem)] font-bold uppercase tracking-widest transition-all duration-300 hover:text-[var(--cyber-cyan)] relative group/link ${isActive ? 'text-white active-menu-glow' : 'text-white/70'}`}
                  >
                    {String(t(`nav.${nav.id}`))}
                    <m.div
                      className='absolute inset-0 bg-[var(--cyber-purple)]/10 rounded-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 -z-10'
                      whileHover={{ scale: 1.05 }}
                    />
                  </LinkAnimado>
                </li>
              );
            })}
          </ul>

          {/* Language Selector */}
          <div className='flex items-center gap-1.5 pl-2 md:pl-4 border-l border-white/10'>
            <Tooltip content='Idioma: Português' position='bottom'>
              <m.button
                onClick={() => i18n.changeLanguage('pt')}
                whileHover={{ scale: 1.15 }}
                className={`relative w-5 h-3 rounded overflow-hidden transition-all duration-200 ${i18n.language === 'pt' ? 'ring-2 ring-[var(--cyber-purple)]' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}
                aria-label="Português"
              >
                <div
                  className='absolute inset-0 bg-cover bg-center'
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23009c3b' width='1000' height='700'/%3E%3Cpolygon fill='%23ffdf00' points='500,80 920,350 500,620 80,350'/%3E%3Ccircle fill='%23002776' cx='500' cy='350' r='170'/%3E%3Cpath fill='white' d='M500,180 a170,170 0 1,0 0,340 a130,130 0 1,1 0,-340'/%3E%3C/svg%3E")`,
                  }}
                />
              </m.button>
            </Tooltip>
            <Tooltip content='Change language to English' position='bottom'>
              <m.button
                onClick={() => i18n.changeLanguage('en')}
                whileHover={{ scale: 1.15 }}
                className={`relative w-5 h-3 rounded overflow-hidden transition-all duration-200 ${i18n.language === 'en' ? 'ring-2 ring-[var(--cyber-cyan)]' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}
                aria-label="English"
              >
                <div
                  className='absolute inset-0 bg-cover bg-center'
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23bf0a30' width='1000' height='700'/%3E%3Cpath fill='white' d='M0,100 h1000 M0,200 h1000 M0,300 h1000 M0,400 h1000 M0,500 h1000 M0,600 h1000' stroke='white' stroke-width='50'/%3E%3Crect fill='%23002868' width='400' height='350'/%3E%3Cg fill='white'%3E%3Cpolygon points='50,30 53,45 68,45 56,54 60,69 50,60 40,69 44,54 32,45 47,45'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </m.button>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Toggle - Agora aparece em telas menores que LG (iPad Air incluso) */}
        <div className='lg:hidden flex items-center'>
          <Tooltip content={t('backgroundMenu.openSettings')} position='bottom'>
            <button
              onClick={() => setToggle(!toggle)}
              className='text-white hover:text-[var(--cyber-cyan)] composited-hover transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center'
              aria-label={toggle ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={toggle}
            >
              <div className={`flex flex-col justify-between items-end w-[clamp(1rem,4vw,1.5rem)] h-[clamp(0.875rem,3vw,1.25rem)]`}>
                <span
                  className={`h-[clamp(1px,0.2vh,2px)] bg-current transition-all duration-300 ${toggle ? 'w-full translate-y-[clamp(4px,1vw,7px)] -rotate-45' : 'w-full'}`}
                />
                <span
                  className={`h-[clamp(1px,0.2vh,2px)] bg-current transition-all duration-300 ${toggle ? 'opacity-0' : 'w-[75%]'}`}
                />
                <span
                  className={`h-[clamp(1px,0.2vh,2px)] bg-current transition-all duration-300 ${toggle ? 'w-full -translate-y-[clamp(4px,1vw,7px)] rotate-45' : 'w-[85%]'}`}
                />
              </div>
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Mobile Menu Content - Ajustado para iPad e Mobile com scroll interno */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 glass border-t border-white/10 transition-all duration-300 ease-out z-50 overflow-y-auto overflow-x-hidden ${toggle ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{
          maxHeight: toggle ? 'calc(100dvh - clamp(40px, 10vh, 80px))' : '0',
          overscrollBehavior: 'contain',
          width: '100%',
          backgroundColor: 'rgba(5, 8, 22, 0.95)',
        }}
      >
        <div className="px-[clamp(0.75rem,3vw,1.5rem)] py-[clamp(1rem,4vw,1.5rem)]">
          <ul className="flex flex-col font-bold uppercase tracking-widest mb-4 gap-[clamp(0.5rem,1.5vw,1rem)] text-[clamp(0.75rem,2vw,0.875rem)]">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <Link
                  to={getNavLink(nav.id)}
                  onClick={() => setToggle(false)}
                  className={`text-white/80 hover:text-white composited-hover transition-colors block py-[clamp(0.5rem,1.5vw,0.625rem)] min-h-[clamp(36px,10vw,48px)] flex items-center gap-3 px-2 rounded-xl active:bg-white/5 ${active === nav.id ? 'text-[var(--cyber-cyan)] font-bold border-l-2 border-[var(--cyber-cyan)] pl-4' : ''}`}
                >
                  <span className='text-white/80'>{t(`nav.${nav.id}`)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-[clamp(0.5rem,2vw,1rem)] border-t border-white/10 pt-[clamp(0.75rem,2vw,1rem)]">
            <button
              onClick={() => {
                i18n.changeLanguage('pt');
                setToggle(false);
              }}
              className={`relative rounded overflow-hidden min-w-[44px] min-h-[44px] flex items-center justify-center w-[clamp(2rem,6vw,2.5rem)] h-[clamp(1.25rem,4vw,1.5rem)]`}
              aria-label="Português"
            >
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23009c3b' width='1000' height='700'/%3E%3Cpolygon fill='%23ffdf00' points='500,80 920,350 500,620 80,350'/%3E%3Ccircle fill='%23002776' cx='500' cy='350' r='170'/%3E%3Cpath fill='white' d='M500,180 a170,170 0 1,0 0,340 a130,130 0 1,1 0,-340'/%3E%3C/svg%3E")`,
                }}
              />
              {i18n.language === 'pt' && (
                <div className='absolute inset-0 ring-2 ring-[var(--cyber-purple)] rounded' />
              )}
            </button>
            <button
              onClick={() => {
                i18n.changeLanguage('en');
                setToggle(false);
              }}
              className={`relative rounded overflow-hidden min-w-[44px] min-h-[44px] flex items-center justify-center w-[clamp(2rem,6vw,2.5rem)] h-[clamp(1.25rem,4vw,1.5rem)]`}
              aria-label="English"
            >
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23bf0a30' width='1000' height='700'/%3E%3Cpath fill='white' d='M0,100 h1000 M0,200 h1000 M0,300 h1000 M0,400 h1000 M0,500 h1000 M0,600 h1000' stroke='white' stroke-width='50'/%3E%3Crect fill='%23002868' width='400' height='350'/%3E%3Cg fill='white'%3E%3Cpolygon points='50,30 53,45 68,45 56,54 60,69 50,60 40,69 44,54 32,45 47,45'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              {i18n.language === 'en' && (
                <div className='absolute inset-0 ring-2 ring-[var(--cyber-cyan)] rounded' />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav >
  );
});

export default Navbar;

