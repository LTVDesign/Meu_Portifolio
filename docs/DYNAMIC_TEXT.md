# Sistema de Texto Dinâmico

## 📋 Visão Geral

O **Sistema de Texto Dinâmico** é uma solução completa para garantir contraste ótimo entre texto e fundo em aplicações React, especialmente projetada para:

- **Acessibilidade WCAG AA**: Garante contraste mínimo de 4.5:1 para texto normal
- **Adaptação automática**: Detecta cor de fundo em tempo real (sólido, gradiente, imagem, canvas 3D)
- **Performance otimizada**: Throttling inteligente com `requestAnimationFrame` e `ResizeObserver`
- **Integração React Three Fiber**: Suporte nativo para cenários 3D
- **Transições suaves**: Animações CSS sem flicker (400ms padrão)

### Como Funciona

```
┌─────────────────────────────────────────────────────────────┐
│                    DynamicText Component                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐         ┌──────────────────────────┐  │
│  │ useDynamicTextColor Hook │                            │  │
│  └────────┬────────┘         │                          │  │
│           │                   │                          │  │
│  ┌────────▼───────────────────▼──────────┐                │  │
│  │    Detecção de Fundo (Background)     │                │  │
│  │  • CSS sólido (backgroundColor)       │                │  │
│  │  • Gradientes CSS (parsing)           │                │  │
│  │  • Imagens (canvas sampling)          │                │  │
│  │  • Three.js renderer (readPixels)     │                │  │
│  └────────┬──────────────────────────────┘                │  │
│           │                                               │  │
│  ┌────────▼──────────────────┐                           │  │
│  │ Cálculo de Luminância     │                           │  │
│  │ (fórmula WCAG sRGB)       │                           │  │
│  └────────┬──────────────────┘                           │  │
│           │                                               │  │
│  ┌────────▼──────────────────┐                           │  │
│  │ Decisão de Cor de Texto   │                           │  │
│  │ • Preto (#000)            │                           │  │
│  │ • Branco (#fff)           │                           │  │
│  │ • Complementar (colorido)│                           │  │
│  └────────┬──────────────────┘                           │  │
│           │                                               │  │
│  └────────┴───────────────────► { textColor, ... }       │  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Arquivos Criados

### 1. `src/utils/contrastUtils.ts`

**Descrição**: Biblioteca de utilitários para cálculos de contraste e manipulação de cores baseados em WCAG 2.1. Todas as funções são puras e sem side effects.

**Responsabilidades**:
- Cálculo de luminância segundo fórmula sRGB WCAG
- Cálculo de ratio de contraste
- Conversões entre formatos de cor (RGB ↔ HSL ↔ Hex)
- Determinação de cor de texto ótima (preto/branco)
- Análise de paletas de cores

**Exportações**:
```typescript
export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };
export type ColorInput = string | RGB;

export function getLuminance(r: number, g: number, b: number): number;
export function getContrastRatio(lum1: number, lum2: number): number;
export function hexToRGB(hex: string): RGB;
export function rgbToHSL(r: number, g: number, b: number): HSL;
export function hslToRGB(h: number, s: number, l: number): RGB;
export function rgbToHex(r: number, g: number, b: number): string;
export function getComplementaryColor(hex: string): string;
export function getDominantColorFromPalette(colors: string[]): string;
export function isDarkBackground(luminance: number): boolean;
export function getOptimalTextColor(bgLuminance: number): string;
export function getOptimalTextColorForHex(bgHex: string): string;
```

---

### 2. `src/hooks/useDynamicTextColor.ts`

**Descrição**: Hook React que implementa a lógica principal de detecção de cor de fundo e cálculo de cor de texto ótima.

**Responsabilidades**:
- Observar mudanças no elemento (resize, mutations)
- Amostrar cor de fundo via canvas ou Three.js
- Calcular luminância e contraste
- Throttling inteligente com `requestAnimationFrame`
- Gerenciamento de ciclo de vida (cleanup automático)

**Tipos Principais**:
```typescript
export type BackgroundType = 'solid' | 'gradient' | 'image' | 'mixed' | 'transparent';

export interface UseDynamicTextColorOptions {
    sampleSize?: number;           // Resolução do canvas (padrão: 16)
    updateInterval?: number;       // Intervalo mínimo entre atualizações ms (padrão: 100)
    fallbackMode?: 'dark' | 'light' | 'auto';  // Modo fallback (padrão: 'auto')
    threeRenderer?: () => THREE.WebGLRenderer | null;  // Renderer Three.js opcional
}

export interface UseDynamicTextColorResult {
    textColor: string;             // Cor de texto recomendada (hex)
    backgroundColor: string;       // Cor de fundo detectada (hex)
    isDark: boolean;               // Se fundo é escuro (luminância < 0.5)
    isColorful: boolean;           // Se fundo é colorido/movimentado
    backgroundType: BackgroundType; // Tipo de fundo detectado
    luminance: number;             // Luminância (0-1)
}
```

**Uso Básico**:
```tsx
const ref = useRef<HTMLElement>(null);
const { textColor, backgroundColor, isDark } = useDynamicTextColor(ref, {
    sampleSize: 32,
    updateInterval: 200,
    fallbackMode: 'auto'
});

return <div ref={ref} style={{ color: textColor, backgroundColor }}>
    Conteúdo adaptativo
</div>;
```

---

### 3. `src/components/atoms/DynamicText.tsx`

**Descrição**: Componente React que encapsula o hook `useDynamicTextColor` e fornece uma API declarativa com animações Framer Motion.

**Responsabilidades**:
- Aplicar cor dinâmica ao texto
- Suportar múltiplos modos de cor (auto, dark, light, complement)
- Transições CSS suaves (400ms padrão)
- Integração com Framer Motion (motion.span)
- Callback `onColorChange` para monitoramento

**Props**:
```typescript
export interface DynamicTextProps extends Omit<MotionProps, 'children'> {
    children: React.ReactNode;              // Conteúdo (texto, elementos)
    colorMode?: 'auto' | 'dark' | 'light' | 'complement';  // Estratégia
    transitionDuration?: number;            // Duração transição ms (padrão: 400)
    className?: string;                     // Classes CSS adicionais
    style?: React.CSSProperties;            // Estilos inline
    threeRenderer?: () => THREE.WebGLRenderer | null;  // Renderer R3F
    onColorChange?: (result: UseDynamicTextColorResult) => void;  // Callback
}
```

**Modos de Cor**:
- `auto`: Usa contraste ótimo automático (preto ou branco)
- `dark`: Força cor escura (#000000)
- `light`: Força cor clara (#ffffff)
- `complement`: Usa cor complementar ao fundo (para fundos coloridos)

**Exemplo**:
```tsx
<DynamicText colorMode="auto" transitionDuration={400}>
    Texto com contraste automático
</DynamicText>

<DynamicText colorMode="complement" className="text-xl">
    Texto com cor complementar
</DynamicText>
```

---

### 4. `src/components/atoms/DynamicTextProvider.tsx`

**Descrição**: Provider React que gerencia configurações globais para o sistema DynamicText, permitindo definir valores padrão sem precisar passar props repetidamente.

**Responsabilidades**:
- Criar contexto React para configurações globais
- Fornecer valores padrão para todos os DynamicText na aplicação
- Exportar hook `useDynamicTextContext` para acesso às configurações
- Garantir performance com memoização do contexto

**Tipos Principais**:
```typescript
export interface DynamicTextProviderProps {
    children: ReactNode;
    defaultColorMode?: 'auto' | 'dark' | 'light' | 'complement';
    defaultTransitionDuration?: number;
    fallbackMode?: 'dark' | 'light' | 'auto';
}

export interface DynamicTextContextValue {
    defaultColorMode: 'auto' | 'dark' | 'light' | 'complement';
    defaultTransitionDuration: number;
    fallbackMode: 'dark' | 'light' | 'auto';
}
```

**Uso Básico**:
```tsx
import { DynamicTextProvider } from './components/atoms/DynamicTextProvider';

function App() {
    return (
        <DynamicTextProvider
            defaultColorMode="auto"
            defaultTransitionDuration={400}
            fallbackMode="auto"
        >
            <SuaAplicacao />
        </DynamicTextProvider>
    );
}
```

**Ordem de Prioridade**:
1. Props locais do DynamicText (maior prioridade)
2. Configurações do DynamicTextProvider (contexto)
3. Valores padrão do componente DynamicText (menor prioridade)

**Exemplo Completo**:
```tsx
// App.tsx
import { DynamicTextProvider } from './components/atoms/DynamicTextProvider';

function App() {
    return (
        <DynamicTextProvider
            defaultColorMode="auto"
            defaultTransitionDuration={300}
            fallbackMode="light"
        >
            <Router>
                <Navbar />
                <main>
                    <DynamicText colorMode="dark">
                        {/* Usa 'dark' (prop local) */}
                        Título com modo forçado
                    </DynamicText>
                    
                    <DynamicText>
                        {/* Usa 'auto' do contexto */}
                        Título com modo automático
                    </DynamicText>
                </main>
            </Router>
        </DynamicTextProvider>
    );
}
```

**Hook `useDynamicTextContext`**:

Permite acessar as configurações globais dentro de qualquer componente.

```tsx
import { useDynamicTextContext } from './components/atoms/DynamicTextProvider';

function MeuComponente() {
    const { defaultColorMode, defaultTransitionDuration, fallbackMode } =
        useDynamicTextContext();
    
    console.log(`Modo padrão: ${defaultColorMode}`);
    console.log(`Transição: ${defaultTransitionDuration}ms`);
    
    return <div>...</div>;
}
```

**⚠️ Importante**: O hook deve ser usado dentro de um `DynamicTextProvider`. Caso contrário, lança erro.

---

### 5. `src/pages/DynamicTextDemoPage.tsx`

**Descrição**: Página de demonstração completa que showcase todas as funcionalidades do sistema.

**Funcionalidades Demonstradas**:
- Detecção em tempo real com painel de controle
- Alternância entre modos de cor (auto/dark/light/complement)
- Alternância entre tipos de background (partículas/claro/escuro/colorido)
- Integração com `ParticleBackground` (canvas 2D animado)
- Exibição de métricas (luminância, tipo, contraste)
- Contador de atualizações (debug performance)

**Estrutura**:
```tsx
export default function DynamicTextDemoPage() {
    const [colorMode, setColorMode] = useState<'auto' | 'dark' | 'light' | 'complement'>('auto');
    const [backgroundType, setBackgroundType] = useState<'particles' | 'light' | 'dark' | 'colorful'>('particles');
    const [detectionResult, setDetectionResult] = useState<UseDynamicTextColorResult | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const { textColor, backgroundColor, isDark, isColorful, backgroundType: detectedBgType, luminance } =
        useDynamicTextColor(containerRef, { sampleSize: 16, updateInterval: 100 });

    // Atualiza painel...
    // Renderiza ParticleBackground condicionalmente
    // Renderiza DynamicText em múltiplos contextos
    // Renderiza painel de controle com métricas
}
```

---

## 🔧 API Reference

### `useDynamicTextColor` Hook

**Assinatura**:
```typescript
export function useDynamicTextColor(
    ref: React.RefObject<HTMLElement>,
    options: UseDynamicTextColorOptions = {}
): UseDynamicTextColorResult;
```

**Parâmetros**:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `ref` | `React.RefObject<HTMLElement>` | Sim | Referência para o elemento cujo fundo será analisado |
| `options` | `UseDynamicTextColorOptions` | Não | Opções de configuração |

**Opções (`UseDynamicTextColorOptions`)**:

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `sampleSize` | `number` | `16` | Resolução do canvas para amostragem (16x16 pixels). Valores maiores = mais precisão, mais CPU |
| `updateInterval` | `number` | `100` | Intervalo mínimo entre atualizações em ms. Controla frequência de polling |
| `fallbackMode` | `'dark' \| 'light' \| 'auto'` | `'auto'` | Comportamento quando detecção falha |
| `threeRenderer` | `() => THREE.WebGLRenderer \| null` | `undefined` | Callback que retorna renderer Three.js (para R3F) |

**Retorno (`UseDynamicTextColorResult`)**:

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `textColor` | `string` | Cor de texto recomendada em hex (ex: `#000000` ou `#ffffff`) |
| `backgroundColor` | `string` | Cor de fundo detectada em hex |
| `isDark` | `boolean` | `true` se luminância < 0.5 |
| `isColorful` | `boolean` | `true` se fundo é gradiente/imagem/movimentado |
| `backgroundType` | `BackgroundType` | Tipo de fundo: `'solid'`, `'gradient'`, `'image'`, `'mixed'`, `'transparent'` |
| `luminance` | `number` | Luminância calculada (0-1, onde 0=preto, 1=branco) |

**Exemplo Completo**:
```tsx
import { useRef } from 'react';
import { useDynamicTextColor } from '../hooks/useDynamicTextColor';

function MyComponent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const {
        textColor,
        backgroundColor,
        isDark,
        isColorful,
        backgroundType,
        luminance
    } = useDynamicTextColor(containerRef, {
        sampleSize: 32,
        updateInterval: 150,
        fallbackMode: 'auto'
    });

    return (
        <div ref={containerRef} style={{ color: textColor, backgroundColor }}>
            <h1>Título adaptativo</h1>
            <p>Texto que se ajusta ao fundo</p>
        </div>
    );
}
```

---

### `DynamicText` Component

**Assinatura**:
```typescript
export function DynamicText({
    children,
    colorMode = 'auto',
    transitionDuration = 400,
    className = '',
    style = {},
    threeRenderer,
    onColorChange,
    ...motionProps
}: DynamicTextProps): JSX.Element;
```

**Props**:

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `children` | `React.ReactNode` | **obrigatório** | Conteúdo do componente |
| `colorMode` | `'auto' \| 'dark' \| 'light' \| 'complement'` | `'auto'` | Estratégia de cálculo da cor |
| `transitionDuration` | `number` | `400` | Duração da transição CSS em ms |
| `className` | `string` | `''` | Classes CSS adicionais |
| `style` | `React.CSSProperties` | `{}` | Estilos inline adicionais |
| `threeRenderer` | `() => THREE.WebGLRenderer \| null` | `undefined` | Renderer Three.js (R3F) |
| `onColorChange` | `(result: UseDynamicTextColorResult) => void` | `undefined` | Callback quando cor muda |

**Modos de Cor Detalhados**:

| Modo | Comportamento | Caso de Uso |
|------|---------------|-------------|
| `auto` | Usa preto ou branco baseado na luminância (WCAG) | Padrão, acessibilidade |
| `dark` | Força preto (#000000) | Fundos claros garantidos |
| `light` | Força branco (#ffffff) | Fundos escuros garantidos |
| `complement` | Usa cor complementar ao fundo detectado | Fundos coloridos, efeitos visuais |

**Exemplos**:

```tsx
// 1. Uso básico (auto)
<DynamicText>
    Texto com contraste automático
</DynamicText>

// 2. Forçando cor clara
<DynamicText colorMode="light" className="text-2xl font-bold">
    Sempre branco
</DynamicText>

// 3. Cor complementar (para fundos coloridos)
<DynamicText colorMode="complement" transitionDuration={600}>
    Cor complementar ao fundo
</DynamicText>

// 4. Com estilo customizado
<DynamicText
    style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.05em' }}
    transitionDuration={300}
>
    Texto estilizado
</DynamicText>

// 5. Integração React Three Fiber
const rendererRef = useRef<THREE.WebGLRenderer>(null);

<DynamicText threeRenderer={() => rendererRef.current}>
    Texto sobre canvas 3D
</DynamicText>

// 6. Com callback de monitoramento
<DynamicText
    onColorChange={(result) => {
        console.log('Cor mudou:', result.textColor, 'Fundo:', result.backgroundColor);
    }}
>
    Texto monitorado
</DynamicText>

// 7. Com Framer Motion props
<DynamicText
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
>
    Texto animado
</DynamicText>
```

---

### Funções de `contrastUtils`

#### `getLuminance(r: number, g: number, b: number): number`

Calcula a luminância relativa de uma cor RGB segundo WCAG 2.1.

**Fórmula**:
```
L = 0.2126 × R_linear + 0.7152 × G_linear + 0.0722 × B_linear
```

Onde R, G, B são valores linearizados (correção sRGB):
```
C_linear = C_srgb ≤ 0.03928 ? C_srgb / 12.92 : ((C_srgb + 0.055) / 1.055)^2.4
```

**Parâmetros**:
- `r`, `g`, `b`: Componentes RGB (0-255)

**Retorno**: Luminância no intervalo [0, 1]

**Exemplos**:
```typescript
getLuminance(255, 255, 255) // → 1.0 (branco puro)
getLuminance(0, 0, 0)       // → 0.0 (preto puro)
getLuminance(128, 128, 128) // → ~0.215 (cinza médio)
```

---

#### `getContrastRatio(lum1: number, lum2: number): number`

Calcula o ratio de contraste entre duas luminâncias.

**Fórmula WCAG**:
```
contrast = (L1 + 0.05) / (L2 + 0.05)  onde L1 ≥ L2
```

**Parâmetros**:
- `lum1`, `lum2`: Luminâncias (0-1)

**Retorno**: Ratio de contraste (≥ 1)

**Exemplos**:
```typescript
getContrastRatio(1, 0)   // → 21 (máximo: branco sobre preto)
getContrastRatio(0, 1)   // → 21 (preto sobre branco)
getContrastRatio(0.5, 0.5) // → 1 (sem contraste)
getContrastRatio(0.9, 0.4) // → ~3.2
```

---

#### `getOptimalTextColor(bgLuminance: number): string`

Retorna a cor de texto ótima (preto ou branco) para um fundo com base no contraste mínimo WCAG AA de 4.5:1.

**Lógica**:
1. Calcula contraste do fundo com preto (L=0)
2. Calcula contraste do fundo com branco (L=1)
3. Se preto ≥ 4.5:1 → retorna `#000000`
4. Se branco ≥ 4.5:1 → retorna `#ffffff`
5. Caso contrário, retorna a cor com maior contraste

**Parâmetros**:
- `bgLuminance`: Luminância do fundo (0-1)

**Retorno**: `'#000000'` ou `'#ffffff'`

**Exemplos**:
```typescript
getOptimalTextColor(0.9)  // → '#000000' (fundo muito claro)
getOptimalTextColor(0.1)  // → '#ffffff' (fundo muito escuro)
getOptimalTextColor(0.5)  // → '#000000' ou '#ffffff' (depende dos cálculos)
```

---

#### `getOptimalTextColorForHex(bgHex: string): string`

Versão conveniente que aceita cor de fundo em hexadecimal diretamente.

**Parâmetros**:
- `bgHex`: Cor de fundo em hex (ex: `'#ff0000'`, `'#4F46E5'`)

**Retorno**: Cor de texto em hex

**Exemplos**:
```typescript
getOptimalTextColorForHex('#ffffff') // → '#000000'
getOptimalTextColorForHex('#000000') // → '#ffffff'
getOptimalTextColorForHex('#4F46E5') // → '#ffffff' (indigo escuro)
```

---

#### `getComplementaryColor(hex: string): string`

Retorna a cor complementar de uma cor hexadecimal, rotacionando o matiz (H) em 180° no espaço HSL.

**Use Cases**:
- Fundos coloridos/gradientes onde preto/branco podem não ser ideais
- Efeitos visuais artísticos
- Contraste harmônico (não apenas WCAG)

**Parâmetros**:
- `hex`: Cor de entrada em hex

**Retorno**: Cor complementar em hex

**Exemplos**:
```typescript
getComplementaryColor('#ff0000') // → '#00ffff' (ciano)
getComplementaryColor('#00ff00') // → '#ff00ff' (magenta)
getComplementaryColor('#0000ff') // → '#ffff00' (amarelo)
getComplementaryColor('#4F46E5') // → '#d46e1a' (laranja)
```

---

#### `hexToRGB(hex: string): RGB`

Converte cor hexadecimal para objeto RGB.

**Formatos Suportados**:
- `#RGB` (forma curta)
- `#RRGGBB` (forma longa)
- `RGB` (sem #)

**Parâmetros**:
- `hex`: Cor em hex

**Retorno**: `{ r: number, g: number, b: number }` (valores 0-255)

**Exceções**: `Error` se formato inválido

**Exemplos**:
```typescript
hexToRGB('#ff0000')  // → { r: 255, g: 0, b: 0 }
hexToRGB('00ff00')   // → { r: 0, g: 255, b: 0 }
hexToRGB('#abc')     // → { r: 170, g: 187, b: 204 } (expandido)
```

---

#### `rgbToHSL(r: number, g: number, b: number): HSL`

Converte RGB para HSL.

**Parâmetros**:
- `r`, `g`, `b`: Componentes RGB (0-255)

**Retorno**: `{ h: number, s: number, l: number }`
- `h`: Matiz (0-360)
- `s`: Saturação (0-1)
- `l`: Luminância (0-1)

---

#### `hslToRGB(h: number, s: number, l: number): RGB`

Converte HSL para RGB.

**Parâmetros**:
- `h`: Matiz (0-360)
- `s`: Saturação (0-1)
- `l`: Luminância (0-1)

**Retorno**: `{ r: number, g: number, b: number }` (0-255)

---

#### `getDominantColorFromPalette(colors: string[]): string`

Calcula a cor dominante de um array de cores hex.

**Estratégia**:
1. Conta frequência de cada cor
2. Se uma cor é pelo menos 2x mais frequente que a segunda → retorna ela
3. Caso contrário → calcula média ponderada de todas as cores

**Parâmetros**:
- `colors`: Array de cores em hex

**Retorno**: Cor dominante em hex

**Exceções**: `Error` se array vazio

**Exemplos**:
```typescript
getDominantColorFromPalette(['#ff0000', '#00ff00', '#ff0000'])
// → '#ff0000' (2 occurrences vs 1)

getDominantColorFromPalette(['#ff0000', '#00ff00'])
// → média ponderada → algo como '#808080' (cinza)
```

---

#### `isDarkBackground(luminance: number): boolean`

Verifica se um fundo é considerado escuro.

**Critério**: Luminância < 0.5

**Parâmetros**:
- `luminance`: Luminância (0-1)

**Retorno**: `true` se escuro, `false` se claro

---

## 📖 Guia de Uso

### Como Usar em Componentes Existentes

**Passo 1**: Importe o componente ou hook

```tsx
// Opção A: Componente (recomendado para texto simples)
import { DynamicText } from '../components/atoms/DynamicText';

// Opção B: Hook (recomendado para lógica customizada)
import { useDynamicTextColor } from '../hooks/useDynamicTextColor';
```

**Passo 2**: Aplique no seu componente

```tsx
// Com DynamicText (simples)
function Navbar() {
    return (
        <nav style={{ backgroundColor: '#1a1a1a' }}>
            <DynamicText>
                <a href="/">Home</a>
            </DynamicText>
            <DynamicText>
                <a href="/about">Sobre</a>
            </DynamicText>
        </nav>
    );
}

// Com hook (customizado)
function CustomComponent() {
    const ref = useRef<HTMLDivElement>(null);
    const { textColor, backgroundColor } = useDynamicTextColor(ref);

    return (
        <div ref={ref} style={{ color: textColor, backgroundColor }}>
            <h1>Título</h1>
            <p>Parágrafo</p>
        </div>
    );
}
```

**Passo 3**: Ajuste estilos conforme necessário

```tsx
<DynamicText
    className="text-lg font-semibold"
    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
    transitionDuration={300}
>
    Texto com estilo extra
</DynamicText>
```

---

### Integração com React Three Fiber

O sistema suporta detecção de cor diretamente de renderers Three.js.

**Passo 1**: Configure o renderer reference

```tsx
import { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { DynamicText } from '../components/atoms/DynamicText';

function Scene() {
    const { gl } = useThree();  // gl = WebGLRenderer

    return (
        <>
            {/* Seus objetos 3D */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="orange" />
            </mesh>

            {/* Texto sobreposto que se adapta ao 3D */}
            <Html>
                <DynamicText threeRenderer={() => gl}>
                    Texto sobre cena 3D
                </DynamicText>
            </Html>
        </>
    );
}

function App() {
    return (
        <Canvas>
            <Scene />
        </Canvas>
    );
}
```

**Passo 2**: Alternativa com hook customizado

```tsx
function ThreeJSComponent() {
    const rendererRef = useRef<THREE.WebGLRenderer>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { textColor } = useDynamicTextColor(containerRef, {
        threeRenderer: () => rendererRef.current
    });

    return (
        <div ref={containerRef}>
            <Canvas ref={rendererRef}>
                {/* ... */}
            </Canvas>
            <p style={{ color: textColor }}>Texto adaptativo</p>
        </div>
    );
}
```

**Nota**: O `threeRenderer` é opcional. Se não fornecido, o hook usa apenas detecção DOM.

---

### Como Customizar Modos de Cor

#### Modo `auto` (Padrão WCAG)

```tsx
<DynamicText colorMode="auto">
    Usa preto ou branco baseado na luminância do fundo
</DynamicText>
```

**Lógica Interna**:
```typescript
// Se fundo claro (luminância ≥ 0.5) → texto preto
// Se fundo escuro (luminância < 0.5) → texto branco
// Sempre garante contraste ≥ 4.5:1
```

---

#### Modo `dark` (Forçar Preto)

```tsx
<DynamicText colorMode="dark">
    Sempre preto (#000000), independente do fundo
</DynamicText>
```

**Use quando**:
- Fundo é garantidamente claro
- Quer estilo consistente independente do contexto
- Design system exige texto preto

**⚠️ Aviso**: Pode violar WCAG se o fundo for escuro. Use com cuidado.

---

#### Modo `light` (Forçar Branco)

```tsx
<DynamicText colorMode="light">
    Sempre branco (#ffffff), independente do fundo
</DynamicText>
```

**Use quando**:
- Fundo é garantidamente escuro
- Headers/overlays sobre imagens escuras
- Design system exige texto branco

---

#### Modo `complement` (Cor Complementar)

```tsx
<DynamicText colorMode="complement">
    Cor complementar ao fundo detectado (rotação HSL 180°)
</DynamicText>
```

**Use quando**:
- Fundos coloridos/gradientes
- Quer contraste harmônico (não apenas preto/branco)
- Efeitos visuais artísticos
- Fundos com múltiplas cores

**Lógica**:
```typescript
// Se fundo é colorido/movimentado:
// 1. Calcula cor complementar (H + 180°)
// 2. Verifica se contraste ≥ 4.5:1
// 3. Se não, fallback para preto/branco
```

**Exemplo visual**:
```tsx
// Fundo: #4F46E5 (indigo)
// Complementar: #d46e1a (laranja)
// Contraste: ~4.2:1 (abaixo do WCAG)
// Fallback: #ffffff (contraste ~10:1)
```

---

### Performance Considerations

#### Throttling Inteligente

O hook usa múltiplas estratégias para evitar atualizações excessivas:

1. **`updateInterval`**: Intervalo mínimo entre atualizações (padrão 100ms)
2. **`requestAnimationFrame`**: Debounce de resize/mutation
3. **Comparação de cores**: Só atualiza state se cor mudou
4. **`ResizeObserver`**: Detecção eficiente de redimensionamento
5. **`MutationObserver`**: Observa mudanças de estilo/class
6. **Polling fallback**: `setInterval` como backup (intervalo × 2)

```typescript
// Configuração de performance
useDynamicTextColor(ref, {
    sampleSize: 16,        // Menor = mais rápido (precisão OK)
    updateInterval: 100,   // 100ms é bom equilíbrio
    fallbackMode: 'auto'
});
```

---

#### Otimizações Recomendadas

**1. Ajuste `sampleSize` conforme necessidade**:

```tsx
// Alta precisão (imagens complexas)
useDynamicTextColor(ref, { sampleSize: 64 });  // 64×64 pixels

// Performance máxima (texto simples)
useDynamicTextColor(ref, { sampleSize: 8 });   // 8×8 pixels

// Padrão (bom equilíbrio)
useDynamicTextColor(ref, { sampleSize: 16 });
```

**2. Aumente `updateInterval` para backgrounds estáticos**:

```tsx
// Background que raramente muda
useDynamicTextColor(ref, { updateInterval: 500 });  // 500ms
```

**3. Use `useMemo`/`useCallback` para evitar re-renders**:

```tsx
const options = useMemo(() => ({
    sampleSize: 16,
    updateInterval: 100,
    fallbackMode: 'auto'
}), []);

const { textColor } = useDynamicTextColor(ref, options);
```

**4. Limite o número de `DynamicText` em telas grandes**:

```tsx
// ❌ Evite: Muitos DynamicText em listas grandes
{items.map(item => (
    <DynamicText key={item.id}>{item.title}</DynamicText>
))}

// ✅ Melhor: Aplique no container pai
<div style={{ color: textColor }}>
    {items.map(item => (
        <span key={item.id}>{item.title}</span>
    ))}
</div>
```

---

#### Medição de Performance

```tsx
function PerformanceMonitor() {
    const [updates, setUpdates] = useState(0);
    const { onColorChange } = useDynamicTextColor(ref);

    useEffect(() => {
        const start = performance.now();
        return () => {
            const duration = performance.now() - start;
            console.log(`Hook executado em ${duration.toFixed(2)}ms`);
        };
    }, []);

    return <div>Atualizações: {updates}</div>;
}
```

---

## ♿ WCAG AA Compliance

### Requisitos de Contraste

A **WCAG 2.1** (Web Content Accessibility Guidelines) define:

| Tipo de Texto | Mínimo AA | Mínimo AAA |
|---------------|-----------|------------|
| Normal (≤ 18px) | 4.5:1 | 7:1 |
| Grande (≥ 18px bold ou 24px regular) | 3:1 | 4.5:1 |

**Nosso sistema**:
- Garante **4.5:1** para todos os textos (padrão AA normal)
- Usa fórmula sRGB oficial WCAG
- Testa contra preto e branco
- Fallback para maior contraste se necessário

---

### Fórmula de Luminância (sRGB)

A WCAG 2.1 especifica correção sRGB para desconsiderar não-linearidades de displays:

```
Para cada canal R, G, B (0-255):
1. Normalizar: C_srgb = C / 255
2. Linearizar:
   Se C_srgb ≤ 0.03928:
       C_linear = C_srgb / 12.92
   Senão:
       C_linear = ((C_srgb + 0.055) / 1.055)^2.4
3. Luminância = 0.2126×R_linear + 0.7152×G_linear + 0.0722×B_linear
```

**Por que essa correção?**
- Displays CRT/LCD têm resposta gamma não-linear
- A correção sRGB "achata" valores escuros para cálculo perceptualmente uniforme
- Resultados mais precisos para acessibilidade real

---

### Implementação no Código

```typescript
// contrastUtils.ts
export function getLuminance(r: number, g: number, b: number): number {
    const rs = r / 255;
    const gs = g / 255;
    const bs = b / 255;

    const linearize = (c: number): number => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const rLinear = linearize(rs);
    const gLinear = linearize(gs);
    const bLinear = linearize(bs);

    return Math.max(0, Math.min(1,
        rLinear * 0.2126 +
        gLinear * 0.7152 +
        bLinear * 0.0722
    ));
}

export function getOptimalTextColor(bgLuminance: number): string {
    const contrastWithBlack = getContrastRatio(bgLuminance, 0);
    const contrastWithWhite = getContrastRatio(bgLuminance, 1);
    const MIN_CONTRAST = 4.5;

    if (contrastWithBlack >= MIN_CONTRAST) return '#000000';
    if (contrastWithWhite >= MIN_CONTRAST) return '#ffffff';

    // Fallback: maior contraste
    return contrastWithBlack > contrastWithWhite ? '#000000' : '#ffffff';
}
```

---

### Testando Conformidade

```typescript
// Teste manual
import { getLuminance, getContrastRatio } from '../utils/contrastUtils';

function testWCAGCompliance(fgHex: string, bgHex: string): boolean {
    const fg = hexToRGB(fgHex);
    const bg = hexToRGB(bgHex);

    const fgLum = getLuminance(fg.r, fg.g, fg.b);
    const bgLum = getLuminance(bg.r, bg.g, bg.b);

    const ratio = getContrastRatio(fgLum, bgLum);
    return ratio >= 4.5;
}

// Exemplos
testWCAGCompliance('#000000', '#ffffff')  // true (21:1)
testWCAGCompliance('#ffffff', '#000000')  // true (21:1)
testWCAGCompliance('#000000', '#4F46E5')  // false (~2.5:1)
testWCAGCompliance('#ffffff', '#4F46E5')  // true (~10:1)
```

---

### Ferramentas de Validação

Recomendamos testar com:

1. **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
2. **axe DevTools**: Extensão browser
3. **Lighthouse**: Auditoria integrada Chrome DevTools
4. **WAVE**: https://wave.webaim.org/

---

## 🎯 Exemplos Práticos

### Navbar com DynamicText

```tsx
// src/components/layout/Navbar.tsx
import { DynamicText } from '../atoms/DynamicText';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <DynamicText colorMode="auto" className="text-xl font-bold">
                    MeuPortfólio
                </DynamicText>
            </div>

            <ul className="nav-links">
                {['Início', 'Sobre', 'Projetos', 'Contato'].map((link) => (
                    <li key={link}>
                        <a href={`#${link.toLowerCase()}`}>
                            <DynamicText colorMode="auto" transitionDuration={300}>
                                {link}
                            </DynamicText>
                        </a>
                    </li>
                ))}
            </ul>

            <ThemeToggle />
        </nav>
    );
}
```

**CSS**:
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #1a1a1a; /* Fundo escuro fixo */
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    text-decoration: none;
    color: inherit;
}
```

---

### Footer com Modo Escuro Forçado

```tsx
// src/components/layout/Footer.tsx
import { DynamicText } from '../atoms/DynamicText';

export function Footer() {
    return (
        <footer style={{ backgroundColor: '#0a0a0a', padding: '3rem' }}>
            <div className="footer-content">
                <h2>
                    <DynamicText colorMode="light" transitionDuration={400}>
                        Vamos trabalhar juntos?
                    </DynamicText>
                </h2>

                <p>
                    <DynamicText colorMode="light" className="text-gray-300">
                        Entre em contato para oportunidades de colaboração.
                    </DynamicText>
                </p>

                <div className="social-links">
                    {['GitHub', 'LinkedIn', 'Email'].map((platform) => (
                        <a key={platform} href={`#${platform.toLowerCase()}`}>
                            <DynamicText colorMode="light">
                                {platform}
                            </DynamicText>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
```

**Por que `colorMode="light"`?**
- Footer tem fundo escuro fixo (#0a0a0a)
- Forçar branco garante contraste consistente
- Evita cálculo desnecessário (performance)

---

### Hero Section com Partículas

```tsx
// src/components/sections/Hero.tsx
import { DynamicText } from '../atoms/DynamicText';
import ParticleBackground from '../canvas/ParticleBackground';

export function Hero() {
    return (
        <section className="hero" style={{ position: 'relative' }}>
            {/* Background de partículas animado */}
            <ParticleBackground />

            {/* Conteúdo sobreposto */}
            <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
                <h1 className="hero-title">
                    <DynamicText colorMode="auto" transitionDuration={500}>
                        Desenvolvedor Full Stack
                    </DynamicText>
                </h1>

                <p className="hero-subtitle">
                    <DynamicText colorMode="auto" transitionDuration={500}>
                        Criando experiências digitais com React, Three.js e TypeScript
                    </DynamicText>
                </p>

                <button className="cta-button">
                    <DynamicText colorMode="light">
                        Ver Projetos
                    </DynamicText>
                </button>
            </div>
        </section>
    );
}
```

**CSS**:
```css
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-title {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 800;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: clamp(1.125rem, 3vw, 1.5rem);
    max-width: 600px;
    margin: 0 auto 2rem;
    opacity: 0.9;
}

.cta-button {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #4F46E5, #7C3AED);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.125rem;
}
```

---

### Card com Gradiente

```tsx
// src/components/atoms/ProjectCard.tsx
import { DynamicText } from './DynamicText';

interface ProjectCardProps {
    title: string;
    description: string;
    gradient: string;  // ex: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}

export function ProjectCard({ title, description, gradient }: ProjectCardProps) {
    return (
        <div
            className="project-card"
            style={{
                background: gradient,
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
        >
            <h3>
                <DynamicText colorMode="complement" transitionDuration={400}>
                    {title}
                </DynamicText>
            </h3>

            <p>
                <DynamicText colorMode="complement" transitionDuration={400}>
                    {description}
                </DynamicText>
            </p>

            <a href="#">
                <DynamicText colorMode="light">
                    Ver Projeto →
                </DynamicText>
            </a>
        </div>
    );
}
```

**Por que `colorMode="complement"`?**
- Gradientes têm múltiplas cores
- Preto/branco podem não ter harmonia visual
- Cor complementar oferece contraste interessante
- Hook garante contraste WCAG mínimo

---

### Lista com Múltiplos Itens (Performance)

```tsx
// ❌ RUIM: Muitos DynamicText
{projects.map(project => (
    <div key={project.id}>
        <h4>
            <DynamicText colorMode="auto">{project.title}</DynamicText>
        </h4>
        <p>
            <DynamicText colorMode="auto">{project.description}</DynamicText>
        </p>
    </div>
))}

// ✅ BOM: DynamicText apenas no container
const { textColor } = useDynamicTextColor(containerRef);

<div ref={containerRef} style={{ color: textColor }}>
    {projects.map(project => (
        <div key={project.id}>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
        </div>
    ))}
</div>
```

---

### Integração com Context/Theme

```tsx
// src/contexts/ThemeContext.tsx
import { createContext, useContext } from 'react';
import { useDynamicTextColor, UseDynamicTextColorResult } from '../hooks/useDynamicTextColor';

const ThemeContext = createContext<{
    textColor: string;
    backgroundColor: string;
    isDark: boolean;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { textColor, backgroundColor, isDark } = useDynamicTextColor(containerRef);

    return (
        <ThemeContext.Provider value={{ textColor, backgroundColor, isDark }}>
            <div ref={containerRef} style={{ color: textColor, backgroundColor }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de ThemeProvider');
    }
    return context;
}

// Uso em qualquer componente:
function MyComponent() {
    const { textColor, isDark } = useTheme();
    return <div style={{ color: textColor }}>Texto temático</div>;
}
```

---

## 🐛 Troubleshooting

### Problema: Texto não muda de cor

**Sintomas**:
- DynamicText renderiza mas cor permanece estática
- Hook retorna sempre a mesma cor

**Possíveis Causas e Soluções**:

1. **Fundo não está sendo detectado corretamente**
   ```tsx
   // ❌ Errado: ref no elemento filho
   <div style={{ backgroundColor: '#4F46E5' }}>
       <DynamicText />  // Detecta fundo do span, não da div
   </div>

   // ✅ Correto: ref no container com fundo
   <div ref={containerRef} style={{ backgroundColor: '#4F46E5' }}>
       <DynamicText />
   </div>
   ```

2. **Elemento não tem dimensões**
   ```tsx
   // ❌ Elemento com width/height = 0
   <div style={{ display: 'none' }}>
       <DynamicText />
   </div>

   // ✅ Garanta que o elemento é visível
   <div style={{ minHeight: '100px' }}>
       <DynamicText />
   </div>
   ```

3. **`sampleSize` muito pequeno para imagens complexas**
   ```tsx
   // Aumente sampleSize
   useDynamicTextColor(ref, { sampleSize: 32 });
   ```

---

### Problema: Flicker durante transições

**Sintomas**:
- Texto pisca ou vibra ao mudar cor
- Transição não é suave

**Soluções**:

1. **Ajuste `transitionDuration`**
   ```tsx
   <DynamicText transitionDuration={600}>  // Mais lento
       Texto
   </DynamicText>
   ```

2. **Use `will-change` no CSS**
   ```css
   .dynamic-text {
       will-change: color;
   }
   ```

3. **Aumente `updateInterval`**
   ```tsx
   useDynamicTextColor(ref, { updateInterval: 200 });  // Menos atualizações
   ```

---

### Problema: Detecção lenta/performance ruim

**Sintomas**:
- Lag na interface
- Alto uso de CPU
- Atualizações frequentes no console

**Soluções**:

1. **Reduza `sampleSize`**
   ```tsx
   useDynamicTextColor(ref, { sampleSize: 8 });  // Mais rápido
   ```

2. **Aumente `updateInterval`**
   ```tsx
   useDynamicTextColor(ref, { updateInterval: 500 });  // 5x por segundo
   ```

3. **Limite número de instâncias**
   ```tsx
   // Use um único hook no container pai
   const { textColor } = useDynamicTextColor(containerRef);
   ```

4. **Desative observers se não necessário**
   ```tsx
   // O hook já gerencia isso automaticamente, mas se customizar:
   // Remova ResizeObserver/MutationObserver se o fundo é estático
   ```

---

### Problema: Cores erradas em gradientes

**Sintomas**:
- Texto ilegível sobre gradiente
- Cor detectada não representa o fundo real

**Causa**: Amostragem de canvas falha devido a CORS ou elementos complexos.

**Soluções**:

1. **Use `colorMode="complement"` para gradientes**
   ```tsx
   <DynamicText colorMode="complement">
       Texto sobre gradiente
   </DynamicText>
   ```

2. **Forneça cor de fallback manual**
   ```tsx
   // No container, defina cor sólida de fallback
   <div
       ref={containerRef}
       style={{
           background: 'linear-gradient(...)',
           backgroundColor: '#4F46E5'  // Fallback para detecção
       }}
   >
       <DynamicText />
   </div>
   ```

3. **Ajuste `sampleSize`**
   ```tsx
   useDynamicTextColor(ref, { sampleSize: 32 });  // Mais amostras
   ```

---

### Problema: Integração Three.js não funciona

**Sintomas**:
- `threeRenderer` não retorna dados
- Cor de texto não se adapta à cena 3D

**Soluções**:

1. **Verifique se renderer está disponível**
   ```tsx
   const { gl } = useThree();
   console.log('Renderer:', gl);  // Deve ser WebGLRenderer

   <DynamicText threeRenderer={() => gl}>
       Texto 3D
   </DynamicText>
   ```

2. **Renderize após montagem do canvas**
   ```tsx
   useEffect(() => {
       // Aguarde um frame antes de usar threeRenderer
       requestAnimationFrame(() => {
           // Agora gl deve estar pronto
       });
   }, []);
   ```

3. **Use `readRenderTargetPixels` corretamente**
   - O hook lê do centro do viewport
   - Se houver render target custom, configure corretamente

---

### Problema: `getComplementaryColor` retorna cores estranhas

**Sintomas**:
- Cores complementares muito saturadas
- Contraste insuficiente

**Causa**: Cores muito saturadas no HSL resultam em complementares também saturados.

**Solução**: O hook já faz fallback automático se contraste < 4.5:1. Se customizar:

```typescript
function safeComplementary(hex: string): string {
    const complement = getComplementaryColor(hex);

    // Verifique contraste
    const bgLum = getLuminance(...hexToRGB(hex));
    const fgLum = getLuminance(...hexToRGB(complement));
    const ratio = getContrastRatio(bgLum, fgLum);

    return ratio >= 4.5 ? complement : getOptimalTextColor(bgLum);
}
```

---

### Problema: Memory leaks

**Sintomas**:
- Uso de memória cresce com navegação
- Erros "Cannot read property of undefined"

**Causa**: Observers não limpos ao desmontar componente.

**Solução**: O hook já faz cleanup automático no `useEffect`. Se customizar:

```tsx
useEffect(() => {
    const observer = new ResizeObserver(handler);
    observer.observe(element);

    return () => {
        observer.disconnect();  // ✅ Cleanup
    };
}, []);
```

---

## ⚡ Performance Tips

### 1. Cache de Opções

```tsx
// ❌ Recria objeto a cada render
const { textColor } = useDynamicTextColor(ref, {
    sampleSize: 16,
    updateInterval: 100
});

// ✅ Use useMemo
const options = useMemo(() => ({
    sampleSize: 16,
    updateInterval: 100
}), []);

const { textColor } = useDynamicTextColor(ref, options);
```

---

### 2. Lazy Loading de Componentes

```tsx
import { lazy, Suspense } from 'react';

const DynamicTextDemoPage = lazy(() => import('./pages/DynamicTextDemoPage'));

function App() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <DynamicTextDemoPage />
        </Suspense>
    );
}
```

---

### 3. Virtualização de Listas

Para listas grandes com DynamicText:

```tsx
import { FixedSizeList } from 'react-window';

function List({ items }) {
    const { textColor } = useDynamicTextColor(containerRef);

    const Row = ({ index, style }) => (
        <div style={style}>
            {/* Apenas texto, sem DynamicText individual */}
            <span style={{ color: textColor }}>
                {items[index].title}
            </span>
        </div>
    );

    return (
        <div ref={containerRef}>
            <FixedSizeList height={500} itemCount={items.length} itemSize={50}>
                {Row}
            </FixedSizeList>
        </div>
    );
}
```

---

### 4. Debounce Customizado

Se precisar de controle fino:

```tsx
function useThrottledDynamicTextColor(ref, options) {
    const [result, setResult] = useState(null);
    const timeoutRef = useRef(null);

    const handleUpdate = useCallback((newResult) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setResult(newResult);
        }, 50);  // Debounce de 50ms
    }, []);

    const baseResult = useDynamicTextColor(ref, {
        ...options,
        onColorChange: handleUpdate  // Hook customizado precisaria suportar isso
    });

    return result || baseResult;
}
```

---

### 5. Web Workers para Cálculos Pesados

Se estiver processando muitas cores:

```typescript
// worker.ts
import { getLuminance, getContrastRatio } from './contrastUtils';

self.onmessage = (e) => {
    const { type, data } = e.data;

    if (type === 'CALCULATE_LUMINANCE') {
        const { r, g, b } = data;
        const lum = getLuminance(r, g, b);
        self.postMessage({ type: 'LUMINANCE_RESULT', lum });
    }
};
```

---

### 6. Memoização Extrema

```tsx
const DynamicTextMemo = React.memo(DynamicText, (prev, next) => {
    // Só re-renderiza se props críticas mudarem
    return (
        prev.children === next.children &&
        prev.colorMode === next.colorMode &&
        prev.transitionDuration === next.transitionDuration
    );
});
```

---

### 7. Monitoramento em Produção

```tsx
if (process.env.NODE_ENV === 'production') {
    // Coleta métricas anônimas
    const { textColor, backgroundColor } = useDynamicTextColor(ref);
    useEffect(() => {
        // Envie para analytics (ex: Google Analytics)
        window.gtag?.('event', 'dynamic_text_update', {
            text_color: textColor,
            background_color: backgroundColor
        });
    }, [textColor, backgroundColor]);
}
```

---

## 📊 Comparação de Abordagens

| Abordagem | Prós | Contras | Melhor Uso |
|-----------|------|---------|------------|
| **DynamicText** | Fácil, animações, callback | Overhead por instância | Texto esparso, componentes isolados |
| **Hook + CSS** | Máximo controle, performance | Mais código | Listas grandes, containers |
| **Context** | Global, consistente | Re-renderiza toda árvore | Temas whole-app |
| **Three.js** | Integração 3D | Complexidade | Cenas R3F |

---

## 🔄 Changelog

### v1.0.0 (2025-01-15)
- Implementação inicial
- Hook `useDynamicTextColor`
- Componente `DynamicText`
- Utilitários `contrastUtils`
- Suporte a Three.js
- WCAG AA compliance

---

## 📚 Referências

- **WCAG 2.1**: https://www.w3.org/TR/WCAG21/
- **sRGB Specification**: https://www.color.org/srgb.pdf
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Framer Motion**: https://www.framer.com/motion/
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction

---

## 🤝 Contribuindo

Para melhorar este sistema:

1. Teste com diferentes backgrounds (imagens, gradientes complexos)
2. Valide conformidade WCAG com ferramentas externas
3. Meça performance em dispositivos de baixa potência
4. Reporte bugs com exemplos reproduzíveis

---

**Última atualização**: 2025-01-15
**Versão**: 1.0.0
**Status**: ✅ Production Ready