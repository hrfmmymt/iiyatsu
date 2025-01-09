import type { FC } from 'hono/jsx';
import { raw } from 'hono/html';

type Props = {
  title: string;
  author: string;
  year: string;
  description: string;
  url: string;
  ogImage: string;
  cssPath?: string;
  gaId?: string;
};

export const Head: FC<Props> = ({
  title,
  author,
  year,
  description,
  url,
  ogImage,
  cssPath,
  gaId,
}) => (
  <head>
    {/* google analytics */}
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    <script>
      {raw(`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-SXQ1HCL844');
      `)}
    </script>

    {/* meta tags */}
    <meta charset="utf-8" />
    <title>{title}</title>
    <meta name="author" content={author} />
    <meta name="copyright" content={`Copyright(c)${author}. ${year} All Rights Reserved.`} />
    <meta name="description" content={description} />
    <meta name="format-detection" content="telephone=no,address=no,email=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#332f21" media="(prefers-color-scheme: dark)" />

    {/* ogp */}
    <meta property="og:description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ja_JP" />

    {/* links */}
    <link rel="canonical" href={url} />
    <link rel="manifest" href="/manifest.json" />
    <link rel="shortcut icon" href="/img/icon/favicon.ico" />
    <link rel="image_src" href={ogImage} />
    <link rel="icon" type="image/png" href={ogImage} />
    <link rel="apple-touch-icon" href={ogImage} />

    {/* styles */}
    <link rel="stylesheet" href="/styles/main.css" />
    {cssPath && <link rel="stylesheet" href={`/styles/${cssPath}`} />}
  </head>
);
