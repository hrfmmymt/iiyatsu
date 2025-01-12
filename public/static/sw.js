const CACHE_NAME = '::iiyatsu_serviceworker';
const CACHE_VERSION = 21;
const CACHE_KEY = `v${CACHE_VERSION}${CACHE_NAME}`;

const URLS_TO_CACHE = [
  '/',
  '/static/styles/main.css',
  '/static/styles/post.css',
  '/static/styles/top.css',
  '/static/styles/error.css',
  '/static/styles/offline.css',
  '/static/js/script.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_KEY)
      .then((cache) => {
        // 各URLを個別にキャッシュし、失敗したものはスキップする
        return Promise.allSettled(
          URLS_TO_CACHE.map(url => 
            cache.add(url).catch(error => {
              console.error(`Failed to cache: ${url}`, error);
              return null;
            })
          )
        );
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.indexOf(CACHE_NAME) === 0 && key !== CACHE_KEY)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networked = fetch(event.request)
        .then((response) => {
          const cacheCopy = response.clone();
          caches.open(CACHE_KEY).then((cache) => {
            cache.put(event.request, cacheCopy);
          });
          return response;
        })
        .catch(() => {
          // オフライン時のフォールバック
          return caches.match('/offline');
        });

      return cached || networked;
    })
  );
});
