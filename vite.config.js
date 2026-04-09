import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
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
      png: { quality: 80 },
      jpeg: { quality: 75 },
      jpg: { quality: 75 },
      webp: { quality: 75 },
      avif: { quality: 65 },
      svg: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'sortAttrs' },
        ],
      },
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
      // Fix for 'Multiple instances of Three.js'
      'three': path.resolve(__dirname, './node_modules/three'),
      'three/build/three.module.js': path.resolve(__dirname, './node_modules/three/build/three.module.js'),
    },
    dedupe: ['react', 'react-dom', 'three', 'react-reconciler', 'scheduler', 'prop-types'],
  },

  build: {
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps) => {
        if (filename.includes('vendor-3d')) return [];
        return deps;
      }
    },
    // Configurações adicionais para compatibilidade com Vercel
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    cssMinify: true,
    reportCompressedSize: false,
    incremental: true,
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // Vendor 3D: Three.js e ecossistema R3F
          if (id.includes('three') || id.includes('@react-three') || id.includes('three-mesh-bvh')) {
            return 'vendor-3d';
          }

          // Vendor Core: React e infraestrutura
          if (id.includes('react') || id.includes('scheduler') || id.includes('react-router') || id.includes('react-dom') || id.includes('use-sync-external-store')) {
            return 'vendor-core';
          }

          // Vendor UI: Animações e ícones
          if (id.includes('framer-motion') || id.includes('lucide') || id.includes('react-icons')) {
            return 'vendor-ui';
          }

          // Outros vendors menores
          return 'vendor-utils';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(info)) return 'assets/images/[name]-[hash][extname]';
          if (/\.(css)$/i.test(info)) return 'assets/css/[name]-[hash][extname]';
          if (/\.(woff2?|ttf|eot)$/i.test(info)) return 'assets/fonts/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
        hoistTransitiveImports: false
      }
    },
    terserOptions: {
      ecma: 2022,
      compress: {
        drop_console: false, // Manter console para depuração em produção
        drop_debugger: true,
        pure_funcs: ['console.debug', 'console.info'], // Remover apenas logs de debug e info
        passes: 2, // Reduzir passes para evitar otimização excessiva
        pure_getters: false, // Desativar para evitar problemas de undefined
        unsafe: false,
        unsafe_comps: false,
        unsafe_math: false,
        unsafe_methods: false,
      },
      mangle: {
        safari10: true,
        // keep_fnames não é suportado em versões antigas do Terser
      },
      format: {
        comments: false,
      },
    },
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei', 'use-sync-external-store/shim/with-selector'],
  },

  server: {
    port: 5173,
    host: true,
  },
});