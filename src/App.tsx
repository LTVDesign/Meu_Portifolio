import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

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
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation} strict>
        <Router>
          <div className="relative z-0 bg-primary">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <Navbar />

              <main className="relative min-h-screen">
                <Suspense fallback={
                  <div className="min-h-[60vh] flex items-center justify-center text-white/60">
                    Carregando portfólio...
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={
                      <>
                        <Hero />
                        <About />
                        <Tech />
                        <Formacao />
                        <Experience />
                        <Cursos />
                        <Works />
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
            </div>
          </div>
        </Router>
      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;