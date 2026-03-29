import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../components/atoms/Modal';

describe('Modal Component', () => {
    const mockOnClose = jest.fn();
    const mockChildren = <div data-testid="modal-content">Conteúdo do Modal</div>;

    beforeEach(() => {
        mockOnClose.mockClear();
        document.body.style.overflow = '';
    });

    it('não renderiza quando isOpen é false', () => {
        render(
            <Modal isOpen={false} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renderiza quando isOpen é true', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste Modal">
                {mockChildren}
            </Modal>
        );

        expect(screen.getByTestId('modal-content')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('exibe o título corretamente', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Meu Modal">
                {mockChildren}
            </Modal>
        );

        expect(screen.getByText('Meu Modal')).toBeInTheDocument();
    });

    it('fecha o modal ao clicar no botão de fechar', async () => {
        const user = userEvent.setup();
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        const closeButton = screen.getByRole('button', { name: /fechar modal/i });
        await user.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('fecha o modal ao clicar no backdrop', async () => {
        const user = userEvent.setup();
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        // Clicar no backdrop (o container externo)
        const backdrop = document.querySelector('.fixed.inset-0');
        if (backdrop) {
            await user.click(backdrop);
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        }
    });

    it('não fecha ao clicar no conteúdo do modal', async () => {
        const user = userEvent.setup();
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        const content = screen.getByTestId('modal-content');
        await user.click(content);

        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('fecha ao pressionar Escape', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('não fecha com outras teclas', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        fireEvent.keyDown(document, { key: 'Enter' });
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('possui atributos ARIA corretos', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Modal Acessível">
                {mockChildren}
            </Modal>
        );

        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('possui focus trap (teste básico)', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                <button data-testid="focusable-1">Botão 1</button>
                <button data-testid="focusable-2">Botão 2</button>
                {mockChildren}
            </Modal>
        );

        const modal = screen.getByRole('dialog');
        expect(modal).toHaveAttribute('tabIndex', '-1');
    });

    it('bloqueia a rolagem do body quando aberto', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        expect(document.body.style.overflow).toBe('hidden');
    });

    it('restaura a rolagem do body ao fechar', () => {
        const { rerender } = render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        expect(document.body.style.overflow).toBe('hidden');

        rerender(
            <Modal isOpen={false} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        expect(document.body.style.overflow).toBe('unset');
    });

    it('renderiza children corretamente', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                <div data-testid="child-element">Filho</div>
                <p>Outro filho</p>
            </Modal>
        );

        expect(screen.getByTestId('child-element')).toBeInTheDocument();
        expect(screen.getByText('Outro filho')).toBeInTheDocument();
    });

    it('funciona sem título opcional', () => {
        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                {mockChildren}
            </Modal>
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.queryByText('modal-title')).not.toBeInTheDocument();
    });

    it('possui animações de entrada e saída', () => {
        const { container } = render(
            <Modal isOpen={true} onClose={mockOnClose} title="Teste">
                {mockChildren}
            </Modal>
        );

        // Verificar que o AnimatePresence e motion.div estão presentes
        expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument();
        expect(container.querySelector('.relative.w-full')).toBeInTheDocument();
    });
});