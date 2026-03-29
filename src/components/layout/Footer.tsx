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
import { navLinks } from '../../constants';
import { config } from '../../constants/config';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer className="relative mt-8 pt-12 pb-10 overflow-hidden">
      {/* Glow Effect de Fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[1px] bg-gradient-to-r from-transparent via-[#915EFF] to-transparent opacity-30" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#915EFF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto sm:px-16 px-6 relative z-10 w-full">
        {/* Grid Principal Centralizado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-start text-center w-full">
          {/* Coluna 1: Identidade & Redes */}
          <div className="flex flex-col items-center text-center w-full max-w-sm">
            <h2 className="text-[clamp(1.2rem,4vw,1.5rem)] font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-4">
              {config.html.fullName}
            </h2>
            <p className="text-[var(--dynamic-text-secondary)] text-[clamp(0.8rem,2vw,0.9rem)] leading-relaxed mb-6">
              Especialista em TI, Infraestrutura e Segurança, transformando dados em inteligência e
              sistemas em plataformas ultra-performativas.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="flex flex-col items-center text-center w-full max-w-sm">
            <h3 className="text-[clamp(0.7rem,2vw,0.85rem)] font-bold uppercase tracking-widest text-[#915EFF] mb-6">
              Acesso Rápido
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 justify-items-center">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-[var(--dynamic-text-secondary)] hover:text-white text-[clamp(0.8rem,2vw,0.9rem)] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#915EFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="flex flex-col items-center text-center w-full max-w-sm">
            <h3 className="text-[clamp(0.7rem,2vw,0.85rem)] font-bold uppercase tracking-widest text-[#915EFF] mb-6">
              Contato
            </h3>
            <div className="flex flex-col items-center gap-5">
              <a
                href={`mailto:${config.html.email}`}
                className="flex items-center gap-4 text-[clamp(0.8rem,2vw,0.9rem)] text-[var(--dynamic-text-secondary)] hover:text-white transition-colors group"
              >
                <div className="w-[clamp(2rem,6vw,2.5rem)] h-[clamp(2rem,6vw,2.5rem)] rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#915EFF]/20 transition-colors border border-white/5 shrink-0">
                  <FaEnvelope className="text-[#915EFF]" />
                </div>
                <span className="truncate">{config.html.email}</span>
              </a>
              <div className="flex items-center gap-4 text-[clamp(0.8rem,2vw,0.9rem)] text-[var(--dynamic-text-secondary)]">
                <div className="w-[clamp(2rem,6vw,2.5rem)] h-[clamp(2rem,6vw,2.5rem)] rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-xs shrink-0">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                Disponível para novos desafios
              </div>
            </div>
          </div>
        </div>

        {/* Linha Final - Direitos e Voltar ao Topo Integrados */}
        <div className="mt-20 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 items-center w-full">
          <div className="flex gap-5 justify-center md:justify-start">
            {socialLinks.map(({ icon: Icon, url, label, color }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className={`text-gray-400 ${color} transition-all duration-300`}
                aria-label={label}
              >
                <Icon size={24} title={label} />
              </motion.a>
            ))}
          </div>

          <p className="text-[10px] text-[var(--dynamic-text-secondary)] uppercase tracking-[0.2em] opacity-60 font-medium text-center">
            © {currentYear} {config.html.fullName} • Todos os direitos reservados
          </p>

          <div className="flex justify-center md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-4 text-[clamp(0.6rem,2vw,0.7rem)] font-bold uppercase tracking-[0.2em] text-[var(--dynamic-text-secondary)] hover:text-white transition-all"
            >
              <span>Voltar ao Topo</span>
              <div className="w-[clamp(2rem,6vw,2.5rem)] h-[clamp(2rem,6vw,2.5rem)] rounded-xl border border-white/10 flex items-center justify-center group-hover:border-[#915EFF] group-hover:shadow-[0_0_20px_rgba(145,94,255,0.3)] transition-all bg-white/5 shadow-lg">
                <FaArrowUp className="text-xs group-hover:animate-bounce text-[#915EFF]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
