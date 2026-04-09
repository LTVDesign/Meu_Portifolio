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
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
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
        if (filename.includes('vendor-three') || filename.includes('three-') || filename.includes('r3f-')) return [];
        return deps;
      }
    },
    // Configurações adicionais para compatibilidade com Vercel
    minify: 'terser',
    chunkSizeWarningLimit: 600,
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

          // Correção de chunk circular - evitar dependências circulares
          if (id.includes('/three/src/') || id.includes('/three/build/')) return 'vendor-three';
          if (id.includes('@react-three/fiber')) return 'vendor-r3f';
          if (id.includes('@react-three/drei')) return 'vendor-drei';
          if (id.includes('framer-motion')) return 'vendor-motion';

          // React e core dependencies em chunks separados para evitar circularidade
          if (id.includes('react') && !id.includes('scheduler') && !id.includes('prop-types')) return 'vendor-react';
          if (id.includes('scheduler')) return 'vendor-scheduler';
          if (id.includes('prop-types')) return 'vendor-proptypes';

          if (id.includes('i18next')) return 'vendor-i18n';
          if (id.includes('lucide-react')) return 'vendor-icons';

          // Separar outros vendors para evitar circularidade
          if (id.includes('three')) return 'vendor-three';
          if (id.includes('react-dom')) return 'vendor-react-dom';

          // Evitar chunks vazios - importante para Vercel
          if (id.includes('use-sync-external-store')) return 'vendor-react';

          return 'vendor-others';
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