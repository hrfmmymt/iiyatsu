import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

type PostMetadata = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'posts');

async function buildPosts(): Promise<void> {
  // 出力ディレクトリの作成
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 記事メタデータの配列
  const posts: PostMetadata[] = [];

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

    const post: PostMetadata = {
      title: data.title,
      description: data.description,
      date: data.date,
      slug,
      content: html,
    };

    posts.push(post);
  }

  // 記事データをJSONとして保存
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'posts.json'),
    JSON.stringify(posts, null, 2),
  );
}

buildPosts().catch(console.error);
