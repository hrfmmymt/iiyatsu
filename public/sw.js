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
    "url": "posts/20180607.md",
    "revision": "4e835eb17eaf35b75375f3147312bde3"
  },
  {
    "url": "posts/20180609.md",
    "revision": "48d8ac08f258a21c1e74958cf40e9c8b"
  },
  {
    "url": "posts/20180610.md",
    "revision": "55010f336377320b11d0d5f6b97ed400"
  },
  {
    "url": "posts/20180614.md",
    "revision": "899110b5d6a7b0619dd68c475b9761b6"
  },
  {
    "url": "posts/20180621.md",
    "revision": "24cedaf45c68e2aaacb86c853c7101a1"
  },
  {
    "url": "posts/20180623.md",
    "revision": "08a960e93aef6d234cffdc575fed86ab"
  },
  {
    "url": "posts/20180720.md",
    "revision": "e5c0a471430d6703171cdfca50e0a552"
  },
  {
    "url": "posts/20180725.md",
    "revision": "b36c1101d195780117a0c17d9fbf3008"
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
    "url": "posts/20180728.md",
    "revision": "37783369f31ed3fa99eca0cc9fe11f2a"
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
