import * as fs from 'fs';
import path from 'path';

import { PostInfo } from '../types';

import { generateIndexPage } from './generate_index_page';
import { generatePostPage } from './generate_post_page';

const postList = JSON.parse(fs.readFileSync(path.join(__dirname, '../../post-list.json'), 'utf8'));

export const generateIndexHtml = (): void => {
  const DIST_PATH = path.join(__dirname, '../../public/');

  fs.writeFileSync(path.join(DIST_PATH, 'index.html'), generateIndexPage(postList));
};

export const generatePostHtml = (): void => {
  const DIST_PATH = path.join(__dirname, '../../public/posts/');

  if (!fs.existsSync(DIST_PATH)) fs.mkdirSync(DIST_PATH);

  postList.forEach((post: PostInfo) => {
    fs.writeFileSync(path.join(DIST_PATH, post.name + '.html'), generatePostPage(post));
  });
};

generateIndexHtml();
// generatePostHtml();
