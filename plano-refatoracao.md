# 📋 Plano Completo de Refatoração do Portfólio

## 🎯 Visão Geral

Este plano visa melhorar a performance, manutenibilidade, acessibilidade e escalabilidade do projeto, mantendo a stack moderna (React 18 + Three.js + Tailwind v4).

---

## 📊 Análise do Estado Atual

### ✅ Pontos Fortes
- Stack moderna e bem escolhida
- Critical CSS implementado (acabamos de otimizar)
- Lazy loading de páginas e backgrounds pesados
- Contextos para configuração de partículas
- Estrutura de componentes organizada por pastas

### ❌ Problemas Críticos Identificados

#### 1. Performance
- **`launchParticles.js`**: memory leaks, clearRect ineficiente, cache sem limite real
- **Barrel file gigante** (`components/index.ts`): causa imports desnecessários
- **BackgroundManager**: lazy loading com delay de 100ms (desnecessário)
- **ThemeToggle**: canvas de partículas renderizado sempre (mesmo quando não visível)
- **Bundle size**: chunking pode ser otimizado

#### 2. Manutenibilidade
- **Barrel file único**: mistura UI leve com 3D pesado
- **ThemeToggle.tsx**: 200+ linhas, múltiplas responsabilidades
- **Background.tsx**: componente deprecated que ainda existe
- **Nomenclatura mista**: português/inglês inconsistente
- **Tipagem**: `types/index.ts` com herança confusa

#### 3. Acessibilidade
- **Falta reduced-motion** em alguns componentes 3D
- **Contraste**: alguns textos sobre fundos complexos
- **Navegação por teclado**: possível falta de focus management
- **ARIA labels**: incompletos em alguns botões

#### 4. Estrutura de Projeto
- **Backgrounds 3D**: misturados em `canvas/` sem separação clara
- **Editors**: em `background-editors/` mas poderiam estar em `components/editors/`
- **Utils**: `launchParticles.js` não está tipado (JavaScript puro)

---

## 🚀 Fases de Refatoração

### **FASE 1: Performance Imediata** (Alta Prioridade)
**Duração estimada:** 2-3 dias

#### 1.1 Otimizar `launchParticles.js`
- Reduzir `burstCount` de 107 para 60-80
- Implementar limite rígido de partículas ativas (max 300)
- Melhorar cache de sprites (limite 120)
- Corrigir bug: `vy: vw(rand(-speed, -speed))` → `rand(-speed, speed)`
- Usar `for` loop reverso ao invés de `while` com swap

#### 1.2 Separar Barrel Files
```typescript
// components/index.ts (leve)
export { Navbar, Footer, ThemeToggle, Hero, About, Tech, Experience, Works, Contact }

// components/canvas/index.ts (pesado)
export { BallCanvas, ComputersCanvas, CyberpunkUltraBackground, ... }

// components/editors/index.ts (opcional)
export { BolhasEditor, ParticlesEditor, ... }
```

#### 1.3 Remover `Background.tsx` deprecated
- Deletar arquivo
- Remover export do barrel
- Atualizar imports no App.tsx

#### 1.4 Otimizar ThemeToggle
- Renderizar canvas de partículas apenas quando menu aberto
- Separar em subcomponentes: `GearButton`, `BackgroundMenu`, `BackgroundEditorModal`
- Usar `useCallback` e `React.memo` apropriadamente

---

### **FASE 2: Manutenibilidade** (Média Prioridade)
**Duração estimada:** 3-4 dias

#### 2.1 Reorganizar Estrutura de Pastas
```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Loader, ThemeToggle
│   ├── sections/        # Páginas (Hero, About, Contact, etc.)
│   ├── canvas/          # Apenas componentes 3D pesados
│   ├── editors/         # Editores de background (separado!)
│   ├── atoms/           # Componentes pequenos reutilizáveis
│   ├── cards/           # Cards de projetos, educação
│   └── index.ts         # Barrel leve (apenas UI)
├── backgrounds/         # Move todos os backgrounds 3D para aqui
│   ├── ParticleBackground.tsx
│   ├── LiquidUltraBackground.tsx
│   └── ...
├── utils/
│   ├── particles/       # launchParticles.ts (tipado)
│   ├── validation.ts    # Zod schemas
│   └── ...
```

#### 2.2 Refatorar Tipos
- Criar `src/types/motion.ts` separado
- Simplificar `types/index.ts` (remover herança confusa)
- Usar interfaces claras em vez de tipos genéricos

#### 2.3 Padronizar Nomenclatura
- Todos os componentes em **Inglês** (ou todos em Português, mas consistente)
- Sugestão: migrar tudo para Inglês (padrão da indústria)
- Arquivos: `kebab-case` (ex: `background-selector-modal.tsx`)
- Componentes: `PascalCase` (ex: `BackgroundSelectorModal`)

#### 2.4 Separar Responsabilidades do ThemeToggle
```typescript
// components/layout/GearButton.tsx
// components/backgrounds/BackgroundSelector.tsx
// components/backgrounds/BackgroundEditor/EditorContainer.tsx
```

---

### **FASE 3: Acessibilidade** (Média Prioridade)
**Duração estimada:** 2 dias

#### 3.1 Audit de Acessibilidade
- Rodaraxe ou Lighthouse
- Verificar contraste de cores (WCAG AA)
- Testar navegação por teclado
- Testar leitores de tela

#### 3.2 Implementar Melhorias
- Adicionar `prefers-reduced-motion` em todos os componentes 3D
- Garantir foco visível em todos elementos interativos
- Adicionar `aria-labels` em botões sem texto
- Melhorar contraste em textos sobre fundos complexos
- Implementar skip links (pular para conteúdo principal)

#### 3.3 Testes de Acessibilidade
- Configurar jest-axe ou @testing-library/a11y
- Adicionar testes básicos de acessibilidade

---

### **FASE 4: TypeScript e Segurança** (Baixa Prioridade)
**Duração estimada:** 1-2 dias

#### 4.1 Tipar `launchParticles.js`
- Converter para TypeScript
- Definir interfaces claras: `Particle`, `Config`, `SpriteCache`

#### 4.2 Usar Zod para Validação
- Já tem `zod` no package.json
- Criar schemas para `ParticleConfig`
- Validar localStorage na inicialização

#### 4.3 Melhorar Tipagem Geral
- Usar tipos mais específicos (ex: `BackgroundType` literal union)
- Evitar `any` e `unknown` desnecessários

---

### **FASE 5: Build e Bundle Optimization** (Baixa Prioridade)
**Duração estimada:** 1 dia

#### 5.1 Otimizar Chunking
```javascript
// vite.config.js - revisar manualChunks
{
  'react-vendor': [...],
  'three': [...],
  'framer-motion': [...],
  'ui': [...],
  'utils': [...],
  'backgrounds': ['@react-three/fiber', '@react-three/drei'] // separar ainda mais?
}
```

#### 5.2 Code Splitting Mais Agressivo
- Lazy load componentes pesados (ThemeToggle, BackgroundManager)
- Usar `import()` dinâmico em rotas

#### 5.3 Remover Dependências Desnecessárias
- `@exodus/bytes` (será que usa mesmo?)
- `terser` (Vite já usa)
- `sharp` + `svgo` (se não otimiza muitas imagens)

---

## 📈 Métricas de Sucesso

### Performance
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **Bundle size**: Reduzir em pelo menos 30%
- **First Paint**: < 1s com critical.css
- **Partículas ativas**: Máximo 300 (antes: ilimitado)

### Manutenibilidade
- **Componentes com >200 linhas**: 0 (mover para subcomponentes)
- **Barrel file principal**: < 30 exports (separar)
- **Tipagem**: 100% dos arquivos .tsx tipados
- **Testes**: Cobertura > 70%

### Acessibilidade
- **Lighthouse a11y score**: > 90
- **Contraste**: WCAG AA em todos textos
- **Navegação por teclado**: 100% funcional
- **Reduced motion**: Suporte completo

---

## ⚠️ Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Quebra de funcionalidade 3D | Alto | Testar cada background após refatoração |
| Aumento de bundle size | Médio | Medir bundle antes/depois em cada fase |
| Regressão de performance | Alto | Benchmarking com WebPageTest |
| Bugs em lazy loading | Médio | Testar em rede lenta (3G) |
| Perda de customizações de usuário | Alto | Manter localStorage/context intacto |

---

## 🎯 Priorização

### **Antes de qualquer coisa:**
1. ✅ Critical CSS (JÁ FEITO)
2. 🔥 `launchParticles.js` performance (FASE 1.1)
3. 🔥 Separar barrel files (FASE 1.2)
4. 🔥 Remover Background.tsx deprecated (FASE 1.3)

### **Em paralelo (se houver recursos):**
5. 📊 Audit de acessibilidade (FASE 3.1)
6. 📦 Testar bundle size atual (baseline)

### **Próximos passos (sequencial):**
7. 🎨 Refatorar ThemeToggle (FASE 1.4)
8. 📁 Reorganizar pastas (FASE 2.1)
9. 🏷️ Padronizar nomenclatura (FASE 2.3)
10. ♿ Implementar acessibilidade (FASE 3.2-3.3)

---

## 📝 Checklist de Execução

### Fase 1
- [ ] 1.1 Otimizar launchParticles.js
- [ ] 1.2 Separar barrel files
- [ ] 1.3 Remover Background.tsx
- [ ] 1.4 Refatorar ThemeToggle
- [ ] Testar performance (antes/depois)

### Fase 2
- [ ] 2.1 Reorganizar estrutura de pastas
- [ ] 2.2 Refatorar tipos
- [ ] 2.3 Padronizar nomenclatura
- [ ] Atualizar todos os imports
- [ ] Testar build

### Fase 3
- [ ] 3.1 Audit de acessibilidade
- [ ] 3.2 Implementar melhorias
- [ ] 3.3 Adicionar testes
- [ ] Validar com leitores de tela

### Fase 4
- [ ] 4.1 Tipar launchParticles
- [ ] 4.2 Usar Zod
- [ ] 4.3 Melhorar tipagem geral

### Fase 5
- [ ] 5.1 Otimizar chunking
- [ ] 5.2 Code splitting
- [ ] 5.3 Remover dependências
- [ ] Medir bundle final

---

## 🔄 Processo de Trabalho

1. **Criar branch** para cada fase: `feat/performance-phase1`, `refactor/manutenibilidade`, etc.
2. **Fazer commits atômicos** (um por mudança lógica)
3. **Testar localmente** após cada mudança
4. **Medir métricas** antes e depois
5. **Code review** (mesmo que seja você mesmo)
6. **Deploy em staging** antes de produção

---

## 📚 Recursos Úteis

### Ferramentas de Medição
- Lighthouse (Chrome DevTools)
- WebPageTest.org
- Bundle analyzer (vite-plugin-visualizer)
- axe DevTools

### Documentação
- [Critical CSS](https://web.dev/extract-critical-css/)
- [React Performance](https://react.dev/reference/react/memo)
- [Three.js Optimization](https://threejs.org/manual/#en/performance)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🎉 Próximos Passos Imediatos

**Comece pela FASE 1.1** (otimizar `launchParticles.js`) pois é o maior problema de performance identificado.

Quer que eu:
1. **Implemente a versão otimizada** de `launchParticles.js` agora?
2. **Crie os barrel files separados**?
3. **Faça a reorganização de pastas**?

Ou prefere seguir em uma ordem diferente?
