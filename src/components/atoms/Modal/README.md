# Sistema Modal Avançado

Um sistema de modal completo e acessível para React com TypeScript, desenvolvido para ser altamente personalizável e performático.

## 🚀 Características Principais

- ✅ **Acessibilidade Completa**: ARIA attributes, keyboard navigation, focus trap
- 🎨 **Customizável**: Temas, animações, tamanhos e estilos totalmente configuráveis
- 📱 **Responsivo**: Trabalha perfeitamente em todos os tamanhos de tela
- ⚡ **Performático**: Animações otimizadas com framer-motion
- 🔧 **Modular**: Sistema de hooks e componentes separados
- 📦 **Pronto para Produção**: Documentação completa e exemplos práticos

## 📁 Estrutura de Arquivos

```
src/components/atoms/Modal/
├── Modal.tsx                    # Componente principal do Modal
├── Modal.animation.ts           # Configurações de animação
├── Modal.accessibility.ts      # Hooks de acessibilidade
├── Modal.context.tsx            # Contexto do Modal
├── Modal.hooks.ts               # Hooks utilitários
├── Modal.types.ts               # Tipos TypeScript
├── index.ts                    # Exportações principais
└── README.md                   # Documentação
```

## 🎯 Como Usar

### Uso Básico

```tsx
import Modal from './Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Meu Modal"
      >
        <p>Conteúdo do modal...</p>
      </Modal>
    </>
  );
}
```

### Uso com Provider (recomendado)

```tsx
import { ModalProvider } from './Modal';

function App() {
  return (
    <ModalProvider>
      <YourApp />
    </ModalProvider>
  );
}

function YourComponent() {
  const { open, close, isOpen } = useModalDialog();
  
  return (
    <>
      <button onClick={() => open()}>
        Abrir Modal
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Título do Modal"
        size="lg"
        animation="spring"
      >
        <p>Conteúdo do modal...</p>
      </Modal>
    </>
  );
}
```

## 🔧 Props Disponíveis

### Propriedades Principais

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `isOpen` | `boolean` | - | Controla se o modal está aberto |
| `onClose` | `() => void` | - | Função chamada ao fechar o modal |
| `children` | `ReactNode` | - | Conteúdo do modal |
| `title` | `string` | - | Título do modal (acessível) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'auto'` | `'md'` | Tamanho pré-definido |
| `animation` | `'fade' \| 'scale' \| 'slide' \| 'spring'` | `'scale'` | Tipo de animação |

### Propriedades de Estilo

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `className` | `string` | `''` | Classes CSS para o conteúdo |
| `overlayClassName` | `string` | `''` | Classes CSS para o overlay |
| `backdropBlur` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Intensidade do blur |
| `overlayColor` | `string` | `'bg-black/50'` | Cor do overlay |

### Propriedades de Acessibilidade

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `role` | `'dialog' \| 'alertdialog' \| 'menu'` | `'dialog'` | ARIA role |
| `trapFocus` | `boolean` | `true` | Habilita focus trap |
| `closeOnEscape` | `boolean` | `true` | Fecha com ESC |
| `autoFocus` | `boolean` | `true` | Foca no primeiro elemento |
| `preventScroll` | `boolean` | `true` | Previne scroll do body |

## 🎨 Temas Disponíveis

```tsx
// Temas pré-definidos
modalThemes = {
  default: { /* tema padrão */ },
  glass: { /* efeito glassmorphism */ },
  dark: { /* tema escuro */ },
  minimal: { /* tema minimalista */ }
};

// Uso
<Modal 
  theme="glass"
  className="..."
/>
```

## 🎬 Animações Disponíveis

```tsx
// Animações pré-definidas
modalAnimations = {
  fade: { /* fade in/out */ },
  scale: { /* escala */ },
  slide: { /* slide */ },
  spring: { /* mola */ }
};

// Uso
<Modal 
  animation="spring"
  animationDirection="up"
/>
```

## 📏 Tamanhos Disponíveis

```tsx
// Tamanhos pré-definidos
modalSizes = {
  sm: { width: '400px', padding: '1.5rem' },
  md: { width: '600px', padding: '2rem' },
  lg: { width: '800px', padding: '2.5rem' },
  xl: { width: '1000px', padding: '3rem' },
  full: { width: '100vw', height: '100vh' },
  auto: { width: 'auto', padding: '2rem' }
};

// Uso
<Modal 
  size="lg"
  width="900px"
  height="500px"
/>
```

## 🎯 Hooks Disponíveis

### useModal
```tsx
const { isOpen, open, close, toggle } = useModal(false);
```

### useModalWithConfig
```tsx
const modal = useModalWithConfig(false, {
  closeOnEscape: true,
  trapFocus: true,
  preventScroll: true,
});
```

### useModalDialog (com Provider)
```tsx
const { open, close, isOpen } = useModalDialog({
  theme: 'glass',
  size: 'lg',
  title: 'Meu Modal',
});
```

### useModalAccessibility
```tsx
const { modalRef, focusFirstElement } = useModalAccessibility({
  isOpen,
  onClose,
  closeOnEscape: true,
  trapFocus: true,
});
```

## 🔧 Customização Avançada

### Animações Customizadas
```tsx
const customAnimation = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  content: {
    initial: { scale: 0.8, y: 50 },
    animate: { scale: 1, y: 0 },
    exit: { scale: 0.8, y: 50 },
  }
};

<Modal
  customAnimation={customAnimation}
  animationDuration={0.5}
/>
```

### Estilos Customizados
```tsx
<Modal
  className="bg-gradient-to-br from-purple-500 to-pink-500"
  overlayClassName="bg-black/70"
  backdropBlur="lg"
  closeOnBackdropClick={false}
/>
```

## 🧪 Exemplos Práticos

### Modal de Confirmação
```tsx
function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Ação"
      size="sm"
    >
      <p>Tem certeza que deseja continuar?</p>
      <div className="flex gap-4 mt-4">
        <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
          Confirmar
        </button>
        <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
```

### Modal de Formulário
```tsx
function FormModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({});

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastro"
      size="lg"
      animation="slide"
      position="center"
    >
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário */}
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Nome"
          className="w-full p-2 border rounded"
        />
        {/* Mais campos... */}
      </form>
    </Modal>
  );
}
```

## 🚀 Melhores Práticas

1. **Sempre use o Provider**: Para melhor gerenciamento de estado e opções globais
2. **Defina títulos acessíveis**: Sempre use a propriedade `title` para acessibilidade
3. **Trate eventos de teclado**: Habilite `closeOnEscape` para melhor experiência
4. **Use focus trap**: Mantenha o foco dentro do modal para acessibilidade
5. **Teste com leitores de tela**: Verifique a acessibilidade com NVDA ou VoiceOver
6. **Crie temas customizados**: Use os temas pré-definidos como base
7. **Otimize animações**: Use `animationDuration` apropriado para cada caso

## 🐛 Troubleshooting

### Problema de Foco
```tsx
// Se o foco não funcionar corretamente
<Modal trapFocus={true} autoFocus={true}>
  {/* Conteúdo */}
</Modal>
```

### Problema de Scroll
```tsx
// Se o scroll não for bloqueado
<Modal preventScroll={true}>
  {/* Conteúdo */}
</Modal>
```

### Problema de Animação
```tsx
// Se as animações não funcionarem
<Modal animation="scale" animationDuration={0.3}>
  {/* Conteúdo */}
</Modal>
```

## 📊 Performance

- **Tamanho do Bundle**: ~15KB (gzipped)
- **Dependências**: framer-motion (otimizado)
- **Renderização**: Otimizada com React.memo e useCallback
- **Animações**: Otimizadas com GPU acceleration

## 🔮 Roadmap

- [ ] Suporte a múltiplos modais simultâneos
- [ ] Lazy loading para conteúdo pesado
- [ ] Integração com storybook
- [ ] Testes unitários avançados
- [ ] Suporte a SSR
- [ ] Temas dinâmicos

## 📝 Licença

MIT License - Livre para uso comercial e pessoal.