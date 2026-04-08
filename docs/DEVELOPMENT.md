# 💻 Guia de Desenvolvimento

Este guia descreve como configurar seu ambiente local e seguir os padrões de código do **Portfólio 3D**.

## 🛠️ Configurando o Ambiente

### Pré-requisitos
- **Node.js**: v18.0.0 ou superior (Recomendado v20+).
- **npm**: v9.0.0 ou superior.

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/lelebrr/Meu_Portifolio.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### Execução em Desenvolvimento
Inicie o servidor Vite:
```bash
npm run dev
```
O projeto estará disponível por padrão em `http://localhost:5173`.

---

## 🎨 Padrões de Código

### TypeScript
- O projeto usa o modo estrito do TypeScript.
- Todas as definições de tipos para dados (projetos, certificados, etc.) devem estar em `src/types/`.

### Linter & Formatter (Biome)
- Utilizamos o **Biome** como substituto rápido para ESLint e Prettier.
- Para verificar e corrigir o código:
  ```bash
  npx @biomejs/biome check --apply .
  ```
- O arquivo de configuração é o `biome.json` na raiz.

### Tailwind CSS 4
- Seguimos o padrão mobile-first.
- Utilize as classes utilitárias em vez de CSS personalizado sempre que possível.
- Configuração principal no `tailwind.config.js`.

---

## 🧪 Testes

O projeto utiliza **Jest** com **React Testing Library**.

- **Executar todos os testes**:
  ```bash
  npm run test
  ```
- **Modo Watch**:
  ```bash
  npm run test -- --watch
  ```
- **Verificar Cobertura**:
  ```bash
  npm run test -- --coverage
  ```

---

## 🏗️ Scripts de Build e Build Otimizado

- `npm run build`: Gera o build de produção (faz verificação de tipos e otimização).
- `npm run preview`: Inicia um servidor local para visualizar o build de produção exatamente como será implantado.

---

## 📦 Gestão de Assets

### Imagens e Mídia
- Arquivos de imagem devem ser otimizados (WebP ou AVIF são preferidos).
- Assets em `src/assets/` devem ser exportados via `src/assets/index.ts` (padrão barrel).
- Arquivos públicos (que não passam pelo pipeline do Vite) ficam em `public/`.

### Modelos 3D
- Modelos 3D e texturas pesadas ficam em `public/` para evitar que o Vite processe-os desnecessariamente.

---

## 🤝 Fluxo de Trabalho (Geral)

1. Crie uma branch para sua nova funcionalidade: `git checkout -b feature/nome-da-feature`.
2. Desenvolva sua implementação seguindo os padrões.
3. Execute o linter: `npx @biomejs/biome check --apply .`.
4. Verifique se os testes passam: `npm run test`.
5. Abra um Pull Request com uma descrição detalhada das mudanças.

---

> [!CAUTION]
> **Segredos**: Nunca commite chaves de API ou segredos no repositório. Use variáveis de ambiente (`.env`).
