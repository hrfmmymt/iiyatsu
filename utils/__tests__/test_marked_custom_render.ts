import { sanitize } from '../marked_custom_render';

test('should return string', () => {
  expect(sanitize('input')).toBe('input');
});
