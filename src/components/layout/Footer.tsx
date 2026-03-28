import type React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaArrowUp, FaEnvelope } from 'react-icons/fa';
import { navLinks } from '../../constants';
import { config } from '../../constants/config';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/leleltv', label: 'LinkedIn', color: 'hover:text-[#0077b5]' },
    { icon: FaGithub, url: 'https://github.com/lelebrr', label: 'GitHub', color: 'hover:text-white' },
    { icon: FaInstagram, url: 'http://instagram.com/lelebrr', label: 'Instagram', color: 'hover:text-[#e1306c]' },
    { icon: FaFacebook, url: 'https://www.facebook.com/lelebrr', label: 'Facebook', color: 'hover:text-[#1877f2]' },
    { icon: FaWhatsapp, url: '#', label: 'WhatsApp', color: 'hover:text-[#25d366]' },
  ];

  return (
    <footer className="relative mt-20 pt-20 pb-10 overflow-hidden">
      {/* Glow Effect de Fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[1px] bg-gradient-to-r from-transparent via-[#915EFF] to-transparent opacity-30" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#915EFF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        {/* Grid Principal Centralizado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 justify-items-center">
          
          {/* Coluna 1: Identidade & Redes */}
          <div className="flex flex-col items-center text-center w-full max-w-[300px]">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-4">
              {config.html.fullName}
            </h2>
            <p className="text-[var(--dynamic-text-secondary)] text-sm leading-relaxed mb-6">
              Especialista em TI, Infraestrutura e Segurança, transformando dados em inteligência e sistemas em plataformas ultra-performativas.
            </p>
            <div className="flex gap-5">
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
          </div>

          {/* Coluna 2: Navegação */}
          <div className="flex flex-col items-center text-center w-full max-w-[300px]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#915EFF] mb-6">
              Acesso Rápido
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-[var(--dynamic-text-secondary)] hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#915EFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="flex flex-col items-center text-center w-full max-w-[300px]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#915EFF] mb-6">
              Contato
            </h3>
            <div className="flex flex-col items-center gap-5">
              <a 
                href={`mailto:${config.html.email}`}
                className="flex items-center gap-4 text-sm text-[var(--dynamic-text-secondary)] hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#915EFF]/20 transition-colors border border-white/5 shrink-0">
                  <FaEnvelope className="text-[#915EFF]" />
                </div>
                <span className="truncate">{config.html.email}</span>
              </a>
              <div className="flex items-center gap-4 text-sm text-[var(--dynamic-text-secondary)]">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-xs shrink-0">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                Disponível para novos desafios
              </div>
            </div>
          </div>
        </div>

        {/* Linha Final - Direitos e Voltar ao Topo Integrados */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--dynamic-text-secondary)] hover:text-white transition-all order-2 md:order-1"
          >
            <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-[#915EFF] group-hover:shadow-[0_0_20px_rgba(145,94,255,0.3)] transition-all bg-white/5 shadow-lg">
              <FaArrowUp className="text-xs group-hover:animate-bounce text-[#915EFF]" />
            </div>
            <span>Voltar ao Topo</span>
          </button>

          <p className="text-[10px] text-[var(--dynamic-text-secondary)] uppercase tracking-[0.2em] opacity-60 font-medium text-center md:text-right order-1 md:order-2">
            © {currentYear} {config.html.fullName} • Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
