import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

import { CONFIG, META } from '../../constants';

import { logoTag, minifierOption } from './common';

const style = fs.readFileSync(path.join(__dirname, '../../templates/style/not_found.njk'), 'utf8');

// export for testing
export function generateNotFoundPage() {
  const html = minify(
    `<!DOCTYPE html>
    <html lang="ja">
      <head>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SXQ1HCL844"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-SXQ1HCL844');
        </script>
        <meta charset="utf-8">
        <title>404 not found ${META.TITLE}</title>
        <meta name="author" content="${META.AUTHOR}">
        <meta name="copyright" content="Copyright(c)${META.AUTHOR}. ${CONFIG.CURRENT_YEAR} All Rights Reserved.">
        <meta name="description" content="${META.DESCRIPTION}">
        <meta name="format-detection" content="telephone=no,address=no,email=no">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#fff">
        <meta property="og:description" content="${META.DESCRIPTION}">
        <meta property="og:title" content="${META.TITLE}">
        <meta property="og:url" content="${META.URL}">
        <meta property="og:image" content="${META.OG_IMAGE}">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="ja_JP">
        <style>${style}</style>
      </head>
      <body>
        <div class="wrapper">
          <h1>404</h1>
          <div class="link">
            <p>go to <a href="/">toppage</a>.</p>
            <a href="/">
              ${logoTag}
            </a>
          </div>
        </div>
      </body>
    </html>
  `,
    minifierOption,
  );

  return html;
}

export const generateNotFoundHtml = (): void => {
  const DIST_PATH = path.join(__dirname, '../../public/');

  fs.writeFileSync(path.join(DIST_PATH, '404.html'), generateNotFoundPage());
};
