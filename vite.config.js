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
      exclude: [/node_modules/, /desktop_pc\/webp/],
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
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core Three.js - separado para cache otimizado
          'three-core': ['three'],
          // React Three ecosystem - carregado junto quando necessário
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          // Framer Motion - lazy animations
          'motion': ['framer-motion'],
          // React core - sempre necessário
          'vendor': ['react', 'react-dom', 'react-router-dom'],
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
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info', 'console.table'],
        passes: 3,
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
        toplevel: true,
        typeofs: false,
      },
      output: {
        comments: false,
        beautify: false,
        max_line_len: 0,
        semicolons: false,
        ascii_only: true,
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
    exclude: ['@vercel/speed-insights'],
  },

  server: {
    port: 5173,
    host: true,
    hmr: {
      clientPort: 5173,
    },
  },
});
