import { m, useScroll, useSpring } from 'framer-motion';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../constants';
import { useViewport } from '../../hooks/useViewport';
import { LinkAnimado } from '../atoms';
import Tooltip from '../atoms/Tooltip';



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
  }, [screenWidth]);

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
      rootMargin: '-80px 0px -50% 0px',
      threshold: 0.05,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Mapear IDs das seções para IDs dos navLinks
          const sectionToNavMap: Record<string, string> = {
            about: 'about',
            formacao: 'formacao',
            experience: 'experience',
            cursos: 'cursos',
            curriculo: 'curriculo',
            works: 'works',
            contact: 'contact',
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
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
    },
    [isHome, setActive, setToggle]
  );

  const getNavLink = (navId: string) => {
    if (navId === 'doom') {
      return '/doom';
    }
    return `/#${navId}`;
  };

  // Fluid logo logic handled via Tailwind clamp utilities now!
  return (
    <nav
      className='critical-navbar glass !overflow-visible transition-all duration-300'
      style={{
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        padding: '0.25rem 0',
        contain: 'none',
      }}
    >
      {/* Logo Flutuante - Visível e destacado */}
      <Link
        to='/'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`absolute left-[clamp(0.2rem,1vw,1rem)] top-[clamp(1.5rem,3vw,2.5rem)] z-50 w-[clamp(4.5rem,10vw,8rem)] h-[clamp(4.5rem,10vw,8rem)] pointer-events-auto block`}
        aria-label={t('nav.logo')}
      >
        <m.div
          initial={{ y: -15 }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
          className='w-full h-full'
        >
          <img
            src='/assets/icons/logo.webp'
            alt={t('nav.logoAlt')}
            className='w-full h-full object-contain drop-shadow-[0_0_25px_rgba(145,94,255,0.9)]'
            width='128'
            height='128'
            decoding='sync'
            fetchPriority='high'
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
        className={`w-[min(100%,_var(--max-width,100vw))] mx-auto flex items-center justify-between gap-1 px-[clamp(0.25rem,1vw,1rem)] py-0.5`}
      >
        {/* Left side: Brand and Tagline */}
        <div
          className={`flex items-center gap-[clamp(0.5rem,3vw,1.5rem)] pl-[clamp(4.5rem,10vw,8.5rem)]`}
        >
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
                <span
                  className='name-part name-accent'
                  data-text={String(t('nav.brand_part2'))}
                >
                  <div className='name-glow-layer' />
                  {String(t('nav.brand_part2'))}
                </span>
              </span>
            </span>
          </Link>
        </div>

        {/* Right aligned Menu - Always visible, fluid scaling */}
        <div className='flex items-center gap-[clamp(0.25rem,0.5vw,0.5rem)]'>
          <ul className='flex items-center gap-[clamp(0.125rem,0.4vw,0.375rem)]'>
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
                    className={`navbar-link composited-hover py-[clamp(0.15rem,0.4vw,0.35rem)] px-[clamp(0.2rem,0.8vw,0.5rem)] text-[clamp(0.35rem,0.8vw,0.55rem)] font-bold uppercase tracking-wider transition-all duration-300 hover:text-[var(--cyber-cyan)] relative group/link ${isActive ? 'text-white active-menu-glow' : 'text-white/70'}`}
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
          <div className='flex items-center gap-[clamp(0.6rem,1vw,0.8rem)] pl-[clamp(0.5rem,1vw,1rem)] border-l border-white/10'>
            <Tooltip content='Idioma: Português' position='bottom'>
              <m.button
                onClick={() => i18n.changeLanguage('pt')}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-[clamp(0.2rem,0.5vw,0.4rem)] transition-all duration-300 ${i18n.language === 'pt' ? 'text-[var(--cyber-purple)]' : 'text-white/70 hover:text-white'}`}
                aria-label='Português'
              >
                <div
                  className={`relative w-[clamp(1.2rem,2.2vw,1.8rem)] h-[clamp(0.75rem,1.4vw,1.1rem)] rounded overflow-hidden transition-all duration-300 ${i18n.language === 'pt' ? 'ring-2 ring-[var(--cyber-purple)] shadow-lg shadow-[var(--cyber-purple)]/30' : 'opacity-70 hover:opacity-100'}`}
                >
                  <div
                    className='absolute inset-0 bg-cover bg-center transition-all duration-300'
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23009c3b' width='1000' height='700'/%3E%3Cpolygon fill='%23ffdf00' points='500,80 920,350 500,620 80,350'/%3E%3Ccircle fill='%23002776' cx='500' cy='350' r='170'/%3E%3Cpath fill='white' d='M500,180 a170,170 0 1,0 0,340 a130,130 0 1,1 0,-340'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                <span className="uppercase text-[clamp(0.40rem,0.8vw,0.55rem)] font-bold tracking-wider">Português</span>
              </m.button>
            </Tooltip>
            <Tooltip content='Change language to English' position='bottom'>
              <m.button
                onClick={() => i18n.changeLanguage('en')}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-[clamp(0.2rem,0.5vw,0.4rem)] transition-all duration-300 ${i18n.language === 'en' ? 'text-[var(--cyber-cyan)]' : 'text-white/70 hover:text-white'}`}
                aria-label='English'
              >
                <div
                  className={`relative w-[clamp(1.2rem,2.2vw,1.8rem)] h-[clamp(0.75rem,1.4vw,1.1rem)] rounded overflow-hidden transition-all duration-300 ${i18n.language === 'en' ? 'ring-2 ring-[var(--cyber-cyan)] shadow-lg shadow-[var(--cyber-cyan)]/30' : 'opacity-70 hover:opacity-100'}`}
                >
                  <div
                    className='absolute inset-0 bg-cover bg-center transition-all duration-300'
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23bf0a30' width='1000' height='700'/%3E%3Cpath fill='white' d='M0,100 h1000 M0,200 h1000 M0,300 h1000 M0,400 h1000 M0,500 h1000 M0,600 h1000' stroke='white' stroke-width='50'/%3E%3Crect fill='%23002868' width='400' height='350'/%3E%3Cg fill='white'%3E%3Cpolygon points='50,30 53,45 68,45 56,54 60,69 50,60 40,69 44,54 32,45 47,45'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                <span className="uppercase text-[clamp(0.40rem,0.8vw,0.55rem)] font-bold tracking-wider">EN</span>
              </m.button>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
