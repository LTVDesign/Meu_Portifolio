import { m, useScroll, useSpring } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { close, logo, menu } from '../../assets';
import { navLinks } from '../../constants';
import { LinkAnimado } from '../atoms';

const Navbar = memo(() => {
  const [active, setActive] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 80);

      const sections = document.querySelectorAll('section[id]');
      for (const section of Array.from(sections)) {
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
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActive(id);
      setToggle(false);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 glass transition-all duration-300 ${scrolled ? 'shadow-2xl' : ''}`}
    >
      {/* Heavy Neon Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/5 overflow-hidden">
        <m.div
          className="h-full bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] origin-left shadow-[0_0_20px_rgba(0,255,255,0.8)]"
          style={{ scaleX }}
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 md:gap-4 group"
        >
          <m.img
            src={logo}
            alt="Logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-12 w-12 md:h-14 md:w-14 object-contain transition-transform group-hover:scale-110 drop-shadow-[0_0_15px_rgba(145,94,255,0.6)]"
          />
          <span className="hidden xs:inline text-2xl md:text-3xl font-black navbar-brand-text uppercase tracking-tighter">
            Leandro
          </span>
        </Link>

        {/* Desktop Menu with specific glows */}
        <ul className="hidden sm:flex items-center gap-6 lg:gap-10">
          {navLinks.map((nav) => {
            const isActive = active === nav.id;

            return (
              <li key={nav.id} className="relative group">
                <LinkAnimado
                  href={nav.id === 'curriculo' ? '/formacao' : `#${nav.id}`}
                  onClick={(e) => {
                    if (nav.id !== 'curriculo') handleNavClick(e, nav.id);
                  }}
                  className={`navbar-link py-2 px-1 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-[var(--cyber-cyan)] ${isActive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-white/60'}`}
                >
                  {nav.title}
                </LinkAnimado>
                
                {/* Underline for active/hover focus */}
                <m.div 
                  className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--cyber-cyan)] rounded-full shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                />
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setToggle(!toggle)}
          className="sm:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
        >
          <img src={toggle ? close : menu} alt="" className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden absolute top-full left-0 right-0 glass border-t border-white/10 px-6 py-8 transition-all duration-300 ${toggle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'}`}>
        <ul className="flex flex-col gap-6 font-bold uppercase tracking-widest text-sm">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <Link
                to={nav.id === 'curriculo' ? '/formacao' : `#${nav.id}`}
                onClick={() => setToggle(false)}
                className="text-white/70 hover:text-white transition-colors block"
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