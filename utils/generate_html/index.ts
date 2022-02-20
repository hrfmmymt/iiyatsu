import * as path from 'path';

import { generateIndexHtml } from '../../utils/generate_html/generate_index_page';
import { generateNotFoundHtml } from '../../utils/generate_html/generate_not_found_page';
import { generatePostHtml } from '../../utils/generate_html/generate_post_page';
import { generatePostList } from '../build_post_and_sw/get_post_list';

async function buildPostHtml() {
  const postDir = path.join(__dirname, '../../post/');
  const dist = path.join(__dirname, '../../');
  const postHtmlDist = path.join(__dirname, '../../public/post/');

  await generatePostList({ dist, postDir }).then((postListStr) => {
    generatePostHtml({ postHtmlDist, postListStr });
  });
}

buildPostHtml();
generateIndexHtml();
generateNotFoundHtml();
