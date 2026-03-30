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
import MotionLoader from './components/layout/MotionLoader';

// Lazy loading por página inteira (code splitting eficiente)
const HomePage = lazy(() => import('./pages/HomePage'));
const FormacaoPage = lazy(() => import('./pages/FormacaoPage'));
const CursosPage = lazy(() => import('./pages/CursosPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CertificadosPage = lazy(() => import('./pages/CertificadosPage'));
const DoomPage = lazy(() => import('./pages/DoomPage'));
const DynamicTextDemoPage = lazy(() => import('./pages/DynamicTextDemoPage'));

// Lazy load BackgroundManager with Three.js - only load when needed
const BackgroundManager = lazy(() => import('./components/canvas/BackgroundManager'));

const App = () => {
  console.log('App: Rendering...');
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    // Delay loading of background until after initial paint and user interaction
    const backgroundTimer = setTimeout(() => {
      setBackgroundLoaded(true);
    }, 1000); // Increased delay to reduce main thread work

    return () => {
      clearTimeout(backgroundTimer);
    };
  }, []);

  // Easter Egg: Konami Code (funciona em qualquer página)
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
            <Router>
              {/* Sistema dinâmico de backgrounds - loaded after initial paint */}
              {backgroundLoaded && (
                <Suspense fallback={<div className="fixed inset-0 z-[-1] bg-[#050816]" />}>
                  <BackgroundManager />
                </Suspense>
              )}

              <Navbar />
              <ThemeToggle />

              <main className="relative" style={{ minHeight: '100vh' }}>
                <Suspense fallback={<MotionLoader isSection={false} />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/formacao" element={<FormacaoPage />} />
                    <Route path="/projetos" element={<ExperiencePage />} />
                    <Route path="/cursos" element={<CursosPage />} />
                    <Route path="/certificados" element={<CertificadosPage />} />
                    <Route path="/contato" element={<ContactPage />} />
                    <Route path="/doom" element={<DoomPage />} />
                    <Route path="/dynamic-text-demo" element={<DynamicTextDemoPage />} />
                  </Routes>
                </Suspense>
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
