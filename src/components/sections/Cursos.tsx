import { useMemo, useState } from 'react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import cursosData from '../../data/cursos.json';
import { SectionWrapper } from '../../hoc';
import { alberta, bradesco, cate, google, ibm, hackers, ipad, skill, yonsei, johns } from '../../assets';
import { fadeIn } from '../../utils/motion';
import { Header } from '../atoms';
import CursoDetailModal from '../atoms/CursoDetailModal';
import type { Curso } from '../../types';

const Cursos = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const { t, i18n } = useTranslation();

  const currentLanguage = (i18n.language || 'pt') as keyof typeof cursosData;

  const allCursos: Curso[] = useMemo(() => {
    const cursos = cursosData[currentLanguage] || cursosData.pt;
    return cursos.map((curso) => {
      let iconSrc = google;
      if (curso.icon === 'alberta') iconSrc = alberta;
      else if (curso.icon === 'ibm') iconSrc = ibm;
      else if (curso.icon === 'cate') iconSrc = cate;
      else if (curso.icon === 'johns') iconSrc = johns;
      else if (curso.icon === 'hackers') iconSrc = hackers;
      else if (curso.icon === 'bradesco') iconSrc = bradesco;
      else if (curso.icon === 'skill') iconSrc = skill;
      else if (curso.icon === 'iped') iconSrc = ipad;
      else if (curso.icon === 'yonsei') iconSrc = yonsei;

      return {
        ...curso,
        icon: iconSrc,
      };
    });
  }, [currentLanguage]);

  const displayedCursos = isHomePage ? allCursos.slice(0, 6) : allCursos;

  return (
    <div className='max-w-7xl mx-auto px-[clamp(1rem,4vw,1.5rem)] font-primary'>
      {/* Box de texto informativo com animação */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-[clamp(2rem,5vw,4rem)]'
      >
        <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-[clamp(1.5rem,5vw,3rem)] shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
          {/* Efeito de brilho animado no fundo */}
          <div className='absolute inset-0 opacity-30'>
            <m.div
              className='absolute inset-0'
              style={{
                background:
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
              }}
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Conteúdo da box */}
          <div className='relative z-10'>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Header useMotion={true} p={t('courses.p')} h2={t('courses.h2')} />
            </m.div>

            {/* Linha com animação discreta de brilho */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className='relative w-full max-w-xl mx-auto my-8'
            >
              <div className='h-[1px] bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent relative'>
                {/* Brilho esquerdo */}
                <m.div
                  className='absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--cyber-cyan)] blur-sm'
                  style={{ left: '50%' }}
                  animate={{
                    left: ['50%', '0%', '50%'],
                    opacity: [0.8, 0.3, 0.8],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {/* Brilho direito */}
                <m.div
                  className='absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--cyber-purple)] blur-sm'
                  style={{ right: '50%' }}
                  animate={{
                    right: ['50%', '0%', '50%'],
                    opacity: [0.8, 0.3, 0.8],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </m.div>

            {/* Badges de destaque */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className='flex flex-wrap justify-center gap-[clamp(0.5rem,1.5vw,0.75rem)] mt-4'
            >
              {(() => {
                const badges = t('courses.badges', { returnObjects: true });
                if (!Array.isArray(badges)) return null;
                return badges.map((badge: { text: string, color: string }, idx: number) => (
                  <m.span
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)] rounded-full text-[clamp(0.625rem,1.5vw,0.75rem)] font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
                  >
                    {badge.text}
                  </m.span>
                ));
              })()}
            </m.div>
          </div>

          {/* Borda decorativa com glow */}
          <div className='absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none' />
          <div className='absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10' />
        </div>
      </m.div>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(clamp(14rem,28vw,20rem),1fr))] gap-[clamp(1.25rem,4vw,2.5rem)]'>
        {displayedCursos.map((curso, index) => (
          <m.div
            key={curso.id}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className='glass-card p-[clamp(1.25rem,4vw,2.5rem)] group neon-hover flex flex-col h-full border border-white/10'
          >
            <div className='flex items-center gap-[clamp(1rem,3vw,1.5rem)] mb-[clamp(1.25rem,3vw,2rem)]'>
              <div className='w-[clamp(4rem,8vw,5rem)] h-[clamp(4rem,8vw,5rem)] rounded-2xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/5 transition-transform group-hover:scale-110 overflow-hidden p-[clamp(0.5rem,1.5vw,0.75rem)]'>
                <img
                  src={curso.icon}
                  alt={curso.platform}
                  className='w-full h-full object-contain'
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' }}
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-[clamp(1rem,2.5vw,1.25rem)] font-black text-white group-hover:text-[var(--cyber-cyan)] transition-colors leading-tight'>
                  {curso.title}
                </h3>
                <p className='text-xs text-[var(--cyber-purple)] font-black uppercase tracking-widest mt-2'>
                  {curso.platform}
                </p>
                {curso.isProfessionalCertificate && (
                  <div className='mt-2 flex items-center gap-1'>
                    <span className='text-yellow-400'>★</span>
                    <span className='text-xs text-yellow-400 font-bold'>
                      {t('allCursos.professionalCertificates')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className='text-white/80 text-sm flex-1 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity'
              style={{
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
              }}>
              {curso.summary}
            </p>

            <div className='mt-[clamp(1.5rem,3vw,2.5rem)] pt-[clamp(1.25rem,3vw,2rem)] border-t border-white/5 flex items-center justify-center'>
              <m.button
                onClick={() => {
                  setSelectedCurso(curso);
                  setIsDetailOpen(true);
                }}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                }}
                whileTap={{ scale: 0.95 }}
                className='relative px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.625rem,1.5vw,0.75rem)] font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden min-h-[44px] btn-glow'
              >
                <m.div
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)]/20 to-transparent'
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <span className='relative z-10'>{t('cursos.verCertificado')}</span>

                <div className='absolute inset-0 rounded-2xl border border-[var(--cyber-cyan)]/0 group-hover/btn:border-[var(--cyber-cyan)]/60 transition-all duration-300' />
              </m.button>
            </div>
          </m.div>
        ))}
      </div>

      <div className='mt-[clamp(2.5rem,5vw,5rem)] flex justify-center'>
        <m.button
          onClick={() => window.open('/cursos', '_blank')}
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.95 }}
          className='relative px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.625rem,1.5vw,0.75rem)] font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden min-h-[44px] btn-glow'
        >
          <m.div
            className='absolute inset-0 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)]/20 to-transparent'
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <span className='relative z-10'>{t('courses.viewAll')}</span>

          <div className='absolute inset-0 rounded-2xl border border-[var(--cyber-cyan)]/0 group-hover/btn:border-[var(--cyber-cyan)]/60 transition-all duration-300' />
        </m.button>
      </div>



      <CursoDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedCurso(null);
        }}
        curso={selectedCurso}
      />
    </div>
  );
};

export default SectionWrapper(Cursos, 'cursos');
