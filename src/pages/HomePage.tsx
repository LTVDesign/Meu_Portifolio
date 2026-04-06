
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import Curriculo from '../components/sections/Curriculo';
import Cursos from '../components/sections/Cursos';
import Experience from '../components/sections/Experience';
import Formacao from '../components/sections/Formacao';
import Works from '../components/sections/Works';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Formacao />
      <Experience />
      <Cursos isHomePage={true} />
      <Works />
      <Curriculo />
      <Contact />
    </>
  );
};

export default HomePage;
