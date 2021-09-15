import tap from 'tap';

import { createTagOfPostEnd } from '../utils/create_tag_of_post_end';

const EXPECT_FULL =
  '<footer>&#8718;</footer><nav class="post-recent"><dl><dt>次に出た記事</dt><dd><a href="nextPostUrl">nextPostTitle</a></dd><dt>前に出た記事</dt><dd><a href="prevPostUrl">prevPostTitle</a></dd></dl></nav>';

const EXPECT_PREV_ONLY =
  '<footer>&#8718;</footer><nav class="post-recent"><dl><dt>前に出た記事</dt><dd><a href="prevPostUrl">prevPostTitle</a></dd></dl></nav>';

const EXPECT_NEXT_ONLY =
  '<footer>&#8718;</footer><nav class="post-recent"><dl><dt>次に出た記事</dt><dd><a href="nextPostUrl">nextPostTitle</a></dd></dl></nav>';

const INPUT_FULL = {
  nextPost: { url: 'nextPostUrl', title: 'nextPostTitle' },
  prevPost: { url: 'prevPostUrl', title: 'prevPostTitle' },
};

const INPUT_PREV_ONLY = {
  nextPost: null,
  prevPost: { url: 'prevPostUrl', title: 'prevPostTitle' },
};

const INPUT_NEXT_ONLY = {
  nextPost: { url: 'nextPostUrl', title: 'nextPostTitle' },
  prevPost: null,
};

tap.equal(createTagOfPostEnd(INPUT_FULL), EXPECT_FULL);
tap.equal(createTagOfPostEnd(INPUT_PREV_ONLY), EXPECT_PREV_ONLY);
tap.equal(createTagOfPostEnd(INPUT_NEXT_ONLY), EXPECT_NEXT_ONLY);
