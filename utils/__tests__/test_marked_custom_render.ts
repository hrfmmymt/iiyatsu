import { emEscape, renderEm } from '../marked_custom_render';

test('should return escaped string', () => {
  expect(emEscape('1234\\/input')).toBe('1234/input');
});

test('should return just simple <em> tag', () => {
  expect(renderEm('description')).toBe('<em>description</em>');
});

test('should return <time> tag', () => {
  expect(renderEm('date:1970-01-01')).toBe('<time datetime="1970-01-01">1970-01-01</time>');
});

test('should return <em> tag for post description', () => {
  expect(renderEm('desc&gt; description')).toBe('<em class="description">description</em>');
});
