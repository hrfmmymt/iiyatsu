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
    "revision": "40fe1d2bdd6b3c07526a95efb36d1b98"
  },
  {
    "url": "posts/20180606.md",
    "revision": "32cd4f7874c2aced9f19165bcdda2807"
  },
  {
    "url": "posts/20180720.md",
    "revision": "e5c0a471430d6703171cdfca50e0a552"
  },
  {
    "url": "posts/20180725.md",
    "revision": "aca80c9f196b10c99be41e96d4fbdb9c"
  },
  {
    "url": "posts/20180726.md",
    "revision": "1d346db12281e63a69b9f18c2a061df4"
  },
  {
    "url": "posts/20180727.md",
    "revision": "7563801b36905f13a458baf2f2de76ea"
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
    "url": "static/img/posts/_20180725.jpg",
    "revision": "5b92a416979893a1a68d2db8db3ea592"
  },
  {
    "url": "static/img/posts/20180606-01.jpg",
    "revision": "ada7de90dbd2137f09050311e84194ee"
  },
  {
    "url": "static/img/posts/20180606-02.jpg",
    "revision": "f73f84964eeee0ec823d4e84b29fec66"
  },
  {
    "url": "static/img/posts/20180606-03.jpg",
    "revision": "5acc4a2eaf17399ac2b31deaabd3d985"
  },
  {
    "url": "static/img/posts/20180606-04.jpg",
    "revision": "470f56a6362fb5e863c813885b03ca78"
  },
  {
    "url": "static/img/posts/20180726.jpg",
    "revision": "dee14b31d24ad2f3a857809d74af0787"
  },
  {
    "url": "/",
    "revision": "422e077c9db1205c9abcc30cf3311119"
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
