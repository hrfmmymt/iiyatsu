import fs from 'fs';
import path from 'path';

import { PostInfo } from '../types';
import { CONFIG, META } from '../../constants';

const profile = fs.readFileSync(
  path.join(__dirname, '../../templates/partial/profile.njk'),
  'utf8',
);
const style = fs.readFileSync(path.join(__dirname, '../../templates/style/top.njk'), 'utf8');
const logo = fs.readFileSync(path.join(__dirname, '../../templates/partial/logo.njk'), 'utf8');

export function generateIndexPage(content: PostInfo[]) {
  const postList = content
    .map((item) => {
      return `<li class="post-item">
      <p class="post-meta"><time class="post-date" datetime="${item.date}">${item.date}</time></p>
      <a class="post-title" href="${item.url}">${item.title}</a>
      <p class="post-meta"><span>${item.description}</span></p>
      </li>`;
    })
    .join('');

  return `<!DOCTYPE html>
  <html lang="ja-jp">
    <head>
      <title>${META.TITLE}</title>
      <meta charset="UTF-8">
      <meta name="author" content="hrfmmymt">
      <meta name="copyright" content="Copyright(c)${META.AUTHOR}. ${CONFIG.CURRENT_YEAR} All Rights Reserved.">
      <meta name="description" content="${META.DESCRIPTION}">
      <meta name="format-detection" content="telephone=no,address=no,email=no">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)">
      <meta name="theme-color" content="#332f21" media="(prefers-color-scheme: dark)">
      <meta property="og:description" content="${META.DESCRIPTION}">
      <meta property="og:title" content="${META.TITLE}">
      <meta property="og:url" content="${META.URL}">
      <meta property="og:image" content="${META.OG_IMAGE}">
      <meta property="og:type" content="website">
      <meta property="og:locale" content="ja_JP">

      <link rel="canonical" href="${META.URL}">
      <link rel="shortcut icon" type="image/x-icon" href="${META.FAVICON}">
      <link rel="manifest" href="public/manifest.json">
      <link rel="image_src" href="${META.OG_IMAGE}">
      <link rel="icon" type="image/png" href="${META.OG_IMAGE}">
      <link rel="apple-touch-icon" href="${META.OG_IMAGE}">
      <link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
      <style>${style}</style>
    </head>
    <body>
      <main class="wrapper">

      <!-- 後で消す -->
      <h1>this is static html</h1>
      <!-- 後で消す -->

      <header class="header">
          <h1 class="header-title">
            <a href="/" class="header-title-link">
              ${logo}
            </a>
          </h1>
        </header>
        ${profile}
        <ul class="post-list">${postList}</ul>
        <footer class="footer">
          <details>
            <summary>${CONFIG.GA_SUMMARY}</summary>
            ${CONFIG.GA_DETAILS}
          </details>
        </footer>
      </main>
      <script src="public/js/script.js" defer></script>
    </body>
  </html>
  `;
}
