import type { FC } from 'hono/jsx';
import type { Child } from 'hono/jsx';

import { Head } from './Head';
import { Logo } from './Logo';

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
  title: string;
  cssPath?: string;
  siteConfig: SiteConfig;
  statusCode: number;
  errorMessage?: string;
  err?: Error;
};

export const ErrorLayout: FC<Props> = ({ 
  title, 
  cssPath,
  siteConfig,
  statusCode,
  errorMessage,
  err,
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
      <main class="wrapper">
        <h1 style={`--error-code: '${statusCode}'`}>{statusCode}</h1>
        <footer class="error-footer">
          {errorMessage ? 
            <>
              <p>{errorMessage}</p>
              <p class="error-detail">
                {process.env.NODE_ENV === 'development' ? err?.message : 'something went wrong.'}
              </p>
            </> : null
          }
          <p>go to <a href="/">toppage</a>.</p>
          <a href="/" class="error-footer-link">
            <Logo />
          </a>
        </footer>
      </main>
    </body>
  </html>
);