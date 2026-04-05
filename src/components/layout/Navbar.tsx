import { memo, useCallback, useEffect, useState } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../constants';
import { useViewport } from '../../hooks/useViewport';
import { LinkAnimado } from '../atoms';
import DynamicText from '../atoms/DynamicText';

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

  // Tamanhos do logo responsivos
  const isWatch = screenWidth < 280;
  const isMobileSmall = screenWidth < 380;
  const isMobile = screenWidth < 640;

  const logoSize = isWatch
    ? 'h-10 w-10'
    : isMobileSmall
      ? 'h-12 w-12'
      : isMobile
        ? 'h-14 w-14'
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
    ? 'ml-12'
    : isMobileSmall
      ? 'ml-14'
      : isMobile
        ? 'ml-16'
        : 'ml-28 md:ml-36 lg:ml-44';

  return (
    <nav
      className='critical-navbar glass transition-all duration-300'
      style={{
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Logo Flutuante - Tamanho responsivo */}
      <Link
        to='/'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`absolute ${logoLeft} ${logoTop} z-[60] ${logoSize} pointer-events-auto logo-float block`}
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
            fetchPriority="high"
            decoding="sync"
          />
        </m.div>
      </Link>

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
                <span className='name-part' data-text={t('nav.brand_part1')}>
                  <div className='name-glow-layer' />
                  <DynamicText colorMode='auto'>{t('nav.brand_part1')}</DynamicText>
                </span>
                <span className='name-part name-accent' data-text={t('nav.brand_part2')}>
                  <div className='name-glow-layer' />
                  <DynamicText colorMode='auto'>{t('nav.brand_part2')}</DynamicText>
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
                    className={`navbar-link composited-hover py-1.5 px-1 md:px-1.5 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-[var(--cyber-cyan)] relative group/link ${isActive ? 'text-white active-menu-glow' : 'text-white/70'}`}
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
            className='text-white hover:text-[var(--cyber-cyan)] composited-hover transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center'
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
        className={`lg:hidden absolute top-full left-0 right-0 glass border-t border-white/10 transition-all duration-300 ease-out z-[999999] overflow-y-auto overflow-x-hidden ${toggle ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{
          maxHeight: toggle ? 'calc(100vh - 80px)' : '0',
          overscrollBehavior: 'contain',
          // No iPad Mini (768px), forçamos que o menu ocupe toda a largura visível e não seja obstruído
          // Ajuste de posicionamento para não sobrepor o GearButton flutuante
          // Para telas muito pequenas (watch) mantemos largura total e alinhamento à esquerda
          // Para dispositivos móveis até 640px usamos largura total para evitar sobreposição e garantir usabilidade
          // Em telas maiores posicionamos ao lado da engragem (aprox. 140px de deslocamento)
          // Responsivo: telas muito pequenas (watch) ocupam largura total sem deslocamento
          // Telas pequenas até md (mobileSmall, mobile, tablet) ocupam largura total abaixo da engrenagem
          // Telas maiores (lg+) posicionam ao lado da engrenagem com deslocamento de 140px
          // Responsivo: telas muito pequenas (watch) ocupam largura total sem deslocamento
          // Telas pequenas até md (mobileSmall, mobile) ocupam largura total abaixo da engrenagem
          // Telas maiores (lg+) posicionam ao lado da engrenagem com deslocamento de 140px
          left: isWatch ? '0' : (isMobileSmall || isMobile) ? '0' : '140px',
          width: isWatch ? '100vw' : (isMobileSmall || isMobile) ? '100vw' : 'calc(100vw - 140px)',
          maxWidth: isWatch ? 'none' : (isMobileSmall || isMobile) ? 'none' : '340px',
          backgroundColor: 'rgba(5, 8, 22, 0.95)',
        }}
      >
        <div className={`${isWatch ? 'px-3 py-4' : 'px-6 py-6'}`}>
          <ul className={`flex flex-col font-bold uppercase tracking-widest mb-4 ${isWatch ? 'gap-2 text-xs' : 'gap-3 md:gap-4 text-sm'}`}>
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <Link
                  to={getNavLink(nav.id)}
                  onClick={() => setToggle(false)}
                  className={`text-white/80 hover:text-white composited-hover transition-colors block py-2.5 min-h-[48px] flex items-center gap-3 px-2 rounded-xl active:bg-white/5 ${active === nav.id ? 'text-[var(--cyber-cyan)] font-bold border-l-2 border-[var(--cyber-cyan)] pl-4' : ''}`}
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
    </nav >
  );
});

export default Navbar;

