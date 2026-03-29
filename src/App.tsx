import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { ParticleConfigProvider } from './contexts/ParticleConfigContext';
import './i18n';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ThemeToggle from './components/layout/ThemeToggle';
import BackgroundManager from './components/canvas/BackgroundManager';
import MotionLoader from './components/layout/MotionLoader';

// Lazy loading por página inteira (code splitting eficiente)
const HomePage = lazy(() => import('./pages/HomePage'));
const FormacaoPage = lazy(() => import('./pages/FormacaoPage'));
const CursosPage = lazy(() => import('./pages/CursosPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CertificadosPage = lazy(() => import('./pages/CertificadosPage'));

const App = () => {
  console.log('App: Rendering...');
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <PerformanceProvider>
          <ParticleConfigProvider>
            <Router>
              {/* Sistema dinâmico de backgrounds */}
              <BackgroundManager />

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
                  </Routes>
                </Suspense>
              </main>

              <Footer />
            </Router>
          </ParticleConfigProvider>
        </PerformanceProvider>
      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;
