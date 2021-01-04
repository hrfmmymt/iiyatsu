import Jimp from 'jimp';
import glob from 'glob';

const POST_DIR = './public/img/post/';

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
  dirPath: string,
  {
    width = Jimp.AUTO,
    height = Jimp.AUTO,
    recursive = false,
  }: { width?: number; height?: number; recursive?: boolean },
) {
  return new Promise((resolve, reject): void => {
    glob(
      (recursive ? '**/' : '') + '*.@(png|PNG|jpg|JPG|jpeg|JPEG|BMP|bmp|gif|GIF)',
      {
        nocase: true,
        nodir: true,
        realpath: true,
        cwd: dirPath,
      },
      (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      },
    );
  }).then((files: any) => {
    if (files === null) return;
    return Promise.all(
      files.map((node: string, index: number) => {
        const nodeRegex = node.match('.+/(.+?)$');
        const nodeExec = nodeRegex !== null ? nodeRegex[1] : `null_${index}`;
        const dists = POST_DIR + nodeExec;
        return new Promise((resolve, reject) => {
          return Jimp.read(node).then((image) => {
            image
              .rotate(0)
              .resize(width, height)
              .quality(85)
              .write(dists, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(node);
                }
              });
          });
        }).then(console.log);
      }),
    );
  });
}

resizeDirectoryImages('./public/img/post/raw', { width: 780 });
