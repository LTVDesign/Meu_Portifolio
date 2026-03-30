import { m, useScroll, useSpring } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logo } from '../../assets';
import { navLinks } from '../../constants';
import { LinkAnimado } from '../atoms';
import DynamicText from '../atoms/DynamicText';

const Navbar = memo(() => {
  const [active, setActive] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t, i18n } = useTranslation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Scroll state for navbar glass effect
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    // IntersectionObserver for active section detection (Reflow-free)
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -50% 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (!isHome) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (isHome) {
      // Small delay to ensure sections are rendered
      const timer = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));
      }, 100);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', onScroll);
        observer.disconnect();
      };
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [isHome]);


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
      'about': '/',
      'formacao': '/formacao',
      'experiencia': '/',
      'cursos': '/cursos',
      'projects': '/projetos',
      'contact': '/contato',
    };
    return routeMap[navId] || '/';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 glass transition-all duration-300 ${scrolled ? 'shadow-2xl' : ''}`}
    >
      {/* Logo Flutuante Maior - com dimensões fixas para evitar CLS */}
      <m.div
        initial={{ scale: 0, y: -20 }}
        animate={{
          scale: 1,
          y: [0, -10, 0]
        }}
        transition={{
          scale: { duration: 0.5 },
          y: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
        className="absolute left-2 md:left-6 top-2 z-[60] h-32 w-32 md:h-40 md:w-40 pointer-events-none logo-float"
        style={{ minHeight: '128px', minWidth: '128px' }}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(145,94,255,0.8)]"
          loading="eager"
          width="128"
          height="128"
        />
      </m.div>

      {/* Progress Line with shine animation */}
      <div className="absolute bottom-0 left-0 h-[4px] w-full bg-white/10 overflow-hidden">
        <m.div
          className="h-full bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] origin-left shadow-[0_0_20px_rgba(0,255,255,0.8)] relative overflow-hidden"
          style={{ scaleX }}
        >
          {/* Shine effect that moves left to right */}
          <div className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shine-anim" />
        </m.div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between ml-20 md:ml-36">
        {/* Animated Name with Cyberpunk Style */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 md:gap-3 group relative"
          aria-label={t('nav.logo')}
        >
          <span className="hidden xs:inline navbar-brand-text">
            <span className="cyber-name">
              <span className="name-part" data-text="Leandro">
                <DynamicText colorMode="auto">Leandro</DynamicText>
              </span>
              <span className="name-part name-accent" data-text="Barbosa">
                <DynamicText colorMode="auto">Barbosa</DynamicText>
              </span>
            </span>
          </span>
        </Link>

        {/* Desktop Menu with specific glows */}
        <ul className="hidden sm:flex items-center gap-2 lg:gap-3">
          {navLinks.map((nav) => {
            const isActive = active === nav.id;

            return (
              <li key={nav.id} className="relative group">
                <LinkAnimado
                  href={getNavLink(nav.id)}
                  onClick={(e) => {
                    if (isHome && nav.id !== 'curriculo') {
                      handleNavClick(e, nav.id);
                    } else {
                      setToggle(false);
                    }
                  }}
                  className={`navbar-link py-2 px-1 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-[var(--cyber-cyan)] menu-glow ${isActive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] active-menu' : 'text-white/80'}`}
                >
                  <DynamicText colorMode="auto">{t(`nav.${nav.id}`)}</DynamicText>
                </LinkAnimado>

                {/* Underline for active/hover focus with shine */}
                <m.div
                  className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--cyber-cyan)] rounded-full shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-500 overflow-hidden ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                >
                  <div className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shine-anim" />
                </m.div>
              </li>
            );
          })}
        </ul>

        {/* Language Selector - Right side */}
        <div className="hidden sm:flex items-center gap-2">
          {/* PT Button */}
          <button
            onClick={() => i18n.changeLanguage('pt')}
            aria-label={t('nav.switch_to_pt')}
            className={`group relative px-3 py-1.5 text-sm font-extrabold uppercase tracking-wider rounded-lg transition-all overflow-hidden ${i18n.language === 'pt'
              ? 'bg-[var(--cyber-purple)] text-white shadow-[0_0_15px_rgba(145,94,255,0.5)]'
              : 'bg-white/10 text-white hover:text-white hover:bg-white/20'
              }`}
          >
            {/* Brazilian flag background */}
            <div
              className="absolute inset-0 opacity-70 bg-cover bg-center rounded-lg group-hover:opacity-90 transition-opacity"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23009c3b' width='1000' height='700'/%3E%3Cpolygon fill='%23ffdf00' points='500,80 920,350 500,620 80,350'/%3E%3Ccircle fill='%23002776' cx='500' cy='350' r='170'/%3E%3Cpath fill='white' d='M500,180 a170,170 0 1,0 0,340 a130,130 0 1,1 0,-340'/%3E%3C/svg%3E")`
              }}
            />
            <span className="relative z-10">PT</span>
            {/* Hover tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none">
              {t('nav.translate_to_pt')}
            </span>
          </button>

          {/* EN Button */}
          <button
            onClick={() => i18n.changeLanguage('en')}
            aria-label={t('nav.switch_to_en')}
            className={`group relative px-3 py-1.5 text-sm font-extrabold uppercase tracking-wider rounded-lg transition-all overflow-hidden ${i18n.language === 'en'
              ? 'bg-[var(--cyber-cyan)] text-white shadow-[0_0_15px_rgba(0,255,255,0.5)]'
              : 'bg-white/10 text-white hover:text-white hover:bg-white/20'
              }`}
          >
            {/* US flag background */}
            <div
              className="absolute inset-0 opacity-70 bg-cover bg-center rounded-lg group-hover:opacity-90 transition-opacity"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23bf0a30' width='1000' height='700'/%3E%3Cpath fill='white' d='M0,100 h1000 M0,200 h1000 M0,300 h1000 M0,400 h1000 M0,500 h1000 M0,600 h1000' stroke='white' stroke-width='50'/%3E%3Crect fill='%23002868' width='400' height='350'/%3E%3Cg fill='white'%3E%3Cpolygon points='50,30 53,45 68,45 56,54 60,69 50,60 40,69 44,54 32,45 47,45'/%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            <span className="relative z-10">EN</span>
            {/* Hover tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none">
              {t('nav.translate_to_en')}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden absolute top-full left-0 right-0 glass border-t border-white/10 px-6 py-8 transition-all duration-300 ${toggle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'}`}>
        <ul className="flex flex-col gap-6 font-bold uppercase tracking-widest text-sm mb-6">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <Link
                to={getNavLink(nav.id)}
                onClick={() => setToggle(false)}
                className="text-white/80 hover:text-white transition-colors block"
              >
                <DynamicText colorMode="auto">{t(`nav.${nav.id}`)}</DynamicText>
              </Link>
            </li>
          ))}
        </ul>
        {/* Language Selector Mobile */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              i18n.changeLanguage('pt');
              setToggle(false);
            }}
            aria-label={t('nav.switch_to_pt')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all relative overflow-hidden ${i18n.language === 'pt'
              ? 'bg-[var(--cyber-purple)] text-white shadow-[0_0_15px_rgba(145,94,255,0.5)]'
              : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            <div
              className="absolute inset-0 opacity-10 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23009c3b' width='1000' height='700'/%3E%3Cpolygon fill='%23ffdf00' points='500,80 920,350 500,620 80,350'/%3E%3Ccircle fill='%23002776' cx='500' cy='350' r='170'/%3E%3Cpath fill='white' d='M500,180 a170,170 0 1,0 0,340 a130,130 0 1,1 0,-340'/%3E%3C/svg%3E")`
              }}
            />
            <span className="relative z-10"><DynamicText colorMode="auto">PT</DynamicText></span>
          </button>
          <button
            onClick={() => {
              i18n.changeLanguage('en');
              setToggle(false);
            }}
            aria-label={t('nav.switch_to_en')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all relative overflow-hidden ${i18n.language === 'en'
              ? 'bg-[var(--cyber-cyan)] text-white shadow-[0_0_15px_rgba(0,255,255,0.5)]'
              : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            <div
              className="absolute inset-0 opacity-10 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 700'%3E%3Crect fill='%23bf0a30' width='1000' height='700'/%3E%3Cpath fill='white' d='M0,100 h1000 M0,200 h1000 M0,300 h1000 M0,400 h1000 M0,500 h1000 M0,600 h1000' stroke='white' stroke-width='50'/%3E%3Crect fill='%23002868' width='400' height='350'/%3E%3Cg fill='white'%3E%3Cpolygon points='50,30 53,45 68,45 56,54 60,69 50,60 40,69 44,54 32,45 47,45'/%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            <span className="relative z-10"><DynamicText colorMode="auto">EN</DynamicText></span>
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;