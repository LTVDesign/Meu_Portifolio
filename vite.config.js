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
      exclude: [/node_modules/, /public\/assets\/3d-models\/desktop-pc\/webp/],
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
      'react': path.resolve(process.cwd(), 'node_modules/react'),
      'react-dom': path.resolve(process.cwd(), 'node_modules/react-dom'),
    },
    dedupe: [
      'react',
      'react-dom',
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
    ],
  },

  build: {
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    // CSS code splitting habilitado por padrão
    cssCodeSplit: true,
    // Asset inlining para arquivos pequenos (< 4KB)
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Função manualChunks otimizada para eliminar dependência circular
        // Estratégia: simplificar para evitar qualquer referência circular
        manualChunks: (id) => {
          // Three.js core - biblioteca 3D pura (sem dependências React)
          if (id.includes('node_modules/three/') && !id.includes('@react-three')) {
            return 'three-core';
          }

          // React Three Fiber/Drei - depende de three-core e react
          if (id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
            return 'react-three';
          }

          // Framer Motion - biblioteca de animação React
          if (id.includes('node_modules/framer-motion/')) {
            return 'motion';
          }

          // Todos os outros node_modules em um único chunk
          // Isso elimina completamente a dependência circular
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
        // Otimizar nomeação de chunks para melhor cache
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `assets/js/${chunkInfo.name || facadeModuleId}-[hash].js`;
        },
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
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@react-three/fiber']
  },

  server: {
    port: 5173,
    host: true,
    hmr: {
      clientPort: 5173,
    },
  },
});
