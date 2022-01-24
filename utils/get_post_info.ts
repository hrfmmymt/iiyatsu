import * as fs from 'fs';
import { marked } from 'marked';

import { markedCustomRender } from './marked_custom_render';
import { PostInfo } from './types';

const hljs = require('highlight.js');
const renderer = markedCustomRender();

// export for testing
export function highlight(code: string, lang: string) {
  return hljs.highlightAuto(code, [lang]).value;
}

export const getPostInfo = ({
  postDir,
  fileName,
  withHtml,
}: {
  postDir: string;
  fileName: string;
  withHtml: boolean;
}): Promise<PostInfo> => {
  return new Promise((resolve, reject) => {
    fs.readFile(postDir + fileName, 'utf-8', (err, md) => {
      if (err) return reject(err);
      const name = fileName.replace(/.md/g, '');

      const h1 = md.match(/^#\s.+\n/);
      const postTitle = h1 ? h1[0].match(/[^#\n]+/) : null;
      const title = postTitle ? postTitle[0].trim() : '';

      const desc = md.match(/\n\*desc>\s(.)+\n/);
      const postDescription = desc ? /\n\*desc>\s((?:(?!\*\n)[^　])+)/g.exec(desc[0]) : null;
      const description = postDescription ? postDescription[1] : '';

      const postDate = /\*date\:((?:(?!\*)[^　])+)/g.exec(md);
      const date = postDate ? postDate[1] : '';

      const url = encodeURI(name);
      const html = withHtml ? marked(md, { renderer }) : null;

      marked.setOptions({
        gfm: true,
        highlight,
      });

      resolve({
        name,
        title,
        description,
        date,
        url,
        html,
      });
    });
  });
};
