import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithI18n } from './test-utils';
import AllCursos from '../components/sections/AllCursos';

// Mock das imagens
jest.mock('../logos/alberta.webp', () => 'alberta.png');
jest.mock('../logos/google.webp', () => 'google.png');
jest.mock('../logos/ibm.webp', () => 'ibm.png');
jest.mock('../logos/hackers.webp', () => 'hackers.png');
jest.mock('../logos/johns.webp', () => 'johns.png');
jest.mock('../logos/bradesco.webp', () => 'bradesco.png');
jest.mock('../logos/cate.webp', () => 'cate.png');

describe('AllCursos Component', () => {
    it('renderiza o título da seção', () => {
        renderWithI18n(<AllCursos />);

        // Verifica que o título aparece (pode aparecer em <p> e <h2>)
        const titles = screen.getAllByText('Todos os Cursos e Especializações');
        expect(titles.length).toBeGreaterThan(0);
    });

    it('renderiza todos os cursos inicialmente', () => {
        renderWithI18n(<AllCursos />);

        // Verificar que alguns cursos estão presentes
        expect(screen.getByText('Software Product Management Capstone')).toBeInTheDocument();
        expect(screen.getByText('Certificado Profissional de Suporte em TI do Google')).toBeInTheDocument();
    });

    it('possui campo de busca e dropdown de ordenação', () => {
        renderWithI18n(<AllCursos />);

        expect(screen.getByPlaceholderText('Buscar cursos...')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('filtra cursos por título', async () => {
        const user = userEvent.setup();
        renderWithI18n(<AllCursos />);

        const searchInput = screen.getByPlaceholderText('Buscar cursos...');
        await user.type(searchInput, 'Google');

        // Verificar que cursos da Google aparecem
        expect(screen.getByText('Certificado Profissional de Suporte em TI do Google')).toBeInTheDocument();

        // Verificar que cursos que não contêm "Google" não aparecem
        expect(screen.queryByText('Software Product Management Capstone')).not.toBeInTheDocument();
    });

    it('exibe mensagem quando nenhum curso é encontrado', async () => {
        const user = userEvent.setup();
        renderWithI18n(<AllCursos />);

        const searchInput = screen.getByPlaceholderText('Buscar cursos...');
        await user.type(searchInput, 'xyz123nonexistent');

        expect(screen.getByText('Nenhum curso encontrado.')).toBeInTheDocument();
    });

    it('renderiza cards de curso com informações corretas', () => {
        renderWithI18n(<AllCursos />);

        // Verificar que os cards contêm as informações esperadas (podem aparecer múltiplas vezes)
        const albertaElements = screen.getAllByText('University of Alberta');
        const googleElements = screen.getAllByText('Google (via Coursera)');
        expect(albertaElements.length).toBeGreaterThan(0);
        expect(googleElements.length).toBeGreaterThan(0);
    });

    it('os cards possuem links para certificados', () => {
        renderWithI18n(<AllCursos />);

        const links = screen.getAllByText('Ver Certificado');
        expect(links.length).toBeGreaterThan(0);
    });
});