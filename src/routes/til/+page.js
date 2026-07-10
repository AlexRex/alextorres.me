import { posts } from '$lib/posts';

export function load() {
  const list = posts
    .map(({ metadata }) => metadata)
    .filter((post) => !post.draft)
    .sort((postA, postB) => new Date(postB.date).getTime() - new Date(postA.date).getTime());

  return { posts: list };
}
