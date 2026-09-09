import React, { memo, useCallback, useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async';
// import { SpeedInsights } from '@vercel/speed-insights/react';
import { I18nextProvider } from 'react-i18next';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DynamicTextProvider } from './components/atoms/DynamicTextProvider';
// Componentes não-críticos para LCP — lazy-loaded para reduzir JS inicial
const BackgroundManager = React.lazy(() => import('./components/canvas/BackgroundManager'));
const BackgroundEditorModal = React.lazy(() => import('./components/layout/BackgroundEditorModal'));
const BackgroundMenu = React.lazy(() => import('./components/layout/BackgroundMenu'));
const Footer = React.lazy(() => import('./components/layout/Footer'));
const GearButton = React.lazy(() => import('./components/layout/GearButton'));
import { MotionProvider } from './components/layout/MotionProvider';
// Layouts e Componentes - Navbar é crítico para LCP
import Navbar from './components/layout/Navbar';
const ParticlesCanvas = React.lazy(() => import('./components/layout/ParticlesCanvas'));
// Providers
import {
  ParticleConfigProvider,
  useBackgroundMenu,
  useParticleConfig,
} from './contexts/ParticleConfigContext';
import { PerformanceProvider } from './contexts/PerformanceContext';
import i18n from './i18n';
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CursosPage = React.lazy(() => import('./pages/CursosPage'));
const DoomPage = React.lazy(() => import('./pages/DoomPage'));
const DynamicTextDemoPage = React.lazy(() => import('./pages/DynamicTextDemoPage'));
const ExperiencePage = React.lazy(() => import('./pages/ExperiencePage'));
const FormacaoPage = React.lazy(() => import('./pages/FormacaoPage'));
import HomePage from './pages/HomePage'; // Síncrono para LCP
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const OnlineResume = React.lazy(() => import('./pages/OnlineResume'));

// Simple Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-red-950 text-white p-8'>
          <div className='max-w-2xl text-center'>
            <h1 className='text-3xl font-bold mb-4'>Algo deu errado</h1>
            <pre className='bg-black/50 p-6 rounded-xl text-left overflow-auto text-sm mb-6'>
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              aria-label='Recarregar página após erro'
              className='px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors'
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Componente para os Overlays de Background para evitar re-renders desnecessários no AppContent
const BackgroundOverlays = memo(() => {
  const { isBgMenuOpen, closeBgMenu } = useBackgroundMenu();
  const { config } = useParticleConfig();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleOpenEditor = useCallback(() => {
    closeBgMenu();
    setIsEditorOpen(true);
  }, [closeBgMenu]);

  const handleCloseEditor = useCallback(() => {
    setIsEditorOpen(false);
  }, []);

  return (
    <>
      {isBgMenuOpen && <BackgroundMenu onEdit={handleOpenEditor} onClose={closeBgMenu} />}

      <BackgroundEditorModal
        isOpen={isEditorOpen}
        selectedBg={config.backgroundType}
        onClose={handleCloseEditor}
      />
    </>
  );
});

BackgroundOverlays.displayName = 'BackgroundOverlays';

const AppContent = () => {
  // LCP Optimization: Carregar backgrounds após LCP ser pintado
  const [loadBackgrounds, setLoadBackgrounds] = useState(false);
  const { openBgMenu } = useBackgroundMenu();

  useEffect(() => {
    // Adia o carregamento do 3D (canvas) para liberar a thread na hora de renderizar o LCP do texto
    const timer = setTimeout(() => {
      setLoadBackgrounds(true);
    }, 1000); // 1s após a montagem é seguro para o LCP pintar.
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* LCP Optimization: Backgrounds só carregam após LCP */}
      {loadBackgrounds && (
        <React.Suspense fallback={null}>
          <div className='fixed inset-0 z-0 pointer-events-none'>
            <BackgroundManager />
          </div>
        </React.Suspense>
      )}

      {loadBackgrounds && (
        <React.Suspense fallback={null}>
          <div className='fixed inset-0 z-[1] pointer-events-none'>
            <ParticlesCanvas />
          </div>
        </React.Suspense>
      )}

      {/* Conteúdo principal - renderiza primeiro para LCP */}
      <div className='relative z-20 min-h-screen flex flex-col'>
        <style>
          {`
            /* Corrige bug scroll página cursos */
            html, body {
              overflow-y: auto !important;
              height: auto !important;
            }
          `}
        </style>
        <Navbar />
        <React.Suspense fallback={null}>
          <GearButton onClick={openBgMenu} />
        </React.Suspense>

        <main className='relative z-10 flex-1 w-[min(100%,_var(--max-width,100vw))] mx-auto'>
          <ErrorBoundary>
            <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black">
              <div className="w-12 h-12 border-4 border-[var(--cyber-purple)]/30 border-t-[var(--cyber-cyan)] rounded-full animate-spin" />
            </div>}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/formacao' element={<FormacaoPage />} />
                <Route path='/projetos' element={<ExperiencePage />} />
                <Route path='/cursos' element={<CursosPage />} />
                <Route path='/contato' element={<ContactPage />} />
                <Route path='/doom' element={<DoomPage />} />
                <Route path='/dynamic-text-demo' element={<DynamicTextDemoPage />} />
                <Route path='/online-cv' element={<OnlineResume />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </React.Suspense>
          </ErrorBoundary>
        </main>

        {/* Footer lazy-loaded — não é crítico para LCP */}
        <React.Suspense fallback={<div className="h-20" />}>
          <Footer />
        </React.Suspense>
      </div>

      {/* Overlays de Background */}
      <React.Suspense fallback={null}>
        <BackgroundOverlays />
      </React.Suspense>
    </Router>
  );
};

function App() {
  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <ParticleConfigProvider>
          <PerformanceProvider>
            <DynamicTextProvider>
              <MotionProvider>
                <AppContent />
              </MotionProvider>
            </DynamicTextProvider>
          </PerformanceProvider>

          {/* <SpeedInsights /> */}
          <Analytics />
        </ParticleConfigProvider>
      </I18nextProvider>
    </HelmetProvider>
  );
}

export default App;
