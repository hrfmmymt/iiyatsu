importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "install-service-worker.html",
    "revision": "705323d3111ee6a78871333109f84e3d"
  },
  {
    "url": "posts/1.md",
    "revision": "ae4004ea915aedf83bf4d33b621a94a3"
  },
  {
    "url": "posts/2.md",
    "revision": "fdf20384f157c5a3e535d746adf6b823"
  },
  {
    "url": "static/img/atama.jpg",
    "revision": "dee14b31d24ad2f3a857809d74af0787"
  },
  {
    "url": "/",
    "revision": "180a6abce221dd6fff1a353ca8ae0a3c"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('**/*.jpg', workboxSW.strategies.cacheFirst({}), 'GET');
