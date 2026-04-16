export type Post = {
  title: string;
  description: string;
  date: string;
  datetime: string;
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
