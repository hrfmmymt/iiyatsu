import type { FC } from 'hono/jsx';

import { PrivacyPolicy } from './PrivacyPolicy';

type Props = {
  privacyPolicy: {
    summary: string;
    details: string;
  };
};

export const Footer: FC<Props> = ({ privacyPolicy }) => (
  <footer class="footer">
    <PrivacyPolicy 
      summary={privacyPolicy.summary}
      details={privacyPolicy.details}
    />
  </footer>
);
