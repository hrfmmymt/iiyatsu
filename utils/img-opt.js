const Jimp = require('jimp')
const glob = require('glob')
const path = require('path')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

const dist = path.join(__dirname, '../public/static/img/posts/')

async function imgOptimize() {
  glob('raw/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF}', (err, files) => {
    files.map(node => {
      Jimp.read(node)
        .then(image => {
          image
            .exifRotate()
            .resize(780, Jimp.AUTO)
            .quality(85)
            .write(dist + node.match('.+/(.+?)$')[1])
        })
        .catch(err => {
          console.error(err)
        })
    })
  })
}

const convertWebp = () => {
  glob(`${dist}*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF}`, (err, files) => {
    imagemin(files, `${dist}webp`, {
      use: [imageminWebp({ quality: 85 })]
    }).catch(err => {
      console.error(err)
    })
  })
}

imgOptimize().then(() => convertWebp())
