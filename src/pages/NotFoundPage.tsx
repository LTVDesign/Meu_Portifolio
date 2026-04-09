import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Lazy load Three.js components to reduce initial bundle size
const NotFoundScene = lazy(() => import('../components/canvas/NotFoundScene'));

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center'>
      {/* 3D Canvas Background - Lazy loaded */}
      <div className='absolute inset-0 z-0'>
        <Suspense fallback={null}>
          <NotFoundScene />
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className='relative z-10 text-center px-6 flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-[clamp(6rem,20vw,12rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] leading-none mb-4'>
          404
        </h1>

        <p
          className='text-white/80 text-lg mt-6 max-w-md mx-auto leading-relaxed'
          style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)' }}
        >
          {t('notFound.description')}
        </p>

        {/* Botão de voltar - posicionado na parte inferior */}
        <div className='mt-auto pb-10'>
          <Link to='/' className='btn-primary inline-flex items-center gap-3 group'>
            <span>{t('notFound.backHome')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
