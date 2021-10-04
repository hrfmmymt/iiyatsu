import * as fs from 'mz/fs';
import * as glob from 'glob';

import { PostInfo } from '../types';

const PUBLIC_DIR = 'public/';
const STATIC_CACHE_URL_LIST = ['./', './offline'];

export const buildSW = (): void => {
  const postList = JSON.parse(fs.readFileSync('./post-list.json', 'utf8'));
  const postFiles = postList.map((item: PostInfo) => `./${item.url}`);
  const publicFiles = glob.sync(PUBLIC_DIR + '**/*.{css,js,json,png,jpg,webp,ico}', {
    ignore: [PUBLIC_DIR + '**/post/**', PUBLIC_DIR + '**/raw/*'],
  });
  const staticFiles = publicFiles.map((item: string) => `./${item}`);
  const postAndStaticFiles = postFiles.concat(staticFiles);

  const cacheUrlList = STATIC_CACHE_URL_LIST.concat(postAndStaticFiles);
  const cacheUrlListString = JSON.stringify(cacheUrlList, null, '  ');

  fs.readFile('./public/sw.js', 'utf8', (err, data) => {
    if (err) return console.log(err);

    const existingList = data.match(/const URLS_TO_CACHE = ([\s\S]*?.+)\;/) ?? [];

    if (cacheUrlListString !== existingList[1]) {
      const existingVersion = data.match(/const CACHE_VERSION = ([\s\S]*?.+)\;/) ?? '';
      const nextVersionNumber = Number(existingVersion[1]) + 1;

      const replacement = data.replace(
        `const CACHE_VERSION = ${existingVersion[1]};\nconst URLS_TO_CACHE = ${existingList[1]};`,
        `const CACHE_VERSION = ${nextVersionNumber};\nconst URLS_TO_CACHE = ${cacheUrlListString};`,
      );

      fs.writeFile('./public/sw.js', replacement, 'utf8', (err) => {
        if (err) return console.log(err);
      });
    } else {
      console.log('no changes to sw.js');
    }
  });
};
