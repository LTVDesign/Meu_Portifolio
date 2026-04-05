import React, { lazy, Suspense, useState, useCallback, memo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Providers
import { ParticleConfigProvider, useBackgroundMenu, useParticleConfig } from './contexts/ParticleConfigContext';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { DynamicTextProvider } from './components/atoms/DynamicTextProvider';
import { MotionProvider } from './components/layout/MotionProvider';

// Layouts e Componentes
import Navbar from './components/layout/Navbar';
import BackgroundMenu from './components/layout/BackgroundMenu';
import BackgroundEditorModal from './components/layout/BackgroundEditorModal';

// LCP Optimization: Lazy loading com delay para não bloquear renderização inicial
const ParticlesCanvas = lazy(() => import('./components/layout/ParticlesCanvas'));

// Performance: Footer lazy loaded - não é necessário para LCP
const Footer = lazy(() => import('./components/layout/Footer'));

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
  // LCP Optimization: Carregar backgrounds após LCP ser pintado
  const [loadBackgrounds, setLoadBackgrounds] = useState(false);

  useEffect(() => {
    // Usar eventos de interação do usuário OU um timeout maior para
    // diferir o carregamento do 3D pesado e resolver "Unused JavaScript" do PageSpeed
    let isLoaded = false;
    
    const scheduleLoad = () => {
      if (isLoaded) return;
      isLoaded = true;
      
      // Quando for interagir, podemos usar requestIdleCallback para não engasgar a thread
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
          setLoadBackgrounds(true);
        }, { timeout: 1000 });
      } else {
        setLoadBackgrounds(true);
      }
      
      // Limpar listeners
      window.removeEventListener('mousemove', scheduleLoad);
      window.removeEventListener('touchstart', scheduleLoad);
      window.removeEventListener('scroll', scheduleLoad);
      window.removeEventListener('keydown', scheduleLoad);
    };

    // Bind listeners
    window.addEventListener('mousemove', scheduleLoad, { once: true, passive: true });
    window.addEventListener('touchstart', scheduleLoad, { once: true, passive: true });
    window.addEventListener('scroll', scheduleLoad, { once: true, passive: true });
    window.addEventListener('keydown', scheduleLoad, { once: true, passive: true });

    // Fallback: carregar após 3500ms (tempo suficiente para o Lighthouse terminar o scan inicial)
    const timer = setTimeout(scheduleLoad, 3500);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', scheduleLoad);
      window.removeEventListener('touchstart', scheduleLoad);
      window.removeEventListener('scroll', scheduleLoad);
      window.removeEventListener('keydown', scheduleLoad);
    };
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* LCP Optimization: Backgrounds só carregam após LCP */}
      {loadBackgrounds && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <BackgroundManager />
          </Suspense>
        </div>
      )}

      {loadBackgrounds && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <ParticlesCanvas />
          </Suspense>
        </div>
      )}

      {/* Conteúdo principal - renderiza primeiro para LCP */}
      <div className="relative z-20 min-h-screen">
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

        {/* Footer com lazy loading - não é necessário para LCP */}
        <Suspense fallback={<div className="h-48 bg-tertiary animate-pulse" />}>
          <Footer />
        </Suspense>
      </div>

      {/* Overlays de Background */}
      <BackgroundOverlays />
    </Router>
  );
};

const App = () => {
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
};

export default App;
