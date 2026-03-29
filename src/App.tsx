import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Suspense, lazy, useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { ParticleConfigProvider } from './contexts/ParticleConfigContext';
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
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let keyIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === konamiCode[keyIndex]) {
        keyIndex++;
        if (keyIndex === konamiCode.length) {
          // Easter egg ativado!
          window.open('https://github.com/thedoggybrad/doom_on_js-dos.git', '_blank');
          keyIndex = 0;
        }
      } else {
        keyIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <HelmetProvider>
      <PerformanceProvider>
        <ParticleConfigProvider>
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
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </Router>
        </ParticleConfigProvider>
      </PerformanceProvider>
    </HelmetProvider>
  );
};

export default App;
