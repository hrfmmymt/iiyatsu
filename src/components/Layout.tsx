import type { FC } from 'hono/jsx';
import type { Child } from 'hono/jsx';

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

export const Layout: FC<Props> = ({ 
  title, 
  children, 
  cssPath,
  siteConfig,
}) => (
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
      <Header siteTitle={siteConfig.title} />
      <div class="container">
        {children}
      </div>
      <Footer privacyPolicy={siteConfig.privacyPolicy} />
    </body>
  </html>
);