import * as path from 'path';

import { buildSW } from './build_sw';
import { generatePostList } from './get_post_list';
import { setRecentPostData } from './set_recent_post_data';

async function buildPost() {
  const postDir = path.join(__dirname, '../../post/');
  const dist = path.join(__dirname, '../../');

  await generatePostList({ postDir, dist });
  setRecentPostData();
}

buildSW();

buildPost();
