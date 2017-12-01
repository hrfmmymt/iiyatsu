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
    "url": "/img/atama.jpg",
    "revision": "dee14b31d24ad2f3a857809d74af0787"
  },
  {
    "url": "/sw/install-service-worker.html",
    "revision": "64bf3c524b108d55af832b4243f8ad31"
  },
  {
    "url": "/",
    "revision": "755346cf1e82621086e89dfcabb3e483"
  },
  {
    "url": "/app-shell",
    "revision": "755346cf1e82621086e89dfcabb3e483"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
