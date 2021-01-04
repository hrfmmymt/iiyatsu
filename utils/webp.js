/* now `imagemin` version is 7.0.1
 * ESM compatible is not yet supported by update the version to 8 series
 */
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
// import imagemin from 'imagemin';
// import imageminWebp from 'imagemin-webp'

(async () => {
  await imagemin(['./public/img/post/*.{jpg,png}'], {
    destination: './public/img/post/webp/',
    plugins: [imageminWebp({ quality: 100 })],
  });
})();
