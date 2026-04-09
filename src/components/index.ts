// Barrel file podado para evitar vazamento de dependências 3D Pesadas
// Importe componentes diretamente de seus diretórios para melhor performance

import { LinkAnimado } from './atoms';
import ErrorBoundary from './ErrorBoundary';
import MotionLoader from './layout/MotionLoader';
import Navbar from './layout/Navbar';

export { ErrorBoundary, LinkAnimado, MotionLoader, Navbar };
