import type { Post } from '../types';

type Props = {
  posts: Post[];
};

export const PostList = ({ posts }: Props) => (
  <ul>
    {posts.map((post) => (
      <li key={post.url}>
        <a href={post.url}>{post.title}</a>
        <p>{post.description}</p>
        <small>{post.date}</small>
      </li>
    ))}
  </ul>
);
