import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
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
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      exclude: [/node_modules/, /public\/assets\/3d-models\/desktop-pc\/webp/],
      png: {
        quality: 80,
        compressionLevel: 6,
      },
      jpeg: {
        quality: 82,
        progressive: true,
        mozjpeg: true,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
      gif: {
        compressionLevel: 3,
      },
      svg: {
        multipass: true,
        precision: 3,
      },
      avif: {
        quality: 70,
        speed: 6,
      },
      cache: true,
      logStats: true,
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
      'react': path.resolve(process.cwd(), 'node_modules/react'),
      'react-dom': path.resolve(process.cwd(), 'node_modules/react-dom'),
    },
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
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion'],
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei'
    ]
  },

  server: {
    port: 5173,
    host: true,
    hmr: {
      clientPort: 5173,
    },
  },
});
