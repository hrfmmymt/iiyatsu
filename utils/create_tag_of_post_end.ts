import { PostInfo } from './types';

export const FOOTER_TAG = '<footer>&#8718;</footer>';

export const createTagOfPostEnd = ({
  nextPost,
  prevPost,
}: {
  nextPost: PostInfo['nextPost'];
  prevPost: PostInfo['prevPost'];
}) => {
  const next = nextPost
    ? `<dt>次に出た記事</dt><dd><a href="${nextPost.url}">${nextPost.title}</a></dd>`
    : '';
  const prev = prevPost
    ? `<dt>前に出た記事</dt><dd><a href="${prevPost.url}">${prevPost.title}</a></dd>`
    : '';
  const result = `${FOOTER_TAG}<nav class="post-recent"><dl>${next}${prev}</dl></nav>`;

  return result;
};
