import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
// globals.css é carregado de forma assíncrona no index.html para não bloquear LCP

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
