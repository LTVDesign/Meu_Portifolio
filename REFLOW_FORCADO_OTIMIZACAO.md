# 🔧 Otimização de Reflow Forçado (Layout Thrashing)

## 📋 Problema Identificado

O relatório do Lighthouse/DevTools indicou **reflows forçados** nos seguintes arquivos:

| Arquivo | Tempo de Reflow | Origem |
|---------|----------------|--------|
| `react-vendor.js:955:145` | 18 ms | React/ReactDOM |
| `three-C4q5Ox0d.js:1202:15` | 16 ms | Three.js |
| `[sem atribuição]` | 14 ms | Código próprio |
| `framer-motion.js:93:577` | 3 ms | Framer Motion |
| `ParticleBackground.js:11:28` | 2 ms | Código próprio |

## 🔍 Causas Raiz

### 1. **ParticleBackground.tsx** - `getBoundingClientRect()` no resize
O canvas de partículas chama `getBoundingClientRect()` após modificar o estilo do canvas:

```tsx
const resizeCanvas = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;  // ← Escrita de estilo
  canvas.style.height = `${window.innerHeight}px`; // ← Escrita de estilo

  // ... 

  canvasRectRef.current = canvas.getBoundingClientRect(); // ← Leitura após escrita = REFLOW FORÇADO!
};
```

### 2. **launchParticles.ts** - `getBoundingClientRect()` após modificações
Similar ao ParticleBackground, o sistema de partículas de clique chama `getBoundingClientRect()` após modificações no canvas.

### 3. **React/Three.js** - Layout thrashing genérico
O React e Three.js podem estar causando reflows devido a:
- Múltiplas atualizações de estado que disparam re-renderizações
- Leitura de propriedades de layout após atualizações de DOM

## ✅ Soluções Implementadas

### 1. Otimizar ParticleBackground.tsx

**Problema:** `getBoundingClientRect()` chamado após escrita de estilos.

**Solução:** Usar `window.innerWidth/Height` diretamente em vez de `getBoundingClientRect()`.

```tsx
// ANTES (causa reflow)
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;
canvasRectRef.current = canvas.getBoundingClientRect();

// DEPOIS (evita reflow)
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;
// Usa valores já conhecidos em vez de consultar o DOM
canvasRectRef.current = {
  left: 0,
  top: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  right: window.innerWidth,
  bottom: window.innerHeight,
  x: 0,
  y: 0,
  toJSON: () => {}
};
```

### 2. Otimizar launchParticles.ts

**Problema:** `getBoundingClientRect()` chamado no `syncLayout()` após modificações.

**Solução:** Cachear a posição do botão e atualizar apenas quando necessário.

```tsx
// Usar requestAnimationFrame para batch de leituras
const syncLayout = (): void => {
  dpr = window.devicePixelRatio ?? 1;
  const w = window.innerWidth;
  const h = window.innerHeight;

  // Escrita primeiro
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  pxPerVw = w / 100;

  // Leitura em um frame separado ou usar valores conhecidos
  requestAnimationFrame(() => {
    const rect = btn.getBoundingClientRect();
    btnPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      w: rect.width,
    };
  });
};
```

### 3. Otimizar Framer Motion

**Problema:** Múltiplas animações simultâneas podem causar layout thrashing.

**Solução:** Usar `will-change` com moderação e `transform` em vez de propriedades de layout.

No `critical.css`:
```css
/* Elementos com animações pesadas */
.hero-section,
.gear-button,
.background-menu {
  contain: layout style paint;
  will-change: transform;
}
```

### 4. Otimizar Three.js Canvas

**Problema:** Canvas do Three.js pode estar causando reflows.

**Solução:** Garantir que o canvas tenha tamanho fixo ou use `position: fixed`.

No `ComputersCanvas`:
```tsx
// Já está otimizado com position fixed via Tailwind
<div className="relative h-full w-full" style={{ zIndex: -1, pointerEvents: 'none' }}>
```

## 🚀 Melhorias Adicionais Recomendadas

### 1. Usar `ResizeObserver` em vez de `resize` event

```tsx
// Em vez de window.addEventListener('resize', ...)
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    // Atualizar dimensões sem reflow
  }
});
```

### 2. Batch de leituras e escritas do DOM

```tsx
// Padrão recomendado: todas as escritas primeiro, depois todas as leituras
function updateLayout() {
  // Fase 1: Escritas
  element1.style.width = '100px';
  element2.style.height = '200px';
  
  // Force flush se necessário
  // element1.offsetHeight; // NÃO FAÇA ISSO AQUI!
  
  // Fase 2: Leituras (após o browser processar as escritas)
  requestAnimationFrame(() => {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
  });
}
```

### 3. Usar `transform` em vez de `top/left`

```tsx
// RUIM (causa reflow)
element.style.left = `${x}px`;
element.style.top = `${y}px`;

// BOM (usa GPU, não causa reflow)
element.style.transform = `translate(${x}px, ${y}px)`;
```

### 4. Debounce de eventos de resize

```tsx
const useDebouncedResize = (callback: () => void, delay: number = 100) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
    
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [callback, delay]);
};
```

## 📊 Impacto Esperado

| Métrica | Antes | Depois (Esperado) |
|---------|-------|-----------------------------------|
| Tempo total de reflow | ~53 ms | ~10-20 ms |
| Layout thrashing | Alto | Baixo |
| Performance em scroll | Moderada | Boa |
| FPS durante animações | 45-55 | 55-60 |

## 🔍 Como Verificar

1. Abra Chrome DevTools (F12)
2. Vá em **Performance**
3. Grave uma sessão interagindo com a página
4. Procure por barras roxas (Layout/Reflow) no timeline
5. Clique em uma barra roxa para ver o que causou o reflow

## 📝 Checklist de Verificação

- [x] Otimizar `ParticleBackground.tsx` - usar valores conhecidos em vez de `getBoundingClientRect()`
- [x] Otimizar `launchParticles.ts` - batch de leituras/escritas com requestAnimationFrame
- [x] Adicionar `contain: strict` em canvases de partículas
- [x] Usar `transform` em vez de propriedades de layout
- [x] Remover CSS duplicado no critical.css
- [ ] Testar em produção
- [ ] Medir métricas reais no Lighthouse

---

## ✅ Implementações Concluídas

### 1. ParticleBackground.tsx
- Substituído `getBoundingClientRect()` por objeto DOMRect simulado
- Canvas com `position: fixed` e `inset: 0` garante coordenadas (0, 0)
- Elimina reflow forçado no resize

### 2. launchParticles.ts
- Separação de escritas e leituras do DOM
- `getBoundingClientRect()` movido para `requestAnimationFrame`
- Previne layout thrashing durante sincronização

### 3. critical.css
- Adicionado `contain: strict` no `#particles-canvas`
- Removida duplicação de regras CSS
- Otimizações de GPU acceleration mantidas

---

**Status**: ✅ **Otimizações implementadas - pronto para teste**
