import fs from 'fs';
import path from 'path';

import { PostInfo } from '../types';

// ./consts/ みたいなとこに配置しよう
const COMMON_TITLE = "iiyatsu - hrfmmymt's weblog";
const PUBLIC_URL = 'https://iiyatsu.hrfmmymt.com/';
const GA_SUMMARY =
  'This website uses Google Analytics, a web analytics service provided by Google.';
const GA_DETAILS =
  'Google Analytics uses "cookies", which are text files placed on your computer, to help the website analyse how users use the site.';

const config = {
  currentYear: new Date().getFullYear(),
  postDir: path.join(__dirname, '../post/'),
  postList: JSON.parse(fs.readFileSync(path.join(__dirname, '../../post-list.json'), 'utf8')),
  gaSummary: GA_SUMMARY,
  gaDetails: GA_DETAILS,
};

const metadata = {
  author: 'hrfmmymt',
  copyright: 'Copyright &copy; 2021 iiyatsu of hrfmmymt All Rights Reserved.',
  description: "hrfmmymt's weblog",
  ogImage: 'public/img/icon/icon.png',
  favicon: 'public/img/icon/favicon.ico',
  title: COMMON_TITLE,
  url: PUBLIC_URL,
};

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
      <title>${metadata.title}</title>
      <meta charset="UTF-8">
      <meta name="author" content="hrfmmymt">
      <meta name="copyright" content="Copyright(c)${metadata.author}. ${config.currentYear} All Rights Reserved.">
      <meta name="description" content="${metadata.description}">
      <meta name="format-detection" content="telephone=no,address=no,email=no">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)">
      <meta name="theme-color" content="#332f21" media="(prefers-color-scheme: dark)">
      <meta property="og:description" content="${metadata.description}">
      <meta property="og:title" content="${metadata.title}">
      <meta property="og:url" content="${metadata.url}">
      <meta property="og:image" content="${metadata.ogImage}">
      <meta property="og:type" content="website">
      <meta property="og:locale" content="ja_JP">

      <link rel="canonical" href="${metadata.url}">
      <link rel="shortcut icon" type="image/x-icon" href="${metadata.favicon}">
      <link rel="manifest" href="public/manifest.json">
      <link rel="image_src" href="${metadata.ogImage}">
      <link rel="icon" type="image/png" href="${metadata.ogImage}">
      <link rel="apple-touch-icon" href="${metadata.ogImage}">
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
            <summary>${config.gaSummary}</summary>
            ${config.gaDetails}
          </details>
        </footer>
      </main>
      <script src="public/js/script.js" defer></script>
    </body>
  </html>
  `;
}
