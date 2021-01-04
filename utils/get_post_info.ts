import * as fs from 'fs';
import * as path from 'path';
// @ts-ignore
const marked = require('marked');
// @ts-ignore
const hljs = require('highlight.js');

import { PostInfo } from './types';
import { markedCustomRender } from './marked_custom_render';

const postDir = path.join(__dirname, '../post/');
const renderer = markedCustomRender();

const postList = JSON.parse(fs.readFileSync(path.join(__dirname, '../post-list.json'), 'utf8'));

export const getPostInfo = function ({
  fileName,
  withHtml,
}: {
  fileName: string;
  withHtml: boolean;
}): Promise<PostInfo> {
  return new Promise((resolve, reject) => {
    fs.readFile(postDir + fileName, 'utf-8', (err, md) => {
      if (err) return reject(err);

      const h1 = md.match(/^#\s.+\n/);
      const postTitle = h1 ? h1[0].match(/[^#\n]+/) : null;
      const title = postTitle ? postTitle[0].trim() : '';

      const desc = md.match(/\n\*desc>\s(.)+\n/);
      const postDescription = desc ? /\n\*desc>\s((?:(?!\*\n)[^\s　])+)/g.exec(desc[0]) : null;
      const description = postDescription ? postDescription[1] : '';

      const postDate = /\*date\:((?:(?!\*)[^\s　])+)/g.exec(md);
      const date = postDate ? postDate[1] : '';

      const url = encodeURI(fileName.replace(/.md/g, ''));
      const html = withHtml ? marked(md, { renderer }) : null;

      marked.setOptions({
        gfm: true,
        highlight(code: any, lang: any) {
          return hljs.highlightAuto(code, [lang]).value;
        },
      });

      const thisPostIndex = postList.findIndex((post: PostInfo) => post.url === url);
      const nextPost = postList[thisPostIndex].nextPost;
      const prevPost = postList[thisPostIndex].prevPost;

      resolve({
        title,
        description,
        date,
        url,
        html,
        nextPost,
        prevPost,
      });
    });
  });
};
