<<<<<<< HEAD
'use strict'
const path = require('path')
const { generateSW } = require('workbox-build')

//variable
const distDir = path.join(process.cwd(), 'public')
const swPath = path.join(distDir, 'static/sw/sw_.js')
const cacheId = 'my-cache-id'

generateSW({
  cacheId: cacheId,
  swDest: swPath,
  globDirectory: './',
  globPatterns: [
    // '**/*.{html,js,css}',
    // './static/**/*.{html,js,css}',
    'img/**/*.{png,gif,webp,svg}'
  ],
  globIgnores: [
    '**/node_modules/**/*',
    '../public/static/sw/sw_.js',
    '../public/static/sw/workbox-*.js'
  ],
  runtimeCaching: [
    {
      urlPattern: /.+(\/|.html)$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: cacheId + '-html-cache',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 7
        }
      }
    },
    {
      urlPattern: /.+\.(js|css|woff)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: cacheId + '-dependent-cache',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 90
        }
      }
    },
    {
      urlPattern: /.+\.(png|gif|jpg|jpeg|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: cacheId + '-image-cache',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 30
        }
      }
    }
  ]
}).then(({ count, size, warnings }) => {
  for (const warning of warnings) {
    console.warn(warning)
  }
  console.log(
    `Generated ${swPath}, which will precache ${count} files, totaling ${size} bytes.`
  )
})
=======
const { injectManifest } = require("workbox-build");

const swSrc = 'public/src/sw_.js'
const swDest = 'public/static/sw/serviceworker.js';
// const cacheId = 'iiyatsu'

injectManifest({
  swSrc,
  swDest,
  // cacheId,
  // importScripts: ['static/sw/workbox-e047abc3.js'],
  // globDirectory: "./",
  // globPatterns: [],
  // runtimeCaching: [
  //     {
  //         urlPattern: /.+(\/|.html)$/,
  //         handler: "NetworkFirst",
  //         options: {
  //             cacheName: cacheId + "-html-cache",
  //             expiration: {
  //                 maxAgeSeconds: 60 * 60 * 24 * 7,
  //             },
  //         },
  //     },
  //     {
  //         urlPattern: /.+\.(js|css|woff)$/,
  //         handler: "CacheFirst",
  //         options: {
  //             cacheName: cacheId + "-dependent-cache",
  //             expiration: {
  //                 maxAgeSeconds: 60 * 60 * 24 * 90,
  //             },
  //         },
  //     },
  //     {
  //         urlPattern: /.+\.(png|gif|jpg|jpeg|svg)$/,
  //         handler: "CacheFirst",
  //         options: {
  //             cacheName: cacheId + "-image-cache",
  //             expiration: {
  //                 maxAgeSeconds: 60 * 60 * 24 * 30,
  //             },
  //         },
  //     },
  // ]
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
>>>>>>> 8bf84c5fd4876dfe59dfcabfd0441c1f46ec20ea
