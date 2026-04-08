# 🏗️ Arquitetura Técnica

Este documento oferece uma visão geral de alto nível da arquitetura do **Portfólio 3D - Leandro Saturnino Barbosa**.

## 🚀 Paradigma da Aplicação

O projeto é uma **Single Page Application (SPA)** desenvolvida com foco em:
1.  **Imersão Visual**: Uso intensivo de WebGL (Three.js) para criar um fundo interativo.
2.  **Performance Máxima**: Carregamento rápido, mesmo com assets 3D pesados.
3.  **Acessibilidade**: Contraste dinâmico e suporte a múltiplos dispositivos.

---

## 🛠️ Stack Tecnológica

### Core
- **Vite 6**: Bundler ultrarrápido para desenvolvimento moderno.
- **React 18**: Biblioteca principal para interfaces baseadas em componentes.
- **TypeScript**: Superset do JavaScript para garantir robustez e segurança de tipos.

### UI & UX
- **Tailwind CSS 4**: Estilização utility-first com a nova versão configurada via PostCSS/Vite.
- **Framer Motion 11**: Motor de animação para transições fluidas e efeitos de hover.

### 3D Engine
- **Three.js**: Biblioteca low-level para WebGL.
- **@react-three/fiber (R3F)**: Renderizador React para Three.js, permitindo escrever cenas 3D de forma declarativa.
- **@react-three/drei**: Coleção de helpers úteis para acelerar o desenvolvimento com R3F.

---

## 📁 Estrutura de Pastas

A estrutura segue o padrão de componentes funcionais do React:

```text
src/
├── components/
│   ├── atoms/     # Componentes pequenos e reutilizáveis (botões, ícones, PCGamer)
│   ├── canvas/    # Todo o ecossistema 3D (Background, Globe, Experience)
│   ├── layout/    # Estruturas persistentes (Navbar, Sidebar, Footer)
│   ├── sections/  # Módulos principais da página (Hero, About, Works)
│   └── ui/        # Elementos genéricos de interface
├── hooks/         # Lógica compartilhada via hooks customizados
├── contexts/      # Estados globais (Tema, Idioma, Configurações de Partículas)
├── data/          # Conteúdo estático (JSON de projetos, formação, etc.)
├── i18n/          # Configuração de traduções e arquivos de idioma
├── types/         # Definições globais de interfaces TypeScript
└── utils/         # Funções utilitárias puras (Cálculos de cor, validação)
```

---

## 🧭 Fluxo de Dados e Estado

- **Global Contexts**: Usado para preferências do usuário (idioma e tema) e estados que atravessam muitas seções (como o `ParticleConfigContext`).
- **Standard Props**: Utilizado para a maioria da comunicação entre componentes.
- **Data Driven**: As seções `Works`, `Cursos` e `Education` são alimentadas por arquivos de dados centralizados em `src/data/`, facilitando a atualização de conteúdo sem mexer na lógica.

---

## 🎨 Estratégia de Design

- **Cyberpunk Concept**: O design utiliza uma paleta escura com luzes coloridas inspiradas no mundo cyberpunk.
- **Componentização**: Tudo o que é repetitivo é um componente atômico, garantindo consistência visual.
- **Responsive-by-Design**: O layout se adapta automaticamente a diferentes larguras de tela usando as utilidades do Tailwind.

---

## 🛡️ Segurança

Consulte [Segurança](SECURITY.md) para detalhes sobre CSP, sanitização e proteção de dados.
