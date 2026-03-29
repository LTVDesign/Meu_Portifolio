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
  define: {
    "process.env": {},
    "__DEFINES__": "{}",
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2, // Duas passadas para melhor minificação
        pure_funcs: ['console.log', 'console.debug'], // Remove funções específicas
        dead_code: true, // Remove código morto
        unused: true, // Remove variáveis não usadas
      },
      mangle: {
        safari10: true, // Compatibilidade com Safari
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separação mais granular das dependências
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-vendor';
            }
            if (id.includes('react-router-dom')) {
              return 'router-vendor';
            }
            if (id.includes('react-icons')) {
              return 'icons-vendor';
            }
            if (id.includes('react-helmet-async')) {
              return 'helmet-vendor';
            }
            if (id.includes('react-i18next') || id.includes('i18next')) {
              return 'i18n-vendor';
            }
            if (id.includes('@emailjs')) {
              return 'email-vendor';
            }
            if (id.includes('react-parallax-tilt')) {
              return 'tilt-vendor';
            }
            if (id.includes('react-vertical-timeline-component')) {
              return 'timeline-vendor';
            }
            if (id.includes('zod')) {
              return 'validation-vendor';
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
      // Configuração para tree shaking mais agressivo
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    // Compressão de imagens
    assetsInlineLimit: 4096,
    // Otimizações adicionais
    chunkSizeWarningLimit: 1000,
    sourcemap: true, // Habilita sourcemaps em produção para depuração
    reportCompressedSize: false, // Desabilita report de tamanho comprimido para build mais rápido
    // Otimização de CSS
    cssCodeSplit: true,
    cssMinify: true,
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
