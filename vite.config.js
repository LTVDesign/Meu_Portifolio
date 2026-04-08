import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig({
  base: '/',
  define: {
    'process.env': JSON.stringify({}),
    'global': 'window',
    '__DEFINES__': JSON.stringify({}),
  },
  plugins: [
    tailwindcss(),
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true,
      importSource: 'react',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      minSize: 0,
      level: 11,
      deleteOriginalFile: false,
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      minSize: 0,
      level: 9,
      deleteOriginalFile: false,
    }),
  ],

  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },

  build: {
    modulePreload: true,
    sourcemap: true,
    minify: 'terser',
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // Three.js e relacionados
          if (id.includes('three') || id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
            return 'vendor-three';
          }

          // Framer Motion
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }

          // React core
          if (id.includes('react') || id.includes('scheduler') || id.includes('prop-types')) {
            return 'vendor-core';
          }

          // i18n
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'vendor-i18n';
          }

          // Router
          if (id.includes('react-router-dom')) {
            return 'vendor-router';
          }

          // UI components
          if (id.includes('react-icons') || id.includes('react-vertical-timeline-component') || id.includes('react-parallax-tilt')) {
            return 'vendor-ui';
          }

          // Utilitários
          if (id.includes('zod')) {
            return 'vendor-utils';
          }

          // Lucide icons (ícones leves, mas podem ser separados)
          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(info)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(css)$/i.test(info)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(woff2?|ttf|eot)$/i.test(info)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Otimizações de tree-shaking
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
  },
  optimizeDeps: {
    // Forçar pré-bundling de React para garantir ordem correta
    force: false
  },

  server: {
    port: 5173,
    host: true,
    // Removido clientPort hardcoded para evitar erro de WebSocket
    // quando a porta 5173 está em uso e o Vite usa a próxima porta disponível
  },
});