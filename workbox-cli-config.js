module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "**/*.{jpg,html}"
  ],
  "swDest": "./sw.js",
  "globIgnores": [
    "workbox-cli-config.js",
    "node_modules/**/*"
  ],
  "templatedUrls": {
    '/': ['index.mustache', 'server.js']
  }
};
