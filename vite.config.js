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
      'react-reconciler/constants': path.resolve(__dirname, './src/shims/react-reconciler-constants.ts'),
      'react-reconciler': path.resolve(__dirname, './src/shims/react-reconciler-shim.ts'),
      '@react-three/fiber/node_modules/react-reconciler': path.resolve(__dirname, './src/shims/react-reconciler-shim.ts')
    },
    dedupe: ['react', 'react-dom', 'react-reconciler'],
  },

  build: {
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps) => {
        // Não preload Three.js chunks - carregam sob demanda
        if (filename.includes('vendor-three') || filename.includes('three-') || filename.includes('r3f-')) return [];
        return deps;
      }
    },
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    assetsInlineLimit: 8192,
    cssMinify: true,
    reportCompressedSize: false,
    incremental: true,
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // Three.js e relacionados - DIVIDIDO EM CHUNKS MENORES
          if (id.includes('/three/src/') || id.includes('/three/build/')) return 'three-core';
          if (id.includes('@react-three/fiber')) return 'r3f-core';
          if (id.includes('@react-three/drei')) return 'r3f-drei';
          if (id.includes('troika')) return 'vendor-troika';
          if (id.includes('three-stdlib')) return 'three-stdlib';
          if (id.includes('three-mesh-bvh')) return 'three-bvh';

          // Framer Motion
          if (id.includes('framer-motion')) return 'vendor-motion';

          // React core
          if (id.includes('react') || id.includes('scheduler') || id.includes('prop-types')) return 'vendor-core';

          // i18n
          if (id.includes('i18next') || id.includes('react-i18next')) return 'vendor-i18n';

          // Router
          if (id.includes('react-router-dom')) return 'vendor-router';

          // UI components
          if (id.includes('react-icons') || id.includes('react-vertical-timeline-component') || id.includes('react-parallax-tilt')) return 'vendor-ui';

          // Utilitários
          if (id.includes('zod')) return 'vendor-utils';

          // Lucide icons (ícones leves, mas podem ser separados)
          if (id.includes('lucide-react')) return 'vendor-icons';
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
    // Otimizações de tree-shaking
    terserOptions: {
      ecma: 2022,
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
        passes: 3,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
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
    force: true,
    include: ['react', 'react-dom', 'react-reconciler'],
    exclude: ['three', '@react-three/fiber', '@react-three/drei', 'troika-three-text']
  },

  server: {
    port: 5173,
    host: true,
  },
});