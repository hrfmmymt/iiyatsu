module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "**/*.{js,jpg,html,md}"
  ],
  "swDest": "static/sw/sw.js",
  "globIgnores": [
    "workbox-cli-config.js",
    'node_modules/**/*'
  ]
};
