import { emEscape } from '../marked_custom_render';

test('should return escaped string', () => {
  expect(emEscape('1234\\/input')).toBe('1234/input');
});
