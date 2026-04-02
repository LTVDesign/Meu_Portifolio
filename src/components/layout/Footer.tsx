import { motion } from 'framer-motion';
import type React from 'react';
import { useTranslation } from 'react-i18next';
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
import { navLinks } from '../../constants';
import { config } from '../../constants/config';
import DynamicText from '../atoms/DynamicText';

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
    if (navId === 'doom') {
      return '/doom';
    }
    if (isHome) {
      return `#${navId}`;
    }
    const routeMap: Record<string, string> = {
      about: '/',
      formacao: '/formacao',
      experience: '/',
      cursos: '/cursos',
      works: '/projetos',
      contact: '/contato',
    };
    return routeMap[navId] || '/';
  };

  const socialLinks = [
    {
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/leleltv',
      label: t('footer.linkedin'),
      color: 'hover:text-[#0077b5]',
    },
    {
      icon: FaGithub,
      url: 'https://github.com/lelebrr',
      label: t('footer.github'),
      color: 'hover:text-white',
    },
    {
      icon: FaInstagram,
      url: 'http://instagram.com/lelebrr',
      label: t('footer.instagram'),
      color: 'hover:text-[#e1306c]',
    },
    {
      icon: FaFacebook,
      url: 'https://www.facebook.com/lelebrr',
      label: t('footer.facebook'),
      color: 'hover:text-[#1877f2]',
    },
    {
      icon: FaWhatsapp,
      url: 'https://wa.me/5511984838629?text=Olá%20Vim%20pelo%20seu%20portifólio%20e%20gostaria%20de%20falar%20com%20você!',
      label: t('footer.whatsapp'),
      color: 'hover:text-[#25d366]',
    },
  ];

  return (
    <footer
      className='relative mt-6 sm:mt-8 pt-8 sm:pt-12 pb-4 sm:pb-6 overflow-hidden'
      role='contentinfo'
      style={{ minHeight: '200px' }}
    >
      {/* Fundo com cor sólida igual ao header */}
      <div className='absolute inset-0 bg-[var(--bg-glass)] pointer-events-none' />
      <div className='absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#915EFF]/10 blur-[120px] rounded-full pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center items-start text-center'>
          {/* Coluna 1 - Esquerda */}
          <div className='flex flex-col items-center text-center max-w-sm'>
            <h2 className='text-[clamp(1.2rem,4vw,1.5rem)] font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-4'>
              <DynamicText colorMode='auto'>{config.html.fullName}</DynamicText>
            </h2>
            <p className='text-[var(--dynamic-text-secondary)] text-[clamp(0.8rem,2vw,0.9rem)] leading-relaxed mb-6'>
              <DynamicText colorMode='auto'>
                {t("footer.description")}
              </DynamicText>
            </p>
            {/* Social */}
            <div className='flex flex-wrap gap-4 sm:gap-6 justify-center'>
              {socialLinks.map(({ icon: Icon, url, label, color }) => (
                <motion.a
                  key={label}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ y: -4, scale: 1.1 }}
                  aria-label={label}
                  className={`text-[var(--dynamic-text-secondary)] ${color} transition-colors focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)]`}
                >
                  <Icon size={28} className='sm:text-[32px]' />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Coluna 2 - Meio - Acesso Rápido */}
          <div className='flex flex-col items-center text-center max-w-sm'>
            <h3 className='text-[clamp(0.7rem,2vw,0.85rem)] font-bold uppercase tracking-widest text-[var(--cyber-purple)] mb-6'>
              <DynamicText colorMode='auto'>{t('footer.quickAccess')}</DynamicText>
            </h3>
            <ul className='grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 justify-items-center mb-6 sm:mb-8'>
              {navLinks
                .filter((link) => link.id !== 'contact')
                .map((link) => (
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
                      className='text-[var(--dynamic-text-secondary)] hover:text-white text-[clamp(0.75rem,2vw,0.9rem)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)] rounded-xl px-2 sm:px-3 py-1 min-h-[44px] flex items-center'
                    >
                      <DynamicText colorMode='auto'>{t(`nav.${link.id}`)}</DynamicText>
                    </Link>
                  </li>
                ))}
            </ul>

            {/* Copyright */}
            <div className='w-full text-center mb-4'>
              <p className='text-xs text-[var(--dynamic-text-secondary)] uppercase tracking-widest'>
                <DynamicText colorMode='auto'>
                  © {currentYear} {config.html.fullName} • {t('footer.allRightsReserved')}
                </DynamicText>
              </p>
            </div>

            {/* Konami code */}
            <p
              className='text-[var(--dynamic-text-secondary)] tracking-[0.1em] text-center select-none'
              style={{ fontSize: '1.2em' }}
            >
              {t('tech.easterEgg')}
            </p>
          </div>

          {/* Coluna 3 - Direita - Contato */}
          <div className='flex flex-col items-center text-center max-w-sm'>
            <h3 className='text-[clamp(0.7rem,2vw,0.85rem)] font-bold uppercase tracking-widest text-[var(--cyber-purple)] mb-6'>
              <DynamicText colorMode='auto'>{t('nav.contact')}</DynamicText>
            </h3>
            <a
              href={`mailto:${config.html.email}`}
              aria-label={t('footer.emailUs')}
              className='flex items-center gap-3 sm:gap-4 text-[clamp(0.75rem,2vw,0.9rem)] text-[var(--dynamic-text-secondary)] hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)] rounded-2xl px-3 sm:px-4 py-2 transition-colors mb-6 sm:mb-8 min-h-[44px] break-all'
            >
              <FaEnvelope className='text-[var(--cyber-purple)]' />
              <span>
                <DynamicText colorMode='auto'>{config.html.email}</DynamicText>
              </span>
            </a>

            <button
              type='button'
              onClick={scrollToTop}
              aria-label={t('footer.backToTopLabel')}
              className='group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--dynamic-text-secondary)] hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)]'
            >
              <DynamicText colorMode='auto'>{t('footer.backToTop')}</DynamicText>
              <div className='rounded-2xl border border-white/10 bg-white/5 p-3 group-hover:border-[var(--cyber-purple)] transition-all'>
                <FaArrowUp className='text-xs group-active:animate-bounce' />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
