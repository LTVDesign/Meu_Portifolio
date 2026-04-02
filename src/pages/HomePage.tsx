import { lazy, Suspense } from 'react';
import Hero from '../components/sections/Hero';

const ThreeExperience = lazy(() => import('../components/canvas/ThreeExperience'));

// Lazy loading sections to minimize main thread work on initial load
const About = lazy(() => import('../components/sections/About'));
const Contact = lazy(() => import('../components/sections/Contact'));
const Curriculo = lazy(() => import('../components/sections/Curriculo'));
const Cursos = lazy(() => import('../components/sections/Cursos'));
const Experience = lazy(() => import('../components/sections/Experience'));
const Formacao = lazy(() => import('../components/sections/Formacao'));
const Works = lazy(() => import('../components/sections/Works'));

const SectionLoader = () => (
  <div className='py-20 flex items-center justify-center'>
    <div className='w-10 h-10 border-4 border-[var(--cyber-purple)]/20 border-t-[var(--cyber-purple)] rounded-full animate-spin' />
  </div>
);

const HomePage = () => {
  console.log('[HomePage] Renderizando HomePage - Optimized');

  return (
    <>
      {/* Hero is critical, load immediately */}
      <Hero />
      
      {/* Non-critical sections are lazy-loaded */}
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Formacao />
        <Experience />
        <Cursos isHomePage={true} />
        <Works />
        <Curriculo />
        <Contact />
      </Suspense>

      <Suspense fallback={
        <div className="h-[600px] md:h-screen flex items-center justify-center bg-zinc-950">
          <p className="text-zinc-400">Carregando experiência 3D...</p>
        </div>
      }>
        <ThreeExperience />
      </Suspense>
    </>
  );
};

export default HomePage;
