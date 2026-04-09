import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import close from '../../assets/close.svg';
import { alberta, bradesco, cate, google, ibm, hackers, ipad, skill, yonsei, johns } from '../../assets';
import type { Curso } from '../../types';

interface CursosModalProps {
  isOpen: boolean;
  onClose: () => void;
  cursos: Curso[];
}

const CursosModal = ({ isOpen, onClose, cursos }: CursosModalProps) => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'duration' | 'company' | 'name'>('year');
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'hidden';

      if (modalRef.current) {
        modalRef.current.focus();
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTabKey);
        document.body.style.overflow = 'unset';

        if (lastFocusedElement.current) {
          lastFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  const getLogo = (iconName: string | undefined, platform: string) => {
    const logoMap: { [key: string]: string } = {
      'alberta': alberta,
      'bradesco': bradesco,
      'cate': cate,
      'google': google,
      'ibm': ibm,
      'johns': johns,
      'hackers': hackers,
      'skill': skill,
      'iped': ipad,
      'yonsei': yonsei,
    };

    if (iconName && logoMap[iconName]) {
      return logoMap[iconName];
    }

    const platformLower = platform.toLowerCase();
    if (platformLower.includes('google')) return google;
    if (platformLower.includes('ibm')) return ibm;
    if (platformLower.includes('johns')) return johns;
    if (platformLower.includes('bradesco')) return bradesco;
    if (platformLower.includes('iped')) return ipad;
    if (platformLower.includes('alberta')) return alberta;
    if (platformLower.includes('hackers')) return hackers;
    if (platformLower.includes('cate')) return cate;
    if (platformLower.includes('skill')) return skill;
    if (platformLower.includes('yonsei')) return yonsei;

    return google;
  };

  const filteredCursos = cursos.filter(
    (curso) =>
      curso.title.toLowerCase().includes(filter.toLowerCase()) ||
      curso.platform.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedCursos = [...filteredCursos].sort((a, b) => {
    if (sortBy === 'year') {
      return parseInt(b.date, 10) - parseInt(a.date, 10);
    } else if (sortBy === 'company') {
      return a.platform.localeCompare(b.platform);
    } else if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'duration') {
      const extractNumber = (duration: string | undefined): number => {
        if (!duration) return 0;
        const match = duration.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      };
      const durationA = extractNumber(a.duration);
      const durationB = extractNumber(b.duration);
      return durationB - durationA;
    }
    return 0;
  });

  if (!isOpen) return null;

  const modalTitleId = 'cursos-modal-title';

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm'
        role='presentation'
      >
        {/* Header da Modal */}
        <div className='sticky top-0 z-20 flex items-center justify-between p-[clamp(1rem,3vw,1.5rem)] border-b border-white/10 bg-black/80 backdrop-blur-md'>
          <div className='flex items-center gap-[clamp(0.75rem,2vw,1rem)]'>
            <h2 id={modalTitleId} className='text-[clamp(1.125rem,3vw,1.5rem)] font-bold text-white'>
              {t('courses.allTitle')}
            </h2>
          </div>
          <div className='flex items-center gap-4'>
            <button
              type="button"
              onClick={onClose}
              className='p-2 rounded-lg hover:bg-white/10 transition-colors'
              aria-label={t('common.close')}
            >
              <img src={close} alt='' className='w-[clamp(1.25rem,2.5vw,1.5rem)] h-[clamp(1.25rem,2.5vw,1.5rem)]' />
            </button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div
          ref={modalRef}
          className='flex-1 overflow-y-auto p-[clamp(1rem,3vw,1.5rem)]'
          role='dialog'
          aria-modal='true'
          aria-labelledby={modalTitleId}
          tabIndex={-1}
        >
          <div className='max-w-7xl mx-auto'>
            {/* Barra de Filtros e Organização */}
            <div className='mb-[clamp(1.25rem,4vw,2rem)] flex flex-row flex-nowrap gap-[clamp(0.75rem,2vw,1rem)] items-center justify-between'>
              <div className='relative flex-1 max-w-[clamp(15rem,40vw,24rem)]'>
                <input
                  type='text'
                  placeholder={t('courses.filterPlaceholder')}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className='w-full px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] pl-[clamp(2.5rem,5vw,3rem)] rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[var(--cyber-cyan)] transition-colors min-h-[44px] text-[clamp(0.75rem,1.5vw,0.875rem)]'
                  aria-label={t('courses.filterPlaceholder')}
                />
                <span className='absolute left-[clamp(0.75rem,2vw,1rem)] top-1/2 -translate-y-1/2 text-white/50 text-[clamp(0.875rem,1.5vw,1rem)]'>
                  🔍
                </span>
              </div>

              <div className='flex items-center gap-3 w-auto'>
                <span className='text-white/60 text-sm whitespace-nowrap'>
                  {t('courses.sortBy')}:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'year' | 'duration' | 'company' | 'name')
                  }
                  className='flex-none px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--cyber-cyan)] transition-colors min-h-[44px] text-[clamp(0.75rem,1.5vw,0.875rem)]'
                  aria-label={t('courses.sortBy')}
                >
                  <option value='year'>{t('courses.sortYear')}</option>
                  <option value='name'>{t('courses.sortName')}</option>
                  <option value='duration'>{t('courses.sortDuration')}</option>
                  <option value='company'>{t('courses.sortCompany')}</option>
                </select>
              </div>
            </div>

            {/* Grid de Cursos - Todos juntos */}
            <div className='grid grid-cols-[repeat(auto-fit,minmax(clamp(14rem,28vw,20rem),1fr))] gap-[clamp(1.25rem,4vw,2.5rem)]'>
              {sortedCursos.map((curso, index) => (
                <m.div
                  key={curso.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className='glass-card p-[clamp(1.25rem,4vw,2rem)] neon-hover flex flex-col group border border-white/10'
                >
                  <div className='flex-1'>
                    {/* Header com logotipo */}
                    <div className='flex items-start gap-[clamp(0.75rem,2vw,1rem)] mb-[clamp(1rem,2.5vw,1.5rem)]'>
                      <div className='w-[clamp(3rem,8vw,5rem)] h-[clamp(3rem,8vw,5rem)] rounded-xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--cyber-purple)]/20 border border-white/10 overflow-hidden p-[clamp(0.4rem,1.5vw,0.625rem)]'>
                        <img
                          src={getLogo(curso.icon, curso.platform)}
                          alt={curso.platform}
                          className='w-full h-full object-contain'
                          style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5))' }}
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between mb-2'>
                          <h3 className='text-[clamp(1rem,2vw,1.25rem)] font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors leading-tight'>
                            {curso.title}
                          </h3>
                          {curso.isProfessionalCertificate && (
                            <span className='text-yellow-400 text-sm ml-2 flex-shrink-0'>
                              ★
                            </span>
                          )}
                        </div>
                        <p className='text-[var(--cyber-purple)] font-bold uppercase tracking-widest text-[clamp(0.625rem,1.5vw,0.75rem)]'>
                          {curso.platform}
                        </p>
                      </div>
                    </div>

                    <p className='text-white/80 text-sm leading-relaxed mb-4' style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)' }}>
                      {curso.summary}
                    </p>
                    <div className='flex flex-wrap gap-3 text-xs text-white/50 font-mono mb-4'>
                      <span className='px-2 py-1 bg-white/5 rounded'>
                        📅 {curso.date}
                      </span>
                      <span className='px-2 py-1 bg-white/5 rounded'>
                        ⏱ {curso.duration}
                      </span>
                      <span className='px-2 py-1 bg-white/5 rounded'>
                        ⏳ {curso.workload}
                      </span>
                    </div>
                    {curso.modules && curso.modules.length > 0 && (
                      <div className='mt-4'>
                        <p className='text-xs text-[var(--cyber-cyan)] font-bold uppercase tracking-wider mb-2'>
                          {t('cursosModal.mainModules')}
                        </p>
                        <ul className='space-y-1'>
                          {curso.modules.slice(0, 3).map((module, idx) => (
                            <li
                              key={idx}
                              className='text-xs text-white/80 flex items-start gap-2' style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}
                            >
                              <span className='text-[var(--cyber-cyan)]'>▸</span>
                              <span>{module}</span>
                            </li>
                          ))}
                          {curso.modules.length > 3 && (
                            <li className='text-xs text-white/40 italic'>
                              {t('cursosModal.moreModules', { count: curso.modules.length - 3 })}
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className='mt-8 pt-6 border-t border-white/10 flex flex-col gap-3'>
                    <a
                      href={curso.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='glass-btn inline-flex items-center justify-center text-sm font-medium rounded-full px-6 py-2'
                    >
                      {t('courses.viewCertificate')}
                    </a>
                    {curso.verificationLink && curso.verificationLink !== '#' && (
                      <a
                        href={curso.verificationLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center justify-center gap-2 text-xs text-[var(--cyber-purple)] hover:text-[var(--cyber-cyan)] transition-colors'
                      >
                        <span>🔗</span>
                        <span>{t('cursoDetailModal.authenticityVerification')}</span>
                      </a>
                    )}
                  </div>
                </m.div>
              ))}
            </div>

            {sortedCursos.length === 0 && (
              <div className='text-center py-20'>
                <p className='text-white/50 text-lg'>{t('courses.noResults')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer da Modal */}
        <div className='sticky bottom-0 z-20 p-6 border-t border-white/10 bg-black/80 backdrop-blur-md'>
          <div className='max-w-7xl mx-auto flex justify-between items-center text-sm text-white/40'>
            <p>{t('cursosModal.totalCourses', { count: sortedCursos.length })}</p>
            <div className='flex items-center gap-4'>
              <p>{t('cursosModal.footerCopyright')}</p>
              <button
                type="button"
                onClick={onClose}
                className='p-2 rounded-lg hover:bg-white/10 transition-colors'
                aria-label={t('common.close')}
              >
                <img src={close} alt='' className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>
      </m.div>
    </AnimatePresence>
  );
};

export default CursosModal;
