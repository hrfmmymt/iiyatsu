importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js'
)

workbox.precaching.precacheAndRoute([])

self.addEventListener('install', event => {
  const urls = [
    'https://cdn.ampproject.org/v0.js',
    'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
    'https://cdn.ampproject.org/shadow-v0.js'
  ]
  const cacheName = workbox.core.cacheNames.runtime
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(urls)))
})

// web push notification
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)

  const title = 'お知らせ'
  const options = {
    body: 'Yay it works.',
    icon: 'https://iiyatsu.hrfmmymt.com/static/img/icon.png'
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.')
  event.notification.close()
  event.waitUntil(clients.openWindow('https://hrfmmymt.com'))
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
