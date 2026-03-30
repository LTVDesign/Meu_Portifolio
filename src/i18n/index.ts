import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from './translations/pt.json';
import en from './translations/en.json';

const resources = {
    pt: { translation: pt },
    en: { translation: en },
};

(i18next as any)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'pt',
        lng: 'pt',
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    }, (err: any) => {
        if (err) {
            console.error('[i18n] Erro ao inicializar i18n:', err);
        } else {
            // @ts-ignore
            console.log('[i18n] i18n inicializado com sucesso, língua:', (i18next as any).language);
            console.log('[i18n] Traduções disponíveis:', Object.keys(resources));
        }
    });

export default i18next;
