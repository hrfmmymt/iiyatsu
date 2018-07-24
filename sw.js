/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "install-service-worker.html",
    "revision": "7d02b46cb56ca32cd41d5d6622a263ad"
  },
  {
    "url": "offline.html",
    "revision": "dabdee7fb73e97456092b6dbc650e2db"
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
    "url": "/",
    "revision": "7859668cb767328e690e8733348603ce"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("**/*.jpg", workbox.strategies.cacheFirst(), 'GET');
