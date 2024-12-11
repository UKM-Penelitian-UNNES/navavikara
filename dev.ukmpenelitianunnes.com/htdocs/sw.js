
// service-worker.js

// Cache version
const CACHE_VERSION = 'v1';

// Files to cache
const FILES_TO_CACHE = [
    'https://dev.ukmpenelitianunnes.com/index.html',
    'https://dev.ukmpenelitianunnes.com/index.js',
];

// Install event
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache:', cache);
                return Promise.all(
                    FILES_TO_CACHE.map(function (file) {
                        return cache.add(file).catch(function (error) {
                            console.error(`Error caching ${file}:`, error);
                        });
                    })
                );
            })
            .catch(function (error) {
                console.error('Error opening cache:', error);
            })
    );
});

// Activate event
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName !== CACHE_VERSION;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});