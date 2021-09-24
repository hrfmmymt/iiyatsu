import { createTagOfPostEnd } from '../create_tag_of_post_end';

const EXPECT_FULL =
  '<footer class="post-footer">&#8718;</footer><nav class="post-recent"><dl><dt>次に出た記事</dt><dd><a href="nextPostUrl">nextPostTitle</a></dd><dt>前に出た記事</dt><dd><a href="prevPostUrl">prevPostTitle</a></dd></dl></nav>';

const EXPECT_PREV_ONLY =
  '<footer class="post-footer">&#8718;</footer><nav class="post-recent"><dl><dt>前に出た記事</dt><dd><a href="prevPostUrl">prevPostTitle</a></dd></dl></nav>';

const EXPECT_NEXT_ONLY =
  '<footer class="post-footer">&#8718;</footer><nav class="post-recent"><dl><dt>次に出た記事</dt><dd><a href="nextPostUrl">nextPostTitle</a></dd></dl></nav>';

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

test('should render next and prev post links', () => {
  expect(createTagOfPostEnd(INPUT_FULL)).toBe(EXPECT_FULL);
});

test('should render prev post link', () => {
  expect(createTagOfPostEnd(INPUT_PREV_ONLY)).toBe(EXPECT_PREV_ONLY);
});

test('should render next post link', () => {
  expect(createTagOfPostEnd(INPUT_NEXT_ONLY)).toBe(EXPECT_NEXT_ONLY);
});
