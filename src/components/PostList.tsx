import type { Post } from '../types';

type Props = {
  posts: Post[];
};

export const PostList = ({ posts }: Props) => (
  <ul>
    {posts.map((post) => (
      <li key={post.slug}>
        <a href={`/posts/${post.slug}`}>{post.title}</a>
        <p>{post.description}</p>
        <small>{post.date}</small>
      </li>
    ))}
  </ul>
);
