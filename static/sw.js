importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js'
)

workbox.precaching.precacheAndRoute([
  {
    "url": "raw/kitakyushu-2019-03.jpg",
    "revision": "7db8a298b394243e2398562fce615c87"
  },
  {
    "url": "raw/kitakyushu-2019-04.jpg",
    "revision": "2406c0d6838db8f07773cdc6e8bdd95d"
  },
  {
    "url": "raw/kitakyushu-2019-06.jpg",
    "revision": "7d4321a004ce2702e0f8532525e8d9af"
  },
  {
    "url": "raw/kitakyushu-2019-10.jpg",
    "revision": "6cfd5994ebc153608d05a78f947cd65d"
  },
  {
    "url": "raw/kitakyushu-2019-12.jpg",
    "revision": "7f1a94bc33e2334b70eb69e09f15302d"
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
    "url": "static/img/posts/20180607.jpg",
    "revision": "ff0d5574c2c62f9d9c9c9bafe51c6939"
  },
  {
    "url": "static/img/posts/20180609-01.jpg",
    "revision": "d3943ce82f601994738cfeea11a9c439"
  },
  {
    "url": "static/img/posts/20180609-02.jpg",
    "revision": "7a29adf50ccef7550c8c7672fd1892a0"
  },
  {
    "url": "static/img/posts/20180610.jpg",
    "revision": "8ae450a8022965c98b3ceb00e3f119e4"
  },
  {
    "url": "static/img/posts/20180614.jpg",
    "revision": "f5ecbbd0670173e85843d74a74900e17"
  },
  {
    "url": "static/img/posts/20180621-01.jpg",
    "revision": "336548b824f6fb188291dbc34bc6fed4"
  },
  {
    "url": "static/img/posts/20180621-02.jpg",
    "revision": "2811ca9607a31166835e8054812175fb"
  },
  {
    "url": "static/img/posts/20180725.jpg",
    "revision": "796069e7c8536693ebd01907edbef9f1"
  },
  {
    "url": "static/img/posts/20180726.jpg",
    "revision": "dee14b31d24ad2f3a857809d74af0787"
  },
  {
    "url": "static/img/posts/20180825-01.jpg",
    "revision": "e48965b213f25c51306faaef51785239"
  },
  {
    "url": "static/img/posts/20180825-02.jpg",
    "revision": "67961ad9045bf287be59ca96a9df31be"
  },
  {
    "url": "static/img/posts/20180825-03.jpg",
    "revision": "c973c636ebe5b5d46757865d11cd556b"
  },
  {
    "url": "static/img/posts/20181102_01.jpg",
    "revision": "37cce1f498c9f2009dd84c9a171eadf5"
  },
  {
    "url": "static/img/posts/20181102_02.jpg",
    "revision": "2002db45fd18274facd33e62dd14c429"
  },
  {
    "url": "static/img/posts/20181102_03.jpg",
    "revision": "d72498388c2dcdebab1fe036bda891a8"
  },
  {
    "url": "static/img/posts/20181102_04.jpg",
    "revision": "e5fa9c5bf87483ac259cd581281f1308"
  },
  {
    "url": "static/img/posts/20190306_01.jpg",
    "revision": "5817f2ed2ec11a5181aa6295de9b7db1"
  },
  {
    "url": "static/img/posts/20190306_02.jpg",
    "revision": "59b1a8c4352ac6c73485e55e3708a701"
  },
  {
    "url": "static/img/posts/20190306_03.jpg",
    "revision": "3c304ed73b4a7334957a596e11a72b44"
  },
  {
    "url": "static/img/posts/20190306_04.jpg",
    "revision": "f7adc0a84a4a64411fa1ec12b8e69172"
  },
  {
    "url": "static/img/posts/20190306_05.jpg",
    "revision": "1ffba3f7585a2f756d526680a53e83e5"
  },
  {
    "url": "static/img/posts/20190306_06.jpg",
    "revision": "fea487f58e2e26f11b2514383d56676b"
  },
  {
    "url": "static/img/posts/20190306_07.jpg",
    "revision": "d759c542cbec676f7dff9aba21f9b24d"
  },
  {
    "url": "static/img/posts/20190306_08.jpg",
    "revision": "20b6418043e154aea528240eb33287f1"
  },
  {
    "url": "static/img/posts/20190306_09.jpg",
    "revision": "e61e9c67d41e83b478fa361dd962345b"
  },
  {
    "url": "static/img/posts/20190306_10.jpg",
    "revision": "4b281d2c8f618f0dd65b44f2e989141a"
  },
  {
    "url": "static/img/posts/20190306_11.jpg",
    "revision": "7fe99f87f7e0c611f89d9c241d67b22f"
  },
  {
    "url": "static/img/posts/20190306_12.jpg",
    "revision": "6a48127350974bec76071cc13159f4bd"
  },
  {
    "url": "static/img/posts/20190306_13.jpg",
    "revision": "98087642625d50c786ab2df3542ffe12"
  },
  {
    "url": "static/img/posts/hkd-2018-01.jpg",
    "revision": "222ad196e13d282d97731ef4c75c140b"
  },
  {
    "url": "static/img/posts/hkd-2018-02.jpg",
    "revision": "5fafe1c17a154223e7ae58dc78751223"
  },
  {
    "url": "static/img/posts/hkd-2018-03.jpg",
    "revision": "028ee84d5a0a0e61fcc12f56e11afe2b"
  },
  {
    "url": "static/img/posts/hkd-2018-04.jpg",
    "revision": "50707b0af312c0720fc77cc5280e406c"
  },
  {
    "url": "static/img/posts/hkd-2018-05.jpg",
    "revision": "f83e9c793614b9e71b7b8d84bfabd69b"
  },
  {
    "url": "static/img/posts/hkd-2018-06.jpg",
    "revision": "7f7e4725ec6af85837fc91ef07f7ce67"
  },
  {
    "url": "static/img/posts/hkd-2018-07.jpg",
    "revision": "3737aaedd690c652f1ff94ddd6d35f2b"
  },
  {
    "url": "static/img/posts/hkd-2018-08.jpg",
    "revision": "0cee15c0910375b83a2fec8d1ab84ea9"
  },
  {
    "url": "static/img/posts/hkd-2018-09.jpg",
    "revision": "f9d3503c0acf3fd6e29ebc188ef5aa18"
  },
  {
    "url": "static/img/posts/hkd-2018-10.jpg",
    "revision": "9965cee3fd7304cbbd9a9992fdaa16e3"
  },
  {
    "url": "static/img/posts/hkd-2018-11.jpg",
    "revision": "c1d4d28f55d87e39a21b5796afefa6d8"
  },
  {
    "url": "static/img/posts/hkd-2018-12.jpg",
    "revision": "7519080884f800a88ddc6af65d1f5e97"
  },
  {
    "url": "static/img/posts/hkd-2018-13.jpg",
    "revision": "db269104c42b4629b22dd2d449d557e4"
  },
  {
    "url": "static/img/posts/hkd-2018-14.jpg",
    "revision": "7753fcc910735ab3f8ca5141bd5124e4"
  },
  {
    "url": "static/img/posts/hkd-2018-15.jpg",
    "revision": "60520bf9ca8b317d0a6f6bf4ce307846"
  },
  {
    "url": "static/img/posts/hkd-2018-16.jpg",
    "revision": "1cfeff41fec42c5d6d9176f06379c356"
  },
  {
    "url": "static/img/posts/hkd-2018-17.jpg",
    "revision": "9d246c30ae9fea59dd2fa0ef640a913d"
  },
  {
    "url": "static/img/posts/hkd-2018-18.jpg",
    "revision": "533ba8663abedcae74af12ed02922a59"
  },
  {
    "url": "static/img/posts/hkd-2018-19.jpg",
    "revision": "fd183a5780a4b047df0481c51a696147"
  },
  {
    "url": "static/img/posts/hkd-2018-20.jpg",
    "revision": "ed6601667d3871d50b4e2463d6660d8b"
  },
  {
    "url": "static/img/posts/hkd-2018-21.jpg",
    "revision": "6480f25be94fbc733861af94d57f678d"
  },
  {
    "url": "static/img/posts/hkd-2018-22.jpg",
    "revision": "223e054a4872d9761f735faadba153a9"
  },
  {
    "url": "static/img/posts/hkd-2018-23.jpg",
    "revision": "d78da2ba8948f728a91cbaf3674c50dc"
  },
  {
    "url": "static/img/posts/hkd-2018-24.jpg",
    "revision": "a79b932fb65964d764b27489b2fbb7b7"
  },
  {
    "url": "static/img/posts/hkd-2018-25.jpg",
    "revision": "5f1c6cd5fd951e51521136815fddc087"
  },
  {
    "url": "static/img/posts/hkd-2018-26.jpg",
    "revision": "c6562a6d05cfcf936d0423cbbf41055c"
  },
  {
    "url": "static/img/posts/hkd-2018-27.jpg",
    "revision": "24a70a05535b7d0cde19ae897d2320cc"
  },
  {
    "url": "static/img/posts/hkd-2018-28.jpg",
    "revision": "db53b35168392a50be10bc38108e77ac"
  },
  {
    "url": "static/img/posts/hkd-2018-29.jpg",
    "revision": "504cce8251f27ddb4532bb5ec33170d3"
  },
  {
    "url": "static/img/posts/hkd-2018-30.jpg",
    "revision": "3874e0fbcf7aa49540c8027b0c1ce154"
  },
  {
    "url": "static/img/posts/hkd-2018-31.jpg",
    "revision": "cf02b92d95edf1055dff14f1fb8668a4"
  },
  {
    "url": "static/img/posts/hkd-2018-32.jpg",
    "revision": "ad72eb429a9f707bd5784246c93ff9ee"
  },
  {
    "url": "static/img/posts/hkd-2018-33.jpg",
    "revision": "051b9a9ee1d285733f0403c122e81139"
  },
  {
    "url": "static/img/posts/hkd-2018-34.jpg",
    "revision": "feeb925082d9786d34487f54c7978b24"
  },
  {
    "url": "static/img/posts/hkd-2018-35.jpg",
    "revision": "d4f2d0abc8d00509941eb83ae59bcc58"
  },
  {
    "url": "static/img/posts/hkd-2018-36.jpg",
    "revision": "149b5874ca4132bd4ab592984ab90579"
  },
  {
    "url": "static/img/posts/hkd-2018-37.jpg",
    "revision": "fa8944be3c62316b430deaf0c637a012"
  },
  {
    "url": "static/img/posts/hkd-2018-38.jpg",
    "revision": "f140b37285c72e57efd905d79ff7bb8f"
  },
  {
    "url": "static/img/posts/hkd-2018-39.jpg",
    "revision": "3c00ccad4112a6d3cd96063f931c3076"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-02.jpg",
    "revision": "15e1f17cac76f0a7a044e155f136c666"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-03.jpg",
    "revision": "9ebf3b1d56b84bb27ce21996dcb8227f"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-04.jpg",
    "revision": "499868a8a99f952a8bb55ab8cdf56208"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-05.jpg",
    "revision": "21cd6e4715c527a85da2a6361e077b32"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-06.jpg",
    "revision": "99fb14d7b6e5a5d6ad53ae058b691724"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-07.jpg",
    "revision": "d8b7fda96128a026777dcbb46ca58a8f"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-08.jpg",
    "revision": "dba85b82affc0db0a4b858e262168bbd"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-09.jpg",
    "revision": "398ac4e1815bcd615a20bec8aa35b9eb"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-10.jpg",
    "revision": "19649ac2f65f44e7ac68aee50091b382"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-11.jpg",
    "revision": "9ce8861c197eab2bbcf7cb89bbc4b18d"
  },
  {
    "url": "static/img/posts/kitakyushu-2019-12.jpg",
    "revision": "2478b403909d134649a6c0b6bf56c70a"
  },
  {
    "url": "static/img/profile/profile.jpg",
    "revision": "9dac924af48514abd7d81d035b911add"
  },
  {
    "url": "static/videos/poster/test.jpg",
    "revision": "24f518cea8abeb15cd069470879184dd"
  },
  {
    "url": "/",
    "revision": "2d189b2aefb1b96798fe297bdeed8600"
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
