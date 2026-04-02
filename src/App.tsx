import React, { lazy, Suspense, useState, useCallback, memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LazyMotion, domAnimation } from "framer-motion";
// import * as m from "motion/react-m"; // O projeto já usa 'm' de 'framer-motion'

// Providers
import { ParticleConfigProvider, useBackgroundMenu, useParticleConfig } from './contexts/ParticleConfigContext';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { DynamicTextProvider } from './components/atoms/DynamicTextProvider';
import { MotionProvider } from './components/layout/MotionProvider';

// Layouts e Componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackgroundMenu from './components/layout/BackgroundMenu';
import BackgroundEditorModal from './components/layout/BackgroundEditorModal';
const ParticlesCanvas = lazy(() => import('./components/layout/ParticlesCanvas'));

// Lazy Loading (melhor performance)
const BackgroundManager = lazy(() => import('./components/canvas/BackgroundManager'));
const HomePage = lazy(() => import('./pages/HomePage'));
const FormacaoPage = lazy(() => import('./pages/FormacaoPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const CursosPage = lazy(() => import('./pages/CursosPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DoomPage = lazy(() => import('./pages/DoomPage'));
const DynamicTextDemoPage = lazy(() => import('./pages/DynamicTextDemoPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
        <div className="min-h-screen flex items-center justify-center bg-red-950 text-white p-8">
          <div className="max-w-2xl text-center">
            <h1 className="text-3xl font-bold mb-4">Algo deu errado</h1>
            <pre className="bg-black/50 p-6 rounded-xl text-left overflow-auto text-sm mb-6">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
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
      {isBgMenuOpen && (
        <BackgroundMenu
          onEdit={handleOpenEditor}
          onClose={closeBgMenu}
        />
      )}

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
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Background 3D - Sempre atrás */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <BackgroundManager />
        </Suspense>
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <ParticlesCanvas />
        </Suspense>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen">
        <Navbar />

        <main className="relative z-10">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[70vh]">
                  <div className="text-white/60 text-lg">Carregando conteúdo...</div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/formacao" element={<FormacaoPage />} />
                <Route path="/projetos" element={<ExperiencePage />} />
                <Route path="/cursos" element={<CursosPage />} />
                <Route path="/contato" element={<ContactPage />} />
                <Route path="/doom" element={<DoomPage />} />
                <Route path="/dynamic-text-demo" element={<DynamicTextDemoPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>

      {/* Overlays de Background */}
      <BackgroundOverlays />
    </Router>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation} strict>
        <ParticleConfigProvider>
          <PerformanceProvider>
            <MotionProvider>
              <DynamicTextProvider defaultColorMode="auto">
                <AppContent />
              </DynamicTextProvider>
            </MotionProvider>
          </PerformanceProvider>

          <SpeedInsights />
        </ParticleConfigProvider>
      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;
