import type { FC, Child } from 'hono/jsx';

import { Head } from './Head';
import { Header } from './Header';
import { Footer } from './Footer';

// サイト設定の型
type SiteConfig = {
  author: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  gaId: string;
  year: string;
  privacyPolicy: {
    summary: string;
    details: string;
  };
};

type Props = {
  title: string;
  children: Child | Child[];
  cssPath?: string;
  siteConfig: SiteConfig;
};

export const Layout: FC<Props> = ({ title, children, cssPath, siteConfig }) => (
  <html lang="ja">
    <Head
      title={title}
      author={siteConfig.author}
      year={siteConfig.year}
      description={siteConfig.description}
      url={siteConfig.url}
      ogImage={siteConfig.ogImage}
      gaId={siteConfig.gaId}
      cssPath={cssPath}
    />
    <body>
      <main class="wrapper">
        <Header siteTitle={siteConfig.title} />
        {children}
        <Footer privacyPolicy={siteConfig.privacyPolicy} />
      </main>
    </body>
  </html>
);
