import { m, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
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
import { useFooterKonami } from '../../hooks/useFooterKonami';

const Footer: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t, i18n } = useTranslation();

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

  const { konamiProgress, showUnlockAnimation, simulateKeyPress } = useFooterKonami();

  const konamiCodeKeys = [
    { code: 'ArrowUp', icon: FaArrowUp, label: '↑' },
    { code: 'ArrowUp', icon: FaArrowUp, label: '↑' },
    { code: 'ArrowDown', icon: FaArrowDown, label: '↓' },
    { code: 'ArrowDown', icon: FaArrowDown, label: '↓' },
    { code: 'ArrowLeft', icon: FaArrowLeft, label: '←' },
    { code: 'ArrowRight', icon: FaArrowRight, label: '→' },
    { code: 'ArrowLeft', icon: FaArrowLeft, label: '←' },
    { code: 'ArrowRight', icon: FaArrowRight, label: '→' },
    { code: 'KeyB', icon: null, label: 'B' },
    { code: 'KeyA', icon: null, label: 'A' },
  ];

  const handleKeyClick = (index: number) => {
    simulateKeyPress(index);
  };

  return (
    <footer
      className='relative mt-4 sm:mt-6 pt-6 sm:pt-8 pb-2 sm:pb-4'
      role='contentinfo'
      style={{ minHeight: '150px' }}
    >
      {/* Fundo com cor sólida igual ao header */}
      <div className='absolute inset-0 bg-[var(--bg-glass)] pointer-events-none' />
      <div className='absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#915EFF]/10 blur-[120px] rounded-full pointer-events-none' />

      <div className='max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10'>
        {/* Grid de 3 colunas */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center items-start text-center mb-6'>
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
              <FaEnvelope className='text-[var(--cyber-purple)]' />
              <span>
                <DynamicText colorMode='auto'>{config.html.email}</DynamicText>
              </span>
            </a>

            <div className='flex items-center gap-3 sm:gap-4 mb-4'>
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
                <FaArrowUp className='text-xs group-active:animate-bounce' />
              </div>
            </button>
          </div>
        </div>

        {/* Barra Inferior - Easter Egg */}
        <div className='pt-4 border-t border-white/5 flex flex-col items-center gap-2'>
          {/* Easter Egg Interativo */}
          <div className='flex flex-col items-center gap-2'>
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
                      {i18n.language === 'pt' ? 'Iniciando DOOM...' : 'Starting DOOM...'}
                    </p>
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Teclas interativas */}
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
                    className={`
                      w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 flex items-center justify-center cursor-pointer
                      transition-all duration-200 text-xs font-bold relative group skill-icon
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

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
