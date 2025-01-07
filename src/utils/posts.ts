import type { Post, PostWithNavigation } from 'src/types';

// 記事データに前後の記事のデータを追加する
export const addNavigationLinks = (posts: Post[]): PostWithNavigation[] => {
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
