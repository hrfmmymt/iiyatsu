const CACHE_NAME = '::iiyatsu_serviceworker';
const CACHE_VERSION = 0;
const URLS_TO_CACHE = [
  "./",
  "./offline",
  "./handle-404",
  "./%E3%83%88%E3%82%A5%E3%83%BC%E3%83%89%E3%82%A5%E3%83%BC",
  "./hello-world!",
  "./0",
  "./1",
  "./public/css/style.css",
  "./public/img/icon/favicon.ico",
  "./public/img/icon/icon-128x128.png",
  "./public/img/icon/icon-144x144.png",
  "./public/img/icon/icon-152x152.png",
  "./public/img/icon/icon-192x192.png",
  "./public/img/icon/icon-384x384.png",
  "./public/img/icon/icon-512x512.png",
  "./public/img/icon/icon-72x72.png",
  "./public/img/icon/icon-96x96.png",
  "./public/img/icon/icon.png",
  "./public/img/profile/profile.jpg",
  "./public/img/profile/profile.webp",
  "./public/js/script.js",
  "./public/manifest.json",
  "./public/sw.js"
];

self.addEventListener('install', (event) => {
  console.log('The service worker is being installed.');
  self.skipWaiting();
  event.waitUntil(
    caches.open(`v${CACHE_VERSION}${CACHE_NAME}`).then((cache) => {
      cache.addAll(URLS_TO_CACHE);
    }, console.err)
  );
});

const fromNetwork = (request, timeout) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
      update(request);
    }, reject);
  });

const fromCache = (request) =>
  caches
    .open(`v${CACHE_VERSION}${CACHE_NAME}`)
    .then((cache) =>
      cache
        .match(request)
        .then((matching) => matching || cache.match('./offline.html'))
    );

const update = (request) =>
  caches
    .open(`v${CACHE_VERSION}${CACHE_NAME}`)
    .then((cache) =>
      fetch(request).then((response) => cache.put(request, response))
    );

// const refresh = (response) => {
//   return self.clients.matchAll().then((clients) => {
//     clients.forEach((client) => {
//       const message = {
//         type: 'refresh',
//         url: response.url,
//         eTag: response.headers.get('ETag'),
//       };
//       client.postMessage(JSON.stringify(message));
//     });
//   });
// };

self.addEventListener('fetch', (event) => {
  console.log('The service worker is serving the asset.');
  event.respondWith(
    fromNetwork(event.request, 10000).catch(() => fromCache(event.request))
  );
  event.waitUntil(update(event.request));
});
