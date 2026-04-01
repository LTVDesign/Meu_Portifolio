import { AnimatePresence } from 'framer-motion';
import React, { lazy, Suspense, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DynamicTextProvider } from './components/atoms/DynamicTextProvider';
import { MotionProvider } from './components/layout/MotionProvider';
import {
  ParticleConfigProvider,
  useBackgroundMenu,
  useParticleConfig,
} from './contexts/ParticleConfigContext';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { useKonamiCode } from './hooks/useKonamiCode';

// i18n carregado sob demanda para reduzir bundle initial

import BackgroundEditorModal from './components/layout/BackgroundEditorModal';
import BackgroundMenu from './components/layout/BackgroundMenu';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import ParticlesCanvas from './components/layout/ParticlesCanvas';

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
              type="button"
              onClick={() => window.location.reload()}
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

// Lazy Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const FormacaoPage = lazy(() => import('./pages/FormacaoPage'));
const CursosPage = lazy(() => import('./pages/CursosPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CertificadosPage = lazy(() => import('./pages/CertificadosPage'));
const DoomPage = lazy(() => import('./pages/DoomPage'));
const DynamicTextDemoPage = lazy(() => import('./pages/DynamicTextDemoPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lazy Background
const BackgroundManager = lazy(() => import('./components/canvas/BackgroundManager'));

const AppContent = () => {
  const [backgroundLoaded] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedBgForEditor, setSelectedBgForEditor] = useState<string>('particles');

  const { config } = useParticleConfig();
  const { isBgMenuOpen, closeBgMenu } = useBackgroundMenu();

  useKonamiCode();

  const handleCloseMenu = () => {
    closeBgMenu();
  };

  const handleOpenEditor = (bgType?: string) => {
    // Se não for fornecido um bgType, usa o backgroundType atual da configuração
    const bg = bgType || config.backgroundType;
    setSelectedBgForEditor(bg);
    setIsEditorOpen(true);
    closeBgMenu();
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
  };

  return (
    <HelmetProvider>
      <PerformanceProvider>
        <MotionProvider>
          <DynamicTextProvider defaultColorMode='auto'>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              {/* BACKGROUND 3D - sempre atrás */}
              <div className='fixed inset-0 z-0 pointer-events-none'>
                {backgroundLoaded && (
                  <Suspense fallback={null}>
                    <BackgroundManager />
                  </Suspense>
                )}
              </div>

              {/* Canvas de partículas - sempre atrás */}
              <div className='fixed inset-0 z-0 pointer-events-none'>
                <ParticlesCanvas />
              </div>

              {/* CONTEÚDO - sempre na frente */}
              <div className='relative z-10'>
                <Navbar />

                <main className='relative z-10 min-h-screen' data-content='true'>
                  <ErrorBoundary>
                    <Suspense
                      fallback={
                        <div className='flex items-center justify-center min-h-[70vh]'>
                          <div className='text-white/60 text-lg'>
                            Carregando conteúdo...
                          </div>
                        </div>
                      }
                    >
                      <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/formacao' element={<FormacaoPage />} />
                        <Route path='/projetos' element={<ExperiencePage />} />
                        <Route path='/cursos' element={<CursosPage />} />
                        <Route path='/certificados' element={<CertificadosPage />} />
                        <Route path='/contato' element={<ContactPage />} />
                        <Route path='/doom' element={<DoomPage />} />
                        <Route
                          path='/dynamic-text-demo'
                          element={<DynamicTextDemoPage />}
                        />
                        <Route path='*' element={<NotFoundPage />} />
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
                </main>

                <Footer />
              </div>

              <AnimatePresence>
                {isBgMenuOpen && (
                  <BackgroundMenu onEdit={handleOpenEditor} onClose={handleCloseMenu} />
                )}
              </AnimatePresence>

              <BackgroundEditorModal
                isOpen={isEditorOpen}
                selectedBg={selectedBgForEditor}
                onClose={handleCloseEditor}
              />
            </Router>
          </DynamicTextProvider>
        </MotionProvider>
      </PerformanceProvider>
    </HelmetProvider>
  );
};

const App = () => {
  return (
    <ParticleConfigProvider>
      <AppContent />
    </ParticleConfigProvider>
  );
};

export default App;
