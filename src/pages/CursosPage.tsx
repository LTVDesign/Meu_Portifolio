import { useNavigate } from 'react-router-dom';
import AllCursos from '../components/sections/AllCursos';

const CursosPage = () => {
  const navigate = useNavigate();

  return <AllCursos isOpen={true} isPage={true} onClose={() => navigate('/#cursos')} />;
};

export default CursosPage;
