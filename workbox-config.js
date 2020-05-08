module.exports = {
  globDirectory: './',
  globPatterns: ['**/*.{jpg, png, gif, webp, svg, html, md}'],
  swSrc: './src/sw.js',
  swDest: './static/sw.js',
  globIgnores: ['workbox-cli-config.js', 'node_modules/**/*', 'raw/*'],
  templatedUrls: {
    '/': ['index.mustache', 'server.js']
  }
}
