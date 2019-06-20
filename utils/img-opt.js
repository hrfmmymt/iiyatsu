const Jimp = require('jimp')
const glob = require('glob')
const path = require('path')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

const dist = path.join(__dirname, '../public/static/img/posts/')
const convertList = []

/**
 * Resizes and optimizes images in the directory.
 * @param {string} dirPath - Path to directory. Can be relative or absolute.
 * @param {Object} options
 * @param {int|Jimp.AUTO} [options.width=Jimp.AUTO]
 * @param {int|Jimp.AUTO} [options.height=Jimp.AUTO]
 * @param {boolean} [options.recursive=false] - Whether or not to also resize recursively.
 * @return {Promise}
 */
function resizeDirectoryImages(
  dirPath,
  { width = Jimp.AUTO, height = Jimp.AUTO, recursive = false }
) {
  return new Promise((resolve, reject) => {
    glob(
      (recursive ? '**/' : '') +
        '*.@(png|PNG|jpg|JPG|jpeg|JPEG|BMP|bmp|gif|GIF)',
      {
        nocase: true,
        nodir: true,
        realpath: true,
        cwd: dirPath
      },
      (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      }
    )
  }).then(files => {
    return Promise.all(
      files.map(node => {
        const dists = dist + node.match('.+/(.+?)$')[1]
        convertList.push(dists)
        return new Promise((resolve, reject) => {
          return Jimp.read(node).then(image => {
            image
              .exifRotate()
              .resize(width, height)
              .quality(85)
              .write(dists, err => {
                if (err) {
                  reject(err)
                } else {
                  resolve(node)
                }
              })
          })
        }).then(console.log)
      })
    )
  })
}

function convertWebp(path) {
  imagemin(path, `${dist}webp`, {
    use: [imageminWebp()]
  })
    .then(() => {
      console.log('webp done')
    })
    .catch(err => {
      console.error(err)
    })
}

resizeDirectoryImages('./raw', { width: 780 }).then(() => {
  convertWebp(convertList)
})
