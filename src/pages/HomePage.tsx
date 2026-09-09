import { lazy, Suspense } from 'react';
import Hero from '../components/sections/Hero';

const About = lazy(() => import('../components/sections/About'));
const Contact = lazy(() => import('../components/sections/Contact'));
const Currently = lazy(() => import('../components/sections/Currently'));
const Curriculo = lazy(() => import('../components/sections/Curriculo'));
const Cursos = lazy(() => import('../components/sections/Cursos'));
const Experience = lazy(() => import('../components/sections/Experience'));
const Formacao = lazy(() => import('../components/sections/Formacao'));
const Manifesto = lazy(() => import('../components/sections/Manifesto'));
const Works = lazy(() => import('../components/sections/Works'));

const SectionFallback = () => (
  <div className='h-32 flex items-center justify-center'>
    <div className='w-6 h-6 border border-white/10 border-t-white/30 rounded-full animate-spin' />
  </div>
);

const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <Manifesto />
        <About />
        <Currently />
        <Formacao />
        <Experience />
        <Cursos isHomePage={true} />
        <Works />
        <Curriculo />
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePage;
