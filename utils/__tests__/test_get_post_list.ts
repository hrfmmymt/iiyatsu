import * as fs from 'mz/fs';
import path from 'path';

import { generatePostList } from '../get_post_list';
import { PostInfo } from '../types';

const mockDir = path.join(__dirname, './mock/');

const EXPECT_TITLE = 'mock-title';
const EXPECT_DATE = '2021-09-01';
const EXPECT_DESC = 'mock-desc';
const EXPECT_HTML = `<h1 id="${EXPECT_TITLE}">${EXPECT_TITLE}</h1>
<p><time datetime="${EXPECT_DATE}">${EXPECT_DATE}</time></p>
<p><em class="description">${EXPECT_DESC}</em></p>
<p>mock-html</p>
`;

test('should generate a post-list.json', async (): Promise<void> => {
  const dist = path.join(__dirname, 'tmp');
  fs.mkdirSync(dist);

  return generatePostList({ postDir: mockDir, dist })
    .then(() => {
      setTimeout(() => {
        const tmpFile = fs.readdirSync(dist);
        const postList = JSON.parse(fs.readFileSync(path.join(dist, tmpFile[0]), 'utf8'));

        expect(tmpFile.length).toEqual(1);
        expect(path.join(dist, tmpFile[0])).toBe(path.join(dist, 'post-list.json'));

        postList.map((postListItem: PostInfo) => {
          expect(postListItem.title).toBe(EXPECT_TITLE);
          expect(postListItem.description).toBe(EXPECT_DESC);
          expect(postListItem.date).toBe(EXPECT_DATE);
          expect(postListItem.url).toBe('mock');
          expect(postListItem.html).toBe(EXPECT_HTML);
        });

        fs.unlinkSync(path.join(dist, '/', tmpFile[0]));
        fs.rmdirSync(dist);
      }, 500);
    })
    .catch((e) => {
      console.error([e, 'you must `rm -rf utils/__tests__/tmp/`']);
    });
});
