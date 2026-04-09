import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './i18n';
// Importação de CSS - Vite vai processar e injetar automaticamente
// Critical CSS carrega primeiro para evitar FOUC
import './critical.css';
// Globals CSS carrega após critical para não bloquear renderização inicial
import './globals.css';

// Preload de recursos críticos após carregamento inicial
if (typeof window !== 'undefined') {
  // Registrar Service Worker apenas em produção para evitar problemas de cache em desenvolvimento
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] Service Worker registrado com sucesso:', registration.scope);
        })
        .catch((error) => {
          console.log('[SW] Falha ao registrar Service Worker:', error);
        });
    });
  }

  // Prefetch de rotas após idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Prefetch das rotas mais acessadas
      const link1 = document.createElement('link');
      link1.rel = 'prefetch';
      link1.href = '/formacao';
      document.head.appendChild(link1);

      const link2 = document.createElement('link');
      link2.rel = 'prefetch';
      link2.href = '/projetos';
      document.head.appendChild(link2);
    });
  }
}

// Detect reduced motion
document.documentElement.classList.toggle(
  'reduced-motion',
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('[Main] Erro crítico: Elemento #root não encontrado no index.html');
  document.body.innerHTML = `
    <div style="color: red; padding: 40px; font-family: system-ui;">
      <h1>Erro Crítico</h1>
      <p>Elemento #root não encontrado. Verifique o arquivo index.html.</p>
    </div>
  `;
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

// StrictMode apenas em desenvolvimento
root.render(
  import.meta.env.DEV ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  )
);

console.log(`[Main] Aplicação renderizada com sucesso (Modo: ${import.meta.env.MODE})`);
