module.exports = {
  swFile: './static/sw/service-worker.js',
  staticFileGlobs: [
    './static/img/**.*'
  ],
  dynamicUrlToDependencies: {
    '/': [
      './index.mustache'
    ]
  }
};