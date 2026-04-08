# ⚡ Performance e PWA (Progressive Web App)

Este documento detalha as estratégias de otimização e a implementação do PWA no **Portfólio 3D**.

## 🌑 Estratégia de Performance

Para garantir uma experiência de 60 FPS, mesmo com cenas 3D ricas, utilizamos:

### 1. Carregamento sob Demanda (Lazy Loading)
- **Componentes**: React `lazy()` e `Suspense` para carregar seções como `About`, `Works` e `Contact` apenas quando necessário.
- **Imagens**: Atributo `loading="lazy"` em todas as imagens fora da dobra superior (below-the-fold).
- **Código (Code Splitting)**: O build do Vite separa automaticamente bibliotecas grandes (como Three.js e Framer Motion) em chunks menores para carregamento paralelo.

### 2. Otimização de Assets
- **Imagens**: Substituímos PNG/JPG por **WebP** e **AVIF** sempre que possível, reduzindo o tamanho em até 70%.
- **Modelos 3D**: Modelos GLB otimizados com `gltf-pipeline` e texturas redimensionadas para o mínimo necessário.
- **Fontes**: Uso de `font-display: swap` para garantir que o texto seja legível imediatamente.

### 3. Compressão de Rede
- **Gzip & Brotli**: O build de produção em `dist/` contém versões pré-comprimidas de todos os arquivos estáticos, reduzindo drasticamente o tempo de transferência inicial.

---

## 📦 PWA (Progressive Web App)

O portfólio está configurado como um PWA de nível A, permitindo:
- **Instalação**: Ícone na tela inicial do celular ou desktop.
- **Funcionamento Offline**: Cache inteligente de recursos essenciais.
- **Experiência Imersiva**: Sem barras de navegação do browser (modo standalone).

### 📁 Arquivos PWA
- **`public/manifest.json`**: Define o nome, ícones, cores de tema e o modo de exibição.
- **`public/sw.js`**: O Service Worker que gerencia o cache das rotas e assets.

---

## 🛠️ Service Worker (`sw.js`)

Nosso `sw.js` utiliza uma estratégia de **Cache First, Network Fallback**:
1.  **Instalação**: Pre-cache do `index.html`, bundles de JS, CSS e imagens críticas.
2.  **Ativação**: Limpeza de versões antigas do cache.
3.  **Fetch**: Intercepta requisições de rede para servir recursos do cache local ultra-rápido.

---

## 📈 Métricas Lighthouse

O objetivo contínuo é manter todos os scores acima de 90+:
- **Performance**: 90-100 (Foco em LCP e TBT)
- **Acessibilidade**: 90-100 (Contraste dinâmico via `DynamicText`)
- **Best Practices**: 100
- **SEO**: 100
- **PWA**: 100 (Manifesto e Service Worker válidos)

---

> [!IMPORTANT]
> **Otimização de 3D**: Toda vez que for adicionar um novo modelo 3D, certifique-se de passar o modelo por um otimizador de malha e converter as texturas para WebP.
