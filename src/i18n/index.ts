import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Otimização: Traduções carregadas dinamicamente para reduzir o bundle inicial em ~100KB
// i18next suporta backends assíncronos para carregar recursos sob demanda
const loadResources = async (language: string) => {
  try {
    const resources = await import(`./translations/${language}.json`);
    return resources.default;
  } catch (error) {
    console.error(`[i18n] Erro ao carregar traduções para ${language}:`, error);
    // Fallback para pt caso falhe
    if (language !== 'pt') {
      const ptResources = await import('./translations/pt.json');
      return ptResources.default;
    }
    return {};
  }
};

const i18nInitiator = (i18next as any)
  .use(LanguageDetector)
  .use(initReactI18next);

// Inicialização com as configurações básicas
i18nInitiator.init(
  {
    fallbackLng: 'pt',
    lng: 'pt', // Definimos pt como inicial e carregamos abaixo
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    // Suspense é crucial para carregar as traduções dinamicamente sem erro
    react: {
      useSuspense: true,
    },
  },
  async (err: any) => {
    if (err) {
      console.error('[i18n] Erro ao inicializar i18n:', err);
      return;
    }

    // Carregar a língua detectada/inicial
    const currentLanguage = (i18next as any).language || 'pt';
    const resources = await loadResources(currentLanguage);
    (i18next as any).addResourceBundle(currentLanguage, 'translation', resources, true, true);

    console.log(`[i18n] i18n inicializado com sucesso, língua carregada: ${currentLanguage}`);
  }
);

// Listener para carregar novas línguas quando o usuário mudar
(i18next as any).on('languageChanged', async (lng: string) => {
  if (!(i18next as any).hasResourceBundle(lng, 'translation')) {
    const resources = await loadResources(lng);
    (i18next as any).addResourceBundle(lng, 'translation', resources, true, true);
    console.log(`[i18n] Novas traduções carregadas para: ${lng}`);
  }
});

export default i18next;
