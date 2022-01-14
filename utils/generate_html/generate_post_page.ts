import fs from 'fs';
import path from 'path';

import { PostInfo } from '../types';

const AUTHOR = 'hrfmmymt';
const year = new Date().getFullYear();
const OG_IMG = 'public/img/icon/icon.png';
const FAVICON = 'public/img/icon/favicon.ico';

const style = fs.readFileSync(path.join(__dirname, '../../templates/style/post.njk'), 'utf8');
const logo = fs.readFileSync(path.join(__dirname, '../../templates/partial/logo.njk'), 'utf8');

export function generatePostPage(content: PostInfo) {
  return `<!DOCTYPE html>
  <html lang="ja-jp">
    <head>
      <title>${content.title}</title>
      <meta charset="UTF-8">
      <meta name="author" content="hrfmmymt">
      <meta name="copyright" content="Copyright(c)${AUTHOR}. ${year} All Rights Reserved.">
      <meta name="description" content="${content.description}">
      <meta name="format-detection" content="telephone=no,address=no,email=no">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)">
      <meta name="theme-color" content="#332f21" media="(prefers-color-scheme: dark)">
      <meta property="og:description" content="${content.description}">
      <meta property="og:title" content="${content.title}">
      <meta property="og:url" content="${content.url}">
      <meta property="og:image" content="${OG_IMG}">
      <meta property="og:type" content="website">
      <meta property="og:locale" content="ja_JP">

      <link rel="canonical" href="${content.url}">
      <link rel="shortcut icon" type="image/x-icon" href="${FAVICON}">
      <link rel="manifest" href="public/manifest.json">
      <link rel="image_src" href="${OG_IMG}">
      <link rel="icon" type="image/png" href="${OG_IMG}">
      <link rel="apple-touch-icon" href="${OG_IMG}">
      <link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
      <style>${style}</style>
    </head>
    <body>
      <header class="header">
        <h1 class="header-title">
          <a href="/" class="header-title-link">
            ${logo}
          </a>
        </h1>
      </header>
      <article class="post-article">
        <h1>this is static html</h1>
        ${content.html}
      </article>
      <footer class="footer">
        <details>
          <summary>This website uses Google Analytics, a web analytics service provided by Google.</summary>
          Google Analytics uses "cookies", which are text files placed on your computer, to help the website analyse how users use the site.
        </details>
      </footer>
    </body>
  </html>
  `;
}
