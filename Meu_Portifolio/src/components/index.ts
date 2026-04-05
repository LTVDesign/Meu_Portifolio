// Barrel file principal - APENAS componentes leves (UI)
// Componentes 3D pesados devem ser importados de './canvas'

import { LinkAnimado } from './atoms';
import ErrorBoundary from './ErrorBoundary';
import Footer from './layout/Footer';
import CanvasLoader from './layout/Loader';
import MotionLoader from './layout/MotionLoader';
import Navbar from './layout/Navbar';

// Sections (páginas)
import About from './sections/About';
import AllCursos from './sections/AllCursos';
import AllCurriculo from './sections/AllCurriculo';
import AllFormacao from './sections/AllFormacao';
import AllWorks from './sections/AllWorks';
import Contact from './sections/Contact';
import Curriculo from './sections/Curriculo';
import Cursos from './sections/Cursos';
import Experience from './sections/Experience';
import Formacao from './sections/Formacao';
import Hero from './sections/Hero';
import NotFound from './sections/NotFound';
import Tech from './sections/Tech';
import Works from './sections/Works';

export {
  // Sections
  About,
  AllCursos,
  AllCurriculo,
  AllFormacao,
  AllWorks,
  CanvasLoader,
  Contact,
  Curriculo,
  Cursos,
  // Layout
  ErrorBoundary,
  Experience,
  Footer,
  Formacao,
  Hero,
  // Atoms
  LinkAnimado,
  MotionLoader,
  Navbar,
  NotFound,
  Tech,
  Works,
};
