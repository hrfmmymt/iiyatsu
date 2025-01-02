import type { FC } from 'hono/jsx';
import type { PostWithNavigation } from '../types';

type PostNavigationProps = {
  post: PostWithNavigation;
};

export const PostNavigation: FC<PostNavigationProps> = ({ post }) => (
  <>
    <div class="post-footer">&#8718;</div>
    <nav class="post-recent">
      <dl>
        {post.nextPost && (
          <>
            <dt>次に出た記事</dt>
            <dd>
              <a href={`/posts/${post.nextPost.slug}`}>{post.nextPost.title}</a>
            </dd>
          </>
        )}
        {post.prevPost && (
          <>
            <dt>前に出た記事</dt>
            <dd>
            <a href={`/posts/${post.prevPost.slug}`}>{post.prevPost.title}</a>
            </dd>
          </>
        )}
      </dl>
    </nav>
  </>
);
