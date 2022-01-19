import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

import { CONFIG, META } from '../../../constants';
import { generateNotFoundPage } from '../generate_not_found_page';
import { logoTag, minifierOption } from '../common';

const style = fs.readFileSync(
  path.join(__dirname, '../../../templates/style/not_found.njk'),
  'utf8',
);

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
      <span style="position:absolute;top:0;left:0;color:#fff;">this is static page</span>
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

test('should render next and prev post links', () => {
  expect(generateNotFoundPage()).toBe(EXPECT);
});
