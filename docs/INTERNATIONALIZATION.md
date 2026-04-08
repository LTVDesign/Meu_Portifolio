# 🌐 Internacionalização (i18n)

Este documento detalha o sistema multi-idioma (Português e Inglês) no **Portfólio 3D**.

## 🛠️ Tecnologias Utilizadas

- **i18next**: Biblioteca de internacionalização robusta para o JavaScript.
- **react-i18next**: Integração oficial para o React.
- **i18next-browser-languagedetector**: Detecta automaticamente o idioma do navegador do usuário.

---

## 📁 Estrutura de Tradução

As traduções estão localizadas em `src/i18n/translations/`:

```text
src/i18n/
├── translations/
│   ├── en.json
│   └── pt.json
└── index.ts (Configuração principal)
```

### Arquivos de Tradução
Os arquivos JSON contêm chaves idênticas para ambos os idiomas:
- **`en.json`**: Tradução em Inglês.
- **`pt.json`**: Tradução em Português (Brasil).

---

## 🧭 Como Adicionar uma Nova Tradução

1.  Abra `src/i18n/translations/pt.json` e adicione a nova chave.
    ```json
    {
      "hero": {
        "title": "Olá, eu sou Leandro Saturnino Barbosa",
        "new_key": "Texto em Português"
      }
    }
    ```
2.  Replique a mesma chave em `src/i18n/translations/en.json`.
    ```json
    {
      "hero": {
        "title": "Hi, I'm Leandro Saturnino Barbosa",
        "new_key": "Text in English"
      }
    }
    ```
3.  Utilize o hook `useTranslation` no seu componente:
    ```tsx
    import { useTranslation } from 'react-i18next';

    function MyComponent() {
      const { t } = useTranslation();
      return <h1>{t('hero.new_key')}</h1>;
    }
    ```

---

## 🔄 Detecção e Mudança de Idioma

- **Detecção**: O idioma é detectado automaticamente na primeira visita.
- **Persistência**: A preferência do usuário é salva no `localStorage` sob a chave `i18nextLng`.
- **Mudança Manual**: Implementada no `LanguageContext` ou diretamente via `i18n.changeLanguage(lng)`.

---

## 🏁 Boas Práticas

1.  **Não Hardcode**: Nunca escreva texto diretamente nos componentes. Use as chaves do i18n.
2.  **Organização**: Mantenha uma hierarquia lógica (ex: `navbar`, `hero`, `about`).
3.  **Consistência**: Se adicionar uma chave em um arquivo, deve obrigatoriamente adicionar em todos os outros.

---

> [!TIP]
> Para depurar traduções faltantes, você pode habilitar o `debug: true` temporariamente em `src/i18n/index.ts`.
