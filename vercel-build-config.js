// Configuração de build específica para Vercel
// Este arquivo é carregado automaticamente pelo Vercel quando presente

module.exports = {
    // Configurações de build otimizadas para Vercel
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    installCommand: 'npm install',

    // Configurações de ambiente
    env: {
        NODE_ENV: 'production',
        VERCEL: 'true'
    },

    // Headers específicos para melhor performance
    headers: async () => {
        return [
            {
                source: '/assets/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            {
                source: '/assets/js/(.*).js',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/javascript; charset=utf-8'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            {
                source: '/assets/css/(.*).css',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/css; charset=utf-8'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            }
        ]
    },

    // Rewrites para SPA
    rewrites: [
        {
            source: '/api/(.*)',
            destination: '/api/$1'
        },
        {
            source: '/(.*)',
            destination: '/index.html'
        }
    ]
}