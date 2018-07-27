const Jimp = require('jimp')
const glob = require('glob')
const path = require('path')
const dist = path.join(__dirname, '../public/static/img/posts/')

glob(
  'raw/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF}',
  (err, files) => {
    files.map(node => {
      Jimp.read(node)
        .then(image => {
          image
            .exifRotate()
            .resize(780, Jimp.AUTO)
            .quality(80)
            .write(dist + node.match('.+/(.+?)$')[1])
        })
        .catch(err => {
          console.error(err)
        })
    })
  }
)
