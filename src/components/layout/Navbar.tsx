import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { close, logo, menu } from '../../assets';
import { navLinks } from '../../constants';

import { styles } from '../../constants/styles';
import { LinkAnimado } from '../atoms';

const Navbar = memo(() => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Threshold para reduzir atualizações

    const updateScrollState = () => {
      const scrollTop = window.scrollY;

      // Otimização: só atualiza se a diferença for significativa
      if (Math.abs(scrollTop - lastScrollTop) < scrollThreshold && ticking) {
        ticking = false;
        return;
      }

      lastScrollTop = scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive('');
      }

      // Otimização: Navbar highlighter com throttle
      const sections = document.querySelectorAll('section[id]');
      for (const current of sections) {
        const sectionId = current.getAttribute('id');
        const el = current as HTMLElement;
        const sectionHeight = el.offsetHeight;
        const sectionTop = current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          if (active !== sectionId) {
            setActive(sectionId);
          }
          break; // Sai do loop quando encontra a seção ativa
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Usa passive listener para melhor performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [active]);

  return (
    <nav
      className={`${
        styles.paddingX
      } fixed top-0 z-20 flex w-full items-center py-[clamp(0.5rem,2vh,1.5rem)] will-change-[background-color] ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      {/* Horizontal Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#915EFF33] via-[#915EFF] to-[#915EFF] relative overflow-hidden ring-1 ring-[#915EFF]/20"
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }}
        >
          {/* Scanning Light Effect for Progress Bar */}
          <motion.div
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"
            animate={{
              left: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {/* End-point Bead Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[8px] h-full bg-white shadow-[0_0_15px_#fff,0_0_5px_#915EFF]" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex w-full items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-[clamp(0.5rem,2vw,1rem)] max-w-[70vw] sm:max-w-none hover:scale-105 transition-transform duration-500"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="h-[clamp(40px,8vw,80px)] w-[clamp(40px,8vw,80px)] object-contain drop-shadow-[0_0_15px_rgba(145,94,255,0.5)]"
          />
          <p className="hidden text-[clamp(14px,2vw,22px)] font-bold text-white xs:block tracking-tight ml-2">
            Leandro
          </p>
        </Link>

        <ul className="hidden list-none flex-row gap-6 lg:gap-8 sm:flex">
          {navLinks.map((nav) => {
            const isSectionActive = active === nav.id;
            return (
              <li
                key={nav.id}
                className="relative cursor-pointer text-[18px] font-medium transition-all duration-300"
              >
                <LinkAnimado
                  href={`#${nav.id}`}
                  className={`${
                    isSectionActive
                      ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110'
                      : 'text-[var(--dynamic-text-secondary)] hover:text-white'
                  } transition-all duration-300 block pb-1 text-[16px] lg:text-[18px]`}
                >
                  {nav.title}
                </LinkAnimado>

                {isSectionActive && (
                  <>
                    {/* Primary Underline with Gradient and Layout Transition */}
                    <motion.div
                      layoutId="active-nav-desktop"
                      className="absolute bottom-[-4px] left-0 right-0 h-[3px] bg-gradient-to-r from-[#915EFF33] via-[#915EFF] to-[#915EFF] rounded-full z-10 shadow-[0_0_15px_#915EFF] overflow-hidden"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    >
                      {/* Scanning Light Effect for Active Underline */}
                      <motion.div
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent z-20"
                        animate={{
                          left: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </motion.div>
                    
                    {/* Projected Glow / Spotlight that slides with the link */}
                    <motion.div
                      layoutId="active-nav-desktop-glow"
                      className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-24 h-12 bg-[#915EFF]/20 blur-[20px] rounded-full pointer-events-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  </>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <button
            type="button"
            className="flex items-center justify-center focus:outline-none p-2"
            onClick={() => setToggle(!toggle)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setToggle(!toggle);
              }
            }}
          >
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="h-[clamp(24px,5vw,32px)] w-[clamp(24px,5vw,32px)] object-contain"
            />
          </button>

          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[200px] rounded-2xl p-6 border border-white/10 shadow-3xl animate-in fade-in zoom-in duration-300`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-5">
              {navLinks.map((nav) => {
                const isSectionActive = active === nav.id;
                return (
                  <li
                    key={nav.id}
                    className="relative w-full group"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setToggle(!toggle);
                    }}
                  >
                    <LinkAnimado
                      href={`#${nav.id}`}
                      className={`font-poppins cursor-pointer text-[18px] font-semibold transition-all duration-300 block py-2 ${
                        isSectionActive
                          ? 'text-[#915EFF] ml-4'
                          : 'text-[var(--dynamic-text-secondary)] hover:text-white'
                      }`}
                    >
                      {nav.title}
                    </LinkAnimado>

                    {isSectionActive && (
                      <>
                        {/* Mobile Side Indicator with Gradient and Scanning Light */}
                        <motion.div
                          layoutId="active-nav-mobile"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-[#915EFF33] via-[#915EFF] to-[#915EFF] rounded-full z-10 shadow-[0_0_10px_#915EFF] overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          <motion.div
                            className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-white/40 to-transparent z-40"
                            animate={{
                              top: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                        </motion.div>
                        {/* Mobile Side Glow */}
                        <motion.div
                          layoutId="active-nav-mobile-glow"
                          className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-6 h-12 bg-[#915EFF]/15 blur-[12px] rounded-full pointer-events-none"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                            scale: [0.8, 1.3, 0.8],
                          }}
                          transition={{
                            opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                            layout: { type: 'spring', stiffness: 300, damping: 30 },
                          }}
                        />
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
