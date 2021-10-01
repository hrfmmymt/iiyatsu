import * as fs from 'mz/fs';
import path from 'path';

import { generatePostList, byNewest } from '../get_post_list';
import { PostInfo } from '../types';

const mockDir = path.join(__dirname, './mock/');

const EXPECT_POST_INFO: PostInfo = {
  title: 'mock-title',
  description: 'mock-desc',
  date: '2021-09-01',
  url: 'mock',
  html: '<h1 id="mock-title">mock-title</h1>\n<p><time datetime="2021-09-01">2021-09-01</time></p>\n<p><em class="description">mock-desc</em></p>\n<p>mock-html</p>\n',
};

describe('get_post_list test', () => {
  test('should generate a post-list.json', async (): Promise<void> => {
    const dist = path.join(__dirname, 'tmp');
    fs.mkdirSync(dist);

    const test = () => {
      const tmpFile = fs.readdirSync(dist);
      const postList = JSON.parse(fs.readFileSync(path.join(dist, tmpFile[0]), 'utf8'));
      expect(tmpFile.length).toEqual(1);
      expect(path.join(dist, tmpFile[0])).toBe(path.join(dist, 'post-list.json'));
      postList.map((postListItem: PostInfo) => {
        expect(postListItem.title).toBe(EXPECT_POST_INFO.title);
        expect(postListItem.description).toBe(EXPECT_POST_INFO.description);
        expect(postListItem.date).toBe(EXPECT_POST_INFO.date);
        expect(postListItem.url).toBe(EXPECT_POST_INFO.url);
        expect(postListItem.html).toBe(EXPECT_POST_INFO.html);
      });
    };

    const testTimer = setTimeout(() => test, 500);

    return generatePostList({ postDir: mockDir, dist })
      .then(() => {
        setTimeout(() => test, 500);
        clearTimeout(testTimer);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  test('should order PostInfo data by newest date', () => {
    const olderPostInfo: PostInfo = {
      title: 'mock-title',
      description: 'mock-desc',
      date: '2021-08-31',
      url: 'mock',
      html: 'mock-html',
    };

    expect(byNewest(EXPECT_POST_INFO, olderPostInfo)).toBe(-1);
    expect(byNewest(olderPostInfo, EXPECT_POST_INFO)).toBe(1);
  });

  test('should order PostInfo data by title when same date', () => {
    const sameDateVer2: PostInfo = {
      title: 'mock-title-ver2',
      description: 'mock-desc',
      date: '2021-09-01',
      url: 'mock',
      html: 'mock-html',
    };

    expect(byNewest(sameDateVer2, EXPECT_POST_INFO)).toBe(-1);
    expect(byNewest(EXPECT_POST_INFO, sameDateVer2)).toBe(1);
  });

  test('should do nothing when same date and same title', () => {
    const samePost: PostInfo = {
      title: 'mock-title',
      description: 'mock-desc',
      date: '2021-09-01',
      url: 'mock',
      html: 'mock-html',
    };

    expect(byNewest(EXPECT_POST_INFO, samePost)).toBe(0);
  });
});
