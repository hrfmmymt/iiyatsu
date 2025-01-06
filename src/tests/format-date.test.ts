import { describe, it, expect } from 'vitest';

import { formatDate } from '../utils/date';

describe('formatDate', () => {
  it('UTCの日付文字列が日本時間の表示用文字列に変換できること', () => {
    const input = '2025-01-01T15:00:00.000Z';
    const { displayDate, isoDate } = formatDate(input);

    expect(displayDate).toBe('2025-01-02'); // JST
    expect(isoDate).toBe(input); // 元のUTC
  });

  it('日付オブジェクトが正しく処理できること', () => {
    const input = new Date('2025-01-01T15:00:00.000Z');
    const { displayDate, isoDate } = formatDate(input);

    expect(displayDate).toBe('2025-01-02');
    expect(isoDate).toBe('2025-01-01T15:00:00.000Z');
  });
});
