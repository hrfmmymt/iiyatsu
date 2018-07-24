importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js'
)

workbox.precaching.precacheAndRoute([
  {
    "url": "install-service-worker.html",
    "revision": "404404c2d73ecc89ae89547bd959b761"
  },
  {
    "url": "offline.html",
    "revision": "d4ec74979618d4bea178e834c424d492"
  },
  {
    "url": "posts/20180720.md",
    "revision": "ae4004ea915aedf83bf4d33b621a94a3"
  },
  {
    "url": "posts/20180721.md",
    "revision": "fdf20384f157c5a3e535d746adf6b823"
  },
  {
    "url": "static/img/atama.jpg",
    "revision": "dee14b31d24ad2f3a857809d74af0787"
  },
  {
    "url": "static/img/icons/icon-128x128.png",
    "revision": "318514a48dd7b2c8e62a9e1fdfec20f7"
  },
  {
    "url": "static/img/icons/icon-144x144.png",
    "revision": "cb43b9f0cd0fa2475e13c0f3c4daa344"
  },
  {
    "url": "static/img/icons/icon-152x152.png",
    "revision": "6fe2c4020e59a0c9f9816410ca716b72"
  },
  {
    "url": "static/img/icons/icon-192x192.png",
    "revision": "6ddfe5f83bc3dc1fc140f38d8edab71e"
  },
  {
    "url": "static/img/icons/icon-384x384.png",
    "revision": "5bef84b606049b64f14208f4c145439e"
  },
  {
    "url": "static/img/icons/icon-512x512.png",
    "revision": "0002e6fd843ba5257b39ed44300343a2"
  },
  {
    "url": "static/img/icons/icon-72x72.png",
    "revision": "d11e3cdcd45c5d9569216a2b1cd0b54c"
  },
  {
    "url": "static/img/icons/icon-96x96.png",
    "revision": "4c5b9333309df642c77072116d70825c"
  },
  {
    "url": "static/img/icons/icon.png",
    "revision": "b4dc085fd087c943da2206418a26401b"
  },
  {
    "url": "/",
    "revision": "00cf79b63f26c682f44a79d2c87d6f95"
  }
])

self.addEventListener('install', event => {
  const urls = [
    'https://cdn.ampproject.org/v0.js',
    'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
    'https://cdn.ampproject.org/shadow-v0.js'
  ]
  const cacheName = workbox.core.cacheNames.runtime
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(urls)))
})

workbox.routing.registerRoute(/\/posts\/*|(.*)\/$/, args => {
  return workbox.strategies
    .networkFirst()
    .handle(args)
    .then(response => {
      if (!response) {
        return caches.match('offline.html')
      }
      return response
    })
})

workbox.routing.registerRoute(
  /\.(?:js|css|png|gif|jpg|svg)$/,
  workbox.strategies.cacheFirst()
)

workbox.routing.registerRoute(
  /(.*)cdn\.ampproject\.org(.*)/,
  workbox.strategies.staleWhileRevalidate()
)
