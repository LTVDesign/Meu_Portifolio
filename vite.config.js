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
      react: 'react',
      'react-dom': 'react-dom',
    },
  },

  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/')) return 'react';
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('three')) return 'three';
            if (id.includes('@react-three')) return 'react-three';
          }
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    cssCodeSplit: true,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
  },

  define: {
    // Ensuring internal Vite defines are handled correctly
  },

  server: {
    port: 5173,
  },
})


