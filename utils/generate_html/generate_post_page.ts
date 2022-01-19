import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

import { PostInfo } from '../types';
import { CONFIG, META } from '../../constants';

import { logoTag, minifierOption } from './common';

const style = fs.readFileSync(path.join(__dirname, '../../templates/style/post.njk'), 'utf8');

// export for testing
export function generatePostPage(content: PostInfo) {
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
      <title>${content.title}</title>
      <meta charset="utf-8">
      <meta name="author" content="hrfmmymt">
      <meta name="copyright" content="Copyright(c)${META.AUTHOR}. ${CONFIG.CURRENT_YEAR} All Rights Reserved.">
      <meta name="description" content="${content.description}">
      <meta name="format-detection" content="telephone=no,address=no,email=no">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)">
      <meta name="theme-color" content="#332f21" media="(prefers-color-scheme: dark)">
      <meta property="og:description" content="${content.description}">
      <meta property="og:title" content="${content.title}">
      <meta property="og:url" content="${content.url}">
      <meta property="og:image" content="${META.OG_IMAGE}">
      <meta property="og:type" content="website">
      <meta property="og:locale" content="ja_JP">

      <link rel="canonical" href="${content.url}">
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
      <header class="header">
        <h1 class="header-title">
          <a href="/" class="header-title-link">
            ${logoTag}
          </a>
        </h1>
      </header>
      <article class="post-article">
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
  `,
    minifierOption,
  );

  return html;
}

export const generatePostHtml = (): void => {
  const DIST_PATH = path.join(__dirname, '../../public/posts/');

  if (!fs.existsSync(DIST_PATH)) fs.mkdirSync(DIST_PATH);

  const postList = CONFIG.POST_LIST;

  postList.forEach((post: PostInfo) => {
    fs.writeFileSync(path.join(DIST_PATH, post.name + '.html'), generatePostPage(post));
  });
};
