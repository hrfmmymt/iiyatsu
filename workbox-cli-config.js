module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "**/*.{jpg,html}"
  ],
  "swDest": "./static/sw/sw.js",
  "globIgnores": [
    "workbox-cli-config.js",
    "node_modules/**/*"
  ],
  "templatedUrls": {
    '/': ['index.mustache', 'server.js'],
    '/app-shell': ['index.mustache', 'server.js']
  }
};
