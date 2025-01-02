import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { raw } from 'hono/html';

import postsData from '../public/posts/posts.json';

import type { Env, Post } from './types';
import { Layout } from './components/Layout';
import { PostNavigation } from './components/PostNavigation';
import { Profile } from './components/Profile';
import { ErrorLayout } from './components/ErrorLayout';
import { PostList } from './components/PostList';

const app = new Hono<Env>();

// 記事データの読み込み
const posts = postsData as Post[];

// プロフィール
const profileData = {
  name: 'hrfmmymt',
  links: [
    { title: 'Twitter', url: 'https://twitter.com/hrfmmymt' },
    { title: 'Facebook', url: 'https://www.facebook.com/hrfmmymt' },
    { title: 'Github', url: 'https://github.com/hrfmmymt' },
    { title: 'Mail', url: 'mailto:hrfmmymt@gmail.com' },
    { title: 'Website', url: 'https://hrfmmymt.github.io/' },
    { title: 'Portfolio site', url: 'https://hrfmmymt.com/' },
  ],
};

// サイト設定
const createSiteConfig = (env: Env) => ({
  author: env.SITE_AUTHOR,
  title: env.SITE_TITLE,
  description: env.SITE_DESCRIPTION,
  url: env.SITE_URL,
  ogImage: env.SITE_OG_IMAGE,
  gaId: env.GA_ID,
  year: new Date().getFullYear().toString(),
  privacyPolicy: {
    summary: env.PRIVACY_POLICY_SUMMARY,
    details: env.PRIVACY_POLICY_DETAILS,
  },
});

const ERROR_MESSAGE = {
  404: 'page not found',
  500: 'internal server error',
  503: 'service temporarily unavailable',
};

app.use('/styles/*', serveStatic({ root: './', manifest: {} }));
app.use('/favicon.ico', serveStatic({ path: './favicon.ico', manifest: {} }));
app.use('/posts/*', serveStatic({ path: './', manifest: {} }));
app.use('/manifest.json', serveStatic({ path: './manifest.json', manifest: {} }));
app.use('/img/*', serveStatic({ path: './img', manifest: {} }));

// トップページ
app.get('/', (c) => {
  const siteConfig = createSiteConfig(c.env as Env);

  return c.html(
    <Layout title={siteConfig.title} cssPath="top.css" siteConfig={siteConfig}>
      <Profile name={profileData.name} links={profileData.links} />
      <PostList posts={posts} />
    </Layout>,
  );
});

// 記事ページ
app.get('/posts/:slug', (c) => {
  const slug = c.req.param('slug');
  const post = posts.find((p: Post) => p.slug === slug);
  const siteConfig = createSiteConfig(c.env as Env);

  // 404ページ（存在しない記事へのアクセス）
  if (!post) {
    return c.html(
      <ErrorLayout
        title="404 - Not Found"
        cssPath="error.css"
        siteConfig={siteConfig}
        errorMessage={ERROR_MESSAGE[404]}
        statusCode={404}
      />,
      404,
    );
  }

  return c.html(
    <Layout title={post.title} cssPath="post.css" siteConfig={siteConfig}>
      <article class="post-article">
        <h1>{post.title}</h1>
        <div>{raw(post.content)}</div>
        <p class="post-meta">
          <time class="post-date" datetime={post.datetime}>
            {post.date}
          </time>
        </p>
      </article>
      <PostNavigation post={post} />
    </Layout>,
  );
});

// カスタムエラークラスの定義
class ServiceUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceUnavailableError';
  }
}

// 500エラーテスト用のルート
app.get('/test-500', () => {
  throw new Error('Intentional 500 error for testing');
});

// 非同期の500エラーテスト用のルート
app.get('/test-500-async', async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  throw new Error('Intentional async 500 error for testing');
});

// データベースエラーを模したテスト
app.get('/test-503', () => {
  throw new ServiceUnavailableError('Database connection failed');
});

// エラーハンドラー
app.onError((err, c) => {
  console.error(`${err}`);
  const siteConfig = createSiteConfig(c.env as Env);

  // エラーの種類に応じて異なるステータスコードとメッセージを設定
  const statusCode = err instanceof ServiceUnavailableError ? 503 : 500;
  const errorMessage = statusCode === 503 ? ERROR_MESSAGE[503] : ERROR_MESSAGE[500];

  return c.html(
    <ErrorLayout
      title={`${statusCode} - ${errorMessage}`}
      cssPath="error.css"
      siteConfig={siteConfig}
      errorMessage={errorMessage}
      err={err}
      statusCode={statusCode}
    />,
    statusCode,
  );
});

// 404ページ（存在しないパスへのアクセス）
app.notFound((c) => {
  const siteConfig = createSiteConfig(c.env as Env);

  return c.html(
    <ErrorLayout
      title="404 - Not Found"
      cssPath="error.css"
      siteConfig={siteConfig}
      errorMessage={ERROR_MESSAGE[404]}
      statusCode={404}
    />,
    404,
  );
});

export default app;
