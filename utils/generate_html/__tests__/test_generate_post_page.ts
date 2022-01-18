import { minify } from 'html-minifier';

import { PostInfo } from '../../types';
import { generatePostPage } from '../generate_post_page';

const EXPECT = minify(
  `<!DOCTYPE html>
  <html lang="ja">
    <head>
      <title>mock-title</title>
      <meta charset="utf-8">
      <meta name="author" content="hrfmmymt">
      <meta name="copyright" content="Copyright(c)hrfmmymt. 2022 All Rights Reserved.">
      <meta name="description" content="mock-desc">
      <meta name="format-detection" content="telephone=no,address=no,email=no">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)">
      <meta name="theme-color" content="#332f21" media="(prefers-color-scheme: dark)">
      <meta property="og:description" content="mock-desc">
      <meta property="og:title" content="mock-title">
      <meta property="og:url" content="mock">
      <meta property="og:image" content="public/img/icon/icon.png">
      <meta property="og:type" content="website">
      <meta property="og:locale" content="ja_JP">

      <link rel="canonical" href="mock">
      <link rel="shortcut icon" type="image/x-icon" href="public/img/icon/favicon.ico">
      <link rel="manifest" href="public/manifest.json">
      <link rel="image_src" href="public/img/icon/icon.png">
      <link rel="icon" type="image/png" href="public/img/icon/icon.png">
      <link rel="apple-touch-icon" href="public/img/icon/icon.png">
      <link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
      <style>a,article,blockquote,body,div,footer,h1,h2,h3,header,html,li,nav,p,time,ul{margin:0;padding:0}:root{--text-color:#000;--text-color-sub:#555;--text-color-anchor:#db2c17;--page-background-color:#fff;--code-background-color:#f4f4f4;--code-border-color:#ddd;--skeleton-color:#f4f4f4}@media (prefers-color-scheme:dark){:root{--text-color:#fff;--text-color-sub:#f2f1ef;--text-color-anchor:#00b5b5;--page-background-color:#332f21;--code-background-color:#1e1d16;--code-border-color:#424137;--skeleton-color:#272419}}html{font-size:calc(1em + .5vw)}body{font-feature-settings:"palt";-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;background-color:var(--page-background-color);color:var(--text-color);font-family:Open Sans,Helvetica Neue,sans-serif;font-kerning:normal;letter-spacing:.1em}a{color:var(--text-color-anchor)}a:visited{color:inherit}ul{list-style-type:none}.header{margin:1.5rem 0 1.2rem;text-align:center}.header-title{font-size:1rem;letter-spacing:.05rem}.header-title .header-title-link{display:block;margin:0 auto;width:6rem}.header-title .header-title-link,.header-title .header-title-link:visited{color:inherit}.logo{fill:var(--text-color)}.footer{font-size:.8rem;margin:0 auto 1.5rem;max-width:32rem;padding:0 1rem}@media screen{.hljs-comment,.hljs-quote{color:var(--gray-60-alpha)}.hljs-deletion,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:var(--caution-red-100)}.hljs-attr,.hljs-attribute,.hljs-built_in,.hljs-builtin-name,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-type{color:#831443}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:var(--primary-green-80)}.hljs-section,.hljs-title{color:#3a71a0}.hljs-keyword,.hljs-selector-tag{color:#9d00cf}.hljs{background:#f6f6f6;color:var(--gray-70-alpha);display:block;overflow-x:auto;padding:.5em}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}}@media screen and screen and (-ms-high-contrast:active){.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-builtin-name,.hljs-bullet,.hljs-comment,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-quote,.hljs-string,.hljs-symbol,.hljs-type{color:highlight}.hljs-keyword,.hljs-selector-tag{font-weight:700}}@media screen and (prefers-color-scheme:dark){.hljs-comment,.hljs-quote{color:var(--white-60-alpha)}.hljs-deletion,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:var(--caution-red-vivid-100)}.hljs-attr,.hljs-attribute,.hljs-built_in,.hljs-builtin-name,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-type{color:#e19c40}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:var(--secondary-green-50)}.hljs-section,.hljs-title{color:#8dcfec}.hljs-keyword,.hljs-selector-tag{color:#da8eed}.hljs{background:#1e2930;color:var(--white-80-alpha);display:block;overflow-x:auto;padding:.5em}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}}@media screen and (prefers-color-scheme:dark) and screen and (-ms-high-contrast:active){.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-builtin-name,.hljs-bullet,.hljs-comment,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-quote,.hljs-string,.hljs-symbol,.hljs-type{color:highlight}.hljs-keyword,.hljs-selector-tag{font-weight:700}}.post-article,.post-recent{max-width:32rem}.post-article{line-height:2;margin:0 auto}.post-article h1{font-size:2rem}.post-article h2{border-bottom:1px solid;margin-bottom:1rem}.post-article h3{margin-bottom:-1rem;margin-top:.5rem}.post-article h4{margin:0 0 -1rem}.post-article p{word-wrap:break-word;margin:1rem 0}.post-article a{text-decoration:underline}.post-article li a{word-break:break-all}.post-article img,.post-article video{background-color:var(--skeleton-color);height:auto;width:100%}.post-article code{border:1px solid var(--code-border-color);border-radius:2px;margin:1.4em 0;overflow-wrap:break-word;padding:.1em}.post-article code,.post-article pre>code{background-color:var(--code-background-color)}.post-article pre>code{border:none;display:block;margin:0;overflow:auto;padding:.6em}.post-article blockquote{word-wrap:break-word;border-left:.25em solid #dfe2e5;color:var(--text-color-sub);margin:1em 0;padding:0 1em}.post-article ul{list-style-type:disc;margin:1rem 0;padding-left:2rem}.post-article ul li ul{list-style-type:circle;margin:0}.post-article ol{padding-left:2rem}.post-article .description,.post-article time{word-wrap:break-word;color:var(--text-color-sub);font-weight:400}.post-article time{font-size:.8rem}.post-article .description{font-size:.9rem}.post-recent{margin:3rem auto}@media (max-width:414px){.post-article{padding:0 1rem}}</style>
    </head>
    <body>
      <span style="position:absolute;top:0;left:0;">this is static page</span>
      <header class="header">
        <h1 class="header-title">
          <a href="/" class="header-title-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202.39 58.18" class="logo" role="img" aria-labelledby="title">
              <title id="title">iiyatsu</title>
              <g>
                <path d="M14.76 14l-4.54 28.92H0l3-18.73A11.93 11.93 0 0 1 14.76 14zM6.91 9.36a5.38 5.38 0 0 1-1.58-3.89A5.4 5.4 0 0 1 10.73 0a5.55 5.55 0 0 1 4 1.51 5.6 5.6 0 0 1 1.58 4 5.4 5.4 0 0 1-5.54 5.47 5 5 0 0 1-3.86-1.62zM37.15 14l-4.53 28.92H22.39l2.95-18.73A11.93 11.93 0 0 1 37.15 14zM29.3 9.36a5.38 5.38 0 0 1-1.58-3.89A5.4 5.4 0 0 1 33.12 0a5.55 5.55 0 0 1 4 1.51 5.6 5.6 0 0 1 1.58 4 5.4 5.4 0 0 1-5.54 5.47 5 5 0 0 1-3.86-1.62zM51.84 43.35l-8.57-28.66h11l2.66 13a5.24 5.24 0 0 0 .15.79 22.9 22.9 0 0 1 .59 4.52c.29-.79.58-1.59.87-2.45s.79-1.87 1.29-2.88L61.06 25a18.34 18.34 0 0 1 16.41-10.3l-23.4 43.48H42.91zM109.66 15.77h5l-4.24 27h-8.86l.43-3.6a13.75 13.75 0 0 1-4.32 3.46 11.41 11.41 0 0 1-5.18 1.15 9.36 9.36 0 0 1-7.56-3.53 13.26 13.26 0 0 1-3-9.07 17.21 17.21 0 0 1 4-11.59A12.84 12.84 0 0 1 96 15a10.44 10.44 0 0 1 5 1.15 12.67 12.67 0 0 1 4 3.6 4.65 4.65 0 0 1 4.61-3.89zm-5.84 12.6a5.41 5.41 0 0 0-1.58-4.1 5.83 5.83 0 0 0-4.1-1.59 6.18 6.18 0 0 0-4.76 2.16 7.81 7.81 0 0 0-1.87 5.47 5.59 5.59 0 0 0 1.58 4.18 6.13 6.13 0 0 0 8.86-.65 7.52 7.52 0 0 0 1.87-5.47zM120.6 42.92l3.4-21.53h-4.82l.43-2.67a5.64 5.64 0 0 1 5.52-4.72 9.91 9.91 0 0 1 9.8-8.35h1.72L135.29 14h5.18l-1.15 7.42h-5.19l-3.38 21.53zM167.33 16.92l-2.74 6a19.15 19.15 0 0 0-3.38-1.92 9.43 9.43 0 0 0-3.1-.58A3.6 3.6 0 0 0 156 21a1.73 1.73 0 0 0-.86 1.44c0 .86.93 1.65 2.73 2.3l2 .79a16.62 16.62 0 0 1 5.4 3.46 6.91 6.91 0 0 1 1.58 4.53 8.09 8.09 0 0 1-3.31 6.77 13.63 13.63 0 0 1-8.71 2.6 20.58 20.58 0 0 1-11.31-3.24l.65-1.37a5.58 5.58 0 0 1 7-2.74h.08a10.1 10.1 0 0 0 3.45.65 3.41 3.41 0 0 0 2.24-.58 1.89 1.89 0 0 0 .86-1.58c0-1-1.3-2.09-3.89-3.17-.79-.29-1.37-.58-1.8-.72a11.6 11.6 0 0 1-4.39-3 6.14 6.14 0 0 1-1.3-4 7.83 7.83 0 0 1 3.24-6.4 12.79 12.79 0 0 1 8.28-2.6 17.16 17.16 0 0 1 5 .72 15.69 15.69 0 0 1 4.39 2.06zM183.81 14.11L182 25.63c-.21 1.52-.36 2.74-.5 3.82a15.9 15.9 0 0 0-.22 1.94 4.14 4.14 0 0 0 1 3A3.33 3.33 0 0 0 185 35.5c2.81 0 4.75-3.24 5.69-9.65.07-.36.07-.58.14-.79l.22-1.3a11.39 11.39 0 0 1 11.3-9.65l-2 12.53-.07.58c-.93 5.9-2.52 9.94-4.53 12A13 13 0 0 1 191 42a19.89 19.89 0 0 1-6.41.94c-4 0-7.27-.94-9.57-2.74a9.08 9.08 0 0 1-3.53-7.56c0-.72.07-1.66.14-2.74s.44-2.81.8-5.11l.14-1.08a11.38 11.38 0 0 1 11.24-9.6z"/>
              </g>
            </svg>
          </a>
        </h1>
      </header>
      <article class="post-article">
      <h1 id="mock-title">mock-title</h1><p><time datetime="2021-09-01">2021-09-01</time></p><p><em class="description">mock-desc</em></p><p>mock-html</p>
      </article>
      <footer class="footer">
        <details>
          <summary>This website uses Google Analytics, a web analytics service provided by Google.</summary>
          Google Analytics uses "cookies", which are text files placed on your computer, to help the website analyse how users use the site.
        </details>
      </footer>
    </body>
  </html>`,
  {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  },
);

const INPUT: PostInfo = {
  name: 'mock-name',
  title: 'mock-title',
  description: 'mock-desc',
  date: '2021-09-01',
  url: 'mock',
  html: '<h1 id="mock-title">mock-title</h1>\n<p><time datetime="2021-09-01">2021-09-01</time></p>\n<p><em class="description">mock-desc</em></p>\n<p>mock-html</p>\n',
};

test('should render next and prev post links', () => {
  expect(generatePostPage(INPUT)).toBe(EXPECT);
});
