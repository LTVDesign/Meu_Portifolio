import { lazy, Suspense } from 'react';
import AllWorks from '../components/sections/AllWorks';
import Experience from '../components/sections/Experience';
import Works from '../components/sections/Works';

const ThreeExperience = lazy(() => import('../components/canvas/ThreeExperience'));

const ExperiencePage = () => {
  return (
    <>
      <Experience />
      <Works />
      <AllWorks />
      
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

export default ExperiencePage;
