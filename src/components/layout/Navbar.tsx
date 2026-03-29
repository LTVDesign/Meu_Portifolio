import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { close, logo, menu } from '../../assets';
import { navLinks } from '../../constants';
import { LinkAnimado } from '../atoms';

const Navbar = memo(() => {
  const [active, setActive] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [_scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const update = () => {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < 20) return;

      lastScrollY = scrollY;

      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? (scrollY / height) * 100 : 0);
      setScrolled(scrollY > 80);

      const sections = document.querySelectorAll('section[id]');
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) {
          setActive(section.getAttribute('id'));
          break;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed top-0 left-0 right-0 z-50 glass transition-all duration-300 ${
        scrolled ? 'shadow-2xl' : ''
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)] rounded-2xl"
          aria-label="Voltar ao topo - Leandro Saturnino Barbosa"
        >
          <img
            src={logo}
            alt="Logo Leandro Saturnino Barbosa"
            className="h-12 w-12 md:h-14 md:w-14 transition-transform group-hover:scale-110 drop-shadow-[0_0_20px_var(--cyber-purple)]"
          />
          <span className="hidden xs:inline text-2xl md:text-3xl font-bold tracking-tighter text-white">
            Leandro
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <ul className="hidden sm:flex items-center gap-8 lg:gap-10">
          {navLinks.map((nav) => {
            const isActive = active === nav.id;
            return (
              <li key={nav.id} className="relative">
                <LinkAnimado
                  href={`#${nav.id}`}
                  className={`navbar-link ${isActive ? 'text-white scale-105' : 'text-white/80 hover:text-white'}`}
                >
                  {nav.title}
                </LinkAnimado>
                {isActive && (
                  <motion.div
                    layoutId="active-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-glow)] rounded-full"
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* MENU MOBILE */}
        <button
          type="button"
          aria-expanded={toggle}
          aria-controls="mobile-menu"
          aria-label={toggle ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setToggle(!toggle)}
          className="sm:hidden w-12 h-12 rounded-3xl hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)]"
        >
          <img src={toggle ? close : menu} alt="" className="h-8 w-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`sm:hidden absolute top-full left-0 right-0 glass border-t border-white/10 px-6 py-8 transition-all ${toggle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        <ul className="flex flex-col gap-6 text-lg">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <Link
                to={`#${nav.id}`}
                onClick={() => setToggle(false)}
                className="block py-3 px-4 text-white/90 hover:text-white rounded-2xl focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)]"
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
