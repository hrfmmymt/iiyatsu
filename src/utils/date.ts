// 日付フォーマット用の関数
export const formatDate = (dateStr: string | Date) => {
  // dateStrがDateオブジェクトの場合は文字列に変換
  const dateString = dateStr instanceof Date ? dateStr.toISOString() : String(dateStr);
  const date = new Date(dateString);

  // 日本時間のオフセット（+9時間）を加算
  const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  // YYYY-MM-DD形式の表示用文字列を生成
  const displayDate = jstDate.toISOString().split('T')[0];

  // datetime属性用のISO文字列はUTC形式のまま
  const isoDate = dateString;

  return { displayDate, isoDate };
};
