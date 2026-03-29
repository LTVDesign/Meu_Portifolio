import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

describe('i18n Configuration', () => {
    it('inicia com idioma padrão português', async () => {
        const TestComponent = () => {
            const { t, i18n: i18nInstance } = require('react-i18next').useTranslation();
            return (
                <div>
                    <span data-testid="current-language">{i18nInstance.language}</span>
                    <span data-testid="hero-title">{t('hero.title')}</span>
                </div>
            );
        };

        render(
            <I18nextProvider i18n={i18n}>
                <TestComponent />
            </I18nextProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('current-language')).toHaveTextContent('pt');
        });
    });

    it('possui traduções em português', async () => {
        const TestComponent = () => {
            const { t } = require('react-i18next').useTranslation();
            return <span data-testid="hero-title">{t('hero.title')}</span>;
        };

        render(
            <I18nextProvider i18n={i18n}>
                <TestComponent />
            </I18nextProvider>
        );

        await waitFor(() => {
            const title = screen.getByTestId('hero-title');
            expect(title).toBeInTheDocument();
            expect(title.textContent?.length).toBeGreaterThan(0);
        });
    });

    it('fallback para valor padrão quando tradução não existe', async () => {
        const MissingKeyComponent = () => {
            const { t } = require('react-i18next').useTranslation();
            return <span data-testid="missing-key">{t('nonexistent.key', { defaultValue: 'Fallback' })}</span>;
        };

        render(
            <I18nextProvider i18n={i18n}>
                <MissingKeyComponent />
            </I18nextProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('missing-key')).toHaveTextContent('Fallback');
        });
    });
});