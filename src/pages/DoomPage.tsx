import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const DoomPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Impedir scroll quando o DOOM estiver carregado
    const handleScroll = (e: Event) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('doom.title')}</title>
        <meta name='description' content={t('doom.description')} />
      </Helmet>

      <div className='relative w-full h-screen overflow-hidden bg-black'>
        <iframe
          src='/doom/index.html'
          className='w-full h-full border-0'
          title={t('doom.gameTitle')}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    </>
  );
};

export default DoomPage;
