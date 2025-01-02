import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Post, PostWithNavigation } from '../types';

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'posts');

// 日付フォーマット用の関数
const formatDate = (dateStr: string | Date) => {
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

// 記事データに前後の記事のデータを追加する
const addNavigationLinks = (posts: Post[]): PostWithNavigation[] => {
  return posts.map((post, index) => {
    const nextPost = index > 0 ? posts[index - 1] : undefined;
    const prevPost = index < posts.length - 1 ? posts[index + 1] : undefined;

    return {
      ...post,
      nextPost: nextPost
        ? {
            title: nextPost.title,
            slug: nextPost.slug,
          }
        : undefined,
      prevPost: prevPost
        ? {
            title: prevPost.title,
            slug: prevPost.slug,
          }
        : undefined,
    };
  });
};

// postsデータを日付でソートする
const sortPostsByDate = (posts: Post[]) => {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // 降順（新しい順）
  });
};

async function buildPosts(): Promise<void> {
  // 出力ディレクトリの作成
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 記事メタデータの配列
  const posts: Post[] = [];

  // Markdownファイルの処理
  const files = fs.readdirSync(POSTS_DIR);
  for await (const file of files) {
    if (!file.endsWith('.md')) {
      continue;
    }

    const filePath = path.join(POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const slug = file.replace('.md', '');
    const html = await marked(content);
    const { displayDate, isoDate } = formatDate(data.date);

    const post: Post = {
      title: data.title,
      description: data.description,
      date: displayDate,
      datetime: isoDate,
      slug,
      content: html,
    };

    posts.push(post);
  }

  const sortedPosts = sortPostsByDate(posts);
  const postsWithNavigation = addNavigationLinks(sortedPosts);

  // 記事データをJSONとして保存
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'posts.json'),
    JSON.stringify(postsWithNavigation, null, 2),
  );
}

buildPosts().catch(console.error);
