module.exports = {
  globDirectory: './',
  globPatterns: ['**/*.{jpg,png,gif,webp,svg,html,md}'],
  swSrc: './src/sw.js',
  swDest: './sw.js',
  globIgnores: ['workbox-cli-config.js', 'node_modules/**/*'],
  templatedUrls: {
    '/': ['index.mustache', 'server.js']
  }
}
