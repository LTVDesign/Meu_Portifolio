import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
    ],

    resolve: {
        dedupe: [
            'react',
            'react-dom',
            '@react-three/fiber',
            '@react-three/drei',
            'three',
            'three-mesh-bvh',
        ],
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // React + React Router + i18n (mantido unificado para evitar múltiplas cópias)
                    'react-vendor': [
                        'react',
                        'react-dom',
                        'react-router-dom',
                        'react-helmet-async',
                        'react-i18next',
                        'i18next',
                        'i18next-browser-languagedetector',
                    ],
                    // Three.js e R3F separados (mas React deduplicado)
                    'three': [
                        'three',
                        '@react-three/fiber',
                        '@react-three/drei',
                        'three-mesh-bvh',
                    ],
                    'framer-motion': ['framer-motion'],
                    'icons': ['react-icons'],
                    'parallax': ['react-parallax-tilt'],
                    'timeline': ['react-vertical-timeline-component'],
                },
            },
        },
        chunkSizeWarningLimit: 1500,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.debug'],
            },
            mangle: {
                reserved: ['React', 'ReactDOM', 'THREE', 'drei', 'fiber'],
            },
        },
    },

    server: {
        port: 3000,
        host: true,
    },

    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            '@react-three/fiber',
            '@react-three/drei',
            'three',
            'three-mesh-bvh',
        ],
    },

    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },

    json: {
        stringify: true,
    },

    envPrefix: 'VITE_',

    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
        __APP_NAME__: JSON.stringify('Meu Portfólio'),
    },
})