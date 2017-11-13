importScripts('workbox-sw.prod.v2.1.1.js');

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
    "url": "iiyatasu.js",
    "revision": "aff17e6c97c61ab8b01b136053db406a"
  },
  {
    "url": "posts/1.md",
    "revision": "ae4004ea915aedf83bf4d33b621a94a3"
  },
  {
    "url": "posts/2.md",
    "revision": "d20fdcd70217c5cacebf271d6949dce7"
  },
  {
    "url": "static/img/atama.jpg",
    "revision": "dee14b31d24ad2f3a857809d74af0787"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
