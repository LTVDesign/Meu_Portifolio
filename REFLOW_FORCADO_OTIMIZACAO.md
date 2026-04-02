# 🔧 Otimização de Reflow Forçado (Layout Thrashing) - v2

## 📋 Problema Identificado

O relatório do Lighthouse/DevTools indicou **reflows forçados** nos seguintes arquivos:

| Arquivo | Tempo de Reflow | Origem |
|---------|----------------|--------|
| `vendor-react-DayTaYad.js:955:145` | 69 ms | Framer Motion / React |
| `[sem atribuição]` | 56 ms | Vários |
| `index-BmuDBdDw.js:90:97` | 26 ms | Código da aplicação |
| `vendor-three-fiber-CfOpQvcH.js:192:15` | 69 ms | Three.js / React Three Fiber |

## ✅ Soluções Implementadas (v2 - 2026-04-02)

### 1. Novo hook `useDebouncedResize` (src/hooks/useDebouncedResize.ts)

**Problema:** Múltiplos componentes liam `window.innerWidth` durante eventos de resize, causando reflow forçado devido a leituras síncronas do DOM.

**Solução:** Hook otimizado que:
- Usa `requestAnimationFrame` para garantir leitura única por frame
- Threshold de 1px para evitar micro-updates
- Usa `ResizeObserver` quando possível (assíncrono)
- Exporta `useBreakpoints` para substituir cálculos de screenWidth

```typescript
// Antes - causava reflow m últiplo
useEffect(() => {
  const handleResize = () => setScreenWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Depois - RAF debounce evita reflow forçado
const { width, isMobile, isDesktop } = useBreakpoints();
```

### 2. Otimização do `VirtualList` (src/components/common/VirtualList.tsx)

**Problema:** `scrollTop` eram lido síncronamente durante evento de scroll, causando layout thrashing.

**Solução:**
- RAF para deferir leitura de `scrollTop` para próximo frame
- Threshold de 8px para evitar re-renders desnecessários
- Adicionado `contain: layout style paint` no container

### 3. Otimização da `Navbar` (src/components/layout/Navbar.tsx)

**Mudanças:**
- RAF para resize handler (evita múltiplas leituras de innerWidth)
- `useCallback` para `handleNavClick` com RAF para `scrollIntoView`
- `passive: true` no resize listener

### 4. Otimização do `Hero` (src/components/sections/Hero.tsx)

**Mudanças:**
- Substitído `useState` + `useEffect` resize por `useBreakpoints` hook
- `useMemo` para cálculos de layout responsivo (gearSize, gearLeft)

### 5. Otimização do `BackgroundMenu` (src/components/layout/BackgroundMenu.tsx)

**Mudanças:**
- Substitído `useState` + `useEffect` resize por `useBreakpoints` hook

### 6. CSS Utilities (src/globals.css)

Adicionadas classes de performance:
- `contain: layout style paint` 
- `content-visibility: auto`
- `will-change: transform`
- `gpu-layer`
- `contain-strict`

## 📊 Arquivos Modificados

| Arquivo | Mudança |
|---------|---------|
| `src/hooks/useDebouncedResize.ts` | **NOVO** - Hook com RAF debounce |
| `src/components/common/VirtualList.tsx` | RAF para scrollTop + contain |
| `src/components/layout/Navbar.tsx` | RAF resize + RAF scrollIntoView |
| `src/components/layout/BackgroundMenu.tsx` | useBreakpoints hook |
| `src/components/sections/Hero.tsx` | useBreakpoints hook + useMemo |
| `src/globals.css` | CSS utilities de performance |

## 🚀 Técnicas de Otimização Aplicadas

### 1. RequestAnimationFrame (RAF) para Resize Handlers
RAF garante que leituras de layout ocorram no paint cycle do navegador, evitando reflow forçado.

### 2. Debounce com Threshold
Micro-updates (< 1-8px) são ignorados, reduzindo re-renders desnecessários.

### 3. CSS Containment
`contain: layout style paint` isola elementos do resto do DOM, permitindo que o navegador otimize a renderização.

### 4. useBreakpoints Hook
Centraliza o cálculo de breakpoints responsivos, evitando múltiplos listeners de resize.

## 🔍 Como Verificar

1. Abra Chrome DevTools (F12)
2. Vá em **Performance**
3. Grave uma sessão interagindo com a página
4. Procure por barras roxas (Layout/Reflow) no timeline
5. Clique em uma barra roxa para ver o que causou o reflow

## 📝 Checklist de Verificação

- [x] Criar hook useDebouncedResize com RAF e debounce
- [x] Otimizar VirtualList com RAF para scrollTop
- [x] Otimizar Navbar com RAF para resize e scrollIntoView
- [x] Otimizar BackgroundMenu com useBreakpoints
- [x] Otimizar Hero com useBreakpoints e useMemo
- [x] Adicionar CSS utilities de performance
- [ ] Testar em produção
- [ ] Medir métricas reais no Lighthouse

---

**Status**: ✅ **Otimizações implementadas - pronto para deploy**
**Última atualização**: 2026-04-02