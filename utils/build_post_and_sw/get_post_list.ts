import * as fs from 'mz/fs';

import { getPostInfo } from '../get_post_info';
import { PostInfo } from '../types';

// export for testing
export const byNewest = (a: PostInfo, b: PostInfo) => {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  if (a.title > b.title) return -1;
  if (a.title < b.title) return 1;
  return 0;
};

export async function generatePostList({ postDir, dist }: { postDir: string; dist: string }) {
  const files = await fs.readdir(postDir);
  const posts = files.map((file: string) =>
    getPostInfo({ postDir, fileName: file, withHtml: true }),
  );
  const postList: PostInfo[] = await Promise.all(posts);
  const sortedPostList = postList.sort(byNewest);

  const masterPostList = sortedPostList.reduce(
    (_acc: any, _cur: any, index: number, arr: PostInfo[]): PostInfo[] => {
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
