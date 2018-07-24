const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('postcss')
const precss = require('precss')
const fs = require('fs')

fs.readFile('./src/custom-style.css', (err, css) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  postcss([precss, autoprefixer, cssnano])
    .process(css, {
      from: './src/custom-style.css',
      to: './src/dist/custom-style.css'
    })
    .then(result => {
      fs.writeFile('./custom-style.partial.mustache', result.css, () => true)
    })
})
