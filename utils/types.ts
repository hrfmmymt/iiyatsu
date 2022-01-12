type RecentPost = {
  title: string;
  url: string;
};

export type PostInfo = {
  title: string;
  description: string;
  date: string;
  url: string;
  html: Promise<string> | null;
  prevPost?: RecentPost | null;
  nextPost?: RecentPost | null;
};
