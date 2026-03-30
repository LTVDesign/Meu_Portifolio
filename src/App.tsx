import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Suspense, lazy, useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { ParticleConfigProvider } from './contexts/ParticleConfigContext';
import { DynamicTextProvider } from './components/atoms/DynamicTextProvider';
import { useKonamiCode } from './hooks/useKonamiCode';
import './i18n';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ThemeToggle from './components/layout/ThemeToggle';

// Error Boundary
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-red-900/90 z-50 text-white p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4">Erro na aplicação</h1>
            <pre className="text-sm bg-black/30 p-4 rounded overflow-auto max-w-full">{this.state.error?.toString()}</pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lazy loading por página inteira (code splitting eficiente)
const HomePage = lazy(() => {
  return import('./pages/HomePage').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});
const FormacaoPage = lazy(() => {
  return import('./pages/FormacaoPage').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});
const CursosPage = lazy(() => {
  return import('./pages/CursosPage').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});
const ExperiencePage = lazy(() => {
  return import('./pages/ExperiencePage').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});
const ContactPage = lazy(() => {
  return import('./pages/ContactPage').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});
const CertificadosPage = lazy(() => {
  return import('./pages/CertificadosPage').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});
const DoomPage = lazy(() => {
  return import('./pages/DoomPage').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});
const DynamicTextDemoPage = lazy(() => {
  return import('./pages/DynamicTextDemoPage').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});
const NotFoundPage = lazy(() => {
  return import('./pages/NotFoundPage').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});

// Lazy load BackgroundManager with Three.js - only load when needed
const BackgroundManager = lazy(() => {
  return import('./components/canvas/BackgroundManager').then(module => {
    return module;
  }).catch(error => {
    throw error;
  });
});

const App = () => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    console.log('[App] App montando');

    // Listener para erros não capturados
    const errorHandler = (event: ErrorEvent) => {
      console.error('[App] Erro global capturado:', event.error);
    };
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      console.error('[App] Promise rejeitada:', event.reason);
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    const backgroundTimer = setTimeout(() => {
      setBackgroundLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(backgroundTimer);
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  useKonamiCode();

  return (
    <HelmetProvider>
      <PerformanceProvider>
        <ParticleConfigProvider>
          <DynamicTextProvider
            defaultColorMode="auto"
            defaultTransitionDuration={400}
            fallbackMode="auto"
          >
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              {backgroundLoaded && (
                <Suspense fallback={<div className="fixed inset-0 z-[-1] bg-[#050816]" />}>
                  <BackgroundManager />
                </Suspense>
              )}

              <Navbar />
              <ThemeToggle />

              <main className="relative" style={{ minHeight: '100vh' }}>
                <ErrorBoundary>
                  <Suspense fallback={
                    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-4 py-2 rounded shadow-lg">
                      Carregando...
                    </div>
                  }>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/formacao" element={<FormacaoPage />} />
                      <Route path="/projetos" element={<ExperiencePage />} />
                      <Route path="/cursos" element={<CursosPage />} />
                      <Route path="/certificados" element={<CertificadosPage />} />
                      <Route path="/contato" element={<ContactPage />} />
                      <Route path="/doom" element={<DoomPage />} />
                      <Route path="/dynamic-text-demo" element={<DynamicTextDemoPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>

              <Footer />
            </Router>
          </DynamicTextProvider>
        </ParticleConfigProvider>
      </PerformanceProvider>
    </HelmetProvider>
  );
};

export default App;
