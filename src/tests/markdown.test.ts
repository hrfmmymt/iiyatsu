import { describe, it, expect } from 'vitest';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

describe('Markdown処理', () => {
  const markedInstance = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    }),
  );

  it('コードブロックが正しくハイライトされること', async () => {
    const markdown = '```javascript\nconst x = 1;\n```';
    const html = await markedInstance.parse(markdown);

    expect(html).toContain('hljs language-javascript');
    expect(html).toContain('const');
  });

  it('通常のテキストが正しく変換されること', async () => {
    const markdown = '# タイトル\n\n本文';
    const html = await markedInstance.parse(markdown);

    expect(html).toContain('<h1>タイトル</h1>');
    expect(html).toContain('<p>本文</p>');
  });
});
