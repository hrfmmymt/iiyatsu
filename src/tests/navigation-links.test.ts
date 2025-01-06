import { describe, it, expect } from 'vitest';

import { addNavigationLinks } from '../utils/posts';
import type { Post } from '../types';

describe('addNavigationLinks', () => {
  it('記事の前後リンクが正しく生成できること', () => {
    const posts: Post[] = [
      {
        title: '記事1',
        slug: 'post-1',
        date: '2025-01-01',
        datetime: '2025-01-01T00:00:00.000Z',
        description: '',
        content: '',
      },
      {
        title: '記事2',
        slug: 'post-2',
        date: '2025-01-02',
        datetime: '2025-01-02T00:00:00.000Z',
        description: '',
        content: '',
      },
    ];

    const result = addNavigationLinks(posts);

    expect(result[0].nextPost).toBeUndefined();
    expect(result[0].prevPost).toEqual({
      title: '記事2',
      slug: 'post-2',
    });

    expect(result[1].nextPost).toEqual({
      title: '記事1',
      slug: 'post-1',
    });
    expect(result[1].prevPost).toBeUndefined();
  });
});
