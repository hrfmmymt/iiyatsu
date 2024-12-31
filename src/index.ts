import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';

// 型定義
type Post = {
  title: string;
  description: string;
  date: string;
  url: string;
};

type Env = {
  // 必要に応じて環境変数の型を追加
};

const app = new Hono<Env>();

app.use('/*', serveStatic({ root: './public' }));

// 記事リスト（後でファイルから読み込むように変更）
const posts: Post[] = [
  {
    title: 'サンプル記事',
    description: '説明文がここに入ります',
    date: '2024-01-01',
    url: '/sample-post',
  },
];

// 静的ファイルの提供
app.use('/static/*', serveStatic({ root: './' }));

// トップページ
app.get('/', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Blog</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>記事一覧</h1>
        <ul>
          ${posts
            .map(
              (post) => `
            <li>
              <a href="${post.url}">${post.title}</a>
              <p>${post.description}</p>
              <small>${post.date}</small>
            </li>
          `,
            )
            .join('')}
        </ul>
      </body>
    </html>
  `);
});

// 記事ページ
app.get('/:post', async (c) => {
  const post = c.req.param('post');

  // 記事が存在するか確認（後でファイルシステムでの確認に変更）
  const postData = posts.find((p) => p.url === `/${post}`);

  if (!postData) {
    return c.html(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>404 - Not Found</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1>404 - Page Not Found</h1>
          <a href="/">トップページに戻る</a>
        </body>
      </html>
    `,
      404,
    );
  }

  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${postData.title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>${postData.title}</h1>
        <p>${postData.description}</p>
        <small>${postData.date}</small>
        <hr>
        <a href="/">トップページに戻る</a>
      </body>
    </html>
  `);
});

export default app;
