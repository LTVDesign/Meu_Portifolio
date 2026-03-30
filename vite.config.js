import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { lossless: true },
    }),
  ],

  // === CRÍTICO: Forçar React único ===
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
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core (mais importante manter unificado)
          'react-vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-helmet-async',
            'react-i18next',
            'i18next',
            'i18next-browser-languagedetector',
          ],
          // Framer Motion - apenas domAnimation (tree-shakeable)
          'framer-dom': ['framer-motion/m'],
          // Framer Motion core (para AnimatePresence e recursos avançados)
          'framer-core': ['framer-motion'],
          // Three.js + R3F
          'three': [
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            'three-mesh-bvh',
          ],
          // Outros
          'ui': ['react-icons', 'react-parallax-tilt', 'react-vertical-timeline-component'],
          'utils': ['zod', '@exodus/bytes'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug'],
        passes: 2,
      },
      output: {
        comments: false,
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