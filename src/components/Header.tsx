import type { FC } from 'hono/jsx';

import { Logo } from './Logo';

type HeaderProps = {
  siteTitle: string;
};

export const Header: FC<HeaderProps> = ({ siteTitle }) => (
  <header class="header">
    <h1 class="header-title">
      <a href="/" class="header-title-link" aria-label={siteTitle}>
        <Logo />
      </a>
    </h1>
  </header>
);