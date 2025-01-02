import type { Post } from '../types';

type Props = {
  posts: Post[];
};

export const PostList = ({ posts }: Props) => (
  <ul class="post-list">
    {posts.map((post: Post) => (
      <li key={post.slug} class="post-item">
        <p class="post-meta">
          <time class="post-date" datetime={post.datetime}>
            {post.date}
          </time>
        </p>
        <a class="post-title" href={`/posts/${post.slug}`}>
          {post.title}
        </a>
        <p class="post-meta">
          <span>{post.description}</span>
        </p>
      </li>
    ))}
  </ul>
);
