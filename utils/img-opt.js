const Jimp = require('jimp')
const glob = require('glob')

const imgOptimize = () => {
  glob('raw/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF}', (err, files) => {
    files.map(node => {
      Jimp.read(node)
        .then(image => {
          image
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

imgOptimize()
