import * as fs from 'mz/fs';
import * as path from 'path';

import { getPostInfo } from './get_post_info';
import { PostInfo } from './types';

const postDir = path.join(__dirname, '../post/');

async function generatePostList() {
  const dist = path.join(__dirname, '../');
  const files = await fs.readdir(postDir);
  const posts = files.map((file: string) =>
    getPostInfo({ fileName: postDir + file, withHtml: true }),
  );
  const postList: PostInfo[] = await Promise.all(posts);

  const sortedPostList = postList.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    if (a.title > b.title) return -1;
    if (a.title < b.title) return 1;
    return 0;
  });

  const masterPostList = sortedPostList.reduce(
    (acc: any, cur: any, index: number, arr: PostInfo[]): PostInfo[] => {
      const prev = arr[index + 1] || null;
      const next = arr[index - 1] || null;

      const prevPost = prev
        ? {
            title: prev.title,
            url: prev.url,
          }
        : null;

      const nextPost = next
        ? {
            title: next.title,
            url: next.url,
          }
        : null;

      arr[index].prevPost = prevPost;
      arr[index].nextPost = nextPost;

      return arr;
    },
    [],
  );

  fs.writeFile(`${dist}post-list.json`, JSON.stringify(masterPostList, null, '  '));
}

generatePostList();
