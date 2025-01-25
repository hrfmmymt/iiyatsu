import { describe, expect, it } from 'vitest';

import { Layout } from '../../components/Layout';

describe('Layout', () => {
  const mockSiteConfig = {
    author: 'Test Author',
    title: 'Test Title',
    description: 'Test Description',
    url: 'https://test.com',
    ogImage: 'test.jpg',
    gaId: 'UA-TEST',
    year: '2024',
    privacyPolicy: {
      summary: 'Test Summary',
      details: 'Test Details',
    },
  };

  it('正しくレンダリングされること', () => {
    const layout = (
      <Layout title="Test Page" cssPath="test.css" siteConfig={mockSiteConfig}>
        <div>Test Content</div>
      </Layout>
    );

    const html = layout.toString();

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html lang="ja"');
    expect(html).toContain('<title>Test Page</title>');
    expect(html).toContain('class="wrapper"');
    expect(html).toContain('Test Content');
    expect(html).toContain('Test Summary');
  });
});
