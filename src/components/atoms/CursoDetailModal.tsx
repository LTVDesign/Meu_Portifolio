import { AnimatePresence, motion } from 'framer-motion';
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4'
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className='relative bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] rounded-2xl border border-[var(--cyber-purple)]/30 shadow-[0_0_50px_rgba(145,94,255,0.3)] max-w-2xl w-full max-h-[95vh] sm:max-h-[85vh] overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='p-4 sm:p-6 border-b border-white/10'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center flex-shrink-0 overflow-hidden p-2'>
                <img
                  src={curso.icon}
                  alt={curso.platform}
                  className='w-full h-full object-contain'
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-base sm:text-xl font-black text-white leading-tight'>
                  {curso.title}
                </h3>
                <p className='text-xs text-[var(--cyber-purple)] font-bold uppercase tracking-widest mt-1'>
                  {curso.platform}
                </p>
                <div className='flex flex-wrap items-center gap-2 sm:gap-4 mt-2'>
                  <span className='text-xs text-[var(--text-secondary)]'>
                    📅 {curso.date}
                  </span>
                  <span className='text-xs text-[var(--text-secondary)]'>
                    ⏱ {curso.duration}
                  </span>
                  <span className='text-xs text-[var(--text-secondary)]'>
                    ⏳ {curso.workload}
                  </span>
                  {curso.isProfessionalCertificate && (
                    <span className='text-xs text-yellow-400 font-bold flex items-center gap-1'>
                      {t('cursoDetailModal.professionalCertificate')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='p-4 sm:p-6 overflow-y-auto max-h-[50vh] sm:max-h-[45vh]'>
            {/* Resumo */}
            <div className='mb-6'>
              <h4 className='text-sm font-bold text-[var(--cyber-cyan)] uppercase tracking-wider mb-2'>
                {t('cursoDetailModal.summary')}
              </h4>
              <p className='text-[var(--text-secondary)] text-sm leading-relaxed'>
                {curso.summary}
              </p>
            </div>

            {/* Descrição Completa */}
            <div className='mb-6'>
              <h4 className='text-sm font-bold text-[var(--cyber-cyan)] uppercase tracking-wider mb-2'>
                {t('cursoDetailModal.detailedDescription')}
              </h4>
              <p className='text-[var(--text-secondary)] text-sm leading-relaxed'>
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
                      className='flex items-start gap-2 text-sm text-[var(--text-secondary)]'
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
          <div className='p-4 sm:p-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3'>
            <a
              href={curso.link}
              target='_blank'
              rel='noopener noreferrer'
              className='px-4 sm:px-6 py-2.5 bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(145,94,255,0.4)] min-h-[44px] flex items-center'
            >
              {t('cursoDetailModal.accessCourse')}
            </a>
            <button
              onClick={onClose}
              className='px-4 sm:px-6 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all min-h-[44px] flex items-center'
            >
              {t('cursoDetailModal.close')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CursoDetailModal;
