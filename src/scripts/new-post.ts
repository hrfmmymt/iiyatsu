import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');

// 現在の日本時間を YYYY-MM-DD 形式で取得
const getJstDate = () => {
  const date = new Date();
  const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return jstDate.toISOString().split('T')[0];
};

// スラッグを生成（日付-タイトル の形式）
const generateSlug = (title: string) => {
  const date = getJstDate();
  const sanitizedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${date}-${sanitizedTitle}`;
};

// 新規記事のテンプレート
const generateTemplate = (title: string, description: string) => {
  const date = getJstDate();
  return `---
title: ${title}
description: ${description}
date: ${date}
---

`;
};

async function createNewPost() {
  // ディレクトリの存在確認
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  // 標準入力のインターフェースを作成
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    // タイトルの入力
    const title = await rl.question('記事のタイトルを入力してください: ');
    if (!title) {
      throw new Error('タイトルは必須です');
    }

    // 説明の入力
    const description = await rl.question('記事の説明を入力してください: ');
    if (!description) {
      throw new Error('説明は必須です');
    }

    // ファイル名（スラッグ）の生成
    const slug = generateSlug(title);
    const fileName = `${slug}.md`;
    const filePath = path.join(POSTS_DIR, fileName);

    // ファイルの存在確認
    if (fs.existsSync(filePath)) {
      throw new Error('同じ名前の記事が既に存在します');
    }

    // テンプレートの生成と保存
    const content = generateTemplate(title, description);
    fs.writeFileSync(filePath, content, 'utf-8');

    console.log(`✨ 新しい記事を作成しました: ${fileName}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ エラー:', error.message);
    }
    process.exit(1);
  } finally {
    rl.close();
  }
}

createNewPost().catch(console.error);
