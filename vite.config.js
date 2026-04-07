import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
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
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      exclude: [/node_modules/, /public\/assets\/3d-models\/desktop-pc\/webp/, /config\.svg$/],
      png: {
        quality: 80,
        compressionLevel: 6,
      },
      jpeg: {
        quality: 82,
        progressive: true,
        mozjpeg: true,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
      gif: {
        compressionLevel: 3,
      },
      svg: {
        multipass: true,
        precision: 3,
      },
      avif: {
        quality: 70,
        speed: 6,
      },
      cache: true,
      logStats: true,
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
    chunkSizeWarningLimit: 1500,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            // Put all React-related core libs in one chunk
            if (id.includes('react') || id.includes('scheduler') || id.includes('prop-types')) {
               return 'vendor-core';
            }
            if (id.includes('i18next')) {
              return 'vendor-i18n';
            }
            // Don't name the catch-all chunk to let Vite handle it
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
    include: ['react', 'react-dom', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
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
