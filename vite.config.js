import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true,
      importSource: 'react',
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { lossless: true },
    }),
    compression({
      algorithm: 'brotliCompress', // Brotli é mais eficiente que gzip
      ext: '.br',
      threshold: 10240,
      minSize: 0,
      level: 11,
      deleteOriginalFile: false,
    }),
    // Compressão gzip adicional para compatibilidade
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
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 500, // Reduzido para alertar sobre chunks grandes
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - bibliotecas de terceiros
          if (id.includes('node_modules')) {
            // React e ecossistema
            if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
              return 'vendor-react';
            }

            // React Router
            if (id.includes('node_modules/react-router')) {
              return 'vendor-router';
            }

            // Framer Motion - otimizado para tree shaking
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }

            // Three.js e ecossistema
            if (id.includes('node_modules/three')) {
              return 'vendor-three';
            }
            if (id.includes('node_modules/@react-three/fiber')) {
              return 'vendor-three-fiber';
            }
            if (id.includes('node_modules/@react-three/drei')) {
              return 'vendor-three-drei';
            }
            if (id.includes('node_modules/three-mesh-bvh')) {
              return 'vendor-three-utils';
            }

            // i18n
            if (id.includes('node_modules/i18next') ||
              id.includes('node_modules/react-i18next')) {
              return 'vendor-i18n';
            }

            // Helmet Async
            if (id.includes('node_modules/react-helmet-async')) {
              return 'vendor-helmet';
            }

            // Ícones
            if (id.includes('node_modules/react-icons')) {
              return 'vendor-icons';
            }

            // Utils
            if (id.includes('node_modules/zod')) {
              return 'vendor-zod';
            }
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1] || '';
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext)) {
            return `assets/images/[name]-[hash].[ext]`;
          }
          if (['css', 'woff', 'woff2', 'ttf', 'eot'].includes(ext)) {
            return `assets/[name]-[hash].[ext]`;
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
        passes: 2,
        dead_code: true,
        unused: true,
        reduce_vars: true,
        evaluate: true,
        hoist_funs: true,
        hoist_vars: true,
        if_return: true,
        loops: true,
        switches: true,
        side_effects: true,
        keep_fnames: false,
        keep_classnames: false,
      },
      output: {
        comments: false,
        beautify: false,
        max_line_len: 0,
        semicolons: false,
        ascii_only: true,
      },
    },
    sourcemap: false,
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'framer-motion/m',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },

  server: {
    port: 5173,
    host: true,
    hmr: {
      clientPort: 5173,
    },
  },
});