// @ts-ignore
const marked = require('marked');
const renderer = new marked.Renderer();

const sanitize = (str: string) => {
  return str.replace(/&<"/g, (m) => {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    return '&quot;';
  });
};

function markedRenderImage() {
  renderer.image = (src: string, _title: string, alt: string) => {
    const exec = /=\s*(w\d*)\s*-\s*(h\d*)\s*$/.exec(src);
    const regExp = exec && exec[0] ? new RegExp(exec[0], 'g') : '';
    const mySrc = src.replace(regExp, '');

    // if (alt.indexOf('video-') === 0) {
    //   // render <video> tag
    //   const mySrcRegex = mySrc.match(/(.*)(?:\.([^.]+$))/);
    //   const srcExec = mySrcRegex !== null ? mySrcRegex[1] : '';
    //   const fileName = srcExec.replace('public/videos/', '');
    //   const webmSrc = `public/videos/webm/${fileName}.webm`;

    //   const width = exec && exec[1] ? exec[1] : 0;
    //   const height = exec && exec[2] ? exec[2] : 0;

    //   const mp4Src = `<source src="${mySrc}" type="video/mp4" />`;

    //   return `<div class="video-wrapper">
    //     <video controls preload="metadata" width="${width}" height="${height}" poster="public/videos/poster/${fileName}.${
    //     `png` || `jpg`
    //   }" title="${sanitize(alt)}">
    //       <source src="${webmSrc}" type="video/webm" />
    //       ${mp4Src}
    //       <div fallback>This browser does not support the video element.</div>
    //     </video>
    //   </div>`;
    // } else {
    //   // render <img> tag
    //   const mySrcRegex = mySrc.match(/(.*)(?:\.([^.]+$))/);
    //   const srcExec = mySrcRegex !== null ? mySrcRegex[1] : '';
    //   const fileName = srcExec.replace('public/img/post/', '');
    //   const webpSrc = `public/img/post/webp/${fileName}.webp`;
    const width = exec && exec[1] ? exec[1].replace('w', '') : 0;
    const height = exec && exec[2] ? exec[2].replace('h', '') : 0;

    //   return `<picture>
    //   <source srcset="${webpSrc}" type="image/webp">
    //   <source srcset="${mySrc}" type="image/jpeg">
    //   <img src="${mySrc}" alt="${sanitize(
    //     alt
    //   )}" width="${width}" height="${height}" />
    // </picture>`;
    return `<img src="${mySrc}" alt="${sanitize(
      alt,
    )}" width="${width}" height="${height}" loading="lazy" />`;
    // }
  };
}

function markedRenderEm() {
  renderer.em = (text: string) => {
    let postDate, postDescription;
    if ((postDate = /^date:(\d{4}-\d{2}-\d{2})/.exec(text)) !== null) {
      const dateStr = postDate[1];
      return `<time datetime="${dateStr}">${dateStr}</time>`;
    }
    if ((postDescription = /^desc&gt;\s.*/.exec(text)) !== null) {
      const descStr = postDescription[0].replace('desc&gt; ', '');
      return `<em class="description">${descStr}</em>`;
    }
    return `<em>${text.replace('\\/', '/')}</em>`;
  };
}

export function markedCustomRender() {
  markedRenderImage();
  markedRenderEm();

  return renderer;
}
