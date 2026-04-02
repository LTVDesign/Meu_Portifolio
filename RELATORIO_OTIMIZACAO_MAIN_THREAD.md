# Otimização: Minimize Main-Thread Work

## Resumo das Mudanças

Este relatório documenta as otimizações implementadas para reduzir o tempo de bloqueio da thread principal (Main Thread) identificado no Google PageSpeed Insights.

## Problema Identificado

- **Aviso**: "Minimize o trabalho da thread principal" (8.5s)
- **Causa principal**: Carregamento síncrono de bibliotecas pesadas (Three.js, React Three Fiber, Drei)
- **Impacto**: Alto Total Blocking Time (TBT), página congelada durante carregamento

## Otimizações Implementadas

### 1. Lazy Loading do ComputersCanvas (Hero.tsx)

**Antes:**
```tsx
import { ComputersCanvas } from '../canvas';
```

**Depois:**
```tsx
const ComputersCanvas = lazy(() => import('../canvas/Computers').then(mod => ({ default: mod.ComputersCanvas })));

// Uso com Suspense
<Suspense fallback={null}>
  <ComputersCanvas />
</Suspense>
```

**Impacto**: O componente Three.js do computador 3D agora só é carregado quando necessário, reduzindo o JavaScript inicial.

### 2. Otimização do vite.config.js

#### 2.1 Adição de 'three' no optimizeDeps
```js
optimizeDeps: {
  include: [
    'react',
    'react-dom',
    'react-router-dom',
    'framer-motion',
    'framer-motion/m',
    'three',  // ← Adicionado
    '@react-three/fiber',
    '@react-three/drei',
  ],
}
```

**Impacto**: Pré-otimização do Three.js durante o desenvolvimento, melhorando o HMR.

#### 2.2 Desabilitação de Sourcemap em Produção
```js
build: {
  sourcemap: false,  // ← Alterado de true para false
}
```

**Impacto**: Reduz o tamanho do bundle final em produção.

## Resultados do Build

### Tamanhos dos Chunks Principais

| Chunk | Tamanho | Gzip | Brotli |
|-------|---------|------|--------|
| vendor-three-core | 657.33 kB | 165.23 kB | 129.52 kB |
| vendor-three-drei | 214.96 kB | 71.78 kB | 60.45 kB |
| vendor-three-fiber | 125.14 kB | 41.01 kB | 34.92 kB |
| vendor-motion | 119.07 kB | 38.57 kB | 33.18 kB |
| vendor-react | 143.78 kB | 47.76 kB | 38.88 kB |
| index (main) | 165.79 kB | 47.09 kB | 35.93 kB |

### Separação de Chunks (já existente)

A configuração de `manualChunks` já estava bem otimizada:
- `vendor-three-core`: Three.js principal
- `vendor-three-fiber`: React Three Fiber
- `vendor-three-drei`: Drei utilities
- `vendor-three-controls`: Controles OrbitControls, etc
- `vendor-three-loaders`: Loaders de modelos
- `vendor-three-postprocessing`: Efeitos pós-processamento
- `vendor-motion`: Framer Motion
- `vendor-react`: React + ReactDOM
- `vendor-router`: React Router

## Arquivos Modificados

1. **src/components/sections/Hero.tsx**
   - Adicionado lazy loading para ComputersCanvas
   - Adicionado Suspense wrapper

2. **vite.config.js**
   - Adicionado 'three' ao optimizeDeps.include
   - Desabilitado sourcemap em produção

## Próximos Passos Recomendados

1. **Deploy e Teste**
   - Fazer deploy no Vercel
   - Rodar PageSpeed Insights novamente
   - Comparar métricas de TBT antes/depois

2. **Otimizações Adicionais (se necessário)**
   - Considerar lazy loading de outras seções pesadas
   - Implementar intersection observer para carregar 3D apenas quando visível
   - Usar `PerformanceMonitor` do drei para reduzir qualidade em dispositivos fracos

3. **Monitoramento**
   - Usar React Profiler para identificar outros gargalos
   - Chrome Performance tab para análise detalhada

## Métricas Esperadas

Com as otimizações implementadas, espera-se:
- **Script Evaluation**: Redução de ~30-40% no carregamento inicial
- **Other**: Redução significativa com lazy loading
- **TBT Total**: Queda de 8.5s para ~3-4s (estimativa)

## Observações

- O BackgroundManager já utiliza lazy loading eficiente
- O barrel file `canvas/index.ts` não foi modificado para manter compatibilidade
- O fallback `null` no Suspense permite que o texto do Hero apareça imediatamente