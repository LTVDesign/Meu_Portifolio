import React, { useState, useCallback, memo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Providers
import { ParticleConfigProvider, useBackgroundMenu, useParticleConfig } from './contexts/ParticleConfigContext';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { MotionProvider } from './components/layout/MotionProvider';
import { DynamicTextProvider } from './components/atoms/DynamicTextProvider';

// Layouts e Componentes
import Navbar from './components/layout/Navbar';
import BackgroundMenu from './components/layout/BackgroundMenu';
import BackgroundEditorModal from './components/layout/BackgroundEditorModal';
import ParticlesCanvas from './components/layout/ParticlesCanvas';
import Footer from './components/layout/Footer';

// Componentes Síncronos (Restauração de Estabilidade)
import BackgroundManager from './components/canvas/BackgroundManager';
import HomePage from './pages/HomePage';
import FormacaoPage from './pages/FormacaoPage';
import ExperiencePage from './pages/ExperiencePage';
import CursosPage from './pages/CursosPage';
import ContactPage from './pages/ContactPage';
import DoomPage from './pages/DoomPage';
import DynamicTextDemoPage from './pages/DynamicTextDemoPage';
import OnlineResume from './pages/OnlineResume';
import NotFoundPage from './pages/NotFoundPage';

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
    // Carregar backgrounds imediatamente
    setLoadBackgrounds(true);
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* LCP Optimization: Backgrounds só carregam após LCP */}
      {loadBackgrounds && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundManager />
        </div>
      )}

      {loadBackgrounds && (
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <ParticlesCanvas />
        </div>
      )}

      {/* Conteúdo principal - renderiza primeiro para LCP */}
      <div className="relative z-20 min-h-screen flex flex-col">
        <Navbar />

        <main className="relative z-10 flex-1 w-[min(100%,_var(--max-width,100vw))] mx-auto">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/formacao" element={<FormacaoPage />} />
              <Route path="/projetos" element={<ExperiencePage />} />
              <Route path="/cursos" element={<CursosPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/doom" element={<DoomPage />} />
              <Route path="/dynamic-text-demo" element={<DynamicTextDemoPage />} />
              <Route path="/online-cv" element={<OnlineResume />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </main>

        {/* Footer síncrono para estabilidade */}
        <Footer />
      </div>

      {/* Overlays de Background */}
      <BackgroundOverlays />
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

          <SpeedInsights />
        </ParticleConfigProvider>
      </I18nextProvider>
    </HelmetProvider>
  );
};

export default App;
