import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Background, ErrorBoundary, ThemeToggle } from './components';
import { config } from './constants/config';
import { ParticleConfigProvider } from './contexts/ParticleConfigContext';

const About = lazy(() =>
  import('./components/sections/About').then((module) => ({ default: module.default }))
);
const Contact = lazy(() =>
  import('./components/sections/Contact').then((module) => ({ default: module.default }))
);
const Cursos = lazy(() =>
  import('./components/sections/Cursos').then((module) => ({ default: module.default }))
);
const Curriculo = lazy(() =>
  import('./components/sections/Curriculo').then((module) => ({ default: module.default }))
);
const Certificados = lazy(() =>
  import('./components/sections/Certificados').then((module) => ({ default: module.default }))
);
const Experience = lazy(() =>
  import('./components/sections/Experience').then((module) => ({ default: module.default }))
);
const Formacao = lazy(() =>
  import('./components/sections/Formacao').then((module) => ({ default: module.default }))
);
const Hero = lazy(() =>
  import('./components/sections/Hero').then((module) => ({ default: module.default }))
);
const Tech = lazy(() =>
  import('./components/sections/Tech').then((module) => ({ default: module.default }))
);
const Works = lazy(() =>
  import('./components/sections/Works').then((module) => ({ default: module.default }))
);
const AllCourses = lazy(() =>
  import('./components/sections/AllCourses').then((module) => ({ default: module.default }))
);
const AllCertificados = lazy(() =>
  import('./components/sections/AllCertificados').then((module) => ({ default: module.default }))
);
const Navbar = lazy(() =>
  import('./components/layout/Navbar').then((module) => ({ default: module.default }))
);
const StarsCanvas = lazy(() =>
  import('./components/canvas/Stars').then((module) => ({ default: module.default }))
);
const Footer = lazy(() =>
  import('./components/layout/Footer').then((module) => ({ default: module.default }))
);

const App = () => {
  const [viewMode, setViewMode] = useState<string>('default');

  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  if (viewMode === 'allcourses') {
    return (
      <ParticleConfigProvider>
        <ThemeToggle />
        <Background />
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
            </div>
          }
        >
          <AllCourses setViewMode={setViewMode} />
        </Suspense>
      </ParticleConfigProvider>
    );
  }

  if (viewMode === 'allcertificados') {
    return (
      <ParticleConfigProvider>
        <ThemeToggle />
        <Background />
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
            </div>
          }
        >
          <AllCertificados setViewMode={setViewMode} />
        </Suspense>
      </ParticleConfigProvider>
    );
  }

  return (
    <ErrorBoundary>
      <ParticleConfigProvider>
        <BrowserRouter>
          <ThemeToggle />
          <Background />
          <div className="relative z-0 w-full overflow-x-hidden">
            <div>
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                  </div>
                }
              >
                <Hero />
              </Suspense>
            </div>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                </div>
              }
            >
              <About />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                </div>
              }
            >
              <Formacao />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                </div>
              }
            >
              <Experience />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                </div>
              }
            >
              <Cursos setViewMode={setViewMode} />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                </div>
              }
            >
              <Certificados setViewMode={setViewMode} />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                </div>
              }
            >
              <Curriculo />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                </div>
              }
            >
              <Tech />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                </div>
              }
            >
              <Works />
            </Suspense>
            <div className="relative z-0 w-full overflow-x-hidden">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#915EFF]"></div>
                  </div>
                }
              >
                <Contact />
              </Suspense>
              <Suspense fallback={null}>
                <StarsCanvas />
              </Suspense>
            </div>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </BrowserRouter>
      </ParticleConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
