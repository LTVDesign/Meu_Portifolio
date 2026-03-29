import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './globals.css';

document.documentElement.classList.toggle(
  'reduced-motion',
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
);
console.log('Main: Starting render...');
try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('Main: Render cycle started');
} catch (e) {
  console.error('Main: Render crash:', e);
}
