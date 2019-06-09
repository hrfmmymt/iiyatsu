const glob = require('glob')
const path = require('path')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

const dist = path.join(__dirname, '../public/static/img/posts/')

const convertWebp = () => {
  glob(`${dist}*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF}`, (err, files) => {
    imagemin(files, `${dist}webp`, {
      use: [imageminWebp({ quality: 85 })]
    }).catch(err => {
      console.error(err)
    })
  })
}

convertWebp()
