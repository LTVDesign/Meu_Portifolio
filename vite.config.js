import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

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

  resolve: {
    alias: {
      // Ensure consistent React instance
      'react': 'react',
      'react-dom': 'react-dom',
    },
    dedupe: ['react', 'react-dom', '@react-three/fiber'],
  },

  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem - carregado primeiro
          'react-vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-helmet-async',
            'react-i18next',
            'i18next',
            'i18next-browser-languagedetector',
          ],
          // Three.js e bibliotecas relacionadas - chunk separado
          'three': [
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            'three-mesh-bvh',
          ],
          // Framer Motion - biblioteca pesada de animações
          'framer-motion': [
            'framer-motion',
          ],
          // UI components
          'ui': [
            'react-icons',
            'react-vertical-timeline-component',
          ],
          // Utilitários
          'utils': [
            '@exodus/bytes',
            'zod',
            'react-parallax-tilt',
          ],
        }
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug'],
        passes: 3, // Additional pass for better minification
        unsafe_math: true, // Optimize math expressions
        unsafe_methods: true, // Optimize object methods
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/, // Mangle private properties starting with _
        },
      },
      output: {
        comments: false, // Remove all comments
      },
    },
    cssCodeSplit: true,
    reportCompressedSize: false,
    sourcemap: false, // Disable sourcemaps for production
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
  },

  server: {
    port: 5173,
    host: true,
    // Headers de segurança para desenvolvimento
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    },
    hmr: {
      clientPort: 5173,
    },
  },
})
