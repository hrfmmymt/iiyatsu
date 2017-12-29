module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{jpg,html,md}'
  ],
  runtimeCaching: [{
    urlPattern: '**/*.jpg',
    handler: 'cacheFirst'
  }],
  options: {
    cacheExpiration: {
      maxAgeSeconds: 86400,
      maxEntries: 10
    }
  },
  swDest: './sw.js',
  globIgnores: [
    'workbox-cli-config.js',
    'node_modules/**/*'
  ],
  templatedUrls: {
    '/': ['index.mustache', 'server.js']
  }
};
