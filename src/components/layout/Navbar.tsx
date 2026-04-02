import { m, useScroll, useSpring } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../constants';
import { LinkAnimado } from '../atoms';
import DynamicText from '../atoms/DynamicText';

// Logo da raiz (public) - servido estaticamente
const logo = '/logo.svg';

const Navbar = memo(() => {
  const [active, setActive] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t, i18n } = useTranslation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Detectar tamanho da tela para ajustes responsivos
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fechar menu ao redimensionar para desktop (LG breakpoint = 1024px)
  useEffect(() => {
    if (screenWidth >= 1024 && toggle) {
      setToggle(false);
    }
  }, [screenWidth, toggle]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -40% 0px',
      threshold: 0.05,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActive(sectionId);
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
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActive(id);
        setToggle(false);
        window.history.pushState(null, '', `#${id}`);
      }
    } else {
      setToggle(false);
    }
  };

  const getNavLink = (navId: string) => {
    if (navId === 'curriculo') {
      return '/formacao';
    }
    if (navId === 'doom') {
      return '/doom';
    }
    if (isHome) {
      return `#${navId}`;
    }
    const routeMap: Record<string, string> = {
      about: '/#about',
      formacao: '/formacao',
      experience: '/#experience',
      cursos: '/cursos',
      works: '/projetos',
      contact: '/contato',
    };
    return routeMap[navId] || '/';
  };

  // Tamanhos do logo responsivos
  const isWatch = screenWidth < 280;
  const isMobileSmall = screenWidth < 380;
  const isMobile = screenWidth < 640;

  const logoSize = isWatch
    ? 'h-14 w-14'
    : isMobileSmall
    ? 'h-20 w-20'
    : isMobile
    ? 'h-24 w-24'
    : 'h-32 w-32 md:h-40 md:w-40';

  const logoLeft = isWatch
    ? 'left-1'
    : isMobileSmall
    ? 'left-1'
    : isMobile
    ? 'left-2'
    : 'left-2 md:left-6';

  const logoTop = isWatch ? 'top-1' : 'top-2';

  const brandMargin = isWatch
    ? 'ml-16'
    : isMobileSmall
    ? 'ml-20'
    : isMobile
    ? 'ml-24'
    : 'ml-28 md:ml-36 lg:ml-44';

  return (
    <nav
      className='critical-navbar glass transition-all duration-300'
      style={{
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Logo Flutuante - Tamanho responsivo */}
      <m.div
        initial={{ scale: 0, y: -20 }}
        animate={{
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          scale: { duration: 0.5 },
          y: {
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
        className={`absolute ${logoLeft} ${logoTop} z-[60] ${logoSize} pointer-events-none logo-float`}
      >
        <img
          src={logo}
          alt={t('nav.logoAlt')}
          className='w-full h-full object-contain drop-shadow-[0_0_20px_rgba(145,94,255,0.8)]'
          width='128'
          height='128'
        />
      </m.div>

      {/* Progress Line */}
      <div className='absolute bottom-0 left-0 h-[3px] sm:h-[4px] w-full bg-white/10 overflow-hidden'>
        <m.div
          className='h-full bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] origin-left shadow-[0_0_20px_rgba(0,255,255,0.8)] relative overflow-hidden'
          style={{ scaleX }}
        >
          <div className='absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shine-anim' />
        </m.div>
      </div>

      <div
        className={`max-w-screen-2xl mx-auto flex items-center justify-between gap-2 sm:gap-4
          ${isWatch ? 'px-2 py-1' : isMobile ? 'px-3 py-2' : 'px-6 md:px-12 lg:px-16 py-3'}`}
      >
        {/* Left side: Brand and Tagline */}
        <div className={`flex items-center gap-2 sm:gap-6 ${brandMargin}`}>
          <Link
            to='/'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='flex items-center gap-2 md:gap-3 group relative'
            aria-label={t('nav.logo')}
          >
            <span className='navbar-brand-text'>
              <span
                className='cyber-name'
                style={{
                  fontSize: isWatch
                    ? 'clamp(0.7rem, 3vw, 0.9rem)'
                    : isMobileSmall
                    ? 'clamp(0.85rem, 4vw, 1.1rem)'
                    : undefined,
                  gap: isWatch ? '0.2rem' : undefined,
                }}
              >
                <span className='name-part' data-text='Leandro'>
                  <DynamicText colorMode='auto'>Leandro</DynamicText>
                </span>
                <span className='name-part name-accent' data-text='Barbosa'>
                  <DynamicText colorMode='auto'>Barbosa</DynamicText>
                </span>
              </span>
            </span>
          </Link>
        </div>

        {/* Right aligned Menu - Desktop/Tablet - Ajustado para aparecer apenas em telas maiores que iPad Air */}
        <div className='hidden lg:flex items-center gap-3 lg:gap-6'>
          <ul className='flex items-center gap-1 lg:gap-2 xl:gap-3'>
            {navLinks.map((nav) => {
              const isActive = active === nav.id;
              return (
                <li key={nav.id} className='relative group'>
                  <LinkAnimado
                    href={getNavLink(nav.id)}
                    onClick={(e) => {
                      if (isHome && nav.id !== 'curriculo') {
                        handleNavClick(e, nav.id);
                      } else {
                        setToggle(false);
                      }
                    }}
                    className={`navbar-link py-1.5 px-1.5 md:px-2 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-[var(--cyber-cyan)] menu-glow relative group/link ${isActive ? 'text-white active-menu' : 'text-white/70'}`}
                  >
                    <DynamicText colorMode='auto'>{t(`nav.${nav.id}`)}</DynamicText>
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
          </div>
        </div>

        {/* Mobile Toggle - Agora aparece em telas menores que LG (iPad Air incluso) */}
        <div className='lg:hidden flex items-center'>
          <button
            onClick={() => setToggle(!toggle)}
            className='text-white hover:text-[var(--cyber-cyan)] transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center'
            aria-label={toggle ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={toggle}
          >
            <div className={`flex flex-col justify-between items-end ${isWatch ? 'w-4 h-3.5' : 'w-6 h-5'}`}>
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${toggle ? 'w-full translate-y-[7px] -rotate-45' : 'w-full'} ${isWatch ? 'h-px' : ''}`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${toggle ? 'opacity-0' : isWatch ? 'w-3' : 'w-4'} ${isWatch ? 'h-px' : ''}`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${toggle ? 'w-full -translate-y-[7px] rotate-45' : isWatch ? 'w-3.5' : 'w-5'} ${isWatch ? 'h-px' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content - Ajustado para iPad e Mobile com scroll interno */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 glass border-t border-white/10 transition-all duration-300 z-[999999] overflow-y-auto overflow-x-hidden ${toggle ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'}`}
        style={{ 
          maxHeight: toggle ? 'calc(100vh - 80px)' : '0',
          overscrollBehavior: 'contain',
          // No iPad Mini (768px), forçamos que o menu ocupe toda a largura visível e não seja obstruído
          width: '100vw',
          backgroundColor: 'rgba(5, 8, 22, 0.95)'
        }}
      >
        <div className={`${isWatch ? 'px-3 py-4' : 'px-6 py-6'}`}>
          <ul className={`flex flex-col font-bold uppercase tracking-widest mb-4 ${isWatch ? 'gap-3 text-xs' : 'gap-4 md:gap-6 text-sm'}`}>
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <Link
                  to={getNavLink(nav.id)}
                  onClick={() => setToggle(false)}
                  className='text-white/80 hover:text-white transition-colors block py-2 min-h-[44px] flex items-center'
                >
                  <DynamicText colorMode='auto'>{t(`nav.${nav.id}`)}</DynamicText>
                </Link>
              </li>
            ))}
          </ul>
          <div className={`flex items-center justify-center gap-4 border-t border-white/10 ${isWatch ? 'pt-3' : 'pt-4'}`}>
            <button
              onClick={() => {
                i18n.changeLanguage('pt');
                setToggle(false);
              }}
              className={`relative rounded overflow-hidden min-w-[44px] min-h-[44px] flex items-center justify-center ${isWatch ? 'w-8 h-5' : 'w-10 h-6'}`}
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
              className={`relative rounded overflow-hidden min-w-[44px] min-h-[44px] flex items-center justify-center ${isWatch ? 'w-8 h-5' : 'w-10 h-6'}`}
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
    </nav>
  );
});

export default Navbar;
