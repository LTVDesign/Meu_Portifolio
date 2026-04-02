import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import close from '../../assets/close.svg';
import { SectionWrapper } from '../../hoc';
import anhangueraImg from '../../assets/anhanguera.svg';
import albertaImg from '../../logos/alberta.webp';
import bradescoImg from '../../logos/bradesco.webp';
import cateImg from '../../logos/cate.webp';
import googleImg from '../../logos/google.webp';
import ibmImg from '../../logos/ibm.webp';
import johnsImg from '../../logos/johns.webp';
import hackersImg from '../../logos/hackers.png';
import skillImg from '../../logos/skill.webp';
import ipedImg from '../../logos/ipad.png';
import cursosData from '../../data/cursos.json';
import type { Curso } from '../../types';
import CursoDetailModal from '../atoms/CursoDetailModal';

interface AllCursosProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AllCursos = ({ isOpen = true, onClose = () => { } }: AllCursosProps) => {
  const [filter, setFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [certificateFilter, setCertificateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'year' | 'duration' | 'company' | 'name'>('year');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const { t, i18n } = useTranslation();

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

  const currentLanguage = (i18n.language || 'pt') as keyof typeof cursosData;

  const allCursos: Curso[] = useMemo(() => {
    const cursos = cursosData[currentLanguage] || cursosData.pt;
    return cursos.map((curso) => {
      let iconSrc = googleImg;
      if (curso.icon === 'alberta') iconSrc = albertaImg;
      else if (curso.icon === 'ibm') iconSrc = ibmImg;
      else if (curso.icon === 'anhanguera') iconSrc = anhangueraImg;
      else if (curso.icon === 'cate') iconSrc = cateImg;
      else if (curso.icon === 'johns') iconSrc = johnsImg;
      else if (curso.icon === 'hackers') iconSrc = hackersImg;
      else if (curso.icon === 'bradesco') iconSrc = bradescoImg;
      else if (curso.icon === 'skill') iconSrc = skillImg;
      else if (curso.icon === 'iped') iconSrc = ipedImg;

      return {
        ...curso,
        icon: iconSrc,
      };
    });
  }, [currentLanguage]);

  // Extrair plataformas únicas para o filtro
  const platforms = useMemo(() => {
    const uniquePlatforms = [...new Set(allCursos.map(curso => curso.platform))];
    return uniquePlatforms.sort();
  }, [allCursos]);

  const filteredCursos = allCursos.filter((curso) => {
    // Filtro por texto
    const matchesText =
      curso.title.toLowerCase().includes(filter.toLowerCase()) ||
      curso.platform.toLowerCase().includes(filter.toLowerCase());

    // Filtro por plataforma
    const matchesPlatform = platformFilter === 'all' || curso.platform === platformFilter;

    // Filtro por certificado profissional
    const matchesCertificate =
      certificateFilter === 'all' ||
      (certificateFilter === 'professional' && curso.isProfessionalCertificate) ||
      (certificateFilter === 'regular' && !curso.isProfessionalCertificate);

    return matchesText && matchesPlatform && matchesCertificate;
  });

  const sortedCursos = [...filteredCursos].sort((a, b) => {
    if (sortBy === 'year') {
      return parseInt(b.date) - parseInt(a.date);
    } else if (sortBy === 'company') {
      return a.platform.localeCompare(b.platform);
    } else if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'duration') {
      const extractNumber = (duration: string | undefined): number => {
        if (!duration) return 0;
        const match = duration.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-md'
        role='presentation'
      >
        {/* Header da Modal - Botão Fechar no Topo */}
        <div className='sticky top-0 z-30 flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/90 backdrop-blur-xl'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--cyber-purple)] to-[var(--cyber-cyan)] flex items-center justify-center'>
              <span className='text-white text-lg sm:text-xl'>📚</span>
            </div>
            <div>
              <h2 id={modalTitleId} className='text-xl sm:text-2xl font-bold text-white'>
                {t('courses.allTitle')}
              </h2>
              <p className='text-xs sm:text-sm text-white/60 mt-1'>
                {t(sortedCursos.length === 1 ? 'allCursos.coursesAvailable' : 'allCursos.coursesAvailable_plural', { count: sortedCursos.length })}
              </p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className='p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20'
            aria-label={t('common.close')}
          >
            <img src={close} alt='' className='w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert' />
          </motion.button>
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
            <div className='mb-8 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm'>
              <div className='flex flex-col lg:flex-row gap-4 sm:gap-6'>
                {/* Busca por texto */}
                <div className='flex-1'>
                  <label className='block text-xs sm:text-sm font-medium text-white/80 mb-2'>
                    {t('allCursos.searchCourses')}
                  </label>
                  <input
                    type='text'
                    placeholder={t('allCursos.searchPlaceholder')}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className='w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[var(--cyber-cyan)] focus:ring-2 focus:ring-[var(--cyber-cyan)]/20 transition-all text-sm sm:text-base'
                    aria-label={t('allCursos.searchCourses')}
                  />
                </div>

                {/* Filtro por Plataforma */}
                <div className='w-full lg:w-48'>
                  <label className='block text-xs sm:text-sm font-medium text-white/80 mb-2'>
                    {t('allCursos.filterByPlatform')}
                  </label>
                  <select
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value)}
                    className='w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--cyber-cyan)] focus:ring-2 focus:ring-[var(--cyber-cyan)]/20 transition-all text-sm sm:text-base'
                    aria-label='Filtrar por plataforma'
                  >
                    <option value='all'>{t('allCursos.allPlatforms')}</option>
                    {platforms.map((platform) => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>

                {/* Filtro por Tipo de Certificado */}
                <div className='w-full lg:w-48'>
                  <label className='block text-xs sm:text-sm font-medium text-white/80 mb-2'>
                    {t('allCursos.filterByCertificate')}
                  </label>
                  <select
                    value={certificateFilter}
                    onChange={(e) => setCertificateFilter(e.target.value)}
                    className='w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--cyber-cyan)] focus:ring-2 focus:ring-[var(--cyber-cyan)]/20 transition-all text-sm sm:text-base'
                    aria-label='Filtrar por tipo de certificado'
                  >
                    <option value='all'>{t('allCursos.allTypes')}</option>
                    <option value='professional'>{t('allCursos.professionalCertificate')}</option>
                    <option value='regular'>{t('allCursos.regularCertificate')}</option>
                  </select>
                </div>

                {/* Ordenação */}
                <div className='w-full lg:w-48'>
                  <label className='block text-xs sm:text-sm font-medium text-white/80 mb-2'>
                    {t('allCursos.sortBy')}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as 'year' | 'duration' | 'company' | 'name')
                    }
                    className='w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--cyber-cyan)] focus:ring-2 focus:ring-[var(--cyber-cyan)]/20 transition-all text-sm sm:text-base'
                    aria-label='Ordenar cursos'
                  >
                    <option value='year'>{t('allCursos.mostRecent')}</option>
                    <option value='name'>{t('allCursos.nameAZ')}</option>
                    <option value='company'>{t('allCursos.platform')}</option>
                    <option value='duration'>{t('allCursos.duration')}</option>
                  </select>
                </div>
              </div>

              {/* Filtros ativos */}
              {(filter || platformFilter !== 'all' || certificateFilter !== 'all') && (
                <div className='mt-4 pt-4 border-t border-white/10'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <span className='text-xs text-white/60'>{t('allCursos.activeFilters')}</span>
                    {filter && (
                      <span className='px-3 py-1 rounded-full bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)] text-xs font-medium'>
                        {t('allCursos.searchFilter', { filter })}
                      </span>
                    )}
                    {platformFilter !== 'all' && (
                      <span className='px-3 py-1 rounded-full bg-[var(--cyber-purple)]/20 text-[var(--cyber-purple)] text-xs font-medium'>
                        {platformFilter}
                      </span>
                    )}
                    {certificateFilter !== 'all' && (
                      <span className='px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium'>
                        {certificateFilter === 'professional' ? t('allCursos.professionalCertificate') : t('allCursos.regularCertificate')}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setFilter('');
                        setPlatformFilter('all');
                        setCertificateFilter('all');
                      }}
                      className='px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors'
                    >
                      {t('allCursos.clearFilters')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Grid de Cursos - Design igual à página inicial */}
            {sortedCursos.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 md:gap-10'>
                {sortedCursos.map((curso, index) => (
                  <motion.div
                    key={curso.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className='glass-card p-5 sm:p-8 md:p-10 group neon-hover flex flex-col h-full border border-white/10 cursor-pointer'
                    onClick={() => {
                      setSelectedCurso(curso);
                      setIsDetailOpen(true);
                    }}
                    role='button'
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCurso(curso);
                        setIsDetailOpen(true);
                      }
                    }}
                    aria-label={`Ver detalhes do curso ${curso.title}`}
                  >
                    <div className='flex items-center gap-4 sm:gap-6 mb-5 sm:mb-8'>
                      <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[var(--cyber-purple)]/20 to-[var(--cyber-cyan)]/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/5 transition-transform group-hover:scale-110 overflow-hidden p-2'>
                        <img
                          src={curso.icon}
                          alt={curso.platform}
                          className='w-full h-full object-contain'
                          style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' }}
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-base sm:text-xl font-black text-white group-hover:text-[var(--cyber-cyan)] transition-colors leading-tight'>
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

                    <p className='text-[var(--text-secondary)] text-sm flex-1 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity'>
                      {curso.summary}
                    </p>

                    <div className='mt-6 sm:mt-10 pt-5 sm:pt-8 border-t border-white/5 flex items-center justify-center'>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCurso(curso);
                          setIsDetailOpen(true);
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -3,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className='relative px-5 sm:px-8 py-3 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-2xl bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] backdrop-blur-sm group/btn flex items-center gap-2 sm:gap-3 shadow-[0_4px_15px_rgba(0,255,255,0.2)] transition-all duration-300 overflow-hidden min-h-[44px] btn-glow'
                      >
                        <motion.div
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
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className='text-center py-16 sm:py-20'>
                <div className='w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center'>
                  <span className='text-3xl sm:text-4xl'>🔍</span>
                </div>
                <p className='text-white/50 text-base sm:text-lg mb-2'>{t('allCursos.noCoursesFound')}</p>
                <p className='text-white/30 text-sm'>{t('allCursos.adjustFilters')}</p>
              </div>
            )}

            {/* Estatísticas no final da lista */}
            {sortedCursos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[var(--cyber-purple)]/10 to-[var(--cyber-cyan)]/10 border border-white/10'
              >
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-center'>
                  <div>
                    <div className='text-2xl sm:text-3xl font-bold text-[var(--cyber-cyan)]'>
                      {sortedCursos.length}
                    </div>
                    <div className='text-xs sm:text-sm text-white/60 mt-1'>
                      {t('allCursos.totalCoursesLabel')}
                    </div>
                  </div>
                  <div>
                    <div className='text-2xl sm:text-3xl font-bold text-[var(--cyber-purple)]'>
                      {sortedCursos.filter(c => c.isProfessionalCertificate).length}
                    </div>
                    <div className='text-xs sm:text-sm text-white/60 mt-1'>
                      {t('allCursos.professionalCertificates')}
                    </div>
                  </div>
                  <div>
                    <div className='text-2xl sm:text-3xl font-bold text-yellow-400'>
                      {platforms.length}
                    </div>
                    <div className='text-xs sm:text-sm text-white/60 mt-1'>
                      {t('allCursos.platforms')}
                    </div>
                  </div>
                  <div>
                    <div className='text-2xl sm:text-3xl font-bold text-green-400'>
                      {new Set(sortedCursos.map(c => c.date)).size}
                    </div>
                    <div className='text-xs sm:text-sm text-white/60 mt-1'>
                      {t('allCursos.differentYears')}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer da Modal */}
        <div className='sticky bottom-0 z-20 p-4 sm:p-6 border-t border-white/10 bg-black/90 backdrop-blur-xl'>
          <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4'>
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='text-xs sm:text-sm text-white/50'>
                {t('allCursos.footerTotalCourses', { count: sortedCursos.length })}
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <p className='text-xs text-white/40'>{t('allCursos.footerCopyright')}</p>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-cyan)] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-[var(--cyber-cyan)]/30 transition-all duration-300 flex items-center gap-2 min-h-[44px]'
                aria-label={t('common.close')}
              >
                <img src={close} alt='' className='w-4 h-4' />
                <span>{t('common.close')}</span>
              </motion.button>
            </div>
          </div>
        </div>

        <CursoDetailModal
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedCurso(null);
          }}
          curso={selectedCurso}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SectionWrapper(AllCursos, 'allcourses');