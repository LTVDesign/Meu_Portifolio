import { m, useScroll, useSpring } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { close, menu } from '../../assets';
import { navLinks } from '../../constants';
import { LinkAnimado } from '../atoms';

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
      rootMargin: '-180px 0px -20% 0px',
      threshold: 0,
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
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
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
        className="absolute left-2 md:left-6 top-2 z-[60] h-32 w-32 md:h-40 md:w-40 pointer-events-none"
        style={{ minHeight: '128px', minWidth: '128px' }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(145,94,255,0.8)]"
          loading="eager"
          width="128"
          height="128"
        />
      </m.div>
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/5 overflow-hidden">
        <m.div
          className="h-full bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] origin-left shadow-[0_0_20px_rgba(0,255,255,0.8)] relative overflow-hidden"
          style={{ scaleX }}
        >
          {/* Shine effect that moves left to right */}
          <div className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shine-anim" />
        </m.div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between ml-28 md:ml-44">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 md:gap-4 group relative"
          aria-label={t('nav.logo')}
        >
          <span className="hidden xs:inline text-4xl md:text-5xl font-black navbar-brand-text uppercase tracking-tighter">
            Leandro <span className="text-[var(--cyber-cyan)]">Barbosa</span>
          </span>
        </Link>

        {/* Desktop Menu with specific glows */}
        <ul className="hidden sm:flex items-center gap-6 lg:gap-10">
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
                  className={`navbar-link py-2 px-1 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-[var(--cyber-cyan)] ${isActive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-white/80'}`}
                >
                  {t(`nav.${nav.id}`)}
                </LinkAnimado>

                {/* Underline for active/hover focus */}
                <m.div
                  className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--cyber-cyan)] rounded-full shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-500 overflow-hidden ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                >
                  <div className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 shine-anim" />
                </m.div>
              </li>
            );
          })}
        </ul>

        {/* Language Selector */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => i18n.changeLanguage('pt')}
            aria-label={t('nav.switch_to_pt')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${i18n.language === 'pt'
              ? 'bg-[var(--cyber-purple)] text-white shadow-[0_0_15px_rgba(145,94,255,0.5)]'
              : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            PT
          </button>
          <button
            onClick={() => i18n.changeLanguage('en')}
            aria-label={t('nav.switch_to_en')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${i18n.language === 'en'
              ? 'bg-[var(--cyber-cyan)] text-white shadow-[0_0_15px_rgba(0,255,255,0.5)]'
              : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            EN
          </button>
        </div>

        <button
          onClick={() => setToggle(!toggle)}
          className="sm:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
          aria-label={toggle ? t('nav.menu_close') : t('nav.menu_open')}
        >
          <img src={toggle ? close : menu} alt="" className="h-6 w-6" />
        </button>
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
                {t(`nav.${nav.id}`)}
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
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${i18n.language === 'pt'
              ? 'bg-[var(--cyber-purple)] text-white shadow-[0_0_15px_rgba(145,94,255,0.5)]'
              : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            PT
          </button>
          <button
            onClick={() => {
              i18n.changeLanguage('en');
              setToggle(false);
            }}
            aria-label={t('nav.switch_to_en')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${i18n.language === 'en'
              ? 'bg-[var(--cyber-cyan)] text-white shadow-[0_0_15px_rgba(0,255,255,0.5)]'
              : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;