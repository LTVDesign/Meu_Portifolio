import type React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { navLinks } from '../../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/leleltv', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com/lelebrr', label: 'GitHub' },
    { icon: FaInstagram, url: 'http://instagram.com/lelebrr', label: 'Instagram' },
    { icon: FaFacebook, url: 'https://www.facebook.com/lelebrr', label: 'Facebook' },
    { icon: FaWhatsapp, url: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-tertiary/80 backdrop-blur-xl border-t border-white/10 text-[var(--dynamic-text-color)] py-12 mt-16 sm:mt-24 transition-colors duration-500 relative z-30">
      <div className="w-full px-4">
        <div className="flex flex-col items-center gap-12 sm:gap-16">
          {/* Top Section - Branding and Socials */}
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-bold text-[var(--dynamic-text-color)] transition-colors duration-500 mb-4 text-center">
              Leandro Saturnino Barbosa
            </h2>
            <p className="text-[var(--dynamic-text-secondary)] text-center text-sm max-w-sm transition-colors duration-500">
              Construindo experiências digitais modernas, fluidas e ultra imersivas focadas na
              interação do usuário.
            </p>
            <div className="flex justify-center space-x-5 mt-6">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black-100 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#915EFF] hover:shadow-[0_0_15px_rgba(145,94,255,0.4)] hover:-translate-y-1 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Section - Navigation Links */}
          <div className="flex flex-col items-center w-full">
            <h3 className="text-lg font-semibold text-[var(--dynamic-text-color)] mb-4 text-center w-full">
              Acesso Rápido
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-8 sm:gap-x-12 gap-y-3 text-center w-full justify-items-center">
              {navLinks
                .filter((link) => link.id !== 'contact')
                .map((link) => (
                  <li key={link.id} className="flex justify-center whitespace-nowrap">
                    <a
                      href={`#${link.id}`}
                      className="text-[var(--dynamic-text-secondary)] hover:text-[#915EFF] text-sm font-medium transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-xs text-[var(--dynamic-text-secondary)] font-medium tracking-wide transition-colors duration-500">
            © {currentYear} Leandro Saturnino Barbosa. Desenvolvido com React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
