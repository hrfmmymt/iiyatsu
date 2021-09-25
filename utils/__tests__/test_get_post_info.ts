import path from 'path';

import { getPostInfo } from '../get_post_info';

const expectData = {
  title: 'preact-cli でポートフォリオサイトを作った',
  description: 'ギジュツテキ',
  date: '2018-06-06',
  url: '20180606',
  html: null,
};

const mockDir = path.join(__dirname, './mock/');

test('should return data if `withHtml` is true', async () => {
  return getPostInfo({ postDir: mockDir, fileName: '20180606.md', withHtml: true }).then((data) => {
    expect(data.title).toBe(expectData.title);
    expect(data.description).toBe(expectData.description);
    expect(data.date).toBe(expectData.date);
    expect(data.url).toBe(expectData.url);
    expect(data.html).not.toBe(null);
  });
});

test('should return html null if `withHtml` is false', async () => {
  return getPostInfo({ postDir: mockDir, fileName: '20180606.md', withHtml: false }).then(
    (data) => {
      expect(data.title).toBe(expectData.title);
      expect(data.description).toBe(expectData.description);
      expect(data.date).toBe(expectData.date);
      expect(data.url).toBe(expectData.url);
      expect(data.html).toBe(expectData.html);
    },
  );
});

test('should return an error: ENOENT', async () => {
  try {
    await getPostInfo({ postDir: mockDir, fileName: 'XXX', withHtml: false });
  } catch (e) {
    expect(e.code).toEqual('ENOENT');
  }
});
