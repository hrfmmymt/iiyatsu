import type { FC } from 'hono/jsx';

import { Head } from './Head';

type SiteConfig = {
  author: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  gaId: string;
  year: string;
};

type Props = {
  siteConfig: SiteConfig;
};

const OFFLINE_TEXT = 'offline' as const;

const Offline: FC<Props> = ({ siteConfig }) => {
  return (
    <html lang="ja">
      <Head
        title={`offline | ${siteConfig.title}`}
        author={siteConfig.author}
        year={siteConfig.year}
        description={`${siteConfig.description} - offline now`}
        url={siteConfig.url}
        ogImage={siteConfig.ogImage}
        gaId={siteConfig.gaId}
        cssPath="offline.css"
      />
      <body>
        <main class="wrapper">
          <h1 style={`--offline-text: "${OFFLINE_TEXT}"`}>{OFFLINE_TEXT}</h1>
        </main>
      </body>
    </html>
  );
};

export default Offline;
