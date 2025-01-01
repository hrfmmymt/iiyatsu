import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { Layout } from './components/Layout';
import type { Env } from './types';
import { raw } from 'hono/html';

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
import posts from '../public/posts/posts.json';

app.use('/*', serveStatic({ root: './public', manifest: {} }));

// トップページ
app.get('/', (c) => {
  return c.html(
    <Layout title="My Blog">
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
      <Layout title="404 - Not Found">
        <h1>404 - Page Not Found</h1>
        <a href="/">トップページに戻る</a>
      </Layout>,
      404,
    );
  }

  return c.html(
    <Layout title={post.title}>
      <article>
        <h1>{post.title}</h1>
        <div>{raw(post.content)}</div>
        <small>{post.date}</small>
      </article>
      <hr />
      <a href="/">トップページに戻る</a>
    </Layout>,
  );
});

export default app;
