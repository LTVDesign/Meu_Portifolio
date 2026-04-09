import { lazy, Suspense } from 'react';
import Hero from '../components/sections/Hero';

// Lazy loading das seções abaixo do fold para melhorar LCP e TBT
const About = lazy(() => import('../components/sections/About'));
const Contact = lazy(() => import('../components/sections/Contact'));
const Curriculo = lazy(() => import('../components/sections/Curriculo'));
const Cursos = lazy(() => import('../components/sections/Cursos'));
const Experience = lazy(() => import('../components/sections/Experience'));
const Formacao = lazy(() => import('../components/sections/Formacao'));
const Works = lazy(() => import('../components/sections/Works'));

const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="h-20" />}>
        <About />
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
