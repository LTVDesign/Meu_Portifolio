import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Em produção, não registra erros no console para segurança
    // Em desenvolvimento, você pode habilitar conforme necessário
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-primary'>
          <div className='text-center p-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>Oops! Algo deu errado</h2>
            <p className='text-gray-300 mb-4'>
              Desculpe pelo inconveniente. Por favor, recarregue a página.
            </p>
            <button
              type='button'
              onClick={() => window.location.reload()}
              className='px-6 py-2 bg-[#915EFF] text-white rounded-lg hover:bg-[#7c4dff] transition-colors'
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    // Verificação de segurança para props.children
    const children = this.props.children;
    if (!children || Array.isArray(children)) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-primary'>
          <div className='text-center p-8'>
            <h2 className='text-xl font-bold text-white mb-4'>Componente inválido</h2>
            <p className='text-gray-300'>
              O componente não foi renderizado corretamente.
            </p>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
