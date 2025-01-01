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

export type Env = Record<string, unknown>;
