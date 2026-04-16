import { describe, expect, it } from 'vitest';

import { Layout } from '../../components/Layout';
import { siteConfig } from '../../config';

describe('Layout', () => {
  it('正しくレンダリングされること', () => {
    const layout = (
      <Layout title="Test Page" cssPath="test.css" siteConfig={siteConfig}>
        <div>Test Content</div>
      </Layout>
    );

    const html = layout.toString();

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html lang="ja"');
    expect(html).toContain('<title>Test Page</title>');
    expect(html).toContain('class="wrapper"');
    expect(html).toContain('Test Content');
    expect(html).toContain(siteConfig.privacyPolicy.summary);
  });
});
