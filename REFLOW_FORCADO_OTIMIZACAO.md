# 🔧 Otimização de Reflow Forçado (Layout Thrashing)

## 📋 Problema Identificado

O relatório do Lighthouse/DevTools indicou **reflows forçados** nos seguintes arquivos:

| Arquivo | Tempo de Reflow | Origem |
|---------|----------------|--------|
| `vendor-mo….js:19:96` | 58 ms | Framer Motion / React |
| `vendor-mo….js:884:581` | 58 ms | Framer Motion / React |
| `vendor-three-fiber-ClOXwkwk.js:192:15` | 43 ms | Three.js / React Three Fiber |
| `index-Qsx4uWUF.js:111:145` | 14 ms | Código da aplicação |
| `vendor-three-fiber-ClOXwkwk.js:185:80` | 3 ms | Three.js / React Three Fiber |
| `[sem atribuição]` | 7 ms | Vários |

**Tempo total de reflow reportado: ~183 ms**

## 🔍 Causas Raiz

### 1. **launchParticles.ts** - `getBoundingClientRect()` no hover/click
O sistema de partículas do botão chamava `getBoundingClientRect()` após modificações no canvas, causando reflow forçado.

### 2. **ParticleBackground.tsx** - `getBoundingClientRect()` no mousemove
O handler de movimento do mouse chamava `getBoundingClientRect()` condicionalmente, potencialmente causando reflows durante a interação.

### 3. **liquid-background/script.js** - Resize handler sem debounce
O evento de resize chamava `renderer.setSize()` imediatamente, potencialmente causando múltiplos reflows durante o redimensionamento.

### 4. **Framer Motion** - Múltiplas animações simultâneas
O GearButton e BackgroundMenu usam múltiplas animações Framer Motion que podem causar layout thrashing.

## ✅ Soluções Implementadas

### 1. Otimizar launchParticles.ts

**Problema:** `getBoundingClientRect()` chamado após escrita de estilos no canvas.

**Solução:** Implementar cache de posição do botão com duração de 1 segundo e separar leituras de escritas usando `requestAnimationFrame`.

```typescript
// ANTES (causa reflow)
const syncLayout = (): void => {
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  
  requestAnimationFrame(() => {
    const rect = btn.getBoundingClientRect();
    btnPos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, w: rect.width };
  });
};

// DEPOIS (evita reflow com cache)
let btnPosCache: ButtonPosition | null = null;
let lastBtnPosUpdate = 0;
const BTN_POS_CACHE_DURATION = 1000; // Cache por 1 segundo

const updateBtnPosition = (): void => {
  const now = performance.now();
  // Usa cache se disponível e válido
  if (btnPosCache && (now - lastBtnPosUpdate) < BTN_POS_CACHE_DURATION) {
    btnPos = btnPosCache;
    return;
  }

  // Atualiza a posição do botão fora do ciclo de renderização principal
  requestAnimationFrame(() => {
    const rect = btn.getBoundingClientRect();
    btnPosCache = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, w: rect.width };
    btnPos = btnPosCache;
    lastBtnPosUpdate = performance.now();
  });
};
```

### 2. Otimizar ParticleBackground.tsx

**Problema:** `getBoundingClientRect()` chamado condicionalmente no `handleMouseMove`.

**Solução:** Usar coordenadas diretas do evento de mouse em vez de `getBoundingClientRect()`, já que o canvas tem `position: fixed` e `inset: 0`.

```typescript
// ANTES (causa reflow potencial)
const handleMouseMove = (e: MouseEvent) => {
  if (!canvasRectRef.current) {
    const canvas = canvasRef.current;
    if (canvas) {
      canvasRectRef.current = canvas.getBoundingClientRect(); // REFLOW!
    }
  }
  const rect = canvasRectRef.current;
  if (rect) {
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }
};

// DEPOIS (evita reflow completamente)
const handleMouseMove = (e: MouseEvent) => {
  // Usa valores diretos do evento em vez de getBoundingClientRect()
  // Como o canvas tem position: fixed e inset: 0, as coordenadas são (0, 0)
  mouseRef.current.x = e.clientX;
  mouseRef.current.y = e.clientY;
};
```

### 3. Otimizar liquid-background/script.js

**Problema:** Evento de resize sem debounce causava múltiplos reflows.

**Solução:** Usar `requestAnimationFrame` para debouncing natural.

```javascript
// ANTES (múltiplos reflows durante resize)
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
});

// DEPOIS (debounce com requestAnimationFrame)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = requestAnimationFrame(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
  });
});
```

### 4. Otimizar CSS com contain: strict

**Problema:** Múltiplas animações Framer Motion causavam layout thrashing.

**Solução:** Adicionar `contain: strict` e `will-change: transform` no GearButton e elementos relacionados.

```css
/* Gear Button - Containment estrito para isolar animações */
.gear-button,
.theme-toggle-container {
    contain: strict;
    will-change: transform;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
}

/* Launch button wrap - Otimização específica */
.launch-btn-wrap,
.launch-btn {
    contain: layout style paint;
    will-change: transform;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
}
```

## 🚀 Técnicas de Otimização Aplicadas

### 1. Cache de Posição do DOM
Em vez de consultar `getBoundingClientRect()` frequentemente, cacheamos o valor por 1 segundo.

### 2. Separação de Leituras e Escritas do DOM
Todas as escritas no DOM são feitas primeiro, e as leituras são adiadas para o próximo `requestAnimationFrame`.

### 3. Debounce com requestAnimationFrame
Usar `requestAnimationFrame` em vez de `setTimeout` para debounce garante que as operações de layout ocorram no momento certo do ciclo de renderização.

### 4. Containment CSS
O `contain: strict` isola o elemento do resto do documento, permitindo que o navegador otimize a renderização.

### 5. GPU Acceleration
`transform: translateZ(0)` e `will-change: transform` movem as animações para a GPU.

## 📊 Impacto Esperado

| Métrica | Antes | Depois (Esperado) |
|---------|-------|-----------------------------------|
| Tempo total de reflow | ~183 ms | ~30-50 ms |
| Layout thrashing | Alto | Baixo |
| Performance em scroll | Moderada | Boa |
| FPS durante animações | 45-55 | 55-60 |
| Reflows durante resize | Múltiplos | 1 por frame |

## 🔍 Como Verificar

1. Abra Chrome DevTools (F12)
2. Vá em **Performance**
3. Grave uma sessão interagindo com a página
4. Procure por barras roxas (Layout/Reflow) no timeline
5. Clique em uma barra roxa para ver o que causou o reflow

## 📝 Checklist de Verificação

- [x] Otimizar `launchParticles.ts` - cache de posição do botão com requestAnimationFrame
- [x] Otimizar `ParticleBackground.tsx` - remover getBoundingClientRect() do mousemove
- [x] Otimizar `liquid-background/script.js` - debounce no resize com requestAnimationFrame
- [x] Adicionar `contain: strict` no GearButton e elementos relacionados
- [x] Adicionar `will-change: transform` para GPU acceleration
- [ ] Testar em produção
- [ ] Medir métricas reais no Lighthouse

## 📄 Arquivos Modificados

1. **`src/utils/particles/launchParticles.ts`**
   - Adicionado cache de posição do botão (`btnPosCache`)
   - Separação de leituras e escritas do DOM
   - `getBoundingClientRect()` movido para `requestAnimationFrame`

2. **`src/components/canvas/ParticleBackground.tsx`**
   - Removido `getBoundingClientRect()` condicional do `handleMouseMove`
   - Usado coordenadas diretas do evento de mouse

3. **`src/components/canvas/liquid-background/script.js`**
   - Adicionado debounce com `requestAnimationFrame` no evento de resize

4. **`src/critical.css`**
   - Adicionado `contain: strict` no GearButton
   - Adicionado `will-change: transform` para GPU acceleration
   - Otimizações específicas para `.launch-btn-wrap` e `.launch-btn`

## 🎯 Próximas Otimizações Recomendadas

### CSS Bloqueante de Renderização

O Lighthouse identificou que o arq
uivo CSS (`/assets/index-CgwYPTjq.css`) está bloqueando a renderização, com economia estimada de 40 ms.

**Soluções recomendadas:**

1. **Critical CSS Inline**: Mover o CSS crítico para inline no `index.html`
2. **CSS Code Splitting**: Habilitar `cssCodeSplit: true` no `vite.config.js`
3. **Carregamento Assíncrono**: Usar `loadCSS` ou técnica de preload com onload
4. **Reduzir CSS não utilizado**: Remover classes Tailwind não utilizadas

**Exemplo de implementação:**

```html
<!-- No index.html, adicionar critical CSS inline -->
<style>
  /* CSS mínimo para First Paint */
  *,*::before,*::after{box-sizing:border-box}
  body{margin:0;background:#050816;color:#fff;font-family:system-ui,-apple-system,sans-serif}
  /* Adicionar mais estilos críticos conforme necessário */
</style>
```

```javascript
// No vite.config.js
build: {
  cssCodeSplit: true, // Divide CSS por chunk
  // ...
}
```

---

**Status**: ✅ **Otimizações de reflow implementadas - pronto para teste**

**Última atualização**: 2026-03-30
uivo CSS (`/assets/index-CgwYPTjq.css`) está bloqueando a renderização, com economia estimada de 40 ms.

**Soluções recomendadas:**

1. **Critical CSS Inline**: Mover o CSS crítico para inline no `index.html`
2. **CSS Code Splitting**: Habilitar `cssCodeSplit: true` no `vite.config.js`
3. **Carregamento Assíncrono**: Usar `loadCSS` ou técnica de preload com onload
4. **Reduzir CSS não utilizado**: Remover classes Tailwind não utilizadas

**Exemplo de implementação:**

```html
<!-- No index.html, adicionar critical CSS inline -->
<style>
  /* CSS mínimo para First Paint */
  *,*::before,*::after{box-sizing:border-box}
  body{margin:0;background:#050816;color:#fff;font-family:system-ui,-apple-system,sans-serif}
  /* Adicionar mais estilos críticos conforme necessário */
</style>
```

```javascript
// No vite.config.js
build: {
  cssCodeSplit: true, // Divide CSS por chunk
  // ...
}
```

---

**Status**: ✅ **Otimizações de reflow implementadas - pronto para teste**

**Última atualização**: 2026-03-30
**Última atualização**: 20
**Última atualização**:
