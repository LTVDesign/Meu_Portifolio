import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import close from '../../assets/close.svg';
import anhangueraImg from '../../assets/anhanguera.svg';
import albertaImg from '../../assets/images/logos/alberta.webp';
import bradescoImg from '../../assets/images/logos/bradesco.webp';
import cateImg from '../../assets/images/logos/cate.webp';
import yonseiImg from '../../assets/images/logos/yonsei.png';
import googleImg from '../../assets/images/logos/google.webp';
import ibmImg from '../../assets/images/logos/ibm.webp';
import johnsImg from '../../assets/images/logos/johns.webp';
import hackersImg from '../../assets/images/logos/hackers.webp';
import skillImg from '../../assets/images/logos/skill.webp';
import ipedImg from '../../assets/images/logos/ipad.webp';
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
      'alberta': albertaImg,
      'bradesco': bradescoImg,
      'cate': cateImg,
      'google': googleImg,
      'ibm': ibmImg,
      'johns': johnsImg,
      'hackers': hackersImg,
      'skill': skillImg,
      'iped': ipedImg,
      'anhanguera': anhangueraImg,
      'yonsei': yonseiImg,
    };

    if (iconName && logoMap[iconName]) {
      return logoMap[iconName];
    }

    const platformLower = platform.toLowerCase();
    if (platformLower.includes('google')) return googleImg;
    if (platformLower.includes('ibm')) return ibmImg;
    if (platformLower.includes('johns')) return johnsImg;
    if (platformLower.includes('bradesco')) return bradescoImg;
    if (platformLower.includes('iped')) return ipedImg;
    if (platformLower.includes('alberta')) return albertaImg;
    if (platformLower.includes('hackers')) return hackersImg;
    if (platformLower.includes('cate')) return cateImg;
    if (platformLower.includes('skill')) return skillImg;
    if (platformLower.includes('anhanguera')) return anhangueraImg;
    if (platformLower.includes('yonsei')) return yonseiImg;

    return googleImg;
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
        <div className='sticky top-0 z-20 flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/80 backdrop-blur-md'>
          <div className='flex items-center gap-4'>
            <h2 id={modalTitleId} className='text-lg sm:text-2xl font-bold text-white'>
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
              <img src={close} alt='' className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div
          ref={modalRef}
          className='flex-1 overflow-y-auto p-4 sm:p-6'
          role='dialog'
          aria-modal='true'
          aria-labelledby={modalTitleId}
          tabIndex={-1}
        >
          <div className='max-w-7xl mx-auto'>
            {/* Barra de Filtros e Organização */}
            <div className='mb-5 sm:mb-8 flex flex-col gap-3 sm:gap-4 items-center justify-between sm:flex-row'>
              <div className='relative w-full sm:w-96'>
                <input
                  type='text'
                  placeholder={t('courses.filterPlaceholder')}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className='w-full px-4 sm:px-6 py-3 pl-10 sm:pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[var(--cyber-cyan)] transition-colors min-h-[44px]'
                  aria-label={t('courses.filterPlaceholder')}
                />
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-white/50'>
                  🔍
                </span>
              </div>

              <div className='flex items-center gap-3 w-full sm:w-auto'>
                <span className='text-white/60 text-sm whitespace-nowrap'>
                  {t('courses.sortBy')}:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'year' | 'duration' | 'company' | 'name')
                  }
                  className='flex-1 sm:flex-none px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--cyber-cyan)] transition-colors min-h-[44px]'
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
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8'>
              {sortedCursos.map((curso, index) => (
                <m.div
                  key={curso.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className='glass-card p-8 neon-hover flex flex-col group border border-white/10'
                >
                  <div className='flex-1'>
                    {/* Header com logotipo */}
                    <div className='flex items-start gap-4 mb-4'>
                      <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--cyber-purple)]/20 border border-white/10 overflow-hidden p-2 sm:p-2.5'>
                        <img
                          src={getLogo(curso.icon, curso.platform)}
                          alt={curso.platform}
                          className='w-full h-full object-contain'
                          style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5))' }}
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between mb-2'>
                          <h3 className='text-xl font-bold text-white group-hover:text-[var(--cyber-cyan)] transition-colors leading-tight'>
                            {curso.title}
                          </h3>
                          {curso.isProfessionalCertificate && (
                            <span className='text-yellow-400 text-sm ml-2 flex-shrink-0'>
                              ★
                            </span>
                          )}
                        </div>
                        <p className='text-[var(--cyber-purple)] font-bold uppercase tracking-widest text-sm'>
                          {curso.platform}
                        </p>
                      </div>
                    </div>

                    <p className='text-[var(--text-secondary)] text-sm leading-relaxed mb-4'>
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
                              className='text-xs text-[var(--text-secondary)] flex items-start gap-2'
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
