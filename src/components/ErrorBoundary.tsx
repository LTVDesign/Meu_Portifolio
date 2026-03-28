import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
    // Em produção, não registra erros no console para segurança
    // Em desenvolvimento, você pode habilitar conforme necessário
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-primary">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Oops! Algo deu errado</h2>
            <p className="text-gray-300 mb-4">
              Desculpe pelo inconveniente. Por favor, recarregue a página.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#915EFF] text-white rounded-lg hover:bg-[#7c4dff] transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
