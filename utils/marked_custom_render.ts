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

    // render <img> tag
    const width = exec && exec[1] ? exec[1].replace('w', '') : 0;
    const height = exec && exec[2] ? exec[2].replace('h', '') : 0;

    return `<img src="${mySrc}" alt="${sanitize(
      alt,
    )}" width="${width}" height="${height}" loading="lazy" />`;
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
