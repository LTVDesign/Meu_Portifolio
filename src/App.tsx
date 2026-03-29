import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Background, ErrorBoundary, MotionLoader, NotFound, ThemeToggle } from './components';
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
const AllCurriculo = lazy(() =>
  import('./components/sections/AllCurriculo').then((module) => ({ default: module.default }))
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

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="relative z-0 w-full overflow-x-hidden">
      <Suspense fallback={null}>
        <Navbar setViewMode={setViewMode} />
      </Suspense>
      {children}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );

  const Home = () => (
    <>
      <div>
        <Suspense fallback={<MotionLoader isSection />}>
          <Hero />
        </Suspense>
      </div>
      <Suspense fallback={<MotionLoader isSection />}>
        <About />
      </Suspense>
      <Suspense fallback={<MotionLoader isSection />}>
        <Formacao />
      </Suspense>
      <Suspense fallback={<MotionLoader isSection />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<MotionLoader isSection />}>
        <Cursos setViewMode={setViewMode} />
      </Suspense>
      <Suspense fallback={<MotionLoader isSection />}>
        <Curriculo setViewMode={setViewMode} />
      </Suspense>
      <Suspense fallback={<MotionLoader isSection />}>
        <Tech />
      </Suspense>
      <Suspense fallback={<MotionLoader isSection />}>
        <Works />
      </Suspense>
      <div className="relative z-0 w-full overflow-x-hidden">
        <Suspense fallback={<MotionLoader isSection />}>
          <Contact />
        </Suspense>
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
      </div>
    </>
  );

  return (
    <ErrorBoundary>
      <ParticleConfigProvider>
        <BrowserRouter>
          <ThemeToggle />
          <Background />
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  {viewMode === 'allcourses' ? (
                    <Suspense fallback={<MotionLoader isSection />}>
                      <AllCourses setViewMode={setViewMode} />
                    </Suspense>
                  ) : viewMode === 'allcurriculo' ? (
                    <Suspense fallback={<MotionLoader isSection />}>
                      <AllCurriculo setViewMode={setViewMode} />
                    </Suspense>
                  ) : viewMode === 'allcertificados' ? (
                    <Suspense fallback={<MotionLoader isSection />}>
                      <AllCertificados setViewMode={setViewMode} />
                    </Suspense>
                  ) : (
                    <Home />
                  )}
                </Layout>
              }
            />
            {/* Catch-all route for 404 */}
            <Route
              path="*"
              element={
                <Layout>
                  <Suspense fallback={<MotionLoader isSection />}>
                    <NotFound setViewMode={setViewMode} />
                  </Suspense>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ParticleConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
