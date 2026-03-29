import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithI18n } from './test-utils';
import Contact from '../components/sections/Contact';

// Mock dos componentes pesados
jest.mock('../components/canvas/Earth', () => ({
    __esModule: true,
    default: () => <div data-testid="earth-canvas">Earth Canvas</div>,
}));

jest.mock('../utils/emailService', () => ({
    emailService: {
        sendContactForm: jest.fn().mockResolvedValue({ success: true, message: 'Success' }),
    },
}));

describe('Contact Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza o formulário de contato com todos os campos', () => {
        renderWithI18n(<Contact />);

        expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Empresa/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mensagem/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Enviar Mensagem/i })).toBeInTheDocument();
    });

    it('permite preencher todos os campos do formulário', async () => {
        const user = userEvent.setup();
        renderWithI18n(<Contact />);

        const nameInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const messageInput = screen.getByLabelText(/Mensagem/i);

        await user.type(nameInput, 'João Silva');
        await user.type(emailInput, 'joao@email.com');
        await user.type(messageInput, 'Esta é uma mensagem de teste para o formulário de contato.');

        expect(nameInput).toHaveValue('João Silva');
        expect(emailInput).toHaveValue('joao@email.com');
        expect(messageInput).toHaveValue('Esta é uma mensagem de teste para o formulário de contato.');
    });

    it('formata o telefone automaticamente', async () => {
        const user = userEvent.setup();
        renderWithI18n(<Contact />);

        const phoneInput = screen.getByLabelText(/Telefone/i);
        await user.type(phoneInput, '11999998888');

        // O componente formata para (11) 99999-8888
        expect(phoneInput).toHaveValue('(11) 99999-8888');
    });


    it('envia o formulário com sucesso', async () => {
        const user = userEvent.setup();
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

        renderWithI18n(<Contact />);

        await user.type(screen.getByLabelText(/Nome/i), 'João Silva');
        await user.type(screen.getByLabelText(/Email/i), 'joao@email.com');
        await user.type(screen.getByLabelText(/Mensagem/i), 'Mensagem de teste com mais de 20 caracteres para passar na validação.');

        await user.click(screen.getByRole('button', { name: /Enviar Mensagem/i }));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Mensagem enviada com sucesso!');
        });

        alertMock.mockRestore();
    });

    it('exibe o canvas 3D como elemento decorativo', () => {
        renderWithI18n(<Contact />);

        expect(screen.getByTestId('earth-canvas')).toBeInTheDocument();
    });

    it('possui elementos de acessibilidade', () => {
        renderWithI18n(<Contact />);

        const form = document.querySelector('form');
        expect(form).toBeInTheDocument();

        // Verificar que os campos têm labels associados
        const nameInput = screen.getByLabelText(/Nome/i);
        expect(nameInput).toHaveAttribute('id', 'name');
    });
});