import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

import { PostInfo } from '../../types';
import { generatePostPage } from '../generate_post_page';
import { CONFIG, META } from '../../../constants';
import { logoTag, minifierOption } from '../common';

const style = fs.readFileSync(path.join(__dirname, '../../../templates/style/post.njk'), 'utf8');

const MOCK_DATA: PostInfo = {
  name: 'mock-name',
  title: 'mock-title',
  description: 'mock-desc',
  date: '2021-09-01',
  url: 'mock',
  html: '<h1 id="mock-title">mock-title</h1>\n<p><time datetime="2021-09-01">2021-09-01</time></p>\n<p><em class="description">mock-desc</em></p>\n<p>mock-html</p>\n',
};

const EXPECT = minify(
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
      <title>${MOCK_DATA.title}</title>
      <meta charset="utf-8">
      <meta name="author" content="hrfmmymt">
      <meta name="copyright" content="Copyright(c)${META.AUTHOR}. ${CONFIG.CURRENT_YEAR} All Rights Reserved.">
      <meta name="description" content="${MOCK_DATA.description}">
      <meta name="format-detection" content="telephone=no,address=no,email=no">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)">
      <meta name="theme-color" content="#332f21" media="(prefers-color-scheme: dark)">
      <meta property="og:description" content="${MOCK_DATA.description}">
      <meta property="og:title" content="${MOCK_DATA.title}">
      <meta property="og:url" content="${MOCK_DATA.url}">
      <meta property="og:image" content="${META.OG_IMAGE}">
      <meta property="og:type" content="website">
      <meta property="og:locale" content="ja_JP">

      <link rel="canonical" href="${MOCK_DATA.url}">
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
      <header class="header">
        <h1 class="header-title">
          <a href="/" class="header-title-link">
            ${logoTag}
          </a>
        </h1>
      </header>
      <article class="post-article">
        ${MOCK_DATA.html}
      </article>
      <footer class="footer">
        <details>
          <summary>This website uses Google Analytics, a web analytics service provided by Google.</summary>
          Google Analytics uses "cookies", which are text files placed on your computer, to help the website analyse how users use the site.
        </details>
      </footer>
    </body>
  </html>`,
  minifierOption,
);

test('should render next and prev post links', () => {
  expect(generatePostPage(MOCK_DATA)).toBe(EXPECT);
});
