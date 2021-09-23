import { sanitize } from '../marked_custom_render';

test('sanitize', () => {
  expect(sanitize('input')).toBe('input');
});
