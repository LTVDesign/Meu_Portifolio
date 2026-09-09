import { Analytics } from '@vercel/analytics/react';
import React, { memo, useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { DynamicTextProvider } from './components/atoms/DynamicTextProvider';
import { MotionProvider } from './components/layout/MotionProvider';

// Lazy-loaded components
const BackgroundManager = React.lazy(
  () => import('./components/canvas/BackgroundManager')
);
const BackgroundEditorModal = React.lazy(
  () => import('./components/layout/BackgroundEditorModal')
);
const BackgroundMenu = React.lazy(() => import('./components/layout/BackgroundMenu'));
const CustomCursor = React.lazy(() => import('./components/layout/CustomCursor'));
const Footer = React.lazy(() => import('./components/layout/Footer'));
const GearButton = React.lazy(() => import('./components/layout/GearButton'));
const PageTransition = React.lazy(() => import('./components/layout/PageTransition'));
const ParticlesCanvas = React.lazy(() => import('./components/layout/ParticlesCanvas'));

// Pages
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';

const CaseStudyPage = React.lazy(() => import('./pages/CaseStudyPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CursosPage = React.lazy(() => import('./pages/CursosPage'));
const DoomPage = React.lazy(() => import('./pages/DoomPage'));
const DynamicTextDemoPage = React.lazy(() => import('./pages/DynamicTextDemoPage'));
const ExperiencePage = React.lazy(() => import('./pages/ExperiencePage'));
const FormacaoPage = React.lazy(() => import('./pages/FormacaoPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const OnlineResume = React.lazy(() => import('./pages/OnlineResume'));

// Providers
import {
  ParticleConfigProvider,
  useBackgroundMenu,
  useParticleConfig,
} from './contexts/ParticleConfigContext';
import { PerformanceProvider } from './contexts/PerformanceContext';
import i18n from './i18n';

// Error Boundary
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
    console.error('ErrorBoundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-black text-white p-8'>
          <div className='max-w-2xl text-center'>
            <h1 className='text-3xl font-bold mb-4'>Algo deu errado</h1>
            <pre className='bg-white/5 p-6 rounded-xl text-left overflow-auto text-sm mb-6 border border-white/10'>
              {this.state.error?.toString()}
            </pre>
            <button
              type='button'
              onClick={() => window.location.reload()}
              className='px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors'
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Background overlays
const BackgroundOverlays = memo(() => {
  const { isBgMenuOpen, closeBgMenu } = useBackgroundMenu();
  const { config } = useParticleConfig();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <>
      {isBgMenuOpen && (
        <BackgroundMenu
          onEdit={() => {
            closeBgMenu();
            setIsEditorOpen(true);
          }}
          onClose={closeBgMenu}
        />
      )}
      <BackgroundEditorModal
        isOpen={isEditorOpen}
        selectedBg={config.backgroundType}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
});
BackgroundOverlays.displayName = 'BackgroundOverlays';

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <React.Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-black'>
          <div className='w-10 h-10 border-2 border-white/10 border-t-[var(--cyber-cyan)] rounded-full animate-spin' />
        </div>
      }
    >
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path='/' element={<HomePage />} />
          <Route path='/projetos/:id' element={<CaseStudyPage />} />
          <Route path='/formacao' element={<FormacaoPage />} />
          <Route path='/projetos' element={<ExperiencePage />} />
          <Route path='/cursos' element={<CursosPage />} />
          <Route path='/contato' element={<ContactPage />} />
          <Route path='/doom' element={<DoomPage />} />
          <Route path='/dynamic-text-demo' element={<DynamicTextDemoPage />} />
          <Route path='/online-cv' element={<OnlineResume />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </PageTransition>
    </React.Suspense>
  );
};

const AppContent = () => {
  const [loadBackgrounds, setLoadBackgrounds] = useState(false);
  const { openBgMenu } = useBackgroundMenu();

  useEffect(() => {
    const timer = setTimeout(() => setLoadBackgrounds(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Custom Cursor */}
      <React.Suspense fallback={null}>
        <CustomCursor />
      </React.Suspense>

      {/* Backgrounds */}
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

      {/* Content */}
      <div className='relative z-20 min-h-screen flex flex-col'>
        <Navbar />
        <React.Suspense fallback={null}>
          <GearButton onClick={openBgMenu} />
        </React.Suspense>

        <main className='relative z-10 flex-1 w-[min(100%,var(--max-width,100vw))] mx-auto'>
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </main>

        <React.Suspense fallback={<div className='h-20' />}>
          <Footer />
        </React.Suspense>
      </div>

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
          <Analytics />
        </ParticleConfigProvider>
      </I18nextProvider>
    </HelmetProvider>
  );
}

export default App;
