import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { Layout } from './components/Layout';
import type { Env, Post } from './types';

const app = new Hono<Env>();

// 記事リスト（後でファイルから読み込むように変更）
const posts: Post[] = [
  {
    title: '記事タイトル',
    description: '記事の説明文',
    date: '2024-01-01',
    url: '/sample-post',
  },
];

app.use('/*', serveStatic({ root: './public' }));

// トップページ
app.get('/', (c) => {
  return c.html(
    <Layout title="My Blog">
      <h1>記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.url}>
            <a href={post.url}>{post.title}</a>
            <p>{post.description}</p>
            <small>{post.date}</small>
          </li>
        ))}
      </ul>
    </Layout>,
  );
});

// 記事ページ
app.get('/:post', (c) => {
  const post = c.req.param('post');
  const postData = posts.find((p) => p.url === `/${post}`);

  if (!postData) {
    return c.html(
      <Layout title="404 - Not Found">
        <h1>404 - Page Not Found</h1>
        <a href="/">トップページ</a>
      </Layout>,
      404,
    );
  }

  return c.html(
    <Layout title={postData.title}>
      <h1>{postData.title}</h1>
      <p>{postData.description}</p>
      <small>{postData.date}</small>
      <hr />
      <a href="/">トップページ</a>
    </Layout>,
  );
});

export default app;
