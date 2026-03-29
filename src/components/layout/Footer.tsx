import { motion } from 'framer-motion';
import type React from 'react';
import {
  FaArrowUp,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navLinks } from '../../constants';
import { config } from '../../constants/config';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useTranslation();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const getNavLink = (navId: string) => {
    if (navId === 'curriculo') {
      return '/formacao';
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

  const socialLinks = [
    {
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/leleltv',
      label: 'LinkedIn',
      color: 'hover:text-[#0077b5]',
    },
    {
      icon: FaGithub,
      url: 'https://github.com/lelebrr',
      label: 'GitHub',
      color: 'hover:text-white',
    },
    {
      icon: FaInstagram,
      url: 'http://instagram.com/lelebrr',
      label: 'Instagram',
      color: 'hover:text-[#e1306c]',
    },
    {
      icon: FaFacebook,
      url: 'https://www.facebook.com/lelebrr',
      label: 'Facebook',
      color: 'hover:text-[#1877f2]',
    },
    { icon: FaWhatsapp, url: '#', label: 'WhatsApp', color: 'hover:text-[#25d366]' },
  ];

  return (
    <footer className="relative mt-8 pt-12 pb-10 overflow-hidden" role="contentinfo" style={{ minHeight: '200px' }}>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#915EFF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-start text-center">
          {/* Coluna 1 */}
          <div className="flex flex-col items-center text-center max-w-sm">
            <h2 className="text-[clamp(1.2rem,4vw,1.5rem)] font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-4">
              {config.html.fullName}
            </h2>
            <p className="text-[var(--dynamic-text-secondary)] text-[clamp(0.8rem,2vw,0.9rem)] leading-relaxed">
              Especialista em TI, Infraestrutura e Segurança, transformando dados em inteligência e
              sistemas em plataformas ultra-performativas.
            </p>
          </div>

          {/* Coluna 2 - Acesso Rápido */}
          <div className="flex flex-col items-center text-center max-w-sm">
            <h3 className="text-[clamp(0.7rem,2vw,0.85rem)] font-bold uppercase tracking-widest text-[var(--cyber-purple)] mb-6">
              {t('footer.quickAccess')}
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 justify-items-center">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={getNavLink(link.id)}
                    onClick={() => {
                      if (isHome && link.id !== 'curriculo') {
                        const element = document.getElementById(link.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="text-[var(--dynamic-text-secondary)] hover:text-white text-[clamp(0.8rem,2vw,0.9rem)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)] rounded-xl px-3 py-1"
                  >
                    {t(`nav.${link.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Contato */}
          <div className="flex flex-col items-center text-center max-w-sm">
            <h3 className="text-[clamp(0.7rem,2vw,0.85rem)] font-bold uppercase tracking-widest text-[var(--cyber-purple)] mb-6">
              {t('nav.contact')}
            </h3>
            <a
              href={`mailto:${config.html.email}`}
              aria-label={t('footer.emailUs')}
              className="flex items-center gap-4 text-[clamp(0.8rem,2vw,0.9rem)] text-[var(--dynamic-text-secondary)] hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)] rounded-2xl px-4 py-2 transition-colors"
            >
              <FaEnvelope className="text-[var(--cyber-purple)]" />
              <span>{config.html.email}</span>
            </a>
          </div>
        </div>

        {/* Linha final */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social */}
          <div className="flex gap-6">
            {socialLinks.map(({ icon: Icon, url, label, color }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                aria-label={label}
                className={`text-[var(--dynamic-text-secondary)] ${color} transition-colors focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)]`}
              >
                <Icon size={26} />
              </motion.a>
            ))}
          </div>

          <p className="text-xs text-[var(--dynamic-text-secondary)] uppercase tracking-widest text-center">
            © {currentYear} {config.html.fullName} • {t('footer.allRightsReserved')}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={t('footer.backToTopLabel')}
            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--dynamic-text-secondary)] hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)]"
          >
            {t('footer.backToTop')}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 group-hover:border-[var(--cyber-purple)] transition-all">
              <FaArrowUp className="text-xs group-active:animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
