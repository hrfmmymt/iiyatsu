import type { FC } from 'hono/jsx';

type Props = {
  summary: string;
  details: string;
};

export const PrivacyPolicy: FC<Props> = ({ summary, details }) => (
  <details>
    <summary>{summary}</summary>
    <div class="privacy-policy-details">{details}</div>
  </details>
);
