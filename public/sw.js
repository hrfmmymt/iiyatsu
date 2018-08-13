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
    "revision": "1d9097e0109ac9202f4eb31263abe8be"
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
    "revision": "dbbdb2f64909dbe26305c0c50d76a435"
  },
  {
    "url": "posts/20180726.md",
    "revision": "a9f59498a6ee9a0929d0e4419980b436"
  },
  {
    "url": "posts/20180727.md",
    "revision": "5f4d0da4cf18aad0fce9eb5c52e1c22b"
  },
  {
    "url": "posts/20180730.md",
    "revision": "c604aa51ecaa586e889d11f47dc0d05b"
  },
  {
    "url": "posts/20180808.md",
    "revision": "69b1f7f7f1e3495fb127734d56c6f285"
  },
  {
    "url": "posts/amp-list.md",
    "revision": "1d3ca60d3a92f5e413e334967e16b43f"
  },
  {
    "url": "../public/static/img/icons/icon-128x128.png",
    "revision": "675598a95d9aa2a46bcebe09497e8ffa"
  },
  {
    "url": "../public/static/img/icons/icon-144x144.png",
    "revision": "b45d23b3d736884e18306b63ffd1803d"
  },
  {
    "url": "../public/static/img/icons/icon-152x152.png",
    "revision": "b59b971a97996e7caaea8c8a3c6e693d"
  },
  {
    "url": "../public/static/img/icons/icon-192x192.png",
    "revision": "a33e2c332666ccbf5dafc50e196d55bb"
  },
  {
    "url": "../public/static/img/icons/icon-384x384.png",
    "revision": "dc9ab56e29727ef76f7a10cc24112963"
  },
  {
    "url": "../public/static/img/icons/icon-512x512.png",
    "revision": "b314db59ce416734969f55496d9f4aa9"
  },
  {
    "url": "../public/static/img/icons/icon-72x72.png",
    "revision": "e792804fae9e290daa548ab8b267b634"
  },
  {
    "url": "../public/static/img/icons/icon-96x96.png",
    "revision": "5ca12be941cd8dabbaa920787083ebdb"
  },
  {
    "url": "../public/static/img/icons/icon.png",
    "revision": "2aee84a17b8d35b0c280531e4b8867da"
  },
  {
    "url": "../public/static/img/posts/20180606-01.jpg",
    "revision": "ada7de90dbd2137f09050311e84194ee"
  },
  {
    "url": "../public/static/img/posts/20180606-02.jpg",
    "revision": "f73f84964eeee0ec823d4e84b29fec66"
  },
  {
    "url": "../public/static/img/posts/20180606-03.jpg",
    "revision": "5acc4a2eaf17399ac2b31deaabd3d985"
  },
  {
    "url": "../public/static/img/posts/20180606-04.jpg",
    "revision": "470f56a6362fb5e863c813885b03ca78"
  },
  {
    "url": "../public/static/img/posts/20180607.jpg",
    "revision": "ff0d5574c2c62f9d9c9c9bafe51c6939"
  },
  {
    "url": "../public/static/img/posts/20180609-01.jpg",
    "revision": "d3943ce82f601994738cfeea11a9c439"
  },
  {
    "url": "../public/static/img/posts/20180609-02.jpg",
    "revision": "7a29adf50ccef7550c8c7672fd1892a0"
  },
  {
    "url": "../public/static/img/posts/20180609-03.png",
    "revision": "9b60dda5a40ceb5bcc5f3a8585de8d8c"
  },
  {
    "url": "../public/static/img/posts/20180610.jpg",
    "revision": "8ae450a8022965c98b3ceb00e3f119e4"
  },
  {
    "url": "../public/static/img/posts/20180614.jpg",
    "revision": "f5ecbbd0670173e85843d74a74900e17"
  },
  {
    "url": "../public/static/img/posts/20180621-01.jpg",
    "revision": "336548b824f6fb188291dbc34bc6fed4"
  },
  {
    "url": "../public/static/img/posts/20180621-02.jpg",
    "revision": "2811ca9607a31166835e8054812175fb"
  },
  {
    "url": "../public/static/img/posts/20180725.jpg",
    "revision": "796069e7c8536693ebd01907edbef9f1"
  },
  {
    "url": "../public/static/img/posts/20180726.jpg",
    "revision": "dee14b31d24ad2f3a857809d74af0787"
  },
  {
    "url": "../public/static/img/posts/20180730-01.png",
    "revision": "1155d79da79c62cfcd8a0af839c61a07"
  },
  {
    "url": "../public/static/img/posts/20180730-02.png",
    "revision": "3ae0db3e01cc3497ced335cd9a5514f9"
  },
  {
    "url": "../public/static/img/posts/webp/20180606-01.webp",
    "revision": "272fadfe90e2e0c0277e50c93d0afac6"
  },
  {
    "url": "../public/static/img/posts/webp/20180606-02.webp",
    "revision": "3138329a2529c5beff1058faf475b008"
  },
  {
    "url": "../public/static/img/posts/webp/20180606-03.webp",
    "revision": "44af5ea8d8b6d55c7ef49169b5614fc5"
  },
  {
    "url": "../public/static/img/posts/webp/20180606-04.webp",
    "revision": "a216cfb5639bfb37f85644791425ae9c"
  },
  {
    "url": "../public/static/img/posts/webp/20180607.webp",
    "revision": "189bc17b1ef0a06f07c1f8492ab6c77a"
  },
  {
    "url": "../public/static/img/posts/webp/20180609-01.webp",
    "revision": "e5166a47d510fc77a30d47a48000cbce"
  },
  {
    "url": "../public/static/img/posts/webp/20180609-02.webp",
    "revision": "a23cb4e27f813a9fa42f9f27efbe3e27"
  },
  {
    "url": "../public/static/img/posts/webp/20180609-03.webp",
    "revision": "d87b5d925a31c4d11923ff841960bdd2"
  },
  {
    "url": "../public/static/img/posts/webp/20180610.webp",
    "revision": "c9882e006c4ce184b41d81763b107a20"
  },
  {
    "url": "../public/static/img/posts/webp/20180614.webp",
    "revision": "02eaf03b7445c63e2c78c49ed6977d60"
  },
  {
    "url": "../public/static/img/posts/webp/20180621-01.webp",
    "revision": "428e5a16547c68d896af53efbeab6976"
  },
  {
    "url": "../public/static/img/posts/webp/20180621-02.webp",
    "revision": "ac6b20473fe1a23eac468fed12a41a5d"
  },
  {
    "url": "../public/static/img/posts/webp/20180725.webp",
    "revision": "5c8414905dfeebf5fcc84e33781a10e5"
  },
  {
    "url": "../public/static/img/posts/webp/20180726.webp",
    "revision": "06c5d743f1709e4f235f28515c412403"
  },
  {
    "url": "../public/static/img/posts/webp/20180730-01.webp",
    "revision": "156b55461f73703c18bd6e7b475b3f4f"
  },
  {
    "url": "../public/static/img/posts/webp/20180730-02.webp",
    "revision": "9bbd79b685f0e623a51e487895482154"
  },
  {
    "url": "../public/static/img/profile/profile.jpg",
    "revision": "9dac924af48514abd7d81d035b911add"
  },
  {
    "url": "../public/static/img/profile/profile.webp",
    "revision": "0c0f2362c70c06b778e82ed6f2847c2f"
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
  workbox.strategies.cacheFirst()
)

workbox.routing.registerRoute(
  /(.*)cdn\.ampproject\.org(.*)/,
  workbox.strategies.staleWhileRevalidate()
)
