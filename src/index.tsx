import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { raw } from 'hono/html';

import { Layout } from './components/Layout';
import { PostNavigation } from './components/PostNavigation';
import type { Env } from './types';

const app = new Hono<Env>();

// 記事データの型定義
type Post = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
};

// 記事データの読み込み
import postsData from '../public/posts/posts.json';
const posts = postsData as Post[];

app.use('/styles/*', serveStatic({ root: './', manifest: {} }));
app.use('/favicon.ico', serveStatic({ path: './favicon.ico', manifest: {} }));
app.use('/posts/*', serveStatic({ path: './', manifest: {} }));

// トップページ
app.get('/', (c) => {
  return c.html(
    <Layout title="My Blog" cssPath="top.css">
      <h1>記事一覧</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <a href={`/posts/${post.slug}`}>{post.title}</a>
            <p>{post.description}</p>
            <small>{post.date}</small>
          </li>
        ))}
      </ul>
    </Layout>,
  );
});

// 記事ページ
app.get('/posts/:slug', (c) => {
  const slug = c.req.param('slug');
  const post = posts.find((p: Post) => p.slug === slug);
  
  if (!post) {
    return c.html(
      <Layout title="404 - Not Found" cssPath="not_found.css">
        <h1>404 - Page Not Found</h1>
        <a href="/">トップページに戻る</a>
      </Layout>,
      404,
    );
  }

  return c.html(
    <Layout title={post.title} cssPath="post.css">
      <article>
        <h1>{post.title}</h1>
        <div>{raw(post.content)}</div>
        <small>{post.date}</small>
      </article>
      <PostNavigation post={post} />
      <hr />
      <a href="/">トップページに戻る</a>
    </Layout>,
  );
});

export default app;
