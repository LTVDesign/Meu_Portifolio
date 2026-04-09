import { AnimatePresence, m } from 'framer-motion';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { Curso } from '../../types';

interface CursoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  curso: Curso | null;
}

const CursoDetailModal: React.FC<CursoDetailModalProps> = ({
  isOpen,
  onClose,
  curso,
}) => {
  if (!isOpen || !curso) return null;
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[200] flex items-center justify-center p-[clamp(0.5rem,2vw,1rem)]'
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' />

        {/* Modal */}
        <m.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className='relative bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] rounded-2xl border border-[var(--cyber-purple)]/30 shadow-[0_0_50px_rgba(145,94,255,0.3)] max-w-2xl w-full max-h-[95vh] overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='p-[clamp(1rem,3vw,1.5rem)] border-b border-white/10'>
            <div className='flex items-center gap-[clamp(0.75rem,2vw,1rem)]'>
              <div className='w-[clamp(3.5rem,8vw,5rem)] h-[clamp(3.5rem,8vw,5rem)] rounded-xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center flex-shrink-0 overflow-hidden p-[clamp(0.5rem,1.5vw,0.75rem)]'>
                <img
                  src={curso.icon}
                  alt={curso.platform}
                  className='w-full h-full object-contain'
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-[clamp(1rem,3vw,1.25rem)] font-black text-white leading-tight'>
                  {curso.title}
                </h3>
                <p className='text-xs text-[var(--cyber-purple)] font-bold uppercase tracking-widest mt-1'>
                  {curso.platform}
                </p>
                <div className='flex flex-wrap items-center gap-[clamp(0.5rem,1.5vw,1rem)] mt-2'>
                  <span
                    className='text-xs text-white/80'
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}
                  >
                    📅 {curso.date}
                  </span>
                  <span
                    className='text-xs text-white/80'
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}
                  >
                    ⏱ {curso.duration}
                  </span>
                  <span
                    className='text-xs text-white/80'
                    style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}
                  >
                    ⏳ {curso.workload}
                  </span>
                  {curso.isProfessionalCertificate && (
                    <span className='text-xs text-yellow-400 font-bold flex items-center gap-1'>
                      {t('cursoDetailModal.professionalCertificate')}
                    </span>
                  )}

                  {curso.withHonors && (
                    <m.span
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className='text-xs text-amber-300 font-black flex items-center gap-1.5 drop-shadow-lg'
                      style={{ textShadow: '0 0 12px rgba(251, 191, 36, 0.8)' }}
                    >
                      ⭐ WITH HONORS
                    </m.span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='p-[clamp(1rem,3vw,1.5rem)] overflow-y-auto max-h-[50vh]'>
            {/* Resumo */}
            <div className='mb-6'>
              <h4 className='text-sm font-bold text-[var(--cyber-cyan)] uppercase tracking-wider mb-2'>
                {t('cursoDetailModal.summary')}
              </h4>
              <p
                className='text-white/80 text-sm leading-relaxed'
                style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)' }}
              >
                {curso.summary}
              </p>
            </div>

            {/* Descrição Completa */}
            <div className='mb-6'>
              <h4 className='text-sm font-bold text-[var(--cyber-cyan)] uppercase tracking-wider mb-2'>
                {t('cursoDetailModal.detailedDescription')}
              </h4>
              <p
                className='text-white/80 text-sm leading-relaxed'
                style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)' }}
              >
                {curso.description}
              </p>
            </div>

            {/* Módulos */}
            {curso.modules && curso.modules.length > 0 && (
              <div className='mb-6'>
                <h4 className='text-sm font-bold text-[var(--cyber-cyan)] uppercase tracking-wider mb-3'>
                  {t('cursoDetailModal.curriculum')}
                </h4>
                <ul className='space-y-2'>
                  {curso.modules.map((module: string, index: number) => (
                    <li
                      key={index}
                      className='flex items-start gap-2 text-sm text-white/80'
                      style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}
                    >
                      <span className='text-[var(--cyber-cyan)] mt-1'>▸</span>
                      <span>{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Link de Verificação */}
            {curso.verificationLink && curso.verificationLink !== '#' && (
              <div className='mb-4'>
                <h4 className='text-sm font-bold text-[var(--cyber-cyan)] uppercase tracking-wider mb-2'>
                  {t('cursoDetailModal.authenticityVerification')}
                </h4>
                <a
                  href={curso.verificationLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-sm text-[var(--cyber-purple)] hover:text-[var(--cyber-cyan)] transition-colors'
                >
                  <span>🔗</span>
                  <span>{t('cursoDetailModal.verifyOnCoursera')}</span>
                </a>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className='p-[clamp(1rem,3vw,1.5rem)] border-t border-white/10 flex flex-row flex-nowrap items-center justify-center gap-[clamp(0.5rem,1.5vw,0.75rem)]'>
            <a
              href={curso.verificationLink}
              target='_blank'
              rel='noopener noreferrer'
              className='px-[clamp(1rem,2vw,1.5rem)] py-2.5 bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white font-bold text-[clamp(0.6rem,1.2vw,0.7rem)] uppercase tracking-widest rounded-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(145,94,255,0.4)] min-h-[44px] flex items-center text-center justify-center'
            >
              {t('cursoDetailModal.accessCourse')}
            </a>
            <a
              href={curso.link}
              target='_blank'
              rel='noopener noreferrer'
              className='px-[clamp(1rem,2vw,1.5rem)] py-2.5 bg-white/10 border border-[var(--cyber-cyan)]/50 text-[var(--cyber-cyan)] font-bold text-[clamp(0.6rem,1.2vw,0.7rem)] uppercase tracking-widest rounded-lg hover:scale-105 hover:bg-[var(--cyber-cyan)]/10 transition-all min-h-[44px] flex items-center gap-1.5 text-center justify-center'
            >
              📄 Ver Certificado
            </a>
            <button
              onClick={onClose}
              className='px-[clamp(1rem,2vw,1.5rem)] py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white font-bold text-[clamp(0.6rem,1.2vw,0.7rem)] uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all min-h-[44px] flex items-center text-center justify-center'
            >
              {t('cursoDetailModal.close')}
            </button>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
};

export default CursoDetailModal;
