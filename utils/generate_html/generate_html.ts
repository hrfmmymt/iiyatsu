import * as fs from 'fs';
import path from 'path';

import { PostInfo } from '../types';

import { generatePostPage } from './generate_post_page';

const DIST_PATH = path.join(__dirname, '../../dist/');
const postList = JSON.parse(fs.readFileSync(path.join(__dirname, '../../post-list.json'), 'utf8'));

export const generateHtml = (): void => {
  if (!fs.existsSync(DIST_PATH)) fs.mkdirSync(DIST_PATH);

  postList.forEach((post: PostInfo) => {
    fs.writeFileSync(path.join(DIST_PATH, post.url + '.html'), generatePostPage(post));
  });
};

generateHtml();
