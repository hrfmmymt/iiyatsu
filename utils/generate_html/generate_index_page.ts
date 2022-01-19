import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

import { PostInfo } from '../types';
import { CONFIG, META } from '../../constants';

import { logoTag, minifierOption } from './common';

const profile = fs.readFileSync(
  path.join(__dirname, '../../templates/partial/profile.njk'),
  'utf8',
);
const style = fs.readFileSync(path.join(__dirname, '../../templates/style/top.njk'), 'utf8');

// export for testing
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

  const html = minify(
    `<!DOCTYPE html>
  <html lang="ja">
    <head>
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-122819743-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-122819743-1');
      </script>
      <title>${META.TITLE}</title>
      <meta charset="utf-8">
      <meta name="author" content="${META.AUTHOR}">
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
      <span style="position:absolute;top:0;left:0;">this is static page</span>
      <main class="wrapper">
        <header class="header">
          <h1 class="header-title">
            <a href="/" class="header-title-link">
              ${logoTag}
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
  `,
    minifierOption,
  );

  return html;
}

export const generateIndexHtml = (): void => {
  const DIST_PATH = path.join(__dirname, '../../public/');
  const postList = CONFIG.POST_LIST;

  fs.writeFileSync(path.join(DIST_PATH, 'index.html'), generateIndexPage(postList));
};
