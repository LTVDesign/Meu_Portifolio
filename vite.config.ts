import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        ViteImageOptimizer({ /* suas opções */ }),
    ],

    resolve: {
        dedupe: [
            'react',
            'react-dom',
            'framer-motion',
            '@react-three/fiber',
            '@react-three/drei',
        ],
    },

    build: {
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
                    'framer-motion': ['framer-motion'],
                    'three': [
                        'three',
                        '@react-three/fiber',
                        '@react-three/drei',
                        'three-mesh-bvh',
                    ],
                },
            },
        },
        chunkSizeWarningLimit: 1600,
    },

    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
    },
});

