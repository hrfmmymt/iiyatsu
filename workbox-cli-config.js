module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "**/*.{jpg,html,md}"
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
