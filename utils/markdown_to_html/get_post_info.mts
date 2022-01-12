import fs from 'fs';

import { PostInfo } from '../types';

import { createFile } from './markdown_to_html.mjs';

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

      const h1 = md.match(/^#\s.+\n/);
      const postTitle = h1 ? h1[0].match(/[^#\n]+/) : null;
      const title = postTitle ? postTitle[0].trim() : '';

      const desc = md.match(/\n\*desc>\s(.)+\n/);
      const postDescription = desc ? /\n\*desc>\s((?:(?!\*\n)[^　])+)/g.exec(desc[0]) : null;
      const description = postDescription ? postDescription[1] : '';

      const postDate = /\*date\:((?:(?!\*)[^　])+)/g.exec(md);
      const date = postDate ? postDate[1] : '';

      const url = encodeURI(fileName.replace(/.md/g, ''));
      const html = withHtml ? createFile(md) : null;

      resolve({
        title,
        description,
        date,
        url,
        html,
      });
    });
  });
};
