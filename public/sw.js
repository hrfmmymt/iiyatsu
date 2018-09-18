importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js'
)

workbox.precaching.precacheAndRoute([
  {
    "url": "install-service-worker.html",
    "revision": "ee945406fa00130ec1cc876a984dc21b"
  },
  {
    "url": "offline.html",
    "revision": "9b0a89127ccfa7626c79e19755e6d312"
  },
  {
    "url": "posts/20180606.md",
    "revision": "87630b556ce0d2fa7d011e8490d93599"
  },
  {
    "url": "posts/20180607.md",
    "revision": "16eafbe8ecbef5fa09ca662bff9d0332"
  },
  {
    "url": "posts/20180609.md",
    "revision": "82ba6596e003236a5d1f3826275809db"
  },
  {
    "url": "posts/20180610.md",
    "revision": "2ffa3b8657ffc71c915f5a6381547b51"
  },
  {
    "url": "posts/20180614.md",
    "revision": "de0d2c365b2748106a5953172b3234be"
  },
  {
    "url": "posts/20180621.md",
    "revision": "8c7ae3c7a1f23ed3e0ca4d10e51081a1"
  },
  {
    "url": "posts/20180623.md",
    "revision": "fd880d231658fea078747ad5c5ac23d2"
  },
  {
    "url": "posts/20180725.md",
    "revision": "2cf1d304f4abde2f59aa5b1482f31328"
  },
  {
    "url": "posts/20180726.md",
    "revision": "a9f59498a6ee9a0929d0e4419980b436"
  },
  {
    "url": "posts/20180727.md",
    "revision": "49d2241b1e0e8c44e84ad5ca0d4f97cc"
  },
  {
    "url": "posts/20180730.md",
    "revision": "d425cd177f29ae54f3e2d40b7d64d0b7"
  },
  {
    "url": "posts/20180808.md",
    "revision": "69b1f7f7f1e3495fb127734d56c6f285"
  },
  {
    "url": "posts/20180906.md",
    "revision": "81ca20431be697248dfc5de4df9a13cf"
  },
  {
    "url": "posts/amp-lightbox-a11y.md",
    "revision": "5bafece4a69b04cc70b6e77882b1d16f"
  },
  {
    "url": "posts/amp-list.md",
    "revision": "1d3ca60d3a92f5e413e334967e16b43f"
  },
  {
    "url": "posts/md-amp-img-webp.md",
    "revision": "d7d591f594e0b0ac8bb3d06a9ab1c1fa"
  },
  {
    "url": "posts/summersonic2018.md",
    "revision": "f4b0594b85eca4a121c1ddce83c80a25"
  },
  {
    "url": "posts/trip-to-hkd.md",
    "revision": "684945ce5285ae9facdf201584e22109"
  },
  {
    "url": "/",
    "revision": "9bb4685da34ad2553eb085625ecfdeb5"
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
  workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
  /(.*)cdn\.ampproject\.org(.*)/,
  workbox.strategies.staleWhileRevalidate()
)
