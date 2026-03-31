import { m } from 'framer-motion';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms';
import { useTranslation } from 'react-i18next';
import { willy } from '../../assets';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Box de texto informativo grande - ocupa espaço baseado no conteúdo */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-8 md:p-12 shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500">
            {/* Efeito de brilho animado no fundo */}
            <div className="absolute inset-0 opacity-30">
              <m.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)'
                }}
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Conteúdo da box de texto */}
            <div className="relative z-10">
              <Header
                useMotion={true}
                p={t('about.p')}
                h2={t('about.h2')}
              />

              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="prose prose-invert max-w-none mt-6 text-[var(--text-secondary)] leading-relaxed text-base"
              >
                {(t('about.content') as string).split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </m.div>
            </div>

            {/* Borda decorativa com glow */}
            <div className="absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10" />
          </div>
        </m.div>

        {/* Card da imagem separado - do lado fora */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-96 flex-shrink-0"
        >
          <div className="glass-card aspect-square rounded-3xl overflow-hidden border border-[var(--cyber-purple)]/30 group-hover:border-[var(--cyber-cyan)]/50 transition-all duration-500 shadow-2xl">
            <img
              src={willy}
              alt="Leandro Saturnino Barbosa"
              className="w-full h-full object-cover"
            />
            {/* Overlay com gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
