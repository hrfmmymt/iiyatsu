import type { FC } from 'hono/jsx';
import type { Child } from 'hono/jsx';

type LayoutProps = {
  title: string;
  children: Child | Child[];
};

export const Layout: FC<LayoutProps> = ({ title, children }) => (
  <html lang="ja">
    <head>
      <title>{title}</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <div class="container">{children}</div>
    </body>
  </html>
);
