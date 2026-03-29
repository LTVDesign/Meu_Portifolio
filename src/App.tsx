import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { ParticleConfigProvider } from './contexts/ParticleConfigContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ThemeToggle from './components/layout/ThemeToggle';
import BackgroundManager from './components/canvas/BackgroundManager';
import MotionLoader from './components/layout/MotionLoader';

// Lazy loading + code splitting
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Tech = lazy(() => import('./components/sections/Tech'));
const Formacao = lazy(() => import('./components/sections/Formacao'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Cursos = lazy(() => import('./components/sections/Cursos'));
const Works = lazy(() => import('./components/sections/Works'));
const Contact = lazy(() => import('./components/sections/Contact'));

const AllFormacao = lazy(() => import('./components/sections/AllFormacao'));
const AllWorks = lazy(() => import('./components/sections/AllWorks'));
const AllCursos = lazy(() => import('./components/sections/AllCursos'));
const AllCertificados = lazy(() => import('./components/sections/AllCertificados'));

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

              <main className="relative">
                <Suspense fallback={<MotionLoader isSection={false} />}>
                  <Routes>
                    <Route path="/" element={
                      <>
                        <Hero />
                        <About />
                        <Formacao />
                        <Experience />
                        <Cursos />
                        <Works />
                        <Tech />
                        <Contact />
                      </>
                    } />

                    <Route path="/formacao" element={<AllFormacao />} />
                    <Route path="/projetos" element={<AllWorks />} />
                    <Route path="/cursos" element={<AllCursos />} />
                    <Route path="/certificados" element={<AllCertificados />} />
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