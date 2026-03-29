import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { renderWithI18n } from './test-utils';
import Hero from '../components/sections/Hero';

// Mock dos componentes pesados
jest.mock('../components/canvas/Computers', () => ({
    __esModule: true,
    default: () => <div data-testid="computers-canvas">Computers Canvas</div>,
}));

jest.mock('../components/atoms/TerminalText', () => ({
    __esModule: true,
    default: ({ words }: { words: string[] }) => (
        <div data-testid="terminal-text">
            {words.map((word, index) => (
                <span key={index}>{word}</span>
            ))}
        </div>
    ),
}));

describe('Hero Component', () => {
    it('renderiza o componente Hero corretamente', () => {
        renderWithI18n(<Hero />);

        expect(screen.getByTestId('computers-canvas')).toBeInTheDocument();
    });

    it('exibe o título principal', () => {
        renderWithI18n(<Hero />);

        const terminalText = screen.getByTestId('terminal-text');
        expect(terminalText).toBeInTheDocument();
    });

    it('possui elementos de acessibilidade básicos', () => {
        renderWithI18n(<Hero />);

        const section = document.getElementById('hero');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('id', 'hero');
    });

    it('renderiza o canvas 3D como elemento decorativo', () => {
        renderWithI18n(<Hero />);

        const canvas = screen.getByTestId('computers-canvas');
        expect(canvas).toBeInTheDocument();
    });
});