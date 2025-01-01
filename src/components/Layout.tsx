import type { FC } from 'hono/jsx';
import type { Child } from 'hono/jsx';

type LayoutProps = {
  title: string;
  children: Child | Child[];
  cssPath?: string;
};

export const Layout: FC<LayoutProps> = ({ title, children, cssPath }) => (
  <html lang="ja">
    <head>
      <title>{title}</title>
      <meta charset="utf-8" />
      <link rel="stylesheet" href="/styles/main.css" />
      {cssPath ? <link rel="stylesheet" href={`/styles/${cssPath}`} /> : null}
    </head>
    <body>
      <div class="container">
        {children}
      </div>
    </body>
  </html>
);