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
        // Não precarregar chunks de terceiros — eles serão lazy-loaded
        if (filename.includes('vendor-libs')) return [];
        // Filtrar deps de vendor-libs das dependências de outros chunks
        return deps.filter(dep =>
          !dep.includes('vendor-libs')
        );
      }
    },
    // Configurações adicionais para compatibilidade com Vercel
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    cssCodeSplit: true,
    assetsInlineLimit: 8192,
    cssMinify: true,
    reportCompressedSize: false,
    incremental: true,
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // Vendor Core: Only the essential React framework (extremely stable)
          if (
            id.match(/node_modules\/(react|react-dom|scheduler|react-reconciler|use-sync-external-store)\//)
          ) {
            return 'vendor-core';
          }

          // Vendor Router: Separate because routes are lazy-loaded
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }

          // Vendor i18n
          if (id.includes('node_modules/i18next')) {
            return 'vendor-i18n';
          }
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
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.debug', 'console.info', 'console.log'],
        passes: 3,
        pure_getters: true,
        unsafe: false,
        unsafe_comps: false,
        unsafe_math: false,
        unsafe_methods: false,
        dead_code: true,
        collapse_vars: true,
        reduce_vars: true,
        toplevel: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
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