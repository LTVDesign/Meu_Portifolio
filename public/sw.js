// Service Worker para cache avançado e performance
const CACHE_NAME = 'portfolio-v1';
const STATIC_CACHE = 'portfolio-static-v1';
const DYNAMIC_CACHE = 'portfolio-dynamic-v1';

// Recursos críticos para cache imediato
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/logo.png',
    '/logo.svg'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Cacheando recursos estáticos');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME && name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
                        .map((name) => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Estratégia de cache: Network First com fallback para cache
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorar requisições não-GET
    if (request.method !== 'GET') return;

    // Ignorar requisições para API de analytics e outros serviços
    if (url.hostname.includes('va.vercel-scripts.com') ||
        url.hostname.includes('api.emailjs.com')) {
        return;
    }

    // Cache First para assets estáticos (JS, CSS, imagens, fontes)
    if (isStaticAsset(url)) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Stale While Revalidate para páginas HTML
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }

    // Network First para outras requisições
    event.respondWith(networkFirst(request));
});

// Verifica se é um asset estático
function isStaticAsset(url) {
    return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff2|woff|ttf|eot|ico)$/);
}

// Estratégia: Cache First
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Erro ao buscar recurso:', error);
        throw error;
    }
}

// Estratégia: Network First
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Estratégia: Stale While Revalidate
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => cachedResponse);

    return cachedResponse || fetchPromise;
}

// Limpeza periódica de cache dinâmico
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(DYNAMIC_CACHE).then(() => {
            console.log('[SW] Cache dinâmico limpo');
        });
    }
});

console.log('[SW] Service Worker registrado com sucesso');