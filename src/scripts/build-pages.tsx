import fs from 'node:fs';
import path from 'node:path';
import { raw } from 'hono/html';

import type { Post, PostWithNavigation } from '../types';
import { siteConfig, profileData } from '../config';
import { Layout } from '../components/Layout';
import { Profile } from '../components/Profile';
import { PostList } from '../components/PostList';
import { PostNavigation } from '../components/PostNavigation';
import { ErrorLayout } from '../components/ErrorLayout';
import Offline from '../components/Offline';

const DIST_DIR = path.join(process.cwd(), 'dist');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function renderToString(element: JSX.Element): string {
  return element.toString();
}

function buildIndexPage(posts: Post[]): void {
  const html = renderToString(
    <Layout title={siteConfig.title} cssPath="top.css" siteConfig={siteConfig}>
      <Profile name={profileData.name} links={profileData.links} />
      <PostList posts={posts} />
    </Layout>,
  );

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
  console.log('  ✓ dist/index.html');
}

function buildPostPages(posts: PostWithNavigation[]): void {
  for (const post of posts) {
    const postDir = path.join(DIST_DIR, 'posts', post.slug);
    ensureDir(postDir);

    const html = renderToString(
      <Layout
        title={post.title}
        cssPath="post.css"
        pageUrl={`${siteConfig.url}posts/${post.slug}`}
        siteConfig={siteConfig}
      >
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

    fs.writeFileSync(path.join(postDir, 'index.html'), html);
  }
  console.log(`  ✓ dist/posts/**/index.html (${posts.length} pages)`);
}

function build404Page(): void {
  const html = renderToString(
    <ErrorLayout
      title="404 - Not Found"
      cssPath="error.css"
      siteConfig={siteConfig}
      errorMessage="page not found"
      statusCode={404}
    />,
  );

  fs.writeFileSync(path.join(DIST_DIR, '404.html'), html);
  console.log('  ✓ dist/404.html');
}

function buildOfflinePage(): void {
  const offlineDir = path.join(DIST_DIR, 'offline');
  ensureDir(offlineDir);

  const html = renderToString(<Offline siteConfig={siteConfig} />);

  fs.writeFileSync(path.join(offlineDir, 'index.html'), html);
  console.log('  ✓ dist/offline/index.html');
}

function copyStaticFiles(): void {
  const srcDir = path.join(PUBLIC_DIR, 'static');
  const destDir = path.join(DIST_DIR, 'static');

  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('  ✓ public/static/ → dist/static/');
}

function generateHeaders(): void {
  const headers = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://static.cloudflareinsights.com 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://cloudflareinsights.com; font-src 'self'; frame-src 'none'
`;

  fs.writeFileSync(path.join(DIST_DIR, '_headers'), headers);
  console.log('  ✓ dist/_headers');
}

function buildPages(): void {
  console.log('Building static pages...');

  const postsJson = fs.readFileSync(
    path.join(PUBLIC_DIR, 'posts', 'posts.json'),
    'utf-8',
  );
  const posts: PostWithNavigation[] = JSON.parse(postsJson);

  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });

  buildIndexPage(posts);
  buildPostPages(posts);
  build404Page();
  buildOfflinePage();
  copyStaticFiles();
  generateHeaders();

  console.log('Done!');
}

buildPages();
