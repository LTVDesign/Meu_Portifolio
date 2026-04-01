import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const DoomPage = () => {
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
        <title>DOOM - Leandro Barbosa</title>
        <meta name='description' content='DOOM rodando no navegador - Easter Egg' />
      </Helmet>

      <div className='relative w-full h-screen overflow-hidden bg-black'>
        <iframe
          src='/doom/index.html'
          className='w-full h-full border-0'
          title='DOOM Game'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    </>
  );
};

export default DoomPage;
