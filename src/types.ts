import type { Env as HonoEnv } from 'hono';

export type Post = {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
};

export type PostWithNavigation = Post & {
  prevPost?: {
    title: string;
    slug: string;
  };
  nextPost?: {
    title: string;
    slug: string;
  };
};

// サイトの環境変数の型定義
export interface Env extends HonoEnv {
  SITE_AUTHOR: string;
  SITE_TITLE: string;
  SITE_DESCRIPTION: string;
  SITE_URL: string;
  SITE_OG_IMAGE: string;
  GA_ID: string;
  PRIVACY_POLICY_SUMMARY: string;
  PRIVACY_POLICY_DETAILS: string;
}
