import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    /* ViteImageOptimizer({...}) temporarily disabled */
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2, // Duas passadas para melhor minificação
        pure_funcs: ['console.log', 'console.debug'], // Remove funções específicas
      },
      mangle: {
        safari10: true, // Compatibilidade com Safari
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three';
            }
            if (id.includes('framer-motion')) {
              return 'framer';
            }
            if (id.includes('react-router-dom')) {
              return 'router';
            }
            if (id.includes('react-icons')) {
              return 'icons';
            }
            // Outras dependências vão para vendor
            return 'vendor';
          }
        },
        // Otimização de nomes de arquivos
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Compressão de imagens
    assetsInlineLimit: 4096,
    // Otimizações adicionais
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Desabilita sourcemaps em produção
    reportCompressedSize: false, // Desabilita report de tamanho comprimido para build mais rápido
  },
  preview: {
    // Desativa compressão no preview para melhor performance
    compress: false,
  },
  server: {
    hmr: {
      overlay: false, // Desativa overlay de erros que pode causar lentidão
    },
    // Limita os arquivos observados para melhor performance
    watch: {
      usePolling: false,
      interval: 100,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/public/desktop_pc/**',
        '**/public/planet/**',
        '**/public/wavefield-shader/**',
        '**/public/cyberpunk-tunnel/**',
        '**/public/loader-motion/**',
        '**/public/certificados/**',
        '**/public/cursos/**',
        '**/*.log',
        '**/assets/**', // Ignora pasta de assets durante watch
      ],
    },
    // Otimizações de performance
    fs: {
      strict: false,
      allow: ['..'],
    },
    /* headers: {
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Cache-Control': 'public, max-age=31536000',
    }, */
  },
});
