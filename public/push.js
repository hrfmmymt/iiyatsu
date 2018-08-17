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

self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click Received.')
  event.notification.close()
  event.waitUntil(clients.openWindow('https://hrfmmymt.com'))
})
