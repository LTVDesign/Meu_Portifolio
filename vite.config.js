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
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-helmet-async',
            'react-i18next',
            'i18next',
            'i18next-browser-languagedetector',
          ],
          'framer-motion': ['framer-motion/m'],
          'three-core': ['three'],
          'three-fiber': ['@react-three/fiber'],
          'three-drei': ['@react-three/drei'],
          'three-utils': ['three-mesh-bvh'],
          'ui': ['react-icons', 'react-parallax-tilt', 'react-vertical-timeline-component'],
          'utils': ['zod', '@exodus/bytes'],
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/[name]-[hash].js`;
        },
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