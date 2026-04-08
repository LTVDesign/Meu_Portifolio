# 🚀 Portfólio 3D - Leandro Saturnino Barbosa

<div align="center">

![Preview do Portfólio](public/assets/images/preview.png)

### **Experimente o Futuro da Presença Digital**
*Portfólio 3D interativo e imersivo desenvolvido com React, Three.js e Tailwind CSS*

[Live Demo](https://leandrobarbosa.dev) • [Relatar Bug](https://github.com/lelebrr/Meu_Portifolio/issues) • [Sugerir Feature](https://github.com/lelebrr/Meu_Portifolio/issues)

---

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=FFF)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160.0-000000?style=for-the-badge&logo=three.js&logoColor=FFF)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.2-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=FFF)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2.5-646CFF?style=for-the-badge&logo=vite&logoColor=FFF)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11.11-0055FF?style=for-the-badge&logo=framer&logoColor=FFF)](https://www.framer.com/motion/)

</div>

---

## 🌌 Visão Geral

Este é um portfólio profissional 3D de alta performance, projetado para elevar os padrões das experiências web modernas. Combina a **estética cyberpunk** com animações fluidas e **integração profunda de WebGL**.

O foco deste projeto é a **excelência visual**, **interações suaves** e **performance impecável** em todos os dispositivos.

### 🌟 Destaques do Projeto

- 🌑 **Estética Cyberpunk/Neon** - Tema escuro de alto contraste com realces vibrantes em neon.
- 🧊 **Ambiente 3D Dinâmico** - Padrões e partículas interativas movidas por **Three.js** que reagem ao movimento do usuário.
- 🌈 **Sistema de Cor Adaptativo** - Sincronização em tempo real entre o fundo animado e os elementos da interface.
- ⚡ **Performance Turbo** - Otimizado com Lazy Loading, Code Splitting e compressão Brotli.
- 📱 **Experiência Universal** - 100% responsivo, de telas mobile a monitores ultra-wide.
- 📦 **Pronto para PWA** - Totalmente instalável, com capacidades offline e navegação rápida estilo app.
- 🔍 **SEO Premium** - Otimização completa com JSON-LD, Open Graph e suporte a Twitter Cards.

---

## 🛠️ Stack Técnica

### **O Núcleo da Engine**
| Componente | Tecnologia | Função |
|------------|------------|--------|
| **Frontend** | **React 18** | UI Funcional e Gestão de Estado |
| **Linguagem** | **TypeScript** | Segurança de tipos e estabilidade arquitetural |
| **Bundler** | **Vite 6** | Pipeline de build e desenvolvimento ultrarrápido |
| **Estilização** | **Tailwind CSS 4** | Design moderno e flexível utility-first |

### **Animação & 3D**
| Componente | Tecnologia | Função |
|------------|------------|--------|
| **Engine** | **Three.js** | Gráficos WebGL de baixo nível |
| **Bridge** | **R3F (React Three Fiber)** | 3D declarativo dentro do React |
| **Utilitários** | **@react-three/drei** | Biblioteca especializada de componentes 3D |
| **Dynamic** | **Framer Motion** | Transições de UI complexas e física de movimento |

### **Infraestrutura & UX**
| Componente | Tecnologia | Função |
|------------|------------|--------|
| **Roteamento** | **React Router** | Navegação SPA suave |
| **Validação** | **Zod** | Verificação de dados baseada em schemas |
| **i18n** | **i18next** | Suporte multi-idioma (PT/EN) |
| **Segurança** | **CSP + Zod** | Políticas de segurança rígidas e integridade de dados |

---

## ⚡ Início Rápido

### 📋 Pré-requisitos

- **Node.js** v18 ou superior
- **npm** (já incluso no Node)

### 🚀 Rodando Localmente

1. **Clone a Galáxia**
   ```bash
   git clone https://github.com/lelebrr/Meu_Portifolio.git
   cd Meu_Portifolio
   ```

2. **Abasteça as Dependências**
   ```bash
   npm install
   ```

3. **Ignição!**
   ```bash
   npm run dev
   ```

Acesse `http://localhost:5173` para vivenciar o projeto.

---

## 🏗️ Configuração de Produção

Gerando um build de alta performance:

```bash
# Build otimizado
npm run build

# Preview do build de produção
npm run preview
```

### **Otimizações de Elite**
- [x] **Smart Code Splitting** - Separação inteligente de bibliotecas externas.
- [x] **Minificação Extrema** - Chunks otimizados via Terser.
- [x] **Assets de Nova Geração** - Otimização de imagens WebP e AVIF.
- [x] **Compressão Total** - Assets pré-comprimidos com Brotli e Gzip.
- [x] **Escudo de Segurança** - Content Security Policy (CSP) configurada.

---

## 📁 Arquitetura do Projeto

```text
Meu_Portifolio/
├── public/                 # Assets estáticos & configuração PWA
│   ├── assets/
│   │   ├── images/         # Prints de projetos & previews em alta fidelidade
│   │   └── documents/      # Certificados validados (PDF)
│   ├── desktop_pc/         # Texturas 3D & Modelos Otimizados
│   └── sw.js               # Engine do Service Worker
├── src/
│   ├── components/
│   │   ├── canvas/         # O Coração 3D (Experiências Three.js)
│   │   ├── layout/         # Estruturas de UI persistentes
│   │   └── sections/       # Módulos interativos (Hero, Sobre, etc.)
│   ├── contexts/           # Estado global (Tema, Idioma)
│   ├── data/               # Motor de conteúdo centralizado
│   ├── i18n/               # Assets de localização
│   └── hooks/              # Lógica reutilizável (Intersection Observer, etc.)
├── scripts/                # Scripts de automação & otimização de assets
└── package.json            # Manifesto do Projeto
```

---

## 🔒 Segurança em Primeiro Lugar

Segurança não é um detalhe; é parte da arquitetura:

- **CSP (Content Security Policy)**: Diretivas fortes para prevenir XSS e injeção de dados.
- **Validação Estrita**: Todo input do usuário é higienizado e validado via **schemas Zod**.
- **Headers Modernos**: Configurado para HSTS, proteção XSS e negação de frames inseguros.
- **Auditado**: Construído seguindo padrões de segurança de alto nível para aplicações web.

---

## 🧪 Controle de Qualidade

Garantimos que cada linha de código esteja pronta para produção através de:

- **Segurança de Tipos**: 100% modo estrito de TypeScript.
- **Padronização**: Regras de alto nível impostas pelo **Biome**.
- **Testes**: Suíte de testes unitários e de integração com **Jest**.

```bash
# Executar suíte de testes
npm run test

# Verificar cobertura de código
npm run test -- --coverage
```

---

## 👤 Autor

### **Leandro Saturnino Barbosa**
*Desenvolvedor Fullstack & Criativo Web 3D*

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-@lelebrr-181717?style=for-the-badge&logo=github)](https://github.com/lelebrr)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-lelebrr-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/lelebrr)
[![Website](https://img.shields.io/badge/Portfolio-leandrobarbosa.dev-2563EB?style=for-the-badge&logo=google-chrome)](https://leandrobarbosa.dev)

</div>

## 📚 Documentação Adicional

Para detalhes técnicos profundos, consulte nosso [Catálogo de Documentação](docs/README.md):

- [🏗️ Arquitetura](docs/ARCHITECTURE.md) - Visão técnica e estrutura de pastas.
- [💻 Guia de Desenvolvimento](docs/DEVELOPMENT.md) - Configuração, padrões e testes.
- [🛡️ Segurança](docs/SECURITY.md) - Medidas contra vulnerabilidades.
- [🌈 Texto Dinâmico](docs/DYNAMIC_TEXT.md) - Sistema de contraste adaptativo.
- [⚡ Performance & PWA](docs/PWA_AND_PERFORMANCE.md) - Otimizações e Progressive Web App.
- [🌐 Internacionalização](docs/INTERNATIONALIZATION.md) - Configuração multi-idioma (i18n).
- [🧹 Log de Limpeza](docs/CLEANUP_LOG.md) - Registro da organização de assets.

---

## 🤝 Contribuindo

---

## 📝 Licença

Este projeto está sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">

**Se este projeto te inspirou, não esqueça de deixar uma ⭐!**

*Sistema atualizado em: Abril de 2025*

</div>
