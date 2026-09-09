import { m, useScroll, useSpring } from 'framer-motion';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useViewport } from '../../hooks/useViewport';

const navItems = [
  { id: 'work', label: 'Work', href: '/#works' },
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];

const Navbar = memo(() => {
  const [toggle, setToggle] = useState(false);
  const { width: screenWidth } = useViewport();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (screenWidth >= 1024 && toggle) setToggle(false);
  }, [screenWidth, toggle]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (isHome && href.startsWith('/#')) {
        const id = href.replace('/#', '');
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${id}`);
          }
        });
      }
      setToggle(false);
    },
    [isHome]
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        {/* Progress bar */}
        <div className='absolute bottom-0 left-0 h-[1px] w-full'>
          <m.div
            className='h-full bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)] origin-left'
            style={{ scaleX }}
          />
        </div>

        <div className='max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4'>
          {/* Logo */}
          <Link
            to='/'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='relative z-10'
            aria-label={t('nav.logo')}
          >
            <m.span
              className='text-[clamp(1rem,2vw,1.25rem)] font-bold text-white tracking-tight'
              whileHover={{ scale: 1.02 }}
            >
              <span className='text-white'>leo</span>
              <span className='text-[var(--cyber-cyan)]'>dev</span>
            </m.span>
          </Link>

          {/* Desktop nav - minimal */}
          <div className='hidden lg:flex items-center gap-1'>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className='relative px-4 py-2 text-[clamp(0.75rem,1.2vw,0.875rem)] text-white/50 hover:text-white transition-colors duration-300 group'
              >
                {item.label}
                <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--cyber-cyan)] group-hover:w-3/4 transition-all duration-300' />
              </a>
            ))}

            {/* Divider */}
            <div className='w-px h-4 bg-white/10 mx-2' />

            {/* Language toggle */}
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')}
              className='px-3 py-1.5 text-[11px] text-white/40 hover:text-white/80 uppercase tracking-[0.15em] font-medium transition-colors duration-300 border border-white/10 rounded-full hover:border-white/20'
              aria-label='Toggle language'
            >
              {i18n.language === 'pt' ? 'EN' : 'PT'}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setToggle(!toggle)}
            className='lg:hidden relative z-10 p-2 text-white/70 hover:text-white transition-colors'
            aria-label='Toggle menu'
          >
            {toggle ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {toggle && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[999] bg-black/95 backdrop-blur-2xl lg:hidden'
        >
          <div className='flex flex-col items-center justify-center h-full gap-8'>
            {navItems.map((item, i) => (
              <m.a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className='text-[clamp(1.5rem,5vw,2rem)] text-white/70 hover:text-white font-light tracking-wide transition-colors'
              >
                {item.label}
              </m.a>
            ))}

            <div className='flex gap-4 mt-4'>
              <button
                onClick={() => {
                  i18n.changeLanguage('pt');
                  setToggle(false);
                }}
                className={`px-4 py-2 text-sm rounded-full border transition-all ${
                  i18n.language === 'pt'
                    ? 'border-[var(--cyber-cyan)] text-[var(--cyber-cyan)]'
                    : 'border-white/20 text-white/50'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => {
                  i18n.changeLanguage('en');
                  setToggle(false);
                }}
                className={`px-4 py-2 text-sm rounded-full border transition-all ${
                  i18n.language === 'en'
                    ? 'border-[var(--cyber-cyan)] text-[var(--cyber-cyan)]'
                    : 'border-white/20 text-white/50'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </m.div>
      )}
    </>
  );
});

export default Navbar;
