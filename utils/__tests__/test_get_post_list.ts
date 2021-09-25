import { generatePostList } from '../get_post_list';
import { getPostInfo } from '../get_post_info';
import * as fs from 'mz/fs';
import path from 'path';

const mockDir = path.join(__dirname, './mock/');

test('getPostList', async (): Promise<void> => {
  const dist = path.join(__dirname, 'tmp');
  fs.mkdirSync(dist);

  generatePostList({ postDir: mockDir, dist })
    .then(() => {
      const tmpFiles = fs.readdirSync(dist);

      expect(tmpFiles.length).toBe(1);

      fs.unlinkSync(path.join(dist, '/', tmpFiles[0]));
      fs.rmdirSync(dist);
    })
    .catch(() => {
      console.error('Something wrong!');
    });
});
