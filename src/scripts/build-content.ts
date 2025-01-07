import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

import type { Post } from '../types';
import { formatDate } from '../utils/date';
import { addNavigationLinks } from '../utils/posts';

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'posts');

// postsデータを日付でソートする
const sortPostsByDate = (posts: Post[]) => {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // 降順（新しい順）
  });
};

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  }),
);

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
    const html = await marked.parse(content);
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
