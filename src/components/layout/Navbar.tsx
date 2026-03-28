import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { close, logo, menu } from '../../assets';
import { navLinks } from '../../constants';
import { config } from '../../constants/config';
import { styles } from '../../constants/styles';
import { LinkAnimado } from '../atoms';

const Navbar = memo(() => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive('');
      }

      // Navbar highlighter
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((current) => {
        const sectionId = current.getAttribute('id');
        const el = current as HTMLElement;
        const sectionHeight = el.offsetHeight;
        const sectionTop = current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } fixed top-0 z-20 flex w-full items-center py-6 will-change-[background-color] ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-[#915EFF] transition-all duration-150 ease-out z-30"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="flex w-full items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 max-w-[70vw] sm:max-w-none"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="h-16 w-16 object-contain sm:h-24 sm:w-24" />
          <p className="flex text-[16px] font-bold text-[var(--dynamic-text-color)] sm:text-[24px] truncate transition-colors duration-500">
            {config.html.title}
          </p>
        </Link>

        <ul className="hidden list-none flex-row gap-14 sm:flex">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id
                  ? 'text-[var(--dynamic-text-color)]'
                  : 'text-[var(--dynamic-text-secondary)]'
              } cursor-pointer text-[18px] font-medium hover:text-[var(--dynamic-text-color)] relative transition-colors duration-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#915EFF] after:transform after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100`}
            >
              <LinkAnimado href={`#${nav.id}`}>{nav.title}</LinkAnimado>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <button
            type="button"
            className="flex items-center justify-center focus:outline-none"
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
              className="h-[28px] w-[28px] object-contain"
            />
          </button>

          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[180px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] font-medium ${
                    active === nav.id
                      ? 'text-[var(--dynamic-text-color)]'
                      : 'text-[var(--dynamic-text-secondary)]'
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setToggle(!toggle);
                  }}
                >
                  <LinkAnimado href={`#${nav.id}`}>{nav.title}</LinkAnimado>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
