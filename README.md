# Portfólio 3D - Leandro Saturnino Barbosa

Portfólio interativo e imersivo em 3D desenvolvido com React, Three.js e Tailwind CSS. Uma experiência única que combina design moderno, animações fluidas e elementos 3D interativos para showcase de projetos e habilidades técnicas.

![Preview do Portfólio](logo.png)

## 🚀 Stack Técnica

- **React 19** - Biblioteca JavaScript para interfaces modernas
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool ultrarrápida
- **Tailwind CSS 4** - Framework CSS utility-first
- **Three.js** - Biblioteca 3D para WebGL
- **Framer Motion** - Animações fluidas e performáticas
- **React Router DOM** - Roteamento SPA
- **Zod** - Validação de schemas

## 📦 Como Executar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/lelebrr/Meu_Portifolio.git
cd Meu_Portifolio

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🏗️ Build de Produção

```bash
# Gerar build otimizado
npm run build

# Preview local do build
npm run preview
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## ✨ Features Principais

### 🎨 Design e Experiência
- **Background 3D interativo** com partículas animadas usando Three.js
- **Animações suaves** com Framer Motion e parallax effects
- **Layout responsivo** otimizado para todos dispositivos
- **Tema dark** com cores cyberpunk/neon accents
- **Performance otimizada** com lazy loading e code splitting

### 📄 Seções do Portfólio
- **Hero** - Introdução impactante com call-to-action
- **Sobre** - Biografia profissional e stack técnica
- **Projetos** - Showcase de trabalhos com cards interativos
- **Formação** - Timeline vertical de certificados
- **Contato** - Formulário com integração EmailJS
- **Certificados** - Galeria de documentos acadêmicos

### 🔧 Funcionalidades Técnicas
- **PWA Ready** - Manifest e service worker para instalação
- **SEO otimizado** - Meta tags, Open Graph e Twitter Cards
- **Schema.org** - Dados estruturados para rich snippets
- **CSP configurado** - Content Security Policy para segurança
- **Otimização de imagens** - SVGO e Sharp integrados
- **TypeScript** - Tipagem completa em todo o código

### 🌐 PWA (Progressive Web App)
- Instalável em dispositivos móveis e desktop
- Funciona offline (cache de assets)
- App-like experience com standalone display
- Ícones otimizados para todas plataformas

## 📁 Estrutura de Pastas

```
Meu_Portifolio/
├── public/                 # Arquivos estáticos
│   ├── certificados/      # PDFs de certificados
│   ├── formacao/          # Imagens de formação
│   ├── desktop_pc/        # Texturas 3D
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # SEO robots
├── src/
│   ├── components/        # Componentes React
│   │   ├── canvas/        # Componentes 3D (Three.js)
│   │   ├── sections/      # Seções da página
│   │   └── ui/            # Componentes de interface
│   ├── contexts/          # Contexts React
│   ├── hooks/             # Custom hooks
│   ├── assets/            # Imagens e ícones
│   ├── constants/         # Configurações
│   ├── types/             # Definições TypeScript
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dependências
├── vite.config.js         # Configuração Vite
├── tsconfig.json          # Configuração TypeScript
├── biome.json             # Linter/Formatter
└── README.md              # Este arquivo
```

## 🔒 Segurança

Este projeto implementa diversas medidas de segurança:

- **Content Security Policy (CSP)** configurada no `index.html`
- **Sanitização de inputs** nos formulários
- **Validação com Zod** para dados de formulário
- **HTTPS only** em produção
- **Headers de segurança** configurados

Para mais detalhes, consulte [README_SECURITY.md](README_SECURITY.md).

## 🌐 Deploy

O projeto está configurado para deploy em diversas plataformas:

### Vercel / Netlify
```bash
npm run build
# Faça upload da pasta dist/
```

### GitHub Pages
```bash
npm run build
# Mova os arquivos de dist/ para a branch gh-pages
```

### Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Leandro Saturnino Barbosa**

- GitHub: [@lelebrr](https://github.com/lelebrr)
- LinkedIn: [linkedin.com/in/lelebrr](https://linkedin.com/in/lelebrr)
- Site: [https://leandrobarbosa.dev](https://leandrobarbosa.dev)

## 🙌 Agradecimentos

- [Three.js](https://threejs.org/) - Pelo incrível ecossistema 3D
- [React](https://reactjs.org/) - Pela biblioteca que tornou tudo possível
- [Tailwind CSS](https://tailwindcss.com/) - Pelo CSS utility-first
- [Framer Motion](https://www.framer.com/motion/) - Pelas animações fluidas

---

⭐ Se este projeto foi útil, considere dar uma estrela!