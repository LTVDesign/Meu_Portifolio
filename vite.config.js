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
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Priority 1: React must be loaded first
            if (id.includes('react/') || id.includes('react-dom/')) return 'react';
            // Priority 2: React Router and Helmet
            if (id.includes('react-router') || id.includes('react-helmet')) return 'react-vendor';
            // Priority 3: Framer Motion
            if (id.includes('framer-motion/dom')) return 'motion-dom';
            if (id.includes('framer-motion') && !id.includes('dom')) return 'motion-core';
            // Priority 4: Three.js and React Three (must load after React)
            if (id.includes('@react-three/fiber')) return 'react-three-fiber';
            if (id.includes('@react-three/drei')) return 'react-three-drei';
            if (id.includes('three/examples/jsm/controls')) return 'three-controls';
            if (id.includes('three/examples/jsm/loaders')) return 'three-loaders';
            if (id.includes('three/examples/jsm/postprocessing')) return 'three-postprocessing';
            if (id.includes('three/examples/jsm/geometries')) return 'three-geometries';
            if (id.includes('three/examples/jsm/materials')) return 'three-materials';
            if (id.includes('three/examples/jsm/lights')) return 'three-lights';
            if (id.includes('three/examples/jsm/helpers')) return 'three-helpers';
            if (id.includes('three/examples/jsm/')) return 'three-extras';
            if (id.includes('three/src/math')) return 'three-math';
            if (id.includes('three/src/core')) return 'three-core-utils';
            if (id.includes('three/src/renderers')) return 'three-renderers';
            if (id.includes('three/src/scenes')) return 'three-scenes';
            if (id.includes('three/src/cameras')) return 'three-cameras';
            if (id.includes('three/src/geometries')) return 'three-core-geometries';
            if (id.includes('three/src/materials')) return 'three-core-materials';
            if (id.includes('three/src/objects')) return 'three-objects';
            if (id.includes('three/src/lights')) return 'three-core-lights';
            if (id.includes('three/src/textures')) return 'three-textures';
            if (id.includes('three')) return 'three-core';
          }
        },
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
  },
})


