import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Tech from '../components/sections/Tech';
import Formacao from '../components/sections/Formacao';
import Experience from '../components/sections/Experience';
import Works from '../components/sections/Works';
import Cursos from '../components/sections/Cursos';
import Curriculo from '../components/sections/Curriculo';
import Contact from '../components/sections/Contact';

const HomePage = () => {
    return (
        <>
            <Hero />
            <About />
            <Formacao />
            <Experience />
            <Cursos isHomePage={true} />
            <Tech />
            <Works />
            <Curriculo />
            <Contact />
        </>
    );
};

export default HomePage;
