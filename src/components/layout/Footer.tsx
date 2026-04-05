import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../constants';
import { config } from '../../constants/config';
import DynamicText from '../atoms/DynamicText';
import { useFooterKonami } from '../../hooks/useFooterKonami';

// SVG Icons inline - elimina dependência de react-icons/fa (~15-20KB)
const GithubIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2 1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.1-22.6-.3-40.9-1.8.4-3.9.8-6.2 1.1-15.8 2.3-32.1-2.6-35.4-8.8-3.8-6.6-9.8-22.4-16.5-27.1-6.1-4.1-14.8-14.2 0-14.5 13.7-.3 23.5 12.6 26.8 17.9 15.7 26.4 40.8 18.9 50.9 14.3 1.6-11.4 6.2-19 11.3-23.4-39.5-4.4-80.8-19.8-80.8-87.9 0-19.5 7-35.5 18.3-48-1.8-4.5-8-22.7 1.8-47.3 0 0 14.9-4.8 49 18.4 14.2-4 29.5-5.9 44.6-6 15.1.1 30.4 2.1 44.6 6 34.1-23.2 49-18.4 49-18.4 9.8 24.6 3.6 42.8 1.8 47.3 11.4 12.5 18.3 28.5 18.3 48 0 68.3-41.5 83.4-81 87.9 6.4 5.5 12 16.1 12 32.5 0 23.5-.2 42.4-.2 48.3 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.8 3.9-8.1 5.1-12.9 2.4-5.5-2.9-8.1-8.2-6.1-12.1 1.8-3.9 8.1-5.1 12.9-2.4 5.5 2.9 8.1 8.2 6.1 12.1zm11.4-12.6c-2.1 3.6-7.4 4.4-11.8 1.8-4.5-2.4-6.3-7.2-4.2-10.8 2.1-3.6 7.4-4.4 11.8-1.8 4.5 2.4 6.3 7.2 4.2 10.8zm11-14.3c-2.6 3.5-8.1 3.9-12.3 1-4.2-3-5.6-8-3-11.5 2.6-3.5 8.1-3.9 12.3-1 4.2 2.9 5.6 8 3 11.5z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.6 102.7-9 132.1z" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256z" />
  </svg>
);

const WhatsappIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

const EnvelopeIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
  </svg>
);

const ArrowUpIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
  </svg>
);

const ArrowDownIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
  </svg>
);

const ArrowLeftIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
  </svg>
);

const ArrowRightIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

const Footer: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useTranslation();

  // Lazy load do Easter Egg - só carrega quando o footer entra no viewport
  const footerRef = useRef<HTMLElement>(null);
  const [easterEggVisible, setEasterEggVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // IntersectionObserver para carregar Easter Egg apenas quando visível
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEasterEggVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const getNavLink = (navId: string) => {
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
      curriculo: '/#curriculo',
      contact: '/contato',
    };
    return routeMap[navId] || '/';
  };

  const socialLinks = [
    {
      icon: LinkedinIcon,
      url: 'https://www.linkedin.com/in/leleltv',
      label: t('footer.linkedin'),
      color: 'hover:text-[#0077b5]',
    },
    {
      icon: GithubIcon,
      url: 'https://github.com/lelebrr',
      label: t('footer.github'),
      color: 'hover:text-white',
    },
    {
      icon: InstagramIcon,
      url: 'http://instagram.com/lelebrr',
      label: t('footer.instagram'),
      color: 'hover:text-[#e1306c]',
    },
    {
      icon: FacebookIcon,
      url: 'https://www.facebook.com/lelebrr',
      label: t('footer.facebook'),
      color: 'hover:text-[#1877f2]',
    },
    {
      icon: WhatsappIcon,
      url: 'https://wa.me/5511984838629?text=Olá%20Vim%20pelo%20seu%20portifólio%20e%20gostaria%20de%20falar%20com%20você!',
      label: t('footer.whatsapp'),
      color: 'hover:text-[#25d366]',
    },
  ];

  const { konamiProgress, showUnlockAnimation, simulateKeyPress } = useFooterKonami();

  const konamiCodeKeys = [
    { code: 'ArrowUp', icon: ArrowUpIcon, label: '↑' },
    { code: 'ArrowUp', icon: ArrowUpIcon, label: '↑' },
    { code: 'ArrowDown', icon: ArrowDownIcon, label: '↓' },
    { code: 'ArrowDown', icon: ArrowDownIcon, label: '↓' },
    { code: 'ArrowLeft', icon: ArrowLeftIcon, label: '←' },
    { code: 'ArrowRight', icon: ArrowRightIcon, label: '→' },
    { code: 'ArrowLeft', icon: ArrowLeftIcon, label: '←' },
    { code: 'ArrowRight', icon: ArrowRightIcon, label: '→' },
    { code: 'KeyB', icon: null, label: 'B' },
    { code: 'KeyA', icon: null, label: 'A' },
  ];

  const handleKeyClick = useCallback((index: number) => {
    setHasInteracted(true);
    simulateKeyPress(index);
  }, [simulateKeyPress]);

  return (
    <footer
      ref={footerRef}
      className='footer-stable relative mt-4 sm:mt-6 pt-6 sm:pt-8 pb-2 sm:pb-4'
      role='contentinfo'
    >
      {/* Fundo com cor sólida igual ao header */}
      <div className='absolute inset-0 bg-[var(--bg-glass)] pointer-events-none' />
      <div className='absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#915EFF]/10 blur-[120px] rounded-full pointer-events-none' />

      <div className='footer-content max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10'>
        {/* Grid de 3 colunas */}
        <div className='footer-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center items-start text-center mb-6'>
          {/* Coluna 1 - Esquerda: Nome e Descrição */}
          <div className='flex flex-col items-center text-center max-w-sm'>
            <h2 className='text-[clamp(1.2rem,4vw,1.5rem)] font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-4'>
              <DynamicText colorMode='auto'>{config.html.fullName}</DynamicText>
            </h2>
            <p className='text-[var(--dynamic-text-secondary)] text-[clamp(0.85rem,2.5vw,1rem)] leading-relaxed'>
              <DynamicText colorMode='auto'>
                {t('footer.description')}
              </DynamicText>
            </p>
          </div>

          {/* Coluna 2 - Meio: Acesso Rápido (ícones do header, menos contato) */}
          <div className='flex flex-col items-center text-center max-w-sm'>
            <h3 className='text-[clamp(0.7rem,2vw,0.85rem)] font-bold uppercase tracking-widest text-[var(--cyber-purple)] mb-6'>
              <DynamicText colorMode='auto'>{t('footer.quickAccess')}</DynamicText>
            </h3>
            <ul className='grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-2 justify-items-center'>
              {navLinks
                .filter((link) => link.id !== 'contact' && link.id !== 'doom')
                .map((link) => (
                  <li key={link.id}>
                    <Link
                      to={getNavLink(link.id)}
                      onClick={() => {
                        if (isHome) {
                          const element = document.getElementById(link.id);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                      className='text-[var(--dynamic-text-secondary)] hover:text-white text-[clamp(0.75rem,2vw,0.9rem)] transition-colors composited-hover focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)] rounded-xl px-2 sm:px-3 py-1 min-h-[44px] flex items-center gap-2'
                    >
                      <DynamicText colorMode='auto'>{t(`nav.${link.id}`)}</DynamicText>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Coluna 3 - Direita: Contato */}
          <div className='flex flex-col items-center text-center max-w-sm'>
            <h3 className='text-[clamp(0.7rem,2vw,0.85rem)] font-bold uppercase tracking-widest text-[var(--cyber-purple)] mb-6'>
              <DynamicText colorMode='auto'>{t('nav.contact')}</DynamicText>
            </h3>
            <a
              href={`mailto:${config.html.email}`}
              aria-label={t('footer.emailUs')}
              className='flex items-center gap-3 sm:gap-4 text-[clamp(0.75rem,2vw,0.9rem)] text-[var(--dynamic-text-secondary)] hover:text-white composited-hover focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)] rounded-2xl px-3 sm:px-4 py-2 transition-colors mb-4 min-h-[44px] break-all'
            >
              <EnvelopeIcon className='text-[var(--cyber-purple)]' />
              <span>
                <DynamicText colorMode='auto'>{config.html.email}</DynamicText>
              </span>
            </a>

            <div className='social-links-container flex items-center gap-3 sm:gap-4 mb-4'>
              {socialLinks.map(({ icon: Icon, url, label, color }) => (
                <m.a
                  key={label}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ y: -4, scale: 1.2 }}
                  aria-label={label}
                  className={`text-[var(--dynamic-text-secondary)] ${color} social-icon-composited composited-hover transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)]`}
                >
                  <Icon size={20} className='sm:text-[24px]' />
                </m.a>
              ))}
            </div>

            <button
              type='button'
              onClick={scrollToTop}
              aria-label={t('footer.backToTopLabel')}
              className='group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--dynamic-text-secondary)] hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--cyber-purple)]'
            >
              <DynamicText colorMode='auto'>{t('footer.backToTop')}</DynamicText>
              <div className='rounded-2xl border border-white/10 bg-white/5 p-3 group-hover:border-[var(--cyber-purple)] composited-hover transition-all'>
                <ArrowUpIcon className='text-xs group-active:animate-bounce' />
              </div>
            </button>
          </div>
        </div>

        {/* Barra Inferior - Easter Egg com Lazy Load - Hidden on mobile/tablet */}
        <div className='pt-4 border-t border-white/5 hidden lg:flex flex-col items-center gap-2'>
          {/* Easter Egg Interativo - Só renderiza quando visível */}
          {easterEggVisible && (
            <div className='easter-egg-container flex flex-col items-center gap-2'>
              <p className='text-[7px] text-[var(--dynamic-text-secondary)] uppercase tracking-[0.2em] opacity-50 text-center'>
                <DynamicText colorMode='auto'>{t('footer.easterEggHint')}</DynamicText>
              </p>

              {/* Tela de desbloqueio */}
              <AnimatePresence>
                {showUnlockAnimation && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black'
                  >
                    <m.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className='text-center'
                    >
                      <div className='text-6xl mb-8'>🔓</div>
                      <p className='text-white text-2xl font-bold'>
                        {t('footer.accessGranted')}
                      </p>
                      <p className='text-white/60 mt-2'>
                        {t('footer.iniciandoDoom')}
                      </p>
                    </m.div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Teclas interativas - renderiza apenas após interação ou quando visível */}
              {(hasInteracted || easterEggVisible) && (
                <div className='flex items-center gap-1.5 sm:gap-2 p-3 rounded-2xl bg-gradient-to-r from-purple-900/20 via-black/30 to-blue-900/20 border border-white/10 flex-wrap justify-center shadow-[0_0_30px_rgba(145,94,255,0.15)]'>
                  {konamiCodeKeys.map((key, index) => {
                    const Icon = key.icon;
                    const isActive = konamiProgress > index;
                    const isCurrent = konamiProgress === index;

                    return (
                      <m.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.3 }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleKeyClick(index)}
                        className={`konami-key w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-[transform,opacity,box-shadow] duration-200 text-xs font-bold relative group skill-icon
                          ${isActive
                            ? 'bg-gradient-to-br from-[#915EFF] via-[#6366f1] to-[#8b5cf6] border-[#915EFF] text-white shadow-[0_0_15px_rgba(145,94,255,0.5)]'
                            : isCurrent
                              ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/30 border-[#915EFF] text-[#915EFF] shadow-[0_0_10px_rgba(145,94,255,0.4)]'
                              : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 text-[var(--dynamic-text-secondary)] hover:border-[#915EFF]/50 hover:shadow-[0_0_10px_rgba(145,94,255,0.3)]'
                          }
                        `}
                      >
                        {/* Número da sequência no hover */}
                        <div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-[#915EFF] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-[0_0_8px_rgba(145,94,255,0.6)] z-[9999] pointer-events-none'>
                          {index + 1}º
                          <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#915EFF]' />
                        </div>
                        <span className='relative z-10'>
                          {Icon ? <Icon size={12} className='sm:text-[14px]' /> : key.label}
                        </span>
                      </m.div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Placeholder do Easter Egg - mostra hint antes de carregar */}
          {!easterEggVisible && (
            <div className='easter-egg-placeholder h-12 flex items-center justify-center'>
              <p className='text-[7px] text-[var(--dynamic-text-secondary)] uppercase tracking-[0.2em] opacity-30'>
                ...
              </p>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className='footer-copyright mt-4 pt-3 border-t border-white/5 flex flex-col items-center gap-1'>
          <p className='text-[10px] sm:text-xs text-white/30 text-center tracking-wide'>
            © {new Date().getFullYear()} Leandro Saturnino Barbosa. {t('footer.allRightsReserved', 'All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;