import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

import { PostInfo } from '../../types';
import { generateIndexPage } from '../generate_index_page';
import { CONFIG, META } from '../../../constants';

const MOCK_DATA: PostInfo[] = [
  {
    name: 'mock-name',
    title: 'mock-title',
    description: 'mock-desc',
    date: '2021-09-01',
    url: 'mock',
    html: '',
  },
];

const profile = fs.readFileSync(
  path.join(__dirname, '../../../templates/partial/profile.njk'),
  'utf8',
);
const style = fs.readFileSync(path.join(__dirname, '../../../templates/style/top.njk'), 'utf8');
const logo = fs.readFileSync(path.join(__dirname, '../../../templates/partial/logo.njk'), 'utf8');

const postList = `<li class="post-item">
<p class="post-meta"><time class="post-date" datetime="${MOCK_DATA[0].date}">${MOCK_DATA[0].date}</time></p>
<a class="post-title" href="mock">${MOCK_DATA[0].title}</a>
<p class="post-meta"><span>${MOCK_DATA[0].description}</span></p>
</li>`;

const EXPECT = minify(
  `<!DOCTYPE html>
  <html lang="ja">
    <head>
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
  `,
  {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  },
);

test('should render next and prev post links', () => {
  expect(generateIndexPage(MOCK_DATA)).toBe(EXPECT);
});
