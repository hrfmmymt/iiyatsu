import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Post, PostWithNavigation } from '../types';

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'posts');

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

    const post: Post = {
      title: data.title,
      description: data.description,
      date: data.date,
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
