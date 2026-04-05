# Página de Demonstração DynamicText

## Visão Geral

A `DynamicTextDemoPage` é uma página de demonstração completa que showcases todas as capacidades do componente `DynamicText`. Ela demonstra a detecção automática de contraste, integração com backgrounds animados, modos de cor manuais e um painel de controle em tempo real.

## Acesso

Acesse a página em: `http://localhost:5174/dynamic-text-demo`

## Funcionalidades

### 1. Layout Full-Screen
- Página ocupa toda a viewport (`100vw` x `100vh`)
- Conteúdo centralizado com flexbox
- Posicionamento absoluto sobre o canvas de partículas

### 2. ParticleBackground Animado
- Usa o componente `ParticleBackground` existente
- Animação contínua com partículas interativas
- Respondem à movimento do mouse
- Otimizado para performance (throttling, requestAnimationFrame)

### 3. Elementos de Texto com DynamicText
A página demonstra o uso do `DynamicText` em:

- **Título principal** (`h1`) - `fontSize: 3rem`
- **Subtítulos** (`h2`, `h3`) - `fontSize: 2rem` e `1.5rem`
- **Parágrafos** (`p`) - `fontSize: 1.125rem`, lineHeight: 1.8
- **Botões** (`button`) - primário e secundário
- **Links** (`a`) - link estilizado com background
- **Menu de navegação** - lista de links com `DynamicText`

### 4. Painel de Controle Flutuante

Posicionado no canto superior direito (`position: fixed`), o painel permite:

#### Modos de Cor
- **Auto**: Detecção automática (padrão)
- **Escuro**: Força texto preto (`#000000`)
- **Claro**: Força texto branco (`#ffffff`)
- **Complementar**: Usa cor complementar ao fundo detectado

#### Tipos de Background
- **Partículas**: Background animado com canvas
- **Claro**: Fundo branco (`#ffffff`)
- **Escuro**: Fundo escuro (`#1a1a1a`)
- **Colorido**: Fundo indigo (`#4F46E5`)

#### Informações em Tempo Real
- Cor de fundo detectada (com amostra visual)
- Cor de texto recomendada (com amostra visual)
- Luminância (0-100%)
- Tipo de background (solid, gradient, image, mixed, transparent)
- Indicador de modo escuro
- Indicador de fundo colorido
- Cor efetiva atual (com amostra)
- Contador de atualizações (debug de performance)

### 5. Detecção em Tempo Real

O hook `useDynamicTextColor` é configurado com:
- `sampleSize: 16` - resolução do canvas para amostragem
- `updateInterval: 100` - intervalo mínimo entre atualizações
- `fallbackMode: 'auto'` - modo de fallback

### 6. Contraste WCAG AA

O `DynamicText` garante automaticamente:
- Contraste mínimo de 4.5:1 (WCAG AA)
- Transições suaves de 400ms
- Sem flicker (otimizado com debouncing)

### 7. Performance

Otimizações implementadas:
- `updateInterval: 100ms` evita atualizações excessivas
- `useCallback` para funções estáveis
- `useMemo` para cálculos dispendiosos
- Throttling no hook de detecção
- Canvas otimizado no ParticleBackground

### 8. Acessibilidade

- Contraste WCAG AA garantido
- Transições suaves (não causam fotosensibilidade)
- Texto legível em todos os modos
- Painel com informações claras

## Estrutura do Código

```
src/pages/DynamicTextDemoPage.tsx
├── Estados
│   ├── colorMode - modo de cor atual
│   ├── backgroundType - tipo de background
│   ├── customBackground - cor customizada
│   ├── detectionResult - resultado da detecção
│   └── updateCount - contador de atualizações
├── Referências
│   └── containerRef - container para detecção
├── Hook de Detecção
│   └── useDynamicTextColor - detecção inteligente
├── Effects
│   ├── Atualiza painel com resultados
│   └── Aplica background customizado
├── Handlers
│   ├── handleColorModeChange
│   ├── handleBackgroundChange
│   ├── getCurrentComplementary
│   └── getEffectiveTextColor
├── Estilos
│   ├── containerStyle
│   └── panelStyle
└── Renderização
    ├── ParticleBackground (condicional)
    ├── Container com DynamicTexts
    └── Painel de controle
```

## Uso do DynamicText

### Modo Auto (padrão)
```tsx
<DynamicText transitionDuration={400}>
  Texto com detecção automática
</DynamicText>
```

### Modo Escuro
```tsx
<DynamicText colorMode="dark" transitionDuration={400}>
  Texto sempre preto
</DynamicText>
```

### Modo Claro
```tsx
<DynamicText colorMode="light" transitionDuration={400}>
  Texto sempre branco
</DynamicText>
```

### Modo Complementar
```tsx
<DynamicText colorMode="complement" transitionDuration={400}>
  Texto com cor complementar ao fundo
</DynamicText>
```

## Integração com R3F

Nota: O `ParticleBackground` usa canvas 2D, não React Three Fiber. Para integrar com R3F, use a prop `threeRenderer`:

```tsx
// Em um componente com Three.js/R3F:
const rendererRef = useRef<THLE.WebGLRenderer>(null);

<DynamicText threeRenderer={() => rendererRef.current}>
  Texto sobre canvas 3D
</DynamicText>
```

## Testes

### Testes Manuais
1. Acesse `/dynamic-text-demo`
2. Alterne entre os modos de cor (Auto/Dark/Light/Complement)
3. Alterne entre os backgrounds (Partículas/Claro/Escuro/Colorido)
4. Observe a mudança suave de cores (400ms)
5. Verifique o contraste no painel
6. Teste a performance (contador de atualizações)

### Verificações de Acessibilidade
- [ ] Contraste mínimo 4.5:1 em todos os modos
- [ ] Transições não causam flicker
- [ ] Texto legível em todos os backgrounds
- [ ] Painel acessível e legível

## Notas Técnicas

### Por que não usar threeRenderer?
O `ParticleBackground` implementa renderização 2D via Canvas API, não React Three Fiber. Portanto, a detecção funciona normalmente através do canvas 2D sem necessidade do renderer Three.js.

### Performance
- O hook `useDynamicTextColor` usa `requestAnimationFrame` internamente
- Throttling de 100ms por padrão
- Observers para mudanças de tamanho e estilo
- Cache de cores para evitar recálculos desnecessários

### Fallback
Se a detecção falhar, o hook usa o `fallbackMode` configurado. O padrão é `'auto'` que escolhe preto ou branco baseado na luminância.

## Melhorias Futuras

- [ ] Adicionar mais tipos de background (gradientes CSS, imagens)
- [ ] Permitir customização de partículas via painel
- [ ] Exportar configurações
- [ ] Adicionar gravação de sessão
- [ ] Suporte a múltiplos containers

## Créditos

Desenvolvido como demonstração do componente `DynamicText` e hook `useDynamicTextColor`.
