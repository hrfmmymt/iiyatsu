import path from 'path';

import { getPostInfo, highlight } from '../get_post_info';

const EXPECT_POST_DATA = {
  TITLE: 'mock-title',
  DESCRIPTION: 'mock-desc',
  DATE: '2021-09-01',
  URL: 'mock',
  HTML: 'mock-html\n',
};

const EXPECT_CODE_DATA = {
  CODE: "console.log('foo');",
  LANG: 'javascript',
};

const mockDir = path.join(__dirname, './mock/');

test('should return data if `withHtml` is true', async () => {
  return getPostInfo({ postDir: mockDir, fileName: 'mock.md', withHtml: true }).then((data) => {
    expect(data.title).toBe(EXPECT_POST_DATA.TITLE);
    expect(data.description).toBe(EXPECT_POST_DATA.DESCRIPTION);
    expect(data.date).toBe(EXPECT_POST_DATA.DATE);
    expect(data.url).toBe(EXPECT_POST_DATA.URL);
    expect(data.html).not.toBe(EXPECT_POST_DATA.HTML);
  });
});

test('should return html null if `withHtml` is false', async () => {
  return getPostInfo({ postDir: mockDir, fileName: 'mock.md', withHtml: false }).then((data) => {
    expect(data.title).toBe(EXPECT_POST_DATA.TITLE);
    expect(data.description).toBe(EXPECT_POST_DATA.DESCRIPTION);
    expect(data.date).toBe(EXPECT_POST_DATA.DATE);
    expect(data.url).toBe(EXPECT_POST_DATA.URL);
    expect(data.html).toBe(null);
  });
});

test('should return an error: ENOENT', async () => {
  try {
    await getPostInfo({ postDir: mockDir, fileName: 'XXX', withHtml: false });
  } catch (e) {
    expect(e.code).toEqual('ENOENT');
  }
});

test('highlight: should return highlighted code', () => {
  expect(highlight(EXPECT_CODE_DATA.CODE, EXPECT_CODE_DATA.LANG)).toEqual(expect.anything());
  expect(highlight(EXPECT_CODE_DATA.CODE, EXPECT_CODE_DATA.LANG)).toEqual(
    expect.stringContaining('<span class="hljs-'),
  );
});
